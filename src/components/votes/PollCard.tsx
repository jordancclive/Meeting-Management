import React, { useState } from 'react';
import { ItemCard } from '../ItemCard';
import { ClockIcon, AlertTriangleIcon, CheckCircleIcon, CalendarIcon, BarChart3Icon, ExternalLinkIcon, VoteIcon } from 'lucide-react';
export const PollCard = ({
  poll
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userVote, setUserVote] = useState(poll.userVote);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleVote = optionId => {
    // In a real app, this would send the vote to the server
    setUserVote(optionId);
  };
  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  // Determine if results should be shown
  const showResults = poll.userVote !== null || poll.status === 'completed';
  return <ItemCard>
      <div className="py-5">
        {/* Header with status indicator and due date */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {poll.status === 'active' ? <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                Active
              </span> : <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Completed
              </span>}
            {poll.isUrgent && <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Urgent
              </span>}
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <ClockIcon className="h-3 w-3 mr-1" />
            {poll.status === 'active' ? 'Due' : 'Closed'}: {poll.dueDate}
          </div>
        </div>
        {/* Title and Committee */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-slate-900 mb-1">
            {poll.title}
          </h3>
          <div className="flex items-center text-sm text-slate-600">
            <span>{poll.committee}</span>
          </div>
        </div>
        {/* If from a meeting, show meeting info */}
        {poll.isFromMeeting && <div className="mb-3 flex items-center text-sm text-slate-600">
            <CalendarIcon className="h-4 w-4 mr-1.5 text-slate-400" />
            <span>Created during: {poll.meetingTitle}</span>
          </div>}
        {/* Description - always shown */}
        <div className="mb-4">
          <p className="text-sm text-slate-700">{poll.description}</p>
        </div>
        {/* Poll Options */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-600">
              Responses: {showResults ? poll.totalVotes : '—'}
            </span>
            <button className="text-xs text-azure-600 hover:text-azure-700 font-medium" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          {/* Poll Options with Progress Bars */}
          <div className="space-y-3">
            {poll.options.map(option => {
            const percentage = showResults && totalVotes > 0 ? Math.round(option.votes / totalVotes * 100) : 0;
            return <div key={option.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {poll.status === 'active' && <button onClick={() => handleVote(option.id)} className={`w-4 h-4 rounded-full mr-2 border ${userVote === option.id ? 'bg-azure-500 border-azure-500' : 'border-slate-300 hover:border-azure-500'}`}>
                          {userVote === option.id && <div className="w-2 h-2 mx-auto bg-white rounded-full"></div>}
                        </button>}
                      <span className={`text-sm ${userVote === option.id ? 'font-medium text-azure-700' : 'text-slate-700'}`}>
                        {option.text}
                      </span>
                    </div>
                    {showResults && <span className="text-xs text-slate-500">
                        {percentage}%
                      </span>}
                  </div>
                  {showResults ? <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${userVote === option.id ? 'bg-azure-500' : 'bg-slate-300'}`} style={{
                  width: `${percentage}%`
                }}></div>
                    </div> : <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"></div>}
                </div>;
          })}
          </div>
          {/* Detailed Stats - only shown when expanded */}
          {isExpanded && showResults && <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-medium text-slate-700 mb-2">
                Response Details
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">
                    Total Responses:
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {poll.totalVotes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Most Popular:</span>
                  <span className="text-xs font-medium text-slate-700">
                    {poll.options.reduce((max, option) => option.votes > max.votes ? option : max, poll.options[0]).text}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Created:</span>
                  <span className="text-xs font-medium text-slate-700">
                    {poll.createdAt}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Status:</span>
                  <span className={`text-xs font-medium ${poll.status === 'active' ? 'text-azure-600' : 'text-slate-700'}`}>
                    {poll.status === 'active' ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>}
          {/* Message for user who hasn't voted yet */}
          {!showResults && poll.status === 'active' && <div className="mt-4 p-3 bg-slate-50 rounded-md text-sm text-slate-600 flex items-center">
              <VoteIcon className="h-4 w-4 mr-2 text-slate-400" />
              <span>
                Results will be visible after you submit your response
              </span>
            </div>}
        </div>
        {/* Footer with Creator and View Results */}
        <div className="flex justify-between items-center">
          {/* Creator Info */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              {poll.createdBy.profileImage ? <img src={poll.createdBy.profileImage} alt={poll.createdBy.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs text-slate-600">
                  {poll.createdBy.name.charAt(0)}
                </div>}
            </div>
            <div className="text-xs text-slate-600">
              Created by {poll.createdBy.name} • {poll.createdAt}
            </div>
          </div>
          {/* View Results button */}
          {showResults ? <button className="flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">
              <BarChart3Icon className="h-3.5 w-3.5 mr-1.5" />
              {poll.status === 'completed' ? 'View Results' : 'Current Results'}
            </button> : <button onClick={() => handleVote(poll.options[0].id)} className="flex items-center px-3 py-1.5 text-xs font-medium text-azure-700 bg-azure-50 hover:bg-azure-100 rounded-md">
              <VoteIcon className="h-3.5 w-3.5 mr-1.5" />
              Submit Response
            </button>}
        </div>
      </div>
    </ItemCard>;
};