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

interface UrlEntry {
  url: string;
  isValid: boolean;
  error?: string;
}

export default function UrlOpenerPage() {
  const [urls, setUrls] = useState<string>('');
  const [parsedUrls, setParsedUrls] = useState<UrlEntry[]>([]);
  const [openDelay, setOpenDelay] = useState<number>(1);
  const [isOpening, setIsOpening] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const validateUrl = (url: string): UrlEntry => {
    try {
      const trimmedUrl = url.trim();
      if (!trimmedUrl) {
        return { url: trimmedUrl, isValid: false, error: 'URL cannot be empty' };
      }

      // Add protocol if missing
      let urlWithProtocol = trimmedUrl;
      if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        urlWithProtocol = `https://${trimmedUrl}`;
      }

      new URL(urlWithProtocol);
      return { url: urlWithProtocol, isValid: true };
    } catch {
      return { url, isValid: false, error: 'Invalid URL format' };
    }
  };

  const parseUrls = () => {
    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url !== '');

    const validated = urlList.map(validateUrl);
    setParsedUrls(validated);
    return validated.every(entry => entry.isValid);
  };

  const openUrls = async () => {
    if (!parseUrls()) {
      return;
    }

    setIsOpening(true);

    try {
      for (const entry of parsedUrls) {
        if (entry.isValid) {
          window.open(entry.url, '_blank');
          await new Promise(resolve => setTimeout(resolve, openDelay * 1000));
        }
      }
    } finally {
      setIsOpening(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrls(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const clearUrls = () => {
    setUrls('');
    setParsedUrls([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '🌐' : '📋'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              URL <span className="text-orange-300">Opener</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Open multiple URLs at once with customizable delay
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Instructions */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  {showInstructions ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInstructions && (
                <div className="space-y-4 text-sm text-gray-600">
                  <p>
                    1. Enter one URL per line in the text area below. URLs can be with or without the http(s):// prefix.
                  </p>
                  <p>
                    2. Set the delay between opening each URL (in seconds) to prevent browser overload.
                  </p>
                  <p>
                    3. Click "Open URLs" to start opening the URLs in new tabs.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <h4 className="font-medium text-gray-800 mb-2">Example Format:</h4>
                    <pre className="text-gray-600 whitespace-pre-wrap">
                      https://example.com{'\n'}
                      google.com{'\n'}
                      https://github.com
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* URL Input */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-8">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Enter URLs</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePaste}
                      className="px-4 py-2 text-orange-600 hover:text-orange-700 focus:outline-none"
                    >
                      📋 Paste
                    </button>
                    <button
                      onClick={clearUrls}
                      className="px-4 py-2 text-orange-600 hover:text-orange-700 focus:outline-none"
                    >
                      🗑️ Clear
                    </button>
                  </div>
                </div>
                <textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  placeholder="Enter one URL per line..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Settings */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="flex items-center space-x-4">
                <label className="text-sm text-gray-700">Delay between URLs:</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={openDelay}
                  onChange={(e) => setOpenDelay(parseFloat(e.target.value))}
                  className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                />
                <span className="text-sm text-gray-600">seconds</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={openUrls}
                disabled={isOpening || !urls.trim()}
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
              >
                {isOpening ? 'Opening URLs...' : 'Open URLs'}
              </button>
            </div>

            {/* URL Validation Results */}
            {parsedUrls.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Results</h3>
                <div className="space-y-2">
                  {parsedUrls.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg ${
                        entry.isValid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                      }`}
                    >
                      <span className="text-xl mr-3">
                        {entry.isValid ? '✅' : '❌'}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {entry.url}
                        </div>
                        {!entry.isValid && (
                          <div className="text-xs text-red-600 mt-1">
                            {entry.error}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-orange-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About URL Opener</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Features</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Open multiple URLs simultaneously
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Customizable delay between openings
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      URL validation and error checking
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Clipboard support for easy pasting
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Tips</h4>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Use a reasonable delay to prevent browser overload</li>
                      <li>• Enable pop-up permissions for this site</li>
                      <li>• URLs are automatically fixed if missing protocol</li>
                      <li>• Clear your browser cache if links don't open</li>
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
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
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