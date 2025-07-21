import React from "react";

const LANGUAGES = ["English", "Urdu", "Spanish", "Chinese", "French"];

const LanguageFilter = ({ selectedLanguages = [], onChange }) => {
  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      onChange(selectedLanguages.filter((l) => l !== lang));
    } else {
      onChange([...selectedLanguages, lang]);
    }
  };

  return (
    <div className="language-filter">
      <div className="filter-label">Languages:</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => toggleLanguage(lang)}
            className={selectedLanguages.includes(lang) ? "selected" : ""}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;
