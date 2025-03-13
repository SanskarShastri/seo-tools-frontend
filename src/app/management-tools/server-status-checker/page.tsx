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

interface ServerStatus {
  url: string;
  isUp: boolean;
  responseTime: number;
  lastChecked: string;
  metrics: {
    uptime: number;
    loadAverage: number[];
    memory: {
      total: number;
      used: number;
      free: number;
    };
    cpu: {
      usage: number;
      cores: number;
    };
    disk: {
      total: number;
      used: number;
      free: number;
    };
  };
  ssl: {
    isValid: boolean;
    expiresIn: number;
    issuer: string;
  };
  ports: {
    port: number;
    service: string;
    status: 'open' | 'closed' | 'filtered';
  }[];
}

export default function ServerStatusCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ServerStatus | null>(null);
  const [monitoringInterval, setMonitoringInterval] = useState<NodeJS.Timeout | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formatBytes = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatUptime = (uptime: number): string => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const checkServer = async () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulated API call - replace with actual server status check implementation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockResult: ServerStatus = {
        url: url,
        isUp: true,
        responseTime: 125,
        lastChecked: new Date().toISOString(),
        metrics: {
          uptime: 1234567,
          loadAverage: [0.65, 0.75, 0.85],
          memory: {
            total: 16 * 1024 * 1024 * 1024,
            used: 8 * 1024 * 1024 * 1024,
            free: 8 * 1024 * 1024 * 1024,
          },
          cpu: {
            usage: 45.5,
            cores: 8,
          },
          disk: {
            total: 500 * 1024 * 1024 * 1024,
            used: 250 * 1024 * 1024 * 1024,
            free: 250 * 1024 * 1024 * 1024,
          },
        },
        ssl: {
          isValid: true,
          expiresIn: 60,
          issuer: 'Let\'s Encrypt',
        },
        ports: [
          { port: 80, service: 'HTTP', status: 'open' },
          { port: 443, service: 'HTTPS', status: 'open' },
          { port: 22, service: 'SSH', status: 'filtered' },
          { port: 3306, service: 'MySQL', status: 'closed' },
        ],
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to check server status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startMonitoring = () => {
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsMonitoring(true);
    checkServer();
    const interval = setInterval(checkServer, 60000); // Check every minute
    setMonitoringInterval(interval);
  };

  const stopMonitoring = () => {
    if (monitoringInterval) {
      clearInterval(monitoringInterval);
      setMonitoringInterval(null);
    }
    setIsMonitoring(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '⚡' : i % 3 === 1 ? '🖥️' : '📊'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Server Status <span className="text-yellow-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Monitor server health, performance metrics, and response times
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* URL Input */}
            <div className="mb-8">
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter server URL (e.g., https://example.com)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={checkServer}
                      disabled={loading || isMonitoring}
                      className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                    >
                      {loading ? 'Checking...' : 'Check Status'}
                    </button>
                    <button
                      onClick={isMonitoring ? stopMonitoring : startMonitoring}
                      disabled={loading}
                      className={`px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isMonitoring
                          ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                          : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                      }`}
                    >
                      {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 text-red-600 text-sm">{error}</div>
                )}
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Status Overview */}
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Status</h4>
                      <div className={`text-lg font-semibold ${result.isUp ? 'text-green-600' : 'text-red-600'}`}>
                        {result.isUp ? 'Online' : 'Offline'}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Response Time</h4>
                      <div className="text-lg font-semibold text-gray-900">{result.responseTime}ms</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Uptime</h4>
                      <div className="text-lg font-semibold text-gray-900">{formatUptime(result.metrics.uptime)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Last Checked</h4>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(result.lastChecked).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Metrics */}
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">System Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CPU Usage */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">CPU Usage</h4>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                              {result.metrics.cpu.usage}%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-yellow-600">
                              {result.metrics.cpu.cores} Cores
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                          <div
                            style={{ width: `${result.metrics.cpu.usage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Memory Usage */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Memory Usage</h4>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                              {Math.round((result.metrics.memory.used / result.metrics.memory.total) * 100)}%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-yellow-600">
                              {formatBytes(result.metrics.memory.used)} / {formatBytes(result.metrics.memory.total)}
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                          <div
                            style={{ width: `${(result.metrics.memory.used / result.metrics.memory.total) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Disk Usage */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Disk Usage</h4>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                              {Math.round((result.metrics.disk.used / result.metrics.disk.total) * 100)}%
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-yellow-600">
                              {formatBytes(result.metrics.disk.used)} / {formatBytes(result.metrics.disk.total)}
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                          <div
                            style={{ width: `${(result.metrics.disk.used / result.metrics.disk.total) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Load Average */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Load Average</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">1 min</div>
                          <div className="text-lg font-semibold text-gray-900">{result.metrics.loadAverage[0]}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">5 min</div>
                          <div className="text-lg font-semibold text-gray-900">{result.metrics.loadAverage[1]}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">15 min</div>
                          <div className="text-lg font-semibold text-gray-900">{result.metrics.loadAverage[2]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SSL Certificate */}
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">SSL Certificate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Status</h4>
                      <div className={`text-lg font-semibold ${result.ssl.isValid ? 'text-green-600' : 'text-red-600'}`}>
                        {result.ssl.isValid ? 'Valid' : 'Invalid'}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Expires In</h4>
                      <div className="text-lg font-semibold text-gray-900">{result.ssl.expiresIn} days</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Issuer</h4>
                      <div className="text-lg font-semibold text-gray-900">{result.ssl.issuer}</div>
                    </div>
                  </div>
                </div>

                {/* Port Status */}
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Port Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {result.ports.map((port, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">{port.service}</h4>
                            <div className="text-lg font-semibold text-gray-900">Port {port.port}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            port.status === 'open'
                              ? 'bg-green-100 text-green-800'
                              : port.status === 'closed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {port.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-yellow-50 rounded-xl p-6 border border-yellow-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Server Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What We Monitor</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Our server monitoring tool provides real-time insights into your server's health and performance metrics, helping you identify and prevent potential issues before they affect your users.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Metrics</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>CPU Usage:</strong> Server processing load</li>
                      <li><strong>Memory Usage:</strong> RAM utilization</li>
                      <li><strong>Disk Space:</strong> Storage capacity and usage</li>
                      <li><strong>Load Average:</strong> System demand over time</li>
                      <li><strong>Response Time:</strong> Server responsiveness</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Monitor server metrics regularly
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Set up alerts for critical thresholds
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep SSL certificates up to date
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Regularly review port security
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
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
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