import React, { useState } from "react";

const ZipCodeInput = ({ onZipCodeChange }) => {
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setZip(value);
    // US ZIP code validation (5 digits)
    if (/^\d{5}$/.test(value)) {
      setError("");
      if (onZipCodeChange) onZipCodeChange(value);
    } else {
      setError("Enter a valid 5-digit ZIP code");
    }
  };

  return (
    <div className="zip-input">
      <label htmlFor="zip-input" className="filter-label">
        Enter ZIP Code:
      </label>
      <input
        id="zip-input"
        type="text"
        value={zip}
        onChange={handleChange}
        maxLength={5}
        placeholder="e.g. 12345"
      />
      {error && zip.length === 5 && (
        <div style={{ color: "#ff4e50", fontSize: 12, marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ZipCodeInput;
