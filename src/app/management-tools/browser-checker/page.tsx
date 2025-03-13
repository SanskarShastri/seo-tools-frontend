'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'User Agent Checker',
    description: 'Check your browser\'s user agent string',
    link: '/management-tools/user-agent-checker',
    icon: '🔍',
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
    icon: '🌐',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  os: string;
  device: string;
  language: string;
  cookies: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  webWorkers: boolean;
  serviceWorker: boolean;
  webGL: boolean;
  canvas: boolean;
  webRTC: boolean;
  webAssembly: boolean;
  touchscreen: boolean;
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    orientation: string;
  };
  network: {
    type: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };
  features: {
    name: string;
    supported: boolean;
    details?: string;
  }[];
}

export default function BrowserCheckerPage() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Detect browser information
    const detectBrowser = () => {
      const ua = navigator.userAgent;
      let browserName = 'Unknown';
      let browserVersion = '';
      let engineName = 'Unknown';

      if (ua.includes('Firefox/')) {
        browserName = 'Firefox';
        browserVersion = ua.split('Firefox/')[1];
        engineName = 'Gecko';
      } else if (ua.includes('Chrome/')) {
        browserName = 'Chrome';
        browserVersion = ua.split('Chrome/')[1].split(' ')[0];
        engineName = 'Blink';
      } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
        browserName = 'Safari';
        browserVersion = ua.split('Version/')[1].split(' ')[0];
        engineName = 'WebKit';
      } else if (ua.includes('Edge/') || ua.includes('Edg/')) {
        browserName = 'Edge';
        browserVersion = ua.includes('Edge/') ? ua.split('Edge/')[1] : ua.split('Edg/')[1];
        engineName = 'Blink';
      }

      const info: BrowserInfo = {
        name: browserName,
        version: browserVersion,
        engine: engineName,
        os: detectOS(),
        device: detectDevice(),
        language: navigator.language,
        cookies: navigator.cookieEnabled,
        localStorage: isLocalStorageAvailable(),
        sessionStorage: isSessionStorageAvailable(),
        webWorkers: 'Worker' in window,
        serviceWorker: 'serviceWorker' in navigator,
        webGL: isWebGLAvailable(),
        canvas: isCanvasAvailable(),
        webRTC: isWebRTCAvailable(),
        webAssembly: isWebAssemblyAvailable(),
        touchscreen: 'ontouchstart' in window,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth,
          orientation: window.screen.orientation?.type || 'unknown',
        },
        network: {
          type: (navigator as any).connection?.effectiveType || 'unknown',
          downlink: (navigator as any).connection?.downlink || 0,
          rtt: (navigator as any).connection?.rtt || 0,
          saveData: (navigator as any).connection?.saveData || false,
        },
        features: detectFeatures(),
      };

      setBrowserInfo(info);
    };

    detectBrowser();
  }, []);

  const detectOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  };

  const detectDevice = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Mobile')) return 'Mobile';
    if (ua.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  };

  const isLocalStorageAvailable = () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSessionStorageAvailable = () => {
    try {
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  };

  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  const isCanvasAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext && canvas.getContext('2d'));
    } catch (e) {
      return false;
    }
  };

  const isWebRTCAvailable = () => {
    return !!(window.RTCPeerConnection || (window as any).webkitRTCPeerConnection || (window as any).mozRTCPeerConnection);
  };

  const isWebAssemblyAvailable = () => {
    try {
      if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
        const module = new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0]));
        if (module instanceof WebAssembly.Module) {
          return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
      }
    } catch (e) {}
    return false;
  };

  const detectFeatures = () => {
    return [
      {
        name: 'CSS Grid',
        supported: CSS.supports('display: grid'),
      },
      {
        name: 'CSS Flexbox',
        supported: CSS.supports('display: flex'),
      },
      {
        name: 'CSS Variables',
        supported: CSS.supports('--test: 0'),
      },
      {
        name: 'Fetch API',
        supported: 'fetch' in window,
      },
      {
        name: 'Async/Await',
        supported: (async () => {})() instanceof Promise,
      },
      {
        name: 'ES6 Modules',
        supported: 'noModule' in HTMLScriptElement.prototype,
      },
      {
        name: 'Intersection Observer',
        supported: 'IntersectionObserver' in window,
      },
      {
        name: 'ResizeObserver',
        supported: 'ResizeObserver' in window,
      },
      {
        name: 'Payment Request API',
        supported: 'PaymentRequest' in window,
      },
      {
        name: 'Web Share API',
        supported: 'share' in navigator,
      },
    ];
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'network', label: 'Network' },
    { id: 'screen', label: 'Screen' },
  ];

  const getFeatureColor = (supported: boolean) => {
    return supported ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
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
                {i % 3 === 0 ? '🌐' : i % 3 === 1 ? '💻' : '📱'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Browser <span className="text-blue-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check your browser information, features, and compatibility
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {browserInfo ? (
              <>
                {/* Browser Overview */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌐</div>
                      <div className="text-sm text-gray-600">Browser</div>
                      <div className="text-lg font-semibold">{browserInfo.name} {browserInfo.version}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">💻</div>
                      <div className="text-sm text-gray-600">Operating System</div>
                      <div className="text-lg font-semibold">{browserInfo.os}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">⚙️</div>
                      <div className="text-sm text-gray-600">Engine</div>
                      <div className="text-lg font-semibold">{browserInfo.engine}</div>
                    </div>
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
                            ? 'bg-blue-600 text-white border-blue-600'
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Device Type</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.device}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Language</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.language}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Touch Support</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.touchscreen ? 'Yes' : 'No'}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-900">Storage Support</h3>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Cookies</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.cookies ? 'Enabled' : 'Disabled'}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Local Storage</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.localStorage ? 'Available' : 'Not Available'}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Session Storage</div>
                            <div className="mt-1 text-sm text-gray-900">{browserInfo.sessionStorage ? 'Available' : 'Not Available'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'features' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {browserInfo.features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className={`px-6 py-4 ${getFeatureColor(feature.supported)}`}>
                            <h3 className="text-lg font-semibold">{feature.name}</h3>
                          </div>
                          <div className="p-6">
                            <div className="text-sm text-gray-600">
                              {feature.supported ? 'Supported' : 'Not Supported'}
                              {feature.details && (
                                <div className="mt-2 text-gray-500">{feature.details}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedTab === 'network' && (
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Network Information</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Connection Type</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.network.type}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Downlink Speed</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.network.downlink} Mbps</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Round Trip Time</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.network.rtt} ms</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Data Saver</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.network.saveData ? 'Enabled' : 'Disabled'}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTab === 'screen' && (
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Screen Information</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Resolution</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.screen.width} x {browserInfo.screen.height}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Color Depth</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.screen.colorDepth} bits</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Orientation</div>
                          <div className="mt-1 text-sm text-gray-900">{browserInfo.screen.orientation}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <div className="mt-4 text-gray-600">Loading browser information...</div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About Browser Detection</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Why Check Browser Info?</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Compatibility:</span> Ensure website features work
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Debugging:</span> Identify browser-specific issues
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Analytics:</span> Track user environments
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Key Features</h4>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Browser identification</li>
                        <li>• Feature detection</li>
                        <li>• Network information</li>
                        <li>• Screen properties</li>
                        <li>• Storage capabilities</li>
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