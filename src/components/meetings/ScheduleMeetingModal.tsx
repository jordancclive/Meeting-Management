import React, { useEffect, useState } from 'react';
import { X as CloseIcon, CalendarDaysIcon, CheckCircle as CheckCircleIcon, Users as UsersIcon, FileText as FileTextIcon, Calendar as CalendarIcon, Settings as SettingsIcon, Check as CheckIcon, ChevronDown as ChevronDownIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
// Meeting template data - same as in CreateMeetingTemplateModal
const meetingTemplates = [{
  id: 'general-committee',
  emoji: '🟦',
  name: 'General Committee Update Meeting',
  committees: ['Core Team', 'Documentation Team', 'Outreach WG', 'Security WG'],
  cadence: 'Weekly or Biweekly',
  agenda: `• Review of previous meeting notes and follow-ups
• Updates from each sub-group or committee member
• Review of ongoing tasks and deadlines
• New business or proposals raised since last meeting
• Discussion of any blockers or coordination needs
• Confirm upcoming milestones or events
• Assign next steps and owners`,
  description: 'For recurring operational or check-in meetings.'
}, {
  id: 'proposal-review',
  emoji: '🟩',
  name: 'Proposal Review & Decision Meeting',
  committees: ['Technical Steering Committee', 'Governing Board'],
  cadence: 'Monthly',
  agenda: `• Introduce and clarify proposal(s) on the agenda
• Presenter walkthrough and Q&A
• Committee discussion of tradeoffs or implications
• Motion to vote (if quorum present)
• Vote results and outcome documentation
• Follow-up steps or implementation plan
• Schedule next review (if needed)`,
  description: 'For meetings focused on evaluating and voting on new initiatives.'
}, {
  id: 'planning-roadmapping',
  emoji: '🟨',
  name: 'Committee Planning & Roadmapping Session',
  committees: ['All (especially Core Team, TSC, Outreach WG)'],
  cadence: 'Quarterly',
  agenda: `• Committee goals and KPIs review
• Recap of recent successes and challenges
• Brainstorming: new initiatives, improvements, or campaigns
• Prioritization exercise: what's next
• Resource allocation or request planning
• Committee calendar alignment
• Assign project leads and timelines`,
  description: 'Used for quarterly planning, kickoff meetings, or retrospectives.'
}, {
  id: 'governance-update',
  emoji: '🟥',
  name: 'Standard Quarterly Governance Update',
  committees: ['Governing Board'],
  cadence: 'Quarterly',
  agenda: `• Review and approval of previous meeting minutes
• Financial and budget update
• Membership changes and engagement metrics
• Program updates (e.g., DEI, security initiatives)
• Project lifecycle status (graduations, incubations)
• Governance or charter changes
• Open floor for board member input`,
  description: 'A recurring template for regular board business.'
}, {
  id: 'strategic-planning',
  emoji: '🟧',
  name: 'Strategic Planning Session',
  committees: ['Governing Board', 'Core Team'],
  cadence: 'Semi-Annual or Annual',
  agenda: `• Welcome and meeting objectives
• Review of foundation-wide metrics and trends
• Strategic goals for the next 12–18 months
• Partnership, ecosystem, or marketing opportunities
• Discussion of commercial adoption and impact
• SWOT or gap analysis across projects
• Action items and next steps`,
  description: 'Ideal for annual or semi-annual strategy-focused meetings.'
}, {
  id: 'crisis-board-meeting',
  emoji: '🚨',
  name: 'Crisis or Special-Topic Board Meeting',
  committees: ['Governing Board'],
  cadence: 'As Needed',
  agenda: `• Purpose and context of the emergency meeting
• Legal or compliance updates (if applicable)
• Project/community concerns or escalations
• Board response and decision framework
• Communication plan (internal/external)
• Vote (if necessary)
• Follow-up plan and ownership`,
  description: 'For reactive or urgent meetings triggered by events.'
}, {
  id: 'project-oversight',
  emoji: '🟦',
  name: 'Monthly Project Oversight Meeting',
  committees: ['Technical Steering Committee', 'Core Team'],
  cadence: 'Monthly',
  agenda: `• Review of previous meeting minutes and open action items
• Project roadmap updates and upcoming milestones
• PRs/issues requiring TSC discussion or escalation
• Maintainer updates and team bandwidth
• New contributor onboarding or role nominations
• Community engagement / events / feedback
• Open discussion and Q&A
• Confirm next meeting and action owners`,
  description: 'For steady-state project leadership and decision-making.'
}, {
  id: 'release-coordination',
  emoji: '🟪',
  name: 'Release Coordination & Technical Planning',
  committees: ['Technical Steering Committee', 'Documentation Team'],
  cadence: 'Around Major/Minor Releases',
  agenda: `• Target release timeline and scope
• Feature freeze status and outstanding work
• Risk or blocker review (test coverage, regressions, etc.)
• Documentation, tooling, or infra readiness
• Post-release responsibilities and follow-up
• Community communication plan
• Lessons learned (for retrospective if post-release)`,
  description: 'Ideal around major/minor version planning or post-mortem reviews.'
}, {
  id: 'design-proposal',
  emoji: '🟫',
  name: 'Design Proposal & Architectural Review',
  committees: ['Technical Steering Committee'],
  cadence: 'Monthly',
  agenda: `• Recap of design proposals received (link to docs)
• Presenter walkthrough(s) of new proposals or RFCs
• Q&A and discussion from TSC members
• Vote or consensus-building on key proposals
• Compatibility or migration concerns
• Next steps (refinements, pilot, or approval)
• Assign follow-up reviewers or implementation owners`,
  description: 'For deep technical discussion and stakeholder alignment.'
}, {
  id: 'security-sync',
  emoji: '🔐',
  name: 'Monthly Security Sync',
  committees: ['Security Working Group'],
  cadence: 'Monthly',
  agenda: `• Review of open security issues, PRs, and disclosures
• Updates on in-progress security audits or tooling
• Review of threat modeling progress or backlog
• Community-reported vulnerabilities (if any)
• Upcoming security events or CFPs
• Maintainer/triage rotations or role changes
• Action items and owner confirmations`,
  description: 'For regular coordination, updates, and incident readiness.'
}, {
  id: 'vulnerability-response',
  emoji: '🚨',
  name: 'Vulnerability Response Coordination',
  committees: ['Security Working Group'],
  cadence: 'As Needed',
  agenda: `• Timeline of the vulnerability or incident
• Status of investigation, patches, or mitigations
• Responsible disclosure coordination (CNA, CERT, etc.)
• Communication plan: internal + public statements
• Patch validation and version tagging
• Release planning and embargo timeline
• Retrospective scheduling and action items`,
  description: 'Triggered by active CVEs, disclosures, or incident response.'
}, {
  id: 'security-policy',
  emoji: '🧾',
  name: 'Security Policy & Standards Review',
  committees: ['Security Working Group'],
  cadence: 'Quarterly',
  agenda: `• Review of current security.md and disclosure policy
• Alignment on supported threat models and security baselines
• Proposal: new security tools or dependency scanning
• Updates to contributor or maintainer security practices
• SIG/storefronts: Is documentation clear and up to date?
• Coordination with CNCF/LF Security initiatives
• Assign leads for implementation and follow-up`,
  description: 'Used to align the group on security posture and long-term policy.'
}];
export const ScheduleMeetingModal = ({
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // Form data for manual meeting creation
  const [manualFormData, setManualFormData] = useState({
    meetingName: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'UTC',
    project: 'Kubernetes',
    committee: '',
    participants: [],
    recurrenceType: 'none',
    weeklyInterval: '1',
    weeklyDays: [],
    monthlyDay: '1',
    monthlyWeekOccurrence: 'first',
    monthlyWeekDay: 'monday'
  });
  // Form data for template meeting creation
  const [templateFormData, setTemplateFormData] = useState({
    template: '',
    date: '',
    startTime: '',
    project: 'Kubernetes',
    participants: [],
    recurrenceType: 'none',
    weeklyInterval: '1',
    weeklyDays: [],
    monthlyDay: '1',
    monthlyWeekOccurrence: 'first',
    monthlyWeekDay: 'monday'
  });
  // Filter templates based on selected project
  const getFilteredTemplates = () => {
    // Filter templates based on project-specific committees
    if (templateFormData.project === 'Kubernetes') {
      // For Kubernetes, filter for Technical Steering Committee
      return meetingTemplates.filter(template => template.committees.some(committee => committee.includes('Technical Steering Committee') || committee.includes('TSC')));
    } else if (templateFormData.project === 'PyTorch') {
      // For PyTorch, filter for Governing Board
      return meetingTemplates.filter(template => template.committees.some(committee => committee.includes('Governing Board')));
    }
    return [];
  };
  const filteredTemplates = getFilteredTemplates();
  // Validate first step
  useEffect(() => {
    if (activeTab === 'manual') {
      const hasMeetingName = manualFormData.meetingName.trim() !== '';
      setIsFirstStepValid(hasMeetingName);
    } else {
      setIsFirstStepValid(!!selectedTemplate);
    }
  }, [manualFormData.meetingName, selectedTemplate, activeTab]);
  // Reset selected template when project changes
  useEffect(() => {
    if (activeTab === 'template') {
      setSelectedTemplate(null);
    }
  }, [templateFormData.project, activeTab]);
  // Handle input changes
  const handleInputChange = e => {
    const {
      id,
      value
    } = e.target;
    if (activeTab === 'manual') {
      setManualFormData(prev => ({
        ...prev,
        [id]: value
      }));
    } else {
      setTemplateFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };
  // Handle day of week toggle for weekly recurrence
  const handleDayOfWeekToggle = day => {
    if (activeTab === 'manual') {
      setManualFormData(prev => {
        if (prev.weeklyDays.includes(day)) {
          return {
            ...prev,
            weeklyDays: prev.weeklyDays.filter(d => d !== day)
          };
        } else {
          return {
            ...prev,
            weeklyDays: [...prev.weeklyDays, day]
          };
        }
      });
    } else {
      setTemplateFormData(prev => {
        if (prev.weeklyDays.includes(day)) {
          return {
            ...prev,
            weeklyDays: prev.weeklyDays.filter(d => d !== day)
          };
        } else {
          return {
            ...prev,
            weeklyDays: [...prev.weeklyDays, day]
          };
        }
      });
    }
  };
  const toggleTemplateExpansion = (templateId, e) => {
    e.stopPropagation();
    if (expandedTemplate === templateId) {
      setExpandedTemplate(null);
    } else {
      setExpandedTemplate(templateId);
    }
  };
  const selectTemplate = templateId => {
    setSelectedTemplate(templateId);
  };
  // Navigation functions
  const handleNext = () => {
    if (activeStep < getSteps().length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      onClose('create');
    }
  };
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const handleStepClick = stepId => {
    setActiveStep(stepId);
  };
  // Get steps based on active tab
  const getSteps = () => {
    if (activeTab === 'manual') {
      return [{
        id: 0,
        title: 'Meeting Details',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <label htmlFor="meetingName" className="flex items-center text-sm font-medium text-slate-700 mb-1">
                  Meeting Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="text" id="meetingName" value={manualFormData.meetingName} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter meeting name" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea id="description" rows={3} value={manualFormData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter meeting description"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-1">
                    Project
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select id="project" value={manualFormData.project} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500">
                    <option value="Kubernetes">Kubernetes</option>
                    <option value="PyTorch">PyTorch</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="committee" className="block text-sm font-medium text-slate-700 mb-1">
                    Committee
                  </label>
                  <select id="committee" value={manualFormData.committee} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500">
                    <option value="">Select a committee</option>
                    {manualFormData.project === 'Kubernetes' ? <>
                        <option value="Technical Steering Committee">
                          Technical Steering Committee
                        </option>
                        <option value="Security Working Group">
                          Security Working Group
                        </option>
                      </> : manualFormData.project === 'PyTorch' ? <>
                        <option value="Governing Board">Governing Board</option>
                        <option value="Documentation Team">
                          Documentation Team
                        </option>
                      </> : null}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="date" id="date" value={manualFormData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="time" id="startTime" value={manualFormData.startTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">
                    End Time
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="time" id="endTime" value={manualFormData.endTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 mb-1">
                    Timezone
                  </label>
                  <select id="timezone" value={manualFormData.timezone} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500">
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                  </select>
                </div>
              </div>
              {/* Recurrence Options - Added */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Recurrence
                </label>
                {/* None Option */}
                <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
                  <div className="flex items-center h-5">
                    <input type="radio" id="recurrence-none" name="recurrenceType" value="none" checked={manualFormData.recurrenceType === 'none'} onChange={() => setManualFormData(prev => ({
                  ...prev,
                  recurrenceType: 'none'
                }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="recurrence-none" className="block text-sm font-medium text-slate-700">
                      None
                    </label>
                    <p className="text-xs text-slate-500 mt-1">
                      This is a one-time meeting that won't repeat.
                    </p>
                  </div>
                </div>
                {/* Weekly Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="recurrence-weekly" name="recurrenceType" value="weekly" checked={manualFormData.recurrenceType === 'weekly'} onChange={() => setManualFormData(prev => ({
                    ...prev,
                    recurrenceType: 'weekly'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="recurrence-weekly" className="block text-sm font-medium text-slate-700">
                        Weekly
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on a weekly schedule. You can select which days
                        of the week and how often it repeats.
                      </p>
                    </div>
                  </div>
                  {manualFormData.recurrenceType === 'weekly' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="space-y-3 ml-7">
                        <div className="flex items-center flex-wrap">
                          <span className="text-sm text-slate-700 mr-2">
                            Repeats every
                          </span>
                          <div className="relative w-16">
                            <select id="weeklyInterval" value={manualFormData.weeklyInterval} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700 ml-2">
                            week(s) on:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(day => <label key={day} className="flex items-center bg-white px-3 py-1.5 rounded border border-slate-200 hover:border-slate-300">
                              <input type="checkbox" checked={manualFormData.weeklyDays.includes(day)} onChange={() => handleDayOfWeekToggle(day)} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded mr-2" />
                              <span className="text-sm text-slate-700">
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </span>
                            </label>)}
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Monthly by Day Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="recurrence-monthly-by-day" name="recurrenceType" value="monthlyByDay" checked={manualFormData.recurrenceType === 'monthlyByDay'} onChange={() => setManualFormData(prev => ({
                    ...prev,
                    recurrenceType: 'monthlyByDay'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="recurrence-monthly-by-day" className="block text-sm font-medium text-slate-700">
                        Monthly (by date)
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on the same date each month (e.g., the 15th of
                        every month).
                      </p>
                    </div>
                  </div>
                  {manualFormData.recurrenceType === 'monthlyByDay' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="ml-7">
                        <div className="flex items-center flex-wrap">
                          <span className="text-sm text-slate-700 mr-2">
                            Repeats on day
                          </span>
                          <div className="relative w-16">
                            <select id="monthlyDay" value={manualFormData.monthlyDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              {Array.from({
                          length: 31
                        }, (_, i) => i + 1).map(day => <option key={day} value={day}>
                                  {day}
                                </option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700 ml-2">
                            of every month
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Monthly by Week Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="recurrence-monthly-by-week" name="recurrenceType" value="monthlyByWeek" checked={manualFormData.recurrenceType === 'monthlyByWeek'} onChange={() => setManualFormData(prev => ({
                    ...prev,
                    recurrenceType: 'monthlyByWeek'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="recurrence-monthly-by-week" className="block text-sm font-medium text-slate-700">
                        Monthly (by day of week)
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on a specific day of the week each month (e.g.,
                        first Monday of every month).
                      </p>
                    </div>
                  </div>
                  {manualFormData.recurrenceType === 'monthlyByWeek' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="ml-7">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-sm text-slate-700">
                            Repeats on the
                          </span>
                          <div className="relative w-24">
                            <select id="monthlyWeekOccurrence" value={manualFormData.monthlyWeekOccurrence} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="first">first</option>
                              <option value="second">second</option>
                              <option value="third">third</option>
                              <option value="fourth">fourth</option>
                              <option value="last">last</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <div className="relative w-32">
                            <select id="monthlyWeekDay" value={manualFormData.monthlyWeekDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="sunday">Sunday</option>
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thursday</option>
                              <option value="friday">Friday</option>
                              <option value="saturday">Saturday</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700">
                            of every month
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Yearly Option */}
                <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
                  <div className="flex items-center h-5">
                    <input type="radio" id="recurrence-yearly" name="recurrenceType" value="yearly" checked={manualFormData.recurrenceType === 'yearly'} onChange={() => setManualFormData(prev => ({
                  ...prev,
                  recurrenceType: 'yearly'
                }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="recurrence-yearly" className="block text-sm font-medium text-slate-700">
                      Yearly
                    </label>
                    <p className="text-xs text-slate-500 mt-1">
                      Repeats the same day and week of the year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      }, {
        id: 1,
        title: 'Participants',
        icon: <UsersIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Add Participants
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Invite people to your meeting.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-slate-700 mb-1">
                    Participants
                  </label>
                  <div className="border border-slate-300 rounded-md p-4 min-h-[100px]">
                    <p className="text-sm text-slate-500">
                      Search and select participants to add them to the meeting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      }, {
        id: 2,
        title: 'Agenda',
        icon: <FileTextIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Meeting Agenda
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Create an agenda for your meeting.
                </p>
              </div>
              <div>
                <label htmlFor="agenda" className="block text-sm font-medium text-slate-700 mb-1">
                  Agenda
                </label>
                <textarea id="agenda" rows={10} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="## Agenda Items&#10;&#10;### 1. Introduction (5 min)&#10;- Welcome participants&#10;- Review previous meeting minutes&#10;&#10;### 2. Project Updates (15 min)&#10;- Status updates&#10;- Blockers and issues&#10;&#10;### 3. Discussion Topics (20 min)&#10;- Topic 1&#10;- Topic 2&#10;&#10;### 4. Action Items (10 min)&#10;- Assign tasks&#10;- Set deadlines"></textarea>
              </div>
            </div>
      }, {
        id: 3,
        title: 'Settings',
        icon: <SettingsIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Meeting Settings
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Configure additional options for your meeting.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700">
                      Record Meeting
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Automatically record this meeting
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="recordMeeting" className="sr-only peer" checked={true} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700">
                      Allow Joining Before Host
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Let participants join before the host arrives
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="allowJoiningBeforeHost" className="sr-only peer" checked={true} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700">
                      Mute Participants on Entry
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Automatically mute participants when they join
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="muteParticipantsOnEntry" className="sr-only peer" checked={true} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-azure-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azure-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
      }];
    } else {
      // Template-based meeting steps
      return [{
        id: 0,
        title: 'Select Template',
        icon: <FileTextIcon className="h-5 w-5" />,
        fields: <div className="space-y-4">
              <div className="mb-6">
                <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-1">
                  Project
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select id="project" value={templateFormData.project} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500">
                  <option value="Kubernetes">Kubernetes</option>
                  <option value="PyTorch">PyTorch</option>
                </select>
              </div>
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Choose a meeting template to get started
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  {templateFormData.project === 'Kubernetes' ? <>
                      Select a template for{' '}
                      <strong>Kubernetes Technical Steering Committee</strong>{' '}
                      meetings.
                    </> : <>
                      Select a template for{' '}
                      <strong>PyTorch Governing Board</strong> meetings.
                    </>}
                </p>
              </div>
              <div className="space-y-2">
                {filteredTemplates.length > 0 ? filteredTemplates.map(template => <div key={template.id} className="border border-slate-200 rounded-md overflow-hidden">
                      <div className={`flex items-start p-4 cursor-pointer ${selectedTemplate === template.id ? 'bg-azure-50 border-azure-200' : 'bg-white hover:bg-slate-50'}`} onClick={() => selectTemplate(template.id)}>
                        <div className="flex-shrink-0 text-2xl mr-3">
                          {template.emoji}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h5 className="text-base font-medium text-slate-800">
                              {template.name}
                            </h5>
                            <button className="ml-2 text-slate-400 hover:text-slate-600 p-1" onClick={e => toggleTemplateExpansion(template.id, e)}>
                              {expandedTemplate === template.id ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            {template.description}
                          </p>
                          {/* Date, Cadence, Committees Row */}
                          <div className="flex items-center mt-3 text-xs text-slate-600">
                            <div className="flex items-center mr-4">
                              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                {template.cadence}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <UsersIcon className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {templateFormData.project === 'Kubernetes' ? 'Technical Steering Committee' : templateFormData.project === 'PyTorch' ? 'Governing Board' : template.committees.length > 2 ? `${template.committees[0]}, ${template.committees[1]}, +${template.committees.length - 2}` : template.committees.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-center h-full">
                          <div className={`w-5 h-5 rounded-full border ${selectedTemplate === template.id ? 'border-azure-500 bg-azure-500' : 'border-slate-300'} flex items-center justify-center`}>
                            {selectedTemplate === template.id && <CheckIcon className="h-3 w-3 text-white" />}
                          </div>
                        </div>
                      </div>
                      {expandedTemplate === template.id && <div className="p-4 bg-slate-50 border-t border-slate-200">
                          <h6 className="text-sm font-medium text-slate-700 mb-2">
                            Suggested Agenda
                          </h6>
                          <div className="text-sm text-slate-600 whitespace-pre-line">
                            {template.agenda}
                          </div>
                        </div>}
                    </div>) : <div className="p-4 border border-slate-200 rounded-md text-center">
                    <p className="text-sm text-slate-500">
                      No templates available for the selected project and
                      committee.
                    </p>
                  </div>}
              </div>
            </div>
      }, {
        id: 1,
        title: 'Schedule',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Schedule Meeting
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Select a date and time for your meeting.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="date" id="date" value={templateFormData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">
                    Start Time
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="time" id="startTime" value={templateFormData.startTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
                </div>
              </div>
              {/* Recurrence Options - Added */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Recurrence
                </label>
                {/* None Option */}
                <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
                  <div className="flex items-center h-5">
                    <input type="radio" id="template-recurrence-none" name="templateRecurrenceType" value="none" checked={templateFormData.recurrenceType === 'none'} onChange={() => setTemplateFormData(prev => ({
                  ...prev,
                  recurrenceType: 'none'
                }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="template-recurrence-none" className="block text-sm font-medium text-slate-700">
                      None
                    </label>
                    <p className="text-xs text-slate-500 mt-1">
                      This is a one-time meeting that won't repeat.
                    </p>
                  </div>
                </div>
                {/* Weekly Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="template-recurrence-weekly" name="templateRecurrenceType" value="weekly" checked={templateFormData.recurrenceType === 'weekly'} onChange={() => setTemplateFormData(prev => ({
                    ...prev,
                    recurrenceType: 'weekly'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="template-recurrence-weekly" className="block text-sm font-medium text-slate-700">
                        Weekly
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on a weekly schedule. You can select which days
                        of the week and how often it repeats.
                      </p>
                    </div>
                  </div>
                  {templateFormData.recurrenceType === 'weekly' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="space-y-3 ml-7">
                        <div className="flex items-center flex-wrap">
                          <span className="text-sm text-slate-700 mr-2">
                            Repeats every
                          </span>
                          <div className="relative w-16">
                            <select id="weeklyInterval" value={templateFormData.weeklyInterval} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700 ml-2">
                            week(s) on:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(day => <label key={day} className="flex items-center bg-white px-3 py-1.5 rounded border border-slate-200 hover:border-slate-300">
                              <input type="checkbox" checked={templateFormData.weeklyDays.includes(day)} onChange={() => handleDayOfWeekToggle(day)} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300 rounded mr-2" />
                              <span className="text-sm text-slate-700">
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </span>
                            </label>)}
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Monthly by Day Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="template-recurrence-monthly-by-day" name="templateRecurrenceType" value="monthlyByDay" checked={templateFormData.recurrenceType === 'monthlyByDay'} onChange={() => setTemplateFormData(prev => ({
                    ...prev,
                    recurrenceType: 'monthlyByDay'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="template-recurrence-monthly-by-day" className="block text-sm font-medium text-slate-700">
                        Monthly (by date)
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on the same date each month (e.g., the 15th of
                        every month).
                      </p>
                    </div>
                  </div>
                  {templateFormData.recurrenceType === 'monthlyByDay' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="ml-7">
                        <div className="flex items-center flex-wrap">
                          <span className="text-sm text-slate-700 mr-2">
                            Repeats on day
                          </span>
                          <div className="relative w-16">
                            <select id="monthlyDay" value={templateFormData.monthlyDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              {Array.from({
                          length: 31
                        }, (_, i) => i + 1).map(day => <option key={day} value={day}>
                                  {day}
                                </option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700 ml-2">
                            of every month
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Monthly by Week Option */}
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <div className="flex items-start p-3 hover:bg-slate-50">
                    <div className="flex items-center h-5">
                      <input type="radio" id="template-recurrence-monthly-by-week" name="templateRecurrenceType" value="monthlyByWeek" checked={templateFormData.recurrenceType === 'monthlyByWeek'} onChange={() => setTemplateFormData(prev => ({
                    ...prev,
                    recurrenceType: 'monthlyByWeek'
                  }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="template-recurrence-monthly-by-week" className="block text-sm font-medium text-slate-700">
                        Monthly (by day of week)
                      </label>
                      <p className="text-xs text-slate-500 mt-1">
                        Repeats on a specific day of the week each month (e.g.,
                        first Monday of every month).
                      </p>
                    </div>
                  </div>
                  {templateFormData.recurrenceType === 'monthlyByWeek' && <div className="bg-slate-50 p-3 border-t border-slate-200">
                      <div className="ml-7">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-sm text-slate-700">
                            Repeats on the
                          </span>
                          <div className="relative w-24">
                            <select id="monthlyWeekOccurrence" value={templateFormData.monthlyWeekOccurrence} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="first">first</option>
                              <option value="second">second</option>
                              <option value="third">third</option>
                              <option value="fourth">fourth</option>
                              <option value="last">last</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <div className="relative w-32">
                            <select id="monthlyWeekDay" value={templateFormData.monthlyWeekDay} onChange={handleInputChange} className="w-full px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500 appearance-none pr-6 text-sm">
                              <option value="sunday">Sunday</option>
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thursday</option>
                              <option value="friday">Friday</option>
                              <option value="saturday">Saturday</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          </div>
                          <span className="text-sm text-slate-700">
                            of every month
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                {/* Yearly Option */}
                <div className="flex items-start p-3 border border-slate-200 rounded-md hover:bg-slate-50">
                  <div className="flex items-center h-5">
                    <input type="radio" id="template-recurrence-yearly" name="templateRecurrenceType" value="yearly" checked={templateFormData.recurrenceType === 'yearly'} onChange={() => setTemplateFormData(prev => ({
                  ...prev,
                  recurrenceType: 'yearly'
                }))} className="h-4 w-4 text-azure-500 focus:ring-azure-500 border-slate-300" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="template-recurrence-yearly" className="block text-sm font-medium text-slate-700">
                      Yearly
                    </label>
                    <p className="text-xs text-slate-500 mt-1">
                      Repeats the same day and week of the year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      }, {
        id: 2,
        title: 'Participants',
        icon: <UsersIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Participants
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Manage participants for this meeting.
                </p>
              </div>
              <div className="p-4 bg-azure-50 border border-azure-200 rounded-md">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-azure-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Default participants will be added
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      All members of the selected committee will be
                      automatically invited
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="additionalParticipants" className="block text-sm font-medium text-slate-700 mb-1">
                    Additional Participants
                  </label>
                  <div className="border border-slate-300 rounded-md p-4 min-h-[100px]">
                    <p className="text-sm text-slate-500">
                      Search and select additional participants to add them to
                      the meeting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      }, {
        id: 3,
        title: 'Review',
        icon: <FileTextIcon className="h-5 w-5" />,
        fields: <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-slate-800 mb-2">
                  Review Meeting Details
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Review the details of your meeting before scheduling.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-md">
                  <h5 className="text-sm font-medium text-slate-700 mb-3">
                    Meeting Details
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Project:</span>
                      <span className="text-sm text-slate-700">
                        {templateFormData.project || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Template:</span>
                      <span className="text-sm text-slate-700">
                        {selectedTemplate ? meetingTemplates.find(t => t.id === selectedTemplate)?.name : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Date:</span>
                      <span className="text-sm text-slate-700">
                        {templateFormData.date || 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Time:</span>
                      <span className="text-sm text-slate-700">
                        {templateFormData.startTime ? `${templateFormData.startTime} UTC` : 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Recurrence:
                      </span>
                      <span className="text-sm text-slate-700">
                        {templateFormData.recurrenceType === 'none' ? 'One-time meeting' : templateFormData.recurrenceType === 'weekly' ? 'Weekly' : templateFormData.recurrenceType === 'monthlyByDay' ? 'Monthly (by date)' : templateFormData.recurrenceType === 'monthlyByWeek' ? 'Monthly (by day of week)' : 'Yearly'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-md">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        Ready to Schedule
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Your meeting is ready to be scheduled. Click "Schedule
                        Meeting" to continue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      }];
    }
  };
  const steps = getSteps();
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-slate-900">
            Schedule Meeting
          </h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Tabs */}
        <div>
          <div className="flex">
            <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'manual' ? 'border-b-2 border-azure-500 text-azure-600' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => {
            setActiveTab('manual');
            setActiveStep(0);
          }}>
              Schedule from Scratch
            </button>
            <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'template' ? 'border-b-2 border-azure-500 text-azure-600' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => {
            setActiveTab('template');
            setActiveStep(0);
          }}>
              Schedule from Template
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Steps sidebar */}
          <div className="w-72 bg-slate-50 p-6 overflow-y-auto">
            <div className="space-y-4">
              {steps.map(step => <button key={step.id} className={`flex items-center w-full p-3 rounded-md text-left ${activeStep === step.id ? 'bg-azure-50 text-azure-700' : 'hover:bg-slate-100 text-slate-700'}`} onClick={() => handleStepClick(step.id)}>
                  <div className="flex items-center justify-center mr-3">
                    {activeStep > step.id ? <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> : activeStep === step.id ? <div className="h-5 w-5 rounded-full bg-azure-500 text-white flex items-center justify-center text-xs">
                        {step.id + 1}
                      </div> : <div className="h-5 w-5 rounded-full border border-slate-300 text-slate-500 flex items-center justify-center text-xs">
                        {step.id + 1}
                      </div>}
                  </div>
                  <div className="flex items-center flex-nowrap">
                    <span className="mr-2">{step.icon}</span>
                    <span className="font-medium text-sm whitespace-nowrap">
                      {step.title}
                    </span>
                  </div>
                </button>)}
            </div>
          </div>
          {/* Form content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto h-[600px] overflow-y-auto pr-4">
              {steps[activeStep].fields}
            </div>
          </div>
        </div>
        {/* Footer with actions */}
        <div className="p-6 flex justify-between">
          <button className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium" onClick={activeStep === 0 ? onClose : handlePrevious}>
            {activeStep === 0 ? 'Cancel' : 'Previous'}
          </button>
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${activeStep === 0 && !isFirstStepValid ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-azure-500 text-white hover:bg-azure-600'}`} onClick={activeStep === steps.length - 1 ? () => onClose('create') : handleNext} disabled={activeStep === 0 && !isFirstStepValid}>
            {activeStep === steps.length - 1 ? 'Schedule Meeting' : 'Next'}
          </button>
        </div>
      </div>
    </div>;
};