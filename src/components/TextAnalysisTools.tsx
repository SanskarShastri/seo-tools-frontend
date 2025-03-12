'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TextAnalysisTools = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount with a slight delay after YouTube tools
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);

  const tools = [
    {
      icon: '/images/icons/article-rewriter.svg',
      iconFallback: '📝',
      title: 'Article Rewriter',
      description: 'Rewrite articles while maintaining the original meaning',
      link: '/text-tools/article-rewriter',
      isNew: false,
    },
    {
      icon: '/images/icons/backlink-checker.svg',
      iconFallback: '🔗',
      title: 'Backlink Checker',
      description: 'Analyze backlinks pointing to your website',
      link: '/text-tools/backlink-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/url-rewriting.svg',
      iconFallback: '🔄',
      title: 'URL Rewriting Tool',
      description: 'Create SEO-friendly URLs for better indexing',
      link: '/text-tools/url-rewriting',
      isNew: false,
    },
    {
      icon: '/images/icons/backwards-text.svg',
      iconFallback: '⏪',
      title: 'Backwards Text Generator',
      description: 'Generate backwards text for creative content',
      link: '/text-tools/backwards-text-generator',
      isNew: true,
    },
    {
      icon: '/images/icons/text-hashtags.svg',
      iconFallback: '#️⃣',
      title: 'Text to Hashtags',
      description: 'Convert your text into relevant hashtags',
      link: '/text-tools/text-to-hashtags',
      isNew: true,
    },
    {
      icon: '/images/icons/text-compare.svg',
      iconFallback: '🔍',
      title: 'Text Compare',
      description: 'Compare two texts and highlight differences',
      link: '/text-tools/text-compare',
      isNew: true,
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div 
        className={`container mx-auto px-4 transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-xl mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 -mt-8 -mr-8 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0 4H7v2h2v-2zm8-8h-6v2h6V7zm0 4h-6v2h6v-2zm0 4h-6v2h6v-2z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 relative">Text Analysis Tools</h2>
          <p className="text-white/90 text-base relative">A complete set of text tools is now at your fingertips.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <Link 
              href={tool.link} 
              key={index}
              className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 flex items-center space-x-3 relative transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-400/10 to-cyan-400/20 rounded-lg group-hover:from-teal-400/20 group-hover:to-cyan-400/30 transition-colors duration-300">
                <span className="text-xl">{tool.iconFallback}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors duration-300 text-sm">{tool.title}</h3>
                <p className="text-gray-600 text-xs mt-0.5">{tool.description}</p>
              </div>
              
              {tool.isNew && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md transform rotate-12 shadow-sm text-[10px]">
                  NEW
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextAnalysisTools; 