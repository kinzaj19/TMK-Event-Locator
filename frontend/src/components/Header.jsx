import React from 'react';
import { Computer, Heart, Users, BookOpen, Smartphone, Wifi, Monitor, Mouse } from 'lucide-react';

const AnimatedHeader = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 via-blue-300 to-cyan-300 py-20 min-h-[400px]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Tech Icons */}
        <div className="absolute top-16 left-16 animate-bounce text-white opacity-80" style={{ animationDuration: '3s' }}>
          <Computer size={40} className="drop-shadow-lg" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse text-yellow-200 opacity-90" style={{ animationDuration: '2s' }}>
          <Smartphone size={35} className="drop-shadow-lg" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce text-green-200 opacity-80" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
          <Monitor size={45} className="drop-shadow-lg" />
        </div>
        <div className="absolute bottom-24 right-1/3 animate-pulse text-orange-200 opacity-90" style={{ animationDelay: '2s' }}>
          <Mouse size={32} className="drop-shadow-lg" />
        </div>
        <div className="absolute top-1/2 left-12 animate-bounce text-red-200 opacity-80" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
          <Wifi size={38} className="drop-shadow-lg" />
        </div>
        <div className="absolute top-20 right-1/4 animate-pulse text-indigo-200 opacity-90" style={{ animationDelay: '1.5s' }}>
          <BookOpen size={36} className="drop-shadow-lg" />
        </div>
        
        {/* Cartoonish Senior + Computer Illustrations */}
        <div className="absolute top-12 left-1/3 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4s' }}>
          <div className="relative">
            {/* Senior Person 1 */}
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="text-2xl">👵</div>
            </div>
            {/* Laptop */}
            <div className="absolute -bottom-2 -right-2 w-8 h-6 bg-gray-700 rounded-sm border-2 border-white shadow-md">
              <div className="w-full h-3 bg-blue-400 rounded-t-sm"></div>
            </div>
            {/* Heart bubble */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center animate-pulse">
              <Heart size={12} className="text-white" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <div className="relative">
            {/* Senior Person 2 */}
            <div className="w-18 h-18 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="text-3xl">👴</div>
            </div>
            {/* Tablet */}
            <div className="absolute -bottom-1 -left-3 w-10 h-8 bg-white rounded border-2 border-gray-300 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-green-300 to-blue-300 rounded"></div>
            </div>
            {/* Success bubble */}
            <div className="absolute -top-4 -left-2 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3s' }}>
          <div className="relative">
            {/* Senior Person 3 */}
            <div className="w-14 h-14 bg-gradient-to-br from-green-200 to-teal-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="text-xl">👩‍🦳</div>
            </div>
            {/* Phone */}
            <div className="absolute -bottom-1 -right-1 w-4 h-7 bg-black rounded border border-white shadow-md">
              <div className="w-full h-4 bg-blue-300 rounded-t"></div>
            </div>
            {/* Learning bubble */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs">💡</span>
            </div>
          </div>
        </div>

        {/* Floating Colorful Circles */}
        <div className="absolute top-1/4 left-1/2 w-24 h-24 bg-gradient-to-br from-pink-300 to-red-300 opacity-30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 opacity-40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-green-300 to-teal-300 opacity-35 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Moving Rainbow Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse opacity-60" style={{ animationDuration: '6s' }}></div>
        
        {/* Floating Learning Elements */}
        <div className="absolute top-20 left-1/2 animate-float">
          <div className="text-4xl opacity-70">📱</div>
        </div>
        <div className="absolute bottom-32 left-1/5 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-3xl opacity-60">💻</div>
        </div>
        <div className="absolute top-1/3 left-1/6 animate-float" style={{ animationDelay: '2s' }}>
          <div className="text-3xl opacity-70">🖱️</div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="relative container mx-auto px-4 text-center text-white z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-4 mb-6">
            {/* Animated Logo/Icon */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-100 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50">
                <Computer className="text-blue-600 w-10 h-10 animate-pulse" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Heart className="text-white w-4 h-4" />
              </div>
            </div>

