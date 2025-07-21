import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Usage:
// <DateRangePicker
//   range={{ startDate, endDate }}
//   onChange={({ startDate, endDate }) => ...}
// />

const DateRangePicker = ({ range, onChange }) => {
  const selectionRange = {
    startDate: range?.startDate || new Date(),
    endDate: range?.endDate || new Date(),
    key: "selection",
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    onChange && onChange({ startDate, endDate });
  };

  return (
    <div>
      <div className="filter-label">Date Range:</div>
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        showSelectionPreview={true}
        editableDateInputs={true}
        maxDate={new Date(2100, 0, 1)}
      />
    </div>
  );
};

export default DateRangePicker;
