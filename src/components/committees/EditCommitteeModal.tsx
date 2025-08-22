import React, { useEffect, useState, useRef } from 'react';
import { X as XIcon, Check as CheckIcon, Users as UsersIcon, UserCheck as UserCheckIcon, Settings as SettingsIcon, CheckCircle as CheckCircleIcon, Edit2 as EditIcon, Trash2 as TrashIcon, PlusCircle as PlusCircleIcon, Search as SearchIcon } from 'lucide-react';
export const EditCommitteeModal = ({
  onClose,
  committee
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: committee.name,
    description: committee.description,
    members: [...committee.members],
    roles: [{
      id: 'chair',
      name: 'Chair',
      description: 'Leads the committee and facilitates meetings',
      canScheduleMeetings: true,
      isAdmin: true,
      isDefault: true
    }, {
      id: 'vice-chair',
      name: 'Vice Chair',
      description: 'Assists the chair and acts as chair in their absence',
      canScheduleMeetings: true,
      isAdmin: false,
      isDefault: true
    }, {
      id: 'secretary',
      name: 'Secretary',
      description: 'Records minutes and manages committee documentation',
      canScheduleMeetings: true,
      isAdmin: false,
      isDefault: true
    }, {
      id: 'member',
      name: 'Member',
      description: 'Regular committee member',
      canScheduleMeetings: false,
      isAdmin: false,
      isDefault: true
    }],
    chairperson: null,
    viceChair: null,
    secretary: null,
    isPublic: true
  });
  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });
  // State for role editing
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    canScheduleMeetings: false,
    isAdmin: false
  });
  // Member search and dropdown state
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [showMemberOptions, setShowMemberOptions] = useState(false);
  const memberInputRef = useRef(null);
  const memberDropdownRef = useRef(null);
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
  // Sort all dropdown options alphabetically
  const sortedMembers = [...allMembers].sort((a, b) => a.name.localeCompare(b.name));
  // Filtered members based on search term
  const filteredMembers = sortedMembers.filter(member => member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.company.toLowerCase().includes(memberSearchTerm.toLowerCase()) || member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()));
  // Prevent scrolling on the main page when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
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
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleToggleChange = field => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  const validateForm = () => {
    const newErrors = {
      name: '',
      description: ''
    };
    if (!formData.name.trim()) {
      newErrors.name = 'Committee name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    setErrors(newErrors);
    return !newErrors.name && !newErrors.description;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, this would update the committee data
      console.log('Updating committee:', formData);
      onClose('updated');
    }
  };
  // Role management functions
  const handleEditRole = roleId => {
    const role = formData.roles.find(role => role.id === roleId);
    if (role) {
      setEditingRoleId(roleId);
      setRoleFormData({
        name: role.name,
        description: role.description,
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
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleSaveRole = () => {
    if (editingRoleId) {
      // Update existing role
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.map(role => role.id === editingRoleId ? {
          ...role,
          name: roleFormData.name,
          description: roleFormData.description,
          canScheduleMeetings: roleFormData.canScheduleMeetings,
          isAdmin: roleFormData.isAdmin
        } : role)
      }));
    } else {
      // Add new role
      const newRoleId = `role-${Date.now()}`;
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, {
          id: newRoleId,
          name: roleFormData.name,
          description: roleFormData.description,
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
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleAddNewRole = () => {
    setEditingRoleId(null);
    setRoleFormData({
      name: '',
      description: '',
      canScheduleMeetings: false,
      isAdmin: false
    });
  };
  const handleDeleteRole = roleId => {
    // Don't allow deleting default roles
    const role = formData.roles.find(r => r.id === roleId);
    if (role && !role.isDefault) {
      setFormData(prev => ({
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
    setFormData(prev => {
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
            role: 'Member'
          }]
        };
      }
    });
    setMemberSearchTerm('');
  };
  const handleRemoveMember = (memberId, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
      chairperson: prev.chairperson === memberId ? null : prev.chairperson,
      viceChair: prev.viceChair === memberId ? null : prev.viceChair,
      secretary: prev.secretary === memberId ? null : prev.secretary
    }));
  };
  const handleRoleChange = (memberId, roleName) => {
    setFormData(prev => {
      // Find the role to get its permissions
      const role = prev.roles.find(r => r.name === roleName);
      // Update member role and voting status based on role definition
      const updatedMembers = prev.members.map(m => m.id === memberId ? {
        ...m,
        role: roleName
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
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
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
  // Get steps for the modal
  const getSteps = () => {
    return [{
      id: 0,
      title: 'Committee Details',
      icon: <UsersIcon className="h-5 w-5" />,
      fields: <div className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700 mb-1">
                Committee Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-azure-500'} rounded-md focus:outline-none focus:ring-2`} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-azure-500'} rounded-md focus:outline-none focus:ring-2 resize-none`} />
              {errors.description && <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>}
              <p className="mt-1 text-xs text-slate-500">
                Briefly describe the purpose and responsibilities of this
                committee.
              </p>
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
                  {formData.roles.map((role, index) => <tr key={role.id} className={index !== 0 ? 'border-t border-slate-200' : ''}>
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
                  Default roles (Chair, Vice Chair, Secretary, Member) cannot be
                  deleted
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
      icon: <UsersIcon className="h-5 w-5" />,
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
                      {(formData.members.length === 0 || memberSearchTerm) && <SearchIcon className="h-4 w-4 text-slate-400 mr-2" />}
                      <input type="text" value={memberSearchTerm} onChange={e => setMemberSearchTerm(e.target.value)} onFocus={() => setShowMemberOptions(true)} className="flex-1 outline-none text-sm w-full" placeholder={formData.members.length > 0 ? '' : 'Search and add members'} />
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
            {/* Selected Members List */}
            {formData.members.length > 0 && <div className="mt-6">
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
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {formData.members.map((member, index) => <tr key={member.id} className={index !== 0 ? 'mt-1' : ''}>
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
                                {formData.roles.map(role => <option key={role.id} value={role.name}>
                                    {role.name}
                                  </option>)}
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button onClick={e => handleRemoveMember(member.id, e)} className="text-slate-400 hover:text-slate-600">
                              <XIcon className="h-4 w-4" />
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
                    <input type="checkbox" checked={formData.isPublic} onChange={() => handleToggleChange('isPublic')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                  </label>
                </div>
              </div>
              {/* Additional settings note */}
              <div className="mt-6 p-4 bg-slate-50 rounded-md">
                <p className="text-sm text-slate-600">
                  Additional committee settings like mailing lists will be
                  available in future updates.
                </p>
              </div>
            </div>
          </div>
    }];
  };
  const steps = getSteps();
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 flex justify-between items-center border-b border-slate-200">
          <h2 className="text-xl font-medium text-slate-900">Edit Committee</h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={() => onClose()}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
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
        <div className="p-6 flex justify-between items-center border-t border-slate-200">
          <button onClick={activeStep === 0 ? () => onClose() : handlePrevious} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50">
            {activeStep === 0 ? 'Cancel' : 'Previous'}
          </button>
          <button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} className="px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md">
            {activeStep === steps.length - 1 ? 'Save Changes' : 'Next'}
          </button>
        </div>
      </div>
    </div>;
};