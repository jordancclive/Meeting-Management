import React, { useState } from 'react';
import { LinksSidebar } from '../components/links/LinksSidebar';
import { LinksTable } from '../components/links/LinksTable';
import { FolderPlusIcon, LinkIcon } from 'lucide-react';
export const LinksDocsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Sample data for links and folders
  const linksData = [{
    id: 1,
    type: 'folder',
    name: 'Security Working Group',
    itemCount: 12,
    lastUpdated: '2 days ago',
    isStarred: true,
    isPinned: true
  }, {
    id: 2,
    type: 'folder',
    name: 'Technical Steering Committee',
    itemCount: 23,
    lastUpdated: '5 days ago',
    isStarred: false,
    isPinned: true
  }, {
    id: 3,
    type: 'link',
    name: 'Quarterly Roadmap Document',
    url: 'https://docs.google.com/document/d/1234',
    lastUpdated: '1 day ago',
    owner: 'Sarah Wilson',
    isStarred: true,
    isPinned: false
  }, {
    id: 4,
    type: 'link',
    name: 'Project Architecture Diagram',
    url: 'https://miro.com/app/board/1234',
    lastUpdated: '3 days ago',
    owner: 'Michael Chen',
    isStarred: false,
    isPinned: true
  }, {
    id: 5,
    type: 'link',
    name: 'Community Guidelines',
    url: 'https://notion.so/community-guidelines',
    lastUpdated: '1 week ago',
    owner: 'David Martinez',
    isStarred: true,
    isPinned: false
  }, {
    id: 6,
    type: 'folder',
    name: 'Documentation Team',
    itemCount: 8,
    lastUpdated: '2 weeks ago',
    isStarred: false,
    isPinned: false
  }, {
    id: 7,
    type: 'link',
    name: 'Meeting Minutes Template',
    url: 'https://docs.google.com/document/d/5678',
    lastUpdated: '3 weeks ago',
    owner: 'Robert Taylor',
    isStarred: false,
    isPinned: false
  }, {
    id: 8,
    type: 'link',
    name: 'Security Vulnerability Report Form',
    url: 'https://forms.google.com/security-report',
    lastUpdated: '1 month ago',
    owner: 'Emma Davis',
    isStarred: false,
    isPinned: false
  }];
  // Handle filter changes from the sidebar
  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };
  // Handle search input changes
  const handleSearchChange = query => {
    setSearchQuery(query);
  };
  // Filter the links based on the current filter and search query
  const filteredLinks = linksData.filter(link => {
    // Apply filter
    if (filter === 'starred' && !link.isStarred) return false;
    if (filter === 'pinned' && !link.isPinned) return false;
    // Apply search
    if (searchQuery) {
      return link.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });
  return <main className="flex-1 p-6 w-full bg-slate-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 style={{
            fontFamily: '"Roboto Slab", serif',
            fontOpticalSizing: 'auto',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '32px'
          }} className="text-slate-900">
              Links & Docs
            </h1>
          </div>
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            {/* Secondary Button - Create Folder */}
            <button className="flex items-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm transition-colors">
              <FolderPlusIcon className="h-4 w-4 mr-2" />
              Create Folder
            </button>
            {/* Primary Button - Add Link */}
            <button className="flex items-center bg-azure-500 hover:bg-azure-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
              <LinkIcon className="h-4 w-4 mr-2" />
              Add Link
            </button>
          </div>
        </div>
        {/* Main Content with Sidebar and Links Table */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-72 mb-8 md:mb-0">
            <LinksSidebar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} currentFilter={filter} />
          </div>
          {/* Main Content Area */}
          <div className="flex-1">
            <LinksTable links={filteredLinks} />
          </div>
        </div>
      </div>
    </main>;
};