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



const Kalendarz = () => {

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
    editable: false,
    initialEvents: state.currentEvents,
    selectable: false,
    selectMirror: false,
    dayMaxEvents: true,
    allDaySlot: true,
    locale: plLocale,
    headerToolbar: {
      left:"prev,next,today",
      center: "title",
      right:"dayGridMonth,timeGridWeek,timeGridDay"
    },
    eventContent: renderEventContent,// custom render function
    eventsSet: handleEvents,
  };

  

  return (
    <div className="kontener-kalendarz">
      <FullCalendar {...kalendarzOpcje}   events={state.currentEvents} />
    </div>
  );
};

export default Kalendarz;
