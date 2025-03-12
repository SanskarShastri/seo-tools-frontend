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

interface ChannelBanner {
  channelName: string;
  channelId: string;
  bannerUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  subscribers: string;
}

export default function YouTubeChannelBannerDownloaderPage() {
  const [channelUrl, setChannelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [channelBanner, setChannelBanner] = useState<ChannelBanner | null>(null);
  const [error, setError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const fetchChannelBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setChannelBanner(null);
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
        // Mock channel banner data
        const mockBanner: ChannelBanner = {
          channelName: "TechMaster Studios",
          channelId: "UC1234567890abcdefg",
          bannerUrl: "https://yt3.googleusercontent.com/sNizhN4hbiJI9ASBYpFraO5ywJEeqJcZtYRZ_R1A1YrI8bfbAJpq8PBgUj8jHj1f2vJf4K-H=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
          bannerWidth: 2560,
          bannerHeight: 424,
          subscribers: "1.45M"
        };
        
        setChannelBanner(mockBanner);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch channel banner. Please try again.');
      setIsLoading(false);
    }
  };

  const downloadBanner = async () => {
    if (!channelBanner) return;
    
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
      const response = await fetch(channelBanner.bannerUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${channelBanner.channelName}-banner.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      */
    } catch (err) {
      setError('Failed to download banner. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 mb-12">
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
                  animation: `float-banner ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 2 === 0 ? '🖼️' : '🎬'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Channel <span className="text-yellow-300">Banner Downloader</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Download high-quality banner images from any YouTube channel
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Banner</div>
              <div className="h-20 bg-gradient-to-r from-white/20 to-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="text-white/70">Channel banner preview</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={fetchChannelBanner} className="max-w-3xl mx-auto">
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
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
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Fetching Banner...
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
                    Get Channel Banner
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
              Banner downloaded successfully!
            </div>
          )}

          {channelBanner && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Channel Banner</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="relative group">
                  <div className="aspect-[2560/424] overflow-hidden">
                    <img 
                      src={channelBanner.bannerUrl} 
                      alt={`${channelBanner.channelName} banner`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={downloadBanner}
                        className="bg-white/90 hover:bg-white text-green-600 p-3 rounded-full shadow-lg"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{channelBanner.channelName}</h3>
                      <p className="text-gray-500">{channelBanner.subscribers} subscribers</p>
                      <p className="text-sm text-gray-600 mt-2">Channel ID: {channelBanner.channelId}</p>
                    </div>
                    
                    <button
                      onClick={downloadBanner}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Banner
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Banner Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Dimensions</div>
                        <div className="text-sm font-semibold">{channelBanner.bannerWidth} x {channelBanner.bannerHeight} px</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Format</div>
                        <div className="text-sm font-semibold">JPG / PNG</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Max Size</div>
                        <div className="text-sm font-semibold">6 MB</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100">
                    <h4 className="font-medium text-green-800 mb-2">Usage Tips</h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        The safe area for text and logos is the center 1546 x 423 pixels.
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Different devices may crop the banner differently.
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        For best results, use high-resolution images with minimal text.
                      </li>
                    </ul>
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
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-teal-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
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
        @keyframes float-banner {
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