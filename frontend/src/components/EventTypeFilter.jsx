import React from "react";

const EVENT_TYPES = ["Workshop", "Seminar", "Drop-in Help"];

const EventTypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <div className="event-type-filter">
      <label htmlFor="event-type-select" className="filter-label">
        Event Type:
      </label>
      <select
        id="event-type-select"
        value={selectedType || ""}
        onChange={(e) => onTypeChange && onTypeChange(e.target.value)}
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
