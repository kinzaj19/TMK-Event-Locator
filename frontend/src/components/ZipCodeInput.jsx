import React from 'react';
import { MapPin, Zap } from 'lucide-react';

const ZipCodeInput = ({ value, onChange }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-lg">📍</span>
        Zip Code
        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <MapPin className="h-4 w-4 text-white" />
          </div>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter zip code"
          className="w-full pl-14 pr-4 py-4 border-3 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 bg-gradient-to-r from-white to-blue-50 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium text-gray-800 placeholder-gray-500 group-hover:scale-105"
          maxLength={5}
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-2xl">🎯</span>
        </div>
      </div>
      <p className="text-xs text-blue-600 mt-2 font-medium flex items-center gap-1">
        <span className="text-sm">💡</span>
        e.g., 94306 (Palo Alto area)
      </p>
    </div>
  );
};

export default ZipCodeInput;

