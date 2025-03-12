'use client';

import { useState, useEffect } from 'react';
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
    title: 'Text to Hashtags',
    description: 'Generate hashtags from your text',
    link: '/text-tools/text-to-hashtags',
    icon: '#️⃣',
  },
];

// Interface for diff result
interface DiffResult {
  additions: number;
  deletions: number;
  unchanged: number;
  diffHtml: string;
  diffMarkdown: string;
  diffText: string;
  similarity: number;
}

export default function TextComparePage() {
  const [originalText, setOriginalText] = useState('');
  const [revisedText, setRevisedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
  
  // Diff options
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [displayFormat, setDisplayFormat] = useState<'inline' | 'side-by-side'>('inline');
  
  const compareTexts = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setError('');
    setDiffResult(null);
    
    // Basic validation
    if (!originalText.trim() || !revisedText.trim()) {
      setError('Please enter both original and revised text to compare');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Process the texts and generate the diff result
        const result = performDiff(originalText, revisedText);
        setDiffResult(result);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to compare texts. Please try again.');
      setIsLoading(false);
    }
  };
  
  const performDiff = (text1: string, text2: string): DiffResult => {
    // Apply options to text preprocessing
    let processedText1 = text1;
    let processedText2 = text2;
    
    if (!caseSensitive) {
      processedText1 = processedText1.toLowerCase();
      processedText2 = processedText2.toLowerCase();
    }
    
    if (ignoreWhitespace) {
      processedText1 = processedText1.replace(/\s+/g, ' ').trim();
      processedText2 = processedText2.replace(/\s+/g, ' ').trim();
    }
    
    // Split into lines for line-by-line comparison
    const lines1 = processedText1.split('\n');
    const lines2 = processedText2.split('\n');
    
    // Simple diff implementation (this is a simplified version for demo purposes)
    let additions = 0;
    let deletions = 0;
    let unchanged = 0;
    
    // Create HTML and text representations
    let diffHtml = '';
    let diffMarkdown = '';
    let diffText = '';
    
    // Very simplified diff algorithm (for demonstration purposes)
    // In a real implementation, you'd use a proper diff algorithm like Myers diff
    const commonLines = new Set();
    lines1.forEach(line => {
      if (lines2.includes(line)) {
        commonLines.add(line);
      }
    });
    
    // Count stats
    lines1.forEach(line => {
      if (line.trim() === '') return;
      if (commonLines.has(line)) {
        unchanged++;
      } else {
        deletions++;
      }
    });
    
    lines2.forEach(line => {
      if (line.trim() === '') return;
      if (!commonLines.has(line)) {
        additions++;
      }
    });
    
    // Calculate similarity percentage
    const totalLines = additions + deletions + unchanged;
    const similarity = totalLines > 0 ? Math.round((unchanged / totalLines) * 100) : 100;
    
    // Generate diff representation based on display format
    if (displayFormat === 'inline') {
      const allLines = new Set([...lines1, ...lines2]);
      
      allLines.forEach(line => {
        if (line.trim() === '') {
          diffHtml += '<div class="text-gray-400 py-1">↵</div>';
          diffMarkdown += '\n';
          diffText += '\n';
          return;
        }
        
        const inOriginal = lines1.includes(line);
        const inRevised = lines2.includes(line);
        
        if (inOriginal && inRevised) {
          // Unchanged line
          diffHtml += `<div class="py-1">${line}</div>`;
          diffMarkdown += `${line}\n`;
          diffText += `${line}\n`;
        } else if (inOriginal && !inRevised) {
          // Deletion
          diffHtml += `<div class="py-1 bg-red-100 text-red-800">- ${line}</div>`;
          diffMarkdown += `~~${line}~~\n`;
          diffText += `- ${line}\n`;
        } else if (!inOriginal && inRevised) {
          // Addition
          diffHtml += `<div class="py-1 bg-green-100 text-green-800">+ ${line}</div>`;
          diffMarkdown += `**${line}**\n`;
          diffText += `+ ${line}\n`;
        }
      });
    } else {
      // Side-by-side view
      diffHtml += '<div class="grid grid-cols-2 gap-4">';
      diffHtml += '<div class="col-span-1"><h4 class="font-medium mb-2">Original</h4>';
      diffMarkdown += '## Original\n\n';
      diffText += '--- ORIGINAL ---\n\n';
      
      lines1.forEach(line => {
        if (line.trim() === '') {
          diffHtml += '<div class="text-gray-400 py-1">↵</div>';
          diffMarkdown += '\n';
          diffText += '\n';
          return;
        }
        
        if (lines2.includes(line)) {
          diffHtml += `<div class="py-1">${line}</div>`;
        } else {
          diffHtml += `<div class="py-1 bg-red-100 text-red-800">${line}</div>`;
        }
        
        diffMarkdown += `${line}\n`;
        diffText += `${line}\n`;
      });
      
      diffHtml += '</div><div class="col-span-1"><h4 class="font-medium mb-2">Revised</h4>';
      diffMarkdown += '\n\n## Revised\n\n';
      diffText += '\n\n--- REVISED ---\n\n';
      
      lines2.forEach(line => {
        if (line.trim() === '') {
          diffHtml += '<div class="text-gray-400 py-1">↵</div>';
          diffMarkdown += '\n';
          diffText += '\n';
          return;
        }
        
        if (lines1.includes(line)) {
          diffHtml += `<div class="py-1">${line}</div>`;
        } else {
          diffHtml += `<div class="py-1 bg-green-100 text-green-800">${line}</div>`;
        }
        
        diffMarkdown += `${line}\n`;
        diffText += `${line}\n`;
      });
      
      diffHtml += '</div></div>';
    }
    
    return {
      additions,
      deletions,
      unchanged,
      diffHtml,
      diffMarkdown,
      diffText,
      similarity
    };
  };
  
  const copyDiffToClipboard = (format: 'html' | 'markdown' | 'text') => {
    if (!diffResult) return;
    
    let content = '';
    
    switch (format) {
      case 'html':
        content = diffResult.diffHtml;
        break;
      case 'markdown':
        content = diffResult.diffMarkdown;
        break;
      case 'text':
        content = diffResult.diffText;
        break;
    }
    
    navigator.clipboard.writeText(content)
      .then(() => {
        const copyBtn = document.getElementById(`copy-${format}`);
        if (copyBtn) {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = format === 'html' ? 'Copy HTML' : 
                                  format === 'markdown' ? 'Copy Markdown' : 'Copy Plain Text';
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const swapTexts = () => {
    const temp = originalText;
    setOriginalText(revisedText);
    setRevisedText(temp);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-20 mb-12">
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
                  animation: `float-compare ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 5 === 0 ? '+' : i % 5 === 1 ? '-' : i % 5 === 2 ? '≠' : i % 5 === 3 ? '≈' : '='}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Text <span className="text-cyan-200">Compare</span> Tool
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Find differences between two text samples quickly and easily
          </p>

          {/* Interactive Demo */}
          <div className="max-w-3xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="text-white/70 text-sm mb-2">Original Text</div>
                <div className="bg-white/5 rounded-lg p-3 text-left text-white/80 text-sm h-24 overflow-hidden">
                  <p>This is the <span className="bg-red-500/20">original</span> version of our text.</p>
                  <p>It contains some errors that need fixing.</p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-white/70 text-sm mb-2">Revised Text</div>
                <div className="bg-white/5 rounded-lg p-3 text-left text-white/80 text-sm h-24 overflow-hidden">
                  <p>This is the <span className="bg-green-500/20">revised</span> version of our text.</p>
                  <p>All errors have been corrected.</p>
                </div>
              </div>
              <div className="col-span-2 flex justify-center mt-2">
                <div className="inline-flex items-center gap-4 text-white/90 text-sm">
                  <span>
                    <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                    +2 Added
                  </span>
                  <span>
                    <span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-1"></span>
                    -2 Removed
                  </span>
                  <span>
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-1"></span>
                    75% Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={compareTexts} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Original Text
                  </label>
                  <textarea
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Paste your original text here..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-medium">
                      Revised Text
                    </label>
                    <button
                      type="button"
                      onClick={swapTexts}
                      className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      Swap Texts
                    </button>
                  </div>
                  <textarea
                    value={revisedText}
                    onChange={(e) => setRevisedText(e.target.value)}
                    placeholder="Paste your revised text here..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="case-sensitive"
                    checked={caseSensitive}
                    onChange={() => setCaseSensitive(!caseSensitive)}
                    className="w-5 h-5 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
                  />
                  <label htmlFor="case-sensitive" className="ml-2 text-sm text-gray-700">
                    Case-sensitive comparison
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ignore-whitespace"
                    checked={ignoreWhitespace}
                    onChange={() => setIgnoreWhitespace(!ignoreWhitespace)}
                    className="w-5 h-5 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
                  />
                  <label htmlFor="ignore-whitespace" className="ml-2 text-sm text-gray-700">
                    Ignore whitespace differences
                  </label>
                </div>
                <div className="flex items-center ml-6">
                  <label className="text-sm text-gray-700 mr-3">Display:</label>
                  <div className="flex rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setDisplayFormat('inline')}
                      className={`px-3 py-1 text-sm ${
                        displayFormat === 'inline'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Inline
                    </button>
                    <button
                      type="button"
                      onClick={() => setDisplayFormat('side-by-side')}
                      className={`px-3 py-1 text-sm ${
                        displayFormat === 'side-by-side'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Side by Side
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Comparing Texts...
                  </>
                ) : (
                  'Compare Texts'
                )}
              </button>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {diffResult && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparison Results</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="px-4 py-2 bg-white rounded-lg border border-cyan-200 text-cyan-700">
                      <div className="text-xs text-gray-500 mb-1">Similarity</div>
                      <div className="text-lg font-bold">{diffResult.similarity}%</div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-lg border border-cyan-200 text-green-600">
                      <div className="text-xs text-gray-500 mb-1">Additions</div>
                      <div className="text-lg font-bold">+{diffResult.additions}</div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-lg border border-cyan-200 text-red-600">
                      <div className="text-xs text-gray-500 mb-1">Deletions</div>
                      <div className="text-lg font-bold">-{diffResult.deletions}</div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-lg border border-cyan-200 text-gray-600">
                      <div className="text-xs text-gray-500 mb-1">Unchanged</div>
                      <div className="text-lg font-bold">{diffResult.unchanged}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      id="copy-text"
                      onClick={() => copyDiffToClipboard('text')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Copy Plain Text
                    </button>
                    <button
                      id="copy-markdown"
                      onClick={() => copyDiffToClipboard('markdown')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Copy Markdown
                    </button>
                    <button
                      id="copy-html"
                      onClick={() => copyDiffToClipboard('html')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Copy HTML
                    </button>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                    <div 
                      className="prose prose-sm max-w-none" 
                      dangerouslySetInnerHTML={{ __html: diffResult.diffHtml }}
                    />
                  </div>
                </div>
                
                {/* Diff Legend */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">How to Read the Diff</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-white mr-2"></div>
                      <span className="text-sm text-gray-700">Unchanged text</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-green-100 mr-2"></div>
                      <span className="text-sm text-gray-700">Added in revised text</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 bg-red-100 mr-2"></div>
                      <span className="text-sm text-gray-700">Removed from original text</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Text Comparison Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Comparing Documents</h4>
                    <p className="text-sm text-gray-600">Use side-by-side view for longer documents to easily see the changes between versions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Code Comparison</h4>
                    <p className="text-sm text-gray-600">Enable case-sensitive comparison and don't ignore whitespace when comparing code snippets.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Content Editing</h4>
                    <p className="text-sm text-gray-600">Use text comparison to see how much of your content has changed after editing or rewriting.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Plagiarism Checking</h4>
                    <p className="text-sm text-gray-600">Compare texts to identify similarities and differences for plagiarism detection.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Revision Tracking</h4>
                    <p className="text-sm text-gray-600">Compare various versions of documents to track changes over time.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-cyan-600 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Text Analysis</h4>
                    <p className="text-sm text-gray-600">Use the similarity percentage to quantify how different two texts are.</p>
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
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
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
        @keyframes float-compare {
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