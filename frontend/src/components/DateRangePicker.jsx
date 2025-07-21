import React from 'react';
import { Calendar, Zap } from 'lucide-react';

interface DateRangePickerProps {
  value: { start: string; end: string };
  onChange: (value: { start: string; end: string }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const handleStartDateChange = (start: string) => {
    onChange({ ...value, start });
  };

  const handleEndDateChange = (end: string) => {
    onChange({ ...value, end });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative group">
      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-lg">📅</span>
        Date Range
        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
      </label>
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Calendar className="h-3 w-3 text-white" />
            </div>
          </div>
          <input
            type="date"
            value={value.start}
            onChange={(e) => handleStartDateChange(e.target.value)}
            min={today}
            className="w-full pl-12 pr-4 py-3 border-3 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300 bg-gradient-to-r from-white to-orange-50 backdrop-blur-sm shadow-lg hover:shadow-xl text-sm font-medium text-gray-800 group-hover:scale-105"
            placeholder="Start Date"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-lg">🗓️</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Calendar className="h-3 w-3 text-white" />
            </div>
          </div>
          <input
            type="date"
            value={value.end}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={value.start || today}
            className="w-full pl-12 pr-4 py-3 border-3 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 bg-gradient-to-r from-white to-pink-50 backdrop-blur-sm shadow-lg hover:shadow-xl text-sm font-medium text-gray-800 group-hover:scale-105"
            placeholder="End Date"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-lg">📆</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-orange-600 mt-2 font-medium flex items-center gap-1">
        <span className="text-sm">⏰</span>
        Pick your perfect learning dates!
      </p>
    </div>
  );
};

export default DateRangePicker;
