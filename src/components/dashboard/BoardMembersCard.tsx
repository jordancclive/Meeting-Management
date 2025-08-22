import React, { useState } from 'react';
import { Card } from '../Card';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
export const BoardMembersCard = () => {
  // Initialize with all committees expanded
  const [expandedCommittees, setExpandedCommittees] = useState(['PyTorch - Governing Board', 'Kubernetes - Technical Steering Committee']);
  const toggleCommittee = committee => {
    if (expandedCommittees.includes(committee)) {
      setExpandedCommittees(expandedCommittees.filter(c => c !== committee));
    } else {
      setExpandedCommittees([...expandedCommittees, committee]);
    }
  };
  return <Card>
      <div className="p-4">
        <h4 className="font-inter font-bold text-base text-slate-900 mb-4">
          My Board & Committee Members
        </h4>
        <div className="space-y-4">
          {/* Kubernetes - Technical Steering Committee */}
          <div>
            <button className="flex items-center justify-between w-full text-left" onClick={() => toggleCommittee('Kubernetes - Technical Steering Committee')}>
              <div className="flex items-center">
                {expandedCommittees.includes('Kubernetes - Technical Steering Committee') ? <ChevronDownIcon className="h-4 w-4 text-slate-500 mr-2" /> : <ChevronRightIcon className="h-4 w-4 text-slate-500 mr-2" />}
                <span className="text-sm font-medium text-slate-700">
                  Kubernetes - Technical Steering Committee (5)
                </span>
              </div>
            </button>
            {expandedCommittees.includes('Kubernetes - Technical Steering Committee') && <div className="mt-2 pl-6 space-y-3">
                {/* Robert Taylor */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Robert Taylor" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Robert Taylor, VMWare
                    </p>
                    <a href="mailto:rtaylor@vmware.com" className="text-xs text-azure-500 hover:text-azure-600">
                      rtaylor@vmware.com
                    </a>
                  </div>
                </div>
                {/* Lisa Wang */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Lisa Wang" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Lisa Wang, NVIDIA
                    </p>
                    <a href="mailto:lwang@nvidia.com" className="text-xs text-azure-500 hover:text-azure-600">
                      lwang@nvidia.com
                    </a>
                  </div>
                </div>
                {/* Daniel Kim */}
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                    DK
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Daniel Kim, Samsung
                    </p>
                    <a href="mailto:dkim@samsung.com" className="text-xs text-azure-500 hover:text-azure-600">
                      dkim@samsung.com
                    </a>
                  </div>
                </div>
                {/* Jennifer Lopez */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Jennifer Lopez" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Jennifer Lopez, Broadcom Inc.
                    </p>
                    <a href="mailto:jlopez@broadcom.com" className="text-xs text-azure-500 hover:text-azure-600">
                      jlopez@broadcom.com
                    </a>
                  </div>
                </div>
                {/* David Martinez */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="David Martinez" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      David Martinez, Red Hat
                    </p>
                    <a href="mailto:dmartinez@redhat.com" className="text-xs text-azure-500 hover:text-azure-600">
                      dmartinez@redhat.com
                    </a>
                  </div>
                </div>
              </div>}
          </div>
          {/* PyTorch - Governing Board */}
          <div>
            <button className="flex items-center justify-between w-full text-left" onClick={() => toggleCommittee('PyTorch - Governing Board')}>
              <div className="flex items-center">
                {expandedCommittees.includes('PyTorch - Governing Board') ? <ChevronDownIcon className="h-4 w-4 text-slate-500 mr-2" /> : <ChevronRightIcon className="h-4 w-4 text-slate-500 mr-2" />}
                <span className="text-sm font-medium text-slate-700">
                  PyTorch - Governing Board (4)
                </span>
              </div>
            </button>
            {expandedCommittees.includes('PyTorch - Governing Board') && <div className="mt-2 pl-6 space-y-3">
                {/* Ashley Crickenberger */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ashley Crickenberger" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Ashley Crickenberger, Google
                    </p>
                    <a href="mailto:ashleyc@google.com" className="text-xs text-azure-500 hover:text-azure-600">
                      ashleyc@google.com
                    </a>
                  </div>
                </div>
                {/* Aaron Bronson */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aaron Bronson" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Aaron Bronson, Amazon
                    </p>
                    <a href="mailto:aaronb@amazon.com" className="text-xs text-azure-500 hover:text-azure-600">
                      aaronb@amazon.com
                    </a>
                  </div>
                </div>
                {/* Bethany Smith */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Bethany Smith" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Bethany Smith, Microsoft
                    </p>
                    <a href="mailto:bethanys@microsoft.com" className="text-xs text-azure-500 hover:text-azure-600">
                      bethanys@microsoft.com
                    </a>
                  </div>
                </div>
                {/* Carlos Jimenez */}
                <div className="flex items-center">
                  <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Carlos Jimenez" className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Carlos Jimenez, IBM
                    </p>
                    <a href="mailto:carlos12@ibm.com" className="text-xs text-azure-500 hover:text-azure-600">
                      carlos12@ibm.com
                    </a>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </Card>;
};