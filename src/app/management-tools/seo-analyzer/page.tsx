'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'WordPress Theme Detector',
    description: 'Identify WordPress themes and plugins',
    link: '/management-tools/wordpress-theme-detector',
    icon: '🎨',
  },
  {
    title: 'DNS Record Checker',
    description: 'Check DNS records of any domain',
    link: '/management-tools/dns-record-checker',
    icon: '🌐',
  },
  {
    title: 'JSON to Schema',
    description: 'Convert JSON to JSON Schema',
    link: '/management-tools/json-to-schema',
    icon: '📝',
  },
];

interface MetaTag {
  name: string;
  content: string;
  status: 'good' | 'warning' | 'error';
  recommendation?: string;
}

interface ContentAnalysis {
  type: string;
  items: Array<{
    name: string;
    value: string | number;
    status: 'good' | 'warning' | 'error';
    recommendation?: string;
  }>;
}

interface SEOResult {
  score: number;
  metaTags: MetaTag[];
  contentAnalysis: {
    headings: ContentAnalysis;
    content: ContentAnalysis;
    links: ContentAnalysis;
    performance: ContentAnalysis;
    mobile: ContentAnalysis;
  };
}

export default function SEOAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<SEOResult | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showInfo, setShowInfo] = useState(true);

  const analyzeSEO = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      // In a real implementation, this would make an API call to analyze the URL
      // For demo purposes, we'll simulate some results
      const mockResults: SEOResult = {
        score: 78,
        metaTags: [
          {
            name: 'Title',
            content: 'Example Website - Home Page',
            status: 'warning',
            recommendation: 'Title should be between 50-60 characters',
          },
          {
            name: 'Description',
            content: 'This is an example website description that provides information about our services.',
            status: 'good',
          },
          {
            name: 'Robots',
            content: 'index, follow',
            status: 'good',
          },
        ],
        contentAnalysis: {
          headings: {
            type: 'Headings Structure',
            items: [
              {
                name: 'H1 Usage',
                value: '1 tag found',
                status: 'good',
              },
              {
                name: 'H2 Usage',
                value: '5 tags found',
                status: 'good',
              },
              {
                name: 'Heading Structure',
                value: 'Properly nested',
                status: 'good',
              },
            ],
          },
          content: {
            type: 'Content Quality',
            items: [
              {
                name: 'Word Count',
                value: '850 words',
                status: 'warning',
                recommendation: 'Consider adding more content (recommended: 1000+ words)',
              },
              {
                name: 'Keyword Density',
                value: '2.3%',
                status: 'good',
              },
              {
                name: 'Readability',
                value: 'Grade 8 (Good)',
                status: 'good',
              },
            ],
          },
          links: {
            type: 'Link Analysis',
            items: [
              {
                name: 'Internal Links',
                value: '12 links found',
                status: 'good',
              },
              {
                name: 'External Links',
                value: '5 links found',
                status: 'good',
              },
              {
                name: 'Broken Links',
                value: '1 found',
                status: 'error',
                recommendation: 'Fix or remove broken links',
              },
            ],
          },
          performance: {
            type: 'Performance Metrics',
            items: [
              {
                name: 'Page Size',
                value: '1.2 MB',
                status: 'warning',
                recommendation: 'Consider optimizing images and resources',
              },
              {
                name: 'Load Time',
                value: '2.8 seconds',
                status: 'warning',
                recommendation: 'Aim for under 2 seconds load time',
              },
              {
                name: 'HTTPS',
                value: 'Enabled',
                status: 'good',
              },
            ],
          },
          mobile: {
            type: 'Mobile Optimization',
            items: [
              {
                name: 'Mobile Friendly',
                value: 'Yes',
                status: 'good',
              },
              {
                name: 'Viewport',
                value: 'Properly configured',
                status: 'good',
              },
              {
                name: 'Font Size',
                value: 'Legible',
                status: 'good',
              },
            ],
          },
        },
      };

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      setResults(mockResults);
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'meta', label: 'Meta Tags' },
    { id: 'content', label: 'Content' },
    { id: 'technical', label: 'Technical' },
    { id: 'mobile', label: 'Mobile' },
  ];

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
                {i % 3 === 0 ? '📊' : i % 3 === 1 ? '🔍' : '📈'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              SEO <span className="text-green-300">Analyzer</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze your website's SEO performance and get actionable insights
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
                <div className="flex-grow">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to analyze (e.g., https://example.com)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={analyzeSEO}
                    disabled={!url.trim() || loading}
                    className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Analyzing...' : 'Analyze SEO'}
                  </button>
                </div>
              </div>
              {error && (
                <div className="mt-4 text-red-600 text-sm">{error}</div>
              )}
            </div>

            {/* Results */}
            {results && (
              <>
                {/* Score Overview */}
                <div className="mb-8 text-center">
                  <div className="inline-block bg-white rounded-full p-8 border-4 border-green-200">
                    <div className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">SEO Score</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedTab === tab.id
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {selectedTab === 'overview' && (
                    <>
                      {/* Quick Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="text-sm text-gray-600">Meta Tags</div>
                          <div className="mt-2 text-2xl font-semibold">
                            {results.metaTags.filter(tag => tag.status === 'good').length}/{results.metaTags.length}
                          </div>
                          <div className="text-sm text-gray-500">Optimized</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="text-sm text-gray-600">Content Score</div>
                          <div className="mt-2 text-2xl font-semibold">
                            Good
                          </div>
                          <div className="text-sm text-gray-500">Based on analysis</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="text-sm text-gray-600">Mobile Score</div>
                          <div className="mt-2 text-2xl font-semibold">
                            Excellent
                          </div>
                          <div className="text-sm text-gray-500">Mobile-friendly</div>
                        </div>
                      </div>

                      {/* Critical Issues */}
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900">Critical Issues</h3>
                        </div>
                        <div className="p-6">
                          <div className="space-y-4">
                            {Object.values(results.contentAnalysis).flatMap(analysis => 
                              analysis.items.filter(item => item.status === 'error')
                            ).map((issue, index) => (
                              <div key={index} className="flex items-start">
                                <div className="flex-shrink-0">
                                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900">{issue.name}</h4>
                                  <p className="mt-1 text-sm text-gray-500">{issue.recommendation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedTab === 'meta' && (
                    <div className="space-y-4">
                      {results.metaTags.map((tag, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className={`px-6 py-4 ${getStatusColor(tag.status)}`}>
                            <h3 className="text-lg font-semibold">{tag.name}</h3>
                          </div>
                          <div className="p-6">
                            <div className="font-mono text-sm break-all">{tag.content}</div>
                            {tag.recommendation && (
                              <div className="mt-4 text-sm text-gray-600">{tag.recommendation}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'content' && (
                    <div className="space-y-6">
                      {['headings', 'content'].map((section) => (
                        <div key={section} className="bg-white rounded-xl border border-gray-200">
                          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                              {results.contentAnalysis[section as keyof typeof results.contentAnalysis].type}
                            </h3>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {results.contentAnalysis[section as keyof typeof results.contentAnalysis].items.map((item, index) => (
                              <div key={index} className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                    <p className="mt-1 text-sm text-gray-500">{item.value}</p>
                                  </div>
                                  <div className={`ml-4 flex-shrink-0 rounded-full p-1 ${getStatusColor(item.status)}`}>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                  </div>
                                </div>
                                {item.recommendation && (
                                  <div className="mt-4 text-sm text-gray-600">{item.recommendation}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'technical' && (
                    <div className="space-y-6">
                      {['links', 'performance'].map((section) => (
                        <div key={section} className="bg-white rounded-xl border border-gray-200">
                          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 capitalize">
                              {results.contentAnalysis[section as keyof typeof results.contentAnalysis].type}
                            </h3>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {results.contentAnalysis[section as keyof typeof results.contentAnalysis].items.map((item, index) => (
                              <div key={index} className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                    <p className="mt-1 text-sm text-gray-500">{item.value}</p>
                                  </div>
                                  <div className={`ml-4 flex-shrink-0 rounded-full p-1 ${getStatusColor(item.status)}`}>
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 8 8">
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                  </div>
                                </div>
                                {item.recommendation && (
                                  <div className="mt-4 text-sm text-gray-600">{item.recommendation}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'mobile' && (
                    <div className="space-y-4">
                      {results.contentAnalysis.mobile.items.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className={`px-6 py-4 ${getStatusColor(item.status)}`}>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                          </div>
                          <div className="p-6">
                            <div className="text-sm text-gray-600">{item.value}</div>
                            {item.recommendation && (
                              <div className="mt-4 text-sm text-gray-500">{item.recommendation}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About SEO Analysis</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-green-600 hover:text-green-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Key Metrics</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Meta Tags:</span> Title, description, and robots directives
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Content Quality:</span> Length, structure, and readability
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Technical SEO:</span> Performance and mobile optimization
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Use descriptive meta titles and descriptions</li>
                        <li>• Optimize content for target keywords</li>
                        <li>• Ensure mobile-friendly design</li>
                        <li>• Improve page load speed</li>
                        <li>• Fix broken links and errors</li>
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