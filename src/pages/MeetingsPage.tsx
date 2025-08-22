import React, { useState } from 'react';
import { MeetingsSidebar } from '../components/meetings/MeetingsSidebar';
import { MeetingsList } from '../components/meetings/MeetingsList';
import { MeetingsCalendar } from '../components/meetings/MeetingsCalendar';
import { VideoIcon, ListIcon, CalendarIcon, ExternalLinkIcon, CalendarDaysIcon, CheckCircle as CheckCircleIcon, AlertTriangle as AlertTriangleIcon, X as CloseIcon } from 'lucide-react';
import { CreateMeetingModal } from '../components/meetings/CreateMeetingModal';
import { CreateMeetingTemplateModal } from '../components/meetings/CreateMeetingTemplateModal';
export const MeetingsPage = () => {
  const [activeView, setActiveView] = useState('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'upcoming',
    committee: 'All committees',
    recurring: 'All meetings'
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    variant: 'success'
  });
  // Handle filter changes from the sidebar
  const handleFilterChange = filterUpdate => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterUpdate.type]: filterUpdate.value
    }));
  };
  // Sample meetings data - in a real app, this would likely come from a parent component or API
  const meetings = [
  // New LFX Projects Community Feedback meeting - Updated date from Sep 5 to Aug 29
  {
    id: 11,
    title: 'LFX Projects Community Feedback',
    frequency: 'Monthly',
    date: 'Fri, Aug 29',
    startTime: '3:00 PM',
    endTime: '4:00 PM',
    timeZone: 'UTC',
    group: 'LFX Projects Community',
    agenda: [{
      title: 'LFX Projects Community Feedback',
      hasDocument: true,
      content: `## LFX Projects Community Feedback
### Open call for LFX Projects users to offer feedback on the product. This is the main forum for the LFX Projects team to prepare future releases of the product.`
    }],
    attendees: {
      total: 4672,
      accepted: 82,
      declined: 502,
      tentative: 1217,
      people: [{
        name: 'LFX Projects Team',
        company: 'Linux Foundation',
        rsvpStatus: 'accepted',
        profileImage: null,
        committee: 'LFX Projects Community',
        isOrganizer: true
      }]
    },
    hasWarning: false,
    userRsvp: 'accepted',
    hideAttendees: true // Special flag to hide the attendees section from being expanded
  }, {
    id: 1,
    title: 'Security Working Group Standup',
    frequency: 'Weekly',
    date: 'Wed, Aug 14',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    timeZone: 'UTC',
    group: 'Security Working Group, Technical Steering Committee',
    agenda: [{
      title: 'Agenda - Security Standup',
      hasDocument: true,
      content: `## Security Standup Agenda
### 1. Quick Status Updates (10 min)
- Current vulnerability assessments
- Security patch status
- Incident response updates
### 2. New Security Issues (15 min)
- Recent findings
- Threat assessment
- Mitigation strategies
### 3. Community & Communication (5 min)
- Security announcements
- Community security practices`
    }, {
      title: 'Vulnerability Report Q3',
      hasDocument: true,
      content: null
    }],
    attendees: {
      total: 8,
      accepted: 4,
      declined: 2,
      tentative: 2,
      people: [{
        name: 'Sarah Wilson',
        company: 'Microsoft',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group',
        isOrganizer: true
      }, {
        name: 'Michael Chen',
        company: 'Intel',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'Alex Johnson',
        company: 'Google',
        rsvpStatus: 'accepted',
        profileImage: null,
        committee: 'Security Working Group'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Emma Davis',
        company: 'IBM',
        rsvpStatus: 'declined',
        profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        rsvpStatus: 'declined',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Olivia Brown',
        company: 'Oracle',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
        committee: null
      }, {
        name: 'Noah Garcia',
        company: 'Meta',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
        committee: null
      }]
    },
    hasWarning: false,
    userRsvp: 'accepted'
  }, {
    id: 2,
    title: 'Technical Steering Committee',
    frequency: 'Monthly',
    date: 'Mon, Aug 19',
    startTime: '3:00 PM',
    endTime: '4:30 PM',
    timeZone: 'UTC',
    group: 'Technical Steering Committee',
    agenda: [{
      title: 'TSC Agenda - August 2025',
      hasDocument: true,
      content: `## Meeting Agenda
### 1. Opening & Welcome (5 min)
- Call to order
- Review of agenda
### 2. Technical Updates (20 min)
- Architecture decisions review
- Security updates
- Performance metrics
### 3. Project Updates (15 min)
- Release planning status
- Community contributions
- Documentation updates
### 4. Action Items & Next Steps (5 min)
- Review action items
- Schedule follow-up activities`
    }, {
      title: 'Architecture Decision Records',
      hasDocument: true,
      content: null
    }, {
      title: 'Technical Roadmap Q3-Q4',
      hasDocument: true,
      content: null
    }],
    attendees: {
      total: 12,
      accepted: 0,
      declined: 0,
      tentative: 10,
      people: [{
        name: 'Robert Taylor',
        company: 'VMWare',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
        committee: 'Technical Steering Committee',
        isOrganizer: true
      }, {
        name: 'Lisa Wang',
        company: 'NVIDIA',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Daniel Kim',
        company: 'Samsung',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Jennifer Lopez',
        company: 'Broadcom Inc.',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Sarah Wilson',
        company: 'Microsoft',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Mia Johnson',
        company: 'Hitachi',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Thomas Lee',
        company: 'Huawei',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Sophia Miller',
        company: 'SUSE',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'William Brown',
        company: 'arm',
        rsvpStatus: 'notResponded',
        profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
        committee: null
      }, {
        name: 'Emma Clark',
        company: 'Ericsson',
        rsvpStatus: 'notResponded',
        profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
        committee: null
      }]
    },
    hasWarning: true,
    warningMessage: 'Sarah Wilson has missed the last 4 meetings in this series',
    userRsvp: 'tentative'
  }, {
    id: 3,
    title: 'Community Outreach Planning',
    frequency: 'Monthly',
    date: 'Thu, Aug 22',
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    timeZone: 'UTC',
    group: 'Documentation Team',
    agenda: [],
    attendees: {
      total: 8,
      accepted: 0,
      declined: 0,
      tentative: 5,
      people: [{
        name: 'Rachel Green',
        company: 'ElasticSearch',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/39.jpg',
        committee: 'Documentation Team',
        isOrganizer: true
      }, {
        name: 'Chris Evans',
        company: 'AT&T',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/91.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Zoe Rodriguez',
        company: 'Sentry',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Documentation Team'
      }, {
        name: 'Benjamin Harris',
        company: 'Linaro Limited',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Lily Chen',
        company: 'PANTHEON',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/56.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Marcus Johnson',
        company: 'Isolvalent',
        rsvpStatus: 'notResponded',
        profileImage: null,
        committee: null
      }, {
        name: 'Sophia Williams',
        company: 'Hitachi',
        rsvpStatus: 'notResponded',
        profileImage: 'https://randomuser.me/api/portraits/women/62.jpg',
        committee: null
      }, {
        name: 'Ethan Davis',
        company: 'Oracle',
        rsvpStatus: 'notResponded',
        profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
        committee: null
      }]
    },
    hasWarning: true,
    warningMessage: 'No agenda or attachments for attendees to prepare for this meeting',
    userRsvp: 'declined'
  }, {
    id: 4,
    title: 'Package Maintenance Review',
    frequency: 'Weekly',
    date: 'Mon, Aug 26',
    startTime: '4:30 PM',
    endTime: '5:30 PM',
    timeZone: 'UTC',
    group: 'Technical Steering Committee',
    agenda: [{
      title: 'Q3 Planning Agenda',
      hasDocument: true,
      content: `## Meeting Agenda
### 1. Opening & Welcome (5 min)
- Call to order
- Review of agenda
### 2. Main Discussion Topics (25 min)
- Review recent package updates and plan maintenance activities
- Key updates and decisions needed
### 3. Action Items & Next Steps (5 min)
- Review action items
- Schedule follow-up activities`
    }, {
      title: 'Q2 Retrospective Summary',
      hasDocument: true,
      content: null
    }],
    attendees: {
      total: 6,
      accepted: 0,
      declined: 0,
      tentative: 4,
      people: [{
        name: 'Robert Taylor',
        company: 'VMWare',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
        committee: 'Technical Steering Committee',
        isOrganizer: true
      }, {
        name: 'Daniel Kim',
        company: 'Samsung',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Jennifer Lopez',
        company: 'Broadcom Inc.',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Thomas Lee',
        company: 'Huawei',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Grace Park',
        company: 'Meta',
        rsvpStatus: 'notResponded',
        profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
        committee: null
      }, {
        name: 'Jason Miller',
        company: 'IBM',
        rsvpStatus: 'notResponded',
        profileImage: null,
        committee: null
      }]
    },
    hasWarning: false,
    userRsvp: 'notResponded'
  }, {
    id: 5,
    title: 'Kubernetes Community Call',
    frequency: 'Monthly',
    date: 'Wed, Aug 28',
    startTime: '4:00 PM',
    endTime: '5:00 PM',
    timeZone: 'UTC',
    group: 'Kubernetes Community',
    agenda: [],
    hasAgendaContent: true,
    agendaContent: `## Meeting Agenda
### 1. Opening & Welcome (5 min)
- Call to order
- Review of agenda
### 2. Main Discussion Topics (25 min)
- Monthly community update and Q&A session
- Key updates and decisions needed
### 3. Action Items & Next Steps (5 min)
- Review action items
- Schedule follow-up activities`,
    attendees: {
      total: 25,
      accepted: 0,
      declined: 0,
      tentative: 25,
      people: [{
        name: 'Kubernetes Core Team',
        company: 'Google',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Kubernetes Community',
        isOrganizer: true
      }, {
        name: 'Cloud Native Computing Foundation',
        company: 'Linux Foundation',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Kubernetes Community'
      }, {
        name: '23 other community members',
        company: 'Various Organizations',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: null
      }]
    },
    hasWarning: true,
    warningMessage: 'No attachments for attendees to prepare for this meeting',
    userRsvp: 'accepted'
  },
  // Additional meetings for the calendar view
  {
    id: 6,
    title: 'OpenSSF Security Summit',
    frequency: 'Quarterly',
    date: 'Thu, Sep 5',
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    timeZone: 'UTC',
    group: 'Security Working Group',
    agenda: [],
    attendees: {
      total: 15,
      accepted: 8,
      declined: 2,
      tentative: 5,
      people: [{
        name: 'Sarah Wilson',
        company: 'Microsoft',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group',
        isOrganizer: true
      }, {
        name: 'Michael Chen',
        company: 'Intel',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'Alex Johnson',
        company: 'Google',
        rsvpStatus: 'accepted',
        profileImage: null,
        committee: 'Security Working Group'
      }, {
        name: 'Emma Davis',
        company: 'IBM',
        rsvpStatus: 'declined',
        profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Olivia Brown',
        company: 'Oracle',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
        committee: null
      }, {
        name: 'Noah Garcia',
        company: 'Meta',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
        committee: null
      }, {
        name: 'Sophia Miller',
        company: 'SUSE',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
        committee: null
      }, {
        name: 'Ethan Taylor',
        company: 'Sentry',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/42.jpg',
        committee: null
      }, {
        name: 'Isabella Martinez',
        company: 'Ericsson',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/26.jpg',
        committee: null
      }, {
        name: 'Lucas Rodriguez',
        company: 'AT&T',
        rsvpStatus: 'declined',
        profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
        committee: null
      }, {
        name: 'Mia Johnson',
        company: 'Hitachi',
        rsvpStatus: 'accepted',
        profileImage: null,
        committee: null
      }, {
        name: 'Jackson White',
        company: 'NVIDIA',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/77.jpg',
        committee: null
      }, {
        name: 'Amelia Clark',
        company: 'PANTHEON',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/82.jpg',
        committee: null
      }]
    },
    hasWarning: false,
    userRsvp: 'accepted'
  }, {
    id: 7,
    title: 'CNCF Technical Advisory',
    frequency: 'Monthly',
    date: 'Thu, Sep 12',
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    timeZone: 'UTC',
    group: 'Technical Steering Committee',
    agenda: [],
    attendees: {
      total: 12,
      accepted: 6,
      declined: 1,
      tentative: 5,
      people: [{
        name: 'Robert Taylor',
        company: 'VMWare',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
        committee: 'Technical Steering Committee',
        isOrganizer: true
      }, {
        name: 'Lisa Wang',
        company: 'NVIDIA',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Daniel Kim',
        company: 'Samsung',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Jennifer Lopez',
        company: 'Broadcom Inc.',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Thomas Lee',
        company: 'Huawei',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Sophia Miller',
        company: 'SUSE',
        rsvpStatus: 'declined',
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Andrew Chen',
        company: 'Isolvalent',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/18.jpg',
        committee: null
      }, {
        name: 'Olivia Smith',
        company: 'arm',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/36.jpg',
        committee: null
      }, {
        name: 'William Johnson',
        company: 'Linaro Limited',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
        committee: null
      }, {
        name: 'Emma Davis',
        company: 'IBM',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/24.jpg',
        committee: null
      }]
    },
    hasWarning: false,
    userRsvp: 'tentative'
  }, {
    id: 8,
    title: 'Documentation Sprint',
    frequency: 'Monthly',
    date: 'Fri, Sep 20',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    timeZone: 'UTC',
    group: 'Documentation Team',
    agenda: [],
    attendees: {
      total: 8,
      accepted: 5,
      declined: 0,
      tentative: 3,
      people: [{
        name: 'Rachel Green',
        company: 'ElasticSearch',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/39.jpg',
        committee: 'Documentation Team',
        isOrganizer: true
      }, {
        name: 'Chris Evans',
        company: 'AT&T',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/91.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Zoe Rodriguez',
        company: 'Sentry',
        rsvpStatus: 'tentative',
        profileImage: null,
        committee: 'Documentation Team'
      }, {
        name: 'Benjamin Harris',
        company: 'Linaro Limited',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Lily Chen',
        company: 'PANTHEON',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/women/56.jpg',
        committee: 'Documentation Team'
      }, {
        name: 'Marcus Johnson',
        company: 'Isolvalent',
        rsvpStatus: 'accepted',
        profileImage: null,
        committee: null
      }, {
        name: 'Sophia Williams',
        company: 'Hitachi',
        rsvpStatus: 'accepted',
        profileImage: 'https://randomuser.me/api/portraits/women/62.jpg',
        committee: null
      }, {
        name: 'Ethan Davis',
        company: 'Oracle',
        rsvpStatus: 'tentative',
        profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
        committee: null
      }]
    },
    hasWarning: false,
    userRsvp: 'accepted'
  },
  // Past meetings
  {
    id: 9,
    title: 'Past Security Working Group',
    frequency: 'Weekly',
    date: 'Wed, Jul 24',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    timeZone: 'UTC',
    group: 'Security Working Group',
    isPast: true,
    agenda: [{
      title: 'Agenda - Security Standup',
      hasDocument: true,
      content: `## Security Standup Agenda
### 1. Quick Status Updates (10 min)
- Current vulnerability assessments
- Security patch status
- Incident response updates
### 2. New Security Issues (15 min)
- Recent findings
- Threat assessment
- Mitigation strategies
### 3. Community & Communication (5 min)
- Security announcements
- Community security practices`
    }],
    attendees: {
      total: 8,
      accepted: 5,
      declined: 3,
      people: [{
        name: 'Sarah Wilson',
        company: 'Microsoft',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group',
        isOrganizer: true
      }, {
        name: 'Michael Chen',
        company: 'Intel',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'Alex Johnson',
        company: 'Google',
        attended: true,
        profileImage: null,
        committee: 'Security Working Group'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Emma Davis',
        company: 'IBM',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        attended: false,
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Olivia Brown',
        company: 'Oracle',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
        committee: null
      }, {
        name: 'Noah Garcia',
        company: 'Meta',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/men/55.jpg',
        committee: null
      }]
    },
    uninvitedAttendees: [{
      name: 'Ryan Thompson',
      company: 'Samsung',
      profileImage: 'https://randomuser.me/api/portraits/men/83.jpg'
    }, {
      name: 'Jessica Parker',
      company: 'NVIDIA',
      profileImage: 'https://randomuser.me/api/portraits/women/51.jpg'
    }],
    hasWarning: false
  }, {
    id: 10,
    title: 'Past Technical Steering Committee',
    frequency: 'Monthly',
    date: 'Mon, Jul 29',
    startTime: '3:00 PM',
    endTime: '4:30 PM',
    timeZone: 'UTC',
    group: 'Technical Steering Committee',
    isPast: true,
    poorlyAttended: true,
    agenda: [{
      title: 'TSC Agenda - July 2025',
      hasDocument: true,
      content: null
    }],
    attendees: {
      total: 12,
      accepted: 4,
      declined: 8,
      people: [{
        name: 'Robert Taylor',
        company: 'VMWare',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
        committee: 'Technical Steering Committee',
        isOrganizer: true
      }, {
        name: 'Lisa Wang',
        company: 'NVIDIA',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/women/79.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Daniel Kim',
        company: 'Samsung',
        attended: false,
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Jennifer Lopez',
        company: 'Broadcom Inc.',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Sarah Wilson',
        company: 'Microsoft',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        committee: 'Security Working Group'
      }, {
        name: 'David Martinez',
        company: 'Red Hat',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'James Wilson',
        company: 'Cisco',
        attended: false,
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'Mia Johnson',
        company: 'Hitachi',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Thomas Lee',
        company: 'Huawei',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
        committee: 'Technical Steering Committee'
      }, {
        name: 'Sophia Miller',
        company: 'SUSE',
        attended: false,
        profileImage: null,
        committee: 'Technical Steering Committee'
      }, {
        name: 'William Brown',
        company: 'arm',
        attended: true,
        profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
        committee: null
      }, {
        name: 'Emma Clark',
        company: 'Ericsson',
        attended: false,
        profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
        committee: null
      }]
    },
    uninvitedAttendees: [{
      name: 'Marco Rossi',
      company: 'Linaro Limited',
      profileImage: 'https://randomuser.me/api/portraits/men/61.jpg'
    }],
    hasWarning: true
  }];
  const showSuccessToast = message => {
    setToast({
      isVisible: true,
      message,
      variant: 'success'
    });
    // Auto-hide the toast after 5 seconds
    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false
      }));
    }, 5000);
  };
  const handleModalClose = modalType => {
    if (modalType === 'create') {
      setShowCreateModal(false);
      showSuccessToast('Meeting scheduled successfully! Invitations have been sent to all participants.');
    } else if (modalType === 'template') {
      setShowCreateTemplateModal(false);
      showSuccessToast('Meeting scheduled successfully from template! Invitations have been sent to all participants.');
    }
  };
  return <main className="flex-1 p-6 w-full bg-slate-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header with Title and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 style={{
            fontFamily: '"Roboto Slab", serif',
            fontOpticalSizing: 'auto',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '32px'
          }} className="text-slate-900">
              Meetings
            </h1>
          </div>
          <div className="flex items-center mt-4 sm:mt-0 space-x-3">
            {/* Secondary Button - Schedule Meeting from Scratch */}
            <button className="flex items-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm transition-colors" onClick={() => setShowCreateModal(true)}>
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Schedule Meeting from Scratch
            </button>
            {/* Primary Button - Schedule Meeting from Template */}
            <button className="flex items-center bg-azure-500 hover:bg-azure-600 text-white px-4 py-2 rounded-md text-sm transition-colors" onClick={() => setShowCreateTemplateModal(true)}>
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Schedule Meeting from Template
            </button>
          </div>
        </div>
        {/* View Tabs - Moved to its own row above the content */}
        <div className="flex justify-end mb-6">
          <div className="flex border border-slate-200 rounded-md overflow-hidden w-fit">
            <button className={`flex items-center px-3 py-1.5 text-sm ${activeView === 'list' ? 'bg-azure-50 text-azure-600' : 'hover:bg-slate-50'}`} onClick={() => setActiveView('list')}>
              <ListIcon className="h-4 w-4 mr-1.5" />
              <span>List</span>
            </button>
            <button className={`flex items-center px-3 py-1.5 text-sm ${activeView === 'myCalendar' ? 'bg-azure-50 text-azure-600' : 'hover:bg-slate-50'}`} onClick={() => setActiveView('myCalendar')}>
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              <span>My Calendar</span>
            </button>
            <button className={`flex items-center px-3 py-1.5 text-sm ${activeView === 'publicCalendar' ? 'bg-azure-50 text-azure-600' : 'hover:bg-slate-50'}`} onClick={() => setActiveView('publicCalendar')}>
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              <span>Public Calendar</span>
              <ExternalLinkIcon className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
        {/* Main Content with Sidebar and Meeting List */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-72 mb-8 md:mb-0">
            <MeetingsSidebar onFilterChange={handleFilterChange} />
          </div>
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Conditionally render the appropriate view */}
            {activeView === 'list' ? <MeetingsList meetings={meetings} filters={filters} /> : activeView === 'myCalendar' ? <MeetingsCalendar meetings={meetings} /> : <div className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  Public Calendar
                </h3>
                <p className="text-slate-500">
                  This would open an external calendar view.
                </p>
              </div>}
          </div>
        </div>
      </div>
      {/* Schedule Meeting Modal */}
      {showCreateModal && <CreateMeetingModal onClose={() => handleModalClose('create')} />}
      {/* Schedule Meeting from Template Modal */}
      {showCreateTemplateModal && <CreateMeetingTemplateModal onClose={() => handleModalClose('template')} />}
      {/* Toast Notification */}
      {toast.isVisible && <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`${toast.variant === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'} p-4 rounded-lg border shadow-md max-w-md flex items-start`} role="alert">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {toast.variant === 'success' ? <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> : <AlertTriangleIcon className="h-5 w-5 text-amber-500" />}
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={() => setToast(prev => ({
          ...prev,
          isVisible: false
        }))}>
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>}
    </main>;
};