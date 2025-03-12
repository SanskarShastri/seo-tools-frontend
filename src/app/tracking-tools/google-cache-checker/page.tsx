'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Google Index Checker',
    description: 'Check if your URL is indexed by Google',
    link: '/tracking-tools/google-index-checker',
    icon: '🔍',
  },
  {
    title: 'Domain Authority Checker',
    description: 'Check domain authority score',
    link: '/tracking-tools/domain-authority-checker',
    icon: '📊',
  },
  {
    title: 'Whois Domain Lookup',
    description: 'Check domain registration details',
    link: '/tracking-tools/whois-domain-lookup',
    icon: '🔎',
  },
  {
    title: 'Redirect Checker',
    description: 'Track URL redirects and status codes',
    link: '/tracking-tools/redirect-checker',
    icon: '↪️',
  },
];

export default function GoogleCacheCheckerPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<{
    url: string;
    cached: boolean;
    cacheUrl?: string;
    lastCached?: string;
    cacheSize?: string;
    message?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkCacheStatus = async (e: React.FormEvent) => {
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
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        const domain = new URL(formattedUrl).hostname;
        
        // Simulate random results (mostly positive)
        const isCached = Math.random() > 0.3;
        
        // Generate a random date within the last 2 weeks
        const now = new Date();
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(now.getDate() - 14);
        const randomTimestamp = twoWeeksAgo.getTime() + Math.random() * (now.getTime() - twoWeeksAgo.getTime());
        const randomDate = new Date(randomTimestamp);
        
        // Random cache size
        const cacheSizesKB = [182, 245, 310, 427, 516, 678, 723, 931];
        const randomCacheSize = cacheSizesKB[Math.floor(Math.random() * cacheSizesKB.length)];
        
        const result = {
          url: formattedUrl,
          cached: isCached,
          cacheUrl: isCached ? `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(formattedUrl)}` : undefined,
          lastCached: isCached ? `${randomDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : undefined,
          cacheSize: isCached ? `${randomCacheSize} KB` : undefined,
          message: isCached 
            ? `Google has a cached version of ${domain} from ${randomDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })}`
            : `No cache found for ${domain}`
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the cache status');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔄' : i % 3 === 1 ? '📦' : '⏱️'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Google Cache <span className="text-teal-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check if Google has cached your website and when it was last cached
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkCacheStatus} className="mb-8">
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a URL to check its Google cache status
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    URL
                  </span>
                  <input
                    type="text"
                    id="url"
                    className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
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
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Check Cache Status
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cache Status Results</h2>
                
                <div className={`p-6 rounded-xl border ${results.cached ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center mb-4">
                    {results.cached ? (
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
                    <h3 className={`text-xl font-semibold ${results.cached ? 'text-green-800' : 'text-red-800'}`}>
                      {results.cached ? 'Google has a cached version of this URL' : 'No Google cache found for this URL'}
                    </h3>
                  </div>
                  
                  <div className="ml-12">
                    <p className={`text-lg ${results.cached ? 'text-green-700' : 'text-red-700'}`}>
                      {results.message}
                    </p>
                    
                    {results.cached && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500">Last Cached</h4>
                          <p className="text-xl font-bold text-teal-600">{results.lastCached}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-500">Cache Size</h4>
                          <p className="text-xl font-bold text-teal-600">{results.cacheSize}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200 md:col-span-2">
                          <h4 className="text-sm font-medium text-gray-500">View Cached Version</h4>
                          <div className="mt-2">
                            <a 
                              href={results.cacheUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Open Cached Page
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cache Info Section */}
                <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    About Google Cache
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Google's cache is a snapshot of a webpage taken as Google crawls the web. These cached versions help users access content when:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>The original site is temporarily down or unavailable</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>The webpage has changed significantly since Google last visited it</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Users want to see what content was indexed by Google</span>
                    </li>
                  </ul>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Cache Status Matters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">SEO Insights</h4>
                      <p className="text-sm text-gray-600">A cached page indicates that Google has visited and indexed your site, which is essential for SEO performance.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Content Verification</h4>
                      <p className="text-sm text-gray-600">Compare cached versions with current content to ensure Google is seeing your latest updates.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Crawl Frequency</h4>
                      <p className="text-sm text-gray-600">Recent cache dates suggest more frequent crawling, which can lead to faster indexing of new content.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Technical Issues</h4>
                      <p className="text-sm text-gray-600">No cache may indicate problems with robots.txt, noindex tags, or other technical barriers to crawling.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
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