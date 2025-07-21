import React from 'react';
import { MapPin, Clock, User, Users, Globe, BookOpen, Star, Heart, Zap } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onLocationClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onLocationClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'Workshop':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          badge: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300',
          icon: '🎯'
        };
      case 'Drop-in Help':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          badge: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300',
          icon: '🤝'
        };
      case 'Seminar':
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
          badge: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300',
          icon: '📚'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-500 to-slate-500',
          badge: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300',
          icon: '📋'
        };
    }
  };

  const getSpotsStyle = (spotsRemaining: number) => {
    if (spotsRemaining === 0) return { color: 'text-red-600', bg: 'bg-red-100', emoji: '❌' };
    if (spotsRemaining <= 5) return { color: 'text-orange-600', bg: 'bg-orange-100', emoji: '⚠️' };
    return { color: 'text-green-600', bg: 'bg-green-100', emoji: '✅' };
  };

  const getLanguageStyle = (language: string) => {
    switch (language) {
      case 'Spanish':
        return { bg: 'bg-gradient-to-r from-red-100 to-yellow-100', text: 'text-red-700', flag: '🇪🇸' };
      case 'Mandarin':
        return { bg: 'bg-gradient-to-r from-red-100 to-yellow-100', text: 'text-red-700', flag: '🇨🇳' };
      case 'French':
        return { bg: 'bg-gradient-to-r from-blue-100 to-red-100', text: 'text-blue-700', flag: '🇫🇷' };
      case 'Korean':
        return { bg: 'bg-gradient-to-r from-blue-100 to-red-100', text: 'text-blue-700', flag: '🇰🇷' };
      default:
        return { bg: 'bg-gradient-to-r from-blue-100 to-indigo-100', text: 'text-blue-700', flag: '🇺🇸' };
    }
  };

  const eventStyle = getEventTypeStyle(event.type);
  const spotsStyle = getSpotsStyle(event.spotsRemaining);
  const languageStyle = getLanguageStyle(event.language);

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-gradient-to-r hover:from-pink-300 hover:to-blue-300 group hover:scale-105 transform">
      {/* Colorful Header */}
      <div className={`${eventStyle.bg} p-6 text-white relative overflow-hidden`}>
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12 group-hover:animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full -ml-10 -mb-10 group-hover:animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-5 rounded-full group-hover:animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${eventStyle.badge} shadow-lg flex items-center gap-2`}>
              <span className="text-lg">{eventStyle.icon}</span>
              <BookOpen className="w-4 h-4" />
              {event.type}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${spotsStyle.bg} ${spotsStyle.color} shadow-lg flex items-center gap-1`}>
              <span>{spotsStyle.emoji}</span>
              {event.spotsRemaining} spots left
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 line-clamp-2 drop-shadow-lg">{event.event_name}</h3>
          
          {/* Fun Rating Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-300 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
            <span className="ml-2 text-sm font-medium">Perfect for Beginners!</span>
          </div>
        </div>
      </div>

      {/* Colorful Content */}
      <div className="p-6 bg-gradient-to-br from-white to-blue-50">
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-700 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{formatDate(event.date)}</p>
              <p className="text-sm text-blue-600 font-medium">{formatTime(event.time)} 🕐</p>
            </div>
          </div>

          <div 
            className="flex items-center text-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-102"
            onClick={onLocationClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{event.location}</p>
              <p className="text-sm text-green-600 font-medium">📍 Zip Code: {event.location_zip}</p>
            </div>
          </div>

          {event.instructor && (
            <div className="flex items-center text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Your Instructor</p>
                <p className="font-bold text-gray-800">{event.instructor} 👨‍🏫</p>
              </div>
            </div>
          )}

          <div className={`flex items-center text-gray-700 ${languageStyle.bg} p-3 rounded-xl border border-opacity-30 shadow-sm`}>
            <div className={`w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg`}>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-600 font-medium">Language</p>
              <p className={`font-bold ${languageStyle.text} flex items-center gap-2`}>
                <span className="text-lg">{languageStyle.flag}</span>
                {event.language}
              </p>
            </div>
          </div>
        </div>

        {/* Colorful Description */}
        {event.description && (
          <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200 shadow-sm">
            <p className="text-gray-700 text-sm leading-relaxed font-medium">{event.description}</p>
          </div>
        )}

        {/* Colorful Footer */}
        <div className="flex justify-center bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 shadow-sm">
          <button 
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
              event.spotsRemaining === 0 
                ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 hover:shadow-xl transform hover:scale-110 hover:-translate-y-1'
            }`}
            disabled={event.spotsRemaining === 0}
          >
            {event.spotsRemaining === 0 ? (
              <span className="flex items-center gap-2">
                <span>😔</span> Fully Booked
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Register Now! 🚀
              </span>
            )}
          </button>
        </div>

        {/* Fun Encouragement Badge */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            <Heart className="w-4 h-4" />
            <span>You've got this! 💪</span>
            <Star className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
