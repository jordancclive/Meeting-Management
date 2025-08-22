import React, { useState } from 'react';
import { CommitteesSidebar } from '../components/committees/CommitteesSidebar';
import { CommitteeCard } from '../components/committees/CommitteeCard';
import { UsersIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, X as CloseIcon } from 'lucide-react';
import { CreateCommitteeModal } from '../components/committees/CreateCommitteeModal';
export const CommitteesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    variant: 'success'
  });
  // Mock data for committees
  const committees = [{
    id: 1,
    name: 'Technical Steering Committee',
    description: 'Provides technical leadership and guidance, reviewing architectural decisions and technical roadmap.',
    managedOn: 'github',
    githubUrl: 'https://github.com/kubernetes/community/blob/master/committee-steering/governance/README.md',
    isVotingCommittee: true,
    members: [{
      id: 1,
      name: 'Robert Taylor',
      email: 'rtaylor@vmware.com',
      role: 'Chair',
      isVoting: true,
      company: 'VMWare',
      profileImage: 'https://randomuser.me/api/portraits/men/41.jpg'
    }, {
      id: 2,
      name: 'Lisa Wang',
      email: 'lwang@nvidia.com',
      role: 'Vice Chair',
      isVoting: true,
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/women/79.jpg'
    }, {
      id: 3,
      name: 'Daniel Kim',
      email: 'dkim@samsung.com',
      role: 'Member',
      isVoting: true,
      company: 'Samsung',
      profileImage: null
    }, {
      id: 4,
      name: 'Jennifer Lopez',
      email: 'jlopez@broadcom.com',
      role: 'Member',
      isVoting: true,
      company: 'Broadcom Inc.',
      profileImage: 'https://randomuser.me/api/portraits/women/63.jpg'
    }, {
      id: 5,
      name: 'David Martinez',
      email: 'dmartinez@redhat.com',
      role: 'Secretary',
      isVoting: true,
      company: 'Red Hat',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, {
      id: 22,
      name: 'James Wilson',
      email: 'jwilson@cisco.com',
      role: 'Member',
      isVoting: false,
      company: 'Cisco',
      profileImage: null
    }, {
      id: 23,
      name: 'Emma Davis',
      email: 'edavis@ibm.com',
      role: 'Member',
      isVoting: false,
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, {
      id: 24,
      name: 'Michael Chen',
      email: 'mchen@intel.com',
      role: 'Member',
      isVoting: false,
      company: 'Intel',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 25,
      name: 'Olivia Brown',
      email: 'obrown@oracle.com',
      role: 'Member',
      isVoting: true,
      company: 'Oracle',
      profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
    }]
  }, {
    id: 2,
    name: 'Security Working Group',
    description: 'Responsible for security policies, vulnerability management, and security best practices.',
    managedOn: 'lfx',
    isVotingCommittee: false,
    members: [{
      id: 6,
      name: 'Sarah Wilson',
      email: 'swilson@microsoft.com',
      role: 'Chair',
      isVoting: true,
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      id: 7,
      name: 'Michael Chen',
      email: 'mchen@intel.com',
      role: 'Vice Chair',
      isVoting: true,
      company: 'Intel',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 8,
      name: 'Alex Johnson',
      email: 'ajohnson@google.com',
      role: 'Member',
      isVoting: true,
      company: 'Google',
      profileImage: null
    }, {
      id: 9,
      name: 'Emma Davis',
      email: 'edavis@ibm.com',
      role: 'Secretary',
      isVoting: false,
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, {
      id: 26,
      name: 'Noah Garcia',
      email: 'ngarcia@meta.com',
      role: 'Member',
      isVoting: false,
      company: 'Meta',
      profileImage: 'https://randomuser.me/api/portraits/men/55.jpg'
    }, {
      id: 27,
      name: 'Sophia Miller',
      email: 'smiller@suse.com',
      role: 'Member',
      isVoting: true,
      company: 'SUSE',
      profileImage: null
    }, {
      id: 28,
      name: 'Ethan Taylor',
      email: 'etaylor@sentry.io',
      role: 'Member',
      isVoting: false,
      company: 'Sentry',
      profileImage: 'https://randomuser.me/api/portraits/men/42.jpg'
    }, {
      id: 29,
      name: 'Isabella Martinez',
      email: 'imartinez@ericsson.com',
      role: 'Member',
      isVoting: true,
      company: 'Ericsson',
      profileImage: 'https://randomuser.me/api/portraits/women/26.jpg'
    }]
  }, {
    id: 3,
    name: 'Community Committee',
    description: 'Focuses on community engagement, marketing initiatives, and external communications.',
    managedOn: 'lfx',
    isVotingCommittee: false,
    members: [{
      id: 10,
      name: 'Rachel Green',
      email: 'rgreen@elastic.com',
      role: 'Chair',
      isVoting: true,
      company: 'ElasticSearch',
      profileImage: 'https://randomuser.me/api/portraits/women/39.jpg'
    }, {
      id: 11,
      name: 'Chris Evans',
      email: 'cevans@att.com',
      role: 'Member',
      isVoting: true,
      company: 'AT&T',
      profileImage: 'https://randomuser.me/api/portraits/men/91.jpg'
    }, {
      id: 12,
      name: 'Zoe Rodriguez',
      email: 'zrodriguez@sentry.io',
      role: 'Member',
      isVoting: true,
      company: 'Sentry',
      profileImage: null
    }, {
      id: 13,
      name: 'Benjamin Harris',
      email: 'bharris@linaro.org',
      role: 'Secretary',
      isVoting: false,
      company: 'Linaro Limited',
      profileImage: 'https://randomuser.me/api/portraits/men/36.jpg'
    }, {
      id: 30,
      name: 'Lily Chen',
      email: 'lchen@pantheon.io',
      role: 'Member',
      isVoting: true,
      company: 'PANTHEON',
      profileImage: 'https://randomuser.me/api/portraits/women/56.jpg'
    }, {
      id: 31,
      name: 'Marcus Johnson',
      email: 'mjohnson@isovalent.com',
      role: 'Member',
      isVoting: false,
      company: 'Isovalent',
      profileImage: null
    }, {
      id: 32,
      name: 'Sophia Williams',
      email: 'swilliams@hitachi.com',
      role: 'Member',
      isVoting: true,
      company: 'Hitachi',
      profileImage: 'https://randomuser.me/api/portraits/women/62.jpg'
    }, {
      id: 33,
      name: 'Ethan Davis',
      email: 'edavis@oracle.com',
      role: 'Member',
      isVoting: false,
      company: 'Oracle',
      profileImage: 'https://randomuser.me/api/portraits/men/15.jpg'
    }, {
      id: 34,
      name: 'Lucas Rodriguez',
      email: 'lrodriguez@att.com',
      role: 'Member',
      isVoting: false,
      company: 'AT&T',
      profileImage: 'https://randomuser.me/api/portraits/men/29.jpg'
    }, {
      id: 35,
      name: 'Mia Johnson',
      email: 'mjohnson@hitachi.com',
      role: 'Member',
      isVoting: true,
      company: 'Hitachi',
      profileImage: null
    }, {
      id: 36,
      name: 'Jackson White',
      email: 'jwhite@nvidia.com',
      role: 'Member',
      isVoting: false,
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/men/77.jpg'
    }, {
      id: 37,
      name: 'Amelia Clark',
      email: 'aclark@pantheon.io',
      role: 'Member',
      isVoting: true,
      company: 'PANTHEON',
      profileImage: 'https://randomuser.me/api/portraits/women/82.jpg'
    }]
  }, {
    id: 4,
    name: 'Governing Board',
    description: 'Strategic oversight and governance, including financial decisions and partnership approvals.',
    managedOn: 'lfx',
    isVotingCommittee: true,
    members: [{
      id: 14,
      name: 'Ashley Crickenberger',
      email: 'ashleyc@google.com',
      role: 'Chair',
      isVoting: true,
      company: 'Google',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      id: 15,
      name: 'Aaron Bronson',
      email: 'aaronb@amazon.com',
      role: 'Vice Chair',
      isVoting: true,
      company: 'Amazon',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 16,
      name: 'Bethany Smith',
      email: 'bethanys@microsoft.com',
      role: 'Member',
      isVoting: true,
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, {
      id: 17,
      name: 'Carlos Jimenez',
      email: 'carlos12@ibm.com',
      role: 'Secretary',
      isVoting: true,
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, {
      id: 38,
      name: 'Andrew Chen',
      email: 'achen@isovalent.com',
      role: 'Member',
      isVoting: true,
      company: 'Isovalent',
      profileImage: 'https://randomuser.me/api/portraits/men/18.jpg'
    }, {
      id: 39,
      name: 'Olivia Smith',
      email: 'osmith@arm.com',
      role: 'Member',
      isVoting: true,
      company: 'ARM',
      profileImage: 'https://randomuser.me/api/portraits/women/36.jpg'
    }, {
      id: 40,
      name: 'William Johnson',
      email: 'wjohnson@linaro.org',
      role: 'Member',
      isVoting: true,
      company: 'Linaro Limited',
      profileImage: 'https://randomuser.me/api/portraits/men/45.jpg'
    }, {
      id: 41,
      name: 'Emma Davis',
      email: 'edavis2@ibm.com',
      role: 'Member',
      isVoting: true,
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/women/24.jpg'
    }, {
      id: 42,
      name: 'Marco Rossi',
      email: 'mrossi@linaro.org',
      role: 'Member',
      isVoting: true,
      company: 'Linaro Limited',
      profileImage: 'https://randomuser.me/api/portraits/men/61.jpg'
    }, {
      id: 43,
      name: 'Jessica Parker',
      email: 'jparker@nvidia.com',
      role: 'Member',
      isVoting: true,
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/women/51.jpg'
    }, {
      id: 44,
      name: 'Ryan Thompson',
      email: 'rthompson@samsung.com',
      role: 'Member',
      isVoting: true,
      company: 'Samsung',
      profileImage: 'https://randomuser.me/api/portraits/men/83.jpg'
    }, {
      id: 45,
      name: 'Grace Park',
      email: 'gpark@meta.com',
      role: 'Member',
      isVoting: true,
      company: 'Meta',
      profileImage: 'https://randomuser.me/api/portraits/women/72.jpg'
    }]
  }];
  // Sort committees alphabetically by name
  const sortedCommittees = [...committees].sort((a, b) => a.name.localeCompare(b.name));
  // Filter committees based on search query and filter
  const filteredCommittees = sortedCommittees.filter(committee => {
    // Search filter
    const matchesSearch = searchQuery === '' || committee.name.toLowerCase().includes(searchQuery.toLowerCase()) || committee.description.toLowerCase().includes(searchQuery.toLowerCase()) || committee.members.some(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase()));
    // Category filter
    const matchesFilter = currentFilter === 'all' || currentFilter === 'lfx' && committee.managedOn === 'lfx' || currentFilter === 'github' && committee.managedOn === 'github';
    return matchesSearch && matchesFilter;
  });
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
    setShowCreateModal(false);
    if (action === 'create') {
      showSuccessToast('Committee created successfully!');
    }
  };
  return <main className="flex-1 p-6 w-full">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header with Create Committee Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Committees
          </h1>
          <div className="mt-4 sm:mt-0">
            <button className="flex items-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm transition-colors" onClick={() => setShowCreateModal(true)}>
              <UsersIcon className="h-4 w-4 mr-2" />
              Create Committee
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Sidebar - Match width with Meetings page */}
          <div className="w-full md:w-72 mb-8 md:mb-0">
            <CommitteesSidebar onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} currentFilter={currentFilter} />
          </div>
          {/* Right Column - Committee Cards */}
          <div className="flex-1 space-y-6">
            {filteredCommittees.map(committee => <CommitteeCard key={committee.id} committee={committee} />)}
            {filteredCommittees.length === 0 && <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-slate-600">
                  No committees found matching your criteria.
                </p>
              </div>}
          </div>
        </div>
      </div>
      {/* Create Committee Modal */}
      {showCreateModal && <CreateCommitteeModal onClose={handleModalClose} />}
      {/* Toast Notification */}
      {toast.isVisible && <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`${toast.variant === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'} p-4 rounded-lg border shadow-md max-w-md flex items-start`} role="alert">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {toast.variant === 'success' ? <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> : <AlertTriangleIcon className="h-5 w-5 text-amber-500" />}
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={() => setToast(prev => ({
          ...prev,
          isVisible: false
        }))}>
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>}
    </main>;
};