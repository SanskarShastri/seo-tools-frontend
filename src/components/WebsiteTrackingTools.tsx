'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const WebsiteTrackingTools = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount with a slight delay after Text Analysis tools
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Reduced delay for staggered effect
    
    return () => clearTimeout(timer);
  }, []);

  const tools = [
    {
      icon: '/images/icons/google-index.svg',
      iconFallback: '🔍',
      title: 'Google Index Checker',
      description: 'Check if your pages are indexed by Google',
      link: '/tracking-tools/google-index-checker',
    },
    {
      icon: '/images/icons/google-cache.svg',
      iconFallback: '🔄',
      title: 'Google Cache Checker',
      description: 'See the latest cached version of your pages',
      link: '/tracking-tools/google-cache-checker',
    },
    {
      icon: '/images/icons/domain-age.svg',
      iconFallback: '⏱️',
      title: 'Domain Age Checker',
      description: 'Determine how long a domain has been registered',
      link: '/tracking-tools/domain-age-checker',
    },
    {
      icon: '/images/icons/domain-authority.svg',
      iconFallback: '📊',
      title: 'Domain Authority Checker',
      description: 'Check your domain\'s authority score',
      link: '/tracking-tools/domain-authority-checker',
    },
    {
      icon: '/images/icons/page-authority.svg',
      iconFallback: '📄',
      title: 'Page Authority Checker',
      description: 'Analyze the authority score of specific pages',
      link: '/tracking-tools/page-authority-checker',
    },
    {
      icon: '/images/icons/da-pa.svg',
      iconFallback: '📈',
      title: 'DA PA Checker',
      description: 'Check both domain and page authority scores',
      link: '/tracking-tools/da-pa-checker',
    },
    {
      icon: '/images/icons/whois.svg',
      iconFallback: '🔎',
      title: 'Whois Domain Lookup',
      description: 'Find domain registration and owner information',
      link: '/tracking-tools/whois-domain-lookup',
    },
    {
      icon: '/images/icons/moz-rank.svg',
      iconFallback: '📊',
      title: 'Moz Rank Checker',
      description: 'Check your website\'s Moz ranking metrics',
      link: '/tracking-tools/moz-rank-checker',
    },
    {
      icon: '/images/icons/redirect.svg',
      iconFallback: '↪️',
      title: 'Redirect Checker',
      description: 'Analyze redirect chains and status codes',
      link: '/tracking-tools/redirect-checker',
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div 
        className={`container mx-auto px-4 transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-xl mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 -mt-8 -mr-8 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 relative">Website Tracking Tools</h2>
          <p className="text-white/90 text-base relative">List of free tools in one place to measure, monitor, and track your website performance.</p>
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
                <p className="text-gray-600 text-xs mt-0.5 line-clamp-1">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteTrackingTools; 