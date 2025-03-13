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
    title: 'Robots.txt Generator',
    description: 'Create robots.txt files',
    link: '/management-tools/robots-txt-generator',
    icon: '🤖',
  },
  {
    title: 'Sitemap Generator',
    description: 'Create XML sitemaps for your website',
    link: '/management-tools/sitemap-generator',
    icon: '🗺️',
  },
  {
    title: 'Schema Markup Generator',
    description: 'Create JSON-LD schema markup',
    link: '/management-tools/schema-generator',
    icon: '📝',
  },
];

interface HtaccessRule {
  category: string;
  name: string;
  description: string;
  code: string;
  enabled: boolean;
}

const htaccessRules: HtaccessRule[] = [
  {
    category: 'Security',
    name: 'Disable Directory Browsing',
    description: 'Prevent users from viewing directory contents',
    code: 'Options -Indexes',
    enabled: false,
  },
  {
    category: 'Security',
    name: 'Protect .htaccess File',
    description: 'Prevent access to .htaccess file',
    code: `<Files .htaccess>
  Order allow,deny
  Deny from all
</Files>`,
    enabled: false,
  },
  {
    category: 'Security',
    name: 'Block Suspicious IPs',
    description: 'Block access from suspicious IP addresses',
    code: `Order Allow,Deny
Deny from 123.456.789.0
Allow from all`,
    enabled: false,
  },
  {
    category: 'Performance',
    name: 'Enable Gzip Compression',
    description: 'Compress files to reduce load time',
    code: `<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>`,
    enabled: false,
  },
  {
    category: 'Performance',
    name: 'Browser Caching',
    description: 'Set browser caching rules',
    code: `<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 month"
</IfModule>`,
    enabled: false,
  },
  {
    category: 'URL Rewriting',
    name: 'Remove .html Extension',
    description: 'Hide .html extensions from URLs',
    code: `RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [NC,L]`,
    enabled: false,
  },
  {
    category: 'URL Rewriting',
    name: 'Force HTTPS',
    description: 'Redirect all traffic to HTTPS',
    code: `RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`,
    enabled: false,
  },
  {
    category: 'URL Rewriting',
    name: 'WWW to Non-WWW',
    description: 'Redirect www to non-www version',
    code: `RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]`,
    enabled: false,
  },
  {
    category: 'Error Pages',
    name: 'Custom Error Pages',
    description: 'Set custom error pages',
    code: `ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
ErrorDocument 403 /403.html`,
    enabled: false,
  },
  {
    category: 'Security',
    name: 'Prevent SQL Injection',
    description: 'Block SQL injection attempts',
    code: `RewriteCond %{QUERY_STRING} ([a-z0-9]{2000,}) [NC,OR]
RewriteCond %{QUERY_STRING} (/|%2f)(:|%3a)(/|%2f) [NC,OR]
RewriteCond %{QUERY_STRING} (order(\s|%20)by(\s|%20)1--) [NC,OR]
RewriteCond %{QUERY_STRING} (concat(.*)(%20select|select)) [NC]
RewriteRule ^.* - [F,L]`,
    enabled: false,
  },
];

export default function HtaccessGeneratorPage() {
  const [rules, setRules] = useState<HtaccessRule[]>(htaccessRules);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [customRule, setCustomRule] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const categories = Array.from(new Set(rules.map(rule => rule.category)));

  const toggleRule = (index: number) => {
    const newRules = [...rules];
    newRules[index].enabled = !newRules[index].enabled;
    setRules(newRules);
  };

  const generateHtaccess = () => {
    let content = '# Generated .htaccess file\n';
    content += '# Please review all rules before using them\n\n';

    const enabledRules = rules.filter(rule => rule.enabled);
    
    if (enabledRules.length > 0) {
      enabledRules.forEach(rule => {
        content += `# ${rule.name}\n`;
        content += `# ${rule.description}\n`;
        content += `${rule.code}\n\n`;
      });
    }

    if (customRule) {
      content += '# Custom Rules\n';
      content += customRule + '\n';
    }

    setGeneratedContent(content.trim());
    setShowPreview(true);
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

  const downloadHtaccess = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.htaccess';
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
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '⚙️' : i % 3 === 1 ? '🔒' : '⚡'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              .htaccess <span className="text-orange-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create and customize .htaccess files for Apache web servers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Rules Selection */}
            <div className="space-y-8">
              {categories.map(category => (
                <div key={category} className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{category} Rules</h3>
                  <div className="space-y-4">
                    {rules
                      .filter(rule => rule.category === category)
                      .map((rule, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-300 transition-all"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={rule.enabled}
                                onChange={() => toggleRule(rules.indexOf(rule))}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                              <label className="ml-2 block text-sm font-medium text-gray-900">
                                {rule.name}
                              </label>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{rule.description}</p>
                            {rule.enabled && (
                              <pre className="mt-2 p-3 bg-gray-800 text-gray-100 rounded-md text-sm overflow-x-auto">
                                {rule.code}
                              </pre>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom Rules Section */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Rules</h3>
                <div className="space-y-4">
                  <textarea
                    value={customRule}
                    onChange={(e) => setCustomRule(e.target.value)}
                    rows={6}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Add your custom .htaccess rules here..."
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={generateHtaccess}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Generate .htaccess
                </button>
              </div>
            </div>

            {/* Preview Section */}
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

            {/* Generated Content */}
            {generatedContent && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generated .htaccess</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadHtaccess}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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

            {/* Testing Tools */}
            <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Testing Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://htaccess.madewithlove.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-300 transition-all"
                >
                  <div className="text-2xl mr-4">🧪</div>
                  <div>
                    <h4 className="font-medium text-gray-900">.htaccess Tester</h4>
                    <p className="text-sm text-gray-600">Test your .htaccess rules online</p>
                  </div>
                </a>
                <a
                  href="https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-300 transition-all"
                >
                  <div className="text-2xl mr-4">📚</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Apache Documentation</h4>
                    <p className="text-sm text-gray-600">Official Apache mod_rewrite documentation</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-orange-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About .htaccess</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is .htaccess?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    The .htaccess file is a configuration file for Apache web servers. It allows you to make configuration changes on a per-directory basis, controlling various aspects of your website's behavior.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-orange-100">
                    <h5 className="font-medium text-gray-800 mb-2">Common Uses</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>URL Rewriting and Redirects</li>
                      <li>Custom Error Pages</li>
                      <li>Password Protection</li>
                      <li>SSL and HTTPS Settings</li>
                      <li>Browser Caching</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Always backup your .htaccess file before making changes
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test rules thoroughly before deploying
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Use server configuration when possible
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep rules organized and documented
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
            <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
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