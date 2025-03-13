'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Open Graph Checker',
    description: 'Preview and validate Open Graph tags',
    link: '/management-tools/open-graph-checker',
    icon: '🔗',
  },
  {
    title: 'Meta Tag Analyzer',
    description: 'Analyze meta tags of any webpage',
    link: '/management-tools/metatag-analyzer',
    icon: '🏷️',
  },
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'Browser Checker',
    description: 'Check your browser information',
    link: '/management-tools/browser-checker',
    icon: '🌐',
  },
];

interface TwitterCardData {
  cardType: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  site: string;
  creator: string;
  player?: string;
  playerWidth?: string;
  playerHeight?: string;
  iPhoneId?: string;
  iPadId?: string;
  googlePlayId?: string;
  appCountry?: string;
}

const cardTypes = [
  { value: 'summary', label: 'Summary Card', description: 'Default card with a square image' },
  { value: 'summary_large_image', label: 'Summary Card with Large Image', description: 'Similar to summary but with a larger image' },
  { value: 'player', label: 'Player Card', description: 'Card for video/audio players' },
  { value: 'app', label: 'App Card', description: 'Card for mobile apps' },
];

export default function TwitterCardGeneratorPage() {
  const [formData, setFormData] = useState<TwitterCardData>({
    cardType: 'summary',
    title: '',
    description: '',
    image: '',
    imageAlt: '',
    site: '',
    creator: '',
  });
  const [generatedTags, setGeneratedTags] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.title) errors.push('Title is required');
    if (!formData.description) errors.push('Description is required');
    if (!formData.image) errors.push('Image URL is required');
    if (!formData.site) errors.push('Twitter site username is required');

    if (formData.cardType === 'player') {
      if (!formData.player) errors.push('Player URL is required for Player Card');
      if (!formData.playerWidth) errors.push('Player width is required for Player Card');
      if (!formData.playerHeight) errors.push('Player height is required for Player Card');
    }

    if (formData.cardType === 'app') {
      if (!formData.iPhoneId && !formData.iPadId && !formData.googlePlayId) {
        errors.push('At least one app ID is required for App Card');
      }
      if (!formData.appCountry) errors.push('App country code is required for App Card');
    }

    // Validate URLs
    if (formData.image && !isValidUrl(formData.image)) errors.push('Invalid image URL');
    if (formData.player && !isValidUrl(formData.player)) errors.push('Invalid player URL');

    // Validate Twitter usernames
    if (formData.site && !isValidTwitterUsername(formData.site)) {
      errors.push('Invalid Twitter site username (include @ prefix)');
    }
    if (formData.creator && !isValidTwitterUsername(formData.creator)) {
      errors.push('Invalid Twitter creator username (include @ prefix)');
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

  const isValidTwitterUsername = (username: string): boolean => {
    return /^@[A-Za-z0-9_]{1,15}$/.test(username);
  };

  const generateTags = () => {
    if (!validateForm()) {
      setShowPreview(false);
      return;
    }

    let tags = `<!-- Twitter Card Tags -->\n`;
    tags += `<meta name="twitter:card" content="${formData.cardType}" />\n`;
    tags += `<meta name="twitter:title" content="${formData.title}" />\n`;
    tags += `<meta name="twitter:description" content="${formData.description}" />\n`;
    tags += `<meta name="twitter:image" content="${formData.image}" />\n`;
    
    if (formData.imageAlt) {
      tags += `<meta name="twitter:image:alt" content="${formData.imageAlt}" />\n`;
    }
    
    tags += `<meta name="twitter:site" content="${formData.site}" />\n`;
    
    if (formData.creator) {
      tags += `<meta name="twitter:creator" content="${formData.creator}" />\n`;
    }

    if (formData.cardType === 'player') {
      tags += `<meta name="twitter:player" content="${formData.player}" />\n`;
      tags += `<meta name="twitter:player:width" content="${formData.playerWidth}" />\n`;
      tags += `<meta name="twitter:player:height" content="${formData.playerHeight}" />\n`;
    }

    if (formData.cardType === 'app') {
      if (formData.iPhoneId) {
        tags += `<meta name="twitter:app:id:iphone" content="${formData.iPhoneId}" />\n`;
      }
      if (formData.iPadId) {
        tags += `<meta name="twitter:app:id:ipad" content="${formData.iPadId}" />\n`;
      }
      if (formData.googlePlayId) {
        tags += `<meta name="twitter:app:id:googleplay" content="${formData.googlePlayId}" />\n`;
      }
      if (formData.appCountry) {
        tags += `<meta name="twitter:app:country" content="${formData.appCountry}" />\n`;
      }
    }

    setGeneratedTags(tags);
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                {i % 3 === 0 ? '🐦' : i % 3 === 1 ? '🔗' : '📱'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Twitter Card <span className="text-blue-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create optimized Twitter card meta tags for better social sharing
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Form */}
            <div className="space-y-6">
              {/* Card Type Selection */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cardTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.cardType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleInputChange({ target: { name: 'cardType', value: type.value } } as any)}
                    >
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter title (max 70 characters)"
                      maxLength={70}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description (max 200 characters)"
                      maxLength={200}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      name="imageAlt"
                      value={formData.imageAlt}
                      onChange={handleInputChange}
                      placeholder="Enter image alt text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Twitter Accounts */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Twitter Accounts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Site (@username)
                    </label>
                    <input
                      type="text"
                      name="site"
                      value={formData.site}
                      onChange={handleInputChange}
                      placeholder="@yourbrand"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Creator (@username)
                    </label>
                    <input
                      type="text"
                      name="creator"
                      value={formData.creator}
                      onChange={handleInputChange}
                      placeholder="@author"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Player Card Fields */}
              {formData.cardType === 'player' && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Player Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Player URL
                      </label>
                      <input
                        type="url"
                        name="player"
                        value={formData.player}
                        onChange={handleInputChange}
                        placeholder="Enter player URL (HTTPS required)"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Player Width
                        </label>
                        <input
                          type="text"
                          name="playerWidth"
                          value={formData.playerWidth}
                          onChange={handleInputChange}
                          placeholder="Width in pixels"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Player Height
                        </label>
                        <input
                          type="text"
                          name="playerHeight"
                          value={formData.playerHeight}
                          onChange={handleInputChange}
                          placeholder="Height in pixels"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* App Card Fields */}
              {formData.cardType === 'app' && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">App Card Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          iPhone App ID
                        </label>
                        <input
                          type="text"
                          name="iPhoneId"
                          value={formData.iPhoneId}
                          onChange={handleInputChange}
                          placeholder="iPhone App ID"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          iPad App ID
                        </label>
                        <input
                          type="text"
                          name="iPadId"
                          value={formData.iPadId}
                          onChange={handleInputChange}
                          placeholder="iPad App ID"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Google Play App ID
                        </label>
                        <input
                          type="text"
                          name="googlePlayId"
                          value={formData.googlePlayId}
                          onChange={handleInputChange}
                          placeholder="Google Play App ID"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        App Country
                      </label>
                      <input
                        type="text"
                        name="appCountry"
                        value={formData.appCountry}
                        onChange={handleInputChange}
                        placeholder="Country code (e.g., US)"
                        maxLength={2}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
                  <ul className="list-disc list-inside text-red-600 space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Generate Button */}
              <div className="flex justify-center">
                <button
                  onClick={generateTags}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Generate Twitter Card Tags
                </button>
              </div>

              {/* Generated Tags */}
              {generatedTags && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Tags</h3>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy Tags'}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-blue-300 text-sm">
                      {generatedTags}
                    </pre>
                  </div>
                </div>
              )}

              {/* Preview */}
              {showPreview && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-md mx-auto">
                    {formData.image && (
                      <div className={`aspect-w-${formData.cardType === 'summary_large_image' ? '2' : '1'} aspect-h-1 bg-gray-100`}>
                        <img
                          src={formData.image}
                          alt={formData.imageAlt || formData.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x300?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="font-bold text-gray-900 mb-1">{formData.title}</div>
                      <p className="text-gray-600 text-sm mb-2">{formData.description}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{formData.site}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Twitter Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What are Twitter Cards?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Twitter Cards are a way to attach rich media experiences to tweets that link to your content. They help drive traffic to your website by making your tweets more engaging and visually appealing.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="font-medium text-gray-800 mb-2">Card Types</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li><strong>Summary Card:</strong> Default card with square image</li>
                      <li><strong>Summary Large Image:</strong> Features larger image</li>
                      <li><strong>Player Card:</strong> Embeds video/audio players</li>
                      <li><strong>App Card:</strong> Features mobile applications</li>
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
                      Use high-quality images that meet size requirements
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
                      Include Twitter usernames for attribution
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test cards using Twitter Card Validator
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