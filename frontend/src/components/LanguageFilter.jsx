import React from "react";
import { Globe, Zap, Sparkles } from "lucide-react";

const LANGUAGES = [
  "English",
  "Urdu",
  "Spanish",
  "Chinese",
  "French",
  "Korean",
  "Vietnamese",
];

const LanguageFilter = ({ selectedLanguages = [], onChange }) => {
  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      onChange([]);
    } else {
      onChange([selectedValue]);
    }
  };

  return (
    <div className="language-picker">
      <div className="language-header">
        <div className="header-icon">
          <Globe size={20} />
        </div>
        <span className="header-title">Language</span>
        <div className="header-sparkles">
          <Zap size={16} />
          <Sparkles size={14} />
        </div>
      </div>

      <div className="language-container">
        <select
          value={selectedLanguages.length > 0 ? selectedLanguages[0] : ""}
          onChange={handleLanguageChange}
          className="language-select"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="input-emoji">🌍</div>
      </div>

      <div className="example-text">Learn in your preferred language!</div>
    </div>
  );
};

export default LanguageFilter;
