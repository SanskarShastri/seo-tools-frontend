'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data
const relatedTools = [
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
  {
    title: 'YouTube Channel ID',
    description: 'Find channel ID from YouTube URL',
    link: '/youtube-channel-id',
    icon: '🆔',
  },
];

interface ChannelLogo {
  channelName: string;
  channelId: string;
  logoUrl: string;
  subscribers: string;
}

export default function YouTubeChannelLogoDownloaderPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelLogo, setChannelLogo] = useState<ChannelLogo | null>(null);
  const [error, setError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const fetchChannelLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setChannelLogo(null);
    setDownloadSuccess(false);

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
        // Mock channel logo data
        const mockLogo: ChannelLogo = {
          channelName: "TechMaster Studios",
          channelId: "UC1234567890abcdefg",
          logoUrl: "https://yt3.googleusercontent.com/ytc/AIdro_kDUzZfzKak1q2PIhc9g6Oosb4k-uQKL3lzPGRNug=s176-c-k-c0x00ffffff-no-rj",
          subscribers: "1.45M"
        };
        
        setChannelLogo(mockLogo);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch channel logo. Please try again.');
      setIsLoading(false);
    }
  };

  const downloadLogo = async () => {
    if (!channelLogo) return;
    
    try {
      // In a real application, you would implement the actual download functionality here
      // For this demo, we'll simulate a successful download
      setDownloadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
      
      // This is a simplified version - in a real app, you would:
      // 1. Fetch the image data (if not already available)
      // 2. Create a blob from the image data
      // 3. Create a temporary link element
      // 4. Set the download attribute and href to the blob URL
      // 5. Trigger a click on the link
      // 6. Clean up by removing the link and revoking the blob URL
      
      // Example of actual download implementation:
      /*
      const response = await fetch(channelLogo.logoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${channelLogo.channelName}-logo.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      */
    } catch (err) {
      setError('Failed to download logo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-violet-600 text-white py-20 mb-12">
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
                  animation: `float-logo ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 2 === 0 ? '🖼️' : '👤'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Channel <span className="text-yellow-300">Logo Downloader</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Download high-quality logos from any YouTube channel
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left flex items-center gap-4">
              <div className="rounded-full h-16 w-16 bg-white/20 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-1">Example Channel</div>
                <div className="text-lg font-semibold">Download channel profile pictures in high resolution</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={fetchChannelLogo} className="max-w-3xl mx-auto">
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
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Fetching Logo...
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Get Channel Logo
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

          {downloadSuccess && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-pulse">
              Logo downloaded successfully!
            </div>
          )}

          {channelLogo && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Channel Logo</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-100 shadow-lg">
                      <img 
                        src={channelLogo.logoUrl} 
                        alt={`${channelLogo.channelName} logo`}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={downloadLogo}
                          className="bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">{channelLogo.channelName}</h3>
                    <p className="text-gray-500">{channelLogo.subscribers} subscribers</p>
                    <p className="text-sm text-gray-600 mt-2">Channel ID: {channelLogo.channelId}</p>
                    
                    <div className="mt-6">
                      <button
                        onClick={downloadLogo}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Logo
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available Sizes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <div className="text-xs text-gray-500 mb-1">Small</div>
                      <div className="text-sm font-semibold">88 x 88</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <div className="text-xs text-gray-500 mb-1">Medium</div>
                      <div className="text-sm font-semibold">240 x 240</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <div className="text-xs text-gray-500 mb-1">Large</div>
                      <div className="text-sm font-semibold">800 x 800</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <div className="text-xs text-gray-500 mb-1">Original</div>
                      <div className="text-sm font-semibold">Max Resolution</div>
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
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto rounded-full"></div>
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
        @keyframes float-logo {
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