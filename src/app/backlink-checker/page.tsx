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
    title: 'URL Rewriting Tool',
    description: 'Create clean and SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
    icon: '🔄',
  },
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
  {
    title: 'Text Compare',
    description: 'Compare two texts and find differences',
    link: '/text-tools/text-compare',
    icon: '📊',
  },
];

interface Backlink {
  url: string;
  title: string;
  anchorText: string;
  authority: number;
  dofollow: boolean;
  lastSeen: string;
}

interface BacklinkStats {
  totalBacklinks: number;
  uniqueDomains: number;
  dofollowCount: number;
  nofollowCount: number;
  averageAuthority: number;
  topAuthority: number;
}

export default function BacklinkCheckerPage() {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [stats, setStats] = useState<BacklinkStats | null>(null);
  
  const checkBacklinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setBacklinks([]);
    setStats(null);

    // Validate domain format
    if (!domain.trim()) {
      setError('Please enter a domain to check');
      setIsLoading(false);
      return;
    }

    // Basic domain validation
    const domainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/;
    if (!domainRegex.test(domain.trim())) {
      setError('Please enter a valid domain (e.g., example.com)');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call with mock data
      setTimeout(() => {
        // Generate mock backlinks
        const mockBacklinks: Backlink[] = [
          {
            url: 'https://example-blog.com/web-design-tips',
            title: 'Top 10 Web Design Tips for 2023',
            anchorText: 'web design tools',
            authority: 78,
            dofollow: true,
            lastSeen: '2023-10-12'
          },
          {
            url: 'https://tech-news.com/best-websites',
            title: 'Best Websites in the Tech Industry',
            anchorText: domain,
            authority: 85,
            dofollow: true,
            lastSeen: '2023-10-05'
          },
          {
            url: 'https://seo-guides.net/link-building',
            title: 'Link Building Strategies That Work',
            anchorText: 'quality websites',
            authority: 65,
            dofollow: false,
            lastSeen: '2023-09-28'
          },
          {
            url: 'https://webdev-forum.org/discussions/123',
            title: 'Discussion on Modern Web Frameworks',
            anchorText: 'useful resource',
            authority: 72,
            dofollow: true,
            lastSeen: '2023-09-15'
          },
          {
            url: 'https://digital-marketing.blog/seo-tips',
            title: 'SEO Tips for Small Businesses',
            anchorText: 'learn more',
            authority: 56,
            dofollow: false,
            lastSeen: '2023-09-10'
          },
          {
            url: 'https://web-resources.net/tools',
            title: 'Essential Web Development Tools',
            anchorText: 'this great site',
            authority: 81,
            dofollow: true,
            lastSeen: '2023-09-02'
          },
          {
            url: 'https://design-inspiration.com/showcase',
            title: 'Web Design Showcase 2023',
            anchorText: domain,
            authority: 70,
            dofollow: true,
            lastSeen: '2023-08-25'
          }
        ];
        
        setBacklinks(mockBacklinks);
        
        // Calculate stats
        const dofollowLinks = mockBacklinks.filter(link => link.dofollow);
        const nofollowLinks = mockBacklinks.filter(link => !link.dofollow);
        const uniqueDomains = new Set(mockBacklinks.map(link => {
          const url = new URL(link.url);
          return url.hostname;
        }));
        const authorityValues = mockBacklinks.map(link => link.authority);
        
        const mockStats: BacklinkStats = {
          totalBacklinks: mockBacklinks.length,
          uniqueDomains: uniqueDomains.size,
          dofollowCount: dofollowLinks.length,
          nofollowCount: nofollowLinks.length,
          averageAuthority: authorityValues.reduce((a, b) => a + b, 0) / authorityValues.length,
          topAuthority: Math.max(...authorityValues)
        };
        
        setStats(mockStats);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('Failed to check backlinks. Please try again.');
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 text-white py-20 mb-12">
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
                  animation: `float-link ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '🔍' : '📊'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Backlink <span className="text-yellow-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze backlinks pointing to your website and improve your SEO strategy
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-black/20 p-3 rounded">
                <div className="text-lg font-bold">147</div>
                <div className="text-xs">Total Backlinks</div>
              </div>
              <div className="bg-black/20 p-3 rounded">
                <div className="text-lg font-bold">52</div>
                <div className="text-xs">Domains</div>
              </div>
              <div className="bg-black/20 p-3 rounded">
                <div className="text-lg font-bold">76%</div>
                <div className="text-xs">Dofollow</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={checkBacklinks} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Enter Your Domain
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                  required
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
                Enter your domain name without https:// or www (e.g., example.com)
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!domain || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Analyzing Backlinks...
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Check Backlinks
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-12 flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Analyzing backlinks for {domain}...</p>
            </div>
          )}

          {stats && (
            <div className="mt-12 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Backlink Overview</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Total Backlinks</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalBacklinks}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Unique Domains</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.uniqueDomains}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Average Authority</div>
                    <div className="text-3xl font-bold text-gray-900">{Math.round(stats.averageAuthority)}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Dofollow Links</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.dofollowCount}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Nofollow Links</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.nofollowCount}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-teal-600 text-sm uppercase font-semibold mb-2">Top Authority</div>
                    <div className="text-3xl font-bold text-gray-900">{stats.topAuthority}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Link Type Distribution</h4>
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-teal-500 rounded-l-full"
                      style={{ width: `${(stats.dofollowCount / stats.totalBacklinks) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {Math.round((stats.dofollowCount / stats.totalBacklinks) * 100)}% Dofollow / 
                      {Math.round((stats.nofollowCount / stats.totalBacklinks) * 100)}% Nofollow
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Backlink Details</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source URL</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anchor Text</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Authority</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {backlinks.map((link, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">
                            <div className="truncate max-w-xs">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {link.title}
                              </a>
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-xs mt-1">{link.url}</div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className="inline-block bg-gray-100 px-2 py-1 rounded text-gray-800">
                              {link.anchorText}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                                  link.authority >= 70 ? 'bg-green-500' : 
                                  link.authority >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                                }`}
                              >
                                {link.authority}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span 
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                link.dofollow 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {link.dofollow ? 'Dofollow' : 'Nofollow'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {formatDate(link.lastSeen)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 bg-teal-50 rounded-lg p-4 border border-teal-100">
                <h4 className="font-medium text-teal-800 mb-2">Backlink Analysis Tips</h4>
                <ul className="text-sm text-teal-700 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Focus on acquiring high-authority backlinks to boost your SEO ranking.
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Diversify your anchor text to avoid over-optimization penalties.
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    While dofollow links pass more SEO value, nofollow links from high-quality sites still drive traffic.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-teal-600 mx-auto rounded-full"></div>
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
        @keyframes float-link {
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