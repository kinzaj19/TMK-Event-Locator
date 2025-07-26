import React, { useState } from "react";
import { MapPin, Zap, Sparkles } from "lucide-react";

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
    <div className="zip-code-picker">
      <div className="zip-code-header">
        <div className="header-icon">
          <MapPin size={20} />
        </div>
        <span className="header-title">Zip Code</span>
        <div className="header-sparkles">
          <Zap size={16} />
          <Sparkles size={14} />
        </div>
      </div>

      <div className="zip-input-container">
        <div className="input-icon">
          <MapPin size={16} />
        </div>
        <input
          type="text"
          value={zip}
          onChange={handleChange}
          maxLength={5}
          placeholder="Enter zip code"
          className="zip-input"
        />
        <div className="input-emoji">📍</div>
      </div>

      <div className="example-text">e.g., 94306 (Palo Alto area)</div>

      {error && zip.length === 5 && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default ZipCodeInput;
