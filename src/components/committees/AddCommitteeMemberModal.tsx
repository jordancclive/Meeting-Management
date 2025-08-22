import React, { useState } from 'react';
import { XIcon, SearchIcon, CheckIcon, ShieldIcon, CalendarIcon } from 'lucide-react';
export const AddCommitteeMemberModal = ({
  onClose,
  committee
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [permissions, setPermissions] = useState({
    isAdmin: false,
    canScheduleMeetings: false
  });
  // Mock data for project members not in this committee
  const availableMembers = [{
    id: 8,
    name: 'Alex Johnson',
    email: 'ajohnson@google.com',
    company: 'Google',
    profileImage: null,
    lfid: 'ajohnson'
  }, {
    id: 9,
    name: 'Emma Davis',
    email: 'edavis@ibm.com',
    company: 'IBM',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    lfid: 'edavis'
  }, {
    id: 11,
    name: 'Chris Evans',
    email: 'cevans@att.com',
    company: 'AT&T',
    profileImage: 'https://randomuser.me/api/portraits/men/91.jpg',
    lfid: 'cevans'
  }, {
    id: 13,
    name: 'Benjamin Harris',
    email: 'bharris@linaro.org',
    company: 'Linaro Limited',
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
    lfid: 'bharris'
  }];
  // Filter members based on search query
  const filteredMembers = availableMembers.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase()) || member.lfid && member.lfid.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };
  const handleSelectMember = member => {
    setSelectedMember(member);
    setSearchQuery(`${member.name} (${member.lfid || member.email})`);
    setShowSearchResults(false);
  };
  const handlePermissionChange = (field, value) => {
    setPermissions(prev => {
      const updatedPermissions = {
        ...prev,
        [field]: value
      };
      // If setting as admin, automatically enable scheduling meetings
      if (field === 'isAdmin' && value === true) {
        updatedPermissions.canScheduleMeetings = true;
      }
      return updatedPermissions;
    });
  };
  const handleAddMember = () => {
    if (selectedMember) {
      // In a real app, this would add the member to the committee with the specified permissions
      console.log(`Adding ${selectedMember.name} to ${committee.name} with permissions:`, permissions);
      onClose('added');
    }
  };
  const isFormValid = () => {
    return selectedMember !== null;
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">
            Add Member to {committee.name}
          </h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={() => onClose()}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto" style={{
        minHeight: '400px'
      }}>
          <div className="space-y-6">
            {/* Member Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Project Member
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Search by name, email or LFID..." value={searchQuery} onChange={handleSearchInputChange} />
                {showSearchResults && filteredMembers.length > 0 && <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredMembers.map(member => <div key={member.id} className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleSelectMember(member)}>
                        <div className="flex items-center">
                          {member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-8 w-8 rounded-full mr-3" /> : <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>}
                          <div>
                            <div className="text-sm font-medium">
                              {member.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {member.email}{' '}
                              {member.lfid ? `• ${member.lfid}` : ''} •{' '}
                              {member.company}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>}
                {showSearchResults && filteredMembers.length === 0 && <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-4 text-center">
                    <p className="text-sm text-slate-500">
                      No matching members found
                    </p>
                  </div>}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Search for existing project members to add to this committee
              </div>
            </div>
            {/* Member Permissions */}
            {selectedMember && <div className="mt-6 bg-slate-50 rounded-lg p-4 space-y-4">
                <h3 className="text-md font-medium text-slate-700">
                  Committee Permissions
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700 flex items-center">
                        <ShieldIcon className="h-4 w-4 mr-2 text-amber-500" />
                        Committee Admin
                      </p>
                      <p className="text-xs text-slate-500 ml-6 mt-1">
                        Can manage all aspects of the committee, including
                        adding and removing members
                      </p>
                    </div>
                    <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer ${permissions.isAdmin ? 'bg-azure-500' : 'bg-slate-300'}`} onClick={() => handlePermissionChange('isAdmin', !permissions.isAdmin)}>
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
                        Can create and schedule meetings for this committee
                      </p>
                    </div>
                    {permissions.isAdmin ? <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        Enabled for admins
                      </div> : <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer ${permissions.canScheduleMeetings ? 'bg-azure-500' : 'bg-slate-300'}`} onClick={() => handlePermissionChange('canScheduleMeetings', !permissions.canScheduleMeetings)}>
                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${permissions.canScheduleMeetings ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>}
                  </div>
                </div>
              </div>}
          </div>
        </div>
        <div className="p-6 flex justify-between items-center">
          <button onClick={() => onClose()} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={handleAddMember} disabled={!isFormValid()} className={`px-4 py-2 rounded-md text-white ${isFormValid() ? 'bg-azure-500 hover:bg-azure-600' : 'bg-slate-300 cursor-not-allowed'}`}>
            Add to Committee
          </button>
        </div>
      </div>
    </div>;
};