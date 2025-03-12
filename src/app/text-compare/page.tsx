'use client';

import { useState, useEffect } from 'react';
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
    title: 'Text to Hashtags',
    description: 'Convert text to relevant hashtags',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
  {
    title: 'URL Rewriting Tool',
    description: 'Create clean and SEO-friendly URLs',
    link: '/text-tools/url-rewriting',
    icon: '🔄',
  },
];

// Interface for word difference
interface WordDiff {
  text: string;
  added?: boolean;
  removed?: boolean;
}

// Interface for line difference
interface LineDiff {
  words: WordDiff[];
  added?: boolean;
  removed?: boolean;
  changed?: boolean;
}

export default function TextComparePage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<LineDiff[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [compareComplete, setCompareComplete] = useState(false);
  const [stats, setStats] = useState({
    additions: 0,
    deletions: 0,
    changes: 0,
    similarity: 100,
  });
  
  const exampleText1 = "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. The weather is nice today.";
  const exampleText2 = "The fast brown fox leaps over the lazy dog. She sells beautiful seashells by the ocean shore. The weather is pleasant today.";

  // Compare the two texts
  const compareTexts = () => {
    if (!text1.trim() || !text2.trim()) {
      setError('Please enter text in both fields to compare');
      return;
    }

    setIsLoading(true);
    setError('');
    setCompareComplete(false);
    setDifferences([]);

    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        
        const result: LineDiff[] = [];
        let additions = 0;
        let deletions = 0;
        let changes = 0;
        let unchangedWords = 0;
        let totalWords = 0;
        
        // Simple diff algorithm
        const maxLines = Math.max(lines1.length, lines2.length);
        
        for (let i = 0; i < maxLines; i++) {
          const line1 = lines1[i] || '';
          const line2 = lines2[i] || '';
          
          if (!line1) {
            // Added line
            result.push({
              words: line2.split(' ').map(word => ({ text: word, added: true })),
              added: true
            });
            additions += line2.split(' ').filter(w => w.trim()).length;
            totalWords += line2.split(' ').filter(w => w.trim()).length;
          } else if (!line2) {
            // Removed line
            result.push({
              words: line1.split(' ').map(word => ({ text: word, removed: true })),
              removed: true
            });
            deletions += line1.split(' ').filter(w => w.trim()).length;
            totalWords += line1.split(' ').filter(w => w.trim()).length;
          } else {
            // Compare words
            const words1 = line1.split(' ');
            const words2 = line2.split(' ');
            const diffWords: WordDiff[] = [];
            let lineChanged = false;
            
            // Very simple word-by-word comparison
            const maxWords = Math.max(words1.length, words2.length);
            for (let j = 0; j < maxWords; j++) {
              const word1 = words1[j] || '';
              const word2 = words2[j] || '';
              totalWords += word1 || word2 ? 1 : 0;
              
              if (!word1) {
                diffWords.push({ text: word2, added: true });
                additions++;
                lineChanged = true;
              } else if (!word2) {
                diffWords.push({ text: word1, removed: true });
                deletions++;
                lineChanged = true;
              } else if (word1 !== word2) {
                diffWords.push({ text: word1, removed: true });
                diffWords.push({ text: word2, added: true });
                changes++;
                lineChanged = true;
              } else {
                diffWords.push({ text: word1 });
                unchangedWords++;
              }
            }
            
            result.push({
              words: diffWords,
              changed: lineChanged
            });
          }
        }
        
        // Calculate similarity percentage (simple version)
        const similarity = Math.round((unchangedWords / totalWords) * 100) || 0;
        
        setDifferences(result);
        setStats({
          additions,
          deletions,
          changes,
          similarity
        });
        setIsLoading(false);
        setCompareComplete(true);
      }, 1000);
    } catch (err) {
      setError('Failed to compare texts. Please try again.');
      setIsLoading(false);
    }
  };

  const loadExample = () => {
    setText1(exampleText1);
    setText2(exampleText2);
  };

  // Copy differences to clipboard
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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📝' : i % 3 === 1 ? '⚖️' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Text <span className="text-yellow-300">Compare</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Compare two texts and highlight the differences between them
          </p>

          {/* Interactive Example Button */}
          <button
            onClick={loadExample}
            className="mt-4 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 animate-fade-in-delayed"
          >
            Load Example Texts
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Original Text
                </label>
                <textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder={exampleText1}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Modified Text
                </label>
                <textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder={exampleText2}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-mono"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={compareTexts}
                disabled={!text1.trim() || !text2.trim() || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Comparing Texts...
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
                    Compare Texts
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm max-w-5xl mx-auto">
              {error}
            </div>
          )}

          {compareComplete && (
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Comparison Results</h2>
                
                <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                  <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1 font-bold">+{stats.additions}</span> additions
                  </div>
                  <div className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1 font-bold">-{stats.deletions}</span> deletions
                  </div>
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1 font-bold">{stats.changes}</span> changes
                  </div>
                  <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1 font-bold">{stats.similarity}%</span> similarity
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 overflow-x-auto font-mono text-sm">
                {differences.map((line, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className={`p-2 rounded-lg mb-1 ${
                      line.added ? 'bg-green-100 border-l-4 border-green-400' :
                      line.removed ? 'bg-red-100 border-l-4 border-red-400' :
                      line.changed ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
                    }`}
                  >
                    {line.words.map((word, wordIndex) => (
                      <span 
                        key={`${lineIndex}-${wordIndex}`}
                        className={`${
                          word.added ? 'bg-green-200 text-green-800' :
                          word.removed ? 'bg-red-200 text-red-800' : ''
                        } py-0.5 px-1 rounded-sm mr-1`}
                      >
                        {word.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Understanding the results:</strong> Green highlights indicate additions, red highlights show deletions, and yellow indicates changed lines. Words are matched based on their position in the text.
                  </div>
                </div>
              </div>

              {/* Use cases */}
              <div className="mt-12 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-800 mb-4">Common Use Cases for Text Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Document Revisions</h4>
                      <p className="text-sm text-gray-600">Track changes between different versions of legal documents, reports, or contracts.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Plagiarism Detection</h4>
                      <p className="text-sm text-gray-600">Compare student assignments or articles to identify similarities and potential plagiarism.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Code Review</h4>
                      <p className="text-sm text-gray-600">Examine differences between code versions to identify changes and potential issues.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-2">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Content Editing</h4>
                      <p className="text-sm text-gray-600">Compare original and edited content to verify all necessary changes were made.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
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