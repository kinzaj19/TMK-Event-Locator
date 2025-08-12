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
    <div className="senior-planet-dashboard">
      {/* TMK Header Section - Paragraph */}
      <section className="tmk-header-section">
        <div className="tmk-header-paragraph">
          <p>
            Welcome to Tech Me Kid's Event Locator! Discover amazing tech
            learning opportunities, connect with student volunteers, and access
            free educational resources in your community. Whether you're looking
            for live events, workshops, or learning materials, we've got you
            covered.
          </p>
        </div>
      </section>

      {/* Dashboard Wrapper for Side-by-Side Layout */}
      <div className="dashboard-wrapper">
        {/* Event Search Section - Filters Only */}
        <section id="event-search-section" className="event-search-section">
          <div className="search-container">
            <h2 className="search-title">Find Events Near You</h2>
            <p className="search-subtitle">
              Use these filters to discover amazing tech learning events in your
              area!
            </p>

            <div className="filters-grid">
              <ZipCodeInput onZipCodeChange={setZip} />
              <EventTypeFilter
                selectedType={eventType}
                onTypeChange={setEventType}
              />
              <LanguageFilter
                selectedLanguages={languages}
                onChange={setLanguages}
              />
            </div>

            <div className="date-range-container">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <div className="clear-filters-container">
              <button onClick={clearAllFilters} className="clear-filters-btn">
                🔄 Clear All Filters
              </button>
            </div>
          </div>
        </section>

        {/* Events Results Section - Beside Filters */}
        <section className="events-results-section">
          <div className="events-results-sidebar">
            <div className="results-header">
              <h3 className="results-title">
                🎉 Found {filteredEvents.length} Amazing Events 🎉
              </h3>
              <p className="results-subtitle">
                Discover life-changing tech learning opportunities!
              </p>
            </div>

            {/* Multiple Rows of 4 Cards Each with Vertical Scrolling */}
            <div className="events-vertical-container">
              {filteredEvents.length === 0 ? (
                <div className="no-events">
                  <p>No events found for the selected filters.</p>
                </div>
              ) : (
                <>
                  {/* Generate rows of 4 cards each */}
                  {Array.from(
                    { length: Math.ceil(filteredEvents.length / 4) },
                    (_, rowIndex) => (
                      <div key={rowIndex} className="events-row">
                        {filteredEvents
                          .slice(rowIndex * 4, (rowIndex + 1) * 4)
                          .map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Map Below Both Sections */}
      <div id="map-container" className="map-container">
        <MapView events={filteredEvents} />
      </div>

      {/* Community Section */}
      <section className="community-section">
        <div className="community-container">
          <h2 className="community-title">Connect with Tech Me Kid</h2>
          <p className="community-subtitle">
            Join our professional network and stay updated!
          </p>
          <a
            href="https://www.linkedin.com/company/tech-me-kid"
            target="_blank"
            rel="noopener noreferrer"
            className="signup-btn"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default EventDashboard;
