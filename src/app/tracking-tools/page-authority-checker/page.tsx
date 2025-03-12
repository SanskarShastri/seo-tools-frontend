'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Domain Authority Checker',
    description: 'Check domain authority score',
    link: '/tracking-tools/domain-authority-checker',
    icon: '🌐',
  },
  {
    title: 'DA PA Checker',
    description: 'Check both domain and page authority',
    link: '/tracking-tools/da-pa-checker',
    icon: '📊',
  },
  {
    title: 'Moz Rank Checker',
    description: 'Check Moz rank for any domain',
    link: '/tracking-tools/moz-rank-checker',
    icon: '📈',
  },
  {
    title: 'Google Index Checker',
    description: 'Check if your URL is indexed by Google',
    link: '/tracking-tools/google-index-checker',
    icon: '🔍',
  },
];

// Types for the page authority result
interface PAResult {
  url: string;
  pageAuthority: number;
  backlinks: number;
  linkingDomains: number;
  onPageSeoScore: number;
  loadTime: number;
  lastUpdated: string;
  history?: {
    date: string;
    score: number;
  }[];
}

export default function PageAuthorityCheckerPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<PAResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkPageAuthority = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL to check');
      return;
    }

    try {
      // URL validation with regex
      const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
      
      // Format URL properly
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      
      if (!urlPattern.test(formattedUrl)) {
        setError('Please enter a valid URL (e.g., example.com/page or https://example.com/page)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate a random PA score between 1 and 100
        const paScore = Math.floor(Math.random() * 100) + 1;
        const backlinks = Math.floor(Math.random() * 5000) + 10;
        const linkingDomains = Math.floor(Math.random() * 500) + 5;
        const onPageSeoScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
        const loadTime = (Math.random() * 3).toFixed(2); // 0-3 seconds
        
        // Generate history data (last 6 months)
        const history = [];
        let previousScore = Math.max(1, paScore - Math.floor(Math.random() * 15));
        
        for (let i = 6; i >= 1; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          
          // Randomly adjust the score slightly up or down
          const adjustment = Math.floor(Math.random() * 5) - 2;
          previousScore = Math.min(100, Math.max(1, previousScore + adjustment));
          
          history.push({
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
            score: previousScore
          });
        }
        
        // Add current score to history
        history.push({
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
          score: paScore
        });
        
        const result: PAResult = {
          url: formattedUrl,
          pageAuthority: paScore,
          backlinks,
          linkingDomains,
          onPageSeoScore,
          loadTime: parseFloat(loadTime),
          lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          history
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the page authority');
      setIsLoading(false);
    }
  };

  // Function to get a color based on PA score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-blue-500';
    if (score >= 60) return 'bg-blue-400';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get a text description based on PA score
  const getScoreDescription = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📄' : i % 3 === 1 ? '📈' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Page Authority <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check the page authority score and SEO metrics for any webpage
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkPageAuthority} className="mb-8">
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a URL to check its page authority
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    URL
                  </span>
                  <input
                    type="text"
                    id="url"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
                    placeholder="example.com/page or https://example.com/page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a full URL including the page path (e.g., example.com/blog/post-name)
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      Check Page Authority
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {results && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Authority Results</h2>
                
                <div className="p-6 rounded-xl border bg-blue-50 border-blue-200">
                  <div className="flex items-center mb-8">
                    <div className="bg-blue-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700 uppercase tracking-wide font-semibold">URL</div>
                      <h3 className="text-xl font-bold text-gray-800 break-all">{results.url}</h3>
                    </div>
                  </div>
                  
                  {/* PA Score Display */}
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm flex-1">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Page Authority</div>
                        <div className="relative mx-auto w-32 h-32 mb-4">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-gray-800">{results.pageAuthority}</span>
                            <span className="text-base text-gray-500">/100</span>
                          </div>
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                              strokeDasharray="100, 100"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={results.pageAuthority >= 80 ? '#3B82F6' : 
                                      results.pageAuthority >= 60 ? '#60A5FA' : 
                                      results.pageAuthority >= 40 ? '#FBBF24' : 
                                      results.pageAuthority >= 20 ? '#F97316' : '#EF4444'}
                              strokeWidth="3"
                              strokeDasharray={`${results.pageAuthority}, 100`}
                            />
                          </svg>
                        </div>
                        <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                          results.pageAuthority >= 80 ? 'bg-blue-100 text-blue-800' : 
                          results.pageAuthority >= 60 ? 'bg-blue-100 text-blue-800' : 
                          results.pageAuthority >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                          results.pageAuthority >= 20 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getScoreDescription(results.pageAuthority)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm flex-1">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">PA History</div>
                      </div>
                      <div className="h-32 flex items-end justify-between space-x-1">
                        {results.history?.map((item, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              {item.score}
                            </div>
                            <div 
                              className={`w-full ${getScoreColor(item.score)}`} 
                              style={{ height: `${Math.max(5, item.score)}%` }}
                            ></div>
                            <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                              {item.date}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-gray-500 mb-1">Backlinks</div>
                      <div className="font-bold text-xl text-gray-800">{results.backlinks.toLocaleString()}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-gray-500 mb-1">Linking Domains</div>
                      <div className="font-bold text-xl text-gray-800">{results.linkingDomains.toLocaleString()}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-gray-500 mb-1">On-Page SEO</div>
                      <div className="flex items-center">
                        <div className="font-bold text-xl text-gray-800 mr-2">{results.onPageSeoScore}</div>
                        <div className="text-sm text-gray-500">/100</div>
                        <div className={`ml-2 w-3 h-3 rounded-full ${
                          results.onPageSeoScore >= 80 ? 'bg-green-500' : 
                          results.onPageSeoScore >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                      <div className="text-sm text-gray-500 mb-1">Load Time</div>
                      <div className="font-bold text-xl text-gray-800">{results.loadTime}s</div>
                      <div className={`h-1 mt-2 rounded-full ${
                        results.loadTime < 1 ? 'bg-green-500' : 
                        results.loadTime < 2 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 text-sm text-gray-700">
                    <div className="flex justify-between items-center">
                      <span>Last Updated: {results.lastUpdated}</span>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Data is simulated for demo purposes</div>
                    </div>
                  </div>
                </div>

                {/* What is Page Authority */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What is Page Authority?</h3>
                  <p className="text-gray-700 mb-4">
                    Page Authority (PA) is a score developed by Moz that predicts how well a specific page will rank on search engines. It ranges from 1 to 100, with higher scores corresponding to a greater ability to rank. It's calculated based on multiple factors including link metrics, on-page optimization, and more.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Page Authority vs. Domain Authority</h4>
                        <p className="text-gray-600 text-sm">While Domain Authority measures the predictive ranking strength of entire domains, Page Authority measures the strength of individual pages.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">How to Use PA Scores</h4>
                        <p className="text-gray-600 text-sm">PA is most valuable as a comparative metric. Use it to compare the strength of pages within your site or against competitor pages.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">What Affects Page Authority</h4>
                        <p className="text-gray-600 text-sm">Key factors include the quality and quantity of links pointing to the page, on-page optimization, content quality, and user engagement metrics.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Improving Page Authority</h4>
                        <p className="text-gray-600 text-sm">To improve PA, focus on building quality backlinks to the specific page, optimizing on-page elements, and creating high-quality, engaging content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
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