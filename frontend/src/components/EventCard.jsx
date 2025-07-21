import React from "react";

const EventCard = ({ event }) => {
  if (!event) return null;
  const { name, type, zipCode, language, date } = event;

  return (
    <div className="event-card">
      <h3>{name}</h3>
      <div>
        <b>Type:</b> {type}
      </div>
      <div>
        <b>ZIP Code:</b> {zipCode}
      </div>
      <div>
        <b>Language:</b> {language}
      </div>
      <div>
        <b>Date:</b> {date ? new Date(date).toLocaleDateString() : "TBA"}
      </div>
    </div>
  );
};

export default EventCard;
