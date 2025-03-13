'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'User Agent Checker',
    description: 'Check your browser\'s user agent',
    link: '/management-tools/user-agent-checker',
    icon: '🔍',
  },
  {
    title: 'Browser Checker',
    description: 'Check browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
}

interface RecordType {
  name: string;
  description: string;
  example: string;
  icon: string;
  color: string;
}

interface DNSCheckResult {
  domain: string;
  records: {
    [key: string]: DNSRecord[];
  };
  timing: {
    start: number;
    end: number;
    duration: number;
  };
}

const recordTypes: { [key: string]: RecordType } = {
  A: {
    name: 'A Record',
    description: 'Maps a domain to an IPv4 address',
    example: 'example.com. IN A 93.184.216.34',
    icon: '🌐',
    color: 'blue',
  },
  AAAA: {
    name: 'AAAA Record',
    description: 'Maps a domain to an IPv6 address',
    example: 'example.com. IN AAAA 2606:2800:220:1:248:1893:25c8:1946',
    icon: '🌍',
    color: 'indigo',
  },
  CNAME: {
    name: 'CNAME Record',
    description: 'Creates an alias for another domain name',
    example: 'www.example.com. IN CNAME example.com',
    icon: '🔄',
    color: 'green',
  },
  MX: {
    name: 'MX Record',
    description: 'Specifies mail servers for the domain',
    example: 'example.com. IN MX 10 mail.example.com',
    icon: '📧',
    color: 'purple',
  },
  TXT: {
    name: 'TXT Record',
    description: 'Stores text information for various purposes',
    example: 'example.com. IN TXT "v=spf1 include:_spf.example.com ~all"',
    icon: '📝',
    color: 'yellow',
  },
  NS: {
    name: 'NS Record',
    description: 'Specifies authoritative nameservers',
    example: 'example.com. IN NS ns1.example.com',
    icon: '🔍',
    color: 'red',
  },
  SOA: {
    name: 'SOA Record',
    description: 'Contains administrative information about the zone',
    example: 'example.com. IN SOA ns1.example.com admin.example.com',
    icon: '⚙️',
    color: 'gray',
  },
};

export default function DNSRecordCheckerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DNSCheckResult | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [showInfo, setShowInfo] = useState(true);

  const validateDomain = (input: string) => {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(input);
  };

  const checkDNS = async () => {
    if (!validateDomain(domain)) {
      setError('Please enter a valid domain name');
      return;
    }

    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      // In a real implementation, this would make an API call to a DNS resolver
      // For demo purposes, we'll simulate some results
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockRecords: DNSCheckResult = {
        domain,
        records: {
          A: [
            {
              type: 'A',
              name: domain,
              value: '93.184.216.34',
              ttl: 300,
            },
          ],
          AAAA: [
            {
              type: 'AAAA',
              name: domain,
              value: '2606:2800:220:1:248:1893:25c8:1946',
              ttl: 300,
            },
          ],
          CNAME: [
            {
              type: 'CNAME',
              name: `www.${domain}`,
              value: domain,
              ttl: 3600,
            },
          ],
          MX: [
            {
              type: 'MX',
              name: domain,
              value: `mail.${domain}`,
              ttl: 3600,
              priority: 10,
            },
            {
              type: 'MX',
              name: domain,
              value: `mail2.${domain}`,
              ttl: 3600,
              priority: 20,
            },
          ],
          TXT: [
            {
              type: 'TXT',
              name: domain,
              value: 'v=spf1 include:_spf.google.com ~all',
              ttl: 3600,
            },
            {
              type: 'TXT',
              name: domain,
              value: 'google-site-verification=abc123',
              ttl: 3600,
            },
          ],
          NS: [
            {
              type: 'NS',
              name: domain,
              value: `ns1.${domain}`,
              ttl: 86400,
            },
            {
              type: 'NS',
              name: domain,
              value: `ns2.${domain}`,
              ttl: 86400,
            },
          ],
          SOA: [
            {
              type: 'SOA',
              name: domain,
              value: `ns1.${domain} hostmaster.${domain} 2023100101 7200 3600 1209600 300`,
              ttl: 86400,
            },
          ],
        },
        timing: {
          start: startTime,
          end: performance.now(),
          duration: 0,
        },
      };

      mockRecords.timing.end = performance.now();
      mockRecords.timing.duration = mockRecords.timing.end - mockRecords.timing.start;

      setResult(mockRecords);
    } catch (err) {
      setError('Failed to fetch DNS records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTTL = (ttl: number) => {
    if (ttl < 60) return `${ttl} seconds`;
    if (ttl < 3600) return `${Math.round(ttl / 60)} minutes`;
    if (ttl < 86400) return `${Math.round(ttl / 3600)} hours`;
    return `${Math.round(ttl / 86400)} days`;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[recordTypes[type]?.color || 'gray'];
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🌐' : i % 3 === 1 ? '🔍' : '📋'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              DNS Record <span className="text-green-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check and analyze DNS records for any domain
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Domain Input */}
            <div className="mb-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value.toLowerCase())}
                    placeholder="Enter domain name (e.g., example.com)"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={checkDNS}
                    disabled={loading || !domain.trim()}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Checking...' : 'Check DNS'}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            {result && (
              <>
                {/* Overview */}
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-green-100 text-green-800 border-green-200">
                        <h3 className="text-lg font-semibold">Domain</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-xl font-bold mb-2">{result.domain}</div>
                        <div className="text-gray-600">Checked domain name</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-blue-100 text-blue-800 border-blue-200">
                        <h3 className="text-lg font-semibold">Response Time</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-xl font-bold mb-2">
                          {Math.round(result.timing.duration)}ms
                        </div>
                        <div className="text-gray-600">Query duration</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-purple-100 text-purple-800 border-purple-200">
                        <h3 className="text-lg font-semibold">Record Count</h3>
                      </div>
                      <div className="p-6">
                        <div className="text-xl font-bold mb-2">
                          {Object.values(result.records).reduce((acc, curr) => acc + curr.length, 0)}
                        </div>
                        <div className="text-gray-600">Total DNS records</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Record Type Filter */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedType('all')}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedType === 'all'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      All Records
                    </button>
                    {Object.keys(result.records).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedType === type
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type} Records
                      </button>
                    ))}
                  </div>
                </div>

                {/* Records List */}
                <div className="space-y-4">
                  {Object.entries(result.records)
                    .filter(([type]) => selectedType === 'all' || type === selectedType)
                    .map(([type, records]) => (
                      <div key={type} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className={`px-6 py-4 flex items-center justify-between ${getTypeColor(type)}`}>
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{recordTypes[type].icon}</span>
                            <h3 className="text-lg font-semibold">{recordTypes[type].name}</h3>
                          </div>
                          <span className="text-sm font-medium">
                            {records.length} record{records.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="p-6">
                          <div className="space-y-6">
                            {records.map((record, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm font-medium text-gray-500">Name</div>
                                    <div className="mt-1 font-mono text-sm text-gray-900">{record.name}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500">TTL</div>
                                    <div className="mt-1 text-sm text-gray-900">{formatTTL(record.ttl)}</div>
                                  </div>
                                  {record.priority !== undefined && (
                                    <div>
                                      <div className="text-sm font-medium text-gray-500">Priority</div>
                                      <div className="mt-1 text-sm text-gray-900">{record.priority}</div>
                                    </div>
                                  )}
                                  <div className="md:col-span-2">
                                    <div className="text-sm font-medium text-gray-500">Value</div>
                                    <div className="mt-1 font-mono text-sm text-gray-900 break-all">{record.value}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            <p>{recordTypes[type].description}</p>
                            <div className="mt-2">
                              <span className="font-medium">Example format:</span>
                              <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">{recordTypes[type].example}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About DNS Records</h3>
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
                    <h4 className="text-lg font-medium text-gray-800 mb-2">What are DNS Records?</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Domain Settings:</span> Configure how domains work
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Internet Directory:</span> Maps domain names to services
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">DNS System:</span> Backbone of the internet
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Common Record Types</h4>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• A Record (IPv4 address)</li>
                        <li>• AAAA Record (IPv6 address)</li>
                        <li>• CNAME Record (Alias)</li>
                        <li>• MX Record (Mail server)</li>
                        <li>• TXT Record (Text information)</li>
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