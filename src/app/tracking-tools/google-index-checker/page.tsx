'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Google Cache Checker',
    description: 'Check the cached version of any webpage',
    link: '/tracking-tools/google-cache-checker',
    icon: '🔄',
  },
  {
    title: 'Domain Authority Checker',
    description: 'Check domain authority score',
    link: '/tracking-tools/domain-authority-checker',
    icon: '📊',
  },
  {
    title: 'Domain Age Checker',
    description: 'Find out how old a domain is',
    link: '/tracking-tools/domain-age-checker',
    icon: '📅',
  },
  {
    title: 'Redirect Checker',
    description: 'Track URL redirects and status codes',
    link: '/tracking-tools/redirect-checker',
    icon: '↪️',
  },
];

export default function GoogleIndexCheckerPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<{
    url: string;
    indexed: boolean;
    indexedPages?: number;
    lastCrawled?: string;
    sitemapStatus?: string;
    message?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkIndexStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL to check');
      return;
    }

    try {
      // URL validation with regex
      const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
      if (!urlPattern.test(url)) {
        setError('Please enter a valid URL');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // For demo purposes, we'll return mock data
        // In a real application, you would make a call to your backend API
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        const domain = new URL(formattedUrl).hostname;
        
        // Simulate random results (mostly positive)
        const isIndexed = Math.random() > 0.2;
        const indexedPages = Math.floor(Math.random() * 10000) + 100;
        
        // Generate a random date within the last month
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        const randomTimestamp = lastMonth.getTime() + Math.random() * (now.getTime() - lastMonth.getTime());
        const randomDate = new Date(randomTimestamp);
        
        const result = {
          url: formattedUrl,
          indexed: isIndexed,
          indexedPages: isIndexed ? indexedPages : 0,
          lastCrawled: isIndexed ? randomDate.toISOString().split('T')[0] : undefined,
          sitemapStatus: isIndexed ? (Math.random() > 0.3 ? 'Found' : 'Not Found') : undefined,
          message: isIndexed 
            ? `Found ${indexedPages} pages indexed for ${domain}`
            : `No pages from ${domain} appear to be indexed by Google`
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the index status');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔍' : i % 3 === 1 ? '🌐' : '📊'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Google Index <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check if your URL is indexed by Google and get valuable indexing insights
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkIndexStatus} className="mb-8">
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a URL to check its indexing status
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
                  Enter a full URL (https://example.com) or just the domain (example.com)
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      Check Index Status
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Index Status Results</h2>
                
                <div className={`p-6 rounded-xl border ${results.indexed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center mb-4">
                    {results.indexed ? (
                      <div className="bg-green-500 rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="bg-red-500 rounded-full p-2 mr-4">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <h3 className={`text-xl font-semibold ${results.indexed ? 'text-green-800' : 'text-red-800'}`}>
                      {results.indexed ? 'URL is indexed by Google' : 'URL is not indexed by Google'}
                    </h3>
                  </div>
                  
                  <div className="ml-12">
                    <p className={`text-lg ${results.indexed ? 'text-green-700' : 'text-red-700'}`}>
                      {results.message}
                    </p>
                    
                    {results.indexed && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500">Indexed Pages</h4>
                          <p className="text-2xl font-bold text-blue-600">{results.indexedPages?.toLocaleString()}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500">Last Crawled</h4>
                          <p className="text-2xl font-bold text-blue-600">{results.lastCrawled}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
                          <h4 className="text-sm font-medium text-gray-500">Sitemap Status</h4>
                          <p className="text-xl font-bold text-blue-600">
                            {results.sitemapStatus === 'Found' ? (
                              <span className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Sitemap Found
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                No Sitemap Detected
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Indexing Tips */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {results.indexed ? 'Tips to Improve Your Indexing' : 'Tips to Get Your Page Indexed'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Create and submit a sitemap to Google Search Console</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Ensure your robots.txt file is not blocking search engines</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Check for noindex tags that might be preventing indexing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Build quality backlinks to improve crawl frequency</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Use internal linking to help search engines discover new pages</span>
                    </li>
                  </ul>
                </div>

                {/* How Google Indexing Works */}
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">How Google Indexing Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-blue-500 text-3xl mb-2">1</div>
                      <h4 className="font-medium text-gray-800 mb-2">Crawling</h4>
                      <p className="text-sm text-gray-600">Google discovers URLs through links, sitemaps, and submitted URLs. Googlebot crawls these pages.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-blue-500 text-3xl mb-2">2</div>
                      <h4 className="font-medium text-gray-800 mb-2">Processing</h4>
                      <p className="text-sm text-gray-600">Google processes page content, evaluates factors like mobile-friendliness, and renders JavaScript.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-blue-500 text-3xl mb-2">3</div>
                      <h4 className="font-medium text-gray-800 mb-2">Indexing</h4>
                      <p className="text-sm text-gray-600">Pages deemed valuable are stored in Google's index and become eligible to appear in search results.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
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