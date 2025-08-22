import React from 'react';
import { Card } from '../Card';
import { GithubIcon, LinkedinIcon, PencilIcon, MailIcon } from 'lucide-react';
export const ProfileCard = () => {
  return <Card className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" className="w-24 h-24 rounded-lg object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2 sm:mb-0">
              John Doe
            </h2>
            <button className="inline-flex items-center text-azure-500 hover:text-azure-600 text-sm font-medium">
              <PencilIcon className="h-4 w-4 mr-1" />
              Update My Profile
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {/* Column 1: Title and Company */}
            <div>
              <p className="text-sm text-slate-700">Sr. Engineering Manager</p>
              <p className="text-sm text-slate-700">Google</p>
            </div>
            {/* Column 2: Emails */}
            <div className="space-y-2">
              <div className="flex items-center">
                <MailIcon className="h-4 w-4 text-slate-500 mr-2" />
                <span className="text-sm text-slate-700">
                  john.doe@gmail.com
                </span>
                <span className="ml-2 text-xs text-slate-500">(Personal)</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-4 w-4 text-slate-500 mr-2" />
                <span className="text-sm text-slate-700">jdoe@google.com</span>
                <span className="ml-2 text-xs text-slate-500">(Work)</span>
              </div>
            </div>
            {/* Column 3: Social Connections */}
            <div className="space-y-2">
              <button className="flex items-center text-azure-500 hover:text-azure-600 text-sm font-medium">
                <GithubIcon className="h-4 w-4 mr-1" />
                Connect My GitHub
              </button>
              <button className="flex items-center text-azure-500 hover:text-azure-600 text-sm font-medium">
                <LinkedinIcon className="h-4 w-4 mr-1" />
                Connect My LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};