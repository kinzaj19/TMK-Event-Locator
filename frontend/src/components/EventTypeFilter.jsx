import React from "react";

const EVENT_TYPES = ["Workshop", "Seminar", "Drop-in Help"];

const EventTypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor="event-type-select"
        style={{ display: "block", marginBottom: 4 }}
      >
        Event Type:
      </label>
      <select
        id="event-type-select"
        value={selectedType || ""}
        onChange={(e) => onTypeChange && onTypeChange(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          minWidth: 160,
        }}
      >
        <option value="">All Types</option>
        {EVENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventTypeFilter;
