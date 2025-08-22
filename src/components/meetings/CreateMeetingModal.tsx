import React, { useEffect, useState, useRef } from 'react';
import { X as CloseIcon, CheckCircle as CheckCircleIcon, Users as UsersIcon, FileText as FileTextIcon, Calendar as CalendarIcon, Settings as SettingsIcon, Check as CheckIcon, Search as SearchIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
export const CreateMeetingModal = ({
  onClose
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    meetingTitle: '',
    committees: [],
    individuals: [],
    agenda: '',
    date: '',
    startHour: '09',
    startMinute: '00',
    startPeriod: 'AM',
    endHour: '10',
    endMinute: '00',
    endPeriod: 'AM',
    timezone: 'UTC',
    recurrenceType: 'none',
    weeklyInterval: '1',
    weeklyDays: [],
    monthlyDay: '1',
    monthlyWeekOccurrence: 'first',
    monthlyWeekDay: 'monday',
    isPublic: true,
    restrictToInvited: false,
    joinEarly: true,
    recordMeeting: true,
    generateTranscripts: true,
    uploadToYoutube: false,
    enableZoomAI: true,
    reviewAISummary: false,
    previousAttachments: ['Q2 Retrospective Summary', 'Architecture Decision Records']
  });
  const [committeeSearchTerm, setCommitteeSearchTerm] = useState('');
  const [individualSearchTerm, setIndividualSearchTerm] = useState('');
  const [showCommitteeOptions, setShowCommitteeOptions] = useState(false);
  const [showIndividualOptions, setShowIndividualOptions] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [attachmentSearchTerm, setAttachmentSearchTerm] = useState('');
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const committeeInputRef = useRef(null);
  const individualInputRef = useRef(null);
  const attachmentInputRef = useRef(null);
  const committeeDropdownRef = useRef(null);
  const individualDropdownRef = useRef(null);
  const attachmentDropdownRef = useRef(null);
  // Prevent scrolling on the main page when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  // Sample data for committees and individuals
  const allCommittees = [{
    id: 'security',
    name: 'Security Working Group'
  }, {
    id: 'technical',
    name: 'Technical Steering Committee'
  }, {
    id: 'documentation',
    name: 'Documentation Team'
  }, {
    id: 'community',
    name: 'Community Outreach'
  }, {
    id: 'governance',
    name: 'Governance Committee'
  }];
  const allIndividuals = [{
    id: 'sw',
    name: 'Sarah Wilson',
    company: 'Microsoft',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  }, {
    id: 'mc',
    name: 'Michael Chen',
    company: 'Intel',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  }, {
    id: 'aj',
    name: 'Alex Johnson',
    company: 'Google',
    profileImage: null
  }, {
    id: 'dm',
    name: 'David Martinez',
    company: 'Red Hat',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
  }, {
    id: 'ed',
    name: 'Emma Davis',
    company: 'IBM',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
  }, {
    id: 'jw',
    name: 'James Wilson',
    company: 'Cisco',
    profileImage: null
  }, {
    id: 'ob',
    name: 'Olivia Brown',
    company: 'Oracle',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
  }, {
    id: 'ng',
    name: 'Noah Garcia',
    company: 'Meta',
    profileImage: 'https://randomuser.me/api/portraits/men/55.jpg'
  }];
  // Sample data for previous attachments
  const allPreviousAttachments = ['Q2 Retrospective Summary', 'Architecture Decision Records', 'Technical Roadmap Q3-Q4', 'Security Vulnerability Assessment', 'Community Contribution Guidelines', 'Release Schedule 2025-2026', 'Performance Metrics Dashboard', 'Onboarding Documentation'];
  // Sort all dropdown options alphabetically
  const sortedCommittees = [...allCommittees].sort((a, b) => a.name.localeCompare(b.name));
  const sortedIndividuals = [...allIndividuals].sort((a, b) => a.name.localeCompare(b.name));
  const sortedAttachments = [...allPreviousAttachments].sort((a, b) => a.localeCompare(b));
  // Filtered committees based on search term
  const filteredCommittees = sortedCommittees.filter(committee => committee.name.toLowerCase().includes(committeeSearchTerm.toLowerCase()));
  // Filtered individuals based on search term
  const filteredIndividuals = sortedIndividuals.filter(individual => individual.name.toLowerCase().includes(individualSearchTerm.toLowerCase()) || individual.company.toLowerCase().includes(individualSearchTerm.toLowerCase()));
  // Filtered previous attachments based on search term
  const filteredAttachments = sortedAttachments.filter(attachment => attachment.toLowerCase().includes(attachmentSearchTerm.toLowerCase()));
  // Generate hours for dropdown
  const generateHours = () => {
    const hours = [];
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
  };
  // Generate minutes for dropdown - only 00, 15, 30, 45
  const generateMinutes = () => {
    return ['00', '15', '30', '45'];
  };
  const hours = generateHours();
  const minutes = generateMinutes();
  // Validate first step
  useEffect(() => {
    const hasMeetingTitle = formData.meetingTitle.trim() !== '';
    const hasParticipants = formData.committees.length > 0 || formData.individuals.length > 0;
    setIsFirstStepValid(hasMeetingTitle && hasParticipants);
  }, [formData.meetingTitle, formData.committees, formData.individuals]);
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
  const handleCommitteeToggle = committeeId => {
    setFormData(prev => {
      if (prev.committees.includes(committeeId)) {
        return {
          ...prev,
          committees: prev.committees.filter(id => id !== committeeId)
        };
      } else {
        return {
          ...prev,
          committees: [...prev.committees, committeeId]
        };
      }
    });
    // Clear search term when an option is selected
    setCommitteeSearchTerm('');
  };
  const handleIndividualToggle = individualId => {
    setFormData(prev => {
      if (prev.individuals.includes(individualId)) {
        return {
          ...prev,
          individuals: prev.individuals.filter(id => id !== individualId)
        };
      } else {
        return {
          ...prev,
          individuals: [...prev.individuals, individualId]
        };
      }
    });
    // Clear search term when an option is selected
    setIndividualSearchTerm('');
  };
  const handleAttachmentToggle = attachment => {
    setFormData(prev => {
      if (prev.previousAttachments.includes(attachment)) {
        return {
          ...prev,
          previousAttachments: prev.previousAttachments.filter(a => a !== attachment)
        };
      } else {
        return {
          ...prev,
          previousAttachments: [...prev.previousAttachments, attachment]
        };
      }
    });
    // Clear search term when an option is selected
    setAttachmentSearchTerm('');
  };
  const handleRemoveCommittee = (committeeId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      committees: prev.committees.filter(id => id !== committeeId)
    }));
  };
  const handleRemoveIndividual = (individualId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      individuals: prev.individuals.filter(id => id !== individualId)
    }));
  };
  const handleRemoveAttachment = (attachment, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      previousAttachments: prev.previousAttachments.filter(a => a !== attachment)
    }));
  };
  // Get selected committee names
  const getSelectedCommitteeNames = () => {
    return formData.committees.map(id => allCommittees.find(committee => committee.id === id)?.name);
  };
  // Get selected individual names
  const getSelectedIndividualNames = () => {
    return formData.individuals.map(id => allIndividuals.find(individual => individual.id === id));
  };
  const handleDayOfWeekToggle = day => {
    setFormData(prev => {
      if (prev.weeklyDays.includes(day)) {
        return {
          ...prev,
          weeklyDays: prev.weeklyDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          weeklyDays: [...prev.weeklyDays, day]
        };
      }
    });
  };
  const steps = [{
    id: 0,
    title: 'Title and Participants',
    icon: <UsersIcon className="h-5 w-5" />,
    fields: <div className="space-y-6">
          <div>
            <label htmlFor="meetingTitle" className="flex items-center text-sm font-medium text-slate-700 mb-1">
              Meeting Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input type="text" id="meetingTitle" value={formData.meetingTitle} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter meeting title" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
              Select Committee(s)
              {formData.committees.length === 0 && formData.individuals.length === 0 && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative" ref={committeeInputRef}>
              <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
            setShowCommitteeOptions(true);
            if (committeeInputRef.current.querySelector('input')) {
              committeeInputRef.current.querySelector('input').focus();
            }
          }}>
                {formData.committees.length > 0 && formData.committees.map(committeeId => {
              const committee = allCommittees.find(c => c.id === committeeId);
              return <div key={committeeId} className="flex items-center bg-slate-100 px-2 py-1 rounded-md">
                        <span className="text-sm text-slate-700">
                          {committee.name}
                        </span>
                        <button type="button" className="ml-1 text-slate-500 hover:text-slate-700" onClick={e => handleRemoveCommittee(committeeId, e)}>
                          <CloseIcon className="h-3 w-3" />
                        </button>
                      </div>;
            })}
                <div className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    {(formData.committees.length === 0 || committeeSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                    <input type="text" value={committeeSearchTerm} onChange={e => setCommitteeSearchTerm(e.target.value)} onFocus={() => setShowCommitteeOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.committees.length > 0 ? '' : 'Search and select committees'} />
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
                          {formData.committees.includes(committee.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                        </div>
                        <span className="text-sm text-slate-700">
                          {committee.name}
                        </span>
                      </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                      No committees found
                    </div>}
                </div>}
            </div>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
              Select Individual(s)
              {formData.committees.length === 0 && formData.individuals.length === 0 && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative" ref={individualInputRef}>
              <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
            setShowIndividualOptions(true);
            if (individualInputRef.current.querySelector('input')) {
              individualInputRef.current.querySelector('input').focus();
            }
          }}>
                {formData.individuals.length > 0 && formData.individuals.map(individualId => {
              const individual = allIndividuals.find(i => i.id === individualId);
              return <div key={individualId} className="flex items-center bg-slate-100 px-2 py-1 rounded-md">
                        <span className="text-sm text-slate-700">
                          {individual.name}
                        </span>
                        <button type="button" className="ml-1 text-slate-500 hover:text-slate-700" onClick={e => handleRemoveIndividual(individualId, e)}>
                          <CloseIcon className="h-3 w-3" />
                        </button>
                      </div>;
            })}
                <div className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    {(formData.individuals.length === 0 || individualSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                    <input type="text" value={individualSearchTerm} onChange={e => setIndividualSearchTerm(e.target.value)} onFocus={() => setShowIndividualOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.individuals.length > 0 ? '' : 'Search and select individuals'} />
                  </div>
                </div>
              </div>
              {showIndividualOptions && <div ref={individualDropdownRef} className="fixed z-50 mt-1 w-[calc(100%-12px)] bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{
            width: individualInputRef.current ? individualInputRef.current.offsetWidth + 'px' : 'auto',
            left: individualInputRef.current ? individualInputRef.current.getBoundingClientRect().left + 'px' : '0',
            top: individualInputRef.current ? individualInputRef.current.getBoundingClientRect().bottom + 8 + 'px' : '0'
          }}>
                  {filteredIndividuals.length > 0 ? filteredIndividuals.map(individual => <div key={individual.id} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleIndividualToggle(individual.id)}>
                        <div className="h-4 w-4 border border-slate-300 rounded mr-2 flex items-center justify-center">
                          {formData.individuals.includes(individual.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                        </div>
                        <div className="flex items-center">
                          {individual.profileImage ? <img src={individual.profileImage} alt={individual.name} className="h-6 w-6 rounded-full mr-2 object-cover" /> : <div className="h-6 w-6 rounded-full bg-slate-200 mr-2 flex items-center justify-center text-xs text-slate-600">
                              {individual.name.charAt(0)}
                            </div>}
                          <div>
                            <span className="text-sm text-slate-700">
                              {individual.name}
                            </span>
                            <span className="text-xs text-slate-500 ml-1">
                              ({individual.company})
                            </span>
                          </div>
                        </div>
                      </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                      No individuals found
                    </div>}
                </div>}
            </div>
          </div>
        </div>
  }, {
    id: 1,
    title: 'Agenda and Attachments',
    icon: <FileTextIcon className="h-5 w-5" />,
    fields: <div className="space-y-6">
          <div>
            <label htmlFor="agenda" className="block text-sm font-medium text-slate-700 mb-1">
              Agenda
            </label>
            <textarea id="agenda" rows={5} value={formData.agenda} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter meeting agenda"></textarea>
          </div>
          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-slate-700 mb-1">
              Link Attachments
            </label>
            <div className="flex gap-2">
              <input type="text" id="attachments" className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Paste link to attachment" />
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm">
                Add
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Previous Attachments
            </label>
            <div className="relative" ref={attachmentInputRef}>
              <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
            setShowAttachmentOptions(true);
            if (attachmentInputRef.current.querySelector('input')) {
              attachmentInputRef.current.querySelector('input').focus();
            }
          }}>
                {formData.previousAttachments.length > 0 && formData.previousAttachments.map(attachment => <div key={attachment} className="flex items-center bg-slate-100 px-2 py-1 rounded-md">
                      <span className="text-sm text-slate-700">
                        {attachment}
                      </span>
                      <button type="button" className="ml-1 text-slate-500 hover:text-slate-700" onClick={e => handleRemoveAttachment(attachment, e)}>
                        <CloseIcon className="h-3 w-3" />
                      </button>
                    </div>)}
                <div className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    {(formData.previousAttachments.length === 0 || attachmentSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                    <input type="text" value={attachmentSearchTerm} onChange={e => setAttachmentSearchTerm(e.target.value)} onFocus={() => setShowAttachmentOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.previousAttachments.length > 0 ? '' : 'Search and select attachments'} />
                  </div>
                </div>
              </div>
              {showAttachmentOptions && <div ref={attachmentDropdownRef} className="fixed z-50 mt-1 w-[calc(100%-12px)] bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto" style={{
            width: attachmentInputRef.current ? attachmentInputRef.current.offsetWidth + 'px' : 'auto',
            left: attachmentInputRef.current ? attachmentInputRef.current.getBoundingClientRect().left + 'px' : '0',
            top: attachmentInputRef.current ? attachmentInputRef.current.getBoundingClientRect().bottom + 8 + 'px' : '0'
          }}>
                  {filteredAttachments.length > 0 ? filteredAttachments.map(attachment => <div key={attachment} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleAttachmentToggle(attachment)}>
                        <div className="h-4 w-4 border border-slate-300 rounded mr-2 flex items-center justify-center">
                          {formData.previousAttachments.includes(attachment) && <CheckIcon className="h-3 w-3 text-azure-500" />}
                        </div>
                        <div className="flex items-center">
                          <FileTextIcon className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-sm text-slate-700">
                            {attachment}
                          </span>
                        </div>
                      </div>) : <div className="px-3 py-2 text-sm text-slate-500">
                      No attachments found
                    </div>}
                </div>}
            </div>
          </div>
        </div>
  }, {
    id: 2,
    title: 'Date & Time',
    icon: <CalendarIcon className="h-5 w-5" />,
    fields: <div className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Date
            </label>
            <input type="date" id="date" value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">
                Start Time
              </label>
              <div className="flex space-x-2">
                <div className="relative w-1/3">
                  <select id="startHour" value={formData.startHour} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    {hours.map(hour => <option key={`start-hour-${hour}`} value={hour}>
                        {hour}
                      </option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="relative w-1/3">
                  <select id="startMinute" value={formData.startMinute} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    {minutes.map(minute => <option key={`start-minute-${minute}`} value={minute}>
                        {minute}
                      </option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="relative w-1/3">
                  <select id="startPeriod" value={formData.startPeriod} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">
                End Time
              </label>
              <div className="flex space-x-2">
                <div className="relative w-1/3">
                  <select id="endHour" value={formData.endHour} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    {hours.map(hour => <option key={`end-hour-${hour}`} value={hour}>
                        {hour}
                      </option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="relative w-1/3">
                  <select id="endMinute" value={formData.endMinute} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    {minutes.map(minute => <option key={`end-minute-${minute}`} value={minute}>
                        {minute}
                      </option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="relative w-1/3">
                  <select id="endPeriod" value={formData.endPeriod} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 mb-1">
              Timezone
            </label>
            <div className="relative">
              <select id="timezone" value={formData.timezone} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (ET)</option>
                <option value="CST">Central Time (CT)</option>
                <option value="MST">Mountain Time (MT)</option>
                <option value="PST">Pacific Time (PT)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Recurrence
            </label>
            {/* None Option */}
            <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
              <div className="flex items-center h-5">
                <input type="radio" id="recurrence-none" name="recurrenceType" value="none" checked={formData.recurrenceType === 'none'} onChange={() => setFormData(prev => ({
              ...prev,
              recurrenceType: 'none'
            }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
              </div>
              <div className="ml-3">
                <label htmlFor="recurrence-none" className="block text-sm font-medium text-slate-700">
                  None
                </label>
                <p className="text-xs text-slate-500 mt-1">
                  This is a one-time meeting that won't repeat.
                </p>
              </div>
            </div>
            {/* Weekly Option */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="flex items-start p-3 hover:bg-slate-50">
                <div className="flex items-center h-5">
                  <input type="radio" id="recurrence-weekly" name="recurrenceType" value="weekly" checked={formData.recurrenceType === 'weekly'} onChange={() => setFormData(prev => ({
                ...prev,
                recurrenceType: 'weekly'
              }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                </div>
                <div className="ml-3">
                  <label htmlFor="recurrence-weekly" className="block text-sm font-medium text-slate-700">
                    Weekly
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Repeats on a weekly schedule. You can select which days of
                    the week and how often it repeats.
                  </p>
                </div>
              </div>
              {formData.recurrenceType === 'weekly' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                  <div className="space-y-3 ml-7">
                    <div className="flex items-center flex-wrap">
                      <span className="text-sm text-slate-700 mr-2">
                        Repeats every
                      </span>
                      <div className="relative w-16">
                        <select id="weeklyInterval" value={formData.weeklyInterval} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                      <span className="text-sm text-slate-700 ml-2">
                        week(s) on:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(day => <label key={day} className="flex items-center bg-white px-3 py-1.5 rounded border border-slate-200 hover:border-slate-300">
                          <input type="checkbox" checked={formData.weeklyDays.includes(day)} onChange={() => handleDayOfWeekToggle(day)} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded mr-2" />
                          <span className="text-sm text-slate-700">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </span>
                        </label>)}
                    </div>
                  </div>
                </div>}
            </div>
            {/* Monthly by Day Option */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="flex items-start p-3 hover:bg-slate-50">
                <div className="flex items-center h-5">
                  <input type="radio" id="recurrence-monthly-by-day" name="recurrenceType" value="monthlyByDay" checked={formData.recurrenceType === 'monthlyByDay'} onChange={() => setFormData(prev => ({
                ...prev,
                recurrenceType: 'monthlyByDay'
              }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                </div>
                <div className="ml-3">
                  <label htmlFor="recurrence-monthly-by-day" className="block text-sm font-medium text-slate-700">
                    Monthly (by date)
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Repeats on the same date each month (e.g., the 15th of every
                    month).
                  </p>
                </div>
              </div>
              {formData.recurrenceType === 'monthlyByDay' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                  <div className="ml-7">
                    <div className="flex items-center flex-wrap">
                      <span className="text-sm text-slate-700 mr-2">
                        Repeats on day
                      </span>
                      <div className="relative w-16">
                        <select id="monthlyDay" value={formData.monthlyDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                          {Array.from({
                      length: 31
                    }, (_, i) => i + 1).map(day => <option key={day} value={day}>
                              {day}
                            </option>)}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                      <span className="text-sm text-slate-700 ml-2">
                        of every month
                      </span>
                    </div>
                  </div>
                </div>}
            </div>
            {/* Monthly by Week Option */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <div className="flex items-start p-3 hover:bg-slate-50">
                <div className="flex items-center h-5">
                  <input type="radio" id="recurrence-monthly-by-week" name="recurrenceType" value="monthlyByWeek" checked={formData.recurrenceType === 'monthlyByWeek'} onChange={() => setFormData(prev => ({
                ...prev,
                recurrenceType: 'monthlyByWeek'
              }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                </div>
                <div className="ml-3">
                  <label htmlFor="recurrence-monthly-by-week" className="block text-sm font-medium text-slate-700">
                    Monthly (by day of week)
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Repeats on a specific day of the week each month (e.g.,
                    first Monday of every month).
                  </p>
                </div>
              </div>
              {formData.recurrenceType === 'monthlyByWeek' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                  <div className="ml-7">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm text-slate-700">
                        Repeats on the
                      </span>
                      <div className="relative w-24">
                        <select id="monthlyWeekOccurrence" value={formData.monthlyWeekOccurrence} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                          <option value="first">first</option>
                          <option value="second">second</option>
                          <option value="third">third</option>
                          <option value="fourth">fourth</option>
                          <option value="last">last</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                      <div className="relative w-32">
                        <select id="monthlyWeekDay" value={formData.monthlyWeekDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                          <option value="sunday">Sunday</option>
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                          <option value="saturday">Saturday</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                      <span className="text-sm text-slate-700">
                        of every month
                      </span>
                    </div>
                  </div>
                </div>}
            </div>
            {/* Yearly Option */}
            <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
              <div className="flex items-center h-5">
                <input type="radio" id="recurrence-yearly" name="recurrenceType" value="yearly" checked={formData.recurrenceType === 'yearly'} onChange={() => setFormData(prev => ({
              ...prev,
              recurrenceType: 'yearly'
            }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
              </div>
              <div className="ml-3">
                <label htmlFor="recurrence-yearly" className="block text-sm font-medium text-slate-700">
                  Yearly
                </label>
                <p className="text-xs text-slate-500 mt-1">
                  Repeats the same day and week of the year.
                </p>
              </div>
            </div>
          </div>
        </div>
  }, {
    id: 3,
    title: 'Meeting Settings',
    icon: <SettingsIcon className="h-5 w-5" />,
    fields: <div className="space-y-6">
          <div>
            <h4 className="text-base font-medium text-slate-800 mb-2">
              Configure how your meeting will behave and what features are
              enabled.
            </h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <h5 className="text-sm font-medium text-slate-700">
                  Show in Public Calendar
                </h5>
                <p className="text-xs text-slate-500 mt-1">
                  Make this meeting visible in the public calendar
                </p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="isPublic" checked={formData.isPublic} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h5 className="text-sm font-medium text-slate-700">
                  Restrict to invited users
                </h5>
                <p className="text-xs text-slate-500 mt-1">
                  Only allow invited participants to join
                </p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="restrictToInvited" checked={formData.restrictToInvited} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h5 className="text-sm font-medium text-slate-700">
                  Let users join 10 min early
                </h5>
                <p className="text-xs text-slate-500 mt-1">
                  Allow participants to join before the scheduled time
                </p>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="joinEarly" checked={formData.joinEarly} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Recording & AI Features
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h5 className="text-sm font-medium text-slate-700">
                    Record Meeting
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Automatically record the meeting
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="recordMeeting" checked={formData.recordMeeting} onChange={handleInputChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                  </label>
                </div>
              </div>
              {formData.recordMeeting && <>
                  <div className="flex items-center justify-between py-3 pl-6">
                    <div>
                      <h5 className="text-sm font-medium text-slate-700">
                        Generate Transcripts
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        Create text transcripts of the recording
                      </p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="generateTranscripts" checked={formData.generateTranscripts} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 pl-6">
                    <div>
                      <h5 className="text-sm font-medium text-slate-700">
                        Upload to YouTube
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        Automatically upload recording to YouTube
                      </p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="uploadToYoutube" checked={formData.uploadToYoutube} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                      </label>
                    </div>
                  </div>
                </>}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h5 className="text-sm font-medium text-slate-700">
                    Enable Zoom AI
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Use AI for meeting summaries and insights
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="enableZoomAI" checked={formData.enableZoomAI} onChange={handleInputChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                  </label>
                </div>
              </div>
              {formData.enableZoomAI && <div className="flex items-center justify-between py-3 pl-6">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700">
                      Review AI Summary before sharing?
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Manually review AI-generated summaries
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="reviewAISummary" checked={formData.reviewAISummary} onChange={handleInputChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                    </label>
                  </div>
                </div>}
            </div>
          </div>
        </div>
  }];
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const handleStepClick = stepId => {
    setActiveStep(stepId);
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (committeeDropdownRef.current && !committeeDropdownRef.current.contains(e.target) && committeeInputRef.current && !committeeInputRef.current.contains(e.target)) {
        setShowCommitteeOptions(false);
      }
      if (individualDropdownRef.current && !individualDropdownRef.current.contains(e.target) && individualInputRef.current && !individualInputRef.current.contains(e.target)) {
        setShowIndividualOptions(false);
      }
      if (attachmentDropdownRef.current && !attachmentDropdownRef.current.contains(e.target) && attachmentInputRef.current && !attachmentInputRef.current.contains(e.target)) {
        setShowAttachmentOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">
            Schedule Meeting from Scratch
          </h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Steps sidebar */}
          <div className="w-72 bg-slate-50 p-6 overflow-y-auto">
            <div className="space-y-4">
              {steps.map(step => <button key={step.id} className={`flex items-center w-full p-3 rounded-md text-left ${activeStep === step.id ? 'bg-azure-50 text-azure-700' : 'hover:bg-slate-100 text-slate-700'}`} onClick={() => handleStepClick(step.id)}>
                  <div className="flex items-center justify-center mr-3">
                    {activeStep > step.id ? <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> : activeStep === step.id ? <div className="h-5 w-5 rounded-full bg-azure-500 text-white flex items-center justify-center text-xs">
                        {step.id + 1}
                      </div> : <div className="h-5 w-5 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs">
                        {step.id + 1}
                      </div>}
                  </div>
                  <div className="flex items-center flex-nowrap">
                    <span className="mr-2">{step.icon}</span>
                    <span className="font-medium text-sm whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                </button>)}
            </div>
          </div>
          {/* Form content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto h-[600px] overflow-y-auto pr-4">
              {steps[activeStep].fields}
            </div>
          </div>
        </div>
        {/* Footer with actions */}
        <div className="p-6 flex justify-between">
          <button className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium" onClick={activeStep === 0 ? onClose : handlePrevious}>
            {activeStep === 0 ? 'Cancel' : 'Previous'}
          </button>
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${activeStep === 0 && !isFirstStepValid ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-azure-500 text-white hover:bg-azure-600'}`} onClick={activeStep === steps.length - 1 ? onClose : handleNext} disabled={activeStep === 0 && !isFirstStepValid}>
            {activeStep === steps.length - 1 ? 'Schedule Meeting' : 'Next'}
          </button>
        </div>
      </div>
    </div>;
};