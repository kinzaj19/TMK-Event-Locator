import React from 'react';
import { BookOpen, Zap } from 'lucide-react';

const eventTypes = [
  { value: '', label: 'All Event Types', emoji: '🌈' },
  { value: 'Workshop', label: 'Workshop', emoji: '🎯' },
  { value: 'Drop-in Help', label: 'Drop-in Help', emoji: '🤝' },
  { value: 'Seminar', label: 'Seminar', emoji: '📚' }
];

const EventTypeFilter = ({ value, onChange }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-lg">🎯</span>
        Event Type
        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-14 pr-12 py-4 border-3 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 backdrop-blur-sm shadow-lg hover:shadow-xl appearance-none cursor-pointer font-medium text-gray-800 group-hover:scale-105"
        >
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.emoji} {type.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="text-xl">🎨</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-purple-600 mt-2 font-medium flex items-center gap-1">
        <span className="text-sm">✨</span>
        Choose your learning adventure!
      </p>
    </div>
  );
};

export default EventTypeFilter;
