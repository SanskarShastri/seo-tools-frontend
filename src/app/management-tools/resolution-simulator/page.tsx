'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Screen Resolution',
    description: 'Check your screen resolution',
    link: '/management-tools/screen-resolution',
    icon: '🖥️',
  },
  {
    title: 'Page Size Checker',
    description: 'Check webpage dimensions and file size',
    link: '/management-tools/page-size-checker',
    icon: '📏',
  },
  {
    title: 'Browser Checker',
    description: 'Check your browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
  {
    title: 'User Agent Checker',
    description: 'Check your browser\'s user agent string',
    link: '/management-tools/user-agent-checker',
    icon: '🔍',
  },
];

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  userAgent?: string;
}

const devicePresets: DevicePreset[] = [
  // Desktop Presets
  { name: '4K Display', width: 3840, height: 2160, deviceType: 'desktop' },
  { name: 'QHD Display', width: 2560, height: 1440, deviceType: 'desktop' },
  { name: 'Full HD', width: 1920, height: 1080, deviceType: 'desktop' },
  { name: 'HD+', width: 1600, height: 900, deviceType: 'desktop' },
  { name: 'HD', width: 1366, height: 768, deviceType: 'desktop' },
  
  // Tablet Presets
  { name: 'iPad Pro', width: 1024, height: 1366, deviceType: 'tablet' },
  { name: 'iPad Air', width: 820, height: 1180, deviceType: 'tablet' },
  { name: 'iPad Mini', width: 768, height: 1024, deviceType: 'tablet' },
  { name: 'Galaxy Tab S7', width: 1600, height: 2560, deviceType: 'tablet' },
  
  // Mobile Presets
  { name: 'iPhone 13 Pro Max', width: 428, height: 926, deviceType: 'mobile' },
  { name: 'iPhone 13/12', width: 390, height: 844, deviceType: 'mobile' },
  { name: 'iPhone SE', width: 375, height: 667, deviceType: 'mobile' },
  { name: 'Galaxy S21', width: 360, height: 800, deviceType: 'mobile' },
  { name: 'Galaxy Fold', width: 280, height: 653, deviceType: 'mobile' },
];

export default function ResolutionSimulatorPage() {
  const [url, setUrl] = useState('');
  const [customWidth, setCustomWidth] = useState('1920');
  const [customHeight, setCustomHeight] = useState('1080');
  const [activePreset, setActivePreset] = useState<DevicePreset | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [activeDeviceType, setActiveDeviceType] = useState<'all' | 'desktop' | 'tablet' | 'mobile'>('all');

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlSubmit = () => {
    const isValid = validateUrl(url);
    setIsValidUrl(isValid);
    if (isValid) {
      setIsLoading(true);
      setShowPreview(true);
      // Simulate loading time
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handlePresetClick = (preset: DevicePreset) => {
    setActivePreset(preset);
    setCustomWidth(preset.width.toString());
    setCustomHeight(preset.height.toString());
  };

  const handleOrientationToggle = () => {
    setOrientation(prev => prev === 'landscape' ? 'portrait' : 'landscape');
    setCustomWidth(customHeight);
    setCustomHeight(customWidth);
  };

  const filteredPresets = activeDeviceType === 'all'
    ? devicePresets
    : devicePresets.filter(preset => preset.deviceType === activeDeviceType);

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
                {i % 3 === 0 ? '🖥️' : i % 3 === 1 ? '📱' : '💻'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Resolution <span className="text-cyan-300">Simulator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Test how your website looks at different screen sizes and devices
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-6xl mx-auto">
            {/* URL Input */}
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setIsValidUrl(true);
                    }}
                    placeholder="Enter website URL (e.g., https://example.com)"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isValidUrl ? 'border-gray-300' : 'border-red-500'
                    } focus:ring-cyan-500 focus:border-cyan-500`}
                  />
                  {!isValidUrl && (
                    <p className="mt-2 text-sm text-red-600">Please enter a valid URL</p>
                  )}
                </div>
                <button
                  onClick={handleUrlSubmit}
                  disabled={!url}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>

            {/* Device Type Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {(['all', 'desktop', 'tablet', 'mobile'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveDeviceType(type)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeDeviceType === type
                        ? 'bg-cyan-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-cyan-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Presets */}
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Presets</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      activePreset?.name === preset.name
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {preset.width} × {preset.height}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Resolution */}
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Resolution</h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <span className="text-gray-600">×</span>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <button
                  onClick={handleOrientationToggle}
                  className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-cyan-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  {orientation === 'landscape' ? '🔄 Switch to Portrait' : '🔄 Switch to Landscape'}
                </button>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="relative bg-white rounded-lg border border-cyan-200 overflow-hidden">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
                    </div>
                  ) : (
                    <div
                      className="relative mx-auto transition-all duration-300 overflow-hidden"
                      style={{
                        width: `${Math.min(parseInt(customWidth), 100)}%`,
                        height: `${parseInt(customHeight)}px`,
                        maxWidth: `${parseInt(customWidth)}px`,
                      }}
                    >
                      <iframe
                        src={url}
                        className="w-full h-full border-0"
                        title="Website Preview"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-cyan-50 rounded-xl p-6 border border-cyan-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Resolution Simulation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Why Test Different Resolutions?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Testing your website at different resolutions helps ensure a consistent user experience across various devices and screen sizes. This is crucial for responsive web design and mobile-first development.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-cyan-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Benefits</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Responsive Testing:</strong> Verify layout adaptability</li>
                      <li><strong>Cross-device Compatibility:</strong> Ensure consistent experience</li>
                      <li><strong>Mobile Optimization:</strong> Test mobile-first design</li>
                      <li><strong>Quality Assurance:</strong> Identify layout issues</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test across multiple device presets
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Check both orientations
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Verify responsive breakpoints
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test navigation and interactions
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