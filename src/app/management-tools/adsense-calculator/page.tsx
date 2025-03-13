'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Keyword Suggestion',
    description: 'Get keyword ideas for your content',
    link: '/management-tools/keyword-suggestion',
    icon: '🔍',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
  {
    title: 'Page Size Checker',
    description: 'Check webpage dimensions and file size',
    link: '/management-tools/page-size-checker',
    icon: '📏',
  },
  {
    title: 'WordPress Theme Detector',
    description: 'Identify WordPress themes and plugins',
    link: '/management-tools/wordpress-theme-detector',
    icon: '🎨',
  },
];

interface EarningsEstimate {
  daily: number;
  monthly: number;
  yearly: number;
  pageRPM: number;
}

export default function AdSenseCalculatorPage() {
  const [pageviews, setPageviews] = useState<number>(1000);
  const [ctr, setCtr] = useState<number>(2);
  const [cpc, setCpc] = useState<number>(0.2);
  const [showInfo, setShowInfo] = useState(true);
  const [earnings, setEarnings] = useState<EarningsEstimate | null>(null);

  const calculateEarnings = () => {
    const clicks = (pageviews * ctr) / 100;
    const dailyEarnings = clicks * cpc;
    const monthlyEarnings = dailyEarnings * 30;
    const yearlyEarnings = monthlyEarnings * 12;
    const pageRPM = (dailyEarnings / pageviews) * 1000;

    setEarnings({
      daily: dailyEarnings,
      monthly: monthlyEarnings,
      yearly: yearlyEarnings,
      pageRPM: pageRPM,
    });
  };

  useEffect(() => {
    calculateEarnings();
  }, [pageviews, ctr, cpc]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '💰' : i % 3 === 1 ? '📊' : '💵'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AdSense <span className="text-green-300">Calculator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Calculate your potential earnings from Google AdSense
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Calculator Inputs */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Pageviews
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={pageviews}
                    onChange={(e) => setPageviews(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Click-Through Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={ctr}
                    onChange={(e) => setCtr(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Per Click ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cpc}
                    onChange={(e) => setCpc(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            {earnings && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Estimated Earnings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Daily</h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(earnings.daily)}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Monthly</h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(earnings.monthly)}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Yearly</h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(earnings.yearly)}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Page RPM</h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(earnings.pageRPM)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Breakdown */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Metrics Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Daily Clicks</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {((pageviews * ctr) / 100).toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {pageviews.toLocaleString()} pageviews and {ctr}% CTR
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-2">Average CPC</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(cpc)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Cost per click for your ads
                  </p>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About AdSense Calculations</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-green-600 hover:text-green-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Understanding Metrics</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>Pageviews:</strong> Number of daily page loads
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>CTR:</strong> Percentage of pageviews that result in clicks
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>CPC:</strong> Average earnings per ad click
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <strong>RPM:</strong> Revenue per 1000 pageviews
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Important Notes</h4>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Results are estimates only</li>
                        <li>• Actual earnings may vary</li>
                        <li>• Factors like niche and location affect earnings</li>
                        <li>• AdSense policies must be followed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
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