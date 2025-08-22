import React from 'react';

const eventTypes = [
  { value: '', label: 'All Class Types' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Drop-in Help', label: 'Drop-in Help' },
  { value: 'Seminar', label: 'Seminar' }
];

const EventTypeFilter = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Class Type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 appearance-none cursor-pointer"
      >
        {eventTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventTypeFilter;
