import React from 'react';
import { UserPlus, Search, Trophy, GitPullRequest, MessageSquare, Award } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

const Step: React.FC<StepProps> = ({ icon, title, description, number }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Number indicator */}
      <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      
      {/* Icon box with glass effect */}
      <div className="w-20 h-20 mb-4 backdrop-blur-md bg-white/70 rounded-xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center max-w-xs">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white -z-10"></div>
      <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-sky-200/20 rounded-full filter blur-3xl -z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Your Journey with <span className="text-blue-600">Commit</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A transparent process from start to finish - every step is visible and verifiable
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Step 
            icon={<GitPullRequest size={32} />}
            title="Find & Contribute"
            description="Browse open issues, pick tasks that match your skills, and submit quality pull requests."
            number={1}
          />
          
          <Step 
            icon={<MessageSquare size={32} />}
            title="Get Mentored"
            description="Receive guidance from experienced maintainers who review your work and provide feedback."
            number={2}
          />
          
          <Step 
            icon={<Award size={32} />}
            title="Earn Recognition"
            description="Get blockchain-verified certificates for merged contributions and build your portfolio."
            number={3}
          />
        </div>
        
        {/* Additional Info Card */}
        <div className="max-w-2xl mx-auto mt-16 backdrop-blur-md bg-white/60 rounded-2xl p-8 shadow-xl">
          <p className="text-gray-700 text-center">
            Join India's largest skill-first platform that's making internships meaningful again. 
            No more paying for opportunities or depending on referrals - let your work speak for itself.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;