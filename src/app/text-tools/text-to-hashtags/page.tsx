'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools with updated paths
const relatedTools = [
  {
    title: 'Article Rewriter',
    description: 'Rewrite content to make it unique',
    link: '/text-tools/article-rewriter',
    icon: '✏️',
  },
  {
    title: 'Backwards Text Generator',
    description: 'Convert text to read backwards',
    link: '/text-tools/backwards-text-generator',
    icon: '🔄',
  },
  {
    title: 'URL Rewriting Tool',
    description: 'Create SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
    icon: '🔗',
  },
  {
    title: 'Text Compare',
    description: 'Compare text and find differences',
    link: '/text-tools/text-compare',
    icon: '🔍',
  },
];

// Common stop words to filter out
const stopWords = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in',
  'of', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may',
  'might', 'must', 'this', 'that', 'these', 'those', 'with', 'from', 'about', 'as',
  'into', 'like', 'through', 'after', 'before', 'between', 'beyond', 'during',
  'except', 'since', 'under', 'until', 'upon', 'while', 'not', 'very', 'just', 'so',
  'too', 'also', 'only', 'then', 'than', 'when', 'where', 'why', 'how', 'what', 'who',
  'which', 'whose', 'if', 'because', 'although', 'unless', 'however', 'nevertheless',
  'moreover', 'furthermore', 'therefore', 'consequently', 'instead', 'meanwhile',
  'nonetheless', 'hence', 'thus', 'accordingly', 'otherwise', 'rather', 'yet'
]);

// Popular hashtags by platform
const popularHashtags = {
  instagram: [
    'instagood', 'photooftheday', 'fashion', 'beautiful', 'happy', 'cute', 'tbt',
    'like4like', 'followme', 'picoftheday', 'follow', 'me', 'selfie', 'summer',
    'art', 'instadaily', 'friends', 'repost', 'nature', 'girl', 'fun', 'style',
    'smile', 'food', 'travel'
  ],
  twitter: [
    'tweetoftheday', 'trending', 'viral', 'news', 'breaking', 'socialmedia',
    'digital', 'nowplaying', 'technology', 'business', 'startup', 'marketing',
    'innovation', 'leadership', 'entrepreneur', 'community', 'education', 'health',
    'politics', 'science', 'climate', 'sustainability', 'tech', 'ai', 'machinelearning'
  ],
  tiktok: [
    'fyp', 'foryoupage', 'foryou', 'viral', 'trending', 'tiktoktrend', 'comedy',
    'dance', 'funny', 'challenge', 'duet', 'pov', 'tiktokmemes', 'tiktokviral',
    'transitions', 'tutorial', 'storytime', 'lifehack', 'relatable', 'greenscreen',
    'voiceover', 'trending', 'viral', 'sounds', 'music'
  ],
  linkedin: [
    'leadership', 'innovation', 'business', 'entrepreneurship', 'technology',
    'management', 'hr', 'marketing', 'sales', 'careers', 'jobsearch', 'networking',
    'productivity', 'success', 'motivation', 'professionaldevelopment', 'learning',
    'growthmindset', 'careeradvice', 'future', 'digitaltransformation', 'strategy',
    'worklife', 'remotework', 'careergoals'
  ]
};

export default function TextToHashtagsPage() {
  const [inputText, setInputText] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Platform selection for hashtag customization
  const [platform, setPlatform] = useState<'instagram' | 'twitter' | 'tiktok' | 'linkedin'>('instagram');
  const [includePopular, setIncludePopular] = useState(true);
  const [maxHashtags, setMaxHashtags] = useState(20);

  const generateHashtags = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setError('');
    setGeneratedHashtags('');
    setIsComplete(false);
    
    // Basic validation
    if (!inputText.trim()) {
      setError('Please enter some text to generate hashtags');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Process the text to generate hashtags
        const text = inputText.toLowerCase();
        
        // Remove punctuation and split into words
        const words = text
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 2 && !stopWords.has(word));
        
        // Count word frequency
        const wordCount: Record<string, number> = {};
        words.forEach(word => {
          wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Sort words by frequency and take top keywords
        const keywords = Object.entries(wordCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(entry => entry[0]);
        
        // Format as hashtags
        let hashtags = keywords.map(word => `#${word}`);
        
        // Add popular hashtags for the selected platform if option is enabled
        if (includePopular && popularHashtags[platform]) {
          // Select random popular hashtags based on the platform
          const platformHashtags = popularHashtags[platform];
          const shuffled = [...platformHashtags].sort(() => 0.5 - Math.random());
          const selectedPopular = shuffled.slice(0, Math.min(10, maxHashtags - hashtags.length));
          
          hashtags = [...hashtags, ...selectedPopular.map(tag => `#${tag}`)];
        }
        
        // Limit to maximum number of hashtags
        hashtags = hashtags.slice(0, maxHashtags);
        
        // Set the generated hashtags
        setGeneratedHashtags(hashtags.join(' '));
        setIsComplete(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to generate hashtags. Please try again.');
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (generatedHashtags) {
      navigator.clipboard.writeText(generatedHashtags)
        .then(() => {
          const copyBtn = document.getElementById('copy-btn');
          if (copyBtn) {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = 'Copy Hashtags';
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-orange-500 text-white py-20 mb-12">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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
                {i % 4 === 0 ? '#' : i % 4 === 1 ? '#️⃣' : i % 4 === 2 ? '@' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Text to <span className="text-yellow-200">#Hashtags</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Convert any text into relevant hashtags for your social media posts
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-center space-y-4">
              <p className="text-white/70 font-medium">Your content converted to hashtags</p>
              <div className="bg-white/10 p-4 rounded-lg text-left">
                <p className="font-mono text-sm text-white/80">
                  #socialmedia #content #marketing #engagement #viral #trending
                </p>
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="inline-block py-1 px-3 bg-white/20 rounded-full text-sm">Instagram</span>
                <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-sm">Twitter</span>
                <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-sm">TikTok</span>
                <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-sm">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={generateHashtags} className="mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter Your Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your article, blog post, or any text to generate relevant hashtags..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300"
                />
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Platform
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPlatform('instagram')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        platform === 'instagram'
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">📸</span> Instagram
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlatform('twitter')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        platform === 'twitter'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">🐦</span> Twitter
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlatform('tiktok')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        platform === 'tiktok'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">🎵</span> TikTok
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlatform('linkedin')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        platform === 'linkedin'
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">💼</span> LinkedIn
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Options
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="include-popular"
                        checked={includePopular}
                        onChange={() => setIncludePopular(!includePopular)}
                        className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                      />
                      <label htmlFor="include-popular" className="ml-2 text-sm text-gray-700">
                        Include popular {platform} hashtags
                      </label>
                    </div>
                    
                    <div>
                      <label htmlFor="max-hashtags" className="block text-sm text-gray-700 mb-1">
                        Maximum number of hashtags: {maxHashtags}
                      </label>
                      <input
                        type="range"
                        id="max-hashtags"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Hashtags...
                  </>
                ) : (
                  'Generate Hashtags'
                )}
              </button>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {isComplete && generatedHashtags && (
              <div className="mb-8 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Hashtags</h3>
                <div className="bg-white rounded-lg p-4 border border-pink-200 font-mono mb-4 break-words">
                  {generatedHashtags}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    id="copy-btn"
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Copy Hashtags
                  </button>
                </div>
              </div>
            )}

            {/* Hashtag Tips Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hashtag Tips for {platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
              
              {platform === 'instagram' && (
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    Instagram allows up to 30 hashtags per post. Research shows that using 9-11 hashtags typically gets the best engagement.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Mix popular and niche hashtags for better reach</li>
                    <li>Create a branded hashtag for your business</li>
                    <li>Research competitors' hashtags for inspiration</li>
                    <li>Consider hiding hashtags in a comment or after line breaks</li>
                    <li>Use location-based hashtags to reach local audiences</li>
                  </ul>
                </div>
              )}
              
              {platform === 'twitter' && (
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    Twitter posts perform best with 1-2 relevant hashtags. Using too many can reduce engagement.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Follow trending hashtags to join relevant conversations</li>
                    <li>Create campaign-specific hashtags for tracking</li>
                    <li>Use hashtags at the end of tweets rather than embedded in text</li>
                    <li>Capitalize multi-word hashtags for readability (#SocialMediaTips)</li>
                    <li>Research event hashtags before attending conferences</li>
                  </ul>
                </div>
              )}
              
              {platform === 'tiktok' && (
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    TikTok's discovery algorithm relies heavily on hashtags. Including trending tags can help increase views.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Always include #FYP, #ForYou, or #ForYouPage to reach the main feed</li>
                    <li>Research trending hashtag challenges to participate in</li>
                    <li>Use niche hashtags related to your specific content</li>
                    <li>Include location hashtags to reach local audiences</li>
                    <li>Keep an eye on trending sounds and pair them with relevant hashtags</li>
                  </ul>
                </div>
              )}
              
              {platform === 'linkedin' && (
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    LinkedIn is more professional, so hashtags should be industry-relevant and fewer in number (3-5 maximum).
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Focus on industry-specific and professional hashtags</li>
                    <li>Follow hashtags relevant to your industry to join conversations</li>
                    <li>Create company-specific hashtags for branded content</li>
                    <li>Use skill-based hashtags to reach professionals in specific areas</li>
                    <li>Avoid overly casual or irrelevant hashtags</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full"></div>
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