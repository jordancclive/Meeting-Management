import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, ShieldIcon, UserIcon, CalendarIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Card } from '../Card';
export const PermissionsSidebar = ({
  onSearchChange,
  onFilterChange,
  currentFilter
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };
  // Filter options
  const filterOptions = [{
    value: 'all',
    label: 'All Members'
  }, {
    value: 'admin',
    label: 'Committee Admins'
  }, {
    value: 'committee',
    label: 'Committee Members'
  }, {
    value: 'scheduleMeetings',
    label: 'Meeting Schedulers'
  }];
  // Get display label for current filter
  const getCurrentFilterLabel = () => {
    const option = filterOptions.find(opt => opt.value === currentFilter);
    return option ? option.label : 'All Members';
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (filterRef.current && !filterRef.current.contains(e.target) && filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setShowFilterDropdown(false);
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
          <input type="text" placeholder="Search members..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-transparent text-sm" value={searchInput} onChange={handleSearchInputChange} />
        </div>
      </Card>
      {/* Filters Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Filters
        </h4>
        <div className="mb-4">
          <p className="body3 mb-2">View</p>
          <div className="relative" ref={filterRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              <span>{getCurrentFilterLabel()}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showFilterDropdown && <div ref={filterDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filterOptions.map(option => <div key={option.value} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => {
              onFilterChange(option.value);
              setShowFilterDropdown(false);
            }}>
                    {option.label}
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
          <span className="body3">Total Members</span>
          <span className="font-medium text-slate-800">12</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <ShieldIcon className="h-4 w-4 text-slate-500 mr-1.5" />
            <span className="body3">Committee Admins</span>
          </div>
          <span className="font-medium text-slate-800">9</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 text-slate-500 mr-1.5" />
            <span className="body3">Committee Members</span>
          </div>
          <span className="font-medium text-slate-800">12</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 text-slate-500 mr-1.5" />
            <span className="body3">Meeting Schedulers</span>
          </div>
          <span className="font-medium text-slate-800">7</span>
        </div>
      </Card>
    </div>;
};