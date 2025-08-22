import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, BarChart2Icon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { Card } from '../Card';
export const MeetingsSidebar = ({
  onFilterChange
}) => {
  const [meetingStatus, setMeetingStatus] = useState('upcoming');
  const [committeeFilter, setCommitteeFilter] = useState('All committees');
  const [recurringFilter, setRecurringFilter] = useState('All meetings');
  const [showCommitteeDropdown, setShowCommitteeDropdown] = useState(false);
  const [showRecurringDropdown, setShowRecurringDropdown] = useState(false);
  const committeeRef = useRef(null);
  const recurringRef = useRef(null);
  const committeeDropdownRef = useRef(null);
  const recurringDropdownRef = useRef(null);
  // Committee options
  const committeeOptions = ['All committees', 'Documentation Team', 'Governing Board', 'Kubernetes Community', 'Security Working Group', 'Technical Steering Committee'];
  // Recurring options
  const recurringOptions = ['All meetings', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'];
  // Handle meeting status change and notify parent component
  const handleMeetingStatusChange = status => {
    setMeetingStatus(status);
    // Pass the new filter value to the parent component
    if (onFilterChange) {
      onFilterChange({
        type: 'status',
        value: status
      });
    }
  };
  // Handle committee filter change
  const handleCommitteeChange = committee => {
    setCommitteeFilter(committee);
    setShowCommitteeDropdown(false);
    if (onFilterChange) {
      onFilterChange({
        type: 'committee',
        value: committee
      });
    }
  };
  // Handle recurring filter change
  const handleRecurringChange = recurring => {
    setRecurringFilter(recurring);
    setShowRecurringDropdown(false);
    if (onFilterChange) {
      onFilterChange({
        type: 'recurring',
        value: recurring
      });
    }
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (committeeRef.current && !committeeRef.current.contains(e.target) && committeeDropdownRef.current && !committeeDropdownRef.current.contains(e.target)) {
        setShowCommitteeDropdown(false);
      }
      if (recurringRef.current && !recurringRef.current.contains(e.target) && recurringDropdownRef.current && !recurringDropdownRef.current.contains(e.target)) {
        setShowRecurringDropdown(false);
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
          <input type="text" placeholder="Search meetings..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-transparent text-sm" />
        </div>
      </Card>
      {/* Filters Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Filters
        </h4>
        <div className="mb-4">
          <p className="body3 mb-2">Meeting Status</p>
          <div className="flex bg-slate-100 rounded-md p-1">
            <button className={`flex-1 py-1.5 text-xs font-medium rounded-md ${meetingStatus === 'upcoming' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => handleMeetingStatusChange('upcoming')}>
              Upcoming
            </button>
            <button className={`flex-1 py-1.5 text-xs font-medium rounded-md ${meetingStatus === 'past' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => handleMeetingStatusChange('past')}>
              Past
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="body3 mb-2">Committee</p>
          <div className="relative" ref={committeeRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowCommitteeDropdown(!showCommitteeDropdown)}>
              <span>{committeeFilter}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showCommitteeDropdown && <div ref={committeeDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {committeeOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleCommitteeChange(option)}>
                    {option}
                  </div>)}
              </div>}
          </div>
        </div>
        <div>
          <p className="body3 mb-2">Recurring</p>
          <div className="relative" ref={recurringRef}>
            <div className="flex justify-between items-center w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-azure-500 cursor-pointer" onClick={() => setShowRecurringDropdown(!showRecurringDropdown)}>
              <span>{recurringFilter}</span>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            {showRecurringDropdown && <div ref={recurringDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {recurringOptions.map(option => <div key={option} className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700" onClick={() => handleRecurringChange(option)}>
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
          <span className="body3">Upcoming</span>
          <span className="font-medium text-slate-800">8</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">This Month</span>
          <span className="font-medium text-slate-800">7</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">My Attendance (last 30 days)</span>
          <span className="font-medium text-slate-800">87%</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Recurring</span>
          <span className="font-medium text-slate-800">7</span>
        </div>
      </Card>
    </div>;
};