import React, { useState } from 'react';
import { SearchIcon, BarChart2Icon, StarIcon, PinIcon } from 'lucide-react';
import { Card } from '../Card';
export const LinksSidebar = ({
  onFilterChange,
  onSearchChange,
  currentFilter
}) => {
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInputChange = e => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };
  return <div className="md:sticky md:top-6 md:self-start">
      {/* Search Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Search
        </h4>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search links and docs..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-transparent text-sm" value={searchInput} onChange={handleSearchInputChange} />
        </div>
      </Card>
      {/* Filters Section */}
      <Card className="mb-8">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Filters
        </h4>
        <div className="mb-4">
          <p className="body3 mb-2">View</p>
          <div className="flex bg-slate-100 rounded-md p-1">
            <div className="flex-1 relative group">
              <button className={`w-full py-1.5 text-xs font-medium rounded-md ${currentFilter === 'all' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => onFilterChange('all')}>
                All
              </button>
            </div>
            <div className="flex-1 relative group">
              <button className={`w-full py-1.5 text-xs font-medium rounded-md ${currentFilter === 'starred' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => onFilterChange('starred')}>
                Starred
              </button>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-max max-w-[200px] text-center">
                Links you have personally starred
              </div>
            </div>
            <div className="flex-1 relative group">
              <button className={`w-full py-1.5 text-xs font-medium rounded-md ${currentFilter === 'pinned' ? 'bg-azure-500 text-white' : 'text-slate-700'}`} onClick={() => onFilterChange('pinned')}>
                Pinned
              </button>
              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-max max-w-[200px] text-center">
                Links pinned by product leadership
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Overview Stats */}
      <Card>
        <h4 className="font-inter font-bold text-base text-slate-900 mb-3">
          Overview Stats
        </h4>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Total Links</span>
          <span className="font-medium text-slate-800">42</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-amber-400 mr-1.5" />
            <span className="body3">Starred</span>
          </div>
          <span className="font-medium text-slate-800">12</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <PinIcon className="h-4 w-4 text-azure-500 mr-1.5" />
            <span className="body3">Pinned</span>
          </div>
          <span className="font-medium text-slate-800">8</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="body3">Folders</span>
          <span className="font-medium text-slate-800">6</span>
        </div>
        <button className="flex items-center justify-center w-full mt-4 px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <BarChart2Icon className="h-4 w-4 mr-2" />
          View Links Insights
        </button>
      </Card>
    </div>;
};