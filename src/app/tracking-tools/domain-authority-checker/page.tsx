'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Page Authority Checker',
    description: 'Check page authority score',
    link: '/tracking-tools/page-authority-checker',
    icon: '📄',
  },
  {
    title: 'Moz Rank Checker',
    description: 'Check Moz rank for any domain',
    link: '/tracking-tools/moz-rank-checker',
    icon: '📈',
  },
  {
    title: 'Domain Age Checker',
    description: 'Find out how old a domain is',
    link: '/tracking-tools/domain-age-checker',
    icon: '📅',
  },
  {
    title: 'DA PA Checker',
    description: 'Check both domain and page authority',
    link: '/tracking-tools/da-pa-checker',
    icon: '📊',
  },
];

// Types for the domain authority result
interface DAResult {
  domain: string;
  domainAuthority: number;
  linkingDomains: number;
  spamScore: number;
  totalBacklinks: number;
  rootDomainBacklinks: number;
  lastUpdated: string;
  history?: {
    date: string;
    score: number;
  }[];
}

export default function DomainAuthorityCheckerPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<DAResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDomainAuthority = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!domain.trim()) {
      setError('Please enter a domain to check');
      return;
    }

    try {
      // Domain validation with regex
      const domainPattern = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/;
      // Extract domain name if a URL was entered
      const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];
      
      if (!domainPattern.test(domainName)) {
        setError('Please enter a valid domain (e.g., example.com)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate a random DA score between 1 and 100
        const daScore = Math.floor(Math.random() * 100) + 1;
        const linkingDomains = Math.floor(Math.random() * 10000) + 50;
        const spamScore = Math.floor(Math.random() * 17); // 0-17 scale
        const totalBacklinks = Math.floor(Math.random() * 100000) + linkingDomains;
        const rootDomainBacklinks = Math.floor(linkingDomains * 0.7);
        
        // Generate history data (last 6 months)
        const history = [];
        let previousScore = Math.max(1, daScore - Math.floor(Math.random() * 15));
        
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
          score: daScore
        });
        
        const result: DAResult = {
          domain: domainName,
          domainAuthority: daScore,
          linkingDomains,
          spamScore,
          totalBacklinks,
          rootDomainBacklinks,
          lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          history
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the domain authority');
      setIsLoading(false);
    }
  };

  // Function to get a color based on DA score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-green-400';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get a text description based on DA score
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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📊' : i % 3 === 1 ? '📈' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Domain Authority <span className="text-green-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check the domain authority score and SEO metrics for any website
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkDomainAuthority} className="mb-8">
              <div className="mb-6">
                <label htmlFor="domain" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a domain to check its authority score
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Domain
                  </span>
                  <input
                    type="text"
                    id="domain"
                    className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a domain name without http:// or www (e.g., example.com)
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || !domain.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      Check Domain Authority
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Domain Authority Results</h2>
                
                <div className="p-6 rounded-xl border bg-green-50 border-green-200">
                  <div className="flex items-center mb-8">
                    <div className="bg-green-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-green-700 uppercase tracking-wide font-semibold">Domain</div>
                      <h3 className="text-2xl font-bold text-gray-800">{results.domain}</h3>
                    </div>
                  </div>
                  
                  {/* DA Score Display */}
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm flex-1">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Domain Authority</div>
                        <div className="relative mx-auto w-32 h-32 mb-4">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-gray-800">{results.domainAuthority}</span>
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
                              stroke={results.domainAuthority >= 80 ? '#10B981' : 
                                      results.domainAuthority >= 60 ? '#34D399' : 
                                      results.domainAuthority >= 40 ? '#FBBF24' : 
                                      results.domainAuthority >= 20 ? '#F97316' : '#EF4444'}
                              strokeWidth="3"
                              strokeDasharray={`${results.domainAuthority}, 100`}
                            />
                          </svg>
                        </div>
                        <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                          results.domainAuthority >= 80 ? 'bg-green-100 text-green-800' : 
                          results.domainAuthority >= 60 ? 'bg-green-100 text-green-800' : 
                          results.domainAuthority >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                          results.domainAuthority >= 20 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getScoreDescription(results.domainAuthority)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm flex-1">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">DA History</div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <div className="text-sm text-gray-500 mb-1">Linking Domains</div>
                      <div className="font-bold text-xl text-gray-800">{results.linkingDomains.toLocaleString()}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <div className="text-sm text-gray-500 mb-1">Total Backlinks</div>
                      <div className="font-bold text-xl text-gray-800">{results.totalBacklinks.toLocaleString()}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                      <div className="text-sm text-gray-500 mb-1">Spam Score</div>
                      <div className="flex items-center">
                        <div className="font-bold text-xl text-gray-800 mr-2">{results.spamScore}</div>
                        <div className="text-sm text-gray-500">/17</div>
                        <div className={`ml-2 w-3 h-3 rounded-full ${
                          results.spamScore < 4 ? 'bg-green-500' : 
                          results.spamScore < 8 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-green-100 mb-4 text-sm text-gray-700">
                    <div className="flex justify-between items-center">
                      <span>Last Updated: {results.lastUpdated}</span>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Data is simulated for demo purposes</div>
                    </div>
                  </div>
                </div>

                {/* What is Domain Authority */}
                <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What is Domain Authority?</h3>
                  <p className="text-gray-700 mb-4">
                    Domain Authority (DA) is a search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine result pages (SERPs). It ranges from 1 to 100, with higher scores corresponding to a greater ability to rank.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">What Affects Domain Authority</h4>
                        <p className="text-gray-600 text-sm">DA is calculated using dozens of factors including linking root domains and number of total links.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">How to Use DA Scores</h4>
                        <p className="text-gray-600 text-sm">DA is best used as a comparative metric when doing research for SEO competitions or tracking the strength of your website over time.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">DA Limitations</h4>
                        <p className="text-gray-600 text-sm">DA is not a metric used by Google in determining search rankings and has no effect on the SERPs directly.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Improving Your DA</h4>
                        <p className="text-gray-600 text-sm">Improve your Domain Authority by getting high-quality, relevant backlinks and removing toxic backlinks pointing to your site.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
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