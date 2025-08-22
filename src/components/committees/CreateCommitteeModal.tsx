import React, { useEffect, useState, useRef } from 'react';
import { X as CloseIcon, CheckCircle as CheckCircleIcon, Users as UsersIcon, FileText as FileTextIcon, Settings as SettingsIcon, Check as CheckIcon, Search as SearchIcon, GithubIcon, UserPlus as UserPlusIcon, AlertTriangle as AlertTriangleIcon, RefreshCw as RefreshCwIcon, ArrowRightCircle as ArrowRightCircleIcon, ChevronDown as ChevronDownIcon, ShieldIcon, CalendarIcon, Edit2 as EditIcon, PlusCircle as PlusCircleIcon, Trash2 as TrashIcon, UserCheck as UserCheckIcon } from 'lucide-react';
export const CreateCommitteeModal = ({
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  // Form data for manual committee creation
  const [manualFormData, setManualFormData] = useState({
    committeeName: '',
    description: '',
    members: [],
    chairperson: null,
    viceChair: null,
    secretary: null,
    roles: [{
      id: 'chair',
      name: 'Chair',
      description: 'Leads the committee and facilitates meetings',
      isVoting: true,
      canScheduleMeetings: true,
      isAdmin: true,
      isDefault: true
    }, {
      id: 'vice-chair',
      name: 'Vice Chair',
      description: 'Assists the chair and acts as chair in their absence',
      isVoting: true,
      canScheduleMeetings: true,
      isAdmin: false,
      isDefault: true
    }, {
      id: 'secretary',
      name: 'Secretary',
      description: 'Records minutes and manages committee documentation',
      isVoting: true,
      canScheduleMeetings: true,
      isAdmin: false,
      isDefault: true
    }, {
      id: 'member',
      name: 'Member',
      description: 'Regular committee member',
      isVoting: true,
      canScheduleMeetings: false,
      isAdmin: false,
      isDefault: true
    }]
  });
  // Form data for GitHub import
  const [importFormData, setImportFormData] = useState({
    githubOrg: '',
    selectedTeams: [],
    teamMappings: {},
    syncMode: 'keepSynced',
    conflictHandling: 'overwriteWithGitHub'
  });
  // State for role editing
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    isVoting: true,
    canScheduleMeetings: false,
    isAdmin: false
  });
  // Search terms
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  // Refs for dropdowns
  const memberInputRef = useRef(null);
  const memberDropdownRef = useRef(null);
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
  // Sample GitHub teams for the import flow
  const githubTeams = [{
    id: 'maintainers',
    name: 'maintainers',
    description: 'Core maintainers of the project',
    memberCount: 12
  }, {
    id: 'docs-team',
    name: 'docs-team',
    description: 'Documentation team members',
    memberCount: 8
  }, {
    id: 'security-team',
    name: 'security-team',
    description: 'Security working group',
    memberCount: 6
  }, {
    id: 'release-team',
    name: 'release-team',
    description: 'Release managers',
    memberCount: 5
  }, {
    id: 'sig-networking',
    name: 'sig-networking',
    description: 'Special Interest Group: Networking',
    memberCount: 15
  }, {
    id: 'sig-storage',
    name: 'sig-storage',
    description: 'Special Interest Group: Storage',
    memberCount: 10
  }, {
    id: 'wg-policy',
    name: 'wg-policy',
    description: 'Working Group: Policy',
    memberCount: 7
  }, {
    id: 'contributors',
    name: 'contributors',
    description: 'All project contributors',
    memberCount: 47
  }];
  // Committee types for mapping GitHub teams
  const committeeTypes = [{
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
    id: 'sig',
    name: 'Special Interest Group'
  }, {
    id: 'wg',
    name: 'Working Group'
  }, {
    id: 'custom',
    name: 'Custom Committee'
  }];
  // Sort all dropdown options alphabetically
  const sortedMembers = [...allMembers].sort((a, b) => a.name.localeCompare(b.name));
  // Filtered members based on search term
  const filteredMembers = sortedMembers.filter(member => member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.company.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()));
  // Validate first step of manual committee creation
  useEffect(() => {
    if (activeTab === 'manual') {
      const hasCommitteeName = manualFormData.committeeName.trim() !== '';
      setIsFirstStepValid(hasCommitteeName);
    } else {
      // GitHub import validation
      const hasGitHubOrg = importFormData.githubOrg !== '';
      setIsFirstStepValid(hasGitHubOrg);
    }
  }, [manualFormData.committeeName, importFormData.githubOrg, activeTab]);
  const handleInputChange = e => {
    const {
      id,
      value,
      type,
      checked
    } = e.target;
    if (activeTab === 'manual') {
      setManualFormData(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value
      }));
    } else {
      setImportFormData(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value
      }));
    }
  };
  // Role management functions
  const handleEditRole = roleId => {
    const role = manualFormData.roles.find(role => role.id === roleId);
    if (role) {
      setEditingRoleId(roleId);
      setRoleFormData({
        name: role.name,
        description: role.description,
        isVoting: role.isVoting,
        canScheduleMeetings: role.canScheduleMeetings,
        isAdmin: role.isAdmin
      });
    }
  };
  const handleCancelEditRole = () => {
    setEditingRoleId(null);
    setRoleFormData({
      name: '',
      description: '',
      isVoting: true,
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleSaveRole = () => {
    if (editingRoleId) {
      // Update existing role
      setManualFormData(prev => ({
        ...prev,
        roles: prev.roles.map(role => role.id === editingRoleId ? {
          ...role,
          name: roleFormData.name,
          description: roleFormData.description,
          isVoting: roleFormData.isVoting,
          canScheduleMeetings: roleFormData.canScheduleMeetings,
          isAdmin: roleFormData.isAdmin
        } : role)
      }));
    } else {
      // Add new role
      const newRoleId = `role-${Date.now()}`;
      setManualFormData(prev => ({
        ...prev,
        roles: [...prev.roles, {
          id: newRoleId,
          name: roleFormData.name,
          description: roleFormData.description,
          isVoting: roleFormData.isVoting,
          canScheduleMeetings: roleFormData.canScheduleMeetings,
          isAdmin: roleFormData.isAdmin,
          isDefault: false
        }]
      }));
    }
    // Reset form
    setEditingRoleId(null);
    setRoleFormData({
      name: '',
      description: '',
      isVoting: true,
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleAddNewRole = () => {
    setEditingRoleId(null);
    setRoleFormData({
      name: '',
      description: '',
      isVoting: true,
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleDeleteRole = roleId => {
    // Don't allow deleting default roles
    const role = manualFormData.roles.find(r => r.id === roleId);
    if (role && !role.isDefault) {
      setManualFormData(prev => ({
        ...prev,
        roles: prev.roles.filter(role => role.id !== roleId),
        // Update any members that had this role
        members: prev.members.map(member => member.role === role.name ? {
          ...member,
          role: 'Member'
        } : member)
      }));
    }
  };
  const handleRoleFormChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setRoleFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleMemberToggle = memberId => {
    setManualFormData(prev => {
      if (prev.members.some(m => m.id === memberId)) {
        return {
          ...prev,
          members: prev.members.filter(m => m.id !== memberId)
        };
      } else {
        const member = allMembers.find(m => m.id === memberId);
        return {
          ...prev,
          members: [...prev.members, {
            ...member,
            role: 'Member',
            isVoting: prev.roles.find(r => r.name === 'Member')?.isVoting || false
          }]
        };
      }
    });
    setMemberSearchTerm('');
  };
  const handleRemoveMember = (memberId, e) => {
    e.stopPropagation();
    setManualFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
      chairperson: prev.chairperson === memberId ? null : prev.chairperson,
      viceChair: prev.viceChair === memberId ? null : prev.viceChair,
      secretary: prev.secretary === memberId ? null : prev.secretary
    }));
  };
  const handleRoleChange = (memberId, roleName) => {
    setManualFormData(prev => {
      // Find the role to get its permissions
      const role = prev.roles.find(r => r.name === roleName);
      // Update member role and voting status based on role definition
      const updatedMembers = prev.members.map(m => m.id === memberId ? {
        ...m,
        role: roleName,
        isVoting: role?.isVoting || false
      } : m);
      // Update officer positions
      let updatedData = {
        ...prev,
        members: updatedMembers
      };
      if (roleName === 'Chair') {
        updatedData.chairperson = memberId;
      } else if (roleName === 'Vice Chair') {
        updatedData.viceChair = memberId;
      } else if (roleName === 'Secretary') {
        updatedData.secretary = memberId;
      }
      return updatedData;
    });
  };
  const handleVotingStatusChange = (memberId, isVoting) => {
    setManualFormData(prev => ({
      ...prev,
      members: prev.members.map(m => m.id === memberId ? {
        ...m,
        isVoting
      } : m)
    }));
  };
  const handleTeamToggle = teamId => {
    setImportFormData(prev => {
      if (prev.selectedTeams.includes(teamId)) {
        const updatedTeams = prev.selectedTeams.filter(id => id !== teamId);
        const {
          [teamId]: _,
          ...updatedMappings
        } = prev.teamMappings;
        return {
          ...prev,
          selectedTeams: updatedTeams,
          teamMappings: updatedMappings
        };
      } else {
        // Default mapping suggestion based on team name
        let suggestedMapping = 'custom';
        const teamName = githubTeams.find(t => t.id === teamId)?.name.toLowerCase() || '';
        if (teamName.includes('maintain')) suggestedMapping = 'tsc';else if (teamName.includes('security')) suggestedMapping = 'security';else if (teamName.includes('doc')) suggestedMapping = 'docs';else if (teamName.includes('community')) suggestedMapping = 'community';else if (teamName.includes('governance')) suggestedMapping = 'governance';else if (teamName.includes('outreach')) suggestedMapping = 'outreach';else if (teamName.startsWith('sig-')) suggestedMapping = 'sig';else if (teamName.startsWith('wg-')) suggestedMapping = 'wg';
        return {
          ...prev,
          selectedTeams: [...prev.selectedTeams, teamId],
          teamMappings: {
            ...prev.teamMappings,
            [teamId]: {
              type: suggestedMapping,
              customName: teamName
            }
          }
        };
      }
    });
  };
  const handleTeamMappingChange = (teamId, field, value) => {
    setImportFormData(prev => ({
      ...prev,
      teamMappings: {
        ...prev.teamMappings,
        [teamId]: {
          ...prev.teamMappings[teamId],
          [field]: value
        }
      }
    }));
  };
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      onClose('create');
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
  const getSelectedTeam = teamId => {
    return githubTeams.find(team => team.id === teamId);
  };
  // Get committee type name
  const getCommitteeTypeName = typeId => {
    return committeeTypes.find(type => type.id === typeId)?.name || 'Custom Committee';
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(e.target) && memberInputRef.current && !memberInputRef.current.contains(e.target)) {
        setShowMemberOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Get steps based on active tab
  const getSteps = () => {
    if (activeTab === 'manual') {
      return [{
        id: 0,
        title: 'Committee Details',
        icon: <UsersIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <label htmlFor="committeeName" className="flex items-center text-sm font-medium text-slate-700 mb-1">
                  Committee Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text" id="committeeName" value={manualFormData.committeeName} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter committee name" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea id="description" rows={3} value={manualFormData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter committee description"></textarea>
              </div>
            </div>
      }, {
        id: 1,
        title: 'Committee Roles',
        icon: <UserCheckIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Define Committee Roles
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Configure roles, descriptions, and permissions for this
                  committee. These roles will be available when adding members.
                </p>
              </div>
              {/* Role editing form */}
              {(editingRoleId !== null || roleFormData.name) && <div className="border border-azure-100 bg-azure-50 rounded-md p-4 mb-6">
                  <h5 className="text-sm font-medium text-slate-700 mb-3">
                    {editingRoleId !== null ? 'Edit Role' : 'Add New Role'}
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="roleName" className="block text-sm font-medium text-slate-700 mb-1">
                        Role Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="roleName" name="name" value={roleFormData.name} onChange={handleRoleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter role name" />
                    </div>
                    <div>
                      <label htmlFor="roleDescription" className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea id="roleDescription" name="description" rows={2} value={roleFormData.description} onChange={handleRoleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter role description" />
                    </div>
                    <div className="space-y-3">
                      <h6 className="text-sm font-medium text-slate-700">
                        Permissions
                      </h6>
                      <div className="flex items-center">
                        <input type="checkbox" id="isVoting" name="isVoting" checked={roleFormData.isVoting} onChange={handleRoleFormChange} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" />
                        <label htmlFor="isVoting" className="ml-2 text-sm text-slate-700">
                          Voting Member
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="canScheduleMeetings" name="canScheduleMeetings" checked={roleFormData.canScheduleMeetings} onChange={handleRoleFormChange} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" />
                        <label htmlFor="canScheduleMeetings" className="ml-2 text-sm text-slate-700">
                          Can Schedule Meetings
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={roleFormData.isAdmin} onChange={handleRoleFormChange} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" />
                        <label htmlFor="isAdmin" className="ml-2 text-sm text-slate-700">
                          Committee Admin
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <button type="button" onClick={handleCancelEditRole} className="px-3 py-1.5 border border-slate-300 text-slate-700 text-sm rounded-md hover:bg-slate-50">
                        Cancel
                      </button>
                      <button type="button" onClick={handleSaveRole} disabled={!roleFormData.name} className={`px-3 py-1.5 text-white text-sm rounded-md ${roleFormData.name ? 'bg-azure-500 hover:bg-azure-600' : 'bg-slate-300 cursor-not-allowed'}`}>
                        {editingRoleId !== null ? 'Save Changes' : 'Add Role'}
                      </button>
                    </div>
                  </div>
                </div>}
              {/* Roles list */}
              <div className="rounded-md overflow-hidden border border-slate-200">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Permissions
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {manualFormData.roles.map((role, index) => <tr key={role.id} className={index !== 0 ? 'border-t border-slate-200' : ''}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-700">
                            {role.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-slate-500">
                            {role.description}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {role.isVoting && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                                Voting
                              </span>}
                            {role.canScheduleMeetings && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-azure-50 text-azure-700">
                                Schedule Meetings
                              </span>}
                            {role.isAdmin && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700">
                                Admin
                              </span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <button onClick={() => handleEditRole(role.id)} className="text-azure-500 hover:text-azure-600 mr-3">
                            <EditIcon className="h-4 w-4" />
                          </button>
                          {!role.isDefault && <button onClick={() => handleDeleteRole(role.id)} className="text-slate-400 hover:text-slate-600">
                              <TrashIcon className="h-4 w-4" />
                            </button>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              {/* Add new role button */}
              {!roleFormData.name && editingRoleId === null && <button onClick={handleAddNewRole} className="mt-4 flex items-center text-sm text-azure-600 hover:text-azure-700 font-medium">
                  <PlusCircleIcon className="h-4 w-4 mr-1.5" />
                  Add Custom Role
                </button>}
              <div className="mt-4 p-4 bg-slate-50 rounded-md text-sm text-slate-600">
                <p className="font-medium mb-2">About Committee Roles</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Default roles (Chair, Vice Chair, Secretary, Member) cannot
                    be deleted
                  </li>
                  <li>
                    Roles define what permissions members have within the
                    committee
                  </li>
                  <li>
                    You can add custom roles specific to your committee's needs
                  </li>
                </ul>
              </div>
            </div>
      }, {
        id: 2,
        title: 'Members',
        icon: <UserPlusIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
                  Add Members
                </label>
                <div className="relative" ref={memberInputRef}>
                  <div className="min-h-[40px] flex flex-wrap items-center gap-2 w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-azure-500 focus-within:border-azure-500 cursor-text" onClick={() => {
                setShowMemberOptions(true);
                if (memberInputRef.current.querySelector('input')) {
                  memberInputRef.current.querySelector('input').focus();
                }
              }}>
                    <div className="flex-1 min-w-[120px]">
                      <div className="flex items-center">
                        {(manualFormData.members.length === 0 || memberSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                        <input type="text" value={memberSearchTerm} onChange={e => setMemberSearchTerm(e.target.value)} onFocus={() => setShowMemberOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={manualFormData.members.length > 0 ? '' : 'Search and add members'} />
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
                              {manualFormData.members.some(m => m.id === member.id) && <CheckIcon className="h-3 w-3 text-azure-500" />}
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
              {/* Selected Members List */}
              {manualFormData.members.length > 0 && <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">
                    Committee Members
                  </h4>
                  <div className="rounded-md overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Voting Status
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {manualFormData.members.map((member, index) => <tr key={member.id} className={index !== 0 ? 'mt-1' : ''}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                {member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-8 w-8 rounded-full mr-3 object-cover" /> : <div className="h-8 w-8 rounded-full bg-slate-200 mr-3 flex items-center justify-center text-sm text-slate-600">
                                    {member.name.charAt(0)}
                                  </div>}
                                <div>
                                  <div className="text-sm font-medium text-slate-700">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="relative">
                                <select value={member.role} onChange={e => handleRoleChange(member.id, e.target.value)} className="block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-azure-500 focus:border-azure-500 text-sm">
                                  {manualFormData.roles.map(role => <option key={role.id} value={role.name}>
                                      {role.name}
                                    </option>)}
                                </select>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="relative">
                                <select value={member.isVoting ? 'voting' : 'nonvoting'} onChange={e => handleVotingStatusChange(member.id, e.target.value === 'voting')} className="block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-azure-500 focus:border-azure-500 text-sm">
                                  <option value="voting">Voting</option>
                                  <option value="nonvoting">Non-Voting</option>
                                </select>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button onClick={e => handleRemoveMember(member.id, e)} className="text-slate-400 hover:text-slate-600">
                                <CloseIcon className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>}
            </div>
      }, {
        id: 3,
        title: 'Settings',
        icon: <SettingsIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Committee Settings
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Configure additional options for your committee.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700">
                      Public Committee
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Make this committee visible in the public directory
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="isPublic" checked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                    </label>
                  </div>
                </div>
                {/* Additional settings note */}
                <div className="mt-6 p-4 bg-slate-50 rounded-md">
                  <p className="text-sm text-slate-600">
                    Additional committee settings like voting and mailing lists
                    will be available in future updates.
                  </p>
                </div>
              </div>
            </div>
      }];
    } else {
      // GitHub import steps
      return [{
        id: 0,
        title: 'Connect GitHub',
        icon: <GithubIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Connect to GitHub Organization
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Import committee memberships and permissions from your GitHub
                  organization.
                </p>
              </div>
              {!importFormData.githubOrg ? <div className="flex flex-col items-center justify-center py-8 bg-slate-50 rounded-lg">
                  <GithubIcon className="h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">
                    Connect GitHub Organization
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
                    This will allow LFX Projects to read your organization's
                    teams and members for import.
                  </p>
                  <button className="flex items-center bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md transition-colors" onClick={() => setImportFormData(prev => ({
              ...prev,
              githubOrg: 'CNCF'
            }))}>
                    <GithubIcon className="h-5 w-5 mr-2" />
                    Connect with GitHub
                  </button>
                </div> : <div className="space-y-6">
                  <div className="p-4 bg-emerald-50 rounded-md flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        Successfully connected to GitHub
                      </p>
                      <p className="text-sm text-emerald-700 mt-1">
                        Organization:{' '}
                        <span className="font-medium">
                          {importFormData.githubOrg}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="githubOrg" className="block text-sm font-medium text-slate-700 mb-1">
                      GitHub Organization
                    </label>
                    <div className="relative">
                      <select id="githubOrg" value={importFormData.githubOrg} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                        <option value="CNCF">CNCF</option>
                        <option value="Kubernetes">Kubernetes</option>
                        <option value="Cilium">Cilium</option>
                        <option value="Envoy">Envoy</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 px-4 bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <RefreshCwIcon className="h-5 w-5 text-slate-500 mr-2" />
                      <span className="text-sm text-slate-700">
                        Last synced: Just now
                      </span>
                    </div>
                    <button className="text-sm text-azure-600 hover:text-azure-700 font-medium">
                      Refresh Teams
                    </button>
                  </div>
                </div>}
            </div>
      }, {
        id: 1,
        title: 'Select Teams',
        icon: <UsersIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Select GitHub Teams to Import
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Choose which teams you want to import as committees.
                </p>
              </div>
              <div className="rounded-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" checked={importFormData.selectedTeams.length === githubTeams.length} onChange={() => {
                        if (importFormData.selectedTeams.length === githubTeams.length) {
                          // Deselect all
                          setImportFormData(prev => ({
                            ...prev,
                            selectedTeams: [],
                            teamMappings: {}
                          }));
                        } else {
                          // Select all
                          const allTeamIds = githubTeams.map(team => team.id);
                          const allMappings = {};
                          githubTeams.forEach(team => {
                            allMappings[team.id] = {
                              type: 'custom',
                              customName: team.name
                            };
                          });
                          setImportFormData(prev => ({
                            ...prev,
                            selectedTeams: allTeamIds,
                            teamMappings: allMappings
                          }));
                        }
                      }} />
                          <span className="ml-2">Select</span>
                        </div>
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Team Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Members
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {githubTeams.map((team, index) => <tr key={team.id} className={`${importFormData.selectedTeams.includes(team.id) ? 'bg-azure-50' : 'hover:bg-slate-50'} ${index !== 0 ? 'mt-1' : ''}`} onClick={() => handleTeamToggle(team.id)}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input type="checkbox" className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded" checked={importFormData.selectedTeams.includes(team.id)} onChange={e => {
                      e.stopPropagation();
                      handleTeamToggle(team.id);
                    }} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-700">
                            {team.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-slate-500">
                            {team.description || 'No description'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">
                            {team.memberCount} members
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              {importFormData.selectedTeams.length > 0 && <div className="p-4 bg-slate-50 rounded-md">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">
                      {importFormData.selectedTeams.length}
                    </span>{' '}
                    teams selected
                  </p>
                </div>}
            </div>
      }, {
        id: 2,
        title: 'Map Teams',
        icon: <ArrowRightCircleIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Map GitHub Teams to Committees
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Specify how each GitHub team should be imported into LFX
                  Projects.
                </p>
              </div>
              {importFormData.selectedTeams.length === 0 ? <div className="p-6 bg-slate-50 rounded-lg text-center">
                  <p className="text-slate-600">
                    No teams selected. Please go back and select teams to
                    import.
                  </p>
                </div> : <div className="rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          GitHub Team
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Committee Type
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Committee Name
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {importFormData.selectedTeams.map((teamId, index) => {
                  const team = getSelectedTeam(teamId);
                  const mapping = importFormData.teamMappings[teamId] || {
                    type: 'custom',
                    customName: team.name
                  };
                  return <tr key={teamId} className={index !== 0 ? 'mt-1' : ''}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <GithubIcon className="h-4 w-4 text-slate-400 mr-2" />
                                <div className="text-sm font-medium text-slate-700">
                                  {team.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="relative">
                                <select value={mapping.type} onChange={e => handleTeamMappingChange(teamId, 'type', e.target.value)} className="block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-azure-500 focus:border-azure-500 text-sm">
                                  {committeeTypes.map(type => <option key={type.id} value={type.id}>
                                      {type.name}
                                    </option>)}
                                </select>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input type="text" value={mapping.customName} onChange={e => handleTeamMappingChange(teamId, 'customName', e.target.value)} className="block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-azure-500 focus:border-azure-500 text-sm" placeholder="Committee name" />
                            </td>
                          </tr>;
                })}
                    </tbody>
                  </table>
                </div>}
              <div className="p-4 bg-slate-50 rounded-md space-y-4">
                <h5 className="text-sm font-medium text-slate-700">
                  Role Mapping
                </h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-slate-600">
                      GitHub Team Maintainer → Committee Chair
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-azure-500 rounded-full mr-2"></div>
                    <span className="text-slate-600">
                      GitHub Team Member → Committee Member
                    </span>
                  </div>
                </div>
              </div>
            </div>
      }, {
        id: 3,
        title: 'Preview & Sync',
        icon: <FileTextIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Preview Import Changes
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Review the committees and members that will be imported.
                </p>
              </div>
              {importFormData.selectedTeams.length === 0 ? <div className="p-6 bg-slate-50 rounded-lg text-center">
                  <p className="text-slate-600">
                    No teams selected. Please go back and select teams to
                    import.
                  </p>
                </div> : <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-md">
                    <h5 className="text-sm font-medium text-slate-700 mb-3">
                      Summary
                    </h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-slate-500">New Committees</p>
                        <p className="text-lg font-medium text-slate-800">
                          {importFormData.selectedTeams.length}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="text-xs text-slate-500">New Members</p>
                        <p className="text-lg font-medium text-slate-800">
                          {/* Sum of all team member counts */}
                          {importFormData.selectedTeams.reduce((sum, teamId) => {
                      const team = getSelectedTeam(teamId);
                      return sum + team.memberCount;
                    }, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3">
                      <h5 className="text-sm font-medium text-slate-700">
                        New Committees to Create
                      </h5>
                    </div>
                    <div>
                      {importFormData.selectedTeams.map((teamId, index) => {
                  const team = getSelectedTeam(teamId);
                  const mapping = importFormData.teamMappings[teamId];
                  return <div key={teamId} className={`p-4 hover:bg-slate-50 ${index !== 0 ? 'mt-1' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h6 className="text-sm font-medium text-slate-800">
                                  {mapping.customName}
                                </h6>
                                <p className="text-xs text-slate-500">
                                  {getCommitteeTypeName(mapping.type)}
                                </p>
                              </div>
                              <div className="flex items-center bg-slate-100 px-2 py-1 rounded text-xs text-slate-600">
                                <GithubIcon className="h-3 w-3 mr-1" />
                                Managed by GitHub
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-slate-500">
                              <UsersIcon className="h-3 w-3 mr-1" />
                              {team.memberCount} members
                            </div>
                          </div>;
                })}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-md space-y-4">
                    <h5 className="text-sm font-medium text-slate-700">
                      Sync Settings
                    </h5>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1">
                        Sync Mode
                      </label>
                      <div className="relative">
                        <select id="syncMode" value={importFormData.syncMode} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                          <option value="keepSynced">
                            Keep Synced (ongoing automatic sync)
                          </option>
                          <option value="oneTime">
                            One-time Import (snapshot, no sync)
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-1">
                        Conflict Handling
                      </label>
                      <div className="relative">
                        <select id="conflictHandling" value={importFormData.conflictHandling} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-10">
                          <option value="overwriteWithGitHub">
                            Overwrite with GitHub data
                          </option>
                          <option value="keepLfx">
                            Keep LFX data if conflicts
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDownIcon className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    {importFormData.syncMode === 'keepSynced' && <div className="p-3 bg-azure-50 rounded text-sm text-azure-800 flex items-start">
                        <AlertTriangleIcon className="h-5 w-5 text-azure-500 mr-2 flex-shrink-0" />
                        <p>
                          Committees synced from GitHub will be read-only in
                          LFX. Members and roles can only be modified in GitHub.
                        </p>
                      </div>}
                  </div>
                </div>}
            </div>
      }];
    }
  };
  const steps = getSteps();
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">
            Create Committee
          </h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Tabs */}
        <div>
          <div className="flex">
            <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'manual' ? 'border-b-2 border-azure-500 text-azure-600' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => {
            setActiveTab('manual');
            setActiveStep(0);
          }}>
              Create Manually
            </button>
            <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'github' ? 'border-b-2 border-azure-500 text-azure-600' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => {
            setActiveTab('github');
            setActiveStep(0);
          }}>
              Import from GitHub
            </button>
          </div>
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
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${activeStep === 0 && !isFirstStepValid ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-azure-500 text-white hover:bg-azure-600'}`} onClick={activeStep === steps.length - 1 ? () => onClose('create') : handleNext} disabled={activeStep === 0 && !isFirstStepValid}>
            {activeStep === steps.length - 1 ? activeTab === 'manual' ? 'Create Committee' : 'Import Committees' : 'Next'}
          </button>
        </div>
      </div>
    </div>;
};