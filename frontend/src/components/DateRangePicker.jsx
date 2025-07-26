import React from "react";
import { Calendar, Zap, Sparkles } from "lucide-react";

const DateRangePicker = ({ value, onChange }) => {
  const handleStartDateChange = (start) => {
    onChange({ ...value, start });
  };

  const handleEndDateChange = (end) => {
    onChange({ ...value, end });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="date-range-picker">
      <div className="date-range-header">
        <div className="header-icon">
          <Calendar size={20} />
        </div>
        <span className="header-title">Date Range</span>
        <div className="header-sparkles">
          <Zap size={16} />
          <Sparkles size={14} />
        </div>
      </div>

      <div className="date-inputs-container">
        {/* Start Date */}
        <div className="date-input-wrapper start-date">
          <div className="input-icon">
            <Calendar size={16} />
          </div>
          <input
            type="date"
            value={value.start}
            onChange={(e) => handleStartDateChange(e.target.value)}
            min={today}
            className="date-input start-input"
            placeholder="Start Date"
          />
          <div className="input-emoji">🗓️</div>
        </div>

        {/* End Date */}
        <div className="date-input-wrapper end-date">
          <div className="input-icon">
            <Calendar size={16} />
          </div>
          <input
            type="date"
            value={value.end}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={value.start || today}
            className="date-input end-input"
            placeholder="End Date"
          />
          <div className="input-emoji">📆</div>
        </div>
      </div>

      <div className="date-range-message">
        <span className="message-text">Pick your perfect learning dates </span>
        <span className="message-sparkle">⏰</span>
      </div>
    </div>
  );
};

export default DateRangePicker;
