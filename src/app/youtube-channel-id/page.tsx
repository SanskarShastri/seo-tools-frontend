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
    title: 'YouTube Channel Statistics',
    description: 'Get comprehensive channel statistics',
    link: '/youtube-channel-statistics',
    icon: '📈',
  },
];

export default function YouTubeChannelIdPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelId, setChannelId] = useState('');
  const [channelInfo, setChannelInfo] = useState<{
    title?: string;
    thumbnailUrl?: string;
  }>({});
  const [error, setError] = useState('');

  const extractChannelId = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setChannelId('');
    setChannelInfo({});

    try {
      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call and pattern match some common URL formats
      setTimeout(() => {
        let extractedId = '';
        
        // Check different URL patterns
        if (channelUrl.includes('youtube.com/channel/')) {
          const match = channelUrl.match(/youtube\.com\/channel\/([^\/\?]+)/);
          extractedId = match ? match[1] : '';
        } else if (channelUrl.includes('youtube.com/c/')) {
          // Custom URLs require API, can't extract directly
          // For demo purposes, we'll show a mock ID
          extractedId = 'UC-custom-channel-id-12345';
        } else if (channelUrl.includes('youtube.com/user/')) {
          // Legacy usernames require API, can't extract directly
          // For demo purposes, we'll show a mock ID
          extractedId = 'UC-legacy-username-id-67890';
        } else if (channelUrl.includes('youtube.com/@')) {
          // Handle @username format
          // For demo purposes, we'll show a mock ID
          extractedId = 'UC-handle-username-id-abcde';
        }
        
        if (!extractedId) {
          setError('Could not extract Channel ID. Please ensure you entered a valid YouTube channel URL.');
          setIsLoading(false);
          return;
        }
        
        setChannelId(extractedId);
        
        // Mock channel info
        setChannelInfo({
          title: 'Demo Channel',
          thumbnailUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kDUzZfzKak1q2PIhc9g6Oosb4k-uQKL3lzPGRNug=s176-c-k-c0x00ffffff-no-rj',
        });
        
        setIsLoading(false);
      }, 1200);
    } catch (err) {
      setError('Failed to extract channel ID. Please try again.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 mb-12">
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
                  animation: `float-id ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                🆔
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Channel <span className="text-yellow-300">ID Finder</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Easily extract the channel ID from any YouTube channel URL
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Channel URL Types</div>
              <div className="text-white text-xs font-mono space-y-2">
                <div className="bg-black/20 p-2 rounded">https://www.youtube.com/channel/UCczhp4wznQWonO7Pb8HQ2MQ</div>
                <div className="bg-black/20 p-2 rounded">https://www.youtube.com/c/ChannelName</div>
                <div className="bg-black/20 p-2 rounded">https://www.youtube.com/@username</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={extractChannelId} className="max-w-3xl mx-auto">
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
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
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Extracting ID...
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Find Channel ID
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

          {channelId && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Channel Information</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                {channelInfo.thumbnailUrl && (
                  <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-200">
                    <img 
                      src={channelInfo.thumbnailUrl} 
                      alt="Channel thumbnail" 
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{channelInfo.title}</h3>
                      <p className="text-sm text-gray-500">YouTube Channel</p>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Channel ID
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={channelId}
                      readOnly
                      className="w-full px-4 py-3 bg-white rounded-l-lg border border-gray-200 font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(channelId)}
                      className="px-4 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <strong>Tip:</strong> Use this channel ID for YouTube API requests, channel analytics, 
                  or when you need to reference this specific channel in your applications.
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
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
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
        @keyframes float-id {
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