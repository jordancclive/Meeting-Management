import React from 'react';
import { MeetingCard } from './MeetingCard';
export const MeetingsList = ({
  meetings,
  filters = {
    status: 'upcoming'
  }
}) => {
  // Filter meetings based on status (upcoming or past)
  const filteredMeetings = meetings.filter(meeting => {
    // Filter by past/upcoming status
    if (filters.status === 'past') {
      return meeting.isPast === true;
    } else {
      return meeting.isPast !== true;
    }
  });
  // Sort meetings by date
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    // Parse dates (format: "Day, Month Date")
    const dateA = new Date(a.date + ', 2025 ' + a.startTime);
    const dateB = new Date(b.date + ', 2025 ' + b.startTime);
    // For upcoming meetings: nearest to furthest
    if (filters.status === 'upcoming') {
      return dateA - dateB;
    }
    // For past meetings: most recent to least recent
    else {
      return dateB - dateA;
    }
  });
  return <div className="space-y-6">
      {sortedMeetings.length > 0 ? sortedMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />) : <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-slate-500">No {filters.status} meetings found.</p>
        </div>}
    </div>;
};