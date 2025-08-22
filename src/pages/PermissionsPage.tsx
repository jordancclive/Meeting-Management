import React, { useState } from 'react';
import { PermissionsSidebar } from '../components/permissions/PermissionsSidebar';
import { MembersTable } from '../components/permissions/MembersTable';
import { AddMemberModal } from '../components/permissions/AddMemberModal';
import { UserPlusIcon } from 'lucide-react';
export const PermissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    variant: 'success'
  });
  // Mock data for members and permissions
  const members = [{
    id: 1,
    name: 'Robert Taylor',
    email: 'rtaylor@vmware.com',
    company: 'VMWare',
    profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: '2 hours ago'
  }, {
    id: 12,
    name: 'Ashley Crickenberger',
    email: 'ashleyc@google.com',
    company: 'Google',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    committees: [{
      name: 'Governing Board',
      role: 'Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: '4 hours ago'
  }, {
    id: 6,
    name: 'Sarah Wilson',
    email: 'swilson@microsoft.com',
    company: 'Microsoft',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    committees: [{
      name: 'Security Working Group',
      role: 'Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: 'Just now'
  }, {
    id: 10,
    name: 'Rachel Green',
    email: 'rgreen@elastic.com',
    company: 'ElasticSearch',
    profileImage: 'https://randomuser.me/api/portraits/women/39.jpg',
    committees: [{
      name: 'Community Committee',
      role: 'Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: '1 week ago'
  }, {
    id: 2,
    name: 'Lisa Wang',
    email: 'lwang@nvidia.com',
    company: 'NVIDIA',
    profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Vice Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: 'Yesterday'
  }, {
    id: 7,
    name: 'Michael Chen',
    email: 'mchen@intel.com',
    company: 'Intel',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    committees: [{
      name: 'Security Working Group',
      role: 'Vice Chair',
      isAdmin: true,
      canScheduleMeetings: true
    }, {
      name: 'Technical Steering Committee',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: false
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '5 hours ago'
  }, {
    id: 3,
    name: 'Daniel Kim',
    email: 'dkim@samsung.com',
    company: 'Samsung',
    profileImage: null,
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '3 days ago'
  }, {
    id: 4,
    name: 'Jennifer Lopez',
    email: 'jlopez@broadcom.com',
    company: 'Broadcom Inc.',
    profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: false
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '1 week ago'
  }, {
    id: 5,
    name: 'David Martinez',
    email: 'dmartinez@redhat.com',
    company: 'Red Hat',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    committees: [{
      name: 'Technical Steering Committee',
      role: 'Secretary',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: true
    },
    lastActive: '2 days ago'
  }, {
    id: 8,
    name: 'Alex Johnson',
    email: 'ajohnson@google.com',
    company: 'Google',
    profileImage: null,
    committees: [{
      name: 'Security Working Group',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: false
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '1 day ago'
  }, {
    id: 9,
    name: 'Emma Davis',
    email: 'edavis@ibm.com',
    company: 'IBM',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    committees: [{
      name: 'Security Working Group',
      role: 'Secretary',
      isAdmin: true,
      canScheduleMeetings: true
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '3 days ago'
  }, {
    id: 11,
    name: 'Chris Evans',
    email: 'cevans@att.com',
    company: 'AT&T',
    profileImage: 'https://randomuser.me/api/portraits/men/91.jpg',
    committees: [{
      name: 'Community Committee',
      role: 'Member',
      isAdmin: false,
      canScheduleMeetings: false
    }],
    permissions: {
      canScheduleWithOthers: false
    },
    lastActive: '2 weeks ago'
  }];
  // Group members by role
  const groupedMembers = {
    committeeAdmins: members.filter(member => member.committees.some(committee => committee.isAdmin)),
    members: members.filter(member => !member.committees.some(committee => committee.isAdmin))
  };
  // Filter members based on search query and filter
  const filterMembers = membersList => {
    return membersList.filter(member => {
      // Search filter
      const matchesSearch = searchQuery === '' || member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase()) || member.company.toLowerCase().includes(searchQuery.toLowerCase()) || member.committees.some(committee => committee.name.toLowerCase().includes(searchQuery.toLowerCase()));
      // Category filter
      const matchesFilter = currentFilter === 'all' || currentFilter === 'admin' && member.committees.some(c => c.isAdmin) || currentFilter === 'committee' && member.committees.length > 0 || currentFilter === 'scheduleMeetings' && member.committees.some(c => c.canScheduleMeetings);
      return matchesSearch && matchesFilter;
    });
  };
  const filteredGroupedMembers = {
    committeeAdmins: filterMembers(groupedMembers.committeeAdmins),
    members: filterMembers(groupedMembers.members)
  };
  const handleSearchChange = query => {
    setSearchQuery(query);
  };
  const handleFilterChange = filter => {
    setCurrentFilter(filter);
  };
  const showSuccessToast = message => {
    setToast({
      isVisible: true,
      message,
      variant: 'success'
    });
    // Auto-hide the toast after 5 seconds
    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false
      }));
    }, 5000);
  };
  const handleModalClose = action => {
    setShowAddMemberModal(false);
    if (action === 'add') {
      showSuccessToast('Member added successfully!');
    }
  };
  return <main className="flex-1 p-6 w-full">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header with Add Member Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Permissions
          </h1>
          <div className="mt-4 sm:mt-0">
            <button className="flex items-center bg-azure-500 hover:bg-azure-600 text-white px-4 py-2 rounded-md text-sm transition-colors" onClick={() => setShowAddMemberModal(true)}>
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add Member
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Sidebar - Match width with other pages */}
          <div className="w-full md:w-72 mb-8 md:mb-0">
            <PermissionsSidebar onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} currentFilter={currentFilter} />
          </div>
          {/* Right Column - Members Table */}
          <div className="flex-1">
            <MembersTable groupedMembers={filteredGroupedMembers} />
          </div>
        </div>
      </div>
      {/* Add Member Modal */}
      {showAddMemberModal && <AddMemberModal onClose={handleModalClose} />}
      {/* Toast Notification */}
      {toast.isVisible && <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-50 border-emerald-200 text-emerald-800 p-4 rounded-lg border shadow-md max-w-md flex items-start" role="alert">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={() => setToast(prev => ({
          ...prev,
          isVisible: false
        }))}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>}
    </main>;
};