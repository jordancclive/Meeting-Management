import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, BarChart2Icon, ChevronDown as ChevronDownIcon, VoteIcon, FileTextIcon } from 'lucide-react';
import { Card } from '../Card';
export const VotesSurveysSidebar = ({
  onFilterChange,
  onSearchChange,
  activeTab,
  filters
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showCommitteeDropdown, setShowCommitteeDropdown] = useState(false);
  const committeeRef = useRef(null);
  const committeeDropdownRef = useRef(null);
  // Committee options
  const committeeOptions = ['All committees', 'Documentation Team', 'Governing Board', 'Kubernetes Community', 'Security Working Group', 'Technical Steering Committee'];
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };
  // Handle status change and notify parent component
  const handleStatusChange = status => {
    if (onFilterChange) {
      onFilterChange({
        type: 'status',
        value: status
      });
    }
  };
  // Handle committee filter change
  const handleCommitteeChange = committee => {
    setShowCommitteeDropdown(false);
    if (onFilterChange) {
      onFilterChange({
        type: 'committee',
        value: committee
      });
    }
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (committeeRef.current && !committeeRef.current.contains(e.target) && committeeDropdownRef.current && !committeeDropdownRef.current.contains(e.target)) {
        setShowCommitteeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Reset search when tab changes
  useEffect(() => {
    setSearchInput('');
    onSearchChange('');
  }, [activeTab]);
  return <div className="md:sticky md:top-6 md:self-start">
      {/* Search Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Search
        </h4>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder={`Search ${activeTab}...`} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-transparent text-sm" value={searchInput} onChange={handleSearchInputChange} />
        </div>
      </Card>
      {/* Filters Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Filters
        </h4>
        <div className="mb-4">
          <p className="body3 mb-2">Status</p>
          <div className="flex bg-slate-100 rounded-md p-1">
            <button className={`flex-1 py-1.5 text-xs font-medium rounded-md ${filters.status === 'active' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => handleStatusChange('active')}>
              Active
            </button>
            <button className={`flex-1 py-1.5 text-xs font-medium rounded-md ${filters.status === 'completed' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => handleStatusChange('completed')}>
              Completed
            </button>
            <button className={`flex-1 py-1.5 text-xs font-medium rounded-md ${filters.status === 'all' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => handleStatusChange('all')}>
              All
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="body3 mb-2">Committee</p>
          <div className="relative" ref={committeeRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowCommitteeDropdown(!showCommitteeDropdown)}>
              <span>{filters.committee}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showCommitteeDropdown && <div ref={committeeDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {committeeOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleCommitteeChange(option)}>
                    {option}
                  </div>)}
              </div>}
          </div>
        </div>
      </Card>
      {/* Overview Stats */}
      <Card>
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Overview Stats
        </h4>
        {activeTab === 'votes' ? <>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <VoteIcon className="h-4 w-4 text-slate-500 mr-1.5" />
                <span className="body3">Active Votes</span>
              </div>
              <span className="font-medium text-slate-800">3</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Completed Votes</span>
              <span className="font-medium text-slate-800">2</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Your Participation</span>
              <span className="font-medium text-slate-800">80%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Avg. Response Time</span>
              <span className="font-medium text-slate-800">1.2 days</span>
            </div>
          </> : <>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <FileTextIcon className="h-4 w-4 text-slate-500 mr-1.5" />
                <span className="body3">Active Surveys</span>
              </div>
              <span className="font-medium text-slate-800">3</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Completed Surveys</span>
              <span className="font-medium text-slate-800">1</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Your Participation</span>
              <span className="font-medium text-slate-800">75%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="body3">Avg. Completion Time</span>
              <span className="font-medium text-slate-800">7 min</span>
            </div>
          </>}
        <button className="flex items-center justify-center w-full mt-4 px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <BarChart2Icon className="h-4 w-4 mr-2" />
          View {activeTab === 'votes' ? 'Voting' : 'Survey'} Insights
        </button>
      </Card>
    </div>;
};