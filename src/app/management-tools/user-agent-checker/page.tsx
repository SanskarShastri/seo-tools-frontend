'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Browser Checker',
    description: 'Check your browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'DNS Record Checker',
    description: 'Check DNS records of any domain',
    link: '/management-tools/dns-record-checker',
    icon: '🔍',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface UserAgentInfo {
  raw: string;
  browser: {
    name: string;
    version: string;
    engine: string;
    engineVersion: string;
  };
  os: {
    name: string;
    version: string;
    architecture: string;
  };
  device: {
    type: string;
    brand?: string;
    model?: string;
  };
  bot: boolean;
  mobile: boolean;
}

interface ParsedComponent {
  name: string;
  value: string;
  description: string;
  example?: string;
}

export default function UserAgentCheckerPage() {
  const [userAgentInfo, setUserAgentInfo] = useState<UserAgentInfo | null>(null);
  const [customUA, setCustomUA] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    analyzeUserAgent(navigator.userAgent);
  }, []);

  const analyzeUserAgent = (ua: string) => {
    // In a real implementation, this would use a proper UA parser library
    // For demo purposes, we'll do basic parsing
    const info: UserAgentInfo = {
      raw: ua,
      browser: {
        name: 'Unknown',
        version: '',
        engine: 'Unknown',
        engineVersion: '',
      },
      os: {
        name: 'Unknown',
        version: '',
        architecture: '64-bit',
      },
      device: {
        type: 'Desktop',
      },
      bot: false,
      mobile: false,
    };

    // Detect browser and engine
    if (ua.includes('Firefox/')) {
      info.browser.name = 'Firefox';
      info.browser.version = ua.split('Firefox/')[1].split(' ')[0];
      info.browser.engine = 'Gecko';
      const geckoVersion = ua.match(/rv:([0-9.]+)/);
      info.browser.engineVersion = geckoVersion ? geckoVersion[1] : '';
    } else if (ua.includes('Chrome/')) {
      info.browser.name = 'Chrome';
      info.browser.version = ua.split('Chrome/')[1].split(' ')[0];
      info.browser.engine = 'Blink';
      info.browser.engineVersion = ua.split('Chrome/')[1].split(' ')[0];
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      info.browser.name = 'Safari';
      info.browser.version = ua.split('Version/')[1]?.split(' ')[0] || '';
      info.browser.engine = 'WebKit';
      const webkitVersion = ua.match(/WebKit\/([0-9.]+)/);
      info.browser.engineVersion = webkitVersion ? webkitVersion[1] : '';
    } else if (ua.includes('Edge/') || ua.includes('Edg/')) {
      info.browser.name = 'Edge';
      info.browser.version = ua.includes('Edge/') ? ua.split('Edge/')[1] : ua.split('Edg/')[1];
      info.browser.engine = 'Blink';
      info.browser.engineVersion = ua.split('Chrome/')[1]?.split(' ')[0] || '';
    }

    // Detect OS
    if (ua.includes('Windows')) {
      info.os.name = 'Windows';
      const ntVersion = ua.match(/Windows NT ([0-9.]+)/);
      if (ntVersion) {
        const ntMap: { [key: string]: string } = {
          '10.0': '10/11',
          '6.3': '8.1',
          '6.2': '8',
          '6.1': '7',
          '6.0': 'Vista',
          '5.2': 'XP x64',
          '5.1': 'XP',
        };
        info.os.version = ntMap[ntVersion[1]] || ntVersion[1];
      }
    } else if (ua.includes('Mac OS X')) {
      info.os.name = 'macOS';
      const macVersion = ua.match(/Mac OS X ([0-9_.]+)/);
      if (macVersion) {
        info.os.version = macVersion[1].replace(/_/g, '.');
      }
    } else if (ua.includes('Linux')) {
      info.os.name = 'Linux';
      if (ua.includes('Android')) {
        info.os.name = 'Android';
        const androidVersion = ua.match(/Android ([0-9.]+)/);
        info.os.version = androidVersion ? androidVersion[1] : '';
      }
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
      info.os.name = 'iOS';
      const iosVersion = ua.match(/OS ([0-9_]+)/);
      info.os.version = iosVersion ? iosVersion[1].replace(/_/g, '.') : '';
    }

    // Detect device type and details
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
      info.device.type = 'Mobile';
      info.mobile = true;
    } else if (ua.includes('iPad') || ua.includes('Tablet')) {
      info.device.type = 'Tablet';
      info.mobile = true;
    }

    // Detect architecture
    if (ua.includes('x64') || ua.includes('Win64') || ua.includes('x86_64')) {
      info.os.architecture = '64-bit';
    } else if (ua.includes('x86') || ua.includes('WOW64')) {
      info.os.architecture = '32-bit';
    } else if (ua.includes('arm') || ua.includes('ARM')) {
      info.os.architecture = 'ARM';
    }

    // Detect if bot
    info.bot = /bot|crawler|spider|crawling/i.test(ua);

    setUserAgentInfo(info);
  };

  const parseComponents = (ua: string): ParsedComponent[] => {
    const components: ParsedComponent[] = [];
    const parts = ua.split(' ');
    
    parts.forEach(part => {
      if (part.includes('/')) {
        const [name, value] = part.split('/');
        let description = '';
        let example = '';

        switch (name) {
          case 'Mozilla':
            description = 'Legacy compatibility identifier';
            example = 'Mozilla/5.0';
            break;
          case 'Chrome':
            description = 'Chrome browser version';
            example = 'Chrome/96.0.4664.110';
            break;
          case 'Safari':
            description = 'WebKit-based browser identifier';
            example = 'Safari/537.36';
            break;
          case 'Firefox':
            description = 'Firefox browser version';
            example = 'Firefox/95.0';
            break;
          default:
            description = 'Browser component identifier';
        }

        components.push({ name, value, description, example });
      } else if (part.includes('(')) {
        description = 'System information including OS and architecture';
        components.push({
          name: 'System',
          value: part.replace(/[()]/g, ''),
          description,
          example: '(Windows NT 10.0; Win64; x64)',
        });
      }
    });

    return components;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'details', label: 'Details' },
  ];

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
                {i % 3 === 0 ? '🔍' : i % 3 === 1 ? '📱' : '💻'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              User Agent <span className="text-purple-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Analyze and understand your browser's user agent string
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Custom UA Input */}
            <div className="mb-8">
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {showCustomInput ? 'Use My User Agent' : 'Check Custom User Agent'}
              </button>
              {showCustomInput && (
                <div className="mt-4">
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                    <input
                      type="text"
                      value={customUA}
                      onChange={(e) => setCustomUA(e.target.value)}
                      placeholder="Enter custom User Agent string"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button
                      onClick={() => analyzeUserAgent(customUA)}
                      disabled={!customUA.trim()}
                      className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
                    >
                      Analyze
                    </button>
                  </div>
                </div>
              )}
            </div>

            {userAgentInfo && (
              <>
                {/* Raw UA String */}
                <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
                  <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-all">
                    {userAgentInfo.raw}
                  </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedTab === tab.id
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {selectedTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-purple-100 text-purple-800 border-purple-200">
                          <h3 className="text-lg font-semibold">Browser</h3>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Name</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.browser.name}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Version</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.browser.version}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Engine</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.browser.engine} {userAgentInfo.browser.engineVersion}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-blue-100 text-blue-800 border-blue-200">
                          <h3 className="text-lg font-semibold">Operating System</h3>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Name</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.os.name}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Version</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.os.version}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Architecture</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.os.architecture}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-green-100 text-green-800 border-green-200">
                          <h3 className="text-lg font-semibold">Device</h3>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Type</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.device.type}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Mobile Device</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.mobile ? 'Yes' : 'No'}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Bot Detection</div>
                            <div className="mt-1 text-sm text-gray-900">{userAgentInfo.bot ? 'Bot Detected' : 'Not a Bot'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'components' && (
                    <div className="space-y-4">
                      {parseComponents(userAgentInfo.raw).map((component, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
                          </div>
                          <div className="p-6">
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm font-medium text-gray-500">Value</div>
                                <div className="mt-1 font-mono text-sm text-gray-900">{component.value}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-500">Description</div>
                                <div className="mt-1 text-sm text-gray-600">{component.description}</div>
                              </div>
                              {component.example && (
                                <div>
                                  <div className="text-sm font-medium text-gray-500">Example</div>
                                  <div className="mt-1 font-mono text-sm text-gray-600">{component.example}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'details' && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900">Technical Details</h3>
                        </div>
                        <div className="p-6">
                          <div className="prose max-w-none">
                            <p className="text-gray-600">The User Agent string is a crucial identifier that your browser sends to websites. It contains information about:</p>
                            <ul className="mt-4 space-y-2 text-gray-600">
                              <li>Browser type and version</li>
                              <li>Operating system and version</li>
                              <li>Device type and capabilities</li>
                              <li>Rendering engine information</li>
                              <li>Platform architecture</li>
                            </ul>
                            <p className="mt-4 text-gray-600">This information helps websites:</p>
                            <ul className="mt-4 space-y-2 text-gray-600">
                              <li>Deliver compatible content</li>
                              <li>Enable platform-specific features</li>
                              <li>Optimize performance</li>
                              <li>Track usage analytics</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About User Agents</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">What is a User Agent?</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Browser Identifier:</span> Tells websites about your browser
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">System Info:</span> Includes OS and device details
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Compatibility:</span> Helps with content delivery
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Common Uses</h4>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Browser detection and compatibility</li>
                        <li>• Content optimization</li>
                        <li>• Analytics and tracking</li>
                        <li>• Bot detection</li>
                        <li>• Security and fraud prevention</li>
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