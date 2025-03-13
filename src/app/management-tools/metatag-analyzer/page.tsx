'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Domain to IP Checker',
    description: 'Convert domain names to IP addresses',
    link: '/management-tools/domain-to-ip',
    icon: '🌐',
  },
  {
    title: 'HTTP Status Checker',
    description: 'Check HTTP status codes of URLs',
    link: '/management-tools/http-status-checker',
    icon: '🔍',
  },
  {
    title: 'Server Status Checker',
    description: 'Check server status and response time',
    link: '/management-tools/server-status-checker',
    icon: '⚡',
  },
  {
    title: 'Hosting Checker',
    description: 'Find hosting information for domains',
    link: '/management-tools/hosting-checker',
    icon: '🏢',
  },
];

interface MetaTag {
  name: string;
  content: string;
  type: 'name' | 'property' | 'http-equiv';
  category: string;
}

interface MetaTagAnalysis {
  url: string;
  title: string;
  description: string;
  metaTags: MetaTag[];
  socialTags: {
    openGraph: MetaTag[];
    twitter: MetaTag[];
  };
  seoScore: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
}

const metaTagCategories = [
  'Basic',
  'SEO',
  'Social',
  'Technical',
  'Other',
];

export default function MetaTagAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MetaTagAnalysis | null>(null);
  const [activeCategory, setActiveCategory] = useState('Basic');

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analyzeUrl = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call - replace with actual meta tag analysis implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: MetaTagAnalysis = {
        url: url,
        title: 'Example Website - Home Page',
        description: 'This is an example website description for demonstration purposes.',
        metaTags: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
            type: 'name',
            category: 'Technical',
          },
          {
            name: 'description',
            content: 'This is an example website description for demonstration purposes.',
            type: 'name',
            category: 'Basic',
          },
          {
            name: 'keywords',
            content: 'example, website, keywords',
            type: 'name',
            category: 'SEO',
          },
          {
            name: 'robots',
            content: 'index, follow',
            type: 'name',
            category: 'SEO',
          },
          {
            name: 'author',
            content: 'John Doe',
            type: 'name',
            category: 'Basic',
          },
        ],
        socialTags: {
          openGraph: [
            {
              name: 'og:title',
              content: 'Example Website - Home Page',
              type: 'property',
              category: 'Social',
            },
            {
              name: 'og:description',
              content: 'This is an example website description for demonstration purposes.',
              type: 'property',
              category: 'Social',
            },
            {
              name: 'og:image',
              content: 'https://example.com/image.jpg',
              type: 'property',
              category: 'Social',
            },
          ],
          twitter: [
            {
              name: 'twitter:card',
              content: 'summary_large_image',
              type: 'name',
              category: 'Social',
            },
            {
              name: 'twitter:title',
              content: 'Example Website - Home Page',
              type: 'name',
              category: 'Social',
            },
          ],
        },
        seoScore: {
          score: 85,
          issues: [
            'Missing canonical URL tag',
            'Description could be more descriptive',
          ],
          recommendations: [
            'Add a canonical URL tag',
            'Expand the meta description to be more specific',
            'Consider adding more relevant keywords',
          ],
        },
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMetaTagsByCategory = (category: string): MetaTag[] => {
    if (!result) return [];

    const allTags = [
      ...result.metaTags,
      ...result.socialTags.openGraph,
      ...result.socialTags.twitter,
    ];

    return allTags.filter(tag => tag.category === category);
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
                {i % 3 === 0 ? '🏷️' : i % 3 === 1 ? '🔍' : '📊'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Meta Tag <span className="text-green-300">Analyzer</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze and optimize meta tags for better SEO and social sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL (e.g., https://example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button
                    onClick={analyzeUrl}
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze URL'}
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
                {/* Basic Information */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Title</h4>
                      <p className="text-gray-900">{result.title}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                      <p className="text-gray-900">{result.description}</p>
                    </div>
                  </div>
                </div>

                {/* SEO Score */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO Score</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="text-4xl font-bold mb-2 text-green-600">
                        {result.seoScore.score}/100
                      </div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="md:col-span-2 bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Issues Found</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {result.seoScore.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Meta Tags */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Meta Tags</h3>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {metaTagCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            activeCategory === category
                              ? 'bg-green-600 text-white'
                              : 'bg-white text-gray-600 hover:bg-green-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-green-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-green-200">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name/Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-green-200">
                        {getMetaTagsByCategory(activeCategory).map((tag, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {tag.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {tag.content}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-4">
                    {result.seoScore.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-green-200">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Meta Tags</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What are Meta Tags?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Meta tags are snippets of text that describe a page's content. They don't appear on the page itself, but in the page's source code. Meta tags are crucial for SEO and how your content appears on social media.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <h5 className="font-medium text-gray-800 mb-2">Common Meta Tags</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Title:</strong> Page title displayed in search results</li>
                      <li><strong>Description:</strong> Summary of page content</li>
                      <li><strong>Keywords:</strong> Relevant keywords for the page</li>
                      <li><strong>Viewport:</strong> Controls mobile viewport settings</li>
                      <li><strong>Robots:</strong> Instructions for search engines</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Write unique titles and descriptions for each page
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep titles under 60 characters
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Write descriptions between 150-160 characters
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Include relevant social media tags
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