import React, { useEffect, useRef, useState } from 'react';
import { Event } from '../types';
import { MapPin, Navigation, Zap, X } from 'lucide-react';

interface MapViewProps {
  events: Event[];
}

interface SelectedEvent extends Event {
  position: { lat: number; lng: number };
}

const MapView: React.FC<MapViewProps> = ({ events }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Mock coordinates for zip codes (in real app, you'd use geocoding API)
  const getCoordinatesForZip = (zipCode: string) => {
    const zipCoords: { [key: string]: { lat: number; lng: number } } = {
      '94306': { lat: 37.4419, lng: -122.1430 }, // Palo Alto
      '94301': { lat: 37.4419, lng: -122.1419 }, // Stanford
      '94305': { lat: 37.4275, lng: -122.1697 }, // Stanford University
      '94302': { lat: 37.4530, lng: -122.1817 }, // Menlo Park
      '94304': { lat: 37.4688, lng: -122.1411 }, // East Palo Alto
    };
    return zipCoords[zipCode] || { lat: 37.4419, lng: -122.1430 };
  };

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 37.4419, lng: -122.1430 },
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#e8f4fd' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#a2d2ff' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [{ color: '#cfe2f3' }]
          }
        ]
      });

      setMap(mapInstance);
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Create new markers for events
    const newMarkers: google.maps.Marker[] = [];

    events.forEach((event) => {
      const position = getCoordinatesForZip(event.location_zip);
      
      // Create custom marker icon based on event type
      const getMarkerIcon = (type: string) => {
        const colors = {
          'Workshop': '#3b82f6', // Blue
          'Drop-in Help': '#10b981', // Green
          'Seminar': '#8b5cf6' // Purple
        };
        
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: colors[type as keyof typeof colors] || '#6b7280',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        };
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: event.event_name,
        icon: getMarkerIcon(event.type),
        animation: google.maps.Animation.DROP
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        setSelectedEvent({ ...event, position });
        
        // Animate marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2000);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, events]);

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'Workshop':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Drop-in Help':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Seminar':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-pink-200 to-blue-200">
      {/* Colorful Map Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white opacity-10 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold drop-shadow-lg">🗺️ Interactive Event Map</h3>
              <p className="text-purple-100 mt-1 font-medium">Click on colorful pins to view event details! 📍</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Navigation className="w-5 h-5" />
            <span className="font-semibold">{events.length} Events</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="h-96 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"
        >
          {/* Fallback content while Google Maps loads */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-700 mb-3">🌟 Loading Interactive Map... 🌟</h4>
              <p className="text-gray-600 max-w-md font-medium">
                Get ready to explore colorful event locations with clickable pins! 
                Each pin shows amazing TMK events near you! 🎯
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Event Popup */}
        {selectedEvent && (
          <div className="absolute top-4 left-4 right-4 bg-white rounded-2xl shadow-2xl border-4 border-gradient-to-r from-yellow-300 to-pink-300 z-10 max-w-md mx-auto">
            <div className={`${getEventTypeStyle(selectedEvent.type)} p-4 text-white rounded-t-xl relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-20 rounded-full -mr-8 -mt-8 animate-spin" style={{ animationDuration: '10s' }}></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold drop-shadow-lg">{selectedEvent.event_name}</h4>
                  <p className="text-sm opacity-90 font-medium">{selectedEvent.type} 🎯</p>
                </div>
                <button
                  onClick={closeEventDetails}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-white to-blue-50">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold">{selectedEvent.location}</p>
                    <p className="text-sm text-blue-600">📍 {selectedEvent.location_zip}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🕐</span>
                  </div>
                  <div>
                    <p className="font-bold">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                    <p className="text-sm text-green-600">{selectedEvent.time}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Register Now! 🚀
                </button>
                <button 
                  onClick={closeEventDetails}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colorful Event Legend */}
      <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-t-4 border-gradient-to-r from-blue-300 to-pink-300">
        <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">🎨 Event Type Guide 🎨</h4>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center bg-white p-3 rounded-xl shadow-lg border-2 border-blue-200 hover:scale-105 transition-transform duration-200">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 shadow-md animate-pulse"></div>
            <span className="font-semibold text-blue-700">🎯 Workshop</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-xl shadow-lg border-2 border-green-200 hover:scale-105 transition-transform duration-200">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3 shadow-md animate-pulse"></div>
            <span className="font-semibold text-green-700">🤝 Drop-in Help</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-xl shadow-lg border-2 border-purple-200 hover:scale-105 transition-transform duration-200">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-3 shadow-md animate-pulse"></div>
            <span className="font-semibold text-purple-700">📚 Seminar</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600 font-medium">
            🌟 Click any pin to see event details and register! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

// Add global initMap function for Google Maps callback
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default MapView;
