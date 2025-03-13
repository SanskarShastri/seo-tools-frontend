'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'DNS Record Checker',
    description: 'Check DNS records of any domain',
    link: '/management-tools/dns-record-checker',
    icon: '🌐',
  },
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'Page Size Checker',
    description: 'Check webpage dimensions and file size',
    link: '/management-tools/page-size-checker',
    icon: '📏',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface ThemeInfo {
  name: string;
  version?: string;
  author?: string;
  authorUrl?: string;
  themeUrl?: string;
  description?: string;
  screenshot?: string;
}

interface PluginInfo {
  name: string;
  version?: string;
  description?: string;
  url?: string;
}

interface DetectionResult {
  isWordPress: boolean;
  theme: ThemeInfo | null;
  plugins: PluginInfo[];
  error?: string;
}

export default function WordPressThemeDetectorPage() {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const detectTheme = async () => {
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
      const mockResult: DetectionResult = {
        isWordPress: true,
        theme: {
          name: 'Twenty Twenty-Three',
          version: '1.2',
          author: 'WordPress.org',
          authorUrl: 'https://wordpress.org/',
          themeUrl: 'https://wordpress.org/themes/twentytwentythree/',
          description: 'Twenty Twenty-Three is designed to take advantage of the new design tools introduced in WordPress 6.1.',
          screenshot: 'https://example.com/theme-screenshot.jpg',
        },
        plugins: [
          {
            name: 'Yoast SEO',
            version: '20.5',
            description: 'The first true all-in-one SEO solution for WordPress.',
            url: 'https://yoast.com/wordpress/plugins/seo/',
          },
          {
            name: 'WooCommerce',
            version: '8.0.3',
            description: 'An eCommerce toolkit that helps you sell anything.',
            url: 'https://woocommerce.com/',
          },
          {
            name: 'Elementor',
            version: '3.15.1',
            description: 'The WordPress Website Builder.',
            url: 'https://elementor.com/',
          },
        ],
      };

      setResult(mockResult);
    } catch (error) {
      setResult({
        isWordPress: false,
        theme: null,
        plugins: [],
        error: 'Failed to analyze the website. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🎨' : i % 3 === 1 ? '🔍' : '🎯'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              WordPress Theme <span className="text-blue-300">Detector</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Identify WordPress themes and plugins used on any website
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
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
                    } focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {!isValidUrl && (
                    <p className="mt-2 text-sm text-red-600">Please enter a valid URL</p>
                  )}
                </div>
                <button
                  onClick={detectTheme}
                  disabled={!url || isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Detect Theme'}
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* WordPress Detection */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">
                      {result.isWordPress ? '✅' : '❌'}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {result.isWordPress ? 'WordPress Detected' : 'Not a WordPress Site'}
                    </h3>
                  </div>
                  {result.error && (
                    <div className="text-red-600 mt-2">{result.error}</div>
                  )}
                </div>

                {/* Theme Information */}
                {result.theme && (
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Theme Name</h4>
                          <p className="text-lg font-semibold text-gray-900">{result.theme.name}</p>
                        </div>
                        {result.theme.version && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Version</h4>
                            <p className="text-gray-900">{result.theme.version}</p>
                          </div>
                        )}
                        {result.theme.author && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Author</h4>
                            <p className="text-gray-900">
                              {result.theme.authorUrl ? (
                                <a
                                  href={result.theme.authorUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  {result.theme.author}
                                </a>
                              ) : (
                                result.theme.author
                              )}
                            </p>
                          </div>
                        )}
                        {result.theme.description && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Description</h4>
                            <p className="text-gray-900">{result.theme.description}</p>
                          </div>
                        )}
                        {result.theme.themeUrl && (
                          <div>
                            <a
                              href={result.theme.themeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                              View Theme Details
                              <svg
                                className="w-5 h-5 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                      {result.theme.screenshot && (
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <img
                            src={result.theme.screenshot}
                            alt={`${result.theme.name} Screenshot`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Plugins */}
                {result.plugins.length > 0 && (
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Detected Plugins</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.plugins.map((plugin, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg border border-blue-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{plugin.name}</h4>
                            {plugin.version && (
                              <span className="text-sm text-gray-600">v{plugin.version}</span>
                            )}
                          </div>
                          {plugin.description && (
                            <p className="text-sm text-gray-600 mb-2">{plugin.description}</p>
                          )}
                          {plugin.url && (
                            <a
                              href={plugin.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-700"
                            >
                              Learn More
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About Theme Detection</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">How It Works</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Analyzes website source code
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Identifies WordPress signatures
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Detects active theme and plugins
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Extracts version information
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Use Cases</h4>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Research competitor websites</li>
                        <li>• Find inspiration for your own site</li>
                        <li>• Verify WordPress installations</li>
                        <li>• Identify popular themes and plugins</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
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