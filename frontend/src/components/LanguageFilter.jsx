import React from 'react';
import { Globe, Zap } from 'lucide-react';

interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { value: '', label: 'All Languages', emoji: '🌍', flag: '🌈' },
  { value: 'English', label: 'English', emoji: '🇺🇸', flag: '🇺🇸' },
  { value: 'Spanish', label: 'Spanish', emoji: '🇪🇸', flag: '🇪🇸' },
  { value: 'Mandarin', label: 'Mandarin', emoji: '🇨🇳', flag: '🇨🇳' },
  { value: 'French', label: 'French', emoji: '🇫🇷', flag: '🇫🇷' },
  { value: 'Korean', label: 'Korean', emoji: '🇰🇷', flag: '🇰🇷' }
];

const LanguageFilter: React.FC<LanguageFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative group">
      <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <span className="text-lg">🌍</span>
        Language
        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Globe className="h-4 w-4 text-white" />
          </div>
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-14 pr-12 py-4 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all duration-300 bg-gradient-to-r from-white to-green-50 backdrop-blur-sm shadow-lg hover:shadow-xl appearance-none cursor-pointer font-medium text-gray-800 group-hover:scale-105"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
            <span className="text-xl">🗣️</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
        <span className="text-sm">🌟</span>
        Learn in your preferred language!
      </p>
    </div>
  );
};

export default LanguageFilter;
