import React from 'react';
import { ChevronRight, Shield, Award } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-90 -z-10"></div>
      
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiPjxwYXRoIGQ9Ik02LjM4IDYuMzhjMS4xMyAwIDIuMDUuOTIgMi4wNSAyLjA1IDAgMS4xMy0uOTIgMi4wNS0yLjA1IDIuMDUtMS4xMyAwLTIuMDUtLjkyLTIuMDUtMi4wNSAwLTEuMTMuOTItMi4wNSAyLjA1LTIuMDV6TTYuMzggMjYuMzhjMS4xMyAwIDIuMDUuOTIgMi4wNSAyLjA1IDAgMS4xMy0uOTIgMi4wNS0yLjA1IDIuMDUtMS4xMyAwLTIuMDUtLjkyLTIuMDUtMi4wNSAwLTEuMTMuOTItMi4wNSAyLjA1LTIuMDV6TTYuMzggNDYuMzhjMS4xMyAwIDIuMDUuOTIgMi4wNSAyLjA1IDAgMS4xMy0uOTIgMi4wNS0yLjA1IDIuMDUtMS4xMyAwLTIuMDUtLjkyLTIuMDUtMi4wNSAwLTEuMTMuOTItMi4wNSAyLjA1LTIuMDV6TTI2LjM4IDYuMzhjMS4xMyAwIDIuMDUuOTIgMi4wNSAyLjA1IDAgMS4xMy0uOTIgMi4wNS0yLjA1IDIuMDUtMS4xMyAwLTIuMDUtLjkyLTIuMDUtMi4wNSAwLTEuMTMuOTItMi4wNSAyLjA1LTIuMDV6TTI2LjM4IDI2LjM4YzEuMTMgMCAyLjA1LjkyIDIuMDUgMi4wNSAwIDEuMTMtLjkyIDIuMDUtMi4wNSAyLjA1LTEuMTMgMC0yLjA1LS45Mi0yLjA1LTIuMDUgMC0xLjEzLjkyLTIuMDUgMi4wNS0yLjA1ek0yNi4zOCA0Ni4zOGMxLjEzIDAgMi4wNS45MiAyLjA1IDIuMDUgMCAxLjEzLS45MiAyLjA1LTIuMDUgMi4wNS0xLjEzIDAtMi4wNS0uOTItMi4wNS0yLjA1IDAtMS4xMy45Mi0yLjA1IDIuMDUtMi4wNXpNNDYuMzggNi4zOGMxLjEzIDAgMi4wNS45MiAyLjA1IDIuMDUgMCAxLjEzLS45MiAyLjA1LTIuMDUgMi4wNS0xLjEzIDAtMi4wNS0uOTItMi4wNS0yLjA1IDAtMS4xMy45Mi0yLjA1IDIuMDUtMi4wNXpNNDYuMzggMjYuMzhjMS4xMyAwIDIuMDUuOTIgMi4wNSAyLjA1IDAgMS4xMy0uOTIgMi4wNS0yLjA1IDIuMDUtMS4xMyAwLTIuMDUtLjkyLTIuMDUtMi4wNSAwLTEuMTMuOTItMi4wNSAyLjA1LTIuMDV6TTQ2LjM4IDQ2LjM4YzEuMTMgMCAyLjA1LjkyIDIuMDUgMi4wNSAwIDEuMTMtLjkyIDIuMDUtMi4wNSAyLjA1LTEuMTMgMC0yLjA1LS45Mi0yLjA1LTIuMDUgMC0xLjEzLjkyLTIuMDUgMi4wNS0yLjA1eiI+PC9wYXRoPjwvZz48L3N2Zz4=')] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Join India's Largest Skill-First Platform
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Be part of the movement to make internships meaningful again. 
              Start your journey with Commit today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Start Contributing
              <ChevronRight size={20} />
            </button>
            <button className="bg-transparent text-white border border-white/50 backdrop-blur-sm px-8 py-3 rounded-full font-medium text-lg hover:bg-white/10 transition-colors shadow-md hover:shadow-lg">
              View Projects
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-white/90">
              <Shield size={20} />
              <span>AICTE Aligned Initiative</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Award size={20} />
              <span>Blockchain-Verified Certificates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;