import React, { useEffect, useState } from 'react';
import { VotesPollsSidebar } from '../components/votes/VotesPollsSidebar';
import { VoteCard } from '../components/votes/VoteCard';
import { PollCard } from '../components/votes/PollCard';
import { CreateVoteModal } from '../components/votes/CreateVoteModal';
import { CreatePollModal } from '../components/votes/CreatePollModal';
import { PlusIcon, BarChart2Icon } from 'lucide-react';
export const VotesPollsPage = () => {
  const [activeTab, setActiveTab] = useState('votes');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    committee: 'All committees'
  });
  const [showCreateVoteModal, setShowCreateVoteModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  // Sample data for votes
  const [votes, setVotes] = useState([{
    id: 1,
    title: 'Approve the new security policy for Kubernetes v1.28',
    description: 'The Security Working Group has proposed a new security policy for the upcoming Kubernetes v1.28 release. This vote is to approve the policy as presented in the meeting on June 15, 2023.',
    committee: 'Security Working Group',
    status: 'active',
    dueDate: 'Aug 12, 2025',
    isUrgent: true,
    createdAt: 'Jun 16, 2023',
    isFromMeeting: true,
    meetingTitle: 'Security Working Group Weekly',
    votes: {
      yes: 12,
      no: 3,
      abstain: 2,
      notVoted: 8,
      total: 25
    },
    userVote: 'yes',
    createdBy: {
      name: 'Sarah Wilson',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  }, {
    id: 2,
    title: 'Add additional maintainers to the API server component',
    description: 'We need to add two additional maintainers to the API server component to help with the increased workload and provide better coverage across time zones.',
    committee: 'Technical Steering Committee',
    status: 'active',
    dueDate: 'Jul 10, 2023',
    isUrgent: false,
    createdAt: 'Jun 20, 2023',
    votes: {
      yes: 8,
      no: 0,
      abstain: 1,
      notVoted: 6,
      total: 15
    },
    userVote: null,
    createdBy: {
      name: 'David Martinez',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  }, {
    id: 3,
    title: 'Approve budget for Kubernetes community event',
    description: 'This vote is to approve the proposed budget of $25,000 for the upcoming Kubernetes community event in September.',
    committee: 'Governing Board',
    status: 'active',
    dueDate: 'Aug 20, 2025',
    isUrgent: true,
    createdAt: 'Jun 22, 2023',
    votes: {
      yes: 5,
      no: 2,
      abstain: 0,
      notVoted: 3,
      total: 10
    },
    userVote: 'abstain',
    createdBy: {
      name: 'Emma Davis',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }, {
    id: 4,
    title: 'Adopt new documentation structure',
    description: 'The Documentation Team has proposed a new structure for the Kubernetes documentation to improve usability and findability.',
    committee: 'Documentation Team',
    status: 'completed',
    dueDate: 'Jun 10, 2023',
    isUrgent: false,
    createdAt: 'Jun 1, 2023',
    votes: {
      yes: 7,
      no: 1,
      abstain: 0,
      notVoted: 0,
      total: 8
    },
    userVote: 'yes',
    createdBy: {
      name: 'Michael Chen',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  }, {
    id: 5,
    title: 'Extend the deprecation timeline for v1beta1 APIs',
    description: 'This vote is to extend the deprecation timeline for v1beta1 APIs by an additional 6 months to allow more time for users to migrate.',
    committee: 'Technical Steering Committee',
    status: 'completed',
    dueDate: 'May 28, 2023',
    isUrgent: false,
    createdAt: 'May 15, 2023',
    votes: {
      yes: 10,
      no: 4,
      abstain: 1,
      notVoted: 0,
      total: 15
    },
    userVote: 'no',
    createdBy: {
      name: 'James Wilson',
      profileImage: null
    }
  }]);
  // Sample data for polls
  const [polls, setPolls] = useState([{
    id: 1,
    title: 'Which name do you prefer for the new feature?',
    description: 'We need to decide on a name for the new auto-scaling feature in Kubernetes v1.28.',
    committee: 'Kubernetes Community',
    status: 'active',
    dueDate: 'Aug 3, 2025',
    isUrgent: true,
    createdAt: 'Jun 25, 2023',
    isFromMeeting: true,
    meetingTitle: 'Kubernetes Community Call',
    options: [{
      id: 1,
      text: 'AutoScaler Pro',
      votes: 8
    }, {
      id: 2,
      text: 'KubeScale',
      votes: 12
    }, {
      id: 3,
      text: 'ElastiKube',
      votes: 5
    }, {
      id: 4,
      text: 'ScaleForce',
      votes: 3
    }],
    totalVotes: 28,
    userVote: 2,
    createdBy: {
      name: 'Alex Johnson',
      profileImage: null
    }
  }, {
    id: 2,
    title: 'Which day works best for the monthly community meeting?',
    description: "We're considering changing the day of our monthly community meeting to improve attendance.",
    committee: 'Kubernetes Community',
    status: 'active',
    dueDate: 'Jul 7, 2023',
    isUrgent: false,
    createdAt: 'Jun 23, 2023',
    options: [{
      id: 1,
      text: 'Tuesday',
      votes: 15
    }, {
      id: 2,
      text: 'Wednesday',
      votes: 22
    }, {
      id: 3,
      text: 'Thursday',
      votes: 18
    }],
    totalVotes: 55,
    userVote: null,
    createdBy: {
      name: 'Sarah Wilson',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  }, {
    id: 3,
    title: 'Which area needs the most documentation improvement?',
    description: 'Help us prioritize our documentation efforts by indicating which area you think needs the most improvement.',
    committee: 'Documentation Team',
    status: 'active',
    dueDate: 'Jul 12, 2023',
    isUrgent: false,
    createdAt: 'Jun 28, 2023',
    options: [{
      id: 1,
      text: 'Installation guides',
      votes: 7
    }, {
      id: 2,
      text: 'API reference',
      votes: 12
    }, {
      id: 3,
      text: 'Tutorials',
      votes: 9
    }, {
      id: 4,
      text: 'Troubleshooting',
      votes: 18
    }, {
      id: 5,
      text: 'Concepts',
      votes: 5
    }],
    totalVotes: 51,
    userVote: 4,
    createdBy: {
      name: 'Michael Chen',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  }, {
    id: 4,
    title: 'Preferred location for the next KubeCon',
    description: "We're gathering input on preferred locations for the next KubeCon event.",
    committee: 'Governing Board',
    status: 'completed',
    dueDate: 'Jun 15, 2023',
    isUrgent: false,
    createdAt: 'Jun 1, 2023',
    options: [{
      id: 1,
      text: 'San Francisco',
      votes: 42
    }, {
      id: 2,
      text: 'Berlin',
      votes: 38
    }, {
      id: 3,
      text: 'Singapore',
      votes: 27
    }, {
      id: 4,
      text: 'Sydney',
      votes: 21
    }],
    totalVotes: 128,
    userVote: 2,
    createdBy: {
      name: 'Emma Davis',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }]);
  // Helper function to convert date string to Date object for sorting
  const parseDateString = dateStr => {
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    };
    const [month, day, year] = dateStr.split(' ');
    return new Date(parseInt(year), months[month], parseInt(day));
  };
  // Sort function for votes and polls
  const sortByDueDate = (a, b) => {
    const dateA = parseDateString(a.dueDate);
    const dateB = parseDateString(b.dueDate);
    return dateA - dateB;
  };
  // Filter votes/polls based on current filters and search query
  const filteredVotes = votes.filter(vote => {
    // Filter by status
    if (filters.status !== 'all' && vote.status !== filters.status) return false;
    // Filter by committee
    if (filters.committee !== 'All committees' && vote.committee !== filters.committee) return false;
    // Filter by search query
    if (searchQuery && !vote.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort(sortByDueDate);
  const filteredPolls = polls.filter(poll => {
    // Filter by status
    if (filters.status !== 'all' && poll.status !== filters.status) return false;
    // Filter by committee
    if (filters.committee !== 'All committees' && poll.committee !== filters.committee) return false;
    // Filter by search query
    if (searchQuery && !poll.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort(sortByDueDate);
  // Handle filter changes from sidebar
  const handleFilterChange = filterUpdate => {
    setFilters(prev => ({
      ...prev,
      [filterUpdate.type]: filterUpdate.value
    }));
  };
  // Handle search changes from sidebar
  const handleSearchChange = query => {
    setSearchQuery(query);
  };
  // Handle modal close
  const handleModalClose = action => {
    if (showCreateVoteModal) {
      setShowCreateVoteModal(false);
      if (action === 'create') {
        // In a real app, we would add the new vote to the list
        console.log('Vote created');
      }
    }
    if (showCreatePollModal) {
      setShowCreatePollModal(false);
      if (action === 'create') {
        // In a real app, we would add the new poll to the list
        console.log('Poll created');
      }
    }
  };
  return <main className="flex-1 p-6 w-full bg-slate-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Votes & Polls
          </h1>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button onClick={() => activeTab === 'votes' ? setShowCreateVoteModal(true) : setShowCreatePollModal(true)} className="flex items-center px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm font-medium transition-colors">
              <PlusIcon className="h-4 w-4 mr-1.5" />
              Create {activeTab === 'votes' ? 'Vote' : 'Poll'}
            </button>
            <button className="flex items-center px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-sm font-medium transition-colors">
              <BarChart2Icon className="h-4 w-4 mr-1.5" />
              View Insights
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === 'votes' ? 'border-azure-500 text-azure-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'}`} onClick={() => setActiveTab('votes')}>
            Votes
          </button>
          <button className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === 'polls' ? 'border-azure-500 text-azure-600' : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'}`} onClick={() => setActiveTab('polls')}>
            Polls
          </button>
        </div>
        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <VotesPollsSidebar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} activeTab={activeTab} filters={filters} />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'votes' ? <>
                {filteredVotes.length > 0 ? <div className="space-y-4">
                    {filteredVotes.map(vote => <VoteCard key={vote.id} vote={vote} />)}
                  </div> : <div className="bg-white rounded-xl p-8 text-center">
                    <p className="text-slate-500">
                      No votes found matching your criteria.
                    </p>
                    <button onClick={() => setShowCreateVoteModal(true)} className="mt-4 px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm">
                      Create a Vote
                    </button>
                  </div>}
              </> : <>
                {filteredPolls.length > 0 ? <div className="space-y-4">
                    {filteredPolls.map(poll => <PollCard key={poll.id} poll={poll} />)}
                  </div> : <div className="bg-white rounded-xl p-8 text-center">
                    <p className="text-slate-500">
                      No polls found matching your criteria.
                    </p>
                    <button onClick={() => setShowCreatePollModal(true)} className="mt-4 px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm">
                      Create a Poll
                    </button>
                  </div>}
              </>}
          </div>
        </div>
      </div>
      {/* Modals */}
      {showCreateVoteModal && <CreateVoteModal onClose={handleModalClose} />}
      {showCreatePollModal && <CreatePollModal onClose={handleModalClose} />}
    </main>;
};