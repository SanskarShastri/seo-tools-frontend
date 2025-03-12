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
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

export default function BackwardsTextGeneratorPage() {
  const [originalText, setOriginalText] = useState('');
  const [backwardsText, setBackwardsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionComplete, setConversionComplete] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'character' | 'word' | 'sentence'>('character');

  // Example texts for each mode
  const exampleTexts = {
    character: {
      original: 'Hello world!',
      backwards: '!dlrow olleH'
    },
    word: {
      original: 'The quick brown fox jumps over the lazy dog',
      backwards: 'dog lazy the over jumps fox brown quick The'
    },
    sentence: {
      original: 'First sentence. Second sentence. Third sentence.',
      backwards: 'Third sentence. Second sentence. First sentence.'
    }
  };

  const convertText = () => {
    if (!originalText.trim()) {
      setError('Please enter some text to reverse');
      return;
    }

    setIsLoading(true);
    setError('');
    setConversionComplete(false);
    setBackwardsText('');

    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        let result = '';

        switch (selectedMode) {
          case 'character':
            // Reverse the entire string character by character
            result = originalText.split('').reverse().join('');
            break;
          case 'word':
            // Split by words, reverse the array, and join back
            result = originalText.split(/\s+/).reverse().join(' ');
            break;
          case 'sentence':
            // Split by sentence boundaries, reverse the array, and join back
            result = originalText
              .split(/(?<=[.!?])\s+/)
              .filter(s => s.trim())
              .reverse()
              .join(' ');
            break;
          default:
            result = originalText.split('').reverse().join('');
        }

        setBackwardsText(result);
        setIsLoading(false);
        setConversionComplete(true);
      }, 800);
    } catch (err) {
      setError('Failed to reverse text. Please try again.');
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
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 mb-12">
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
                  animation: `float-backwards ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '🔄' : i % 3 === 1 ? '🔁' : '📝'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Backwards Text <span className="text-yellow-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Reverse text by characters, words, or sentences for creative content
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2 text-left">
                <div className="text-white/60 text-sm mb-1">Original Text</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/80 text-sm font-mono">
                  {exampleTexts[selectedMode].original}
                </div>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="w-full md:w-1/2 text-left">
                <div className="text-white/60 text-sm mb-1">Reversed Text</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/80 text-sm font-mono">
                  {exampleTexts[selectedMode].backwards}
                </div>
              </div>
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
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter text to reverse..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              />
            </div>

            <div className="mb-8">
              <h3 className="block text-gray-700 text-sm font-medium mb-4">
                Reversal Mode
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMode === 'character' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                  onClick={() => setSelectedMode('character')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      selectedMode === 'character' ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Character Reversal</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reverse each character in the text (mirror text)
                  </p>
                </div>
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMode === 'word' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                  onClick={() => setSelectedMode('word')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      selectedMode === 'word' ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Word Reversal</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reverse the order of words in the text
                  </p>
                </div>
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMode === 'sentence' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                  onClick={() => setSelectedMode('sentence')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      selectedMode === 'sentence' ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Sentence Reversal</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reverse the order of sentences in the text
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={convertText}
                disabled={!originalText.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Processing...
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    Generate Backwards Text
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Reversed Text</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-6">
                <div className="mb-6">
                  <textarea
                    value={backwardsText}
                    onChange={(e) => setBackwardsText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 font-mono min-h-[150px]"
                    readOnly
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => copyToClipboard(backwardsText)}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={() => {
                        setOriginalText(backwardsText);
                        setBackwardsText('');
                        setConversionComplete(false);
                      }}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reverse Again
                    </button>
                  </div>
                </div>
              </div>

              {/* Creative uses section */}
              <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-800 mb-4">Creative Uses for Reversed Text</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Social Media Content</h4>
                      <p className="text-sm text-gray-600">Create intriguing posts with backwards text to catch attention.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Puzzles and Riddles</h4>
                      <p className="text-sm text-gray-600">Create fun word games or brain teasers with reversed text.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Design Elements</h4>
                      <p className="text-sm text-gray-600">Add backwards text as unique design elements in graphics or logos.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-500 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Secret Messages</h4>
                      <p className="text-sm text-gray-600">Create simple encoded messages for friends to decipher.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
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
        @keyframes float-backwards {
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