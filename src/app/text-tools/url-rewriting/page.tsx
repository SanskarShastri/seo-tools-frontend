'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with updated paths
const relatedTools = [
  {
    title: 'Article Rewriter',
    description: 'Rewrite content to make it unique',
    link: '/text-tools/article-rewriter',
    icon: '✏️',
  },
  {
    title: 'Backlink Checker',
    description: 'Find backlinks pointing to your site',
    link: '/text-tools/backlink-checker',
    icon: '🔗',
  },
  {
    title: 'Text Compare',
    description: 'Compare text and find differences',
    link: '/text-tools/text-compare',
    icon: '🔍',
  },
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

// Example URL structures for demonstration
interface UrlExample {
  original: string;
  rewritten: string;
  description: string;
}

export default function UrlRewritingPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [rewrittenUrl, setRewrittenUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  // URL Rewriting options
  const [removeParameters, setRemoveParameters] = useState(true);
  const [useHyphens, setUseHyphens] = useState(true);
  const [forceLowercase, setForceLowercase] = useState(true);
  const [removeExtensions, setRemoveExtensions] = useState(true);
  const [addTrailingSlash, setAddTrailingSlash] = useState(false);

  // Example URLs
  const exampleUrls: UrlExample[] = [
    {
      original: 'https://example.com/blog_post.php?id=123&category=seo',
      rewritten: 'https://example.com/blog-post/seo/123/',
      description: 'Transformed URL parameters into a path structure, replaced underscores with hyphens',
    },
    {
      original: 'https://example.com/Product-Catalog/FURNITURE/Tables.html',
      rewritten: 'https://example.com/product-catalog/furniture/tables',
      description: 'Standardized case, removed file extension',
    },
    {
      original: 'https://domain.com/search-results?q=office%20chairs&sort=price&page=2',
      rewritten: 'https://domain.com/search/office-chairs/price/2',
      description: 'Converted query parameters to URL paths, replaced spaces with hyphens',
    },
  ];

  const generateRewrittenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset state
    setIsLoading(true);
    setIsComplete(false);
    setError('');
    setRewrittenUrl('');
    
    // Basic validation
    if (!originalUrl) {
      setError('Please enter a URL to rewrite');
      setIsLoading(false);
      return;
    }
    
    try {
      // Check if URL is valid
      new URL(originalUrl);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        try {
          let url = new URL(originalUrl);
          
          // Get path without leading/trailing slashes
          let path = url.pathname.replace(/^\/|\/$/g, '');
          
          // Remove file extensions
          if (removeExtensions) {
            path = path.replace(/\.(html|php|aspx|jsp)$/i, '');
          }
          
          // Replace underscores with hyphens and any other word separators
          if (useHyphens) {
            path = path.replace(/[_\s]+/g, '-');
          }
          
          // Convert to lowercase
          if (forceLowercase) {
            path = path.toLowerCase();
          }
          
          // Build the new URL
          let newUrl = `${url.protocol}//${url.hostname}`;
          
          // Add path
          if (path) {
            newUrl += '/' + path;
          }
          
          // Handle parameters (convert to path segments or remove)
          if (url.search && removeParameters) {
            // Example: extract key parameters and add to path
            const params = new URLSearchParams(url.search);
            const importantParams = ['id', 'category', 'type', 'lang'];
            
            importantParams.forEach(param => {
              if (params.has(param)) {
                let value = params.get(param) || '';
                
                // Replace spaces with hyphens in parameter values
                if (useHyphens) {
                  value = value.replace(/\s+/g, '-');
                }
                
                if (forceLowercase) {
                  value = value.toLowerCase();
                }
                
                newUrl += '/' + value;
              }
            });
          } else if (url.search && !removeParameters) {
            // Keep parameters but sorted
            const params = new URLSearchParams(url.search);
            const sortedParams = Array.from(params.entries()).sort((a, b) => a[0].localeCompare(b[0]));
            
            if (sortedParams.length > 0) {
              newUrl += '?';
              sortedParams.forEach(([key, value], index) => {
                if (index > 0) newUrl += '&';
                newUrl += `${key}=${value}`;
              });
            }
          }
          
          // Add trailing slash if option is selected
          if (addTrailingSlash && !newUrl.endsWith('/')) {
            newUrl += '/';
          }
          
          // Set rewritten URL
          setRewrittenUrl(newUrl);
          setIsComplete(true);
          setIsLoading(false);
        } catch (error) {
          setError('Failed to rewrite URL. Please check the format and try again.');
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      setError('Please enter a valid URL (e.g., https://example.com/page)');
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (rewrittenUrl) {
      navigator.clipboard.writeText(rewrittenUrl)
        .then(() => {
          const copyBtn = document.getElementById('copy-btn');
          if (copyBtn) {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = 'Copy URL';
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
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
                  animation: `float-url ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '🌐' : '🔄'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              URL <span className="text-blue-200">Rewriting</span> Tool
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create clean, SEO-friendly URLs for better search rankings and user experience
          </p>

          {/* Interactive Demo */}
          <div className="max-w-3xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center text-white/90 font-mono text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2 flex-grow text-left truncate">
                  example.com/blog_post.php?id=123&category=seo
                </div>
                <div className="mx-4">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 flex-grow text-left truncate">
                  example.com/blog-post/seo/123/
                </div>
              </div>
              <div className="flex items-center text-white/90 font-mono text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2 flex-grow text-left truncate">
                  example.com/Product-Catalog/FURNITURE/Tables.html
                </div>
                <div className="mx-4">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 flex-grow text-left truncate">
                  example.com/product-catalog/furniture/tables
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={generateRewrittenUrl} className="mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter URL to Rewrite
                </label>
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/your-page.html?param=value"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-gray-700 text-sm font-medium mb-3">Rewriting Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remove-params"
                      checked={removeParameters}
                      onChange={() => setRemoveParameters(!removeParameters)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="remove-params" className="ml-2 text-sm text-gray-700">
                      Transform parameters to path structure
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="use-hyphens"
                      checked={useHyphens}
                      onChange={() => setUseHyphens(!useHyphens)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="use-hyphens" className="ml-2 text-sm text-gray-700">
                      Replace underscores with hyphens
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="force-lowercase"
                      checked={forceLowercase}
                      onChange={() => setForceLowercase(!forceLowercase)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="force-lowercase" className="ml-2 text-sm text-gray-700">
                      Convert to lowercase
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remove-extensions"
                      checked={removeExtensions}
                      onChange={() => setRemoveExtensions(!removeExtensions)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="remove-extensions" className="ml-2 text-sm text-gray-700">
                      Remove file extensions (.html, .php)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="add-trailing-slash"
                      checked={addTrailingSlash}
                      onChange={() => setAddTrailingSlash(!addTrailingSlash)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="add-trailing-slash" className="ml-2 text-sm text-gray-700">
                      Add trailing slash
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Rewriting URL...
                  </>
                ) : (
                  'Rewrite URL'
                )}
              </button>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {isComplete && rewrittenUrl && (
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Rewritten URL</h3>
                <div className="bg-white rounded-lg p-4 border border-blue-200 font-mono mb-4 break-all">
                  {rewrittenUrl}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    id="copy-btn"
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Copy URL
                  </button>
                  <a
                    href={rewrittenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Test URL
                  </a>
                </div>
              </div>
            )}

            {/* URL Example Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">URL Rewriting Examples</h3>
              <div className="space-y-4">
                {exampleUrls.map((example, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <div className="text-sm text-gray-500 mb-1">Original URL</div>
                        <div className="font-mono text-sm text-gray-700 break-all">{example.original}</div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-sm text-gray-500 mb-1">Rewritten URL</div>
                        <div className="font-mono text-sm text-blue-600 break-all">{example.rewritten}</div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-sm text-gray-500 mb-1">What Changed</div>
                        <div className="text-sm text-gray-700">{example.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Best Practices Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">URL Best Practices for SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Use Hyphens as Word Separators</h4>
                    <p className="text-sm text-gray-600">Search engines recognize hyphens as word separators, making URLs more readable.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Keep URLs Short and Descriptive</h4>
                    <p className="text-sm text-gray-600">Shorter URLs are easier to share and more user-friendly. Include relevant keywords.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Use Lowercase Letters</h4>
                    <p className="text-sm text-gray-600">Lowercase URLs are easier to read and prevent duplicate content issues.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Avoid Query Parameters When Possible</h4>
                    <p className="text-sm text-gray-600">URL parameters can cause crawling and indexing issues. Use clean path structures instead.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Implement 301 Redirects</h4>
                    <p className="text-sm text-gray-600">When changing URLs, always redirect old URLs to new ones to preserve SEO value.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Be Consistent with Trailing Slashes</h4>
                    <p className="text-sm text-gray-600">Choose one format (with or without trailing slashes) and stick with it across your site.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
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
        @keyframes float-url {
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

        .animate-fade-in-delayed {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
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