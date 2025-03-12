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
];

interface VideoStats {
  title: string;
  views: number;
  likes: number;
  comments: number;
  uploadDate: string;
  thumbnailUrl: string;
  duration: string;
  channelName: string;
  channelSubscribers: string;
}

export default function YouTubeVideoStatisticsPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoStats, setVideoStats] = useState<VideoStats | null>(null);
  const [error, setError] = useState('');

  const fetchVideoStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setVideoStats(null);

    try {
      // Validate YouTube URL
      const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      
      if (!videoIdMatch) {
        setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
        setIsLoading(false);
        return;
      }

      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call
      setTimeout(() => {
        // Mock video statistics
        const mockStats: VideoStats = {
          title: "How to Master Modern Web Development in 2023",
          views: 1254789,
          likes: 87562,
          comments: 4231,
          uploadDate: "2023-06-15",
          thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          duration: "15:42",
          channelName: "Web Dev Mastery",
          channelSubscribers: "1.2M"
        };
        
        setVideoStats(mockStats);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch video statistics. Please try again.');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 mb-12">
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
                  animation: `float-stat ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                📊
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Video <span className="text-yellow-300">Statistics</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Get detailed statistics for any YouTube video
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Statistics</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">1.2M</div>
                  <div className="text-xs">Views</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">87K</div>
                  <div className="text-xs">Likes</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">4.2K</div>
                  <div className="text-xs">Comments</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">15:42</div>
                  <div className="text-xs">Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={fetchVideoStats} className="max-w-3xl mx-auto">
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
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
                disabled={!videoUrl || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Get Video Statistics
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

          {videoStats && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Statistics</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                {/* Video thumbnail and title */}
                <div className="relative">
                  <img 
                    src={videoStats.thumbnailUrl} 
                    alt={videoStats.title}
                    className="w-full object-cover h-56 md:h-72" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2">{videoStats.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-white/80 text-sm">{videoStats.channelName}</span>
                      <span className="mx-2 text-white/60">•</span>
                      <span className="text-white/80 text-sm">{videoStats.channelSubscribers} subscribers</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
                    {videoStats.duration}
                  </div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Views</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(videoStats.views)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Likes</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(videoStats.likes)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Comments</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">{formatNumber(videoStats.comments)}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-xs uppercase font-medium">Upload Date</div>
                    <div className="text-lg font-bold text-gray-800 mt-1">{formatDate(videoStats.uploadDate)}</div>
                  </div>
                </div>
                
                {/* Engagement metrics */}
                <div className="p-6 pt-0">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Engagement Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Like Rate</span>
                        <span className="text-sm font-medium text-gray-700">
                          {((videoStats.likes / videoStats.views) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(((videoStats.likes / videoStats.views) * 100), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Comment Rate</span>
                        <span className="text-sm font-medium text-gray-700">
                          {((videoStats.comments / videoStats.views) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full" 
                          style={{ width: `${Math.min(((videoStats.comments / videoStats.views) * 100 * 10), 100)}%` }}
                        ></div>
                      </div>
                    </div>
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
        @keyframes float-stat {
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