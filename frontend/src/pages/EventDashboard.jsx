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
  {
    id: 4,
    name: "Python Basics for Seniors",
    type: "Workshop",
    zipCode: "90210",
    language: "English",
    date: "2024-07-25",
  },
  {
    id: 5,
    name: "Smartphone Photography",
    type: "Workshop",
    zipCode: "10001",
    language: "Spanish",
    date: "2024-07-12",
  },
  {
    id: 6,
    name: "Social Media Safety",
    type: "Seminar",
    zipCode: "60616",
    language: "English",
    date: "2024-07-18",
  },
  {
    id: 7,
    name: "Email & Internet Basics",
    type: "Workshop",
    zipCode: "94105",
    language: "English",
    date: "2024-07-22",
  },
  {
    id: 8,
    name: "Korean Language Tech Support",
    type: "Drop-in Help",
    zipCode: "90210",
    language: "Korean",
    date: "2024-07-28",
  },
  {
    id: 9,
    name: "Video Calling with Family",
    type: "Workshop",
    zipCode: "10001",
    language: "English",
    date: "2024-07-14",
  },
  {
    id: 10,
    name: "Vietnamese Computer Basics",
    type: "Workshop",
    zipCode: "60616",
    language: "Vietnamese",
    date: "2024-07-30",
  },
  {
    id: 11,
    name: "Online Banking Security",
    type: "Seminar",
    zipCode: "94105",
    language: "English",
    date: "2024-08-05",
  },
  {
    id: 12,
    name: "Digital Art for Beginners",
    type: "Workshop",
    zipCode: "90210",
    language: "English",
    date: "2024-08-10",
  },
  {
    id: 13,
    name: "Chinese Language Tech Help",
    type: "Drop-in Help",
    zipCode: "10001",
    language: "Chinese",
    date: "2024-08-15",
  },
  {
    id: 14,
    name: "Smart Home Setup",
    type: "Workshop",
    zipCode: "60616",
    language: "English",
    date: "2024-08-20",
  },
  {
    id: 15,
    name: "Online Shopping Safety",
    type: "Seminar",
    zipCode: "94105",
    language: "English",
    date: "2024-08-25",
  },
  {
    id: 16,
    name: "Spanish Language Coding",
    type: "Workshop",
    zipCode: "90210",
    language: "Spanish",
    date: "2024-08-30",
  },
  {
    id: 17,
    name: "Digital Music Creation",
    type: "Workshop",
    zipCode: "10001",
    language: "English",
    date: "2024-09-05",
  },
  {
    id: 18,
    name: "Russian Language Support",
    type: "Drop-in Help",
    zipCode: "60616",
    language: "Russian",
    date: "2024-09-10",
  },
  {
    id: 19,
    name: "Cloud Storage Basics",
    type: "Workshop",
    zipCode: "94105",
    language: "English",
    date: "2024-09-15",
  },
  {
    id: 20,
    name: "French Language Tech Workshop",
    type: "Workshop",
    zipCode: "90210",
    language: "French",
    date: "2024-09-20",
  },
];

const EventDashboard = () => {
  const [zip, setZip] = useState("");
  const [eventType, setEventType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [events, setEvents] = useState(DUMMY_EVENTS);

  // const [events, setEvents] = useState([]); // For real API

  // Clear all filters function
  const clearAllFilters = () => {
    setZip("");
    setEventType("");
    setLanguages([]);
    setDateRange({ start: "", end: "" });
  };

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
    if (dateRange.start && dateRange.end) {
      const eventDate = new Date(event.date);
      if (
        eventDate < new Date(dateRange.start) ||
        eventDate > new Date(dateRange.end)
      )
        return false;
    }
    return true;
  });

  return (
    <>
      <div className="tmk-header-wrapper">
        <h1 className="tmk-title">Tech Me Kid</h1>
        <div className="tmk-subtitle">
          Empower Digital Citizens. Connect Passionate Student Volunteers with
          Seniors. Find Workshops and Sessions Near You!
        </div>
        <div className="tmk-header-buttons">
          <button className="tmk-header-btn">Live Events Available 🎯</button>
          <button className="tmk-header-btn">
            Student Volunteers Ready 🙋‍♀️
          </button>
          <button className="tmk-header-btn">Free Learning 📚</button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Filter Box */}
        <div className="filter-box">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-4">
              👵 Find Your Perfect Tech Learning Experience 🧓
            </h2>
            <p className="text-gray-600 font-medium text-2xl">
              Use these filters to discover amazing events near you!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ZipCodeInput onZipCodeChange={setZip} />
            <EventTypeFilter
              selectedType={eventType}
              onTypeChange={setEventType}
            />
            <LanguageFilter
              selectedLanguages={languages}
              onChange={setLanguages}
            />
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
          <div className="clear-filters-container">
            <button onClick={clearAllFilters} className="clear-filters-btn">
              🔄 Clear All Filters
            </button>
          </div>
        </div>
        {/* Results Count Box */}
        <div className="results-count-box">
          🎉 Found {filteredEvents.length} Amazing Events 🎉
          <div
            style={{ fontWeight: 500, fontSize: "1.1rem", marginTop: "0.5rem" }}
          >
            Discover life-changing tech learning with Tech Me Kid!
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="events-area">
          {filteredEvents.length === 0 ? (
            <div
              style={{
                color: "#e0e0e0",
                textAlign: "center",
                paddingTop: "50px",
                fontSize: "1.2rem",
              }}
            >
              No events found for the selected filters.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
        <div className="map-area">
          <MapView events={filteredEvents} />
        </div>
      </div>
    </>
  );
};

export default EventDashboard;
