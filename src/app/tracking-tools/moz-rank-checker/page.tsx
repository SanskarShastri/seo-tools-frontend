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
    title: 'DA PA Checker',
    description: 'Check both domain and page authority',
    link: '/tracking-tools/da-pa-checker',
    icon: '📊',
  },
  {
    title: 'Domain Age Checker',
    description: 'Check how old a domain is',
    link: '/tracking-tools/domain-age-checker',
    icon: '📅',
  },
];

// Types for the Moz rank result
interface MozRankResult {
  domain: string;
  mozRank: number;
  domainAuthority: number;
  linkingDomains: number;
  totalLinks: number;
  trustMetrics: {
    mozTrust: number;
    spamScore: number;
    followLinks: number;
    nofollowLinks: number;
  };
  trendData: {
    month: string;
    mozRank: number;
  }[];
  lastUpdated: string;
}

export default function MozRankCheckerPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<MozRankResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkMozRank = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!domain.trim()) {
      setError('Please enter a domain name to check');
      return;
    }

    try {
      // Domain validation with regex
      const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      
      // Format domain properly
      let formattedDomain = domain.trim().toLowerCase();
      
      // Remove protocol if present
      if (formattedDomain.includes('://')) {
        formattedDomain = formattedDomain.split('://')[1];
      }
      
      // Remove path if present
      if (formattedDomain.includes('/')) {
        formattedDomain = formattedDomain.split('/')[0];
      }
      
      // Remove www. if present
      if (formattedDomain.startsWith('www.')) {
        formattedDomain = formattedDomain.substring(4);
      }
      
      if (!domainPattern.test(formattedDomain)) {
        setError('Please enter a valid domain name (e.g., example.com)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate random MozRank between 0.1 and 10
        const mozRank = parseFloat((Math.random() * 9.9 + 0.1).toFixed(1));
        
        // Generate random domain authority between 1 and 100
        const domainAuthority = Math.floor(Math.random() * 100) + 1;
        
        // Generate random linking domains between 10 and 50000
        const linkingDomains = Math.floor(Math.random() * 49990) + 10;
        
        // Generate random total links between linkingDomains and linkingDomains * 50
        const totalLinks = Math.floor(Math.random() * (linkingDomains * 49)) + linkingDomains;
        
        // Generate random trust metrics
        const mozTrust = parseFloat((Math.random() * 9.9 + 0.1).toFixed(1));
        const spamScore = Math.floor(Math.random() * 18); // 0-17
        const followLinks = Math.floor(Math.random() * totalLinks);
        const nofollowLinks = totalLinks - followLinks;
        
        // Generate 6 months of trend data
        const trendData = [];
        let previousRank = parseFloat((Math.random() * 9.9 + 0.1).toFixed(1));
        
        for (let i = 6; i >= 1; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          
          // Allow rank to fluctuate slightly
          const change = (Math.random() - 0.5) * 0.5;
          let newRank = previousRank + change;
          newRank = Math.max(0.1, Math.min(10, newRank));
          previousRank = newRank;
          
          trendData.push({
            month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            mozRank: parseFloat(newRank.toFixed(1))
          });
        }
        
        // Add current month with current rank
        trendData.push({
          month: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          mozRank
        });
        
        const result: MozRankResult = {
          domain: formattedDomain,
          mozRank,
          domainAuthority,
          linkingDomains,
          totalLinks,
          trustMetrics: {
            mozTrust,
            spamScore,
            followLinks,
            nofollowLinks
          },
          trendData,
          lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the domain');
      setIsLoading(false);
    }
  };
  
  // Function to get a color based on MozRank
  const getMozRankColor = (rank: number): string => {
    if (rank >= 8) return 'bg-green-500';
    if (rank >= 6) return 'bg-blue-500';
    if (rank >= 4) return 'bg-yellow-500';
    if (rank >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Function to get a text description based on MozRank
  const getMozRankDescription = (rank: number): string => {
    if (rank >= 8) return 'Excellent';
    if (rank >= 6) return 'Good';
    if (rank >= 4) return 'Average';
    if (rank >= 2) return 'Below Average';
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
                {i % 3 === 0 ? '📈' : i % 3 === 1 ? '🔗' : '🚀'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Moz Rank <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check and analyze the MozRank scores for any domain
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkMozRank} className="mb-8">
              <div className="mb-6">
                <label htmlFor="domain" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a domain name to check its MozRank
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Domain
                  </span>
                  <input
                    type="text"
                    id="domain"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Check MozRank
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">MozRank Results</h2>
                
                {/* Domain Header */}
                <div className="p-6 rounded-xl border bg-blue-50 border-blue-200 mb-8">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700 uppercase tracking-wide font-semibold">Domain</div>
                      <h3 className="text-xl font-bold text-gray-800">{results.domain}</h3>
                    </div>
                  </div>
                </div>
                
                {/* MozRank Score */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">MozRank</div>
                      <div className="relative mx-auto w-32 h-32 mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-800">{results.mozRank}</span>
                          <span className="text-base text-gray-500">/10</span>
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
                            stroke={results.mozRank >= 8 ? '#10B981' : 
                                    results.mozRank >= 6 ? '#3B82F6' : 
                                    results.mozRank >= 4 ? '#FBBF24' : 
                                    results.mozRank >= 2 ? '#F97316' : '#EF4444'}
                            strokeWidth="3"
                            strokeDasharray={`${results.mozRank * 10}, 100`}
                          />
                        </svg>
                      </div>
                      <div className={`text-sm font-medium rounded-full px-3 py-1 inline-block ${
                        results.mozRank >= 8 ? 'bg-green-100 text-green-800' : 
                        results.mozRank >= 6 ? 'bg-blue-100 text-blue-800' : 
                        results.mozRank >= 4 ? 'bg-yellow-100 text-yellow-800' : 
                        results.mozRank >= 2 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {getMozRankDescription(results.mozRank)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">MozRank History</div>
                    </div>
                    <div className="h-32 flex items-end justify-between space-x-1">
                      {results.trendData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {item.mozRank}
                          </div>
                          <div 
                            className={`w-full ${getMozRankColor(item.mozRank)}`} 
                            style={{ height: `${Math.max(5, item.mozRank * 10)}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                            {item.month}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Additional Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Domain Authority</div>
                    <div className="font-bold text-xl text-gray-800">{results.domainAuthority}</div>
                    <div className={`h-1 mt-2 rounded-full ${
                      results.domainAuthority >= 80 ? 'bg-green-500' : 
                      results.domainAuthority >= 60 ? 'bg-blue-500' : 
                      results.domainAuthority >= 40 ? 'bg-yellow-500' : 
                      results.domainAuthority >= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Linking Domains</div>
                    <div className="font-bold text-xl text-gray-800">{results.linkingDomains.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">Total Links</div>
                    <div className="font-bold text-xl text-gray-800">{results.totalLinks.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <div className="text-sm text-gray-500 mb-1">MozTrust</div>
                    <div className="font-bold text-xl text-gray-800">{results.trustMetrics.mozTrust}/10</div>
                  </div>
                </div>

                {/* Trust Metrics */}
                <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Trust & Link Metrics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-gray-500">Spam Score</div>
                          <div className="text-sm font-medium text-gray-700">{results.trustMetrics.spamScore}/17</div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              results.trustMetrics.spamScore <= 4 ? 'bg-green-500' : 
                              results.trustMetrics.spamScore <= 8 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} 
                            style={{ width: `${(results.trustMetrics.spamScore / 17) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {results.trustMetrics.spamScore <= 4 ? 'Low risk' : 
                           results.trustMetrics.spamScore <= 8 ? 'Medium risk' : 
                           'High risk'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-2">MozTrust vs MozRank</div>
                        <div className="flex items-center">
                          <div className="h-16 w-full bg-gray-100 rounded-lg flex items-end relative">
                            <div className="absolute inset-0 flex justify-between items-center px-2">
                              <div className="text-xs font-medium">MozTrust: {results.trustMetrics.mozTrust}</div>
                              <div className="text-xs font-medium">MozRank: {results.mozRank}</div>
                            </div>
                            <div 
                              className="h-8 bg-blue-500 rounded-l-lg" 
                              style={{ width: '50%' }}
                            ></div>
                            <div 
                              className="h-8 bg-green-500 rounded-r-lg" 
                              style={{ width: '50%' }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {results.trustMetrics.mozTrust > results.mozRank ? 
                            'Higher trust than popularity' : 
                            results.trustMetrics.mozTrust < results.mozRank ? 
                            'Higher popularity than trust' : 
                            'Balanced trust and popularity'}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Link Profile</div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="relative pt-1">
                          <div className="text-xs text-gray-500 mb-1">Follow vs Nofollow Links</div>
                          <div className="flex h-4 overflow-hidden text-xs rounded-full">
                            <div 
                              className="bg-blue-500 flex items-center justify-center text-white" 
                              style={{ width: `${(results.trustMetrics.followLinks / results.totalLinks) * 100}%` }}
                            >
                              {Math.round((results.trustMetrics.followLinks / results.totalLinks) * 100)}%
                            </div>
                            <div 
                              className="bg-blue-300 flex items-center justify-center text-white" 
                              style={{ width: `${(results.trustMetrics.nofollowLinks / results.totalLinks) * 100}%` }}
                            >
                              {Math.round((results.trustMetrics.nofollowLinks / results.totalLinks) * 100)}%
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <div>Follow: {results.trustMetrics.followLinks.toLocaleString()}</div>
                            <div>Nofollow: {results.trustMetrics.nofollowLinks.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700">Total Links</div>
                            <div className="text-sm font-bold text-gray-800">{results.totalLinks.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-gray-700">Unique Linking Domains</div>
                            <div className="text-sm font-bold text-gray-800">{results.linkingDomains.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm text-gray-700">Links per Domain (avg)</div>
                            <div className="text-sm font-bold text-gray-800">{(results.totalLinks / results.linkingDomains).toFixed(1)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Last Updated: {results.lastUpdated}</span>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Data is simulated for demo purposes</div>
                  </div>
                </div>

                {/* What is MozRank */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What is MozRank?</h3>
                  <p className="text-gray-700 mb-4">
                    MozRank is a link popularity score that reflects the importance of any given web page on the Internet. Pages with high MozRank scores tend to rank better in search results. The scoring scale is from 0 to 10, with 10 being the highest.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">How MozRank Works</h4>
                        <p className="text-gray-600 text-sm">MozRank measures the popularity of a page by looking at the quantity and quality of other pages that link to it. It's based on a similar algorithm to Google's original PageRank.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Link Equity Flow</h4>
                        <p className="text-gray-600 text-sm">MozRank represents the flow of link equity from one page to another. Higher-value links from high-authority pages pass more value than links from low-authority pages.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">MozRank vs. Domain Authority</h4>
                        <p className="text-gray-600 text-sm">While Domain Authority predicts a domain's ability to rank in search results, MozRank focuses specifically on the link popularity of an individual URL.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Interpreting MozRank</h4>
                        <p className="text-gray-600 text-sm">The MozRank scale is logarithmic, meaning the jump from 4 to 5 is much larger than from 3 to 4. Most sites have a MozRank between 3 and 6, while scores above 7 are rare.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Pro Tip:</span> Focus on earning quality links from high-authority domains rather than quantity of links. A few high-quality links can significantly boost your MozRank more than many low-quality ones.
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