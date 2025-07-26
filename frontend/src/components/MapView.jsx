import React, { useState } from "react";

const MapView = ({ events = [] }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Create a map that shows all event locations with interactive pins
  const eventLocations = [
    {
      zip: "10001",
      lat: 40.7505,
      lng: -73.9934,
      name: "New York",
      city: "New York, NY",
    },
    {
      zip: "60616",
      lat: 41.8781,
      lng: -87.6298,
      name: "Chicago",
      city: "Chicago, IL",
    },
    {
      zip: "94105",
      lat: 37.7749,
      lng: -122.4194,
      name: "San Francisco",
      city: "San Francisco, CA",
    },
    {
      zip: "90210",
      lat: 34.0736,
      lng: -118.4004,
      name: "Beverly Hills",
      city: "Beverly Hills, CA",
    },
  ];

  // Group events by zip code
  const eventsByZip = events.reduce((acc, event) => {
    if (!acc[event.zipCode]) {
      acc[event.zipCode] = [];
    }
    acc[event.zipCode].push(event);
    return acc;
  }, {});

  // Get locations that have events
  const locationsWithEvents = eventLocations.filter(
    (loc) => eventsByZip[loc.zip] && eventsByZip[loc.zip].length > 0
  );

  // Create map URL with markers for each location that has events
  let mapUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=-98.35,39.5,-98.35,39.5&layer=mapnik";

  if (locationsWithEvents.length > 0) {
    // Center map on the first location with events (without default marker)
    const firstLoc = locationsWithEvents[0];
    mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
      firstLoc.lng - 0.1
    },${firstLoc.lat - 0.1},${firstLoc.lng + 0.1},${
      firstLoc.lat + 0.1
    }&layer=mapnik`;
  }

  const handleLocationClick = (location) => {
    setSelectedLocation(
      selectedLocation?.zip === location.zip ? null : location
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: 600,
        margin: "2rem 0",
        borderRadius: 16,
        overflow: "hidden",
        border: "3px solid #e0e7ff",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
        position: "relative",
        background: "transparent",
        isolation: "isolate",
      }}
    >
      <iframe
        title="Events Map"
        src={mapUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
        allowFullScreen
        frameBorder="0"
        scrolling="no"
      />

      {/* Event count overlay */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "12px 16px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          maxWidth: "300px",
        }}
      >
        🗺️ {events.length} Events Found
        <div style={{ fontSize: "14px", marginTop: "4px", color: "#666" }}>
          {locationsWithEvents.length > 0 && (
            <span>
              📍 {locationsWithEvents.length} location
              {locationsWithEvents.length > 1 ? "s" : ""} with events
            </span>
          )}
        </div>
      </div>

      {/* Interactive location pins */}
      {locationsWithEvents.map((location, index) => (
        <div
          key={location.zip}
          style={{
            position: "absolute",
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          {/* Pin */}
          <div
            onClick={() => handleLocationClick(location)}
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #ff6b6b, #ff8e8e)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)",
              border: "3px solid white",
              transition: "all 0.3s ease",
              transform:
                selectedLocation?.zip === location.zip
                  ? "scale(1.2)"
                  : "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                selectedLocation?.zip === location.zip
                  ? "scale(1.2)"
                  : "scale(1)";
            }}
          >
            📍
          </div>

          {/* Pin label */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.95)",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#333",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {location.name}
          </div>
        </div>
      ))}

      {/* Event details popup */}
      {selectedLocation && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.98)",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                color: "#333",
              }}
            >
              📍 {selectedLocation.city} Events
            </h3>
            <button
              onClick={() => setSelectedLocation(null)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
                padding: "4px",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}
          >
            {eventsByZip[selectedLocation.zip].length} event
            {eventsByZip[selectedLocation.zip].length > 1 ? "s" : ""} in this
            area
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {eventsByZip[selectedLocation.zip].map((event, index) => (
              <div
                key={event.id}
                style={{
                  padding: "12px",
                  background: "linear-gradient(135deg, #f8f9ff, #e8f4fd)",
                  borderRadius: "10px",
                  border: "1px solid #e0e7ff",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px",
                  }}
                >
                  {event.name}
                </div>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  📅 {new Date(event.date).toLocaleDateString()} | 🏷️{" "}
                  {event.type} | 🌍 {event.language}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedLocation && locationsWithEvents.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#666",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          💡 Click pins to see events
        </div>
      )}
    </div>
  );
};

export default MapView;
