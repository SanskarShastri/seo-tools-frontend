'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data
const relatedTools = [
  {
    title: 'YouTube Channel Statistics',
    description: 'Get comprehensive channel statistics',
    link: '/youtube-channel-statistics',
    icon: '📈',
  },
  {
    title: 'YouTube Money Calculator',
    description: 'Calculate estimated earnings from videos',
    link: '/youtube-money-calculator',
    icon: '💰',
  },
  {
    title: 'YouTube Video Statistics',
    description: 'View detailed video statistics',
    link: '/youtube-video-statistics',
    icon: '📊',
  },
  {
    title: 'YouTube Tag Generator',
    description: 'Generate optimized tags for your videos',
    link: '/youtube-tag-generator',
    icon: '🏷️',
  },
];

// Country data for select input
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
];

interface RegionResult {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  countryCode: string;
  isAvailable: boolean;
  restrictionReason?: string;
}

export default function YouTubeRegionRestrictionCheckerPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<RegionResult | null>(null);
  const [error, setError] = useState('');

  const checkRegionRestriction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setCheckResult(null);

    try {
      // Validate YouTube URL
      const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      
      if (!videoIdMatch) {
        setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
        setIsLoading(false);
        return;
      }

      const videoId = videoIdMatch[1];
      
      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call
      setTimeout(() => {
        // Randomly determine if video is available in selected country
        // In a real implementation, this would come from an API call
        // that checks the actual YouTube API's region restriction data
        
        // Generate pseudo-random result based on videoId and country code
        const hash = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const countryHash = selectedCountry.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const combinedHash = (hash + countryHash) % 100;
        
        const isAvailable = combinedHash > 15; // 85% chance of being available
        
        const result: RegionResult = {
          videoId: videoId,
          title: "How to Create Amazing YouTube Content in 2023",
          thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          channelTitle: "Content Creator Pro",
          countryCode: selectedCountry,
          isAvailable: isAvailable,
        };
        
        if (!isAvailable) {
          result.restrictionReason = combinedHash < 8 
            ? "This video contains content from a copyright holder who has not made this video available in your country."
            : "This video has been restricted by the uploader for viewing in certain countries.";
        }
        
        setCheckResult(result);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to check region restrictions. Please try again.');
      setIsLoading(false);
    }
  };

  const getCountryFlag = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? country.flag : '🌎';
  };

  const getCountryName = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : code;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 mb-12">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute font-mono text-2xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `float-globe ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🌎' : i % 3 === 1 ? '🌍' : '🌏'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Region <span className="text-yellow-300">Restriction Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check if a YouTube video is available to watch in specific countries
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Results</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-2">🇺🇸</span>
                  <span className="text-white">United States:</span>
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <span className="text-3xl mr-2">🇨🇳</span>
                  <span className="text-white">China:</span>
                </div>
                <div className="bg-red-500/20 px-3 py-1 rounded-full text-sm font-medium">
                  Restricted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={checkRegionRestriction} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                YouTube Video URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Select Country
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!videoUrl || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    Check Availability
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {checkResult && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Region Restriction Results</h2>
              
              <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                <div className="relative">
                  <img 
                    src={checkResult.thumbnailUrl} 
                    alt={checkResult.title}
                    className="w-full object-cover h-48 md:h-64" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-xl line-clamp-2">{checkResult.title}</h3>
                    <p className="text-white/90 text-sm mt-1">{checkResult.channelTitle}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{getCountryFlag(checkResult.countryCode)}</span>
                      <div>
                        <div className="font-medium text-lg text-gray-800">{getCountryName(checkResult.countryCode)}</div>
                        <div className="text-sm text-gray-500">Region Check</div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      checkResult.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {checkResult.isAvailable ? 'Available' : 'Restricted'}
                    </div>
                  </div>
                  
                  {!checkResult.isAvailable && checkResult.restrictionReason && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-700 text-sm border border-red-200">
                      <div className="flex">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{checkResult.restrictionReason}</span>
                      </div>
                    </div>
                  )}
                  
                  {checkResult.isAvailable && (
                    <div className="mb-6 p-4 bg-green-50 rounded-lg text-green-700 text-sm border border-green-200">
                      <div className="flex">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>This video is available to watch in {getCountryName(checkResult.countryCode)}.</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <h4 className="font-medium text-indigo-800 mb-2">What does this mean?</h4>
                    <p className="text-sm text-indigo-700">
                      {checkResult.isAvailable ? (
                        <>
                          Viewers in {getCountryName(checkResult.countryCode)} can watch this video without any geographical restrictions. 
                          The video complies with local content regulations and is accessible to all users in this region.
                        </>
                      ) : (
                        <>
                          This video is not available for viewers in {getCountryName(checkResult.countryCode)}. 
                          This could be due to copyright restrictions, content policies, or the uploader's regional settings.
                        </>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <a 
                      href={`https://www.youtube.com/watch?v=${checkResult.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-300"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      Open on YouTube
                    </a>
                    
                    <button 
                      onClick={() => setSelectedCountry(checkResult.countryCode === 'US' ? 'GB' : 'US')}
                      className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Check Another Country
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All Tools
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float-globe {
          0%, 100% {
            transform: translate(0, 0) rotate(var(--rotation));
          }
          50% {
            transform: translate(0, -20px) rotate(var(--rotation));
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fadeInUp 1s ease-out 0.5s forwards;
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
    </div>
  );
} 