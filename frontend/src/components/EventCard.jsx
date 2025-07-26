import React from "react";
import {
  MapPin,
  Clock,
  User,
  Globe,
  BookOpen,
  Star,
  Heart,
  Zap,
} from "lucide-react";

const EventCard = ({ event }) => {
  if (!event) return null;
  // Placeholder fields for demo
  const {
    name,
    type,
    zipCode,
    language,
    date,
    time = "10:00 AM", // Placeholder
    location = "Palo Alto Community Center", // Placeholder
    instructor = "Jane Lee", // Placeholder
    instructorEmoji = "🧑‍🏫", // Placeholder
    spotsLeft = 8, // Placeholder
    subtitle = "Perfect for Beginners!", // Placeholder
    description = "Learn the fundamentals of email: sending, receiving, organizing, and staying safe online.", // Placeholder
  } = event;

  // Badge color logic (simplified for demo)
  const typeColors = {
    Workshop: { bg: "#2bb3f6", text: "#fff" },
    "Drop-in Help": { bg: "#22c55e", text: "#fff" },
    Seminar: { bg: "#a259e6", text: "#fff" },
  };
  const badge = typeColors[type] || { bg: "#888", text: "#fff" };

  // Spots left badge color
  const spotsColor =
    spotsLeft > 5 ? "#22c55e" : spotsLeft > 2 ? "#facc15" : "#ef4444";

  return (
    <div className="event-card-modern tall">
      <div
        className="event-card-header"
        style={{ background: badge.bg, color: badge.text }}
      >
        <span className="event-type-badge">{type}</span>
        <span className="event-spots-badge" style={{ background: spotsColor }}>
          {spotsLeft} spots left
        </span>
      </div>
      <div className="event-card-content">
        <h3 className="event-title">{name}</h3>
        <div className="event-subtitle">{subtitle}</div>
        <div className="event-info-block date-block">
          <Clock size={16} />
          <div>
            <div className="event-date">
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "TBA"}
            </div>
            <div className="event-time blue-time">{time}</div>
          </div>
        </div>
        <div className="event-info-block location-block">
          <MapPin size={16} />
          <div>
            <div>{location}</div>
            <div className="event-zip">Zip Code: {zipCode}</div>
          </div>
        </div>
        <div className="event-info-block instructor-block">
          <User size={16} />
          <div>
            <span className="event-instructor">Your Instructor</span>:{" "}
            {instructor} <span>{instructorEmoji}</span>
          </div>
        </div>
        <div className="event-info-block language-block">
          <Globe size={16} />
          <div>
            <span className="event-language-label">Language</span>: {language}
          </div>
        </div>
        <div className="event-description">{description}</div>
      </div>
    </div>
  );
};

export default EventCard;
