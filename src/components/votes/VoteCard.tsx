import React, { useState } from 'react';
import { ItemCard } from '../ItemCard';
import { ClockIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon, CalendarIcon, ThumbsUpIcon, ThumbsDownIcon, MinusCircleIcon } from 'lucide-react';
export const VoteCard = ({
  vote
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userVote, setUserVote] = useState(vote.userVote);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleVote = voteType => {
    // In a real app, this would send the vote to the server
    setUserVote(voteType);
  };
  // Calculate progress percentages
  const totalVotes = vote.votes.total;
  const yesPercentage = Math.round(vote.votes.yes / totalVotes * 100) || 0;
  const noPercentage = Math.round(vote.votes.no / totalVotes * 100) || 0;
  const abstainPercentage = Math.round(vote.votes.abstain / totalVotes * 100) || 0;
  const notVotedPercentage = Math.round(vote.votes.notVoted / totalVotes * 100) || 0;
  return <ItemCard>
      <div className="py-5">
        {/* Header with status indicator and due date */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {vote.status === 'active' ? <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                Active
              </span> : <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Completed
              </span>}
            {vote.isUrgent && <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Urgent
              </span>}
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <ClockIcon className="h-3 w-3 mr-1" />
            {vote.status === 'active' ? 'Due' : 'Closed'}: {vote.dueDate}
          </div>
        </div>
        {/* Title and Committee */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-slate-900 mb-1">
            {vote.title}
          </h3>
          <div className="flex items-center text-sm text-slate-600">
            <span>{vote.committee}</span>
          </div>
        </div>
        {/* If from a meeting, show meeting info */}
        {vote.isFromMeeting && <div className="mb-3 flex items-center text-sm text-slate-600">
            <CalendarIcon className="h-4 w-4 mr-1.5 text-slate-400" />
            <span>Created during: {vote.meetingTitle}</span>
          </div>}
        {/* Description - only shown when expanded */}
        {isExpanded && <div className="mb-4 mt-2">
            <p className="text-sm text-slate-700">{vote.description}</p>
          </div>}
        {/* Voting Stats and Progress Bars */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">
              Votes: {totalVotes - vote.votes.notVoted}/{totalVotes}
            </span>
            <button className="text-xs text-azure-600 hover:text-azure-700 font-medium" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          {/* Progress Bars */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{
            width: `${yesPercentage}%`
          }} title={`Yes: ${vote.votes.yes} (${yesPercentage}%)`}></div>
            <div className="bg-red-500 h-full" style={{
            width: `${noPercentage}%`
          }} title={`No: ${vote.votes.no} (${noPercentage}%)`}></div>
            <div className="bg-amber-400 h-full" style={{
            width: `${abstainPercentage}%`
          }} title={`Abstain: ${vote.votes.abstain} (${abstainPercentage}%)`}></div>
            <div className="bg-slate-300 h-full" style={{
            width: `${notVotedPercentage}%`
          }} title={`Not Voted: ${vote.votes.notVoted} (${notVotedPercentage}%)`}></div>
          </div>
          {/* Legend */}
          {isExpanded && <div className="flex flex-wrap mt-2 gap-x-4 gap-y-1">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-1.5"></div>
                <span>Yes: {vote.votes.yes}</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1.5"></div>
                <span>No: {vote.votes.no}</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-amber-400 rounded-full mr-1.5"></div>
                <span>Abstain: {vote.votes.abstain}</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 bg-slate-300 rounded-full mr-1.5"></div>
                <span>Not Voted: {vote.votes.notVoted}</span>
              </div>
            </div>}
        </div>
        {/* Footer with Creator and Vote Actions */}
        <div className="flex justify-between items-center">
          {/* Creator Info */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              {vote.createdBy.profileImage ? <img src={vote.createdBy.profileImage} alt={vote.createdBy.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs text-slate-600">
                  {vote.createdBy.name.charAt(0)}
                </div>}
            </div>
            <div className="text-xs text-slate-600">
              Created by {vote.createdBy.name} • {vote.createdAt}
            </div>
          </div>
          {/* Vote Actions - only shown if vote is active */}
          {vote.status === 'active' && <div className="flex items-center space-x-2">
              <button className={`p-1.5 rounded-md ${userVote === 'yes' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'}`} onClick={() => handleVote('yes')} title="Vote Yes">
                <ThumbsUpIcon className="h-4 w-4" />
              </button>
              <button className={`p-1.5 rounded-md ${userVote === 'no' ? 'bg-red-100 text-red-700' : 'text-slate-500 hover:bg-slate-100'}`} onClick={() => handleVote('no')} title="Vote No">
                <ThumbsDownIcon className="h-4 w-4" />
              </button>
              <button className={`p-1.5 rounded-md ${userVote === 'abstain' ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-100'}`} onClick={() => handleVote('abstain')} title="Abstain">
                <MinusCircleIcon className="h-4 w-4" />
              </button>
            </div>}
          {/* Show user's vote if completed */}
          {vote.status === 'completed' && userVote && <div className="flex items-center">
              <span className="text-xs text-slate-600 mr-2">Your vote:</span>
              {userVote === 'yes' && <span className="flex items-center text-xs text-emerald-600">
                  <ThumbsUpIcon className="h-3 w-3 mr-1" />
                  Yes
                </span>}
              {userVote === 'no' && <span className="flex items-center text-xs text-red-600">
                  <ThumbsDownIcon className="h-3 w-3 mr-1" />
                  No
                </span>}
              {userVote === 'abstain' && <span className="flex items-center text-xs text-amber-600">
                  <MinusCircleIcon className="h-3 w-3 mr-1" />
                  Abstain
                </span>}
            </div>}
        </div>
      </div>
    </ItemCard>;
};