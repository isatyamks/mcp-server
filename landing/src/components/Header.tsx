import React, { useState, useEffect } from 'react';
import { MenuIcon, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              Commit
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#students" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">For Students</a>
            <a href="#organizations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">For Organizations</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How It Works</a>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              Sign Up
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-64 opacity-100' 
          : 'max-h-0 opacity-0 pointer-events-none'
      } bg-white/95 backdrop-blur-md overflow-hidden`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <a 
            href="#students" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            For Students
          </a>
          <a 
            href="#organizations" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            For Organizations
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </a>
          <button 
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;