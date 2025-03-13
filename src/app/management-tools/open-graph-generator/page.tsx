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
    title: 'Schema Markup Generator',
    description: 'Create JSON-LD schema markup',
    link: '/management-tools/schema-generator',
    icon: '📝',
  },
  {
    title: 'Robots.txt Generator',
    description: 'Create robots.txt files',
    link: '/management-tools/robots-txt-generator',
    icon: '🤖',
  },
  {
    title: '.htaccess Generator',
    description: 'Generate .htaccess files',
    link: '/management-tools/htaccess-generator',
    icon: '⚙️',
  },
];

interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  image: string;
  type: string;
  siteName: string;
  locale: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  facebookAppId: string;
}

interface PreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
}

const defaultData: OpenGraphData = {
  title: '',
  description: '',
  url: '',
  image: '',
  type: 'website',
  siteName: '',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '',
  twitterCreator: '',
  facebookAppId: '',
};

// Add more type options with descriptions
const typeOptions = [
  { value: 'website', label: 'Website', description: 'A website or web page' },
  { value: 'article', label: 'Article', description: 'An article, blog post, or news story' },
  { value: 'profile', label: 'Profile', description: 'A personal or business profile' },
  { value: 'book', label: 'Book', description: 'A book or publication' },
  { value: 'music.song', label: 'Music Song', description: 'A music track or song' },
  { value: 'music.album', label: 'Music Album', description: 'A music album' },
  { value: 'music.playlist', label: 'Music Playlist', description: 'A music playlist' },
  { value: 'video.movie', label: 'Video Movie', description: 'A movie or film' },
  { value: 'video.episode', label: 'Video Episode', description: 'A TV show episode' },
  { value: 'product', label: 'Product', description: 'A product or service' },
];

// Add more locale options with labels
const localeOptions = [
  { value: 'en_US', label: 'English (US)' },
  { value: 'en_GB', label: 'English (UK)' },
  { value: 'es_ES', label: 'Spanish (Spain)' },
  { value: 'fr_FR', label: 'French (France)' },
  { value: 'de_DE', label: 'German (Germany)' },
  { value: 'it_IT', label: 'Italian (Italy)' },
  { value: 'pt_BR', label: 'Portuguese (Brazil)' },
  { value: 'ja_JP', label: 'Japanese (Japan)' },
  { value: 'ko_KR', label: 'Korean (Korea)' },
  { value: 'zh_CN', label: 'Chinese (China)' },
];

// Add more Twitter card options with descriptions
const twitterCardOptions = [
  { value: 'summary', label: 'Summary', description: 'A basic card with a small square image' },
  { value: 'summary_large_image', label: 'Summary Large Image', description: 'A card with a large image' },
  { value: 'app', label: 'App', description: 'A card for mobile applications' },
  { value: 'player', label: 'Player', description: 'A card for video/audio players' },
];

export default function OpenGraphGeneratorPage() {
  const [formData, setFormData] = useState<OpenGraphData>(defaultData);
  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSocialPreview, setShowSocialPreview] = useState(true);

  // Add validation function
  const validateForm = () => {
    const errors: string[] = [];

    // Required fields
    if (!formData.title) errors.push('Title is required');
    if (!formData.description) errors.push('Description is required');

    // URL validation
    if (formData.url && !isValidUrl(formData.url)) {
      errors.push('Invalid URL format');
    }

    // Image URL validation
    if (formData.image && !isValidUrl(formData.image)) {
      errors.push('Invalid image URL format');
    }

    // Twitter handle validation
    if (formData.twitterSite && !isValidTwitterHandle(formData.twitterSite)) {
      errors.push('Invalid Twitter @username format');
    }
    if (formData.twitterCreator && !isValidTwitterHandle(formData.twitterCreator)) {
      errors.push('Invalid Twitter creator @username format');
    }

    // Facebook App ID validation
    if (formData.facebookAppId && !isValidFacebookAppId(formData.facebookAppId)) {
      errors.push('Invalid Facebook App ID format');
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

  const isValidTwitterHandle = (handle: string): boolean => {
    return /^@?[a-zA-Z0-9_]{1,15}$/.test(handle);
  };

  const isValidFacebookAppId = (appId: string): boolean => {
    return /^\d{15,16}$/.test(appId);
  };

  const handleInputChange = (field: keyof OpenGraphData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'image' && value) {
      setPreviewImage(value);
    }
  };

  // Enhance generate function
  const generateTags = () => {
    if (!validateForm()) {
      return;
    }

    let tags = '';

    // Basic Meta Tags
    tags += '<!-- Basic Meta Tags -->\n';
    tags += `<meta name="title" content="${formData.title}">\n`;
    tags += `<meta name="description" content="${formData.description}">\n\n`;

    // Open Graph Tags
    tags += '<!-- Open Graph Meta Tags -->\n';
    tags += `<meta property="og:title" content="${formData.title}">\n`;
    tags += `<meta property="og:description" content="${formData.description}">\n`;
    if (formData.url) tags += `<meta property="og:url" content="${formData.url}">\n`;
    if (formData.image) tags += `<meta property="og:image" content="${formData.image}">\n`;
    tags += `<meta property="og:type" content="${formData.type}">\n`;
    if (formData.siteName) tags += `<meta property="og:site_name" content="${formData.siteName}">\n`;
    tags += `<meta property="og:locale" content="${formData.locale}">\n\n`;

    // Twitter Card Tags
    tags += '<!-- Twitter Card Meta Tags -->\n';
    tags += `<meta name="twitter:card" content="${formData.twitterCard}">\n`;
    if (formData.twitterSite) {
      const handle = formData.twitterSite.startsWith('@') ? formData.twitterSite : `@${formData.twitterSite}`;
      tags += `<meta name="twitter:site" content="${handle}">\n`;
    }
    if (formData.twitterCreator) {
      const handle = formData.twitterCreator.startsWith('@') ? formData.twitterCreator : `@${formData.twitterCreator}`;
      tags += `<meta name="twitter:creator" content="${handle}">\n`;
    }
    tags += `<meta name="twitter:title" content="${formData.title}">\n`;
    tags += `<meta name="twitter:description" content="${formData.description}">\n`;
    if (formData.image) tags += `<meta name="twitter:image" content="${formData.image}">\n\n`;

    // Facebook App ID
    if (formData.facebookAppId) {
      tags += '<!-- Facebook App ID -->\n';
      tags += `<meta property="fb:app_id" content="${formData.facebookAppId}">\n`;
    }

    setGeneratedTags(tags.trim());
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const downloadTags = () => {
    const blob = new Blob([generatedTags], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'open-graph-tags.html';
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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔗' : i % 3 === 1 ? '📱' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Open Graph <span className="text-blue-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create Open Graph meta tags for better social media sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
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

            {/* Social Preview */}
            {showSocialPreview && formData.title && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Social Preview</h3>
                  <button
                    onClick={() => setShowSocialPreview(false)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Hide Preview
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Facebook Preview */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-lg">
                    <div className="bg-gray-100 p-2 text-sm text-gray-600">Facebook Preview</div>
                    {previewImage && (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="object-cover w-full h-full"
                          onError={() => setPreviewImage('')}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-1">{formData.siteName || 'example.com'}</div>
                      <h4 className="text-[16px] font-medium text-[#1c1e21] leading-5 mb-2 line-clamp-2">
                        {formData.title || 'Your Title Here'}
                      </h4>
                      <p className="text-[14px] text-[#606770] line-clamp-2">
                        {formData.description || 'Your description will appear here'}
                      </p>
                    </div>
                  </div>

                  {/* Twitter Preview */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-lg">
                    <div className="bg-gray-100 p-2 text-sm text-gray-600">Twitter Preview</div>
                    {previewImage && formData.twitterCard === 'summary_large_image' && (
                      <div className="aspect-w-2 aspect-h-1 bg-gray-200">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="object-cover w-full h-full"
                          onError={() => setPreviewImage('')}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="text-[15px] font-bold text-[#14171a] leading-5 mb-1">
                        {formData.title || 'Your Title Here'}
                      </h4>
                      <p className="text-[14px] text-[#657786] mb-2 line-clamp-2">
                        {formData.description || 'Your description will appear here'}
                      </p>
                      <div className="text-[14px] text-[#657786] flex items-center">
                        {previewImage && formData.twitterCard === 'summary' && (
                          <div className="w-16 h-16 bg-gray-200 rounded mr-3">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="object-cover w-full h-full rounded"
                              onError={() => setPreviewImage('')}
                            />
                          </div>
                        )}
                        <span>{formData.url || 'example.com'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Sections */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Your page title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="A brief description of your content"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="https://example.com/page"
                    />
                  </div>
                </div>
              </div>

              {/* Image and Type */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Image and Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                    {previewImage && (
                      <div className="mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-w-full h-auto rounded-lg shadow-sm"
                          onError={() => setPreviewImage('')}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {typeOptions.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Settings */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={formData.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Your Website Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Locale
                    </label>
                    <select
                      value={formData.locale}
                      onChange={(e) => handleInputChange('locale', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {localeOptions.map((locale) => (
                        <option key={locale.value} value={locale.value}>
                          {locale.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Twitter Card Settings */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Twitter Card Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Type
                    </label>
                    <select
                      value={formData.twitterCard}
                      onChange={(e) => handleInputChange('twitterCard', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {twitterCardOptions.map((card) => (
                        <option key={card.value} value={card.value}>
                          {card.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Twitter @username
                    </label>
                    <input
                      type="text"
                      value={formData.twitterSite}
                      onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content Creator @username
                    </label>
                    <input
                      type="text"
                      value={formData.twitterCreator}
                      onChange={(e) => handleInputChange('twitterCreator', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Facebook Settings */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Facebook Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook App ID
                  </label>
                  <input
                    type="text"
                    value={formData.facebookAppId}
                    onChange={(e) => handleInputChange('facebookAppId', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Facebook App ID"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={generateTags}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Tags
                </button>
              </div>
            </div>

            {/* Preview Section */}
            {showPreview && generatedTags && (
              <div className="mt-8 p-4 bg-gray-800 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Generated Tags</h3>
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
                  {generatedTags}
                </pre>
              </div>
            )}

            {/* Testing Tools */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Testing Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">📱</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Facebook Sharing Debugger</h4>
                    <p className="text-sm text-gray-600">Test how your content appears on Facebook</p>
                  </div>
                </a>
                <a
                  href="https://cards-dev.twitter.com/validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">🐦</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Twitter Card Validator</h4>
                    <p className="text-sm text-gray-600">Test how your content appears on Twitter</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/post-inspector/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">💼</div>
                  <div>
                    <h4 className="font-medium text-gray-900">LinkedIn Post Inspector</h4>
                    <p className="text-sm text-gray-600">Test how your content appears on LinkedIn</p>
                  </div>
                </a>
                <a
                  href="https://metatags.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
                >
                  <div className="text-2xl mr-4">🔍</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Meta Tags Tester</h4>
                    <p className="text-sm text-gray-600">Test all your meta tags in one place</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Open Graph Protocol</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is Open Graph?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    The Open Graph protocol enables any web page to become a rich object in a social graph. It is used by Facebook, Twitter, LinkedIn, and other social platforms to create rich previews when content is shared.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="font-medium text-gray-800 mb-2">Benefits</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>Better Social Media Sharing</li>
                      <li>Increased Click-Through Rates</li>
                      <li>Improved Brand Visibility</li>
                      <li>Enhanced User Experience</li>
                      <li>Better Content Control</li>
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
                      Use high-quality images (1200x630px recommended)
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Write compelling titles and descriptions
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test your tags using social media debuggers
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep your meta tags up to date
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto rounded-full"></div>
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