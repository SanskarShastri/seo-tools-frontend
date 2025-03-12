'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related website management tools data for the related tools section
const relatedTools = [
  {
    title: 'Meta Tags Analyzer',
    description: 'Analyze the effectiveness of your meta tags',
    link: '/management-tools/meta-tags-analyzer',
    icon: '🔎',
  },
  {
    title: 'Open Graph Generator',
    description: 'Create Open Graph tags for social sharing',
    link: '/management-tools/open-graph-generator',
    icon: '📊',
  },
  {
    title: 'Twitter Card Generator',
    description: 'Create Twitter card meta tags',
    link: '/management-tools/twitter-card-generator',
    icon: '🐦',
  },
  {
    title: 'Robots.txt Generator',
    description: 'Create custom robots.txt files for your website',
    link: '/management-tools/robots-txt-generator',
    icon: '🤖',
  },
];

export default function MetaTagGeneratorPage() {
  // State for input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState('width=device-width, initial-scale=1.0');
  const [robots, setRobots] = useState('index, follow');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [copied, setCopied] = useState(false);

  // Function to generate meta tags
  const generateMetaTags = (e: React.FormEvent) => {
    e.preventDefault();
    
    let html = '';
    
    if (title) {
      html += `<title>${title}</title>\n`;
      html += `<meta name="title" content="${title}">\n`;
    }
    
    if (description) {
      html += `<meta name="description" content="${description}">\n`;
    }
    
    if (keywords) {
      html += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
      html += `<meta name="author" content="${author}">\n`;
    }
    
    html += `<meta name="viewport" content="${viewport}">\n`;
    html += `<meta name="robots" content="${robots}">\n`;
    
    setGeneratedHTML(html);
  };

  // Function to copy generated HTML
  const copyToClipboard = () => {
    if (navigator.clipboard && generatedHTML) {
      navigator.clipboard.writeText(generatedHTML)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Navbar */}
      <Navbar />
      
      {/* Empty space to account for fixed navbar */}
      <div className="h-16"></div>
      
      {/* 2. Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-indigo-700 text-white py-20 mb-12">
        {/* Animated background with code-like elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute font-mono text-white text-opacity-20 text-xs" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `float-tag ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {['<meta>', '<head>', '</meta>', '<title>', '<meta name="description">', '<meta property="og:title">'][i % 6]}
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:-translate-y-2">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Meta Tag <span className="text-emerald-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create optimized meta tags for better SEO and improved search engine visibility.
          </p>
          
          {/* Interactive SEO Score Section */}
          <div className="mx-auto max-w-4xl mt-10 animate-fade-in-delayed">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">What makes great meta tags?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <span className="font-medium">Compelling Description</span>
                </div>
                
                <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="font-medium">Optimized Keywords</span>
                </div>
                
                <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                  </div>
                  <span className="font-medium">Search Engine Friendly</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-10 animate-bounce-slow">
            <svg className="w-6 h-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Add required animations */}
      <style jsx global>{`
        @keyframes float-tag {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation, 0deg));
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
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
      
      {/* 3. Input Fields Section */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-100 transition-all duration-500 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/20 rounded-full -mr-20 -mt-20 z-0"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-400/5 rounded-full -ml-20 -mb-20 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-700">Generate Meta Tags</h2>
              <div className="hidden md:flex items-center space-x-1 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              </div>
            </div>
            
            <form onSubmit={generateMetaTags}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Title Input */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                      Page Title
                    </div>
                  </div>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter your page title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 py-3 px-4 text-gray-700 transition-all duration-300"
                  />
                  <p className="mt-2 text-xs text-gray-500 pl-1">Recommended length: 50-60 characters</p>
                </div>
                
                {/* Description Input */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                      </svg>
                      Meta Description
                    </div>
                  </div>
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="Enter your meta description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 py-3 px-4 text-gray-700 transition-all duration-300"
                  />
                  <p className="mt-2 text-xs text-gray-500 pl-1">Recommended length: 150-160 characters</p>
                </div>
                
                {/* Keywords Input */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      Keywords
                    </div>
                  </div>
                  <input
                    id="keywords"
                    type="text"
                    placeholder="keyword1, keyword2, keyword3"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 py-3 px-4 text-gray-700 transition-all duration-300"
                  />
                  <p className="mt-2 text-xs text-gray-500 pl-1">Separate keywords with commas</p>
                </div>
                
                {/* Author Input */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Author
                    </div>
                  </div>
                  <input
                    id="author"
                    type="text"
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 py-3 px-4 text-gray-700 transition-all duration-300"
                  />
                </div>
                
                {/* Viewport Input */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      Viewport
                    </div>
                  </div>
                  <input
                    id="viewport"
                    type="text"
                    value={viewport}
                    onChange={(e) => setViewport(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 py-3 px-4 text-gray-700 transition-all duration-300"
                  />
                </div>
                
                {/* Robots Dropdown */}
                <div className="form-group relative transition-all duration-300 focus-within:scale-[1.01]">
                  <div className="absolute -top-3 left-3 px-2 bg-white text-xs font-medium text-teal-600 z-10">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Robots
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      id="robots"
                      value={robots}
                      onChange={(e) => setRobots(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 pl-4 pr-10 py-3 text-gray-700 appearance-none bg-white transition-all duration-300"
                    >
                      <option value="index, follow">index, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-teal-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 pl-1">Controls search engine crawling and indexing</p>
                </div>
              </div>
              
              {/* Generate Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="group relative px-10 py-4 overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Generate Meta Tags
                  </span>
                  <div className="absolute -inset-full rounded-full animate-gradient scale-75 bg-gradient-to-r from-teal-400/0 via-white/30 to-teal-400/0 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                </button>
              </div>
            </form>
          </div>
          
          {/* Generated HTML Output */}
          {generatedHTML && (
            <div className="mt-12 pt-10 border-t border-gray-100 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Generated Meta Tags
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                      Copy HTML
                    </>
                  )}
                </button>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-gradient-to-r from-slate-50 to-white p-1">
                <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-300">
                  <pre>{generatedHTML}</pre>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start">
                <svg className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <p className="text-sm text-blue-800">
                  Copy these meta tags and paste them into the <code className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">&#60;head&#62;</code> section of your HTML.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 4. Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-slate-50/50 to-slate-100/80 py-20">
        <div className="container mx-auto px-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-teal-400/5 to-cyan-400/10 rounded-full -mt-20 -ml-20 z-0"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tr from-cyan-400/5 to-blue-400/10 rounded-full -mb-20 -mr-20 z-0"></div>
          
          <div className="relative z-10 mb-16">
            <div className="text-center">
              <div className="inline-block">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
                  Related SEO Tools
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out duration-300"></div>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mt-1 mb-6"></div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Explore our other powerful website management tools to enhance your SEO strategy
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100/80 hover:border-teal-200/50 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-teal-400/5 to-cyan-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                
                <div className="relative z-10 flex items-start">
                  <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-teal-400/10 via-cyan-400/20 to-blue-400/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow transform group-hover:scale-110 transition-all duration-300 text-3xl">
                    <span className="transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                  </div>
                  
                  <div className="ml-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors duration-300">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 ease-in-out rounded-full"></div>
                
                <div className="mt-3 flex justify-end">
                  <span className="text-teal-500 text-sm font-medium opacity-0 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out flex items-center">
                    Explore
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="/management-tools" className="inline-flex items-center text-teal-600 hover:text-teal-700 text-lg font-medium group">
              View All SEO Tools
              <svg className="w-5 h-5 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Additional animations are already included from the hero section */}
    </div>
  );
} 