import React from 'react';

const languages = [
  { value: '', label: 'All Languages' },
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Mandarin', label: 'Mandarin' },
  { value: 'French', label: 'French' },
  { value: 'Korean', label: 'Korean' }
];

const LanguageFilter = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Language
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-slate-800 appearance-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageFilter;
