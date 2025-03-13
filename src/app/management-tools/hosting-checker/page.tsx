'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Domain to IP Checker',
    description: 'Convert domain names to IP addresses',
    link: '/management-tools/domain-to-ip',
    icon: '🌐',
  },
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
    title: 'Meta Tag Analyzer',
    description: 'Analyze meta tags of any webpage',
    link: '/management-tools/metatag-analyzer',
    icon: '🏷️',
  },
];

interface HostingInfo {
  domain: string;
  server: {
    ip: string;
    location: {
      country: string;
      city: string;
      latitude: number;
      longitude: number;
    };
    provider: {
      name: string;
      asn: string;
      domain: string;
    };
    type: string;
  };
  hosting: {
    provider: string;
    datacenter: string;
    infrastructure: string;
    features: string[];
  };
  network: {
    ipv4: string[];
    ipv6: string[];
    nameservers: string[];
    ssl: {
      provider: string;
      validUntil: string;
      issuer: string;
    };
  };
  performance: {
    responseTime: number;
    uptime: number;
    lastDowntime: string | null;
    averageSpeed: number;
  };
}

export default function HostingCheckerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<HostingInfo | null>(null);

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const checkHosting = async () => {
    if (!validateDomain(domain)) {
      setError('Please enter a valid domain name');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call - replace with actual hosting check implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: HostingInfo = {
        domain: domain,
        server: {
          ip: '192.168.1.1',
          location: {
            country: 'United States',
            city: 'San Francisco',
            latitude: 37.7749,
            longitude: -122.4194,
          },
          provider: {
            name: 'Amazon Web Services',
            asn: 'AS16509',
            domain: 'aws.amazon.com',
          },
          type: 'Cloud Server',
        },
        hosting: {
          provider: 'Amazon Web Services',
          datacenter: 'US West (N. California)',
          infrastructure: 'Cloud Computing',
          features: [
            'Auto Scaling',
            'Load Balancing',
            'CDN Integration',
            'DDoS Protection',
            'Backup Services',
          ],
        },
        network: {
          ipv4: ['192.168.1.1', '192.168.1.2'],
          ipv6: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'],
          nameservers: [
            'ns1.example.com',
            'ns2.example.com',
          ],
          ssl: {
            provider: 'Let\'s Encrypt',
            validUntil: '2024-12-31',
            issuer: 'Let\'s Encrypt Authority X3',
          },
        },
        performance: {
          responseTime: 125,
          uptime: 99.99,
          lastDowntime: null,
          averageSpeed: 850,
        },
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to check hosting information. Please try again.');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🏢' : i % 3 === 1 ? '🌐' : '☁️'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Hosting <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Discover detailed hosting information and server details for any domain
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Domain Input */}
            <div className="mb-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="Enter domain name (e.g., example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={checkHosting}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Checking...' : 'Check Hosting'}
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
                {/* Server Information */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Server Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Server Details</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600">IP Address:</span>
                          <span className="ml-2 font-medium">{result.server.ip}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium">{result.server.type}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Provider:</span>
                          <span className="ml-2 font-medium">{result.server.provider.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">ASN:</span>
                          <span className="ml-2 font-medium">{result.server.provider.asn}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600">Country:</span>
                          <span className="ml-2 font-medium">{result.server.location.country}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">City:</span>
                          <span className="ml-2 font-medium">{result.server.location.city}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Coordinates:</span>
                          <span className="ml-2 font-medium">
                            {result.server.location.latitude}, {result.server.location.longitude}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hosting Details */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Hosting Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Provider Information</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600">Provider:</span>
                          <span className="ml-2 font-medium">{result.hosting.provider}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Data Center:</span>
                          <span className="ml-2 font-medium">{result.hosting.datacenter}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Infrastructure:</span>
                          <span className="ml-2 font-medium">{result.hosting.infrastructure}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.hosting.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Information */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Information</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">IP Addresses</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-1">IPv4</h5>
                          {result.network.ipv4.map((ip, index) => (
                            <div key={index} className="text-sm bg-gray-50 p-2 rounded mb-1">
                              {ip}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-1">IPv6</h5>
                          {result.network.ipv6.map((ip, index) => (
                            <div key={index} className="text-sm bg-gray-50 p-2 rounded mb-1 break-all">
                              {ip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">SSL Certificate</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-gray-600">Provider:</span>
                          <div className="font-medium">{result.network.ssl.provider}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Valid Until:</span>
                          <div className="font-medium">{result.network.ssl.validUntil}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Issuer:</span>
                          <div className="font-medium">{result.network.ssl.issuer}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Nameservers</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.network.nameservers.map((ns, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            {ns}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Response Time</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.performance.responseTime}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Uptime</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.performance.uptime}%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Average Speed</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.performance.averageSpeed} ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Last Downtime</h4>
                      <div className="text-2xl font-semibold text-gray-900">
                        {result.performance.lastDowntime || 'None'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Hosting Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What We Check</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Our hosting checker tool provides comprehensive information about where and how a website is hosted, including server details, network configuration, and performance metrics.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Information</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Server Details:</strong> IP, location, provider</li>
                      <li><strong>Hosting Info:</strong> Provider, datacenter</li>
                      <li><strong>Network:</strong> IP addresses, nameservers</li>
                      <li><strong>SSL:</strong> Certificate details</li>
                      <li><strong>Performance:</strong> Response time, uptime</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Why It Matters</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Understand your website's infrastructure
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Verify hosting provider claims
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Monitor server performance
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Ensure security compliance
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