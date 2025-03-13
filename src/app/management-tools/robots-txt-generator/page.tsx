'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Meta Tag Generator',
    description: 'Generate meta tags for your website',
    link: '/management-tools/meta-tag-generator',
    icon: '🏷️',
  },
  {
    title: 'Sitemap Generator',
    description: 'Create XML sitemaps for your website',
    link: '/management-tools/sitemap-generator',
    icon: '🗺️',
  },
  {
    title: '.htaccess Generator',
    description: 'Generate .htaccess rules easily',
    link: '/management-tools/htaccess-generator',
    icon: '⚙️',
  },
  {
    title: 'Schema Markup Generator',
    description: 'Create JSON-LD schema markup',
    link: '/management-tools/schema-generator',
    icon: '📝',
  },
];

interface RobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: string;
}

// Add presets for common configurations
const robotsPresets = {
  standard: {
    name: 'Standard Configuration',
    rules: [{
      userAgent: '*',
      allow: ['/'],
      disallow: ['/private/', '/admin/', '/tmp/'],
      crawlDelay: '10'
    }],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com'
  },
  aggressive: {
    name: 'Aggressive Crawling',
    rules: [{
      userAgent: '*',
      allow: ['/'],
      disallow: ['/admin/', '/tmp/'],
      crawlDelay: '5'
    }],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com'
  },
  restricted: {
    name: 'Restricted Access',
    rules: [{
      userAgent: '*',
      allow: ['/public/', '/'],
      disallow: ['/*.pdf$', '/*.doc$', '/private/', '/admin/', '/tmp/', '/search'],
      crawlDelay: '15'
    }],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com'
  }
};

export default function RobotsTxtGeneratorPage() {
  const [rules, setRules] = useState<RobotsRule[]>([
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/private/', '/admin/', '/tmp/'],
      crawlDelay: '10'
    }
  ]);
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml');
  const [host, setHost] = useState('https://example.com');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [activePreset, setActivePreset] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Add validation function
  const validateRules = () => {
    const errors: string[] = [];

    // Validate host URL
    if (host && !isValidUrl(host)) {
      errors.push('Invalid host URL format');
    }

    // Validate sitemap URL
    if (sitemap && !isValidUrl(sitemap)) {
      errors.push('Invalid sitemap URL format');
    }

    // Validate rules
    rules.forEach((rule, index) => {
      if (!rule.userAgent) {
        errors.push(`Rule #${index + 1}: User-agent cannot be empty`);
      }

      // Validate paths in allow rules
      rule.allow.forEach(path => {
        if (!path.startsWith('/')) {
          errors.push(`Rule #${index + 1}: Allow path "${path}" must start with /`);
        }
      });

      // Validate paths in disallow rules
      rule.disallow.forEach(path => {
        if (!path.startsWith('/')) {
          errors.push(`Rule #${index + 1}: Disallow path "${path}" must start with /`);
        }
      });

      // Validate crawl delay
      if (rule.crawlDelay && !isValidCrawlDelay(rule.crawlDelay)) {
        errors.push(`Rule #${index + 1}: Crawl delay must be a positive number`);
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidCrawlDelay = (delay: string): boolean => {
    const num = parseInt(delay);
    return !isNaN(num) && num > 0;
  };

  // Add preset handling
  const applyPreset = (presetKey: keyof typeof robotsPresets) => {
    const preset = robotsPresets[presetKey];
    setRules([...preset.rules]);
    setSitemap(preset.sitemap);
    setHost(preset.host);
    setActivePreset(presetKey);
    setValidationErrors([]);
  };

  // Enhance generate function with validation
  const generateRobotsTxt = () => {
    if (!validateRules()) {
      return;
    }

    let content = '';
    
    // Add Host directive
    if (host) {
      content += `Host: ${host}\n\n`;
    }
    
    // Add Sitemap
    if (sitemap) {
      content += `Sitemap: ${sitemap}\n\n`;
    }
    
    // Add rules
    rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;
      
      if (rule.crawlDelay) {
        content += `Crawl-delay: ${rule.crawlDelay}\n`;
      }
      
      rule.allow.forEach(path => {
        content += `Allow: ${path}\n`;
      });
      
      rule.disallow.forEach(path => {
        content += `Disallow: ${path}\n`;
      });
      
      content += '\n';
    });
    
    setGeneratedContent(content.trim());
    setShowPreview(true);
  };

  const addRule = () => {
    setRules([...rules, {
      userAgent: '*',
      allow: ['/'],
      disallow: [],
      crawlDelay: ''
    }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: keyof RobotsRule, value: string | string[]) => {
    const newRules = [...rules];
    if (field === 'allow' || field === 'disallow') {
      newRules[index][field] = (value as string).split('\n').filter(line => line.trim());
    } else {
      newRules[index][field as 'userAgent' | 'crawlDelay'] = value as string;
    }
    setRules(newRules);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🤖' : i % 3 === 1 ? '📝' : '⚙️'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Robots.txt <span className="text-blue-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create and customize robots.txt files to control search engine crawling
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Add Presets Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Start with Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(robotsPresets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key as keyof typeof robotsPresets)}
                    className={`p-4 rounded-lg border transition-all ${
                      activePreset === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{preset.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {preset.rules.length} rule{preset.rules.length > 1 ? 's' : ''}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Show Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Configuration Form */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Host URL
                  </label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sitemap URL
                  </label>
                  <input
                    type="text"
                    value={sitemap}
                    onChange={(e) => setSitemap(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-6">
                {rules.map((rule, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Rule #{index + 1}</h3>
                      {rules.length > 1 && (
                        <button
                          onClick={() => removeRule(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove Rule
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          User Agent
                        </label>
                        <input
                          type="text"
                          value={rule.userAgent}
                          onChange={(e) => updateRule(index, 'userAgent', e.target.value)}
                          placeholder="*"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Crawl Delay (optional)
                        </label>
                        <input
                          type="text"
                          value={rule.crawlDelay}
                          onChange={(e) => updateRule(index, 'crawlDelay', e.target.value)}
                          placeholder="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Allow Paths (one per line)
                        </label>
                        <textarea
                          value={rule.allow.join('\n')}
                          onChange={(e) => updateRule(index, 'allow', e.target.value)}
                          placeholder="/\n/public/"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Disallow Paths (one per line)
                        </label>
                        <textarea
                          value={rule.disallow.join('\n')}
                          onChange={(e) => updateRule(index, 'disallow', e.target.value)}
                          placeholder="/private/\n/admin/"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={addRule}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Rule
                </button>
                <button
                  onClick={generateRobotsTxt}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Generate robots.txt
                </button>
              </div>
            </div>

            {/* Add Preview Section */}
            {showPreview && generatedContent && (
              <div className="mt-8 p-4 bg-gray-800 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Preview</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-3 py-1 text-sm text-gray-300 hover:text-white"
                    >
                      Hide Preview
                    </button>
                  </div>
                </div>
                <pre className="text-gray-100 font-mono text-sm overflow-x-auto p-4 bg-gray-900 rounded-lg">
                  {generatedContent}
                </pre>
              </div>
            )}

            {/* Add Testing Tools Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Testing Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://www.google.com/webmasters/tools/robots-testing-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">🔍</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Google's Robots.txt Tester</h4>
                    <p className="text-sm text-gray-600">Test your robots.txt with Google's official tool</p>
                  </div>
                </a>
                <a
                  href="https://www.bing.com/webmaster/help/robots-testing-tool-e54d02e2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">🌐</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Bing's Robots.txt Tester</h4>
                    <p className="text-sm text-gray-600">Verify your robots.txt with Bing's testing tool</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generated robots.txt</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadRobotsTxt}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                  {generatedContent}
                </pre>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About robots.txt</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is robots.txt?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site. This is used mainly to avoid overloading your site with requests.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="font-medium text-gray-800 mb-2">Common Directives</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>User-agent:</strong> Specifies which crawler the rules apply to</li>
                      <li><strong>Allow:</strong> Tells the crawler it can access a page or directory</li>
                      <li><strong>Disallow:</strong> Tells the crawler not to access a page or directory</li>
                      <li><strong>Crawl-delay:</strong> Suggests how many seconds to wait between requests</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Place the robots.txt file in the root directory of your website
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Use specific user-agents when possible instead of wildcard (*)
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Include your sitemap URL for better crawling efficiency
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Don't use robots.txt for security purposes - use proper authentication instead
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