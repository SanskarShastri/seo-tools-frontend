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
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

export default function BackwardsTextGeneratorPage() {
  const [originalText, setOriginalText] = useState('');
  const [reversedText, setReversedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [reverseMode, setReverseMode] = useState<'character' | 'word' | 'sentence'>('character');

  const convertText = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setReversedText('');
    setIsComplete(false);
    
    if (!originalText.trim()) {
      setError('Please enter some text to reverse');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        let result = '';
        
        switch (reverseMode) {
          case 'character':
            // Reverse entire string character by character
            result = originalText.split('').reverse().join('');
            break;
            
          case 'word':
            // Reverse each word but keep word order
            result = originalText
              .split(' ')
              .map(word => word.split('').reverse().join(''))
              .join(' ');
            break;
            
          case 'sentence':
            // Keep character order in each word but reverse word order
            result = originalText
              .split(' ')
              .reverse()
              .join(' ');
            break;
            
          default:
            result = originalText.split('').reverse().join('');
        }
        
        setReversedText(result);
        setIsComplete(true);
        setIsLoading(false);
      }, 1000); // 1 second delay to simulate processing
    } catch (err) {
      setError('Failed to reverse text. Please try again.');
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (reversedText) {
      navigator.clipboard.writeText(reversedText)
        .then(() => {
          const copyBtn = document.getElementById('copy-btn');
          if (copyBtn) {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = 'Copy Text';
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
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 mb-12">
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
                  animation: `float-letter ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 4 === 0 ? 'А' : i % 4 === 1 ? 'Я' : i % 4 === 2 ? 'Z' : 'A'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Backwards <span className="text-purple-200">Text</span> Generator
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Convert your text to read backwards for fun, creativity, or special projects
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full text-center">
                <span className="inline-block py-2 px-4 bg-white/5 rounded-lg text-2xl font-mono">
                  Hello World → dlroW olleH
                </span>
                <div className="flex justify-center mt-4 space-x-2">
                  <span className="inline-block py-1 px-3 bg-white/20 rounded-full text-sm">Character</span>
                  <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-sm">Word</span>
                  <span className="inline-block py-1 px-3 bg-white/10 rounded-full text-sm">Sentence</span>
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
            <form onSubmit={convertText} className="mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter Text to Reverse
                </label>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Reverse Mode
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setReverseMode('character')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reverseMode === 'character'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Character by Character
                  </button>
                  <button
                    type="button"
                    onClick={() => setReverseMode('word')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reverseMode === 'word'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Reverse Each Word
                  </button>
                  <button
                    type="button"
                    onClick={() => setReverseMode('sentence')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reverseMode === 'sentence'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Reverse Word Order
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reversing Text...
                  </>
                ) : (
                  'Reverse Text'
                )}
              </button>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {isComplete && reversedText && (
              <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Backwards Text Result</h3>
                <div className="bg-white rounded-lg p-4 border border-purple-200 font-mono mb-4 whitespace-pre-wrap">
                  {reversedText}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    id="copy-btn"
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Copy Text
                  </button>
                </div>
              </div>
            )}

            {/* Examples Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reverse Mode Examples</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Character by Character</h4>
                  <div className="text-sm">
                    <p className="text-gray-500 mb-1">Original:</p>
                    <p className="font-mono mb-2">Hello World</p>
                    <p className="text-gray-500 mb-1">Reversed:</p>
                    <p className="font-mono text-purple-700">dlroW olleH</p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Reverse Each Word</h4>
                  <div className="text-sm">
                    <p className="text-gray-500 mb-1">Original:</p>
                    <p className="font-mono mb-2">Hello World</p>
                    <p className="text-gray-500 mb-1">Reversed:</p>
                    <p className="font-mono text-purple-700">olleH dlroW</p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Reverse Word Order</h4>
                  <div className="text-sm">
                    <p className="text-gray-500 mb-1">Original:</p>
                    <p className="font-mono mb-2">Hello World</p>
                    <p className="text-gray-500 mb-1">Reversed:</p>
                    <p className="font-mono text-purple-700">World Hello</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-md font-medium text-gray-800 mb-2">Fun uses for backwards text:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  <li>Create word puzzles and brain teasers</li>
                  <li>Design mirror-readable text for creative projects</li>
                  <li>Make hidden messages that need to be read backwards</li>
                  <li>Generate palindromes and special text effects</li>
                  <li>Create reversed watermarks or unique signatures</li>
                  <li>Use backwards text in games like word scrambles</li>
                </ul>
              </div>
            </div>

            {/* Creative Uses Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Creative Ways to Use Backwards Text</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Da Vinci Style Mirror Writing</h4>
                    <p className="text-sm text-gray-600">Create text that can be read in a mirror, similar to Leonardo da Vinci's famous notebooks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Ambigrams and Word Art</h4>
                    <p className="text-sm text-gray-600">Design creative text that can be read from different directions for logos or artistic displays.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Social Media Fun</h4>
                    <p className="text-sm text-gray-600">Create unique, attention-grabbing posts that stand out in social feeds with reversed text.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Secret Codes and Messages</h4>
                    <p className="text-sm text-gray-600">Send fun coded messages to friends or create engaging puzzles for games and activities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">T-shirt and Merchandise Design</h4>
                    <p className="text-sm text-gray-600">Create unique designs for custom apparel or merchandise using backwards text.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-purple-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Educational Tools</h4>
                    <p className="text-sm text-gray-600">Use backwards text for language learning exercises or to help students with dyslexia practice reading.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100/80 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
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
        @keyframes float-letter {
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