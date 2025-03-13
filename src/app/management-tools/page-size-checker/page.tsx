'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Screen Resolution',
    description: 'Check your screen resolution',
    link: '/management-tools/screen-resolution',
    icon: '🖥️',
  },
  {
    title: 'Resolution Simulator',
    description: 'Test your website at different screen sizes',
    link: '/management-tools/resolution-simulator',
    icon: '📱',
  },
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'Browser Checker',
    description: 'Check your browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
];

interface ResourceInfo {
  type: string;
  url: string;
  size: number;
  transferSize: number;
  duration: number;
}

interface PageSizeInfo {
  totalSize: number;
  transferSize: number;
  htmlSize: number;
  cssSize: number;
  jsSize: number;
  imageSize: number;
  fontSize: number;
  otherSize: number;
  resources: ResourceInfo[];
  loadTime: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export default function PageSizeCheckerPage() {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PageSizeInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources'>('overview');

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const checkPageSize = async () => {
    if (!validateUrl(url)) {
      setIsValidUrl(false);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Simulated API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated response
      const mockResult: PageSizeInfo = {
        totalSize: 2345678,
        transferSize: 1234567,
        htmlSize: 45678,
        cssSize: 234567,
        jsSize: 876543,
        imageSize: 987654,
        fontSize: 123456,
        otherSize: 77780,
        loadTime: 2.5,
        dimensions: {
          width: 1920,
          height: 1080,
        },
        resources: [
          {
            type: 'html',
            url: url,
            size: 45678,
            transferSize: 12345,
            duration: 500,
          },
          {
            type: 'css',
            url: `${url}/styles.css`,
            size: 234567,
            transferSize: 98765,
            duration: 300,
          },
          {
            type: 'javascript',
            url: `${url}/main.js`,
            size: 876543,
            transferSize: 345678,
            duration: 800,
          },
          {
            type: 'image',
            url: `${url}/hero.jpg`,
            size: 987654,
            transferSize: 567890,
            duration: 1200,
          },
          {
            type: 'font',
            url: `${url}/font.woff2`,
            size: 123456,
            transferSize: 89012,
            duration: 400,
          },
        ],
      };

      setResult(mockResult);
    } catch (error) {
      console.error('Error checking page size:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getResourceTypeIcon = (type: string): string => {
    switch (type) {
      case 'html': return '📄';
      case 'css': return '🎨';
      case 'javascript': return '⚙️';
      case 'image': return '🖼️';
      case 'font': return '📝';
      default: return '📦';
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '📏' : i % 3 === 1 ? '📦' : '⚡'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Page Size <span className="text-green-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze webpage dimensions and resource sizes for better performance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setIsValidUrl(true);
                    }}
                    placeholder="Enter website URL (e.g., https://example.com)"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isValidUrl ? 'border-gray-300' : 'border-red-500'
                    } focus:ring-green-500 focus:border-green-500`}
                  />
                  {!isValidUrl && (
                    <p className="mt-2 text-sm text-red-600">Please enter a valid URL</p>
                  )}
                </div>
                <button
                  onClick={checkPageSize}
                  disabled={!url || isLoading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Page'}
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Total Size</h4>
                      <div className="text-2xl font-bold text-gray-900">{formatSize(result.totalSize)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Transfer Size</h4>
                      <div className="text-2xl font-bold text-gray-900">{formatSize(result.transferSize)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Load Time</h4>
                      <div className="text-2xl font-bold text-gray-900">{result.loadTime}s</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Dimensions</h4>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.dimensions.width} × {result.dimensions.height}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      activeTab === 'overview'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      activeTab === 'resources'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Resources
                  </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Size Distribution</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">HTML</span>
                          <span className="text-sm text-gray-500">{formatSize(result.htmlSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${(result.htmlSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">CSS</span>
                          <span className="text-sm text-gray-500">{formatSize(result.cssSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-500 rounded-full h-2"
                            style={{ width: `${(result.cssSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">JavaScript</span>
                          <span className="text-sm text-gray-500">{formatSize(result.jsSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 rounded-full h-2"
                            style={{ width: `${(result.jsSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Images</span>
                          <span className="text-sm text-gray-500">{formatSize(result.imageSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 rounded-full h-2"
                            style={{ width: `${(result.imageSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Fonts</span>
                          <span className="text-sm text-gray-500">{formatSize(result.fontSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 rounded-full h-2"
                            style={{ width: `${(result.fontSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Other</span>
                          <span className="text-sm text-gray-500">{formatSize(result.otherSize)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gray-500 rounded-full h-2"
                            style={{ width: `${(result.otherSize / result.totalSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Resource Details</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-green-200">
                        <thead className="bg-green-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-200">
                          {result.resources.map((resource, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-xl mr-2">{getResourceTypeIcon(resource.type)}</span>
                                  <span className="text-sm text-gray-900 capitalize">{resource.type}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 truncate max-w-xs">{resource.url}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatSize(resource.size)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatSize(resource.transferSize)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDuration(resource.duration)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Page Size Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Why Check Page Size?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Page size analysis helps identify performance bottlenecks and opportunities for optimization. Large page sizes can lead to slower load times, higher bounce rates, and poor user experience.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Total Size:</strong> Combined size of all resources</li>
                      <li><strong>Transfer Size:</strong> Compressed size over network</li>
                      <li><strong>Load Time:</strong> Time to load all resources</li>
                      <li><strong>Resource Count:</strong> Number of HTTP requests</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Optimization Tips</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Compress and optimize images
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Minify CSS, JavaScript, and HTML
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Enable GZIP compression
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Leverage browser caching
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