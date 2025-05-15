import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import HowItWorks from './components/HowItWorks';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/next';

// Import Inter font
import './styles/fonts.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay for the entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`font-inter transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <Hero />
        <Analytics />
        <ValueProposition />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
