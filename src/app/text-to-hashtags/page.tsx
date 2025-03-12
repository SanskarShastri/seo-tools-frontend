'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Article Rewriter',
    description: 'Rewrite content to make it unique',
    link: '/text-tools/article-rewriter',
    icon: '✏️',
  },
  {
    title: 'Backwards Text Generator',
    description: 'Reverse the order of text characters',
    link: '/text-tools/backwards-text-generator',
    icon: '🔁',
  },
  {
    title: 'URL Rewriting Tool',
    description: 'Create clean and SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
    icon: '🔄',
  },
  {
    title: 'Text Compare',
    description: 'Compare two texts and find differences',
    link: '/text-tools/text-compare',
    icon: '📊',
  },
];

// Most popular hashtags by platform
const platformSuggestions = {
  instagram: ['#love', '#instagood', '#fashion', '#photooftheday', '#beautiful', '#art', '#photography', '#happy', '#picoftheday', '#follow', '#nature', '#travel', '#style', '#instalike', '#reels'],
  twitter: ['#trending', '#twittertrends', '#followfriday', '#ff', '#tbt', '#nowplaying', '#news', '#mondaymotivation', '#tuesdaythoughts', '#wednesdaywisdom'],
  tiktok: ['#fyp', '#foryoupage', '#viral', '#tiktoktrends', '#trending', '#duet', '#challenge', '#tiktokviral', '#tiktokers', '#tiktokdance'],
  linkedin: ['#leadership', '#business', '#motivation', '#success', '#marketing', '#entrepreneur', '#innovation', '#career', '#networking', '#jobs']
};

export default function TextToHashtagsPage() {
  const [inputText, setInputText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionComplete, setConversionComplete] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'twitter' | 'tiktok' | 'linkedin'>('instagram');
  const [includePopular, setIncludePopular] = useState(true);
  const [maxHashtags, setMaxHashtags] = useState(15);

  // Example input
  const exampleText = "Digital marketing strategies for small businesses in 2023. How to increase engagement and reach new audiences through social media, SEO, and content creation.";

  const generateHashtags = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to convert to hashtags');
      return;
    }

    setIsLoading(true);
    setError('');
    setConversionComplete(false);
    setHashtags([]);

    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // NLP-like processing to extract keywords
        const text = inputText.toLowerCase();
        
        // Remove punctuation and split into words
        const words = text.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(word => word.length > 0);
        
        // Filter out common stop words
        const stopWords = ['the', 'and', 'is', 'in', 'it', 'to', 'a', 'of', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'an', 'are'];
        const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
        
        // Count word frequency
        const wordFrequency: Record<string, number> = {};
        filteredWords.forEach(word => {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
        
        // Sort words by frequency
        const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
        
        // Take the top keywords
        const keywords = sortedWords.slice(0, Math.min(sortedWords.length, maxHashtags - (includePopular ? 5 : 0)));
        
        // Format as hashtags
        let result = keywords.map(word => `#${word}`);
        
        // Add popular hashtags for the selected platform if requested
        if (includePopular && platformSuggestions[selectedPlatform]) {
          // Take random popular hashtags to fill up to maxHashtags
          const popularCount = Math.min(maxHashtags - result.length, 5);
          if (popularCount > 0) {
            const popular = [...platformSuggestions[selectedPlatform]];
            // Shuffle array
            for (let i = popular.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [popular[i], popular[j]] = [popular[j], popular[i]];
            }
            result = [...result, ...popular.slice(0, popularCount)];
          }
        }
        
        // Limit to maxHashtags
        result = result.slice(0, maxHashtags);
        
        setHashtags(result);
        setIsLoading(false);
        setConversionComplete(true);
      }, 1200);
    } catch (err) {
      setError('Failed to generate hashtags. Please try again.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-red-600 text-white py-20 mb-12">
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
                  animation: `float-hashtag ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '#️⃣' : i % 3 === 1 ? '📱' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Text to <span className="text-yellow-300">Hashtags</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Convert your text into relevant, engaging hashtags for social media
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#socialmedia</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#marketing</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#digitalmarketing</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#smallbusiness</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#engagement</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#content</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">#seo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Enter Your Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={exampleText}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter a paragraph about your content, blog post, or topic to generate relevant hashtags
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="block text-gray-700 text-sm font-medium mb-4">
                  Platform Selection
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div 
                    className={`p-3 border rounded-xl cursor-pointer text-center transition-all duration-300 ${
                      selectedPlatform === 'instagram' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 hover:border-pink-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedPlatform('instagram')}
                  >
                    <div className="text-xl mb-1">📸</div>
                    <div className="text-sm font-medium">Instagram</div>
                  </div>
                  <div 
                    className={`p-3 border rounded-xl cursor-pointer text-center transition-all duration-300 ${
                      selectedPlatform === 'twitter' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 hover:border-pink-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedPlatform('twitter')}
                  >
                    <div className="text-xl mb-1">🐦</div>
                    <div className="text-sm font-medium">Twitter</div>
                  </div>
                  <div 
                    className={`p-3 border rounded-xl cursor-pointer text-center transition-all duration-300 ${
                      selectedPlatform === 'tiktok' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 hover:border-pink-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedPlatform('tiktok')}
                  >
                    <div className="text-xl mb-1">🎵</div>
                    <div className="text-sm font-medium">TikTok</div>
                  </div>
                  <div 
                    className={`p-3 border rounded-xl cursor-pointer text-center transition-all duration-300 ${
                      selectedPlatform === 'linkedin' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 hover:border-pink-200 text-gray-600'
                    }`}
                    onClick={() => setSelectedPlatform('linkedin')}
                  >
                    <div className="text-xl mb-1">💼</div>
                    <div className="text-sm font-medium">LinkedIn</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="block text-gray-700 text-sm font-medium mb-4">
                  Hashtag Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="include-popular"
                      type="checkbox"
                      checked={includePopular}
                      onChange={() => setIncludePopular(!includePopular)}
                      className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label htmlFor="include-popular" className="ml-2 text-sm text-gray-700">
                      Include popular hashtags for the selected platform
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="max-hashtags" className="block text-sm text-gray-700 mb-1">
                      Maximum number of hashtags: <span className="font-medium">{maxHashtags}</span>
                    </label>
                    <input
                      id="max-hashtags"
                      type="range"
                      min="5"
                      max="30"
                      value={maxHashtags}
                      onChange={(e) => setMaxHashtags(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={generateHashtags}
                disabled={!inputText.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Hashtags...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Generate Hashtags
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {conversionComplete && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Generated Hashtags</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-6">
                <div className="mb-6 flex flex-wrap gap-3">
                  {hashtags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-pink-100 to-red-50 text-pink-800 px-3 py-2 rounded-full text-sm border border-pink-200 transition-transform hover:scale-105 cursor-pointer"
                      onClick={() => copyToClipboard(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => copyToClipboard(hashtags.join(' '))}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy All Hashtags
                    </button>
                    <span className="text-sm text-gray-500">
                      Click on individual hashtags to copy one at a time
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Platform tip:</strong> For {selectedPlatform === 'instagram' ? 'Instagram' : selectedPlatform === 'twitter' ? 'Twitter' : selectedPlatform === 'tiktok' ? 'TikTok' : 'LinkedIn'}, 
                      using {selectedPlatform === 'instagram' ? '10-15' : selectedPlatform === 'twitter' ? '2-3' : selectedPlatform === 'tiktok' ? '4-7' : '3-5'} relevant hashtags 
                      tends to generate the best engagement. {
                        selectedPlatform === 'instagram' 
                          ? 'Consider placing them in the comments instead of the caption for a cleaner look.' 
                          : selectedPlatform === 'twitter'
                          ? 'Keep them brief to save valuable character space.'
                          : selectedPlatform === 'tiktok'
                          ? 'Include trending hashtags for better discoverability.'
                          : 'Focus on industry-specific hashtags for professional visibility.'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Hashtag tips */}
              <div className="mt-8 bg-pink-50 rounded-lg p-6 border border-pink-100">
                <h3 className="font-bold text-gray-800 mb-4">Hashtag Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Mix Popular and Niche</h4>
                      <p className="text-sm text-gray-600">Combine popular hashtags with specific ones to reach both broad and targeted audiences.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Relevance Matters</h4>
                      <p className="text-sm text-gray-600">Only use hashtags that genuinely relate to your content to avoid misleading your audience.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Research Competitors</h4>
                      <p className="text-sm text-gray-600">See what hashtags similar accounts in your niche are using successfully.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Create Branded Hashtags</h4>
                      <p className="text-sm text-gray-600">Develop a unique branded hashtag for your business or campaign to build community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-red-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
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
        @keyframes float-hashtag {
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

        .animate-fade-in-delayed {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
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