import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, LayoutGridIcon } from 'lucide-react';
import { MeetingCard } from './MeetingCard';
import { ItemCard } from '../ItemCard';
export const MeetingsCalendar = ({
  meetings
}) => {
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(16); // Highlighted date from the example
  const [selectedDateObj, setSelectedDateObj] = useState({
    day: 16,
    month: 7,
    year: 2025,
    isCurrentMonth: true
  });
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const [currentWeek, setCurrentWeek] = useState(0); // 0-indexed week of the month
  const weekViewRef = useRef(null);
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // Time slots for week view - full 24 hours
  const timeSlots = ['all-day', '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
  // Get the number of days in the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  // Get the number of days in the previous month
  const getDaysInPreviousMonth = () => {
    if (currentMonth === 0) {
      return getDaysInMonth(currentYear - 1, 11);
    } else {
      return getDaysInMonth(currentYear, currentMonth - 1);
    }
  };
  // Generate calendar days array for month view
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInPrevMonth = getDaysInPreviousMonth();
    const days = [];
    // Add days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        day: daysInPrevMonth - firstDayOfMonth + i + 1,
        isCurrentMonth: false,
        isPreviousMonth: true
      });
    }
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPreviousMonth: false
      });
    }
    // Add days from next month to fill out the grid (6 rows of 7 days = 42 cells)
    const totalDaysToShow = 42;
    const remainingDays = totalDaysToShow - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPreviousMonth: false
      });
    }
    return days;
  };
  // Generate week days for the week view
  const generateWeekDays = () => {
    const calendarDays = generateCalendarDays();
    const startIndex = currentWeek * 7;
    return calendarDays.slice(startIndex, startIndex + 7);
  };
  // Navigate to previous month/week
  const goToPrevious = () => {
    if (viewMode === 'month') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      // Week view
      if (currentWeek > 0) {
        setCurrentWeek(currentWeek - 1);
      } else {
        // Go to previous month, last week
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
        // Set to last week of the new month
        const newCalendarDays = generateCalendarDays();
        const weeksInNewMonth = Math.ceil(newCalendarDays.length / 7);
        setCurrentWeek(weeksInNewMonth - 1);
      }
    }
  };
  // Navigate to next month/week
  const goToNext = () => {
    if (viewMode === 'month') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      // Week view
      const calendarDays = generateCalendarDays();
      const weeksInCalendar = Math.ceil(calendarDays.length / 7);
      if (currentWeek < weeksInCalendar - 1) {
        setCurrentWeek(currentWeek + 1);
      } else {
        // Go to next month, first week
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
        setCurrentWeek(0);
      }
    }
  };
  // Navigate to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today.getDate());
    setSelectedDateObj({
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      isCurrentMonth: true
    });
    // Calculate which week contains today
    const firstDayOfMonth = getFirstDayOfMonth(today.getFullYear(), today.getMonth());
    const weekOfMonth = Math.floor((today.getDate() + firstDayOfMonth - 1) / 7);
    setCurrentWeek(weekOfMonth);
    // Scroll to 9am when switching to today in week view
    if (viewMode === 'week' && weekViewRef.current) {
      setTimeout(() => {
        const businessHoursElement = weekViewRef.current.querySelector('[data-time="9am"]');
        if (businessHoursElement) {
          businessHoursElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };
  // Get month name
  const getMonthName = month => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  };
  // Get month abbreviation
  const getMonthAbbr = month => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  };
  // Find meetings for a specific date
  const getMeetingsForDate = (day, month, year) => {
    if (!day) return [];
    return meetings.filter(meeting => {
      // Extract the day and month from the meeting date (format: "Wed, Aug 16")
      const dateParts = meeting.date.split(' ');
      const meetingMonth = dateParts[1].replace(',', '');
      const meetingDay = parseInt(dateParts[2], 10);
      // Check if the meeting is on the correct day and month
      return meetingDay === day && meetingMonth === getMonthAbbr(month);
    });
  };
  // Parse time string to hours and minutes
  const parseTime = timeStr => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    return {
      hours,
      minutes
    };
  };
  // Calculate position and size for a meeting in the week view
  const calculateMeetingPosition = meeting => {
    const startTime = parseTime(meeting.startTime);
    const endTime = parseTime(meeting.endTime);
    // Convert hours to slot indices (0-23 for hours)
    const startSlotIndex = startTime.hours;
    const endSlotIndex = endTime.hours;
    // Calculate the starting position (adding 1 for the all-day row)
    const startPosition = startSlotIndex + 1;
    // Calculate the span (how many hour slots)
    const span = endSlotIndex - startSlotIndex;
    return {
      startPosition,
      span
    };
  };
  // Get meetings for the selected date
  const selectedDateMeetings = getMeetingsForDate(selectedDateObj.day, selectedDateObj.isCurrentMonth ? currentMonth : selectedDateObj.isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1, selectedDateObj.isCurrentMonth ? currentYear : selectedDateObj.isPreviousMonth && currentMonth === 0 || !selectedDateObj.isPreviousMonth && currentMonth === 11 ? currentYear + (selectedDateObj.isPreviousMonth ? -1 : 1) : currentYear);
  // Format the selected date as "Day, Month Date" (e.g., "Friday, August 16")
  const formatSelectedDate = () => {
    if (!selectedDateObj) return '';
    const month = selectedDateObj.isCurrentMonth ? currentMonth : selectedDateObj.isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1;
    const year = selectedDateObj.isCurrentMonth ? currentYear : selectedDateObj.isPreviousMonth && currentMonth === 0 || !selectedDateObj.isPreviousMonth && currentMonth === 11 ? currentYear + (selectedDateObj.isPreviousMonth ? -1 : 1) : currentYear;
    const date = new Date(year, month, selectedDateObj.day);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'long'
    }).format(date);
    const monthName = getMonthName(month);
    return `${dayOfWeek}, ${monthName} ${selectedDateObj.day}`;
  };
  // Get the week range for display in week view
  const getWeekRange = () => {
    const weekDays = generateWeekDays();
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    // Determine months for first and last day
    let firstMonth = currentMonth;
    let lastMonth = currentMonth;
    let firstYear = currentYear;
    let lastYear = currentYear;
    if (!firstDay.isCurrentMonth) {
      if (firstDay.isPreviousMonth) {
        firstMonth = firstMonth === 0 ? 11 : firstMonth - 1;
        firstYear = firstMonth === 11 ? firstYear - 1 : firstYear;
      } else {
        firstMonth = firstMonth === 11 ? 0 : firstMonth + 1;
        firstYear = firstMonth === 0 ? firstYear + 1 : firstYear;
      }
    }
    if (!lastDay.isCurrentMonth) {
      if (lastDay.isPreviousMonth) {
        lastMonth = lastMonth === 0 ? 11 : lastMonth - 1;
        lastYear = lastMonth === 11 ? lastYear - 1 : lastYear;
      } else {
        lastMonth = lastMonth === 11 ? 0 : lastMonth + 1;
        lastYear = lastMonth === 0 ? lastYear + 1 : lastYear;
      }
    }
    // Format the range
    if (firstMonth === lastMonth && firstYear === lastYear) {
      return `${getMonthAbbr(firstMonth)} ${firstDay.day} – ${lastDay.day}, ${firstYear}`;
    } else if (firstYear === lastYear) {
      return `${getMonthAbbr(firstMonth)} ${firstDay.day} – ${getMonthAbbr(lastMonth)} ${lastDay.day}, ${firstYear}`;
    } else {
      return `${getMonthAbbr(firstMonth)} ${firstDay.day}, ${firstYear} – ${getMonthAbbr(lastMonth)} ${lastDay.day}, ${lastYear}`;
    }
  };
  // Handle day selection in week view
  const handleWeekDayClick = dayObj => {
    const {
      day,
      isCurrentMonth,
      isPreviousMonth
    } = dayObj;
    // Update the selected date
    setSelectedDate(day);
    setSelectedDateObj({
      day,
      month: isCurrentMonth ? currentMonth : isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1,
      year: isCurrentMonth ? currentYear : isPreviousMonth && currentMonth === 0 || !isPreviousMonth && currentMonth === 11 ? currentYear + (isPreviousMonth ? -1 : 1) : currentYear,
      isCurrentMonth,
      isPreviousMonth
    });
  };
  // Scroll to business hours (9am) when switching to week view
  useEffect(() => {
    if (viewMode === 'week' && weekViewRef.current) {
      const businessHoursElement = weekViewRef.current.querySelector('[data-time="9am"]');
      if (businessHoursElement) {
        businessHoursElement.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    }
  }, [viewMode]);
  const calendarDays = viewMode === 'month' ? generateCalendarDays() : generateWeekDays();
  return <div className="space-y-6">
      <ItemCard className="overflow-hidden">
        {/* Calendar Header - Adjusted padding to match MeetingCard */}
        <div className="flex items-center justify-between py-2">
          <h2 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal'
        }} className="text-xl text-slate-900">
            {viewMode === 'month' ? `${getMonthName(currentMonth)} ${currentYear}` : getWeekRange()}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex border border-slate-200 rounded-md overflow-hidden">
              <button className={`px-3 py-1.5 text-sm ${viewMode === 'month' ? 'bg-azure-50 text-azure-600' : 'hover:bg-slate-50'}`} onClick={() => setViewMode('month')}>
                <span className="hidden sm:inline">Month</span>
                <LayoutGridIcon className="h-4 w-4 sm:hidden" />
              </button>
              <button className={`px-3 py-1.5 text-sm ${viewMode === 'week' ? 'bg-azure-50 text-azure-600' : 'hover:bg-slate-50'}`} onClick={() => setViewMode('week')}>
                <span className="hidden sm:inline">Week</span>
                <CalendarIcon className="h-4 w-4 sm:hidden" />
              </button>
            </div>
            <button className="px-3 py-1.5 text-sm border border-slate-300 rounded-md hover:bg-slate-50" onClick={goToToday}>
              Today
            </button>
            <button className="p-1.5 rounded-md border border-slate-300 hover:bg-slate-50" onClick={goToPrevious} aria-label={viewMode === 'month' ? 'Previous month' : 'Previous week'}>
              <ChevronLeftIcon className="h-4 w-4 text-slate-600" />
            </button>
            <button className="p-1.5 rounded-md border border-slate-300 hover:bg-slate-50" onClick={goToNext} aria-label={viewMode === 'month' ? 'Next month' : 'Next week'}>
              <ChevronRightIcon className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Calendar Grid - Month View */}
        {viewMode === 'month' && <div className="pb-4">
            {/* Days of Week Headers */}
            <div className="grid grid-cols-7 mb-2">
              {daysOfWeek.map(day => <div key={day} className="text-center py-2 text-sm font-medium text-slate-600">
                  {day}
                </div>)}
            </div>
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayObj, index) => {
            const {
              day,
              isCurrentMonth,
              isPreviousMonth
            } = dayObj;
            // Get month and year for this day
            const month = isCurrentMonth ? currentMonth : isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1;
            const year = isCurrentMonth ? currentYear : isPreviousMonth && currentMonth === 0 || !isPreviousMonth && currentMonth === 11 ? currentYear + (isPreviousMonth ? -1 : 1) : currentYear;
            const meetings = getMeetingsForDate(day, month, year);
            const isSelected = selectedDateObj && day === selectedDateObj.day && isCurrentMonth === selectedDateObj.isCurrentMonth && isPreviousMonth === (selectedDateObj.isPreviousMonth || false);
            return <div key={index} className={`min-h-[120px] p-1 border rounded-lg 
                      ${isSelected ? 'border-azure-500 bg-azure-50' : 'border-slate-200 hover:border-slate-300'} 
                      ${!isCurrentMonth ? 'opacity-60' : ''} 
                      cursor-pointer`} onClick={() => {
              setSelectedDate(day);
              setSelectedDateObj({
                day,
                month,
                year,
                isCurrentMonth,
                isPreviousMonth
              });
              // If clicking on a day from another month, switch to that month
              if (!isCurrentMonth) {
                if (isPreviousMonth) {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                } else {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }
              }
            }}>
                    <div className={`text-sm font-medium p-1 ${!isCurrentMonth ? 'text-slate-500' : 'text-slate-700'}`}>
                      {day}
                    </div>
                    <div className="space-y-1 mt-1 max-h-[80px] overflow-hidden">
                      {meetings.map((meeting, idx) => <div key={idx} className="px-2 py-1 text-xs rounded-md bg-azure-500 text-white truncate" title={meeting.title}>
                          {meeting.title}
                        </div>)}
                    </div>
                  </div>;
          })}
            </div>
          </div>}

        {/* Calendar Grid - Week View */}
        {viewMode === 'week' && <div className="pb-4 overflow-x-auto">
            <div className="min-w-[768px]">
              {/* Days of Week Headers */}
              <div className="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
                <div className="py-2 text-sm font-medium text-slate-600 border-r"></div>
                {generateWeekDays().map((dayObj, index) => {
              const {
                day,
                isCurrentMonth,
                isPreviousMonth
              } = dayObj;
              // Get month and year for this day
              const month = isCurrentMonth ? currentMonth : isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1;
              const year = isCurrentMonth ? currentYear : isPreviousMonth && currentMonth === 0 || !isPreviousMonth && currentMonth === 11 ? currentYear + (isPreviousMonth ? -1 : 1) : currentYear;
              const date = new Date(year, month, day);
              const dayOfWeek = fullDaysOfWeek[date.getDay()];
              const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
              const isSelected = selectedDateObj && day === selectedDateObj.day && month === (selectedDateObj.isCurrentMonth ? currentMonth : selectedDateObj.isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1);
              return <div key={index} className={`text-center py-3 border-r cursor-pointer
                        ${isToday ? 'bg-azure-50' : ''} 
                        ${isSelected ? 'bg-azure-100' : ''}
                        ${date.getDay() === 6 ? 'bg-amber-50/30' : ''}`} onClick={() => handleWeekDayClick(dayObj)}>
                      <div className="text-sm font-medium text-slate-700">
                        {dayOfWeek.substring(0, 3)}
                      </div>
                      <div className={`text-xl mt-1 font-medium 
                        ${isToday ? 'text-azure-600' : ''} 
                        ${isSelected ? 'text-azure-700' : 'text-slate-900'}`}>
                        {day}
                      </div>
                    </div>;
            })}
              </div>
              {/* Scrollable Time Slots Container */}
              <div className="max-h-[500px] overflow-y-auto" ref={weekViewRef}>
                {/* Time Slots */}
                <div className="relative">
                  {timeSlots.map((timeSlot, slotIndex) => {
                const weekDays = generateWeekDays();
                return <div key={slotIndex} className={`grid grid-cols-8 ${timeSlot === 'all-day' ? 'border-b-2 border-slate-200' : 'border-b'}`} data-time={timeSlot}>
                        {/* Time Label */}
                        <div className={`py-2 px-2 text-sm font-medium text-slate-600 border-r ${timeSlot === 'all-day' ? 'h-16' : 'h-10'}`}>
                          {timeSlot === 'all-day' ? 'All day' : timeSlot}
                        </div>
                        {/* Day Cells - Now clickable */}
                        {weekDays.map((dayObj, dayIndex) => {
                    const {
                      day,
                      isCurrentMonth,
                      isPreviousMonth
                    } = dayObj;
                    const isSaturday = dayIndex === 6;
                    // Make each cell clickable to select the day
                    return <div key={dayIndex} className={`relative border-r p-1 ${timeSlot === 'all-day' ? 'h-16' : 'h-10'} 
                                ${isSaturday ? 'bg-amber-50/30' : ''} cursor-pointer`} onClick={() => handleWeekDayClick(dayObj)}>
                              {/* Empty cell for positioning only */}
                            </div>;
                  })}
                      </div>;
              })}
                  {/* Overlay meetings that span multiple hours */}
                  {generateWeekDays().map((dayObj, dayIndex) => {
                const {
                  day,
                  isCurrentMonth,
                  isPreviousMonth
                } = dayObj;
                // Get month and year for this day
                const month = isCurrentMonth ? currentMonth : isPreviousMonth ? currentMonth === 0 ? 11 : currentMonth - 1 : currentMonth === 11 ? 0 : currentMonth + 1;
                const year = isCurrentMonth ? currentYear : isPreviousMonth && currentMonth === 0 || !isPreviousMonth && currentMonth === 11 ? currentYear + (isPreviousMonth ? -1 : 1) : currentYear;
                const meetings = getMeetingsForDate(day, month, year);
                return meetings.map((meeting, meetingIndex) => {
                  const {
                    startPosition,
                    span
                  } = calculateMeetingPosition(meeting);
                  // Only render if the meeting spans time (not all-day)
                  if (span > 0) {
                    return <div key={`${dayIndex}-${meetingIndex}`} className="absolute left-0 right-0 z-10" style={{
                      top: `${startPosition * 40}px`,
                      height: `${span * 40}px`,
                      gridColumn: `${dayIndex + 2}` // +2 because of time column
                    }}>
                            <div className="absolute bg-azure-500 text-white rounded-md p-1 overflow-hidden mx-1 cursor-pointer" style={{
                        left: `${(dayIndex + 1) * (100 / 8)}%`,
                        width: `${100 / 8 - 1}%`,
                        height: 'calc(100% - 2px)',
                        zIndex: 10 + meetingIndex
                      }} onClick={e => {
                        e.stopPropagation(); // Prevent triggering day selection
                        handleWeekDayClick(dayObj); // But still select the day
                      }}>
                              <div className="text-xs font-medium truncate">
                                {meeting.title}
                              </div>
                              <div className="text-xs opacity-90 truncate">
                                {meeting.startTime} - {meeting.endTime}
                              </div>
                            </div>
                          </div>;
                  }
                  return null;
                });
              })}
                </div>
              </div>
            </div>
          </div>}
      </ItemCard>

      {/* Selected Date Meetings */}
      {selectedDateObj && <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal'
        }} className="text-lg text-slate-900">
              Meetings for {formatSelectedDate()}
            </h3>
            <a href="/kubernetes/meetings" className="text-sm text-azure-600 hover:text-azure-700 flex items-center">
              View all meetings
            </a>
          </div>
          {selectedDateMeetings.length > 0 ? <div className="space-y-6">
              {selectedDateMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
            </div> : <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-slate-500">
                No meetings scheduled for this date.
              </p>
            </div>}
        </div>}
    </div>;
};