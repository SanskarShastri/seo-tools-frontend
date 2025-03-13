'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Robots.txt Generator',
    description: 'Create robots.txt files',
    link: '/management-tools/robots-txt-generator',
    icon: '🤖',
  },
  {
    title: 'Meta Tag Generator',
    description: 'Generate meta tags for your website',
    link: '/management-tools/meta-tag-generator',
    icon: '🏷️',
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

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface SitemapIndex {
  enabled: boolean;
  sitemaps: string[];
}

// Add common frequencies for easier selection
const changeFrequencies = [
  { value: 'always', label: 'Always' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'never', label: 'Never' }
];

// Add priority options for easier selection
const priorityOptions = [
  { value: '1.0', label: '1.0 (Highest)' },
  { value: '0.9', label: '0.9' },
  { value: '0.8', label: '0.8' },
  { value: '0.7', label: '0.7' },
  { value: '0.6', label: '0.6' },
  { value: '0.5', label: '0.5 (Default)' },
  { value: '0.4', label: '0.4' },
  { value: '0.3', label: '0.3' },
  { value: '0.2', label: '0.2' },
  { value: '0.1', label: '0.1 (Lowest)' }
];

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState<UrlEntry[]>([
    {
      loc: 'https://example.com',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    }
  ]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [bulkImportModal, setBulkImportModal] = useState(false);
  const [bulkUrls, setBulkUrls] = useState('');
  const [sitemapIndex, setSitemapIndex] = useState<SitemapIndex>({
    enabled: false,
    sitemaps: []
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addUrl = () => {
    setUrls([...urls, {
      loc: '',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof UrlEntry, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  // Add validation function
  const validateUrls = () => {
    const errors: string[] = [];

    urls.forEach((url, index) => {
      if (!isValidUrl(url.loc)) {
        errors.push(`URL #${index + 1}: Invalid URL format`);
      }

      if (url.priority && !isValidPriority(url.priority)) {
        errors.push(`URL #${index + 1}: Priority must be between 0.0 and 1.0`);
      }

      if (url.lastmod && !isValidDate(url.lastmod)) {
        errors.push(`URL #${index + 1}: Invalid date format`);
      }
    });

    if (sitemapIndex.enabled) {
      sitemapIndex.sitemaps.forEach((sitemap, index) => {
        if (!isValidUrl(sitemap)) {
          errors.push(`Sitemap #${index + 1}: Invalid sitemap URL`);
        }
      });
    }

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

  const isValidPriority = (priority: string): boolean => {
    const num = parseFloat(priority);
    return !isNaN(num) && num >= 0 && num <= 1;
  };

  const isValidDate = (date: string): boolean => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  };

  // Add bulk import functionality
  const handleBulkImport = () => {
    const importedUrls = bulkUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url)
      .map(url => ({
        loc: url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      }));

    setUrls(prev => [...prev, ...importedUrls]);
    setBulkImportModal(false);
    setBulkUrls('');
  };

  // Enhance generate function
  const generateSitemap = () => {
    if (!validateUrls()) {
      return;
    }

    let content = '<?xml version="1.0" encoding="UTF-8"?>\n';

    if (sitemapIndex.enabled) {
      content += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      sitemapIndex.sitemaps.forEach(sitemap => {
        content += '  <sitemap>\n';
        content += `    <loc>${sitemap}</loc>\n`;
        content += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        content += '  </sitemap>\n';
      });
      content += '</sitemapindex>';
    } else {
      content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      urls.forEach(url => {
        content += '  <url>\n';
        content += `    <loc>${url.loc}</loc>\n`;
        if (url.lastmod) {
          content += `    <lastmod>${url.lastmod}</lastmod>\n`;
        }
        if (url.changefreq) {
          content += `    <changefreq>${url.changefreq}</changefreq>\n`;
        }
        if (url.priority) {
          content += `    <priority>${url.priority}</priority>\n`;
        }
        content += '  </url>\n';
      });
      content += '</urlset>';
    }

    setGeneratedContent(content);
    setShowPreview(true);
    setError('');
  };

  // Add bulk actions
  const bulkUpdateFrequency = (frequency: string) => {
    setUrls(urls.map(url => ({
      ...url,
      changefreq: frequency
    })));
  };

  const bulkUpdatePriority = (priority: string) => {
    setUrls(urls.map(url => ({
      ...url,
      priority
    })));
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

  const downloadSitemap = () => {
    const blob = new Blob([generatedContent], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
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
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🗺️' : i % 3 === 1 ? '📍' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Sitemap <span className="text-green-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create XML sitemaps to help search engines better index your website
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Add Sitemap Type Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sitemap Type</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSitemapIndex({ ...sitemapIndex, enabled: false })}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    !sitemapIndex.enabled
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  Regular Sitemap
                </button>
                <button
                  onClick={() => setSitemapIndex({ ...sitemapIndex, enabled: true })}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    sitemapIndex.enabled
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  Sitemap Index
                </button>
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

            {sitemapIndex.enabled ? (
              /* Sitemap Index Form */
              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sitemap URLs</h3>
                  {sitemapIndex.sitemaps.map((sitemap, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="url"
                        value={sitemap}
                        onChange={(e) => {
                          const newSitemaps = [...sitemapIndex.sitemaps];
                          newSitemaps[index] = e.target.value;
                          setSitemapIndex({ ...sitemapIndex, sitemaps: newSitemaps });
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="https://example.com/sitemap1.xml"
                      />
                      <button
                        onClick={() => {
                          const newSitemaps = sitemapIndex.sitemaps.filter((_, i) => i !== index);
                          setSitemapIndex({ ...sitemapIndex, sitemaps: newSitemaps });
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setSitemapIndex({
                      ...sitemapIndex,
                      sitemaps: [...sitemapIndex.sitemaps, '']
                    })}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Sitemap
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Sitemap Form */
              <div className="space-y-6">
                {/* Bulk Actions */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Update All Frequencies
                      </label>
                      <select
                        onChange={(e) => bulkUpdateFrequency(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      >
                        <option value="">Select frequency...</option>
                        {changeFrequencies.map(freq => (
                          <option key={freq.value} value={freq.value}>
                            {freq.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Update All Priorities
                      </label>
                      <select
                        onChange={(e) => bulkUpdatePriority(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      >
                        <option value="">Select priority...</option>
                        {priorityOptions.map(priority => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bulk Import URLs
                      </label>
                      <button
                        onClick={() => setBulkImportModal(true)}
                        className="mt-1 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Import URLs
                      </button>
                    </div>
                  </div>
                </div>

                {/* URL Entries */}
                <div className="mb-8">
                  <div className="space-y-6">
                    {urls.map((url, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900">URL #{index + 1}</h3>
                          {urls.length > 1 && (
                            <button
                              onClick={() => removeUrl(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove URL
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              URL Location
                            </label>
                            <input
                              type="text"
                              value={url.loc}
                              onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                              placeholder="https://example.com/page"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Modified
                            </label>
                            <input
                              type="date"
                              value={url.lastmod}
                              onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Change Frequency
                            </label>
                            <select
                              value={url.changefreq}
                              onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="always">Always</option>
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                              <option value="never">Never</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Priority
                            </label>
                            <select
                              value={url.priority}
                              onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="1.0">1.0 (Highest)</option>
                              <option value="0.9">0.9</option>
                              <option value="0.8">0.8</option>
                              <option value="0.7">0.7</option>
                              <option value="0.6">0.6</option>
                              <option value="0.5">0.5 (Default)</option>
                              <option value="0.4">0.4</option>
                              <option value="0.3">0.3</option>
                              <option value="0.2">0.2</option>
                              <option value="0.1">0.1 (Lowest)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={addUrl}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add URL
                    </button>
                    <button
                      onClick={generateSitemap}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Generate Sitemap
                    </button>
                  </div>
                </div>

                {/* Bulk Import Modal */}
                {bulkImportModal && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Import URLs</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Enter one URL per line. Each URL will be added with default settings.
                      </p>
                      <textarea
                        value={bulkUrls}
                        onChange={(e) => setBulkUrls(e.target.value)}
                        rows={10}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="https://example.com&#10;https://example.com/page1&#10;https://example.com/page2"
                      />
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => setBulkImportModal(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleBulkImport}
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                          Import
                        </button>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* Add Testing Tools Section */}
                <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Testing Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white rounded-lg border border-green-200 hover:border-green-300 transition-all"
                    >
                      <div className="text-2xl mr-4">🔍</div>
                      <div>
                        <h4 className="font-medium text-gray-900">Google Search Console</h4>
                        <p className="text-sm text-gray-600">Submit and test your sitemap with Google</p>
                      </div>
                    </a>
                    <a
                      href="https://www.bing.com/webmaster"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white rounded-lg border border-green-200 hover:border-green-300 transition-all"
                    >
                      <div className="text-2xl mr-4">🌐</div>
                      <div>
                        <h4 className="font-medium text-gray-900">Bing Webmaster Tools</h4>
                        <p className="text-sm text-gray-600">Submit your sitemap to Bing</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Content */}
            {generatedContent && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generated Sitemap</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadSitemap}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About XML Sitemaps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is a Sitemap?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    An XML sitemap is a file that lists all the important pages on your website, helping search engines discover and crawl your content more efficiently.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <h5 className="font-medium text-gray-800 mb-2">Key Elements</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>loc:</strong> The URL of the page</li>
                      <li><strong>lastmod:</strong> When the page was last modified</li>
                      <li><strong>changefreq:</strong> How often the page changes</li>
                      <li><strong>priority:</strong> Relative importance of the page (0.0 to 1.0)</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep your sitemap under 50MB and 50,000 URLs
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Include only canonical URLs
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Update your sitemap when content changes
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Submit your sitemap to search engines
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
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
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