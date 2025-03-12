'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools with updated paths
const relatedTools = [
  {
    title: 'Text Compare',
    description: 'Compare text and find differences',
    link: '/text-tools/text-compare',
    icon: '🔍',
  },
  {
    title: 'URL Rewriting Tool',
    description: 'Create SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
    icon: '🔗',
  },
  {
    title: 'Backwards Text Generator',
    description: 'Convert text to read backwards',
    link: '/text-tools/backwards-text-generator',
    icon: '🔄',
  },
  {
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

export default function ArticleRewriterPage() {
  const [originalText, setOriginalText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [rewriteLevel, setRewriteLevel] = useState<'light' | 'medium' | 'heavy'>('medium');

  const rewriteText = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setError('');
    setRewrittenText('');
    setIsComplete(false);
    
    if (!originalText.trim()) {
      setError('Please enter some text to rewrite');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        let result = '';
        
        // Choose rewrite function based on selected level
        switch (rewriteLevel) {
          case 'light':
            result = generateLightRewrite(originalText);
            break;
          case 'medium':
            result = generateMediumRewrite(originalText);
            break;
          case 'heavy':
            result = generateHeavyRewrite(originalText);
            break;
          default:
            result = generateMediumRewrite(originalText);
        }
        
        setRewrittenText(result);
        setIsComplete(true);
        setIsLoading(false);
      }, 2000); // 2 second delay to simulate processing
    } catch (err) {
      setError('Failed to rewrite text. Please try again.');
      setIsLoading(false);
    }
  };
  
  // This is a simplified demo implementation. In a real app, you'd call an AI service
  const generateLightRewrite = (text: string): string => {
    // Simple word substitution for demo purposes
    const substitutions: Record<string, string[]> = {
      'good': ['nice', 'fine', 'pleasant'],
      'bad': ['poor', 'inferior', 'substandard'],
      'big': ['large', 'substantial', 'considerable'],
      'small': ['little', 'tiny', 'compact'],
      'important': ['significant', 'crucial', 'essential'],
      'interesting': ['engaging', 'fascinating', 'compelling'],
      'difficult': ['challenging', 'tough', 'hard'],
      'easy': ['simple', 'straightforward', 'uncomplicated'],
      'beautiful': ['attractive', 'lovely', 'gorgeous'],
      'ugly': ['unattractive', 'unsightly', 'hideous'],
      'fast': ['quick', 'rapid', 'swift'],
      'slow': ['gradual', 'unhurried', 'leisurely'],
      'old': ['aged', 'ancient', 'vintage'],
      'new': ['recent', 'fresh', 'modern'],
      'happy': ['glad', 'pleased', 'content'],
      'sad': ['unhappy', 'sorrowful', 'gloomy'],
      'angry': ['annoyed', 'irritated', 'furious'],
      'calm': ['peaceful', 'tranquil', 'serene'],
      'clever': ['smart', 'intelligent', 'bright'],
      'stupid': ['foolish', 'unwise', 'silly']
    };
    
    // Split text into words
    let words = text.split(/\b/);
    
    // Replace about 20% of eligible words
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (substitutions[word] && Math.random() < 0.2) {
        const alternatives = substitutions[word];
        const replacement = alternatives[Math.floor(Math.random() * alternatives.length)];
        
        // Preserve capitalization
        if (words[i][0] === words[i][0].toUpperCase()) {
          words[i] = replacement.charAt(0).toUpperCase() + replacement.slice(1);
        } else {
          words[i] = replacement;
        }
      }
    }
    
    return words.join('');
  };
  
  const generateMediumRewrite = (text: string): string => {
    // Start with light rewrite
    let rewritten = generateLightRewrite(text);
    
    // Split into sentences
    const sentences = rewritten.split(/(?<=[.!?])\s+/);
    
    // Modify sentence structure for about 30% of sentences
    for (let i = 0; i < sentences.length; i++) {
      if (Math.random() < 0.3) {
        const sentence = sentences[i];
        
        // Simple transformations (for demo purposes)
        if (sentence.startsWith('The ') && sentence.length > 10) {
          sentences[i] = sentence.replace('The ', '') + ' overall';
        } else if (sentence.includes(' and ')) {
          const parts = sentence.split(' and ');
          sentences[i] = parts[1] + ', as well as ' + parts[0];
        } else if (sentence.includes(' is ')) {
          sentences[i] = sentence.replace(' is ', ' appears to be ');
        } else if (sentence.includes(' was ')) {
          sentences[i] = sentence.replace(' was ', ' had been ');
        } else if (Math.random() < 0.5) {
          // Add a transition word at the beginning
          const transitions = ['Moreover, ', 'Furthermore, ', 'In addition, ', 'Similarly, ', 'Consequently, '];
          const transition = transitions[Math.floor(Math.random() * transitions.length)];
          sentences[i] = transition + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
      }
    }
    
    return sentences.join(' ');
  };
  
  const generateHeavyRewrite = (text: string): string => {
    // Start with medium rewrite
    let rewritten = generateMediumRewrite(text);
    
    // Split into paragraphs
    const paragraphs = rewritten.split(/\n\n+/);
    
    // Rewrite each paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      // Split into sentences
      const sentences = paragraphs[i].split(/(?<=[.!?])\s+/);
      
      // Completely restructure this paragraph
      if (sentences.length > 1) {
        // Randomly rearrange some sentences
        for (let j = 0; j < sentences.length - 1; j++) {
          if (Math.random() < 0.4) {
            const temp = sentences[j];
            sentences[j] = sentences[j + 1];
            sentences[j + 1] = temp;
          }
        }
        
        // Add transitional phrases
        for (let j = 1; j < sentences.length; j++) {
          if (Math.random() < 0.3) {
            const transitions = ['This means ', 'As a result, ', 'Considering this, ', 
                                 'With this in mind, ', 'This suggests that '];
            const transition = transitions[Math.floor(Math.random() * transitions.length)];
            sentences[j] = transition + sentences[j].charAt(0).toLowerCase() + sentences[j].slice(1);
          }
        }
        
        // Add a conclusion-like sentence at the end
        if (Math.random() < 0.5) {
          const conclusions = [
            'This demonstrates the importance of the subject matter.',
            'These points highlight the complexity of the issue.',
            'This perspective offers valuable insights.',
            'This approach provides significant benefits.',
            'This analysis reveals important patterns.'
          ];
          const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
          sentences.push(conclusion);
        }
      }
      
      paragraphs[i] = sentences.join(' ');
    }
    
    return paragraphs.join('\n\n');
  };
  
  const copyToClipboard = () => {
    if (rewrittenText) {
      navigator.clipboard.writeText(rewrittenText)
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
  
  // Calculate approximate readability score (simplified Flesch-Kincaid for demo)
  const calculateReadabilityScore = () => {
    if (!rewrittenText) return 0;
    
    const words = rewrittenText.split(/\s+/).length;
    const sentences = rewrittenText.split(/[.!?]+/).length;
    const syllables = countSyllables(rewrittenText);
    
    // Simplified Flesch-Kincaid formula
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    // Return a score between 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  };
  
  // Simple syllable counter (for demo purposes)
  const countSyllables = (text: string) => {
    // This is a very simplified version
    return text.split(/\s+/).length * 1.5; // Assume avg 1.5 syllables per word
  };
  
  // Calculate "plagiarism safety" score (for demo purposes)
  const calculatePlagiarismSafetyScore = () => {
    if (!originalText || !rewrittenText) return 0;
    
    // Calculate word-based difference (very simplified for demo)
    const originalWords = new Set(originalText.toLowerCase().split(/\s+/));
    const rewrittenWords = rewrittenText.toLowerCase().split(/\s+/);
    
    let changedWordCount = 0;
    for (const word of rewrittenWords) {
      if (!originalWords.has(word)) {
        changedWordCount++;
      }
    }
    
    const percentChanged = (changedWordCount / rewrittenWords.length) * 100;
    
    // Scale the score based on rewrite level
    let scaleFactor = 1;
    if (rewriteLevel === 'light') scaleFactor = 0.8;
    if (rewriteLevel === 'heavy') scaleFactor = 1.2;
    
    return Math.min(100, Math.round(percentChanged * scaleFactor));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 mb-12">
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
                  animation: `float-text ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 4 === 0 ? '✏️' : i % 4 === 1 ? '📝' : i % 4 === 2 ? '📄' : '📃'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Article <span className="text-emerald-200">Rewriter</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Transform your content with AI-powered text rewriting
          </p>

          {/* Interactive Demo */}
          <div className="max-w-3xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm">Light</div>
                <div className="px-3 py-1 bg-white/30 rounded-full text-sm">Medium</div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm">Heavy</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-white/80 text-sm">
                    The product offers great features at an affordable price point. Users will find it easy to use.
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <p className="text-white/80 text-sm">
                    This solution provides excellent capabilities at a reasonable cost. Customers will discover it straightforward to utilize.
                  </p>
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
            <form onSubmit={rewriteText} className="mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Enter Text to Rewrite
                </label>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Paste your article or text here to rewrite it..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Rewrite Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setRewriteLevel('light')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center ${
                      rewriteLevel === 'light'
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg mb-1">🔄</span>
                    <span>Light</span>
                    <span className="text-xs text-gray-500 mt-1">Minor changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRewriteLevel('medium')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center ${
                      rewriteLevel === 'medium'
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg mb-1">🔄🔄</span>
                    <span>Medium</span>
                    <span className="text-xs text-gray-500 mt-1">Moderate changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRewriteLevel('heavy')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center ${
                      rewriteLevel === 'heavy'
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-lg mb-1">🔄🔄🔄</span>
                    <span>Heavy</span>
                    <span className="text-xs text-gray-500 mt-1">Major changes</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Rewriting Text...
                  </>
                ) : (
                  'Rewrite Text'
                )}
              </button>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {isComplete && rewrittenText && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Rewritten Text</h3>
                  
                  {/* Content Analysis */}
                  {rewriteLevel !== 'light' && (
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="px-4 py-2 bg-white rounded-lg border border-emerald-200">
                        <div className="text-xs text-gray-500 mb-1">Readability</div>
                        <div className="flex items-center">
                          <div 
                            className="h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                            style={{ width: '100px' }}
                          >
                            <div 
                              className="h-3.5 w-3.5 rounded-full bg-white border-2 border-emerald-500 relative -top-0.5 shadow-sm"
                              style={{ marginLeft: `${calculateReadabilityScore() - 2}px` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{calculateReadabilityScore()}/100</span>
                        </div>
                      </div>
                      
                      <div className="px-4 py-2 bg-white rounded-lg border border-emerald-200">
                        <div className="text-xs text-gray-500 mb-1">Plagiarism Safety</div>
                        <div className="flex items-center">
                          <div 
                            className="h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                            style={{ width: '100px' }}
                          >
                            <div 
                              className="h-3.5 w-3.5 rounded-full bg-white border-2 border-emerald-500 relative -top-0.5 shadow-sm"
                              style={{ marginLeft: `${calculatePlagiarismSafetyScore() - 2}px` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{calculatePlagiarismSafetyScore()}/100</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg p-4 border border-emerald-200 mb-4 whitespace-pre-line">
                    {rewrittenText}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="copy-btn"
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Copy Text
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Rewriter Tips Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rewriting Tips</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">When to Use Each Level</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-sm text-emerald-700">Light Rewrite</div>
                      <p className="text-sm text-gray-600">
                        Best for minor adjustments, preserving your original tone and structure.
                        Ideal for proofreading or slight word variation.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-sm text-emerald-700">Medium Rewrite</div>
                      <p className="text-sm text-gray-600">
                        Balances original meaning with fresh language. Good for SEO optimization
                        and creating alternative versions of your content.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-sm text-emerald-700">Heavy Rewrite</div>
                      <p className="text-sm text-gray-600">
                        Completely transforms your text while preserving core ideas. Perfect for
                        repurposing content across different platforms or avoiding plagiarism concerns.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Best Practices</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Review the rewritten text for factual accuracy</li>
                    <li>Check that specialized terminology remains correct</li>
                    <li>Verify that the rewrite maintains your intended meaning</li>
                    <li>Use the rewrite as a starting point, then personalize</li>
                    <li>Combine different rewrite levels for different sections</li>
                    <li>Keep your audience and purpose in mind when selecting a rewrite level</li>
                    <li>Always proofread the final output before publishing</li>
                  </ul>
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
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
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