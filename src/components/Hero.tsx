'use client';

import Link from 'next/link';
import { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual search functionality
    // For now, we'll just log the query
    console.log('Searching for:', searchQuery);
    // This could redirect to a search results page like:
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="relative h-[60vh] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Using direct background image with CSS */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/modern-seo-dashboard.jpg')` 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-cyan-900/80 mix-blend-multiply" />
      </div>

      {/* Content - with padding-top to account for navbar */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Boost Your Online Presence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow">
            Advanced SEO tools to optimize your website, improve rankings, 
            and drive more organic traffic.
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-4 pl-10 text-sm border rounded-lg bg-white/10 backdrop-blur-md border-white/30 placeholder-gray-300 text-white focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search for SEO tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="mt-2 sm:mt-0 sm:ml-2 px-6 py-4 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 