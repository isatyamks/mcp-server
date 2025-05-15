import React from 'react';
import { GraduationCap, Briefcase, Award, Shield, Code, Globe, FileCheck, UserCheck } from 'lucide-react';

const ValueProposition: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Solving India's <span className="text-blue-600">Internship Crisis</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No more fake internships, paid training scams, or referral-based gatekeeping. 
            Commit brings transparency and merit back to skill development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* For Students */}
          <div id="students" className="backdrop-blur-lg bg-white/60 rounded-2xl p-8 shadow-xl transform transition-all hover:translate-y-[-8px]">
            <div className="bg-blue-600/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <GraduationCap className="text-blue-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">For Students</h3>
            <p className="text-gray-600 mb-6">
              Break free from the cycle of paid training packages and fake certificates. 
              Build your portfolio with real open-source contributions that employers value.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">No Fake Certificates</h4>
                  <p className="text-sm text-gray-600">Every certificate is backed by verified GitHub contributions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Proof of Work</h4>
                  <p className="text-sm text-gray-600">Your contributions are publicly visible and verifiable.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Real Projects</h4>
                  <p className="text-sm text-gray-600">Work on actual open-source issues, not simulated tasks.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Merit-Based</h4>
                  <p className="text-sm text-gray-600">Get recognized for your skills, not your connections.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* For Organizations */}
          <div id="organizations" className="backdrop-blur-lg bg-white/60 rounded-2xl p-8 shadow-xl transform transition-all hover:translate-y-[-8px]">
            <div className="bg-blue-600/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Briefcase className="text-blue-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">For Organizations</h3>
            <p className="text-gray-600 mb-6">
              Connect with skilled contributors from India's vast talent pool. 
              Get quality work done while supporting genuine skill development.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Verified Talent</h4>
                  <p className="text-sm text-gray-600">Every contribution is human-reviewed and validated.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">No AI Work</h4>
                  <p className="text-sm text-gray-600">Strict policies against AI-generated contributions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Pan-India Reach</h4>
                  <p className="text-sm text-gray-600">Access talent from Tier 1, 2, and 3 cities.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 text-blue-600 mt-1">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Quality Work</h4>
                  <p className="text-sm text-gray-600">Get contributions that meet your standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background circles */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-blue-300/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-sky-300/20 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ValueProposition;