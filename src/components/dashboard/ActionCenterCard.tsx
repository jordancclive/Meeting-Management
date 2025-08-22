import React from 'react';
import { Card } from '../Card';
import { ArrowRightIcon } from 'lucide-react';
export const ActionCenterCard = () => {
  return <Card>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-inter font-bold text-base text-slate-900">
            Action Center (4)
          </h4>
        </div>
        <div className="space-y-4">
          {/* Meeting Today */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center mb-2">
              <span className="text-xs bg-azure-100 text-azure-700 px-2 py-1 rounded-md mr-2">
                Meeting Today
              </span>
              <span className="text-xs text-slate-500">at 5:00 pm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Kubernetes Governing Board
              </span>
              <button className="text-sm text-azure-500 hover:text-azure-600 font-medium">
                Read Agenda
              </button>
            </div>
          </div>
          {/* Vote */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center mb-2">
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md mr-2">
                Vote
              </span>
              <span className="text-xs text-slate-500">
                closes March 27, 2025
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Kubernetes Technical Steering Committee
              </span>
              <button className="text-sm text-azure-500 hover:text-azure-600 font-medium">
                Vote
              </button>
            </div>
          </div>
          {/* Missed Meeting */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center mb-2">
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md mr-2">
                Missed Meeting
              </span>
              <span className="text-xs text-slate-500">Mar 23, 5:00pm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Kubernetes Governing Board
              </span>
              <button className="text-sm text-azure-500 hover:text-azure-600 font-medium">
                Review
              </button>
            </div>
          </div>
          {/* Missed Meeting */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md mr-2">
                Missed Meeting
              </span>
              <span className="text-xs text-slate-500">Mar 22, 5:00pm</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Kubernetes Committee
              </span>
              <button className="text-sm text-azure-500 hover:text-azure-600 font-medium">
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};