'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data
const relatedTools = [
  {
    title: 'YouTube Channel Statistics',
    description: 'Get comprehensive channel statistics',
    link: '/youtube-channel-statistics',
    icon: '📈',
  },
  {
    title: 'YouTube Region Restriction Checker',
    description: 'Check video availability by region',
    link: '/youtube-region-restriction-checker',
    icon: '🌎',
  },
  {
    title: 'YouTube Video Statistics',
    description: 'View detailed video statistics',
    link: '/youtube-video-statistics',
    icon: '📊',
  },
  {
    title: 'YouTube Tag Generator',
    description: 'Generate optimized tags for your videos',
    link: '/youtube-tag-generator',
    icon: '🏷️',
  },
];

export default function YouTubeMoneyCalculatorPage() {
  const [views, setViews] = useState<string>('');
  const [cpm, setCpm] = useState<string>('4');
  const [niche, setNiche] = useState<string>('general');
  const [adBlocks, setAdBlocks] = useState<string>('30');
  const [subscriberCount, setSubscriberCount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [earningsResult, setEarningsResult] = useState<{
    estimated: number;
    range: { min: number; max: number };
    monthly: number;
    yearly: number;
    sponsorships: number;
    merchPotential: number;
  } | null>(null);
  const [error, setError] = useState('');

  const calculateEarnings = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      const viewsNum = Number(views);
      const cpmNum = Number(cpm);
      const adBlockNum = Number(adBlocks);
      const subscriberNum = Number(subscriberCount);
      
      if (isNaN(viewsNum) || viewsNum < 0) {
        setError('Please enter a valid number of views');
        setIsLoading(false);
        return;
      }

      // Here you would make an API call to your backend
      // For demo, we'll calculate client-side
      setTimeout(() => {
        // Calculate revenue based on views and CPM
        const rawEarnings = (viewsNum * cpmNum) / 1000;
        
        // Adjust for ad blocker impact
        const adBlockImpact = 1 - (adBlockNum / 100);
        const adjustedEarnings = rawEarnings * adBlockImpact;
        
        // Calculate min and max values based on CPM range for the niche
        let minCPM = 1;
        let maxCPM = 6;
        
        switch(niche) {
          case 'finance':
            minCPM = 4;
            maxCPM = 15;
            break;
          case 'tech':
            minCPM = 3;
            maxCPM = 12;
            break;
          case 'gaming':
            minCPM = 2;
            maxCPM = 8;
            break;
          case 'fashion':
            minCPM = 3;
            maxCPM = 10;
            break;
          case 'education':
            minCPM = 2.5;
            maxCPM = 9;
            break;
          case 'travel':
            minCPM = 3;
            maxCPM = 10;
            break;
          case 'fitness':
            minCPM = 2.5;
            maxCPM = 9;
            break;
          default:
            // general
            minCPM = 1;
            maxCPM = 6;
        }
        
        const minEarnings = (viewsNum * minCPM * adBlockImpact) / 1000;
        const maxEarnings = (viewsNum * maxCPM * adBlockImpact) / 1000;
        
        // Calculate monthly and yearly potential (assuming consistent views)
        const monthlyEarnings = adjustedEarnings * 30;
        const yearlyEarnings = adjustedEarnings * 365;
        
        // Estimate potential sponsorship value
        let sponsorshipValue = 0;
        if (subscriberNum > 0) {
          if (subscriberNum < 10000) {
            sponsorshipValue = subscriberNum * 0.005; // $5 per 1000 subs
          } else if (subscriberNum < 100000) {
            sponsorshipValue = subscriberNum * 0.01; // $10 per 1000 subs
          } else if (subscriberNum < 1000000) {
            sponsorshipValue = subscriberNum * 0.02; // $20 per 1000 subs
          } else {
            sponsorshipValue = subscriberNum * 0.03; // $30 per 1000 subs
          }
        }
        
        // Merchandise potential (very rough estimate based on engaged audience)
        const merchPotential = subscriberNum > 0 ? subscriberNum * 0.001 * 15 : 0; // Assumes 0.1% conversion and $15 average purchase
        
        setEarningsResult({
          estimated: adjustedEarnings,
          range: { min: minEarnings, max: maxEarnings },
          monthly: monthlyEarnings,
          yearly: yearlyEarnings,
          sponsorships: sponsorshipValue,
          merchPotential: merchPotential
        });
        
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Error calculating earnings. Please try again.');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20 mb-12">
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
                  animation: `float-money ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '💰' : i % 3 === 1 ? '💵' : '💲'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Money <span className="text-yellow-300">Calculator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Estimate your potential YouTube earnings based on views and niche
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Earnings</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">$100</div>
                  <div className="text-xs">Daily</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">$3,000</div>
                  <div className="text-xs">Monthly</div>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <div className="text-lg font-bold">$36,500</div>
                  <div className="text-xs">Yearly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={calculateEarnings} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Daily Views
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="e.g. 10000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Enter the average number of views your videos get per day</p>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Channel Niche
              </label>
              <div className="relative">
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                >
                  <option value="general">General</option>
                  <option value="finance">Finance / Business</option>
                  <option value="tech">Technology</option>
                  <option value="gaming">Gaming</option>
                  <option value="fashion">Fashion / Beauty</option>
                  <option value="education">Education</option>
                  <option value="travel">Travel</option>
                  <option value="fitness">Fitness / Health</option>
                </select>
              </div>
              <p className="mt-2 text-xs text-gray-500">Different niches typically have different CPM rates</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  CPM Rate ($)
                </label>
                <input
                  type="number"
                  value={cpm}
                  onChange={(e) => setCpm(e.target.value)}
                  placeholder="e.g. 4"
                  step="0.1"
                  min="0.1"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
                <p className="mt-2 text-xs text-gray-500">CPM = Cost Per Mille (revenue per 1000 views)</p>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Ad Blocker Usage (%)
                </label>
                <input
                  type="number"
                  value={adBlocks}
                  onChange={(e) => setAdBlocks(e.target.value)}
                  placeholder="e.g. 30"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
                <p className="mt-2 text-xs text-gray-500">Percentage of viewers using ad blockers</p>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Subscriber Count (Optional)
              </label>
              <input
                type="number"
                value={subscriberCount}
                onChange={(e) => setSubscriberCount(e.target.value)}
                placeholder="e.g. 100000"
                min="0"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
              />
              <p className="mt-2 text-xs text-gray-500">Used to estimate potential sponsorship and merchandise revenue</p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!views || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Calculating...
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Calculate Earnings
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

          {earningsResult && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Estimated YouTube Earnings</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                {/* Main earnings display */}
                <div className="bg-white p-6 border-b border-gray-200">
                  <div className="text-center">
                    <h3 className="text-gray-500 text-sm uppercase font-medium mb-1">Estimated Daily Earnings</h3>
                    <div className="text-4xl font-bold text-green-600 mb-1">
                      ${earningsResult.estimated.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Range: ${earningsResult.range.min.toFixed(2)} - ${earningsResult.range.max.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                {/* Additional projections */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs uppercase font-medium">Monthly</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">
                      ${Math.round(earningsResult.monthly).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs uppercase font-medium">Yearly</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">
                      ${Math.round(earningsResult.yearly).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs uppercase font-medium">Potential Sponsorships</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">
                      ${Math.round(earningsResult.sponsorships).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs uppercase font-medium">Merch Potential</div>
                    <div className="text-2xl font-bold text-gray-800 mt-1">
                      ${Math.round(earningsResult.merchPotential).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Revenue breakdown */}
                <div className="p-6 bg-white border-t border-gray-200">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Revenue Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Ad Revenue</div>
                          <div className="text-xs text-gray-500">
                            YouTube's primary revenue source
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Sponsorships</div>
                          <div className="text-xs text-gray-500">
                            Based on subscriber engagement
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Merchandise</div>
                          <div className="text-xs text-gray-500">
                            Potential from merchandise sales
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800">
                    <strong>Note:</strong> These calculations are estimates based on industry averages and your provided inputs. 
                    Actual earnings can vary widely based on many factors including audience demographics, video length, 
                    engagement, and YouTube's policies. This tool should be used for informational purposes only.
                  </div>
                </div>
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
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
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
        @keyframes float-money {
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