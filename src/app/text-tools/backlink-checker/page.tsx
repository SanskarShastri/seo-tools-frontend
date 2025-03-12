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
    title: 'URL Rewriting Tool',
    description: 'Create SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
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

// Interface for backlink data
interface Backlink {
  url: string;
  title: string;
  anchorText: string;
  authorityScore: number;
  dofollow: boolean;
  lastSeen: string; // ISO date string
}

// Interface for backlink statistics
interface BacklinkStats {
  totalBacklinks: number;
  uniqueDomains: number;
  dofollowCount: number;
  nofollowCount: number;
  avgAuthority: number;
  topAuthority: number;
}

export default function BacklinkCheckerPage() {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [backlinkStats, setBacklinkStats] = useState<BacklinkStats | null>(null);

  const checkBacklinks = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain to check');
      return;
    }

    // Basic domain validation
    const domainRegex = /^(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9](?:\/.*)?$/i;
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    setIsLoading(true);
    setError('');
    setBacklinks([]);
    setBacklinkStats(null);

    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Generate mock backlink data
        const mockBacklinks: Backlink[] = generateMockBacklinks();
        setBacklinks(mockBacklinks);
        
        // Calculate stats
        const stats = calculateBacklinkStats(mockBacklinks);
        setBacklinkStats(stats);
        
        setIsLoading(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to check backlinks. Please try again.');
      setIsLoading(false);
    }
  };

  // Function to generate mock backlink data
  const generateMockBacklinks = (): Backlink[] => {
    // Mock domains that would link to user's site
    const sourceDomains = [
      'blogspot.com',
      'wordpress.com',
      'medium.com',
      'forbes.com',
      'entrepreneur.com',
      'techcrunch.com',
      'wired.com',
      'theverge.com',
      'mashable.com',
      'newsweek.com',
      'huffpost.com',
      'businessinsider.com',
      'reddit.com',
      'producthunt.com',
      'github.com',
      'stackoverflow.com',
      'quora.com',
      'nytimes.com',
      'washingtonpost.com',
      'bbc.com',
      'cnn.com',
      'facebook.com',
      'twitter.com',
      'linkedin.com'
    ];
    
    // Mock anchor text examples
    const anchorTexts = [
      'click here',
      'learn more',
      'website',
      'official site',
      'more information',
      'source',
      'reference',
      domain.replace(/^https?:\/\//i, ''),
      domain.replace(/^https?:\/\//i, '').split('.')[0],
      'this article',
      'recent study',
      'example',
      'case study',
      'guide',
      'tutorial',
      'review'
    ];
    
    // Mock page titles
    const pageTitles = [
      `Comprehensive Guide to ${domain.replace(/^https?:\/\//i, '')}`,
      `Why ${domain.replace(/^https?:\/\//i, '')} is Leading the Industry`,
      `${domain.replace(/^https?:\/\//i, '').split('.')[0].toUpperCase()} - The Complete Review`,
      `Top 10 Resources Including ${domain.replace(/^https?:\/\//i, '')}`,
      `How ${domain.replace(/^https?:\/\//i, '')} is Changing the Game`,
      `${domain.replace(/^https?:\/\//i, '').split('.')[0]} vs Competitors: A Comparison`,
      `The Ultimate Guide Referenced by ${domain.replace(/^https?:\/\//i, '')}`,
      `Industry Experts Recommend ${domain.replace(/^https?:\/\//i, '')}`,
      `Best Practices from ${domain.replace(/^https?:\/\//i, '')}`,
      `Latest News about ${domain.replace(/^https?:\/\//i, '')}`,
      `${domain.replace(/^https?:\/\//i, '')} and Its Impact on the Industry`,
      `Resources and Tools including ${domain.replace(/^https?:\/\//i, '')}`,
      `Why ${domain.replace(/^https?:\/\//i, '')} is Worth Your Attention`,
      `A Deep Dive into ${domain.replace(/^https?:\/\//i, '')}`,
      `Case Study: ${domain.replace(/^https?:\/\//i, '')}`,
    ];
    
    // Generate 10-20 mock backlinks
    const count = Math.floor(Math.random() * 11) + 10;
    const mockData: Backlink[] = [];
    
    for (let i = 0; i < count; i++) {
      const sourceDomain = sourceDomains[Math.floor(Math.random() * sourceDomains.length)];
      const slug = Math.random().toString(36).substring(2, 10);
      const url = `https://www.${sourceDomain}/blog/${slug}`;
      
      const anchorText = anchorTexts[Math.floor(Math.random() * anchorTexts.length)];
      const title = pageTitles[Math.floor(Math.random() * pageTitles.length)];
      
      // Random authority score between 1-100
      const authorityScore = Math.floor(Math.random() * 100) + 1;
      
      // 70% chance of being dofollow
      const dofollow = Math.random() > 0.3;
      
      // Random date in the last year
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      
      mockData.push({
        url,
        title,
        anchorText,
        authorityScore,
        dofollow,
        lastSeen: date.toISOString()
      });
    }
    
    // Sort by authority score, descending
    return mockData.sort((a, b) => b.authorityScore - a.authorityScore);
  };

  // Function to calculate backlink statistics
  const calculateBacklinkStats = (links: Backlink[]): BacklinkStats => {
    // Count unique domains
    const domains = new Set(links.map(link => {
      try {
        const url = new URL(link.url);
        return url.hostname;
      } catch (e) {
        return link.url;
      }
    }));
    
    // Count dofollow links
    const dofollowCount = links.filter(link => link.dofollow).length;
    
    // Calculate average authority
    const totalAuthority = links.reduce((sum, link) => sum + link.authorityScore, 0);
    const avgAuthority = links.length > 0 ? Math.round(totalAuthority / links.length) : 0;
    
    // Find highest authority
    const topAuthority = links.length > 0 
      ? Math.max(...links.map(link => link.authorityScore)) 
      : 0;
    
    return {
      totalBacklinks: links.length,
      uniqueDomains: domains.size,
      dofollowCount,
      nofollowCount: links.length - dofollowCount,
      avgAuthority,
      topAuthority
    };
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-600 text-white py-20 mb-12">
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
                  animation: `float-backlink ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 4 === 0 ? '🔗' : i % 4 === 1 ? '🌐' : i % 4 === 2 ? '📊' : '📈'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Backlink <span className="text-green-200">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze backlinks pointing to your website
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full text-left">
                <div className="text-white/60 text-sm mb-1">Enter your domain</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/80 text-sm flex items-center">
                  <span className="mr-2">https://</span>
                  <span className="font-medium">example.com</span>
                  <button className="ml-auto px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
                    Check Backlinks
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-4 text-center">
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-2xl font-bold">328</div>
                  <div className="text-white/60 text-xs">Total Links</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-2xl font-bold">87</div>
                  <div className="text-white/60 text-xs">Domains</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="text-2xl font-bold">62</div>
                  <div className="text-white/60 text-xs">Authority</div>
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
            <form onSubmit={checkBacklinks} className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Enter Your Domain
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
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
                      Checking...
                    </>
                  ) : (
                    'Check Backlinks'
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter a domain name without http/https (e.g., example.com)
              </p>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full inline-block mb-4"></div>
                <p className="text-gray-500">Scanning backlinks for {domain}...</p>
              </div>
            )}

            {backlinkStats && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Backlink Overview</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.totalBacklinks}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Total Backlinks
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.uniqueDomains}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Unique Domains
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.dofollowCount}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Dofollow Links
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.nofollowCount}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Nofollow Links
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.avgAuthority}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Avg Authority
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {backlinkStats.topAuthority}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Top Authority
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Backlink Details
                </h3>
                
                <div className="overflow-hidden rounded-xl border border-gray-200 mb-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Link Source
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Anchor Text
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Authority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Seen
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {backlinks.map((backlink, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="font-medium text-gray-900 truncate max-w-xs">
                                <a href={backlink.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 hover:underline">
                                  {backlink.title}
                                </a>
                              </div>
                              <div className="text-gray-500 text-xs truncate max-w-xs">
                                {backlink.url}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              "{backlink.anchorText}"
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  backlink.authorityScore >= 70 
                                    ? 'bg-green-100 text-green-800' 
                                    : backlink.authorityScore >= 40 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {backlink.authorityScore}/100
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {backlink.dofollow ? (
                                <span className="text-green-600 font-medium">Dofollow</span>
                              ) : (
                                <span className="text-gray-500">Nofollow</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(backlink.lastSeen)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Backlink analysis tips */}
                <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                  <h3 className="font-bold text-gray-800 mb-4">Backlink Analysis Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-2">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Focus on Quality</h4>
                        <p className="text-sm text-gray-600">A few high-authority backlinks are more valuable than many low-quality ones.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-2">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Diverse Anchor Text</h4>
                        <p className="text-sm text-gray-600">A natural backlink profile contains varied anchor texts, not just keywords.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-2">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Monitor Competitors</h4>
                        <p className="text-sm text-gray-600">Analyze backlinks of successful competitors to find new link opportunities.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-2">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Disavow Toxic Links</h4>
                        <p className="text-sm text-gray-600">Use Google's Disavow Tool to distance your site from harmful backlinks.</p>
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
        @keyframes float-backlink {
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