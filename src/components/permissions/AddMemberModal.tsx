import React, { useEffect, useState } from 'react';
import { XIcon, SearchIcon, CheckIcon, UsersIcon, UserIcon, MailIcon, BriefcaseIcon, ShieldIcon, CalendarIcon } from 'lucide-react';
export const AddMemberModal = ({
  onClose
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    noCompany: false,
    selectedCommittees: [],
    committeePermissions: {}
  });
  // Mock data for LFX profiles
  const lfxProfiles = [{
    id: 'p1',
    name: 'John Smith',
    email: 'jsmith@example.com',
    company: 'Acme Corp',
    lfid: 'jsmith123'
  }, {
    id: 'p2',
    name: 'Emily Johnson',
    email: 'emily.j@techcorp.com',
    company: 'Tech Corporation',
    lfid: 'emilyj'
  }, {
    id: 'p3',
    name: 'Michael Williams',
    email: 'mwilliams@opendev.org',
    company: 'OpenDev',
    lfid: 'mwill'
  }, {
    id: 'p4',
    name: 'Sarah Davis',
    email: 'sdavis@linux.com',
    company: 'Linux Foundation',
    lfid: 'sdavis22'
  }];
  // Mock data for committees (alphabetically sorted)
  const committees = [{
    id: 3,
    name: 'Community Committee'
  }, {
    id: 4,
    name: 'Governing Board'
  }, {
    id: 2,
    name: 'Security Working Group'
  }, {
    id: 1,
    name: 'Technical Steering Committee'
  }];
  // Initialize committee permissions when committees are selected
  useEffect(() => {
    const newPermissions = {};
    formData.selectedCommittees.forEach(committeeId => {
      if (!formData.committeePermissions[committeeId]) {
        newPermissions[committeeId] = {
          isAdmin: false,
          canScheduleMeetings: false
        };
      }
    });
    if (Object.keys(newPermissions).length > 0) {
      setFormData(prev => ({
        ...prev,
        committeePermissions: {
          ...prev.committeePermissions,
          ...newPermissions
        }
      }));
    }
  }, [formData.selectedCommittees]);
  // Filter profiles based on search query
  const filteredProfiles = lfxProfiles.filter(profile => profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || profile.email.toLowerCase().includes(searchQuery.toLowerCase()) || profile.lfid.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };
  const handleSelectProfile = profile => {
    setSelectedProfile(profile);
    setFormData({
      ...formData,
      name: profile.name,
      email: profile.email,
      company: profile.company
    });
    setSearchQuery(`${profile.name} (${profile.lfid})`);
    setShowSearchResults(false);
  };
  const handleCommitteeToggle = committeeId => {
    setFormData(prev => {
      if (prev.selectedCommittees.includes(committeeId)) {
        // Remove committee and its permissions
        const {
          [committeeId]: _,
          ...remainingPermissions
        } = prev.committeePermissions;
        return {
          ...prev,
          selectedCommittees: prev.selectedCommittees.filter(id => id !== committeeId),
          committeePermissions: remainingPermissions
        };
      } else {
        // Add committee with default permissions
        return {
          ...prev,
          selectedCommittees: [...prev.selectedCommittees, committeeId],
          committeePermissions: {
            ...prev.committeePermissions,
            [committeeId]: {
              isAdmin: false,
              canScheduleMeetings: false
            }
          }
        };
      }
    });
  };
  const handlePermissionChange = (committeeId, field, value) => {
    setFormData(prev => {
      const updatedPermissions = {
        ...prev.committeePermissions,
        [committeeId]: {
          ...prev.committeePermissions[committeeId],
          [field]: value
        }
      };
      // If setting as admin, automatically enable scheduling meetings
      if (field === 'isAdmin' && value === true) {
        updatedPermissions[committeeId].canScheduleMeetings = true;
      }
      return {
        ...prev,
        committeePermissions: updatedPermissions
      };
    });
  };
  const handleInputChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      onClose('add');
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      onClose();
    }
  };
  const isStepValid = () => {
    if (activeStep === 0) {
      // Step 1 is valid if either a profile is selected or manual details are entered
      return selectedProfile || formData.name.trim() !== '' && formData.email.trim() !== '' && (formData.company.trim() !== '' || formData.noCompany);
    } else if (activeStep === 1) {
      // Step 2 is always valid now - no committee selection required
      return true;
    }
    // Step 3 is always valid
    return true;
  };
  const getSteps = () => [{
    title: 'Member Information',
    description: 'Find an existing LFX user or add a new member'
  }, {
    title: 'Committees',
    description: 'Select committees for this member'
  }, {
    title: 'Permissions',
    description: 'Set permissions for each committee'
  }];
  const steps = getSteps();
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">Add New Member</h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={() => onClose()}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Steps sidebar */}
          <div className="w-72 bg-slate-50 p-6 overflow-y-auto">
            <div className="space-y-6">
              {steps.map((step, index) => <div key={index} className={`${activeStep === index ? 'text-azure-600' : 'text-slate-600'}`}>
                  <div className="flex items-center mb-1">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${activeStep > index ? 'bg-emerald-100 text-emerald-600' : activeStep === index ? 'bg-azure-100 text-azure-600' : 'bg-slate-100 text-slate-500'}`}>
                      {activeStep > index ? <CheckIcon className="h-4 w-4" /> : <span className="text-xs font-medium">{index + 1}</span>}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  <p className="text-sm text-slate-500 ml-9">
                    {step.description}
                  </p>
                </div>)}
            </div>
          </div>
          {/* Form content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto h-[600px] overflow-y-auto pr-4">
              {/* Step 1: Member Information */}
              {activeStep === 0 && <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Search for Existing LFX User
                    </label>
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input type="text" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Search by name, email or LFID..." value={searchQuery} onChange={handleSearchInputChange} />
                      {showSearchResults && filteredProfiles.length > 0 && <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredProfiles.map(profile => <div key={profile.id} className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleSelectProfile(profile)}>
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                                  {profile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="text-sm font-medium">
                                    {profile.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {profile.email} • {profile.lfid}
                                  </div>
                                </div>
                              </div>
                            </div>)}
                        </div>}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Search by name, email or LFID to find existing users
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="px-2 bg-white text-sm text-slate-500">
                      Or enter member information manually
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" id="name" name="name" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter full name" value={formData.name} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="email" id="email" name="email" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter email address" value={formData.email} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" id="company" name="company" className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 ${formData.noCompany ? 'bg-slate-100 text-slate-400' : ''}`} placeholder="Enter company name" value={formData.company} onChange={handleInputChange} disabled={formData.noCompany} />
                      </div>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input type="checkbox" name="noCompany" className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" checked={formData.noCompany} onChange={handleInputChange} />
                          <span className="ml-2 text-sm text-slate-700">
                            No company affiliation
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Step 2: Committee Selection */}
              {activeStep === 1 && <div className="space-y-6">
                  <p className="text-sm text-slate-600">
                    Select which committees this member will be part of.
                  </p>
                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    {committees.map(committee => <div key={committee.id} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-200 last:border-b-0" onClick={() => handleCommitteeToggle(committee.id)}>
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded border flex items-center justify-center ${formData.selectedCommittees.includes(committee.id) ? 'bg-azure-500 border-azure-500' : 'border-slate-300'}`}>
                            {formData.selectedCommittees.includes(committee.id) && <CheckIcon className="h-3.5 w-3.5 text-white" />}
                          </div>
                          <span className="ml-3 text-sm font-medium text-slate-700">
                            {committee.name}
                          </span>
                        </div>
                      </div>)}
                  </div>
                  <div className="text-sm text-slate-600">
                    It's okay to add a member without assigning them to any
                    committees.
                  </div>
                </div>}
              {/* Step 3: Permissions */}
              {activeStep === 2 && <div className="space-y-6">
                  <p className="text-sm text-slate-600 mb-4">
                    Set permissions for each committee this member belongs to.
                  </p>
                  {formData.selectedCommittees.length > 0 ? formData.selectedCommittees.map(committeeId => {
                const committee = committees.find(c => c.id === committeeId);
                const permissions = formData.committeePermissions[committeeId] || {
                  isAdmin: false,
                  canScheduleMeetings: false
                };
                return <div key={committeeId} className="border border-slate-200 rounded-md p-4 space-y-4">
                          <h3 className="text-md font-medium text-slate-700 flex items-center">
                            <UsersIcon className="h-4 w-4 mr-2 text-slate-500" />
                            {committee.name}
                          </h3>
                          <div className="space-y-3 ml-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-700 flex items-center">
                                  <ShieldIcon className="h-4 w-4 mr-2 text-amber-500" />
                                  Committee Admin
                                </p>
                                <p className="text-xs text-slate-500 ml-6 mt-1">
                                  Can manage all aspects of the committee,
                                  including adding and removing members
                                </p>
                              </div>
                              <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer ${permissions.isAdmin ? 'bg-azure-500' : 'bg-slate-300'}`} onClick={() => handlePermissionChange(committeeId, 'isAdmin', !permissions.isAdmin)}>
                                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${permissions.isAdmin ? 'translate-x-4' : 'translate-x-0'}`}></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-700 flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-slate-500" />
                                  Schedule Committee Meetings
                                </p>
                                <p className="text-xs text-slate-500 ml-6 mt-1">
                                  Can create and schedule meetings for this
                                  committee
                                </p>
                              </div>
                              {permissions.isAdmin ? <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                  Enabled for admins
                                </div> : <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer ${permissions.canScheduleMeetings ? 'bg-azure-500' : 'bg-slate-300'}`} onClick={() => handlePermissionChange(committeeId, 'canScheduleMeetings', !permissions.canScheduleMeetings)}>
                                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${permissions.canScheduleMeetings ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>}
                            </div>
                          </div>
                        </div>;
              }) : <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-md">
                      No committees selected. You can still add this member with
                      global permissions.
                    </div>}
                  <div className="border border-slate-200 rounded-md p-4">
                    <h3 className="text-md font-medium text-slate-700">
                      Global Permissions
                    </h3>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-slate-500" />
                          Schedule Meetings with Project Members
                        </p>
                        <p className="text-xs text-slate-500 ml-6 mt-1">
                          Can schedule meetings with other project members
                        </p>
                      </div>
                      <div className="w-10 h-6 rounded-full flex items-center p-1 cursor-pointer bg-azure-500">
                        <div className="w-4 h-4 rounded-full bg-white transform transition-transform translate-x-4"></div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-between items-center">
          <button onClick={handleBack} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50">
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </button>
          <button onClick={handleNext} disabled={!isStepValid()} className={`px-4 py-2 rounded-md text-white ${isStepValid() ? 'bg-azure-500 hover:bg-azure-600' : 'bg-slate-300 cursor-not-allowed'}`}>
            {activeStep === steps.length - 1 ? 'Add Member' : 'Next'}
          </button>
        </div>
      </div>
    </div>;
};