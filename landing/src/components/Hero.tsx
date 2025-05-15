import React from 'react';
import { ChevronRight, Shield, Award, FileCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/30 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-sky-300/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Shield size={14} className="mr-1" /> No Fake Internships
            </span>
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <Award size={14} className="mr-1" /> Merit-Based Selection
            </span>
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <FileCheck size={14} className="mr-1" /> Real Work Proof
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Real Skills. Real Work. Real Recognition.
            </span>
          </h1>
          
          <div className="backdrop-blur-lg bg-white/60 p-6 sm:p-8 rounded-2xl shadow-xl mb-8 transform transition-all hover:scale-[1.02]">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Commit is revolutionizing internships in India by connecting 40+ million students with verified 
              open-source projects. No more fake certificates, paid training packages, or referral bias - 
              just transparent, skill-based opportunities for real growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 w-full sm:w-auto">
              Start Contributing
              <ChevronRight size={20} />
            </button>
            <button className="bg-white/80 backdrop-blur-md text-gray-700 px-8 py-3 rounded-full font-medium text-lg hover:bg-white/90 transition-colors shadow-md hover:shadow-lg border border-gray-200 w-full sm:w-auto">
              View Projects
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">40M+</div>
              <div className="text-gray-600">Indian Students</div>
            </div>
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Transparent Process</div>
            </div>
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">AI-Generated Work</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;