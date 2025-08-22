import React from 'react';
import { Computer, Users, BookOpen, Phone, MapPin, Calendar, Heart, GraduationCap, Mail, Globe } from 'lucide-react';

const AnimatedHeader = () => {
  return (
    <header className="relative bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                  <GraduationCap className="text-white w-7 h-7" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-800 tracking-wide">
                    TECH ME KID
                  </span>
                  <div className="text-xs text-green-600 font-semibold uppercase tracking-wide">Student-Led Nonprofit</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm uppercase tracking-wide">Digital Learning</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm uppercase tracking-wide">About</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm uppercase tracking-wide">Contact</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm uppercase tracking-wide">Volunteer</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm uppercase tracking-wide">
                  Support Our Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Video Background */}
      <div className="relative">
        {/* Video Background */}
        {/* Background Image - Using attached image */}
        <div className="relative h-[400px] overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/image.png')`
            }}
          ></div>
          
          {/* Blue/Green Gradient Overlay - lighter to show image better */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-green-900/60"></div>
          
          <div className="relative container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-4xl">
              <div className="mb-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/30">
                  Bridging Generations Through Technology
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Empowering Seniors Through
                <span className="block text-green-300">Student-Led Education</span>
              </h1>
              
              <p className="text-lg mb-6 leading-relaxed text-blue-100 max-w-3xl">
                Tech Me Kid connects passionate student volunteers with senior citizens, providing life-changing 
                tech education that fosters independence and connection in the digital age.
              </p>
              
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-md font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                  Find Classes Near You
                </button>
                <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-6 py-3 rounded-md font-semibold text-base transition-all duration-300 uppercase tracking-wide">
                  Become a Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Tab */}
        <div className="absolute top-6 right-8 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wide">Student-Led Mission</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default AnimatedHeader;
