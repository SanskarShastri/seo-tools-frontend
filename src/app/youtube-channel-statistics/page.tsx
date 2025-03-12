'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data
const relatedTools = [
  {
    title: 'YouTube Channel Logo Downloader',
    description: 'Download profile pictures from YouTube channels',
    link: '/youtube-channel-logo-downloader',
    icon: '👤',
  },
  {
    title: 'YouTube Channel Banner Downloader',
    description: 'Download banner images from YouTube channels',
    link: '/youtube-channel-banner-downloader',
    icon: '🖼️',
  },
  {
    title: 'YouTube Channel Search',
    description: 'Find YouTube channels by keywords',
    link: '/youtube-channel-search',
    icon: '🔍',
  },
  {
    title: 'YouTube Channel ID',
    description: 'Find channel ID from YouTube URL',
    link: '/youtube-channel-id',
    icon: '🆔',
  },
];

interface ChannelStats {
  title: string;
  subscribers: number;
  totalViews: number;
  videoCount: number;
  creationDate: string;
  country: string;
  thumbnailUrl: string;
  description: string;
  category: string;
  monthlyViews: number;
  monthlyGrowth: number;
}

export default function YouTubeChannelStatisticsPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelStats, setChannelStats] = useState<ChannelStats | null>(null);
  const [error, setError] = useState('');

  const fetchChannelStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setChannelStats(null);

    try {
      // Validate YouTube URL
      let isValid = false;
      if (
        channelUrl.includes('youtube.com/channel/') ||
        channelUrl.includes('youtube.com/c/') ||
        channelUrl.includes('youtube.com/user/') ||
        channelUrl.includes('youtube.com/@')
      ) {
        isValid = true;
      }
      
      if (!isValid) {
        setError('Invalid YouTube channel URL. Please enter a valid YouTube channel URL.');
        setIsLoading(false);
        return;
      }

      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call
      setTimeout(() => {
        // Mock channel statistics
        const mockStats: ChannelStats = {
          title: "TechMaster Studios",
          subscribers: 1450000,
          totalViews: 175000000,
          videoCount: 342,
          creationDate: "2015-03-12",
          country: "United States",
          thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_kDUzZfzKak1q2PIhc9g6Oosb4k-uQKL3lzPGRNug=s176-c-k-c0x00ffffff-no-rj",
          description: "TechMaster Studios brings you the latest in tech reviews, tutorials, and industry insights. Join us as we explore cutting-edge technology and help you make the most of your devices.",
          category: "Science & Technology",
          monthlyViews: 3200000,
          monthlyGrowth: 2.7
        };
        
        setChannelStats(mockStats);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch channel statistics. Please try again.');
      setIsLoading(false);
    }
  };

  // Helper function to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate average views per video
  const calculateAvgViews = (total: number, count: number) => {
    return count > 0 ? Math.round(total / count) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20 mb-12">
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
                  animation: `float-channel ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 2 === 0 ? '📺' : '📊'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Channel <span className="text-yellow-300">Statistics</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Get comprehensive statistics for any YouTube channel
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Channel Statistics</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">1.4M</div>
                  <div className="text-xs">Subscribers</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">175M</div>
                  <div className="text-xs">Total Views</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">342</div>
                  <div className="text-xs">Videos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={fetchChannelStats} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                YouTube Channel URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  placeholder="https://www.youtube.com/channel/... or https://www.youtube.com/@..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
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

            <div className="text-center">
              <button
                type="submit"
                disabled={!channelUrl || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Fetching Stats...
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Get Channel Statistics
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

          {channelStats && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Channel Statistics</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                {/* Channel header */}
                <div className="bg-white p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img 
                      src={channelStats.thumbnailUrl} 
                      alt={channelStats.title}
                      className="w-24 h-24 rounded-full object-cover border-4 border-amber-100" 
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900">{channelStats.title}</h3>
                      <p className="text-amber-600">{channelStats.category}</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                          </svg>
                          {channelStats.country}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          Created {formatDate(channelStats.creationDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    {channelStats.description}
                  </div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Subscribers</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(channelStats.subscribers)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Total Views</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(channelStats.totalViews)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Videos</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(channelStats.videoCount)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Monthly Views</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(channelStats.monthlyViews)}</div>
                  </div>
                </div>
                
                {/* Additional metrics */}
                <div className="p-6 pt-0">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Avg. Views per Video</span>
                        <span className="text-sm font-semibold text-amber-600">
                          {formatNumber(calculateAvgViews(channelStats.totalViews, channelStats.videoCount))}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-500 h-2.5 rounded-full" 
                          style={{ width: `${Math.min((calculateAvgViews(channelStats.totalViews, channelStats.videoCount) / 1000000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Monthly Growth Rate</span>
                        <span className="text-sm font-semibold text-amber-600">
                          {channelStats.monthlyGrowth}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-orange-500 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(channelStats.monthlyGrowth * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Estimated Monthly Revenue Range</h5>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-green-600">${Math.round(channelStats.monthlyViews * 0.001)}</span>
                      <span className="text-gray-400">-</span>
                      <span className="text-green-600">${Math.round(channelStats.monthlyViews * 0.006)}</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Based on an estimated CPM range of $1-$6 per 1,000 views. Actual earnings may vary based on niche, audience demographics, and monetization methods.
                    </p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
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
        @keyframes float-channel {
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