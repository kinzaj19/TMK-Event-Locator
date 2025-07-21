import React, { useState, useEffect } from "react";
import ZipCodeInput from "../components/ZipCodeInput";
import EventTypeFilter from "../components/EventTypeFilter";
import LanguageFilter from "../components/LanguageFilter";
import DateRangePicker from "../components/DateRangePicker";
import EventCard from "../components/EventCard";
import MapView from "../components/MapView";
// import eventApi from "../services/eventApi"; // Uncomment and implement for real API

// Dummy data for demonstration
const DUMMY_EVENTS = [
  {
    id: 1,
    name: "React Workshop",
    type: "Workshop",
    zipCode: "10001",
    language: "English",
    date: "2024-07-10",
  },
  {
    id: 2,
    name: "Urdu Seminar",
    type: "Seminar",
    zipCode: "60616",
    language: "Urdu",
    date: "2024-07-15",
  },
  {
    id: 3,
    name: "Drop-in Coding Help",
    type: "Drop-in Help",
    zipCode: "94105",
    language: "English",
    date: "2024-07-20",
  },
];

const EventDashboard = () => {
  const [zip, setZip] = useState("");
  const [eventType, setEventType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [events, setEvents] = useState(DUMMY_EVENTS);
  // const [events, setEvents] = useState([]); // For real API

  // Example: fetch events from API when filters change
  // useEffect(() => {
  //   eventApi.getEvents({ zip, eventType, languages, dateRange }).then(setEvents);
  // }, [zip, eventType, languages, dateRange]);

  // Simple local filtering for demo
  const filteredEvents = events.filter((event) => {
    if (zip && event.zipCode !== zip) return false;
    if (eventType && event.type !== eventType) return false;
    if (languages.length > 0 && !languages.includes(event.language))
      return false;
    if (dateRange.startDate && dateRange.endDate) {
      const eventDate = new Date(event.date);
      if (eventDate < dateRange.startDate || eventDate > dateRange.endDate)
        return false;
    }
    return true;
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Event Locator</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 24 }}
      >
        <ZipCodeInput onZipCodeChange={setZip} />
        <EventTypeFilter selectedType={eventType} onTypeChange={setEventType} />
        <LanguageFilter selectedLanguages={languages} onChange={setLanguages} />
        <DateRangePicker range={dateRange} onChange={setDateRange} />
      </div>
      <MapView events={filteredEvents} />
      <div>
        {filteredEvents.length === 0 ? (
          <div style={{ color: "#888", marginTop: 32 }}>
            No events found for selected filters.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
