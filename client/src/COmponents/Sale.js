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

const Kalendarz2 = () => {
  const API_URL = config.API_URL;
  const { roomid } = useParams();
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
        const [eventsResponse] = await Promise.all([
          fetch(`${API_URL}/room/byname?id=${roomid}`).then((response) =>
            response.json()
          ),
        ]);
        const formattedEvents = eventsResponse.events.map((event) => ({
          id: event.id,
          title: event.name.pl,
          start: event.start_time,
          end: event.end_time,
        }));
  
        setState((prevState) => ({
          ...prevState,
          currentEvents: formattedEvents,
        }));
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń:", error);
      }
    };
  
    fetchEvents();
  }, [roomid]);






  const handleEvents = (events) => {
    setState((prevState) => {
      if (prevState.currentEvents.length === 0) {
        return {
          ...prevState,
          currentEvents: events
        };
      } else {
        return prevState;
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
    initialView: "timeGridWeek",
    contentHeight: "auto",
    editable: false,
    initialEvents: state.currentEvents,
    selectable: false,
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
    eventContent: renderEventContent,
    eventsSet: handleEvents,
  };

  return (
    <div className="kontener-kalendarz">
    <div className="calendar-wrapper">
      <FullCalendar
        {...kalendarzOpcje}
        events={state.currentEvents}
      />
    </div>
  </div>
);
};

export default Kalendarz2;
