'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Article Rewriter',
    description: 'Rewrite content to make it unique',
    link: '/text-tools/article-rewriter',
    icon: '✏️',
  },
  {
    title: 'Backlink Checker',
    description: 'Check backlinks pointing to your website',
    link: '/text-tools/backlink-checker',
    icon: '🔗',
  },
  {
    title: 'Backwards Text Generator',
    description: 'Reverse the order of text characters',
    link: '/text-tools/backwards-text-generator',
    icon: '🔁',
  },
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

interface UrlExample {
  original: string;
  rewritten: string;
  description: string;
}

export default function UrlRewritingToolPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [rewrittenUrl, setRewrittenUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rewriteComplete, setRewriteComplete] = useState(false);

  // URL rewriting options
  const [removeParams, setRemoveParams] = useState(true);
  const [useHyphens, setUseHyphens] = useState(true);
  const [forceLowercase, setForceLowercase] = useState(true);
  const [removeExtensions, setRemoveExtensions] = useState(true);
  const [addTrailingSlash, setAddTrailingSlash] = useState(false);
  
  const examples: UrlExample[] = [
    {
      original: 'https://example.com/blog_post/My-Article-Title.html?source=twitter',
      rewritten: 'https://example.com/blog-post/my-article-title/',
      description: 'Converted to lowercase, replaced underscores with hyphens, removed extension and parameters'
    },
    {
      original: 'https://store.example.com/Products/Electronics/laptop-Computers.php?id=123&ref=email',
      rewritten: 'https://store.example.com/products/electronics/laptop-computers/',
      description: 'Normalized case, removed parameters and extension, added trailing slash'
    },
    {
      original: 'https://website.com/Articles/2023/04/15/Why_SEO_Matters_for%20Business.aspx',
      rewritten: 'https://website.com/articles/2023/04/15/why-seo-matters-for-business/',
      description: 'Lowercased path, replaced underscores and encoded spaces with hyphens'
    }
  ];

  const generateRewrittenUrl = () => {
    if (!originalUrl.trim()) {
      setError('Please enter a URL to rewrite');
      return;
    }

    setIsLoading(true);
    setError('');
    setRewriteComplete(false);
    setRewrittenUrl('');

    try {
      // Validate URL
      let url: URL;
      try {
        url = new URL(originalUrl);
      } catch (e) {
        // If not a valid URL, try adding https:// prefix
        try {
          url = new URL(`https://${originalUrl}`);
        } catch (e) {
          throw new Error('Please enter a valid URL');
        }
      }

      // Simulate API call
      setTimeout(() => {
        let path = url.pathname;
        
        // Process the path based on selected options
        if (removeExtensions) {
          // Remove file extensions like .html, .php, .aspx, etc.
          path = path.replace(/\.(html|php|aspx|jsp|htm)$/, '');
        }
        
        if (useHyphens) {
          // Replace underscores and spaces with hyphens
          path = path.replace(/[_\s]+/g, '-');
          // Replace multiple hyphens with a single one
          path = path.replace(/-+/g, '-');
        }
        
        if (forceLowercase) {
          path = path.toLowerCase();
        }
        
        if (addTrailingSlash && !path.endsWith('/')) {
          path = `${path}/`;
        }
        
        // Create new URL object with processed path
        const processedUrl = new URL(url.origin);
        processedUrl.pathname = path;
        
        // Add parameters back if not removing them
        if (!removeParams) {
          processedUrl.search = url.search;
        }
        
        setRewrittenUrl(processedUrl.toString());
        setIsLoading(false);
        setRewriteComplete(true);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rewrite URL');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white py-20 mb-12">
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
                  animation: `float-url ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '🔄' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              URL <span className="text-yellow-300">Rewriting Tool</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create clean, SEO-friendly URLs for better user experience and search rankings
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col gap-3 text-left">
              <div className="text-white/80 text-sm">
                <span className="font-mono text-white/60 mr-1">Before:</span>
                https://example.com/Blog_Post/Title%20Here.html?source=newsletter
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-mono text-white/60 mr-1">After:</span>
                https://example.com/blog-post/title-here/
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Enter Your URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/your-url-here"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter the URL you want to rewrite for SEO optimization
              </p>
            </div>

            <div className="mb-8">
              <h3 className="block text-gray-700 text-sm font-medium mb-4">
                URL Rewriting Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="remove-params"
                    type="checkbox"
                    checked={removeParams}
                    onChange={() => setRemoveParams(!removeParams)}
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="remove-params" className="ml-2 text-sm text-gray-700">
                    Remove query parameters
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="use-hyphens"
                    type="checkbox"
                    checked={useHyphens}
                    onChange={() => setUseHyphens(!useHyphens)}
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="use-hyphens" className="ml-2 text-sm text-gray-700">
                    Replace underscores/spaces with hyphens
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="force-lowercase"
                    type="checkbox"
                    checked={forceLowercase}
                    onChange={() => setForceLowercase(!forceLowercase)}
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="force-lowercase" className="ml-2 text-sm text-gray-700">
                    Convert to lowercase
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="remove-extensions"
                    type="checkbox"
                    checked={removeExtensions}
                    onChange={() => setRemoveExtensions(!removeExtensions)}
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="remove-extensions" className="ml-2 text-sm text-gray-700">
                    Remove file extensions (.html, .php, etc.)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="add-trailing-slash"
                    type="checkbox"
                    checked={addTrailingSlash}
                    onChange={() => setAddTrailingSlash(!addTrailingSlash)}
                    className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="add-trailing-slash" className="ml-2 text-sm text-gray-700">
                    Add trailing slash
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={generateRewrittenUrl}
                disabled={!originalUrl.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Rewriting URL...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Rewrite URL
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {rewriteComplete && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Rewritten URL</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Original URL:</div>
                  <div className="bg-white rounded-lg border border-gray-200 p-3 font-mono text-sm break-all">
                    {originalUrl}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">Rewritten URL:</div>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-3 font-mono text-sm break-all">
                    {rewrittenUrl}
                  </div>
                </div>

                <div className="flex justify-start items-center space-x-4">
                  <button
                    onClick={() => copyToClipboard(rewrittenUrl)}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy to Clipboard
                  </button>
                </div>
              </div>

              {/* URL rewriting benefits */}
              <div className="mt-8 bg-orange-50 rounded-lg p-6 border border-orange-100">
                <h3 className="font-bold text-gray-800 mb-4">SEO Benefits of Clean URLs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-amber-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">User-Friendly</h4>
                      <p className="text-sm text-gray-600">Clean URLs are easier for users to read, remember, and share.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-amber-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Keyword Optimization</h4>
                      <p className="text-sm text-gray-600">Including relevant keywords in URLs helps search engines understand page content.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-amber-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Improved Click-Through Rate</h4>
                      <p className="text-sm text-gray-600">Descriptive URLs in search results encourage more clicks from users.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-amber-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Better Crawlability</h4>
                      <p className="text-sm text-gray-600">Search engine bots can more efficiently crawl sites with consistent URL structures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* URL Examples */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">URL Rewriting Examples</h2>
            
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rewritten URL</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes Made</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examples.map((example, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm break-all">
                        <code className="text-orange-600 font-mono text-xs">{example.original}</code>
                      </td>
                      <td className="py-3 px-4 text-sm break-all">
                        <code className="text-green-600 font-mono text-xs">{example.rewritten}</code>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {example.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
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