import React, { useEffect, useRef } from "react";

// Usage:
// <MapView events={[{ name, zipCode, ... }]} />
// Add your Google Maps API key below
const GOOGLE_MAPS_API_KEY = ""; // <-- Insert your API key here

const MapView = ({ events = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !window.google) return;
    if (!mapRef.current) return;
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 39.5, lng: -98.35 }, // Center of US
        zoom: 4,
      });
    }
    // Clear previous markers
    if (mapInstance.current.markers) {
      mapInstance.current.markers.forEach((m) => m.setMap(null));
    }
    mapInstance.current.markers = [];
    // Geocode zip codes and add markers
    const geocoder = new window.google.maps.Geocoder();
    events.forEach((event) => {
      if (event.zipCode) {
        geocoder.geocode({ address: event.zipCode }, (results, status) => {
          if (status === "OK" && results[0]) {
            const marker = new window.google.maps.Marker({
              map: mapInstance.current,
              position: results[0].geometry.location,
              title: event.name,
            });
            mapInstance.current.markers.push(marker);
          }
        });
      }
    });
  }, [events]);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || window.google) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => {};
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{ color: "#888", margin: "1rem 0" }}>
        Map unavailable: Add your Google Maps API key in MapView.jsx
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        margin: "1rem 0",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #eee",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapView;
