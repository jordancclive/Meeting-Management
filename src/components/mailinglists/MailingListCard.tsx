import React, { useEffect, useState, useRef } from 'react';
import { ExternalLinkIcon, MailIcon, UsersIcon, MoreVerticalIcon, Settings2Icon, UserPlusIcon, UsersIcon as UsersGroupIcon, PlusIcon, ChevronDownIcon, GlobeIcon, LockIcon } from 'lucide-react';
import { Card } from '../Card';
export const MailingListCard = ({
  mailingList
}) => {
  const [isSubscribersOpen, setIsSubscribersOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <Card className="overflow-hidden">
      <div className="p-4">
        {/* Mailing List Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-slate-900 mr-2">
                {mailingList.name}
              </h3>
              {mailingList.isPublic ? <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                  <GlobeIcon className="h-3 w-3 mr-1" />
                  Public
                </span> : <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap">
                  <LockIcon className="h-3 w-3 mr-1" />
                  Private
                </span>}
            </div>
            <a href={mailingList.groupsUrl} target="_blank" rel="noopener noreferrer" className="ml-3 inline-flex items-center text-xs text-azure-600 hover:text-azure-700">
              <ExternalLinkIcon className="h-4 w-4 mr-1.5" />
              Groups.io Topics
            </a>
          </div>
          {/* Kebab Menu */}
          <div className="relative" ref={menuRef}>
            <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="More options">
              <MoreVerticalIcon className="h-5 w-5" />
            </button>
            {isMenuOpen && <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-20 border border-slate-200 py-1">
                <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={() => {
              console.log('Edit settings');
              setIsMenuOpen(false);
            }}>
                  <Settings2Icon className="h-4 w-4 text-slate-500 mr-2" />
                  <span>Edit Settings</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={() => {
              console.log('Manage moderators');
              setIsMenuOpen(false);
            }}>
                  <UsersGroupIcon className="h-4 w-4 text-slate-500 mr-2" />
                  <span>Manage Moderators</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={() => {
              setIsSubscribersOpen(true);
              setIsMenuOpen(false);
            }}>
                  <UsersIcon className="h-4 w-4 text-slate-500 mr-2" />
                  <span>View Subscribers</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={() => {
              console.log('Add recipient');
              setIsMenuOpen(false);
            }}>
                  <PlusIcon className="h-4 w-4 text-slate-500 mr-2" />
                  <span>Add Recipient</span>
                </button>
              </div>}
          </div>
        </div>
        {/* Mailing List Description */}
        <p className="text-sm text-slate-600 mb-4">{mailingList.description}</p>
        {/* Metadata Row */}
        <div className="flex flex-wrap items-center mb-4">
          <div className="flex items-center mr-6 mb-2">
            <MailIcon className="h-4 w-4 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">
              {mailingList.emailsSent} emails sent
            </span>
          </div>
          <div className="flex items-center mb-2">
            <UsersIcon className="h-4 w-4 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">
              {mailingList.committees.join(', ')}
            </span>
          </div>
        </div>
        {/* Subscribers Section */}
        <div>
          <button className="w-full py-2 flex items-center hover:bg-slate-50" onClick={() => setIsSubscribersOpen(!isSubscribersOpen)}>
            <div className="flex items-center flex-grow">
              <UsersIcon className="h-5 w-5 text-azure-500 mr-2" />
              <span className="text-sm text-slate-700">
                Subscribers ({mailingList.subscribers.length})
              </span>
            </div>
            <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isSubscribersOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isSubscribersOpen && <div className="py-3">
              <div className="max-h-[250px] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {mailingList.subscribers.map(subscriber => <div key={subscriber.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {subscriber.profileImage ? <img src={subscriber.profileImage} alt={subscriber.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                            {subscriber.name.split(' ').map(n => n[0]).join('')}
                          </div>}
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-slate-700">
                              {subscriber.name}
                            </p>
                            {subscriber.isModerator && <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md" title="List Moderator">
                                Moderator
                              </span>}
                          </div>
                          <p className="text-xs text-slate-500">
                            {subscriber.company}
                          </p>
                          <a href={`mailto:${subscriber.email}`} className="text-xs text-azure-500 hover:text-azure-600">
                            {subscriber.email}
                          </a>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
        </div>
      </div>
    </Card>;
};