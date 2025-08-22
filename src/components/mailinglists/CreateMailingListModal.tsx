import React, { useEffect, useState, useRef } from 'react';
import { X as CloseIcon, CheckCircle as CheckCircleIcon, Search as SearchIcon, Check as CheckIcon, GlobeIcon, LockIcon, UsersIcon, UserIcon, InfoIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
export const CreateMailingListModal = ({
  onClose
}) => {
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
    committees: [],
    members: [],
    moderators: []
  });
  // Search terms
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [committeeSearchTerm, setCommitteeSearchTerm] = useState('');
  const [moderatorSearchTerm, setModeratorSearchTerm] = useState('');
  // Dropdown states
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const [showCommitteeOptions, setShowCommitteeOptions] = useState(false);
  const [showModeratorOptions, setShowModeratorOptions] = useState(false);
  // Refs for dropdowns
  const memberInputRef = useRef(null);
  const memberDropdownRef = useRef(null);
  const committeeInputRef = useRef(null);
  const committeeDropdownRef = useRef(null);
  const moderatorInputRef = useRef(null);
  const moderatorDropdownRef = useRef(null);
  // Prevent scrolling on the main page when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  // Sample data for available members
  const allMembers = [{
    id: 'sw',
    name: 'Sarah Wilson',
    company: 'Microsoft',
    email: 'swilson@microsoft.com',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  }, {
    id: 'mc',
    name: 'Michael Chen',
    company: 'Intel',
    email: 'mchen@intel.com',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  }, {
    id: 'aj',
    name: 'Alex Johnson',
    company: 'Google',
    email: 'ajohnson@google.com',
    profileImage: null
  }, {
    id: 'dm',
    name: 'David Martinez',
    company: 'Red Hat',
    email: 'dmartinez@redhat.com',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
  }, {
    id: 'ed',
    name: 'Emma Davis',
    company: 'IBM',
    email: 'edavis@ibm.com',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
  }, {
    id: 'jw',
    name: 'James Wilson',
    company: 'Cisco',
    email: 'jwilson@cisco.com',
    profileImage: null
  }, {
    id: 'ob',
    name: 'Olivia Brown',
    company: 'Oracle',
    email: 'obrown@oracle.com',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
  }, {
    id: 'ng',
    name: 'Noah Garcia',
    company: 'Meta',
    email: 'ngarcia@meta.com',
    profileImage: 'https://randomuser.me/api/portraits/men/55.jpg'
  }];
  // Sample committees
  const allCommittees = [{
    id: 'tsc',
    name: 'Technical Steering Committee'
  }, {
    id: 'security',
    name: 'Security Working Group'
  }, {
    id: 'docs',
    name: 'Documentation Team'
  }, {
    id: 'community',
    name: 'Community Committee'
  }, {
    id: 'governance',
    name: 'Governance Committee'
  }, {
    id: 'outreach',
    name: 'Outreach Working Group'
  }, {
    id: 'core',
    name: 'Core Development'
  }, {
    id: 'gb',
    name: 'Governing Board'
  }];
  // Sort all dropdown options alphabetically
  const sortedMembers = [...allMembers].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCommittees = [...allCommittees].sort((a, b) => a.name.localeCompare(b.name));
  // Filtered members based on search term
  const filteredMembers = sortedMembers.filter(member => member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.company.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()));
  // Filtered moderators based on search term
  const filteredModerators = sortedMembers.filter(member => member.name.toLowerCase().includes(moderatorSearchTerm.toLowerCase()) || member.company.toLowerCase().includes(moderatorSearchTerm.toLowerCase()) || member.email.toLowerCase().includes(moderatorSearchTerm.toLowerCase()));
  // Filtered committees based on search term
  const filteredCommittees = sortedCommittees.filter(committee => committee.name.toLowerCase().includes(committeeSearchTerm.toLowerCase()));
  const handleInputChange = e => {
    const {
      id,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  const handleMemberToggle = memberId => {
    setFormData(prev => {
      if (prev.members.some(m => m.id === memberId)) {
        return {
          ...prev,
          members: prev.members.filter(m => m.id !== memberId),
          // Also remove from moderators if present
          moderators: prev.moderators.filter(id => id !== memberId)
        };
      } else {
        const member = allMembers.find(m => m.id === memberId);
        return {
          ...prev,
          members: [...prev.members, member]
        };
      }
    });
    setMemberSearchTerm('');
  };
  const handleCommitteeToggle = committeeId => {
    setFormData(prev => {
      if (prev.committees.some(c => c.id === committeeId)) {
        return {
          ...prev,
          committees: prev.committees.filter(c => c.id !== committeeId)
        };
      } else {
        const committee = allCommittees.find(c => c.id === committeeId);
        return {
          ...prev,
          committees: [...prev.committees, committee]
        };
      }
    });
    setCommitteeSearchTerm('');
  };
  const handleModeratorToggle = memberId => {
    setFormData(prev => {
      if (prev.moderators.includes(memberId)) {
        return {
          ...prev,
          moderators: prev.moderators.filter(id => id !== memberId)
        };
      } else {
        return {
          ...prev,
          moderators: [...prev.moderators, memberId]
        };
      }
    });
    setModeratorSearchTerm('');
  };
  const handleRemoveMember = (memberId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
      // Also remove from moderators if present
      moderators: prev.moderators.filter(id => id !== memberId)
    }));
  };
  const handleRemoveCommittee = (committeeId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      committees: prev.committees.filter(c => c.id !== committeeId)
    }));
  };
  const handleRemoveModerator = (moderatorId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      moderators: prev.moderators.filter(id => id !== moderatorId)
    }));
  };
  const handleSubmit = () => {
    // Here you would handle the form submission
    // For now, we'll just close the modal
    onClose('create');
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(e.target) && memberInputRef.current && !memberInputRef.current.contains(e.target)) {
        setShowMemberOptions(false);
      }
      if (committeeDropdownRef.current && !committeeDropdownRef.current.contains(e.target) && committeeInputRef.current && !committeeInputRef.current.contains(e.target)) {
        setShowCommitteeOptions(false);
      }
      if (moderatorDropdownRef.current && !moderatorDropdownRef.current.contains(e.target) && moderatorInputRef.current && !moderatorInputRef.current.contains(e.target)) {
        setShowModeratorOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Check if form is valid
  const isFormValid = formData.name.trim() !== '' && formData.members.length > 0 && formData.moderators.length > 0;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">
            Create Mailing List
          </h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Form content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Mailing List Name */}
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700 mb-1">
                List Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="e.g., dev@groups.io" />
              <p className="mt-1 text-xs text-slate-500">
                This will be the email address for the mailing list
              </p>
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea id="description" rows={3} value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter a description for this mailing list"></textarea>
            </div>
            {/* Visibility Toggle */}
            <div className="flex items-center justify-between py-3">
              <div>
                <h5 className="text-sm font-medium text-slate-700">
                  Public Mailing List
                </h5>
                <p className="text-xs text-slate-500 mt-1">
                  Make this mailing list visible in the public directory
                </p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="isPublic" checked={formData.isPublic} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                </label>
              </div>
            </div>
            {/* Moderators Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                Moderators
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative" ref={moderatorInputRef}>
                <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
                setShowModeratorOptions(true);
                if (moderatorInputRef.current.querySelector('input')) {
                  moderatorInputRef.current.querySelector('input').focus();
                }
              }}>
                  {formData.moderators.map(moderatorId => {
                  const moderator = allMembers.find(m => m.id === moderatorId);
                  if (!moderator) return null;
                  return <div key={moderatorId} className="flex items-center bg-slate-100 rounded-md px-2 py-1">
                        <span className="text-sm text-slate-700 mr-1">
                          {moderator.name}
                        </span>
                        <button onClick={e => handleRemoveModerator(moderatorId, e)} className="text-slate-400 hover:text-slate-600">
                          <CloseIcon className="h-3 w-3" />
                        </button>
                      </div>;
                })}
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex items-center">
                      {(formData.moderators.length === 0 || moderatorSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                      <input type="text" value={moderatorSearchTerm} onChange={e => setModeratorSearchTerm(e.target.value)} onFocus={() => setShowModeratorOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.moderators.length > 0 ? '' : 'Search and add moderators'} />
                    </div>
                  </div>
                </div>
                {showModeratorOptions && <div ref={moderatorDropdownRef} className="fixed z-50 mt-1 w-[calc(100%-12px)] bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{
                width: moderatorInputRef.current ? moderatorInputRef.current.offsetWidth + 'px' : 'auto',
                left: moderatorInputRef.current ? moderatorInputRef.current.getBoundingClientRect().left + 'px' : '0',
                top: moderatorInputRef.current ? moderatorInputRef.current.getBoundingClientRect().bottom + 8 + 'px' : '0'
              }}>
                    {filteredModerators.length > 0 ? filteredModerators.map(member => <div key={member.id} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleModeratorToggle(member.id)}>
                          <div className="h-4 w-4 border border-slate-300 rounded mr-2 flex items-center justify-center">
                            {formData.moderators.includes(member.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                          </div>
                          <div className="flex items-center">
                            {member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-6 w-6 rounded-full mr-2 object-cover" /> : <div className="h-6 w-6 rounded-full bg-slate-200 mr-2 flex items-center justify-center text-xs text-slate-600">
                                {member.name.charAt(0)}
                              </div>}
                            <div>
                              <span className="text-sm text-slate-700">
                                {member.name}
                              </span>
                              <span className="text-xs text-slate-500 ml-1">
                                ({member.company})
                              </span>
                            </div>
                          </div>
                        </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                        No members found
                      </div>}
                  </div>}
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-center">
                <InfoIcon className="h-3 w-3 mr-1 text-slate-400" />
                Moderators can manage list settings and approve messages
              </p>
            </div>
            {/* Committees Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                Committees
              </label>
              <div className="relative" ref={committeeInputRef}>
                <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
                setShowCommitteeOptions(true);
                if (committeeInputRef.current.querySelector('input')) {
                  committeeInputRef.current.querySelector('input').focus();
                }
              }}>
                  {formData.committees.map(committee => <div key={committee.id} className="flex items-center bg-slate-100 rounded-md px-2 py-1">
                      <span className="text-sm text-slate-700 mr-1">
                        {committee.name}
                      </span>
                      <button onClick={e => handleRemoveCommittee(committee.id, e)} className="text-slate-400 hover:text-slate-600">
                        <CloseIcon className="h-3 w-3" />
                      </button>
                    </div>)}
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex items-center">
                      {(formData.committees.length === 0 || committeeSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                      <input type="text" value={committeeSearchTerm} onChange={e => setCommitteeSearchTerm(e.target.value)} onFocus={() => setShowCommitteeOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.committees.length > 0 ? '' : 'Search and add committees'} />
                    </div>
                  </div>
                </div>
                {showCommitteeOptions && <div ref={committeeDropdownRef} className="fixed z-50 mt-1 w-[calc(100%-12px)] bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{
                width: committeeInputRef.current ? committeeInputRef.current.offsetWidth + 'px' : 'auto',
                left: committeeInputRef.current ? committeeInputRef.current.getBoundingClientRect().left + 'px' : '0',
                top: committeeInputRef.current ? committeeInputRef.current.getBoundingClientRect().bottom + 8 + 'px' : '0'
              }}>
                    {filteredCommittees.length > 0 ? filteredCommittees.map(committee => <div key={committee.id} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleCommitteeToggle(committee.id)}>
                          <div className="h-4 w-4 border border-slate-300 rounded mr-2 flex items-center justify-center">
                            {formData.committees.some(c => c.id === committee.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-slate-700">
                              {committee.name}
                            </span>
                          </div>
                        </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                        No committees found
                      </div>}
                  </div>}
              </div>
            </div>
            {/* Members Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                Subscribers
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative" ref={memberInputRef}>
                <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
                setShowMemberOptions(true);
                if (memberInputRef.current.querySelector('input')) {
                  memberInputRef.current.querySelector('input').focus();
                }
              }}>
                  {formData.members.map(member => <div key={member.id} className="flex items-center bg-slate-100 rounded-md px-2 py-1">
                      <span className="text-sm text-slate-700 mr-1">
                        {member.name}
                      </span>
                      <button onClick={e => handleRemoveMember(member.id, e)} className="text-slate-400 hover:text-slate-600">
                        <CloseIcon className="h-3 w-3" />
                      </button>
                    </div>)}
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex items-center">
                      {(formData.members.length === 0 || memberSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                      <input type="text" value={memberSearchTerm} onChange={e => setMemberSearchTerm(e.target.value)} onFocus={() => setShowMemberOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.members.length > 0 ? '' : 'Search and add subscribers'} />
                    </div>
                  </div>
                </div>
                {showMemberOptions && <div ref={memberDropdownRef} className="fixed z-50 mt-1 w-[calc(100%-12px)] bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{
                width: memberInputRef.current ? memberInputRef.current.offsetWidth + 'px' : 'auto',
                left: memberInputRef.current ? memberInputRef.current.getBoundingClientRect().left + 'px' : '0',
                top: memberInputRef.current ? memberInputRef.current.getBoundingClientRect().bottom + 8 + 'px' : '0'
              }}>
                    {filteredMembers.length > 0 ? filteredMembers.map(member => <div key={member.id} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleMemberToggle(member.id)}>
                          <div className="h-4 w-4 border border-slate-300 rounded mr-2 flex items-center justify-center">
                            {formData.members.some(m => m.id === member.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                          </div>
                          <div className="flex items-center">
                            {member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-6 w-6 rounded-full mr-2 object-cover" /> : <div className="h-6 w-6 rounded-full bg-slate-200 mr-2 flex items-center justify-center text-xs text-slate-600">
                                {member.name.charAt(0)}
                              </div>}
                            <div>
                              <span className="text-sm text-slate-700">
                                {member.name}
                              </span>
                              <span className="text-xs text-slate-500 ml-1">
                                ({member.company})
                              </span>
                            </div>
                          </div>
                        </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                        No members found
                      </div>}
                  </div>}
              </div>
            </div>
          </div>
        </div>
        {/* Footer with actions */}
        <div className="p-6 flex justify-between">
          <button className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium" onClick={onClose}>
            Cancel
          </button>
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${!isFormValid ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-azure-500 text-white hover:bg-azure-600'}`} onClick={handleSubmit} disabled={!isFormValid}>
            Create Mailing List
          </button>
        </div>
      </div>
    </div>;
};