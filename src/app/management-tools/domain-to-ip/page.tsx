'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'HTTP Status Checker',
    description: 'Check HTTP status codes of URLs',
    link: '/management-tools/http-status-checker',
    icon: '🔍',
  },
  {
    title: 'Server Status Checker',
    description: 'Check server status and response time',
    link: '/management-tools/server-status-checker',
    icon: '⚡',
  },
  {
    title: 'Hosting Checker',
    description: 'Find hosting information for domains',
    link: '/management-tools/hosting-checker',
    icon: '🌐',
  },
  {
    title: 'Meta Tag Analyzer',
    description: 'Analyze meta tags of any webpage',
    link: '/management-tools/metatag-analyzer',
    icon: '🏷️',
  },
];

interface DomainInfo {
  ipv4: string[];
  ipv6: string[];
  hostname: string;
  dns: {
    a: string[];
    aaaa: string[];
    mx: string[];
    ns: string[];
    txt: string[];
  };
  location?: {
    country: string;
    city: string;
    isp: string;
  };
}

export default function DomainToIpPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DomainInfo | null>(null);
  const [showFullInfo, setShowFullInfo] = useState(false);

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const lookupDomain = async () => {
    if (!validateDomain(domain)) {
      setError('Please enter a valid domain name');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call - replace with actual DNS lookup implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: DomainInfo = {
        ipv4: ['192.168.1.1', '192.168.1.2'],
        ipv6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'],
        hostname: domain,
        dns: {
          a: ['192.168.1.1', '192.168.1.2'],
          aaaa: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'],
          mx: ['mail.example.com'],
          ns: ['ns1.example.com', 'ns2.example.com'],
          txt: ['v=spf1 include:_spf.example.com ~all'],
        },
        location: {
          country: 'United States',
          city: 'San Francisco',
          isp: 'Example ISP',
        },
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to lookup domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🌐' : i % 3 === 1 ? '🔍' : '📡'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Domain to IP <span className="text-cyan-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Convert domain names to IP addresses and get detailed DNS information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Domain Input */}
            <div className="mb-8">
              <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="Enter domain name (e.g., example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <button
                    onClick={lookupDomain}
                    disabled={loading}
                    className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                  >
                    {loading ? 'Looking up...' : 'Lookup Domain'}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* IP Addresses */}
                <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">IP Addresses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">IPv4 Addresses</h4>
                      <div className="space-y-2">
                        {result.ipv4.map((ip, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200">
                            {ip}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">IPv6 Addresses</h4>
                      <div className="space-y-2">
                        {result.ipv6.map((ip, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200 break-all">
                            {ip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DNS Records */}
                <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">DNS Records</h3>
                    <button
                      onClick={() => setShowFullInfo(!showFullInfo)}
                      className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                    >
                      {showFullInfo ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">A Records</h4>
                      <div className="space-y-2">
                        {result.dns.a.map((record, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200">
                            {record}
                          </div>
                        ))}
                      </div>
                    </div>
                    {showFullInfo && (
                      <>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">AAAA Records</h4>
                          <div className="space-y-2">
                            {result.dns.aaaa.map((record, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200 break-all">
                                {record}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">MX Records</h4>
                          <div className="space-y-2">
                            {result.dns.mx.map((record, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200">
                                {record}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">NS Records</h4>
                          <div className="space-y-2">
                            {result.dns.ns.map((record, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200">
                                {record}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">TXT Records</h4>
                          <div className="space-y-2">
                            {result.dns.txt.map((record, index) => (
                              <div key={index} className="bg-white p-3 rounded-lg border border-cyan-200">
                                {record}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                {result.location && (
                  <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Location Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Country</h4>
                        <p className="text-gray-900">{result.location.country}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">City</h4>
                        <p className="text-gray-900">{result.location.city}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">ISP</h4>
                        <p className="text-gray-900">{result.location.isp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-cyan-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Domain to IP Lookup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is DNS Resolution?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    DNS resolution is the process of converting human-readable domain names into IP addresses that computers use to communicate with each other on the internet.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-cyan-100">
                    <h5 className="font-medium text-gray-800 mb-2">Common DNS Record Types</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>A Record:</strong> Maps domain to IPv4 address</li>
                      <li><strong>AAAA Record:</strong> Maps domain to IPv6 address</li>
                      <li><strong>MX Record:</strong> Specifies mail servers</li>
                      <li><strong>NS Record:</strong> Specifies nameservers</li>
                      <li><strong>TXT Record:</strong> Stores text information</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Common Uses</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Troubleshooting network connectivity issues
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Verifying DNS configuration
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Checking mail server settings
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Investigating security issues
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
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