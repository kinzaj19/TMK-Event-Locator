import React from "react";

const EventCard = ({ event }) => {
  if (!event) return null;
  const { name, type, zipCode, language, date } = event;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        background: "#fff",
        maxWidth: 400,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: 20 }}>{name}</h3>
      <div style={{ color: "#555", marginBottom: 6 }}>
        <b>Type:</b> {type}
      </div>
      <div style={{ color: "#555", marginBottom: 6 }}>
        <b>ZIP Code:</b> {zipCode}
      </div>
      <div style={{ color: "#555", marginBottom: 6 }}>
        <b>Language:</b> {language}
      </div>
      <div style={{ color: "#555" }}>
        <b>Date:</b> {date ? new Date(date).toLocaleDateString() : "TBA"}
      </div>
    </div>
  );
};

export default EventCard;
