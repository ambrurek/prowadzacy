import React, {useEffect,useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from '@fullcalendar/core'
import plLocale from "@fullcalendar/core/locales/pl";
import { INITIAL_EVENTS, createEventId } from './event-utils'
import "./Kalendarz.css";
import { useParams } from 'react-router-dom';

import config from"../cgf"



const Kalendarz2 = () => {

  const API_URL = config.API_URL

  const { idteacher } = useParams();
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: []
  });

  useEffect(() => {
    // Pobierz wydarzenia z bazy danych
    fetch(`${API_URL}/event/events/${idteacher}`)
      .then((response) => response.json())
      .then((data) => {
        // Przekształć format danych na oczekiwany przez FullCalendar
        const formattedEvents = data.map((event) => ({
          id: event._id, // Użyj _id jako identyfikatora wydarzenia
          title: event.title,
          start: event.start_time,
          end: event.end_time
        }));
        console.log(formattedEvents)
        handleEvents(formattedEvents);
        // Aktualizuj stan komponentu z pobranymi wydarzeniami
        setState((prevState) => ({
          ...prevState,
          currentEvents: formattedEvents
        }));
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania wydarzeń:", error);
      });
  }, [idteacher]);


  

  const handleDateSelect = (selectInfo) => {
  let title = prompt('Please enter a new title for your event');
  let calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
  console.log(idteacher)
  if (title) {
    const event = {
      teacherId: idteacher,
      title: title,
      start_time: selectInfo.startStr,
      end_time: selectInfo.endStr,
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
        // Przetwarzanie odpowiedzi z serwera (utworzonego wydarzenia)
        console.log('Utworzone wydarzenie:', createdEvent);

        // Dodanie wydarzenia do kalendarza
        calendarApi.addEvent({
          id: createdEvent._id,
          title: createdEvent.title,
          start: createdEvent.start_time,
          end: createdEvent.end_time,
          allDay: false // Jeśli wydarzenie jest na cały dzień, ustaw wartość na true
        });
      })
      .catch((error) => {
        // Obsługa błędów
        console.error('Błąd podczas tworzenia wydarzenia:', error);
      });
  }
  }
  const handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = clickInfo.event.id;
      const event = {
        teacherId: idteacher,
        eventId: eventId
      };
      console.log(idteacher)
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
          // Kontynuuj resztę kodu...
        } else {
          // Obsłuż błąd usunięcia wydarzenia...
        }
      })
      .catch((error) => {
        // Obsłuż błąd żądania...
      });
    }
  
    let calendarApi = clickInfo.view.calendar;
    console.log(clickInfo.event.id);
    var date = calendarApi.getDate();
    alert("The current date of the calendar is " + date.toISOSt)
  }

  const handleEvents = (events) => {
    setState((prevState) => {
      if (prevState.currentEvents.length === 0) { // Sprawdź, czy stan jest pusty
        return {
          ...prevState,
          currentEvents: events
        };
      } else {
        return prevState; // Jeśli stan jest już ustawiony, zwróć poprzedni stan
      }
    });
  };

  const handleEventResize = (resizeInfo) => {
    const event = resizeInfo.event;
    const eventId = event.id;
    const newEnd = event.end;
  
    const updatedEvent = {
      title: resizeInfo.event.title,
      start_time: resizeInfo.event.startStr,
      end_time: newEnd.toISOString(), // Zaktualizuj nowy czas zakończenia na format ISO
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
  };
  const handleEventDrop = (dropInfo) => {
    const event = dropInfo.event;
    const eventId = event.id;
    const newEnd = event.end;
  
    const updatedEvent = {
      title: dropInfo.event.title,
      start_time: dropInfo.event.startStr,
      end_time: newEnd.toISOString(), // Zaktualizuj nowy czas zakończenia na format ISO
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
    initialView: "dayGridMonth",
    contentHeight: "auto",
    editable: true,
    initialEvents: state.currentEvents,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: true,
    locale: plLocale,
    headerToolbar: {
      left:"prev,next,today",
      center: "title",
      right:"dayGridMonth,timeGridWeek,timeGridDay"
    },
    select: handleDateSelect,
    eventContent: renderEventContent,// custom render function
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    eventResize: handleEventResize,
    eventDrop: handleEventDrop,
  };

  

  return (
    <div className="kontener-kalendarz">
      <FullCalendar {...kalendarzOpcje}   events={state.currentEvents} />
    </div>
  );
};

export default Kalendarz2;
