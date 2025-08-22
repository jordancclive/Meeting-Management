import React, { useState } from 'react';
import { MailingListsSidebar } from '../components/mailinglists/MailingListsSidebar';
import { MailingListCard } from '../components/mailinglists/MailingListCard';
import { UsersIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, X as CloseIcon, ArrowUpDown as ArrowUpDownIcon, ListIcon, CalendarIcon, CalendarDaysIcon, MailIcon } from 'lucide-react';
import { CreateMailingListModal } from '../components/mailinglists/CreateMailingListModal';
export const MailingListsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    committee: 'All',
    status: 'All',
    moderator: 'All'
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    variant: 'success'
  });
  const [sortOption, setSortOption] = useState('name'); // Default sort by name
  const [viewType, setViewType] = useState('list'); // Default view type
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Generate additional subscribers
  const generateSubscribers = (count, baseId = 100) => {
    const companies = ['Google', 'Microsoft', 'IBM', 'Red Hat', 'Amazon', 'VMware', 'NVIDIA', 'Intel', 'Cisco', 'Oracle', 'SAP', 'Samsung', 'Apple', 'Facebook', 'Twitter', 'LinkedIn', 'Uber', 'Lyft', 'Airbnb', 'Netflix', 'Spotify', 'Slack', 'Shopify', 'Atlassian', 'Dropbox', 'GitLab', 'Zoom', 'Docker', 'HashiCorp', 'Elastic', 'MongoDB', 'Confluent', 'Databricks', 'Snowflake'];
    const firstNames = ['Alex', 'Jamie', 'Taylor', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Skyler', 'Charlie', 'Finley', 'Rowan', 'Emerson', 'Hayden', 'Parker', 'Blake', 'Dakota', 'Reese', 'Zion', 'Phoenix', 'Sage', 'Kai', 'Remy', 'Ellis', 'Harley', 'Tatum', 'Sawyer', 'Rory', 'Marlowe', 'Arden', 'Lennon', 'Elliot', 'Shawn', 'Sasha', 'Devon', 'Jaden', 'River', 'Micah', 'Erin', 'Indigo'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers'];
    const subscribers = [];
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(' ', '')}.com`;
      subscribers.push({
        id: baseId + i,
        name,
        email,
        company,
        profileImage: Math.random() > 0.3 ? `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg` : null,
        isModerator: Math.random() > 0.9 // Approximately 10% of users are moderators
      });
    }
    return subscribers;
  };
  // Mock data for mailing lists
  const mailingLists = [{
    id: 1,
    name: 'dev@groups.io',
    description: 'Development discussions and code reviews',
    isPublic: true,
    groupsUrl: 'https://groups.io/g/dev/topics',
    emailsSent: 1247,
    committees: ['Technical Steering Committee', 'Core Development'],
    subscribers: [{
      id: 1,
      name: 'Robert Taylor',
      email: 'rtaylor@vmware.com',
      company: 'VMWare',
      profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
      isModerator: true
    }, {
      id: 2,
      name: 'Lisa Wang',
      email: 'lwang@nvidia.com',
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/women/79.jpg'
    }, {
      id: 3,
      name: 'Daniel Kim',
      email: 'dkim@samsung.com',
      company: 'Samsung',
      profileImage: null
    }, {
      id: 4,
      name: 'Jennifer Lopez',
      email: 'jlopez@broadcom.com',
      company: 'Broadcom Inc.',
      profileImage: 'https://randomuser.me/api/portraits/women/63.jpg'
    }, {
      id: 5,
      name: 'David Martinez',
      email: 'dmartinez@redhat.com',
      company: 'Red Hat',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, ...generateSubscribers(30, 1000)]
  }, {
    id: 2,
    name: 'announce@groups.io',
    description: 'Important project announcements and releases',
    isPublic: true,
    groupsUrl: 'https://groups.io/g/announce/topics',
    emailsSent: 156,
    committees: ['Governing Board', 'Technical Steering Committee'],
    subscribers: [{
      id: 14,
      name: 'Ashley Crickenberger',
      email: 'ashleyc@google.com',
      company: 'Google',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      isModerator: true
    }, {
      id: 15,
      name: 'Aaron Bronson',
      email: 'aaronb@amazon.com',
      company: 'Amazon',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 16,
      name: 'Bethany Smith',
      email: 'bethanys@microsoft.com',
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, {
      id: 1,
      name: 'Robert Taylor',
      email: 'rtaylor@vmware.com',
      company: 'VMWare',
      profileImage: 'https://randomuser.me/api/portraits/men/41.jpg'
    }, {
      id: 2,
      name: 'Lisa Wang',
      email: 'lwang@nvidia.com',
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/women/79.jpg'
    }, ...generateSubscribers(198, 2000)]
  }, {
    id: 3,
    name: 'security@groups.io',
    description: 'Security-related discussions and vulnerability reports',
    isPublic: false,
    groupsUrl: 'https://groups.io/g/security/topics',
    emailsSent: 328,
    committees: ['Security Working Group'],
    subscribers: [{
      id: 6,
      name: 'Sarah Wilson',
      email: 'swilson@microsoft.com',
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      isModerator: true
    }, {
      id: 7,
      name: 'Michael Chen',
      email: 'mchen@intel.com',
      company: 'Intel',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 8,
      name: 'Alex Johnson',
      email: 'ajohnson@google.com',
      company: 'Google',
      profileImage: null
    }, {
      id: 9,
      name: 'Emma Davis',
      email: 'edavis@ibm.com',
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, ...generateSubscribers(31, 3000)]
  }, {
    id: 4,
    name: 'user-feedback@groups.io',
    description: 'User feedback and feature requests',
    isPublic: true,
    groupsUrl: 'https://groups.io/g/user-feedback/topics',
    emailsSent: 892,
    committees: ['Documentation Team', 'Technical Steering Committee'],
    subscribers: [{
      id: 10,
      name: 'Rachel Green',
      email: 'rgreen@elastic.com',
      company: 'ElasticSearch',
      profileImage: 'https://randomuser.me/api/portraits/women/39.jpg',
      isModerator: true
    }, {
      id: 11,
      name: 'Chris Evans',
      email: 'cevans@att.com',
      company: 'AT&T',
      profileImage: 'https://randomuser.me/api/portraits/men/91.jpg'
    }, {
      id: 12,
      name: 'Zoe Rodriguez',
      email: 'zrodriguez@sentry.io',
      company: 'Sentry',
      profileImage: null
    }, {
      id: 13,
      name: 'Benjamin Harris',
      email: 'bharris@linaro.org',
      company: 'Linaro Limited',
      profileImage: 'https://randomuser.me/api/portraits/men/36.jpg'
    }, {
      id: 30,
      name: 'Lily Chen',
      email: 'lchen@pantheon.io',
      company: 'PANTHEON',
      profileImage: 'https://randomuser.me/api/portraits/women/56.jpg'
    }, ...generateSubscribers(30, 4000)]
  }, {
    id: 5,
    name: 'community@groups.io',
    description: 'General community discussions and updates',
    isPublic: true,
    groupsUrl: 'https://groups.io/g/community/topics',
    emailsSent: 1653,
    committees: ['All Committees'],
    subscribers: [{
      id: 10,
      name: 'Rachel Green',
      email: 'rgreen@elastic.com',
      company: 'ElasticSearch',
      profileImage: 'https://randomuser.me/api/portraits/women/39.jpg',
      isModerator: true
    }, {
      id: 14,
      name: 'Ashley Crickenberger',
      email: 'ashleyc@google.com',
      company: 'Google',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      id: 6,
      name: 'Sarah Wilson',
      email: 'swilson@microsoft.com',
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      id: 1,
      name: 'Robert Taylor',
      email: 'rtaylor@vmware.com',
      company: 'VMWare',
      profileImage: 'https://randomuser.me/api/portraits/men/41.jpg'
    }, {
      id: 11,
      name: 'Chris Evans',
      email: 'cevans@att.com',
      company: 'AT&T',
      profileImage: 'https://randomuser.me/api/portraits/men/91.jpg'
    }, {
      id: 8,
      name: 'Alex Johnson',
      email: 'ajohnson@google.com',
      company: 'Google',
      profileImage: null
    }, {
      id: 15,
      name: 'Aaron Bronson',
      email: 'aaronb@amazon.com',
      company: 'Amazon',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, ...generateSubscribers(28, 5000)]
  }, {
    id: 6,
    name: 'legal@groups.io',
    description: 'Legal and compliance matters discussion',
    isPublic: false,
    groupsUrl: 'https://groups.io/g/legal/topics',
    emailsSent: 214,
    committees: ['Legal Working Group', 'Governing Board'],
    subscribers: [{
      id: 14,
      name: 'Ashley Crickenberger',
      email: 'ashleyc@google.com',
      company: 'Google',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      isModerator: true
    }, {
      id: 15,
      name: 'Aaron Bronson',
      email: 'aaronb@amazon.com',
      company: 'Amazon',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      id: 16,
      name: 'Bethany Smith',
      email: 'bethanys@microsoft.com',
      company: 'Microsoft',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }, {
      id: 17,
      name: 'Carlos Jimenez',
      email: 'carlos12@ibm.com',
      company: 'IBM',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, ...generateSubscribers(31, 6000)]
  }];
  // Filter and sort mailing lists
  const sortedAndFilteredMailingLists = mailingLists.filter(list => {
    // Search filter
    const matchesSearch = searchQuery === '' || list.name.toLowerCase().includes(searchQuery.toLowerCase()) || list.description.toLowerCase().includes(searchQuery.toLowerCase());
    // Committee filter
    const matchesCommittee = filters.committee === 'All' || list.committees.includes(filters.committee) || filters.committee === 'All Committees' && list.committees.includes('All Committees');
    // Status filter - assuming 'All', 'Active', 'Pending', 'Archived'
    // For this demo, we'll consider all lists as 'Active' unless specified otherwise
    const listStatus = list.status || 'Active';
    const matchesStatus = filters.status === 'All' || listStatus === filters.status;
    // Moderator filter
    const matchesModerator = filters.moderator === 'All' || list.subscribers.some(subscriber => subscriber.isModerator && subscriber.name === filters.moderator);
    return matchesSearch && matchesCommittee && matchesStatus && matchesModerator;
  }).sort((a, b) => {
    // Sort based on selected option
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'subscribers') {
      return b.subscribers.length - a.subscribers.length;
    } else if (sortOption === 'emails') {
      return b.emailsSent - a.emailsSent;
    }
    return 0;
  });
  const handleSearchChange = query => {
    setSearchQuery(query);
  };
  const handleFilterChange = filterUpdate => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterUpdate.type]: filterUpdate.value
    }));
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
  const handleSortChange = option => {
    setSortOption(option);
  };
  const handleViewTypeChange = type => {
    setViewType(type);
  };
  const handleCreateModalClose = action => {
    setShowCreateModal(false);
    if (action === 'create') {
      showSuccessToast('Mailing list created successfully');
    }
  };
  return <main className="flex-1 p-6 w-full">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header with Create Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Mailing Lists
          </h1>
          <div className="mt-4 sm:mt-0">
            <button className="flex items-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm transition-colors" onClick={() => setShowCreateModal(true)}>
              <UsersIcon className="h-4 w-4 mr-2" />
              Create Mailing List
            </button>
          </div>
        </div>

        {/* View Options and Sort Controls */}
        <div className="flex justify-end items-center mb-4">
          {/* Sort options */}
          <div className="bg-slate-100 rounded-md p-1 flex items-center">
            <span className="text-xs text-slate-600 font-medium mr-2 pl-2">
              Sort by:
            </span>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center ${sortOption === 'name' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`} onClick={() => handleSortChange('name')}>
              <ArrowUpDownIcon className="h-3.5 w-3.5 mr-1.5" />
              Name
            </button>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center ${sortOption === 'subscribers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`} onClick={() => handleSortChange('subscribers')}>
              <UsersIcon className="h-3.5 w-3.5 mr-1.5" />
              Subscribers
            </button>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center ${sortOption === 'emails' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`} onClick={() => handleSortChange('emails')}>
              <MailIcon className="h-3.5 w-3.5 mr-1.5" />
              Emails Sent
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Sidebar - Match width with Meetings page */}
          <div className="w-full md:w-72 mb-8 md:mb-0">
            <MailingListsSidebar onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} currentFilters={filters} />
          </div>
          {/* Right Column - Mailing List Cards */}
          <div className="flex-1 space-y-6">
            {sortedAndFilteredMailingLists.map(mailingList => <MailingListCard key={mailingList.id} mailingList={mailingList} />)}
            {sortedAndFilteredMailingLists.length === 0 && <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-slate-600">
                  No mailing lists found matching your criteria.
                </p>
              </div>}
          </div>
        </div>
      </div>

      {/* Create Mailing List Modal */}
      {showCreateModal && <CreateMailingListModal onClose={handleCreateModalClose} />}

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