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
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="zip-input" style={{ display: "block", marginBottom: 4 }}>
        Enter ZIP Code:
      </label>
      <input
        id="zip-input"
        type="text"
        value={zip}
        onChange={handleChange}
        maxLength={5}
        style={{
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          width: 120,
        }}
        placeholder="e.g. 12345"
      />
      {error && zip.length === 5 && (
        <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{error}</div>
      )}
    </div>
  );
};

export default ZipCodeInput;
