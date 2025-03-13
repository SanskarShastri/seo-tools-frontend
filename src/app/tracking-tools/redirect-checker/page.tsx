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
    title: 'Google Cache Checker',
    description: 'Check Google cached version of a page',
    link: '/tracking-tools/google-cache-checker',
    icon: '🔄',
  },
];

// Types for the redirect result
interface RedirectHop {
  url: string;
  statusCode: number;
  type: string;
  timing: number;
}

interface RedirectResult {
  url: string;
  finalUrl: string;
  totalRedirects: number;
  totalTime: number;
  redirectChain: RedirectHop[];
  finalStatusCode: number;
  isRedirectLoop: boolean;
  sslInfo?: {
    valid: boolean;
    issuer?: string;
    expiryDate?: string;
  };
}

export default function RedirectCheckerPage() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<RedirectResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkRedirects = async (e: React.FormEvent) => {
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
        setError('Please enter a valid URL (e.g., example.com or https://example.com)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate random number of redirects (0-4)
        const numRedirects = Math.floor(Math.random() * 5);
        
        // Generate redirect chain
        const redirectChain: RedirectHop[] = [];
        let currentUrl = formattedUrl;
        let totalTime = 0;
        
        // Status codes for redirects
        const redirectStatusCodes = [301, 302, 303, 307, 308];
        const finalStatusCodes = [200, 200, 200, 200, 404, 403, 500]; // Mostly 200s with some errors
        
        // Redirect types
        const redirectTypes = ['Permanent Redirect', 'Temporary Redirect', 'See Other', 'Temporary Redirect', 'Permanent Redirect'];
        
        for (let i = 0; i < numRedirects; i++) {
          const timing = Math.floor(Math.random() * 300) + 100; // 100-400ms
          totalTime += timing;
          
          const statusCode = redirectStatusCodes[Math.floor(Math.random() * redirectStatusCodes.length)];
          const type = redirectTypes[redirectStatusCodes.indexOf(statusCode)];
          
          // Generate next URL in chain
          const urlParts = currentUrl.split('://');
          const domain = urlParts[1].split('/')[0];
          const newPath = Math.random() > 0.5 ? '/new-path' : '/redirect';
          const newUrl = `${urlParts[0]}://${domain}${newPath}-${i + 1}`;
          
          redirectChain.push({
            url: currentUrl,
            statusCode,
            type,
            timing
          });
          
          currentUrl = newUrl;
        }
        
        // Add final destination
        const finalTiming = Math.floor(Math.random() * 300) + 100;
        totalTime += finalTiming;
        const finalStatusCode = finalStatusCodes[Math.floor(Math.random() * finalStatusCodes.length)];
        
        redirectChain.push({
          url: currentUrl,
          statusCode: finalStatusCode,
          type: finalStatusCode === 200 ? 'OK' : 'Error',
          timing: finalTiming
        });
        
        // Generate SSL info
        const sslValid = Math.random() > 0.1; // 90% chance of valid SSL
        const sslIssuers = ['Let\'s Encrypt', 'DigiCert Inc', 'Sectigo Limited', 'GlobalSign', 'Amazon'];
        const sslIssuer = sslIssuers[Math.floor(Math.random() * sslIssuers.length)];
        
        // Generate expiry date between 1-12 months from now
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + Math.floor(Math.random() * 12) + 1);
        
        const result: RedirectResult = {
          url: formattedUrl,
          finalUrl: currentUrl,
          totalRedirects: numRedirects,
          totalTime,
          redirectChain,
          finalStatusCode,
          isRedirectLoop: Math.random() > 0.9, // 10% chance of redirect loop
          sslInfo: {
            valid: sslValid,
            issuer: sslIssuer,
            expiryDate: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          }
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking redirects');
      setIsLoading(false);
    }
  };

  // Function to get status code color
  const getStatusCodeColor = (code: number): string => {
    if (code >= 200 && code < 300) return 'text-green-600';
    if (code >= 300 && code < 400) return 'text-blue-600';
    if (code >= 400 && code < 500) return 'text-orange-600';
    return 'text-red-600';
  };

  // Function to get status code background color
  const getStatusCodeBgColor = (code: number): string => {
    if (code >= 200 && code < 300) return 'bg-green-100';
    if (code >= 300 && code < 400) return 'bg-blue-100';
    if (code >= 400 && code < 500) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '↪️' : i % 3 === 1 ? '🔄' : '🔗'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Redirect <span className="text-purple-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Track URL redirects, analyze redirect chains, and check status codes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkRedirects} className="mb-8">
              <div className="mb-6">
                <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a URL to check its redirects
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    URL
                  </span>
                  <input
                    type="text"
                    id="url"
                    className="focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
                    placeholder="example.com or https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a URL to analyze its redirect chain and status codes
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      Check Redirects
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Redirect Analysis Results</h2>
                
                {/* Summary Card */}
                <div className="p-6 rounded-xl border bg-purple-50 border-purple-200 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-purple-700 uppercase tracking-wide font-semibold">Original URL</div>
                      <h3 className="text-xl font-bold text-gray-800 break-all">{results.url}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Total Redirects</div>
                      <div className="font-bold text-xl text-gray-800">{results.totalRedirects}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Total Time</div>
                      <div className="font-bold text-xl text-gray-800">{results.totalTime}ms</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Final Status</div>
                      <div className={`font-bold text-xl ${getStatusCodeColor(results.finalStatusCode)}`}>
                        {results.finalStatusCode}
                      </div>
                    </div>
                  </div>
                  
                  {results.isRedirectLoop && (
                    <div className="mt-4 p-4 bg-orange-100 border border-orange-200 rounded-lg">
                      <div className="flex items-center text-orange-800">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">Warning: Redirect Loop Detected</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Redirect Chain */}
                <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Redirect Chain</h3>
                  
                  <div className="space-y-4">
                    {results.redirectChain.map((hop, index) => (
                      <div key={index} className="relative">
                        {index < results.redirectChain.length - 1 && (
                          <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-12 w-12 ${getStatusCodeBgColor(hop.statusCode)} rounded-full flex items-center justify-center mr-4`}>
                            <span className={`text-sm font-bold ${getStatusCodeColor(hop.statusCode)}`}>{hop.statusCode}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate break-all">
                              {hop.url}
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span className="truncate">{hop.type}</span>
                              <span className="mx-2">•</span>
                              <span>{hop.timing}ms</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SSL Information */}
                {results.sslInfo && (
                  <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">SSL Certificate Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">SSL Status</div>
                        <div className="flex items-center">
                          {results.sslInfo.valid ? (
                            <>
                              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <span className="text-green-600 font-medium">Valid</span>
                            </>
                          ) : (
                            <>
                              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span className="text-red-600 font-medium">Invalid</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">Issuer</div>
                        <div className="font-medium text-gray-800">{results.sslInfo.issuer}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">Expiry Date</div>
                        <div className="font-medium text-gray-800">{results.sslInfo.expiryDate}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Understanding Redirects */}
                <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding HTTP Redirects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Common Status Codes</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-12 h-6 rounded bg-blue-100 text-blue-700 text-sm font-medium mr-3">301</span>
                          <span className="text-gray-600 text-sm">Permanent Redirect</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-12 h-6 rounded bg-blue-100 text-blue-700 text-sm font-medium mr-3">302</span>
                          <span className="text-gray-600 text-sm">Temporary Redirect</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-12 h-6 rounded bg-blue-100 text-blue-700 text-sm font-medium mr-3">307</span>
                          <span className="text-gray-600 text-sm">Temporary Redirect (Strict)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-12 h-6 rounded bg-blue-100 text-blue-700 text-sm font-medium mr-3">308</span>
                          <span className="text-gray-600 text-sm">Permanent Redirect (Strict)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Use 301 redirects for permanent URL changes
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Minimize redirect chains for better performance
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Avoid redirect loops
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Keep redirects under 3 hops
                        </li>
                      </ul>
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