import React, { useState, useEffect } from 'react';
import ZipCodeInput from '../components/ZipCodeInput';
import EventTypeFilter from '../components/EventTypeFilter';
import LanguageFilter from '../components/LanguageFilter';
import DateRangePicker from '../components/DateRangePicker';
import EventCard from '../components/EventCard';
import MapView from '../components/MapView';
import AnimatedHeader from '../components/AnimatedHeader';
import { eventApi } from '../services/eventApi';
import { RotateCcw, Map, List, Heart, Users } from 'lucide-react';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
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

  const handleFilterChange = (filterType, value) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AnimatedHeader />
      
      <div className="container mx-auto px-6 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Digital Learning Programs</h2>
              <p className="text-slate-600">Empowering seniors through student-led digital education</p>
            </div>
            <a href="#" className="text-blue-600 hover:text-green-600 font-semibold transition-colors">
              View All Classes →
            </a>
          </div>
        </div>

        {/* Search Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Filters
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {showMap ? (
                <>
                  <List className="w-4 h-4" />
                  List View
                </>
              ) : (
                <>
                  <Map className="w-4 h-4" />
                  Map View
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-blue-600">{filteredEvents.length}</span> of <span className="font-semibold">{events.length}</span> classes
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <span className="text-xl font-semibold text-slate-700">
                Loading classes...
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    onLocationClick={() => {
                      setShowMap(true);
                    }}
                  />
                ))}
                {filteredEvents.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <div className="bg-white border border-gray-200 rounded-xl p-12 max-w-2xl mx-auto shadow-lg">
                      <div className="text-slate-400 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Map className="w-10 h-10 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-700 mb-4">
                        No classes found
                      </h3>
                      <p className="text-slate-600 text-lg mb-6">
                        Try adjusting your search criteria or expanding your search area to find more classes.
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 rounded-lg flex items-center gap-2 mx-auto shadow-md hover:shadow-lg"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Reset Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Mission Statement Section */}
        {/* Mission Statement Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-8 shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6" />
                <h3 className="text-2xl font-bold uppercase tracking-wide">Our Mission</h3>
              </div>
              <p className="text-blue-100 mb-6 text-lg max-w-3xl mx-auto">
                Tech Me Kid is a student-led nonprofit dedicated to empowering senior citizens to become confident digital citizens. 
                We bridge the generational gap by connecting passionate trainers with seniors, providing life-changing 
                tech education that fosters independence and connection in the digital age.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-200">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Trainers Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
