'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Backlink Checker',
    description: 'Check backlinks pointing to your website',
    link: '/text-tools/backlink-checker',
    icon: '🔗',
  },
  {
    title: 'Backwards Text Generator',
    description: 'Reverse the order of text characters',
    link: '/text-tools/backwards-text-generator',
    icon: '🔁',
  },
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
  {
    title: 'Text Compare',
    description: 'Compare two texts and find differences',
    link: '/text-tools/text-compare',
    icon: '📊',
  },
];

export default function ArticleRewriterPage() {
  const [originalText, setOriginalText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rewriteLevel, setRewriteLevel] = useState('medium');
  const [rewriteComplete, setRewriteComplete] = useState(false);
  
  const rewriteText = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setRewriteComplete(false);
    setRewrittenText('');

    if (!originalText.trim()) {
      setError('Please enter some text to rewrite.');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call
      setTimeout(() => {
        // Mock text rewriting based on selected level
        let result = '';
        
        switch(rewriteLevel) {
          case 'light':
            result = originalText
              .replace(/good/gi, 'great')
              .replace(/bad/gi, 'poor')
              .replace(/important/gi, 'crucial')
              .replace(/believe/gi, 'think')
              .replace(/use/gi, 'utilize');
            break;
          case 'medium':
            // More aggressive rewriting
            result = originalText
              .split('. ')
              .map(sentence => {
                let modified = sentence
                  .replace(/good/gi, 'excellent')
                  .replace(/bad/gi, 'undesirable')
                  .replace(/important/gi, 'essential')
                  .replace(/believe/gi, 'consider')
                  .replace(/use/gi, 'employ')
                  .replace(/however/gi, 'nevertheless')
                  .replace(/but/gi, 'yet')
                  .replace(/so/gi, 'therefore')
                  .replace(/very/gi, 'extremely');
                
                // Randomly reorder some parts if sentence is long enough
                if (sentence.split(' ').length > 8) {
                  const words = modified.split(' ');
                  // Shuffle the middle part of the sentence
                  const start = words.slice(0, 3);
                  const middle = words.slice(3, words.length - 3);
                  const end = words.slice(words.length - 3);
                  
                  // Reorder middle words
                  modified = [...start, ...middle.reverse(), ...end].join(' ');
                }
                
                return modified;
              })
              .join('. ');
            break;
          case 'heavy':
            // Completely transform the text
            result = originalText
              .split('. ')
              .map(sentence => {
                // Create completely different sentence structure while preserving key words
                const words = sentence.split(' ').filter(w => w.length > 3);
                if (words.length > 4) {
                  // Extract key nouns/concepts (simulated)
                  const keyWords = words.filter(w => w.length > 5);
                  
                  // Generate entirely new sentences with the key words
                  if (keyWords.length > 2) {
                    return `It is widely acknowledged that ${keyWords[0]} plays a crucial role in ${keyWords[1]}. Experts regularly emphasize the significance of ${keyWords[2] || keyWords[0]} when discussing this topic.`;
                  } else if (keyWords.length > 0) {
                    return `In the context of ${keyWords[0] || words[0]}, multiple factors must be carefully considered for optimal results.`;
                  }
                }
                // If we can't extract enough, do medium-level rewriting
                return sentence
                  .replace(/good/gi, 'exceptional')
                  .replace(/bad/gi, 'problematic')
                  .replace(/important/gi, 'critical')
                  .replace(/believe/gi, 'maintain')
                  .replace(/use/gi, 'leverage')
                  .replace(/however/gi, 'nonetheless')
                  .replace(/but/gi, 'although')
                  .replace(/so/gi, 'consequently')
                  .replace(/very/gi, 'remarkably');
              })
              .join('. ');
            break;
          default:
            result = originalText;
        }
        
        setRewrittenText(result);
        setIsLoading(false);
        setRewriteComplete(true);
      }, 2000);
    } catch (err) {
      setError('Failed to rewrite text. Please try again.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const calculateReadabilityScore = (text: string) => {
    if (!text) return 0;
    // Simple readability calculation (just for demonstration)
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length - 1;
    const avgWordsPerSentence = words / Math.max(sentences, 1);
    
    // Lower score is better in this simple metric
    let score = 100 - (avgWordsPerSentence * 4);
    
    // Clamp between 0-100
    return Math.min(Math.max(score, 0), 100);
  };

  const calculatePlagiarismSafety = (originalText: string, rewrittenText: string) => {
    if (!originalText || !rewrittenText) return 0;
    
    // Simple diff calculation (just for demonstration)
    const originalWords = originalText.toLowerCase().split(/\W+/);
    const rewrittenWords = rewrittenText.toLowerCase().split(/\W+/);
    
    // Count how many words are the same
    let sameWordCount = 0;
    for (const word of rewrittenWords) {
      if (word.length > 3 && originalWords.includes(word)) {
        sameWordCount++;
      }
    }
    
    const similarity = sameWordCount / Math.max(rewrittenWords.length, 1);
    // Lower similarity is better for plagiarism safety
    return Math.round((1 - similarity) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mb-12">
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
                  animation: `float-text ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '✏️' : i % 3 === 1 ? '📝' : '🔄'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Article <span className="text-yellow-300">Rewriter</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Rewrite your content to make it unique, engaging, and plagiarism-free
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2 text-left">
                <div className="text-white/60 text-sm mb-1">Original Text</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/80 text-sm h-20 overflow-hidden">
                  The company believes that it is important to use good practices for website development. However, there are some bad examples that we should avoid.
                </div>
              </div>
              <div className="hidden md:block text-2xl">→</div>
              <div className="w-full md:w-1/2 text-left">
                <div className="text-white/60 text-sm mb-1">Rewritten Text</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/80 text-sm h-20 overflow-hidden">
                  The company considers that it is essential to employ excellent practices for website development. Nevertheless, there are some poor examples that we should avoid.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={rewriteText} className="max-w-4xl mx-auto">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Paste your text to rewrite
              </label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter your text here..."
                rows={8}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Rewriting Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    rewriteLevel === 'light' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  onClick={() => setRewriteLevel('light')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      rewriteLevel === 'light' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Light Rewriting</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Basic synonym replacement with minimal changes to the original text.
                  </p>
                </div>
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    rewriteLevel === 'medium' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  onClick={() => setRewriteLevel('medium')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      rewriteLevel === 'medium' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Medium Rewriting</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sentence restructuring and more extensive synonym replacement.
                  </p>
                </div>
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    rewriteLevel === 'heavy' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  onClick={() => setRewriteLevel('heavy')}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded-full mr-2 ${
                      rewriteLevel === 'heavy' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-medium">Heavy Rewriting</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Complete text transformation while preserving the original meaning.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!originalText.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Rewriting Text...
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Rewrite Text
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {rewriteComplete && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Rewritten Text</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden p-6">
                <div className="mb-6">
                  <textarea
                    value={rewrittenText}
                    onChange={(e) => setRewrittenText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[200px]"
                    readOnly
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => copyToClipboard(rewrittenText)}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={() => {
                        setOriginalText(rewrittenText);
                        setRewrittenText('');
                        setRewriteComplete(false);
                      }}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Rewrite Again
                    </button>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Readability Score</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Score</span>
                          <span className="text-sm font-semibold text-blue-600">{calculateReadabilityScore(rewrittenText)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${calculateReadabilityScore(rewrittenText)}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Higher score indicates better readability and flow of the content.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Plagiarism Safety</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">Uniqueness</span>
                          <span className="text-sm font-semibold text-green-600">{calculatePlagiarismSafety(originalText, rewrittenText)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${calculatePlagiarismSafety(originalText, rewrittenText)}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Higher score indicates more unique content compared to the original text.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Tips for Better Results</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      For academic content, use the medium level to maintain accuracy while reducing similarity.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Always proofread the rewritten content to ensure it maintains the original meaning.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      For marketing content, try the heavy rewriting option for a completely fresh approach.
                    </li>
                  </ul>
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
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
        @keyframes float-text {
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