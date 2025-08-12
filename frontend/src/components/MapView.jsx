import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = ({ events = [] }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

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

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Create map instance
      const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add markers for each location with events
      locationsWithEvents.forEach((location) => {
        const marker = L.marker([location.lat, location.lng]).addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <h3 style="margin: 0 0 10px 0; color: #333;">📍 ${
                location.city
              }</h3>
              <p style="margin: 0; color: #666;">
                ${eventsByZip[location.zip].length} event${
          eventsByZip[location.zip].length > 1 ? "s" : ""
        } in this area
              </p>
              <button 
                onclick="window.selectLocation('${location.zip}')"
                style="
                  background: #ff6b6b; 
                  color: white; 
                  border: none; 
                  padding: 8px 16px; 
                  border-radius: 8px; 
                  cursor: pointer; 
                  margin-top: 10px;
                "
              >
                View Events
              </button>
            </div>
          `);

        // Store marker reference for potential future use
        location.marker = marker;
      });

      // Fit map to show all markers
      if (locationsWithEvents.length > 0) {
        const group = new L.featureGroup(
          locationsWithEvents.map((loc) => loc.marker)
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locationsWithEvents, eventsByZip]);

  // Add global function for marker popup buttons
  useEffect(() => {
    window.selectLocation = (zipCode) => {
      const location = locationsWithEvents.find((loc) => loc.zip === zipCode);
      if (location) {
        setSelectedLocation(location);
      }
    };

    return () => {
      delete window.selectLocation;
    };
  }, [locationsWithEvents]);

  const handleLocationClick = (location) => {
    setSelectedLocation(
      selectedLocation?.zip === location.zip ? null : location
    );
  };

  return (
    <div
      ref={mapRef}
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
          zIndex: 1000,
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
            zIndex: 1000,
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
            zIndex: 1000,
          }}
        >
          💡 Click pins to see events
        </div>
      )}
    </div>
  );
};

export default MapView;
