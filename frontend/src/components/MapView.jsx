import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, X, Phone, Heart } from 'lucide-react';

const MapView = ({ events }) => {
  const mapRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Mock coordinates for zip codes
  const getCoordinatesForZip = (zipCode) => {
    const zipCoords = {
      '94306': { lat: 37.4419, lng: -122.1430 },
      '94301': { lat: 37.4419, lng: -122.1419 },
      '94305': { lat: 37.4275, lng: -122.1697 },
      '94302': { lat: 37.4530, lng: -122.1817 },
      '94304': { lat: 37.4688, lng: -122.1411 },
    };
    return zipCoords[zipCode] || { lat: 37.4419, lng: -122.1430 };
  };

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 37.4419, lng: -122.1430 },
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f0f9ff' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#3b82f6' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f0fdf4' }]
          }
        ]
      });

      setMap(mapInstance);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap`;
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

    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers = [];

    events.forEach((event) => {
      const position = getCoordinatesForZip(event.location_zip);
      
      const marker = new google.maps.Marker({
        position,
        map,
        title: event.event_name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: '#16a34a',
          strokeWeight: 3,
          scale: 10
        }
      });

      marker.addListener('click', () => {
        setSelectedEvent({ ...event, position });
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, events]);

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5" />
            <h3 className="text-xl font-bold">Class Locations</h3>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            <span className="font-semibold">{events.length} Classes Available</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="h-96 bg-gradient-to-br from-blue-50 to-green-50"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-700 mb-2">Loading Interactive Map...</h4>
              <p className="text-slate-600">
                Interactive map with class locations will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Selected Event Popup */}
        {selectedEvent && (
          <div className="absolute top-4 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold">{selectedEvent.event_name}</h4>
                  <p className="text-sm opacity-90">{selectedEvent.type}</p>
                </div>
                <button
                  onClick={closeEventDetails}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">{selectedEvent.location}</p>
                    <p className="text-sm text-slate-600">Zip Code: {selectedEvent.location_zip}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="text-green-600 text-lg">📅</span>
                  <div>
                    <p className="font-semibold">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-600">{selectedEvent.time}</p>
                  </div>
                </div>

                {selectedEvent.instructor && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-blue-600 text-lg">👨‍🎓</span>
                    <div>
                      <p className="text-sm text-slate-600">Trainer:</p>
                      <p className="font-semibold text-green-600">{selectedEvent.instructor}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg">
                  Register Now
                </button>
                <button 
                  onClick={closeEventDetails}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 font-medium transition-colors rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Footer */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-green-600" />
            <span className="text-slate-700 font-medium">Student-Led Nonprofit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
