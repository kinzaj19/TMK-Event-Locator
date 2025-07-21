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
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: 4 }}>Languages:</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => toggleLanguage(lang)}
            style={{
              padding: "6px 14px",
              borderRadius: 16,
              border: selectedLanguages.includes(lang)
                ? "2px solid #007bff"
                : "1px solid #ccc",
              background: selectedLanguages.includes(lang) ? "#e6f0ff" : "#fff",
              color: selectedLanguages.includes(lang) ? "#007bff" : "#333",
              cursor: "pointer",
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;
