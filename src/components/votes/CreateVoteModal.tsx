import React, { useEffect, useState } from 'react';
import { X as CloseIcon, VoteIcon, UserIcon, CalendarIcon, ClockIcon, PlusIcon, MinusIcon, CheckIcon, AlertTriangleIcon } from 'lucide-react';
export const CreateVoteModal = ({
  onClose,
  fromMeeting = null
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [committee, setCommittee] = useState('Security Working Group');
  const [dueDate, setDueDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [errors, setErrors] = useState({});
  // Committees list
  const committees = ['Security Working Group', 'Technical Steering Committee', 'Documentation Team', 'Governing Board', 'Kubernetes Community'];
  // Mock attendees list - in a real app, this would come from the meeting if fromMeeting is provided
  useEffect(() => {
    // If fromMeeting is provided, populate the attendees from the meeting
    if (fromMeeting) {
      const meetingAttendees = [{
        id: 1,
        name: 'Sarah Wilson',
        company: 'Microsoft',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group',
        isOrganizer: true
      }, {
        id: 2,
        name: 'Michael Chen',
        company: 'Intel',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        committee: 'Security Working Group'
      }, {
        id: 3,
        name: 'Alex Johnson',
        company: 'Google',
        profileImage: null,
        committee: 'Security Working Group'
      }, {
        id: 4,
        name: 'David Martinez',
        company: 'Red Hat',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }];
      setAttendees(meetingAttendees);
      setSelectedAttendees(meetingAttendees.map(a => a.id)); // Auto-select all meeting attendees
      setCommittee(fromMeeting.committee);
    } else {
      // Mock data for when not from a meeting
      const mockAttendees = [{
        id: 1,
        name: 'Sarah Wilson',
        company: 'Microsoft',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group'
      }, {
        id: 2,
        name: 'Michael Chen',
        company: 'Intel',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        committee: 'Security Working Group'
      }, {
        id: 3,
        name: 'Alex Johnson',
        company: 'Google',
        profileImage: null,
        committee: 'Security Working Group'
      }, {
        id: 4,
        name: 'David Martinez',
        company: 'Red Hat',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        id: 5,
        name: 'Emma Davis',
        company: 'IBM',
        profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        committee: 'Security Working Group'
      }, {
        id: 6,
        name: 'James Wilson',
        company: 'Cisco',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }];
      setAttendees(mockAttendees);
    }
  }, [fromMeeting]);
  // Handle search query change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };
  // Filter attendees based on search query
  const filteredAttendees = attendees.filter(attendee => attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) || attendee.company.toLowerCase().includes(searchQuery.toLowerCase()));
  // Toggle attendee selection
  const toggleAttendee = id => {
    setSelectedAttendees(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };
  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    // Validate form
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!committee) newErrors.committee = 'Committee is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (selectedAttendees.length === 0) newErrors.attendees = 'At least one attendee is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Form is valid, proceed with submission
    console.log({
      title,
      description,
      committee,
      dueDate,
      isUrgent,
      selectedAttendees: selectedAttendees.map(id => attendees.find(a => a.id === id)),
      fromMeeting
    });
    onClose('create');
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center">
            <VoteIcon className="h-5 w-5 text-azure-600 mr-2" />
            <h2 className="text-lg font-semibold text-slate-900">
              Create Vote
            </h2>
          </div>
          <button onClick={() => onClose('cancel')} className="text-slate-500 hover:text-slate-700">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            {/* From Meeting Notice */}
            {fromMeeting && <div className="mb-6 p-3 bg-azure-50 rounded-md text-sm text-azure-700 flex items-start">
                <CalendarIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Creating vote from meeting: {fromMeeting.title}
                  </p>
                  <p>Attendees will be automatically added as voters.</p>
                </div>
              </div>}
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Vote Title/Question*
              </label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g., Should we adopt the new security proposal?" className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide additional context for voters..." rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
            </div>
            {/* Committee and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Committee*
                </label>
                <select value={committee} onChange={e => setCommittee(e.target.value)} className={`w-full px-3 py-2 border ${errors.committee ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`}>
                  {committees.map(c => <option key={c} value={c}>
                      {c}
                    </option>)}
                </select>
                {errors.committee && <p className="mt-1 text-xs text-red-500">
                    {errors.committee}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Due Date*
                </label>
                <div className="relative">
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={`w-full px-3 py-2 border ${errors.dueDate ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
                  <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
              </div>
            </div>
            {/* Urgent Toggle */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
                  <div className={`block w-10 h-6 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isUrgent ? 'translate-x-4' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-slate-700 flex items-center">
                  <AlertTriangleIcon className={`h-4 w-4 mr-1.5 ${isUrgent ? 'text-red-500' : 'text-slate-400'}`} />
                  Mark as urgent
                </div>
              </label>
            </div>
            {/* Voters/Attendees */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Voters*
              </label>
              {/* Search Input */}
              <div className="relative mb-2">
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by name or company..." className="w-full px-3 py-2 pl-9 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              {/* Selected Attendees */}
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {selectedAttendees.length > 0 ? selectedAttendees.map(id => {
                  const attendee = attendees.find(a => a.id === id);
                  return <div key={id} className="flex items-center bg-slate-100 rounded-full pl-1 pr-2 py-1">
                          <div className="w-5 h-5 rounded-full overflow-hidden mr-1.5">
                            {attendee.profileImage ? <img src={attendee.profileImage} alt={attendee.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-300 flex items-center justify-center text-[10px] text-slate-600">
                                {attendee.name.charAt(0)}
                              </div>}
                          </div>
                          <span className="text-xs text-slate-700 mr-1">
                            {attendee.name}
                          </span>
                          <button type="button" onClick={() => toggleAttendee(id)} className="text-slate-500 hover:text-slate-700">
                            <MinusIcon className="h-3 w-3" />
                          </button>
                        </div>;
                }) : <p className="text-xs text-slate-500">No voters selected</p>}
                </div>
                {errors.attendees && <p className="mt-1 text-xs text-red-500">
                    {errors.attendees}
                  </p>}
              </div>
              {/* Search Results */}
              {showSearchResults && filteredAttendees.length > 0 && <div className="border border-slate-200 rounded-md max-h-40 overflow-y-auto">
                  {filteredAttendees.map(attendee => <div key={attendee.id} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => toggleAttendee(attendee.id)}>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                          {attendee.profileImage ? <img src={attendee.profileImage} alt={attendee.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs text-slate-600">
                              {attendee.name.charAt(0)}
                            </div>}
                        </div>
                        <div>
                          <p className="text-sm text-slate-700">
                            {attendee.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {attendee.company}
                          </p>
                        </div>
                      </div>
                      <button type="button" className={`p-1 rounded-full ${selectedAttendees.includes(attendee.id) ? 'bg-azure-100 text-azure-600' : 'text-slate-400 hover:bg-slate-100'}`}>
                        {selectedAttendees.includes(attendee.id) ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                      </button>
                    </div>)}
                </div>}
            </div>
          </form>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3">
          <button type="button" onClick={() => onClose('cancel')} className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm">
            Create Vote
          </button>
        </div>
      </div>
    </div>;
};