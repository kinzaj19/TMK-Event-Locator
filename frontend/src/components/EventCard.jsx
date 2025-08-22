import React from 'react';
import { MapPin, Clock, User, Users, Globe, Calendar, Phone } from 'lucide-react';

const EventCard = ({ event, onLocationClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageFlag = (language) => {
    switch (language) {
      case 'Spanish': return '🇪🇸';
      case 'Mandarin': return '🇨🇳';
      case 'French': return '🇫🇷';
      case 'Korean': return '🇰🇷';
      default: return '🇺🇸';
    }
  };

  // Get course-specific image based on event name and type
  const getCourseImage = (eventName, eventType) => {
    const name = eventName.toLowerCase();
    
    if (name.includes('email')) {
      return 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('smartphone') || name.includes('phone')) {
      return 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('social media') || name.includes('safety')) {
      return 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('video') || name.includes('chat') || name.includes('family')) {
      return 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('banking') || name.includes('finance')) {
      return 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('photo') || name.includes('picture')) {
      return 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (name.includes('shopping') || name.includes('internet')) {
      return 'https://images.pexels.com/photos/4348066/pexels-photo-4348066.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else if (eventType === 'Drop-in Help') {
      return 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    } else {
      // Default tech learning image
      return 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={getCourseImage(event.event_name, event.type)}
          alt={event.event_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
          FREE
        </div>
        {event.spotsRemaining === 0 && (
          <div className="absolute top-3 right-3 bg-gray-600 text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
            FULL
          </div>
        )}
        {/* Event Type Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 text-xs font-semibold rounded-full">
          {event.type}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Date and Time */}
        <div className="text-blue-600 text-sm font-semibold mb-2">
          {formatDate(event.date)}
        </div>
        <div className="text-slate-500 text-sm mb-4">
          {formatTime(event.time)} EDT / {formatTime(event.time)} CDT / {formatTime(event.time)} MDT / {formatTime(event.time)} PDT
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
          {event.event_name}
        </h3>

        {/* Instructor */}
        {event.instructor && (
          <div className="mb-3">
            <span className="text-slate-600 text-sm">Trainer: </span>
            <span className="text-green-600 font-semibold text-sm">{event.instructor}</span>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{event.location} - {event.location_zip}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Globe className="w-4 h-4 text-green-600" />
            <span>{getLanguageFlag(event.language)} {event.language}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{event.maxCapacity - event.spotsRemaining} registered / {event.maxCapacity} capacity</span>
          </div>
        </div>

        {/* Registration Status */}
        {event.spotsRemaining === 0 ? (
          <div className="text-red-600 text-sm font-medium mb-4 bg-red-50 p-2 rounded-lg">
            Registration required - Join waitlist available
          </div>
        ) : (
          <div className="text-green-700 text-sm mb-4 bg-green-50 p-2 rounded-lg">
            Registration available. {event.spotsRemaining} spots remaining.
          </div>
        )}

        {/* Action Button */}
        <button 
          className={`w-full py-3 px-4 font-semibold text-sm rounded-lg transition-all duration-300 ${
            event.spotsRemaining === 0 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-md hover:shadow-lg'
          }`}
          disabled={event.spotsRemaining === 0}
        >
          {event.spotsRemaining === 0 ? 'JOIN WAITLIST' : 'REGISTER NOW'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
