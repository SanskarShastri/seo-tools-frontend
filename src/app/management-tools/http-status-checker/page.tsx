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
    title: 'Server Status Checker',
    description: 'Check server status and response time',
    link: '/management-tools/server-status-checker',
    icon: '⚡',
  },
  {
    title: 'Hosting Checker',
    description: 'Find hosting information for domains',
    link: '/management-tools/hosting-checker',
    icon: '🏢',
  },
  {
    title: 'Meta Tag Analyzer',
    description: 'Analyze meta tags of any webpage',
    link: '/management-tools/metatag-analyzer',
    icon: '🏷️',
  },
];

interface HttpResponse {
  url: string;
  status: number;
  statusText: string;
  headers: { [key: string]: string };
  redirectChain: {
    url: string;
    status: number;
    statusText: string;
  }[];
  timing: {
    total: number;
    dns: number;
    tcp: number;
    ssl: number;
    ttfb: number;
  };
}

const statusCodeInfo: { [key: string]: { title: string; description: string; color: string } } = {
  '1xx': {
    title: 'Informational',
    description: 'Request received, continuing process',
    color: 'blue',
  },
  '2xx': {
    title: 'Success',
    description: 'Request successfully received, understood, and accepted',
    color: 'green',
  },
  '3xx': {
    title: 'Redirection',
    description: 'Further action needs to be taken to complete the request',
    color: 'yellow',
  },
  '4xx': {
    title: 'Client Error',
    description: 'Request contains bad syntax or cannot be fulfilled',
    color: 'orange',
  },
  '5xx': {
    title: 'Server Error',
    description: 'Server failed to fulfill a valid request',
    color: 'red',
  },
};

export default function HttpStatusCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<HttpResponse | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getStatusCodeCategory = (status: number): string => {
    return `${Math.floor(status / 100)}xx`;
  };

  const getStatusColor = (status: number): string => {
    const category = getStatusCodeCategory(status);
    return statusCodeInfo[category]?.color || 'gray';
  };

  const checkUrl = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call - replace with actual HTTP request implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: HttpResponse = {
        url: url,
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'server': 'nginx/1.18.0',
          'date': new Date().toUTCString(),
          'content-length': '12345',
          'cache-control': 'public, max-age=3600',
        },
        redirectChain: [],
        timing: {
          total: 245,
          dns: 15,
          tcp: 35,
          ssl: 90,
          ttfb: 105,
        },
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to check URL. Please try again.');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔍' : i % 3 === 1 ? '📡' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              HTTP Status <span className="text-purple-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check HTTP status codes, headers, and response times for any URL
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL (e.g., https://example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button
                    onClick={checkUrl}
                    disabled={loading}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {loading ? 'Checking...' : 'Check URL'}
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
                {/* Status Code */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Code</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <div className={`text-4xl font-bold mb-2 text-${getStatusColor(result.status)}-600`}>
                        {result.status}
                      </div>
                      <div className="text-sm text-gray-600">{result.statusText}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                      <div className="text-lg font-medium text-gray-900">
                        {statusCodeInfo[getStatusCodeCategory(result.status)]?.title}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {statusCodeInfo[getStatusCodeCategory(result.status)]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Headers */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Response Headers</h3>
                    <button
                      onClick={() => setShowHeaders(!showHeaders)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      {showHeaders ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                  <div className="bg-white rounded-lg border border-purple-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-purple-200">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Header
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-purple-200">
                        {Object.entries(result.headers)
                          .slice(0, showHeaders ? undefined : 5)
                          .map(([key, value], index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {key}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {value}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Response Timing */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Timing</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Total Time</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.timing.total}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">DNS Lookup</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.timing.dns}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">TCP Connection</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.timing.tcp}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">SSL/TLS</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.timing.ssl}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Time to First Byte</h4>
                      <div className="text-2xl font-semibold text-gray-900">{result.timing.ttfb}ms</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About HTTP Status Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Status Code Categories</h4>
                  <div className="space-y-4">
                    {Object.entries(statusCodeInfo).map(([category, info]) => (
                      <div key={category} className="bg-white rounded-lg p-4 border border-purple-100">
                        <h5 className="font-medium text-gray-800 mb-1">
                          {category} - {info.title}
                        </h5>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Common Status Codes</h4>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong>200 OK:</strong> Request succeeded</li>
                      <li><strong>301/302:</strong> Permanent/temporary redirect</li>
                      <li><strong>400:</strong> Bad request</li>
                      <li><strong>401:</strong> Unauthorized</li>
                      <li><strong>403:</strong> Forbidden</li>
                      <li><strong>404:</strong> Not found</li>
                      <li><strong>500:</strong> Internal server error</li>
                      <li><strong>502:</strong> Bad gateway</li>
                      <li><strong>503:</strong> Service unavailable</li>
                      <li><strong>504:</strong> Gateway timeout</li>
                    </ul>
                  </div>
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