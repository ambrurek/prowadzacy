import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core'
import plLocale from "@fullcalendar/core/locales/pl";
import { INITIAL_EVENTS, createEventId } from './event-utils'
import "./Kalendarz.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomModal from "./CustomModal";

import config from "../cgf"
import { isPropsEqual } from "@fullcalendar/core/internal";

const Kalendarz2 = (props) => {
  const API_URL = config.API_URL;
  const { idteacher } = props;
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: []
  });
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${API_URL}/auth/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsResponse, teacherResponse] = await Promise.all([
          fetch(`${API_URL}/event/events/${idteacher}`).then((response) =>
            response.json()
          ),
          fetch(`${API_URL}/teacher/bynames?id=${idteacher}`).then((response) =>
            response.json()
          ),
        ]);
  
        const formattedEvents = eventsResponse.map((event) => ({
          id: event._id,
          title: event.title,
          start: event.start_time,
          end: event.end_time,
        }));
  
        const additionalEvents = teacherResponse.events.map((event) => ({
          id: createEventId(), // Dodaj losowy identyfikator
          title: event.name.pl,
          start: event.start_time,
          end: event.end_time,
          editable: false,
          selectable: false,
        }));
  
        const allEvents = formattedEvents.concat(additionalEvents);
  
        setState((prevState) => ({
          ...prevState,
          currentEvents: allEvents,
        }));
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń:", error);
      }
    };
  
    fetchEvents();
  }, [idteacher]);
  const [showModal, setShowModal] = useState(false);
  const [modalEventTitle, setModalEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarInteractable, setCalendarInteractable] = useState(true);


  const handleDateSelect = (selectInfo) => {
    if (user && user.isAdmin) {
    setSelectedDate(selectInfo);
    setShowModal(true);
    setModalEventTitle("");
    setCalendarInteractable(false)
    }
  };

  const handleModalSubmit = () => {
    if (modalEventTitle && selectedDate) {
      const event = {
        teacherId: idteacher,
        title: modalEventTitle,
        start_time: selectedDate.startStr,
        end_time: selectedDate.endStr,
        id: createEventId()
      };

      fetch(`${API_URL}/event/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
        .then((response) => response.json())
        .then((createdEvent) => {
          selectedDate.view.calendar.addEvent({
            id: createdEvent._id,
            title: createdEvent.title,
            start: createdEvent.start_time,
            end: createdEvent.end_time,
            allDay: false
          });
        })
        .catch((error) => {
          console.error('Błąd podczas tworzenia wydarzenia:', error);
        });

      setShowModal(false);
      setCalendarInteractable(true)
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCalendarInteractable(true)
  };



  const handleEventClick = (clickInfo) => {
    if (user && user.isAdmin) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        const eventId = clickInfo.event.id;
        const event = {
          teacherId: idteacher,
          eventId: eventId
        };

        fetch(`${API_URL}/event/event`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        })
          .then((response) => {
            if (response.ok) {
              clickInfo.event.remove();
            } else {
              console.error('Błąd podczas usuwania wydarzenia:', response.status);
            }
          })
          .catch((error) => {
            console.error('Błąd podczas usuwania wydarzenia:', error);
          });
      }
    } else {
      alert('You are not authorized to delete events.');
    }
  };

  const handleEvents = (events) => {
    setState((prevState) => {
      if (prevState.currentEvents.length === 0) {
        return {
          ...prevState,
          currentEvents: events
        };
      } else {
        console.log(prevState)
        return prevState;
      }
    });
  };

  const handleEventResize = (resizeInfo) => {
    if (user && user.isAdmin) {
      const event = resizeInfo.event;
      const eventId = event.id;
      const newEnd = event.end;

      const updatedEvent = {
        title: resizeInfo.event.title,
        start_time: resizeInfo.event.startStr,
        end_time: newEnd.toISOString(),
        teacherId: idteacher,
        eventId: eventId
      };

      fetch(`${API_URL}/event/event`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
      })
        .then((response) => {
          if (response.ok) {
            // Wydarzenie zostało pomyślnie zaktualizowane w bazie danych
          } else {
            // Obsłuż błąd aktualizacji wydarzenia w bazie danych
          }
        })
        .catch((error) => {
          // Obsłuż błąd żądania
        });
    }
  };

  const handleEventDrop = (dropInfo) => {
    if (user && user.isAdmin) {
      const event = dropInfo.event;
      const eventId = event.id;
      const newEnd = event.end;

      const updatedEvent = {
        title: dropInfo.event.title,
        start_time: dropInfo.event.startStr,
        end_time: newEnd.toISOString(),
        teacherId: idteacher,
        eventId: eventId
      };

      fetch(`${API_URL}/event/event`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
      })
        .then((response) => {
          if (response.ok) {
            // Wydarzenie zostało pomyślnie zaktualizowane w bazie danych
          } else {
            // Obsłuż błąd aktualizacji wydarzenia w bazie danych
          }
        })
        .catch((error) => {
          // Obsłuż błąd żądania
        });
    }
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const kalendarzOpcje = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    contentHeight: "auto",
    editable: user && user.isAdmin &&  isCalendarInteractable,
    initialEvents: state.currentEvents,
    selectable: user && user.isAdmin &&  isCalendarInteractable,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: true,
    locale: plLocale,
    slotMinTime: "07:00:00", // Minimalny czas wyświetlany na osi czasu
    slotMaxTime: "23:00:00", // Maksymalny czas wyświetlany na osi czasu
    nowIndicator: true,
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "timeGridWeek,timeGridDay"
    },
    select: handleDateSelect,
    eventContent: renderEventContent,
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    eventResize: handleEventResize,
    eventDrop: handleEventDrop,
  };

  return (
    <div className="kontener-kalendarz">
    <div className="calendar-wrapper">
      <FullCalendar
        {...kalendarzOpcje}
        events={state.currentEvents}
        select={handleDateSelect}
      />
    </div>
    {showModal && (
      <CustomModal
        title="Wpisz tytuł wydarzenia"
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        onTitleChange={(event) => setModalEventTitle(event.target.value)}
        eventTitle={modalEventTitle}
      />
    )}
  </div>
);
};

export default Kalendarz2;
