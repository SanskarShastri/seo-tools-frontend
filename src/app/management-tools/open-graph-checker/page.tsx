'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Twitter Card Generator',
    description: 'Generate Twitter card meta tags',
    link: '/management-tools/twitter-card-generator',
    icon: '🐦',
  },
  {
    title: 'Meta Tag Analyzer',
    description: 'Analyze meta tags of any webpage',
    link: '/management-tools/metatag-analyzer',
    icon: '🏷️',
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

interface OpenGraphData {
  url: string;
  basic: {
    title: string;
    type: string;
    image: string;
    url: string;
    description: string;
    siteName: string;
  };
  optional: {
    locale: string;
    alternateLocale: string[];
    audio: string;
    video: string;
    determiner: string;
  };
  article?: {
    publishedTime: string;
    modifiedTime: string;
    expirationTime: string;
    author: string[];
    section: string;
    tags: string[];
  };
  preview: {
    facebook: {
      title: string;
      description: string;
      image: string;
    };
    twitter: {
      title: string;
      description: string;
      image: string;
    };
    linkedin: {
      title: string;
      description: string;
      image: string;
    };
  };
  validation: {
    errors: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
  };
}

export default function OpenGraphCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<OpenGraphData | null>(null);
  const [activeTab, setActiveTab] = useState('facebook');

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const checkOpenGraph = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call - replace with actual Open Graph analysis implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: OpenGraphData = {
        url: url,
        basic: {
          title: 'Example Website - Home Page',
          type: 'website',
          image: 'https://example.com/image.jpg',
          url: url,
          description: 'This is an example website description for demonstration purposes.',
          siteName: 'Example Website',
        },
        optional: {
          locale: 'en_US',
          alternateLocale: ['es_ES', 'fr_FR'],
          audio: '',
          video: '',
          determiner: 'auto',
        },
        article: {
          publishedTime: '2024-01-01T00:00:00Z',
          modifiedTime: '2024-01-02T00:00:00Z',
          expirationTime: '',
          author: ['John Doe'],
          section: 'Technology',
          tags: ['web', 'development', 'seo'],
        },
        preview: {
          facebook: {
            title: 'Example Website - Home Page',
            description: 'This is an example website description for demonstration purposes.',
            image: 'https://example.com/image.jpg',
          },
          twitter: {
            title: 'Example Website - Home Page',
            description: 'This is an example website description for demonstration purposes.',
            image: 'https://example.com/image.jpg',
          },
          linkedin: {
            title: 'Example Website - Home Page',
            description: 'This is an example website description for demonstration purposes.',
            image: 'https://example.com/image.jpg',
          },
        },
        validation: {
          errors: [],
          warnings: ['Image dimensions could be optimized for social sharing'],
          recommendations: [
            'Add alternate locale tags for better internationalization',
            'Consider adding article-specific meta tags',
            'Optimize image dimensions for social media platforms',
          ],
          score: 85,
        },
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze Open Graph tags. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '📱' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Open Graph <span className="text-pink-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze and preview your Open Graph meta tags for social media sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL (e.g., https://example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <button
                    onClick={checkOpenGraph}
                    disabled={loading}
                    className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Tags'}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Score and Validation */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-pink-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Score</h4>
                      <div className="text-3xl font-bold text-gray-900">{result.validation.score}/100</div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-600 rounded-full h-2"
                            style={{ width: `${result.validation.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-3 bg-white p-4 rounded-lg border border-pink-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Validation Results</h4>
                      <div className="space-y-2">
                        {result.validation.errors.length > 0 && (
                          <div className="text-red-600 text-sm">
                            <strong>Errors:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {result.validation.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.validation.warnings.length > 0 && (
                          <div className="text-orange-600 text-sm">
                            <strong>Warnings:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {result.validation.warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Preview */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Preview</h3>
                  
                  {/* Platform Tabs */}
                  <div className="flex space-x-4 mb-6">
                    {['facebook', 'twitter', 'linkedin'].map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setActiveTab(platform)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          activeTab === platform
                            ? 'bg-pink-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-pink-50'
                        }`}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Preview Card */}
                  <div className="bg-white rounded-lg border border-pink-200 overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img
                        src={result.preview[activeTab as keyof typeof result.preview].image}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {result.preview[activeTab as keyof typeof result.preview].title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {result.preview[activeTab as keyof typeof result.preview].description}
                      </p>
                      <div className="mt-2 text-sm text-gray-500">{result.url}</div>
                    </div>
                  </div>
                </div>

                {/* Basic Meta Tags */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Meta Tags</h3>
                  <div className="bg-white rounded-lg border border-pink-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-pink-200">
                      <thead className="bg-pink-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-200">
                        {Object.entries(result.basic).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              og:{key}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 break-all">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Optional Meta Tags */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Optional Meta Tags</h3>
                  <div className="bg-white rounded-lg border border-pink-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-pink-200">
                      <thead className="bg-pink-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-200">
                        {Object.entries(result.optional).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              og:{key}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 break-all">
                              {Array.isArray(value) ? value.join(', ') : value || 'Not set'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Article Meta Tags */}
                {result.article && (
                  <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Article Meta Tags</h3>
                    <div className="bg-white rounded-lg border border-pink-200 overflow-hidden">
                      <table className="min-w-full divide-y divide-pink-200">
                        <thead className="bg-pink-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Property
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Content
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-pink-200">
                          {Object.entries(result.article).map(([key, value]) => (
                            <tr key={key}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                article:{key}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 break-all">
                                {Array.isArray(value) ? value.join(', ') : value || 'Not set'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {result.validation.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-pink-200">
                        <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <p className="text-gray-600">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-pink-50 rounded-xl p-6 border border-pink-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Open Graph Protocol</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is Open Graph?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    The Open Graph protocol enables any web page to become a rich object in a social graph. It is used by Facebook, Twitter, LinkedIn, and other platforms to create rich previews when content is shared.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-pink-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Meta Tags</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>og:title:</strong> The title of your page</li>
                      <li><strong>og:type:</strong> The type of object (website, article, etc.)</li>
                      <li><strong>og:image:</strong> The image used in previews</li>
                      <li><strong>og:url:</strong> The canonical URL</li>
                      <li><strong>og:description:</strong> A brief description</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Use high-quality images in the correct dimensions
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Write compelling titles and descriptions
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Include all required meta tags
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test across different platforms
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
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-rose-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
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