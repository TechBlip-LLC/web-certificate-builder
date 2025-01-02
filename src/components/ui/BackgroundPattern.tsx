import React from 'react';

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 to-indigo-50/90 backdrop-blur-3xl" />
      
      {/* Soft shapes */}
      <div className="absolute -top-1/2 left-0 right-0 h-full rotate-12 transform">
        <div className="absolute h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-100/30 blur-2xl" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-full -rotate-12 transform">
        <div className="absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full bg-indigo-50/50 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-50/40 blur-2xl" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-shimmer opacity-5" />
    </div>
  );
}