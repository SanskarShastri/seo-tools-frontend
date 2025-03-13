'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'User Agent Checker',
    description: 'Check your browser\'s user agent',
    link: '/management-tools/user-agent-checker',
    icon: '🔍',
  },
  {
    title: 'Browser Checker',
    description: 'Check browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
  {
    title: 'DNS Record Checker',
    description: 'Check DNS records of any domain',
    link: '/management-tools/dns-record-checker',
    icon: '📋',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface Header {
  name: string;
  value: string;
  description: string;
  category: string;
  security?: {
    level: 'good' | 'warning' | 'danger';
    message: string;
  };
}

interface HeadersResponse {
  url: string;
  status: number;
  statusText: string;
  headers: Header[];
  timing: {
    start: number;
    end: number;
    duration: number;
  };
}

export default function HTTPHeadersPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [headersResponse, setHeadersResponse] = useState<HeadersResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showInfo, setShowInfo] = useState(true);

  const categories = [
    { id: 'all', label: 'All Headers' },
    { id: 'security', label: 'Security' },
    { id: 'caching', label: 'Caching' },
    { id: 'cors', label: 'CORS' },
    { id: 'content', label: 'Content' },
    { id: 'other', label: 'Other' },
  ];

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const fetchHeaders = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      // In a real implementation, this would use a backend API to fetch headers
      // For demo purposes, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockHeaders: Header[] = [
        {
          name: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          description: 'Defines content security policies to prevent XSS attacks',
          category: 'security',
          security: {
            level: 'good',
            message: 'Strong CSP policy in place',
          },
        },
        {
          name: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
          description: 'Forces browsers to use HTTPS for future requests',
          category: 'security',
          security: {
            level: 'good',
            message: 'HSTS is properly configured',
          },
        },
        {
          name: 'X-Content-Type-Options',
          value: 'nosniff',
          description: 'Prevents browsers from MIME-sniffing responses',
          category: 'security',
          security: {
            level: 'good',
            message: 'Protection against MIME type sniffing',
          },
        },
        {
          name: 'Cache-Control',
          value: 'public, max-age=3600',
          description: 'Directives for caching mechanisms in both requests and responses',
          category: 'caching',
        },
        {
          name: 'ETag',
          value: '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
          description: 'Identifier for a specific version of a resource',
          category: 'caching',
        },
        {
          name: 'Access-Control-Allow-Origin',
          value: '*',
          description: 'Indicates whether the response can be shared with resources with the given origin',
          category: 'cors',
          security: {
            level: 'warning',
            message: 'Allows requests from any origin',
          },
        },
        {
          name: 'Content-Type',
          value: 'text/html; charset=utf-8',
          description: 'Indicates the media type of the resource',
          category: 'content',
        },
        {
          name: 'Content-Encoding',
          value: 'gzip',
          description: 'Compression method used on the response',
          category: 'content',
        },
        {
          name: 'Server',
          value: 'nginx/1.18.0',
          description: 'Information about the server software',
          category: 'other',
          security: {
            level: 'warning',
            message: 'Server version disclosure',
          },
        },
      ];

      const endTime = performance.now();

      setHeadersResponse({
        url,
        status: 200,
        statusText: 'OK',
        headers: mockHeaders,
        timing: {
          start: startTime,
          end: endTime,
          duration: endTime - startTime,
        },
      });
    } catch (err) {
      setError('Failed to fetch headers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSecurityScore = (headers: Header[]): { score: number; maxScore: number } => {
    let score = 0;
    let maxScore = 0;

    const securityHeaders = headers.filter(h => h.security);
    securityHeaders.forEach(header => {
      maxScore += 1;
      if (header.security?.level === 'good') score += 1;
    });

    return { score, maxScore };
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800 border-green-200';
    if (status >= 300 && status < 400) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getSecurityLevelColor = (level: 'good' | 'warning' | 'danger') => {
    switch (level) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
                {i % 3 === 0 ? '📋' : i % 3 === 1 ? '🔒' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              HTTP <span className="text-blue-300">Headers</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Inspect and analyze HTTP response headers from any URL
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL (e.g., https://example.com)"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={fetchHeaders}
                    disabled={loading || !url.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Fetching...' : 'Analyze Headers'}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            {headersResponse && (
              <>
                {/* Response Overview */}
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className={`px-6 py-4 ${getStatusColor(headersResponse.status)}`}>
                        <h3 className="text-lg font-semibold">Status</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-3xl font-bold mb-2">{headersResponse.status}</div>
                        <div className="text-gray-600">{headersResponse.statusText}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-blue-100 text-blue-800 border-blue-200">
                        <h3 className="text-lg font-semibold">Response Time</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-3xl font-bold mb-2">
                          {Math.round(headersResponse.timing.duration)}ms
                        </div>
                        <div className="text-gray-600">Total Duration</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-green-100 text-green-800 border-green-200">
                        <h3 className="text-lg font-semibold">Security Score</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-3xl font-bold mb-2">
                          {getSecurityScore(headersResponse.headers).score}/{getSecurityScore(headersResponse.headers).maxScore}
                        </div>
                        <div className="text-gray-600">Security Headers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Headers List */}
                <div className="space-y-4">
                  {headersResponse.headers
                    .filter(header => selectedCategory === 'all' || header.category === selectedCategory)
                    .map((header, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{header.name}</h3>
                          {header.security && (
                            <span className={`px-3 py-1 rounded-full text-sm ${getSecurityLevelColor(header.security.level)}`}>
                              {header.security.level === 'good' ? '✓ Secure' : header.security.level === 'warning' ? '⚠️ Warning' : '❌ Danger'}
                            </span>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500">Value</div>
                              <div className="mt-1 font-mono text-sm text-gray-900 break-all">{header.value}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">Description</div>
                              <div className="mt-1 text-sm text-gray-600">{header.description}</div>
                            </div>
                            {header.security && (
                              <div>
                                <div className="text-sm font-medium text-gray-500">Security Note</div>
                                <div className="mt-1 text-sm text-gray-600">{header.security.message}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About HTTP Headers</h3>
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
                    <h4 className="text-lg font-medium text-gray-800 mb-2">What are HTTP Headers?</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Metadata:</span> Information about the HTTP communication
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Security:</span> Controls for secure communication
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Performance:</span> Caching and compression settings
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Important Headers</h4>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Content-Security-Policy (Security)</li>
                        <li>• Cache-Control (Performance)</li>
                        <li>• Access-Control-Allow-Origin (CORS)</li>
                        <li>• Content-Type (Content)</li>
                        <li>• X-Content-Type-Options (Security)</li>
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