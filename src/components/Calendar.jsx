import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

import BookingModal from './BookingModal';
import { usTimeZones } from '../utils/timezones';

function Calendar() {
  const [timeZone, setTimeZone] = useState('America/Denver');
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/coaches/${id}/slots`);
        console.log(response.data)
        const fetchedEvents = response.data.map(event => ({
          eventId: event.id,
          coach: event.title,
          start: event.start,
          end: event.end,
          color: "#7195BA"
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [id, timeZone]);

  const handleEventClick = (event) => {
    setSelectedEvent({
      start: event.event._instance.range.start.toISOString(),
      end: event.event._instance.range.end.toISOString(),
      id: event.event._def.extendedProps.eventId
    });
    setModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h1 className="mb-10 ml-10 text-4xl">{events.length > 0 ? events[0].coach : "Loading..."}</h1>
      <Link className="absolute top-2 right-2" to="/">Homepage</Link>
      <div className="absolute top-16 left-0 right-0 left-0 bottom-0 m-10 mt-2" >
        <label htmlFor="timezone-select">Choose your time zone:</label>
        <select id="timezone-select" value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          {usTimeZones.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, momentTimezonePlugin]}
          initialView="timeGridWeek"
          themeSystem= 'bootstrap'
          slotLabelFormat={{
            hour: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short'
          }}
          validRange={{
            start: '2024-04-26',
            end: '2024-05-06'
          }}
          firstDay={1}
          allDaySlot={false}
          slotEventOverlap={false}
          weekends={true}
          timeZone={timeZone}
          height="100%"
          events={events}
          eventClick={handleEventClick}
          eventContent={function(arg) {
            return (
              <div style={{
                backgroundColor: arg.event.backgroundColor,
                height: '100%',
                borderRadius: '6px',
              }}>
                {}
              </div>
            );
          }}
        />
        { modalOpen && (
          <BookingModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmBooking}
            event={selectedEvent}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;
