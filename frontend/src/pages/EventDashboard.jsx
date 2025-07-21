import React, { useState, useEffect } from 'react';
import ZipCodeInput from '../components/ZipCodeInput';
import EventTypeFilter from '../components/EventTypeFilter';
import LanguageFilter from '../components/LanguageFilter';
import DateRangePicker from '../components/DateRangePicker';
import EventCard from '../components/EventCard';
import MapView from '../components/MapView';
import AnimatedHeader from '../components/AnimatedHeader';
import { eventApi } from '../services/eventApi';
import { Event, FilterState } from '../types';
import { Sparkles, RefreshCw, Map, List, Heart } from 'lucide-react';

const EventDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    zipCode: '',
    eventType: '',
    language: '',
    dateRange: { start: '', end: '' }
  });

  useEffect(() => {
    loadInitialEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [filters, events]);

  const loadInitialEvents = async () => {
    setLoading(true);
    try {
      const data = await eventApi.getAllEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = async () => {
    if (!filters.zipCode && !filters.eventType && !filters.language && !filters.dateRange.start) {
      setFilteredEvents(events);
      return;
    }

    setLoading(true);
    try {
      const filtered = await eventApi.filterEvents(filters);
      setFilteredEvents(filtered);
    } catch (error) {
      console.error('Error filtering events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      zipCode: '',
      eventType: '',
      language: '',
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 via-purple-100 to-cyan-100">
      <AnimatedHeader />
      
      <div className="container mx-auto px-4 py-12">
        {/* Super Colorful Search Controls */}
        <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border-4 border-gradient-to-r from-pink-200 via-blue-200 to-purple-200 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 opacity-20 rounded-full -mr-16 -mt-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-300 opacity-20 rounded-full -ml-12 -mb-12 animate-bounce"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                🎯 Find Your Perfect Tech Learning Experience! 🎯
                <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
              </h2>
              <p className="text-gray-600 font-medium text-lg">
                Use our colorful filters to discover amazing events near you! 🌈
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ZipCodeInput
                value={filters.zipCode}
                onChange={(value) => handleFilterChange('zipCode', value)}
              />
              <EventTypeFilter
                value={filters.eventType}
                onChange={(value) => handleFilterChange('eventType', value)}
              />
              <LanguageFilter
                value={filters.language}
                onChange={(value) => handleFilterChange('language', value)}
              />
              <DateRangePicker
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button
                onClick={clearAllFilters}
                className="px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-110 shadow-xl flex items-center gap-3 transform hover:-translate-y-1"
              >
                <RefreshCw className="w-5 h-5" />
                🔄 Clear All Filters
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-110 shadow-xl flex items-center gap-3 transform hover:-translate-y-1"
              >
                {showMap ? (
                  <>
                    <List className="w-5 h-5" />
                    📋 Show List View
                  </>
                ) : (
                  <>
                    <Map className="w-5 h-5" />
                    🗺️ Show Map View
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Colorful Results Count */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white p-6 rounded-3xl shadow-2xl border-4 border-white">
            <h2 className="text-3xl font-bold mb-2 drop-shadow-lg flex items-center justify-center gap-3">
              🎉 Found {filteredEvents.length} Amazing Events! 🎉
            </h2>
            <p className="text-yellow-100 font-semibold text-lg flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 animate-pulse" />
              Discover life-changing tech learning with Tech Me Kid!
              <Heart className="w-5 h-5 animate-pulse" />
            </p>
          </div>
        </div>

        {/* Super Colorful Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-4"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-300 opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                🔍 Finding amazing events for you... 🔍
                <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              </span>
            </div>
          </div>
        )}

        {/* Map or List View */}
        {!loading && (
          <>
            {showMap ? (
              <MapView events={filteredEvents} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    onLocationClick={() => {
                      setShowMap(true);
                      // In a real app, you'd center the map on this event
                    }}
                  />
                ))}
                {filteredEvents.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 shadow-2xl border-4 border-gradient-to-r from-blue-200 to-purple-200">
                      <div className="text-gray-400 mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                          <span className="text-4xl">🔍</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-3">
                        <span>😔</span> No events found <span>😔</span>
                      </h3>
                      <p className="text-gray-600 text-lg font-medium mb-6">
                        Don't worry! Try adjusting your colorful filters or search in a different area. 🌈
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-xl flex items-center gap-3 mx-auto"
                      >
                        <RefreshCw className="w-5 h-5" />
                        🔄 Reset Filters & Try Again!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
