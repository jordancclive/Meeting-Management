import React, { useState } from 'react';
import { ItemCard } from '../ItemCard';
import { ClockIcon, AlertTriangleIcon, CheckCircleIcon, FileTextIcon, ExternalLinkIcon } from 'lucide-react';
export const SurveyCard = ({
  survey
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // Calculate progress percentage
  const completionPercentage = Math.round(survey.responses.completed / survey.responses.total * 100) || 0;
  return <ItemCard>
      <div className="py-5">
        {/* Header with status indicator and due date */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {survey.status === 'active' ? <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center">
                <ClockIcon className="h-3 w-3 mr-1" />
                Active
              </span> : <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Completed
              </span>}
            {survey.isUrgent && <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />
                Urgent
              </span>}
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <ClockIcon className="h-3 w-3 mr-1" />
            {survey.status === 'active' ? 'Due' : 'Closed'}: {survey.dueDate}
          </div>
        </div>
        {/* Title and Committee */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-slate-900 mb-1">
            {survey.title}
          </h3>
          <div className="flex items-center text-sm text-slate-600">
            <span>{survey.committee}</span>
          </div>
        </div>
        {/* Survey Info */}
        <div className="flex items-center mb-3 text-xs text-slate-600 space-x-4">
          <div className="flex items-center">
            <FileTextIcon className="h-3 w-3 mr-1" />
            <span>{survey.questions} questions</span>
          </div>
          <div>
            <span>Est. time: {survey.estimatedTime}</span>
          </div>
        </div>
        {/* Description - only shown when expanded */}
        {isExpanded && <div className="mb-4">
            <p className="text-sm text-slate-700">{survey.description}</p>
          </div>}
        {/* Response Stats and Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">
              Responses: {survey.responses.completed}/{survey.responses.total}
            </span>
            <button className="text-xs text-azure-600 hover:text-azure-700 font-medium" onClick={toggleExpand}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="bg-azure-500 h-full" style={{
            width: `${completionPercentage}%`
          }} title={`${completionPercentage}% completed`}></div>
          </div>
        </div>
        {/* Footer with Creator and Take Survey Button */}
        <div className="flex justify-between items-center">
          {/* Creator Info */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              {survey.createdBy.profileImage ? <img src={survey.createdBy.profileImage} alt={survey.createdBy.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-300 flex items-center justify-center text-xs text-slate-600">
                  {survey.createdBy.name.charAt(0)}
                </div>}
            </div>
            <div className="text-xs text-slate-600">
              Created by {survey.createdBy.name} • {survey.createdAt}
            </div>
          </div>
          {/* Survey Action Button - only shown if survey is active */}
          {survey.status === 'active' && <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center
                ${survey.userStatus === 'completed' ? 'bg-emerald-50 text-emerald-700' : survey.userStatus === 'inProgress' ? 'bg-amber-50 text-amber-700' : 'bg-azure-50 text-azure-700'}`}>
              {survey.userStatus === 'completed' ? <>
                  <CheckCircleIcon className="h-3 w-3 mr-1.5" />
                  Completed
                </> : survey.userStatus === 'inProgress' ? <>
                  <ClockIcon className="h-3 w-3 mr-1.5" />
                  Continue Survey
                </> : <>
                  <FileTextIcon className="h-3 w-3 mr-1.5" />
                  Take Survey
                </>}
            </button>}
          {/* View Results - only shown if survey is completed */}
          {survey.status === 'completed' && <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium flex items-center">
              <ExternalLinkIcon className="h-3 w-3 mr-1.5" />
              View Results
            </button>}
        </div>
      </div>
    </ItemCard>;
};