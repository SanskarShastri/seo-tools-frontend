'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data for the related tools section
const relatedTools = [
  {
    title: 'YouTube Tag Extractor',
    description: 'Extract tags from any YouTube video',
    link: '/youtube-tag-extractor',
    icon: '🏷️',
  },
  {
    title: 'YouTube Tag Generator',
    description: 'Generate optimized tags for your videos',
    link: '/youtube-tag-generator',
    icon: '🏷️',
  },
  {
    title: 'YouTube Hashtag Extractor',
    description: 'Extract hashtags from any YouTube video',
    link: '/youtube-hashtag-extractor',
    icon: '#️⃣',
  },
  {
    title: 'YouTube Title Generator',
    description: 'Generate engaging titles for better CTR',
    link: '/youtube-title-generator',
    icon: '📝',
  },
];

export default function YouTubeTrendPage() {
  // State for input fields
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('us');
  const [resultCount, setResultCount] = useState(10);
  const [captchaValue, setCaptchaValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Languages and countries for dropdowns
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
  ];

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'jp', name: 'Japan' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'br', name: 'Brazil' },
    { code: 'mx', name: 'Mexico' },
  ];

  // Function to handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, you'd make an API call here
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/youtube-trends`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ language, country, resultCount, captchaValue }),
      // });
      // const data = await response.json();
      // setResults(data.results);
      
      // For now, we'll mock some results
      setTimeout(() => {
        setResults([
          { id: 1, title: 'Gaming trends 2023', category: 'Gaming', views: '5.2M' },
          { id: 2, title: 'DIY home decor ideas', category: 'DIY & Crafts', views: '3.8M' },
          { id: 3, title: 'Healthy meal prep', category: 'Food', views: '4.1M' },
          { id: 4, title: 'Latest tech gadgets review', category: 'Technology', views: '2.9M' },
          { id: 5, title: 'Morning yoga routine', category: 'Fitness', views: '1.7M' },
        ]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching trends:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Navbar */}
      <Navbar />
      
      {/* Empty space to account for fixed navbar */}
      <div className="h-16"></div>
      
      {/* 2. Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-20 mb-12">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  opacity: Math.random() * 0.5,
                  transform: `translate(-50%, -50%)`,
                  animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out ${Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube <span className="text-yellow-300">Trend</span> Discovery
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Discover trending topics on YouTube to boost your content strategy and grow your audience.
          </p>
          
          {/* YouTube-Styled Search Box Animation */}
          <div className="max-w-2xl mx-auto mb-8 relative animate-fade-in-delayed">
            <div className="bg-white/10 backdrop-blur-sm rounded-full py-3 px-5 border border-white/30 flex items-center gap-3 group hover:bg-white/20 transition duration-300">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="text-left text-white/70 animation-type-writer">
                <span className="inline-block">Discover gaming trends...</span>
              </div>
              <div className="ml-auto mr-1">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center pulse-animation">
                  <div className="w-4 h-3 bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trending Tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-8 animate-fade-in-delayed-more">
            {[
              { tag: '#GamingTips', color: 'bg-blue-500' }, 
              { tag: '#DIYCrafts', color: 'bg-pink-500' }, 
              { tag: '#FitnessChallenge', color: 'bg-green-500' }, 
              { tag: '#TechReviews', color: 'bg-purple-500' },
              { tag: '#FoodRecipes', color: 'bg-yellow-500' },
              { tag: '#TravelVlogs', color: 'bg-indigo-500' },
              { tag: '#MusicCovers', color: 'bg-red-500' },
              { tag: '#LifeHacks', color: 'bg-orange-500' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`${item.color} text-white text-sm md:text-base rounded-full px-4 py-1.5 hover:scale-105 cursor-pointer transition-transform shadow-md`}
                style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
              >
                {item.tag}
              </div>
            ))}
          </div>
          
          {/* Platform Icons/Play Button Animation */}
          <div className="mt-10 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transform hover:scale-110 transition-all duration-300 group cursor-pointer">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-red-500 border-b-[10px] border-b-transparent group-hover:border-l-red-400 ml-1"></div>
              
              <div className="absolute -inset-1 rounded-full animate-ping-slow bg-white/10 z-0"></div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-10 animate-bounce-slow">
            <svg className="w-6 h-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Add required animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse-animation {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes type-writer {
          from { width: 0 }
          to { width: 100% }
        }
        
        .animation-type-writer span {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid white;
          animation: type-writer 3s steps(30) infinite alternate,
                    blink-caret 0.75s step-end infinite;
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .pulse-animation {
          animation: pulse-animation 2s infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delayed-more {
          animation: fadeInUp 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* 3. Input Fields Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-100 transition-all duration-500 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/20 rounded-full -mr-20 -mt-20 z-0"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-400/5 rounded-full -ml-20 -mb-20 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-700">Search YouTube Trends</h2>
              <div className="hidden md:flex items-center space-x-1 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              </div>
            </div>
            
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {/* Language Dropdown */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                      Language
                    </div>
                  </div>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 pl-4 pr-10 py-3 text-gray-700 appearance-none bg-white transition-all duration-300"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-teal-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Country Dropdown */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Country
                    </div>
                  </div>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 pl-4 pr-10 py-3 text-gray-700 appearance-none bg-white transition-all duration-300"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-teal-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Result Count */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                      Results
                    </div>
                  </div>
                  <div className="flex w-full h-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    {[5, 10, 20, 50].map((option) => (
                      <button 
                        key={option}
                        type="button"
                        className={`flex-1 py-3 px-2 text-sm transition-all duration-300 ${
                          resultCount === option 
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium shadow-inner' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setResultCount(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Captcha */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      Captcha <span className="text-gray-400">(demo only)</span>
                    </div>
                  </div>
                  <input
                    id="captcha"
                    type="text"
                    placeholder="Enter captcha"
                    value={captchaValue}
                    onChange={(e) => setCaptchaValue(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 pl-4 pr-4 py-3 text-gray-700 transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Search Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative px-10 py-4 overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-70 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        Discover Trends
                      </>
                    )}
                  </span>
                  <div className="absolute -inset-full rounded-full animate-gradient scale-75 bg-gradient-to-r from-teal-400/0 via-white/30 to-teal-400/0 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                </button>
              </div>
            </form>
          </div>
          
          {/* Results Section (appears after search) */}
          {results.length > 0 && (
            <div className="mt-12 pt-10 border-t border-gray-100 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  Trending on YouTube
                </h2>
                <div className="hidden md:flex items-center">
                  <span className="px-3 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full mr-2">
                    Live Data
                  </span>
                  <span className="text-sm text-gray-500">Updated recently</span>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-teal-50 to-cyan-50">
                        <th className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">#</th>
                        <th className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">Title</th>
                        <th className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">Category</th>
                        <th className="py-4 px-6 text-sm font-semibold text-gray-700 border-b border-gray-200 text-left">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr 
                          key={result.id} 
                          className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                        >
                          <td className="py-4 px-6 text-sm text-gray-500 border-b border-gray-100">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-medium">{result.id}</span>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-800 border-b border-gray-100">
                            <div className="flex items-center">
                              <div className="w-10 h-6 rounded bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                  <path d="M9 17l8-5-8-5z"></path>
                                </svg>
                              </div>
                              {result.title}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm border-b border-gray-100">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {result.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600 border-b border-gray-100">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-teal-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 10.7348C14 10.3584 13.8949 10.0208 13.6848 9.722C13.4746 9.42317 13.2152 9.2122 12.9064 9.08911C12.5976 8.96602 12.2533 8.94647 11.9303 9.03114C11.6072 9.11581 11.3228 9.30032 11.1173 9.55886C10.9117 9.8174 10.7968 10.1328 10.7923 10.4619C10.7879 10.7909 10.8942 11.1088 11.0926 11.3724C11.291 11.636 11.5703 11.8271 11.8905 11.9192C12.2108 12.0113 12.5549 11.9994 12.8663 11.8833C13.1776 11.7672 13.4416 11.5621 13.6282 11.2674C13.8149 10.9727 13.9089 10.6282 13.8976 10.283" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                              {result.views}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Data refreshed recently
                </div>
                <div>
                  <button className="text-teal-600 hover:text-teal-800 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    Export Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add required animations for the button */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-gradient {
          animation: gradient 4s ease infinite;
          background-size: 400% 400%;
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes pulse-animation {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes type-writer {
          from { width: 0 }
          to { width: 100% }
        }
        
        .animation-type-writer span {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid white;
          animation: type-writer 3s steps(30) infinite alternate,
                    blink-caret 0.75s step-end infinite;
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .pulse-animation {
          animation: pulse-animation 2s infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delayed-more {
          animation: fadeInUp 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* 4. Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-slate-50/50 to-slate-100/80 py-20">
        <div className="container mx-auto px-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-teal-400/5 to-cyan-400/10 rounded-full -mt-20 -ml-20 z-0"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tr from-cyan-400/5 to-blue-400/10 rounded-full -mb-20 -mr-20 z-0"></div>
          
          <div className="relative z-10 mb-16">
            <div className="text-center">
              <div className="inline-block">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
                  Related YouTube Tools
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out duration-300"></div>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mt-1 mb-6"></div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Explore our other powerful YouTube tools to enhance your content strategy
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100/80 hover:border-teal-200/50 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-teal-400/5 to-cyan-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                
                <div className="relative z-10 flex items-start">
                  <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-teal-400/10 via-cyan-400/20 to-blue-400/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow transform group-hover:scale-110 transition-all duration-300 text-3xl">
                    <span className="transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                  </div>
                  
                  <div className="ml-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors duration-300">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 ease-in-out rounded-full"></div>
                
                <div className="mt-3 flex justify-end">
                  <span className="text-teal-500 text-sm font-medium opacity-0 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out flex items-center">
                    Explore
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="/tools" className="inline-flex items-center text-teal-600 hover:text-teal-700 text-lg font-medium group">
              View All Tools
              <svg className="w-5 h-5 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Add required keyframe animations if they don't exist */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 4s ease infinite;
          background-size: 400% 400%;
        }
      `}</style>
    </div>
  );
} 