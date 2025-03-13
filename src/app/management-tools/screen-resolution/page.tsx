'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Resolution Simulator',
    description: 'Test your website at different screen sizes',
    link: '/management-tools/resolution-simulator',
    icon: '🖥️',
  },
  {
    title: 'Page Size Checker',
    description: 'Check webpage dimensions and file size',
    link: '/management-tools/page-size-checker',
    icon: '📏',
  },
  {
    title: 'Browser Checker',
    description: 'Check your browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
  {
    title: 'User Agent Checker',
    description: 'Check your browser\'s user agent string',
    link: '/management-tools/user-agent-checker',
    icon: '🔍',
  },
];

interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  orientation: string;
  devicePixelRatio: number;
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
}

const commonResolutions = [
  { name: '4K UHD', width: 3840, height: 2160 },
  { name: 'QHD', width: 2560, height: 1440 },
  { name: 'Full HD', width: 1920, height: 1080 },
  { name: 'HD+', width: 1600, height: 900 },
  { name: 'HD', width: 1366, height: 768 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPhone 13 Pro Max', width: 428, height: 926 },
  { name: 'iPhone 13', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'Galaxy Fold', width: 280, height: 653 },
];

export default function ScreenResolutionPage() {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeTimeout, setResizeTimeout] = useState<NodeJS.Timeout | null>(null);

  const getScreenInfo = () => {
    const orientation = typeof window.screen.orientation !== 'undefined' 
      ? window.screen.orientation.type 
      : window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      orientation: orientation,
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    };
  };

  useEffect(() => {
    setScreenInfo(getScreenInfo());

    const handleResize = () => {
      setIsResizing(true);
      
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      const timeout = setTimeout(() => {
        setScreenInfo(getScreenInfo());
        setIsResizing(false);
      }, 150);

      setResizeTimeout(timeout);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  const calculateAspectRatio = (width: number, height: number) => {
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🖥️' : i % 3 === 1 ? '📱' : '💻'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Screen <span className="text-purple-300">Resolution</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check your screen resolution and display information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {screenInfo && (
              <div className="space-y-6">
                {/* Current Resolution */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Screen Resolution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-purple-200 text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {isResizing ? '...' : `${screenInfo.width} × ${screenInfo.height}`}
                      </div>
                      <div className="text-sm text-gray-600">Physical Resolution</div>
                      <div className="mt-2 text-sm text-gray-500">
                        Aspect Ratio: {calculateAspectRatio(screenInfo.width, screenInfo.height)}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-purple-200 text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {isResizing ? '...' : `${screenInfo.innerWidth} × ${screenInfo.innerHeight}`}
                      </div>
                      <div className="text-sm text-gray-600">Browser Viewport</div>
                      <div className="mt-2 text-sm text-gray-500">
                        Aspect Ratio: {calculateAspectRatio(screenInfo.innerWidth, screenInfo.innerHeight)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Display Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Available Space</h4>
                      <div className="text-lg font-semibold text-gray-900">
                        {screenInfo.availWidth} × {screenInfo.availHeight}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Color Depth</h4>
                      <div className="text-lg font-semibold text-gray-900">
                        {screenInfo.colorDepth}-bit
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Pixel Depth</h4>
                      <div className="text-lg font-semibold text-gray-900">
                        {screenInfo.pixelDepth}-bit
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Device Pixel Ratio</h4>
                      <div className="text-lg font-semibold text-gray-900">
                        {screenInfo.devicePixelRatio}x
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Orientation</h4>
                      <div className="text-lg font-semibold text-gray-900 capitalize">
                        {screenInfo.orientation}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Window Size</h4>
                      <div className="text-lg font-semibold text-gray-900">
                        {screenInfo.outerWidth} × {screenInfo.outerHeight}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Resolutions */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Screen Resolutions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {commonResolutions.map((resolution, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-purple-200"
                      >
                        <div className="font-medium text-gray-900">{resolution.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {resolution.width} × {resolution.height}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateAspectRatio(resolution.width, resolution.height)} ratio
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Screen Resolution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Understanding Resolution</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Screen resolution refers to the number of pixels displayed on your screen. It's typically expressed as width × height (e.g., 1920×1080). Higher resolutions mean more detail but require more processing power.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Terms</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Physical Resolution:</strong> Actual screen pixels</li>
                      <li><strong>Viewport:</strong> Visible browser area</li>
                      <li><strong>Aspect Ratio:</strong> Width to height ratio</li>
                      <li><strong>Device Pixel Ratio:</strong> Physical to CSS pixel ratio</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Why It Matters</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Ensures proper website display across devices
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Helps optimize images and layouts
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Critical for responsive design
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Impacts user experience and readability
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
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
        @keyframes float-icon {
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