import React from 'react';
import { MapPin } from 'lucide-react';

const ZipCodeInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Zip Code
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter zip code"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-800 placeholder-slate-500"
          maxLength={5}
        />
        <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
      </div>
    </div>
  );
};

export default ZipCodeInput;
