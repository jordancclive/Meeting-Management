import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, BarChart2Icon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Card } from '../Card';
export const MailingListsSidebar = ({
  onSearchChange,
  onFilterChange,
  currentFilters
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showCommitteeDropdown, setShowCommitteeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showModeratorDropdown, setShowModeratorDropdown] = useState(false);
  const committeeRef = useRef(null);
  const statusRef = useRef(null);
  const moderatorRef = useRef(null);
  const committeeDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const moderatorDropdownRef = useRef(null);
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };
  // Committee options
  const committeeOptions = ['All', 'Core Development', 'Documentation Team', 'Governing Board', 'Legal Working Group', 'Security Working Group', 'Technical Steering Committee'];
  // Status options
  const statusOptions = ['All', 'Active', 'Pending', 'Archived'];
  // Moderator options (would come from API in real app)
  const moderatorOptions = ['All', 'Robert Taylor', 'Ashley Crickenberger', 'Sarah Wilson', 'Rachel Green'];
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
  // Handle status filter change
  const handleStatusChange = status => {
    setShowStatusDropdown(false);
    if (onFilterChange) {
      onFilterChange({
        type: 'status',
        value: status
      });
    }
  };
  // Handle moderator filter change
  const handleModeratorChange = moderator => {
    setShowModeratorDropdown(false);
    if (onFilterChange) {
      onFilterChange({
        type: 'moderator',
        value: moderator
      });
    }
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (committeeRef.current && !committeeRef.current.contains(e.target) && committeeDropdownRef.current && !committeeDropdownRef.current.contains(e.target)) {
        setShowCommitteeDropdown(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target) && statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
        setShowStatusDropdown(false);
      }
      if (moderatorRef.current && !moderatorRef.current.contains(e.target) && moderatorDropdownRef.current && !moderatorDropdownRef.current.contains(e.target)) {
        setShowModeratorDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className="md:sticky md:top-6 md:self-start">
      {/* Search Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Search
        </h4>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search mailing lists..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-transparent text-sm" value={searchInput} onChange={handleSearchInputChange} />
        </div>
      </Card>
      {/* Filters Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Filters
        </h4>
        {/* Committee Filter */}
        <div className="mb-4">
          <p className="body3 mb-2">Committee</p>
          <div className="relative" ref={committeeRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowCommitteeDropdown(!showCommitteeDropdown)}>
              <span>{currentFilters.committee}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showCommitteeDropdown && <div ref={committeeDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {committeeOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleCommitteeChange(option)}>
                    {option}
                  </div>)}
              </div>}
          </div>
        </div>
        {/* Status Filter */}
        <div className="mb-4">
          <p className="body3 mb-2">Status</p>
          <div className="relative" ref={statusRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              <span>{currentFilters.status}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showStatusDropdown && <div ref={statusDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {statusOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleStatusChange(option)}>
                    {option}
                  </div>)}
              </div>}
          </div>
        </div>
        {/* Moderator Filter */}
        <div>
          <p className="body3 mb-2">Moderator</p>
          <div className="relative" ref={moderatorRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowModeratorDropdown(!showModeratorDropdown)}>
              <span>{currentFilters.moderator}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showModeratorDropdown && <div ref={moderatorDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {moderatorOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleModeratorChange(option)}>
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
        <div className="flex justify-between items-center py-2">
          <span className="body3">Total Lists</span>
          <span className="font-medium text-slate-800">6</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Total Subscribers</span>
          <span className="font-medium text-slate-800">25</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Active Lists</span>
          <span className="font-medium text-slate-800">6</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Public Lists</span>
          <span className="font-medium text-slate-800">4</span>
        </div>
        <button className="flex items-center justify-center w-full mt-4 px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <BarChart2Icon className="h-4 w-4 mr-2" />
          View Mailing List Insights
        </button>
      </Card>
    </div>;
};