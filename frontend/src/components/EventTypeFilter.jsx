import React from "react";
import { Target, Zap, Sparkles } from "lucide-react";

const EVENT_TYPES = ["Workshop", "Seminar", "Drop-in Help"];

const EventTypeFilter = ({ selectedType, onTypeChange }) => {
  return (
    <div className="event-type-picker">
      <div className="event-type-header">
        <div className="header-icon">
          <Target size={20} />
        </div>
        <span className="header-title">Event Type</span>
        <div className="header-sparkles">
          <Zap size={16} />
          <Sparkles size={14} />
        </div>
      </div>

      <div className="event-type-container">
        <div className="input-icon">
          <Target size={16} />
        </div>
        <select
          value={selectedType || ""}
          onChange={(e) => onTypeChange && onTypeChange(e.target.value)}
          className="event-type-select"
        >
          <option value="">All Event Types</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="input-emoji">🎯</div>
      </div>

      <div className="example-text">Choose your learning adventure!</div>
    </div>
  );
};

export default EventTypeFilter;
