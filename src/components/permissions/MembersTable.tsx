import React, { useState, Fragment } from 'react';
import { Card } from '../Card';
import { ShieldIcon, CalendarIcon, UsersIcon, CheckIcon, XIcon, ChevronUpIcon, ChevronDownIcon, MoreHorizontalIcon, ChevronRightIcon } from 'lucide-react';
export const MembersTable = ({
  groupedMembers
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const handleSort = field => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const sortMembers = members => {
    return [...members].sort((a, b) => {
      let aValue, bValue;
      if (sortField === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortField === 'company') {
        aValue = a.company;
        bValue = b.company;
      } else if (sortField === 'committees') {
        aValue = a.committees.length;
        bValue = b.committees.length;
      } else if (sortField === 'lastActive') {
        // This is a simplistic approach - in a real app you'd want to convert these to dates
        aValue = a.lastActive;
        bValue = b.lastActive;
      }
      if (sortDirection === 'asc') {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return aValue - bValue;
      } else {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return bValue.localeCompare(aValue);
        }
        return bValue - aValue;
      }
    });
  };
  const toggleActionMenu = memberId => {
    setShowActionMenu(showActionMenu === memberId ? null : memberId);
  };
  const toggleRowExpanded = memberId => {
    setExpandedRows(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
    // Close action menu when toggling row
    if (showActionMenu === memberId) {
      setShowActionMenu(null);
    }
  };
  const isRowExpanded = memberId => {
    return expandedRows.includes(memberId);
  };
  // Mock project super admins
  const projectSuperAdmins = [{
    id: 100,
    name: 'Megan Reynolds',
    email: 'mreynolds@linux.org',
    company: 'Linux Foundation',
    profileImage: 'https://randomuser.me/api/portraits/women/42.jpg',
    committees: [],
    permissions: {
      canScheduleWithOthers: true,
      isSuperAdmin: true
    },
    lastActive: '5 minutes ago'
  }, {
    id: 101,
    name: 'Thomas Cooper',
    email: 'tcooper@redhat.com',
    company: 'Red Hat',
    profileImage: null,
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: false
    }],
    permissions: {
      canScheduleWithOthers: true,
      isSuperAdmin: true
    },
    lastActive: '1 day ago'
  }];
  // Sort project super admins
  const sortedSuperAdmins = sortMembers(projectSuperAdmins);
  // Sort each group of members
  const sortedCommitteeAdmins = sortMembers(groupedMembers.committeeAdmins);
  const sortedMembers = sortMembers(groupedMembers.members);
  // Check if any members exist in each group after filtering
  const hasSuperAdmins = sortedSuperAdmins.length > 0;
  const hasCommitteeAdmins = sortedCommitteeAdmins.length > 0;
  const hasMembers = sortedMembers.length > 0;
  const renderMemberRow = member => <Fragment key={member.id}>
      {/* Main row - always visible */}
      <tr className={`hover:bg-slate-50 ${isRowExpanded(member.id) ? 'bg-slate-50' : ''}`} onClick={() => toggleRowExpanded(member.id)}>
        <td className="px-4 py-4 whitespace-nowrap">
          <button className="text-slate-400 hover:text-slate-600 focus:outline-none" onClick={e => {
          e.stopPropagation();
          toggleRowExpanded(member.id);
        }}>
            {isRowExpanded(member.id) ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </button>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            {member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-8 w-8 rounded-full mr-3" /> : <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>}
            <div>
              <div className="text-sm font-medium text-slate-900">
                {member.name}
              </div>
              <div className="text-sm text-slate-500">{member.email}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
          {member.company}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
          {member.committees.length > 0 ? <div className="flex items-center">
              <UsersIcon className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
              <span>
                {member.committees.length} committee
                {member.committees.length !== 1 ? 's' : ''}
              </span>
            </div> : <span className="text-slate-400">None</span>}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
          {member.lastActive}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
          <button onClick={e => {
          e.stopPropagation();
          toggleActionMenu(member.id);
        }} className="text-slate-400 hover:text-slate-600">
            <MoreHorizontalIcon className="h-5 w-5" />
          </button>
          {showActionMenu === member.id && <div className="absolute right-8 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={e => {
              e.stopPropagation();
              console.log('Edit permissions');
              setShowActionMenu(null);
            }}>
                  Edit Permissions
                </button>
                <button className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={e => {
              e.stopPropagation();
              console.log('Edit committees');
              setShowActionMenu(null);
            }}>
                  Edit Committees
                </button>
                <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-slate-100" onClick={e => {
              e.stopPropagation();
              console.log('Remove member');
              setShowActionMenu(null);
            }}>
                  Remove Member
                </button>
              </div>
            </div>}
        </td>
      </tr>
      {/* Expanded details row */}
      {isRowExpanded(member.id) && <tr className="bg-slate-50">
          <td colSpan={6} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
              {/* Committees Section */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Committees
                </h4>
                {member.committees.length > 0 ? <div className="space-y-3">
                    {member.committees.map((committee, index) => <div key={index} className="border border-slate-200 rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <UsersIcon className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-sm font-medium text-slate-700">
                            {committee.name}
                          </span>
                          {committee.isAdmin && <span className="ml-2 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-md">
                              Admin
                            </span>}
                        </div>
                        <div className="ml-6 space-y-1.5 text-xs">
                          <div className="flex items-center">
                            <span className="text-slate-500 w-28">Role:</span>
                            <span className="text-slate-700 font-medium">
                              {committee.role}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-slate-500 w-28">
                              Schedule Meetings:
                            </span>
                            {committee.canScheduleMeetings ? <CheckIcon className="h-3.5 w-3.5 text-emerald-500" /> : <XIcon className="h-3.5 w-3.5 text-slate-400" />}
                          </div>
                        </div>
                      </div>)}
                  </div> : <p className="text-sm text-slate-500 italic">
                    Not a member of any committees
                  </p>}
              </div>
              {/* Permissions Section */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Global Permissions
                </h4>
                <div className="space-y-3">
                  {member.permissions.isSuperAdmin && <div className="border border-slate-200 rounded-md p-3">
                      <div className="flex items-center">
                        <ShieldIcon className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-sm font-medium text-slate-700">
                          Project Super Admin
                        </span>
                      </div>
                      <div className="mt-1 ml-6">
                        <p className="text-xs text-slate-500">
                          Can manage all aspects of the project including
                          committees and permissions
                        </p>
                      </div>
                    </div>}
                  <div className="border border-slate-200 rounded-md p-3">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        Schedule Meetings with Project Members
                      </span>
                    </div>
                    <div className="mt-1 flex items-center ml-6">
                      <span className="text-xs text-slate-500 mr-2">
                        Allowed:
                      </span>
                      {member.permissions.canScheduleWithOthers ? <CheckIcon className="h-4 w-4 text-emerald-500" /> : <XIcon className="h-4 w-4 text-slate-400" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>}
    </Fragment>;
  return <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-10 px-4 py-3"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  <span>Member</span>
                  {sortField === 'name' && <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </span>}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('company')}>
                <div className="flex items-center">
                  <span>Company</span>
                  {sortField === 'company' && <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </span>}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('committees')}>
                <div className="flex items-center">
                  <span>Committees</span>
                  {sortField === 'committees' && <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </span>}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('lastActive')}>
                <div className="flex items-center">
                  <span>Last Active</span>
                  {sortField === 'lastActive' && <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </span>}
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {/* Project Super Admins Section */}
            {hasSuperAdmins && <>
                <tr className="bg-slate-100">
                  <td colSpan={6} className="px-4 py-2">
                    <div className="flex items-center">
                      <ShieldIcon className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Project Super Admins
                      </span>
                    </div>
                  </td>
                </tr>
                {sortedSuperAdmins.map(renderMemberRow)}
              </>}
            {/* Committee Admins Section */}
            {hasCommitteeAdmins && <>
                <tr className="bg-slate-100">
                  <td colSpan={6} className="px-4 py-2">
                    <div className="flex items-center">
                      <ShieldIcon className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Committee Admins
                      </span>
                    </div>
                  </td>
                </tr>
                {sortedCommitteeAdmins.map(renderMemberRow)}
              </>}
            {/* Regular Members Section */}
            {hasMembers && <>
                <tr className="bg-slate-100">
                  <td colSpan={6} className="px-4 py-2">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 text-slate-500 mr-2" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Project Members
                      </span>
                    </div>
                  </td>
                </tr>
                {sortedMembers.map(renderMemberRow)}
              </>}
            {/* No results message */}
            {!hasSuperAdmins && !hasCommitteeAdmins && !hasMembers && <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  No members found matching your search criteria
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </Card>;
};