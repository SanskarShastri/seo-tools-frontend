'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'AdSense Calculator',
    description: 'Calculate potential AdSense earnings',
    link: '/management-tools/adsense-calculator',
    icon: '💰',
  },
  {
    title: 'FAQ Schema Generator',
    description: 'Generate FAQ schema markup',
    link: '/management-tools/faq-schema-generator',
    icon: '❓',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
  {
    title: 'WordPress Theme Detector',
    description: 'Identify WordPress themes and plugins',
    link: '/management-tools/wordpress-theme-detector',
    icon: '🎨',
  },
];

interface KeywordSuggestion {
  keyword: string;
  searchVolume: number;
  competition: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
  related: string[];
}

interface KeywordGroup {
  title: string;
  keywords: KeywordSuggestion[];
}

export default function KeywordSuggestionPage() {
  const [seed, setSeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<KeywordGroup[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'questions' | 'related' | 'long-tail'>('all');

  const generateSuggestions = async () => {
    if (!seed.trim()) return;

    setIsLoading(true);
    setResults([]);

    try {
      // Simulated API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulated response
      const mockResults: KeywordGroup[] = [
        {
          title: 'Main Keywords',
          keywords: [
            {
              keyword: seed,
              searchVolume: 12000,
              competition: 0.75,
              cpc: 1.20,
              trend: 'up',
              related: ['best ' + seed, 'buy ' + seed, seed + ' online'],
            },
            {
              keyword: 'best ' + seed,
              searchVolume: 8000,
              competition: 0.65,
              cpc: 0.90,
              trend: 'stable',
              related: ['top ' + seed, seed + ' reviews', 'premium ' + seed],
            },
          ],
        },
        {
          title: 'Questions',
          keywords: [
            {
              keyword: 'how to ' + seed,
              searchVolume: 5000,
              competition: 0.45,
              cpc: 0.70,
              trend: 'up',
              related: ['guide to ' + seed, seed + ' tutorial', 'learn ' + seed],
            },
            {
              keyword: 'what is ' + seed,
              searchVolume: 4500,
              competition: 0.40,
              cpc: 0.65,
              trend: 'stable',
              related: ['define ' + seed, seed + ' meaning', 'about ' + seed],
            },
          ],
        },
        {
          title: 'Long-tail Keywords',
          keywords: [
            {
              keyword: 'best ' + seed + ' for beginners',
              searchVolume: 2000,
              competition: 0.35,
              cpc: 0.85,
              trend: 'up',
              related: ['easy ' + seed, 'starter ' + seed],
            },
            {
              keyword: 'how to use ' + seed + ' effectively',
              searchVolume: 1800,
              competition: 0.30,
              cpc: 0.75,
              trend: 'up',
              related: ['tips for ' + seed, seed + ' guide'],
            },
          ],
        },
      ];

      setResults(mockResults);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getCompetitionLabel = (competition: number): string => {
    if (competition < 0.33) return 'Low';
    if (competition < 0.66) return 'Medium';
    return 'High';
  };

  const getCompetitionColor = (competition: number): string => {
    if (competition < 0.33) return 'text-green-600';
    if (competition < 0.66) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
    }
  };

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(group => {
        switch (activeTab) {
          case 'questions':
            return group.title === 'Questions';
          case 'related':
            return group.title === 'Main Keywords';
          case 'long-tail':
            return group.title === 'Long-tail Keywords';
          default:
            return true;
        }
      });

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
                {i % 3 === 0 ? '🔍' : i % 3 === 1 ? '🎯' : '📝'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Keyword <span className="text-purple-300">Suggestion</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Discover high-performing keywords for your content
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Enter a keyword (e.g., digital marketing)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <button
                  onClick={generateSuggestions}
                  disabled={!seed.trim() || isLoading}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Generating...' : 'Get Suggestions'}
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            {results.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {(['all', 'questions', 'related', 'long-tail'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {filteredResults.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-purple-50 rounded-xl p-6 border border-purple-100 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{group.title}</h3>
                <div className="space-y-4">
                  {group.keywords.map((keyword, keywordIndex) => (
                    <div
                      key={keywordIndex}
                      className="bg-white rounded-lg p-4 border border-purple-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{keyword.keyword}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Volume: {formatNumber(keyword.searchVolume)}
                            </span>
                            <span className={`text-sm ${getCompetitionColor(keyword.competition)}`}>
                              Competition: {getCompetitionLabel(keyword.competition)}
                            </span>
                            <span className="text-sm text-gray-600">
                              CPC: {formatCurrency(keyword.cpc)}
                            </span>
                            <span className="text-sm" title="Trend">
                              {getTrendIcon(keyword.trend)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {keyword.related.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Related Keywords:</h5>
                          <div className="flex flex-wrap gap-2">
                            {keyword.related.map((related, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-sm bg-purple-50 text-purple-700 rounded"
                              >
                                {related}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Information Section */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About Keyword Research</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Understanding Metrics</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>Search Volume:</strong> Monthly searches
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>Competition:</strong> Difficulty to rank
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>CPC:</strong> Cost per click in ads
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>Trend:</strong> Search popularity trend
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Target long-tail keywords for better conversion</li>
                        <li>• Consider search intent and relevance</li>
                        <li>• Balance volume with competition</li>
                        <li>• Monitor trends for seasonal keywords</li>
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