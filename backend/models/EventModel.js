class Event {
  constructor({ event_name, location_zip, date, language, instructor, type }) {
    this.event_name = event_name;
    this.location_zip = location_zip;
    this.date = new Date(date);
    this.language = language;
    this.instructor = instructor;
    this.type = type;
  }
}

const rawEvents = [
  {
    event_name: "Intro to Email",
    location_zip: "94306",
    date: "2025-08-10",
    language: "English",
    instructor: "Jane Lee",
    type: "Workshop"
  },
  {
    event_name: "Drop-in for Google Docs",
    location_zip: "94306",
    date: "2025-08-12",
    language: "Spanish",
    instructor: "Carlos Ruiz",
    type: "Drop-in Help"
  },
  {
    event_name: "Excel Basics",
    location_zip: "94305",
    date: "2025-08-15",
    language: "English",
    instructor: "John Doe",
    type: "Seminar"
  },
  {
    event_name: "Google Sheets for Beginners",
    location_zip: "10001",
    date: "2025-09-01",
    language: "English",
    instructor: "Amy Smith",
    type: "Workshop"
  }
];

const events = rawEvents.map(eventData => new Event(eventData));

function filterEvents({ zip = "", type = "", language = "", startDate = "", endDate = "" } = {}) {
  const zipFilter = zip.trim().toLowerCase();
  const typeFilter = type.trim().toLowerCase();
  const languageFilter = language.trim().toLowerCase();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  return events.filter(event => {
    const zipMatch = !zipFilter || event.location_zip.toLowerCase().startsWith(zipFilter);
    const typeMatch = !typeFilter || event.type.toLowerCase() === typeFilter;
    const languageMatch = !languageFilter || event.language.toLowerCase() === languageFilter;

    let dateMatch = true;
    if (event.date) {
      if (start && end) {
        dateMatch = event.date >= start && event.date <= end;
      } else if (start) {
        dateMatch = event.date >= start;
      } else if (end) {
        dateMatch = event.date <= end;
      }
    } else {
      dateMatch = !start && !end;
    }

    return zipMatch && typeMatch && languageMatch && dateMatch;
  }).sort((a, b) => a.date - b.date);
}

