import React, { useState } from 'react';
import { Card } from '../Card';
import { UserPlusIcon, PencilIcon, GithubIcon } from 'lucide-react';
import { AddCommitteeMemberModal } from './AddCommitteeMemberModal';
import { EditCommitteeModal } from './EditCommitteeModal';
export const CommitteeCard = ({
  committee
}) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleAddMemberClick = () => {
    setShowAddMemberModal(true);
  };
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleAddMemberModalClose = action => {
    setShowAddMemberModal(false);
    if (action === 'added') {
      // In a real app, you would refresh the committee data here
      console.log('Member added to committee');
    }
  };
  const handleEditModalClose = action => {
    setShowEditModal(false);
    if (action === 'updated') {
      // In a real app, you would refresh the committee data here
      console.log('Committee updated successfully');
    }
  };
  return <Card className="overflow-hidden">
      <div className="p-4">
        {/* Committee Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <h3 className="font-semibold text-lg text-slate-900">
              {committee.name}
            </h3>
            {committee.managedOn === 'github' && <a href={committee.githubUrl} target="_blank" rel="noopener noreferrer" className="ml-3 inline-flex items-center text-sm text-azure-600 hover:text-azure-700">
                <GithubIcon className="h-4 w-4 mr-1.5" />
                Managed on GitHub
              </a>}
          </div>
          <div className="flex space-x-2">
            {committee.managedOn !== 'github' && <button className="inline-flex items-center px-3 py-1.5 bg-azure-50 text-azure-600 text-sm font-medium rounded-md hover:bg-azure-100 transition-colors" onClick={handleAddMemberClick}>
                <UserPlusIcon className="h-4 w-4 mr-1.5" />
                Add Member
              </button>}
            {committee.managedOn === 'lfx' && <button className="inline-flex items-center px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-md hover:bg-slate-200 transition-colors" onClick={handleEditClick}>
                <PencilIcon className="h-4 w-4 mr-1.5" />
                Edit
              </button>}
          </div>
        </div>
        {/* Committee Description */}
        <p className="text-sm text-slate-600 mb-4">{committee.description}</p>
        {/* Members List */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">
            Members ({committee.members.length})
          </h4>
          <div className="max-h-[250px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {committee.members.map(member => <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>}
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-slate-700">
                          {member.name}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {member.role} • {member.company}
                      </p>
                      <a href={`mailto:${member.email}`} className="text-xs text-azure-500 hover:text-azure-600">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* Add Committee Member Modal */}
      {showAddMemberModal && <AddCommitteeMemberModal onClose={handleAddMemberModalClose} committee={committee} />}
      {/* Edit Committee Modal */}
      {showEditModal && <EditCommitteeModal onClose={handleEditModalClose} committee={committee} />}
    </Card>;
};