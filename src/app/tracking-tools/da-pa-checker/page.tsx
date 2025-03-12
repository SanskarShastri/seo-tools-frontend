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
    title: 'Whois Domain Lookup',
    description: 'Get domain registration details',
    link: '/tracking-tools/whois-domain-lookup',
    icon: '🔎',
  },
];

// Types for the authority result
interface AuthorityResult {
  url: string;
  domainAuthority: number;
  pageAuthority: number;
  linkingDomains: number;
  backlinks: number;
  spamScore: number;
  domainAge: string;
  lastUpdated: string;
}

export default function DaPaCheckerPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<AuthorityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'both' | 'da' | 'pa'>('both');

  const checkAuthority = async (e: React.FormEvent) => {
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
        setError('Please enter a valid URL (e.g., example.com or https://example.com/page)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate random scores
        const daScore = Math.floor(Math.random() * 100) + 1;
        const paScore = Math.floor(Math.random() * 100) + 1;
        const linkingDomains = Math.floor(Math.random() * 5000) + 10;
        const backlinks = Math.floor(Math.random() * 50000) + 100;
        const spamScore = Math.floor(Math.random() * 10); // 0-10 range
        
        // Calculate a random domain age between 1-15 years
        const yearsOld = Math.floor(Math.random() * 15) + 1;
        const monthsOld = Math.floor(Math.random() * 12);
        
        const result: AuthorityResult = {
          url: formattedUrl,
          domainAuthority: daScore,
          pageAuthority: paScore,
          linkingDomains,
          backlinks,
          spamScore,
          domainAge: `${yearsOld} years, ${monthsOld} months`,
          lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking domain and page authority');
      setIsLoading(false);
    }
  };

  // Function to get a color based on authority score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get a text description based on authority score
  const getScoreDescription = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Below Average';
    return 'Poor';
  };

  // Function to get a border color based on tab
  const getTabBorderColor = (tab: 'both' | 'da' | 'pa'): string => {
    if (tab === activeTab) {
      return 'border-blue-500 text-blue-600';
    }
    return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
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
            {[...Array(20)].map((_, i) => (
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
                {i % 4 === 0 ? '🌐' : i % 4 === 1 ? '📄' : i % 4 === 2 ? '📊' : '⚡'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              DA PA <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check domain authority and page authority scores for any website
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkAuthority} className="mb-8">
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a URL to check its domain and page authority
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    URL
                  </span>
                  <input
                    type="text"
                    id="url"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
                    placeholder="example.com or https://example.com/page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a domain name or specific page URL to check both metrics at once
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
                      Check DA & PA
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Authority Results</h2>
                
                {/* Results URL Header */}
                <div className="p-6 rounded-xl border bg-blue-50 border-blue-200 mb-8">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700 uppercase tracking-wide font-semibold">URL</div>
                      <h3 className="text-xl font-bold text-gray-800 break-all">{results.url}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Tabs for switching views */}
                <div className="border-b border-gray-200 mb-8">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('both')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabBorderColor('both')}`}
                    >
                      Both Metrics
                    </button>
                    <button
                      onClick={() => setActiveTab('da')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabBorderColor('da')}`}
                    >
                      Domain Authority
                    </button>
                    <button
                      onClick={() => setActiveTab('pa')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabBorderColor('pa')}`}
                    >
                      Page Authority
                    </button>
                  </nav>
                </div>
                
                {/* Authority Scores */}
                {(activeTab === 'both' || activeTab === 'da') && (
                  <div className={`mb-8 ${activeTab === 'both' ? 'grid md:grid-cols-2 gap-6' : ''}`}>
                    <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
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
                                      results.domainAuthority >= 60 ? '#3B82F6' : 
                                      results.domainAuthority >= 40 ? '#FBBF24' : 
                                      results.domainAuthority >= 20 ? '#F97316' : '#EF4444'}
                              strokeWidth="3"
                              strokeDasharray={`${results.domainAuthority}, 100`}
                            />
                          </svg>
                        </div>
                        <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                          results.domainAuthority >= 80 ? 'bg-green-100 text-green-800' : 
                          results.domainAuthority >= 60 ? 'bg-blue-100 text-blue-800' : 
                          results.domainAuthority >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                          results.domainAuthority >= 20 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getScoreDescription(results.domainAuthority)}
                        </div>
                      </div>
                    </div>
                    
                    {activeTab === 'both' && (
                      <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
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
                                stroke={results.pageAuthority >= 80 ? '#10B981' : 
                                        results.pageAuthority >= 60 ? '#3B82F6' : 
                                        results.pageAuthority >= 40 ? '#FBBF24' : 
                                        results.pageAuthority >= 20 ? '#F97316' : '#EF4444'}
                                strokeWidth="3"
                                strokeDasharray={`${results.pageAuthority}, 100`}
                              />
                            </svg>
                          </div>
                          <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                            results.pageAuthority >= 80 ? 'bg-green-100 text-green-800' : 
                            results.pageAuthority >= 60 ? 'bg-blue-100 text-blue-800' : 
                            results.pageAuthority >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                            results.pageAuthority >= 20 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {getScoreDescription(results.pageAuthority)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'pa' && (
                  <div className="mb-8">
                    <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
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
                              stroke={results.pageAuthority >= 80 ? '#10B981' : 
                                      results.pageAuthority >= 60 ? '#3B82F6' : 
                                      results.pageAuthority >= 40 ? '#FBBF24' : 
                                      results.pageAuthority >= 20 ? '#F97316' : '#EF4444'}
                              strokeWidth="3"
                              strokeDasharray={`${results.pageAuthority}, 100`}
                            />
                          </svg>
                        </div>
                        <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                          results.pageAuthority >= 80 ? 'bg-green-100 text-green-800' : 
                          results.pageAuthority >= 60 ? 'bg-blue-100 text-blue-800' : 
                          results.pageAuthority >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                          results.pageAuthority >= 20 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getScoreDescription(results.pageAuthority)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Additional Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Linking Domains</div>
                    <div className="font-bold text-xl text-gray-800">{results.linkingDomains.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Backlinks</div>
                    <div className="font-bold text-xl text-gray-800">{results.backlinks.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Spam Score</div>
                    <div className="flex items-center">
                      <div className="font-bold text-xl text-gray-800 mr-2">{results.spamScore}</div>
                      <div className="text-sm text-gray-500">/10</div>
                      <div className={`ml-2 w-3 h-3 rounded-full ${
                        results.spamScore <= 3 ? 'bg-green-500' : 
                        results.spamScore <= 6 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Domain Age</div>
                    <div className="font-bold text-xl text-gray-800">{results.domainAge}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Last Updated: {results.lastUpdated}</span>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Data is simulated for demo purposes</div>
                  </div>
                </div>
                
                {/* Comparison Chart (visible only on 'both' tab) */}
                {activeTab === 'both' && (
                  <div className="mt-8 bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">DA vs PA Comparison</h3>
                    <div className="h-64 flex items-end space-x-16 justify-center">
                      <div className="flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-2">
                          Domain Authority
                        </div>
                        <div className="w-32 flex flex-col items-center">
                          <div className="text-sm font-medium mb-2">
                            {results.domainAuthority}
                          </div>
                          <div 
                            className={`w-full ${getScoreColor(results.domainAuthority)}`} 
                            style={{ height: `${Math.max(5, results.domainAuthority) * 2}px` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-2">
                          Page Authority
                        </div>
                        <div className="w-32 flex flex-col items-center">
                          <div className="text-sm font-medium mb-2">
                            {results.pageAuthority}
                          </div>
                          <div 
                            className={`w-full ${getScoreColor(results.pageAuthority)}`} 
                            style={{ height: `${Math.max(5, results.pageAuthority) * 2}px` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-4">
                      {results.domainAuthority > results.pageAuthority ? (
                        <p>The domain has more authority than this specific page.</p>
                      ) : results.domainAuthority < results.pageAuthority ? (
                        <p>This specific page has more authority than the domain as a whole.</p>
                      ) : (
                        <p>The page and domain have equal authority scores.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Understanding DA & PA Section */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding DA & PA</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Domain Authority (DA)</h4>
                      <p className="text-gray-700 mb-4 text-sm">
                        Domain Authority is a search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine results. It ranges from 1 to 100, with higher scores corresponding to a greater ability to rank.
                      </p>
                      <div className="flex items-start mb-4">
                        <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <svg className="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">Based on link data, MozRank, MozTrust, and dozens of other factors</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <svg className="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">Useful for comparing the strength of different domains</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Page Authority (PA)</h4>
                      <p className="text-gray-700 mb-4 text-sm">
                        Page Authority is a similar score that predicts how well a specific page will rank in search engine results. It also ranges from 1 to 100, with higher scores indicating greater potential to rank.
                      </p>
                      <div className="flex items-start mb-4">
                        <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <svg className="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">Measures the predictive ranking strength of a single page</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <svg className="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">Best used as a comparative metric when researching competing pages</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Pro Tip:</span> Both DA and PA are most valuable as comparative metrics. Don't focus solely on the absolute score; instead, use it to compare against competitors or track improvements over time.
                    </p>
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