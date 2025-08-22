import React from 'react';

const DateRangePicker = ({ value, onChange }) => {
  const handleStartDateChange = (start) => {
    onChange({ ...value, start });
  };

  const handleEndDateChange = (end) => {
    onChange({ ...value, end });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Date Range
      </label>
      <div className="space-y-2">
        <input
          type="date"
          value={value.start}
          onChange={(e) => handleStartDateChange(e.target.value)}
          min={today}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={value.end}
          onChange={(e) => handleEndDateChange(e.target.value)}
          min={value.start || today}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-slate-800"
          placeholder="End Date"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
