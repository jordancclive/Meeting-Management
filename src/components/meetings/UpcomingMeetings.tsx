import React from 'react';
import { MeetingCard } from './MeetingCard';
export const UpcomingMeetings = ({
  meetings,
  limit = 4
}) => {
  // Filter to only show upcoming meetings (not past)
  const upcomingMeetings = meetings.filter(meeting => !meeting.isPast);
  // Sort meetings by date and time
  const sortedMeetings = [...upcomingMeetings].sort((a, b) => {
    // Parse dates (format: "Day, Month Date")
    const dateA = new Date(a.date + ', 2025 ' + a.startTime);
    const dateB = new Date(b.date + ', 2025 ' + b.startTime);
    return dateA - dateB;
  });
  // Take only the specified number of meetings
  const limitedMeetings = sortedMeetings.slice(0, limit);
  return <div className="space-y-6">
      {limitedMeetings.length > 0 ? <>
          {limitedMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </> : <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-slate-500">No upcoming meetings found.</p>
        </div>}
    </div>;
};