'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const WebsiteManagementTools = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount with a slight delay after Website Tracking Tools
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250); // Reduced delay for staggered effect
    
    return () => clearTimeout(timer);
  }, []);

  const tools = [
    {
      icon: '/images/icons/keyword-density.svg',
      iconFallback: '🔍',
      title: 'Keyword Density Checker',
      description: 'Analyze keyword usage in your content',
      link: '/management-tools/keyword-density-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/robots-txt.svg',
      iconFallback: '🤖',
      title: 'Robots.txt Generator',
      description: 'Create custom robots.txt files for your website',
      link: '/management-tools/robots-txt-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/domain-ip.svg',
      iconFallback: '🌐',
      title: 'Domain to IP',
      description: 'Convert domain names to IP addresses',
      link: '/management-tools/domain-to-ip',
      isNew: false,
    },
    {
      icon: '/images/icons/http-status.svg',
      iconFallback: '📊',
      title: 'HTTP Status Code Checker',
      description: 'Check HTTP status codes of your pages',
      link: '/management-tools/http-status-code-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/htaccess.svg',
      iconFallback: '↪️',
      title: 'Htaccess Redirect Generator',
      description: 'Generate .htaccess redirect rules',
      link: '/management-tools/htaccess-redirect-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/meta-tag.svg',
      iconFallback: '📝',
      title: 'Meta Tag Generator',
      description: 'Create optimized meta tags for SEO',
      link: '/management-tools/meta-tag-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/meta-tags-analyzer.svg',
      iconFallback: '🔎',
      title: 'Meta Tags Analyzer',
      description: 'Analyze the effectiveness of your meta tags',
      link: '/management-tools/meta-tags-analyzer',
      isNew: false,
    },
    {
      icon: '/images/icons/server-status.svg',
      iconFallback: '🖥️',
      title: 'Server Status Checker',
      description: 'Check if your server is up and running',
      link: '/management-tools/server-status-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/hosting-checker.svg',
      iconFallback: '☁️',
      title: 'Hosting Checker',
      description: 'Identify where a website is hosted',
      link: '/management-tools/hosting-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/browser-info.svg',
      iconFallback: '🌍',
      title: 'What Is My Browser',
      description: 'Detect your browser type and version',
      link: '/management-tools/what-is-my-browser',
      isNew: false,
    },
    {
      icon: '/images/icons/user-agent.svg',
      iconFallback: '👤',
      title: 'What Is My User Agent',
      description: 'Display your current user agent string',
      link: '/management-tools/what-is-my-user-agent',
      isNew: false,
    },
    {
      icon: '/images/icons/open-graph-checker.svg',
      iconFallback: '📈',
      title: 'Open Graph Checker',
      description: 'Validate Open Graph meta tags on your site',
      link: '/management-tools/open-graph-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/open-graph-generator.svg',
      iconFallback: '📊',
      title: 'Open Graph Generator',
      description: 'Create Open Graph tags for social sharing',
      link: '/management-tools/open-graph-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/http-headers.svg',
      iconFallback: '📋',
      title: 'Get HTTP Headers',
      description: 'Retrieve HTTP headers from any URL',
      link: '/management-tools/get-http-headers',
      isNew: false,
    },
    {
      icon: '/images/icons/twitter-card.svg',
      iconFallback: '🐦',
      title: 'Twitter Card Generator',
      description: 'Create Twitter card meta tags',
      link: '/management-tools/twitter-card-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/screen-resolution.svg',
      iconFallback: '📱',
      title: 'What Is My Screen Resolution',
      description: 'Display your current screen resolution',
      link: '/management-tools/what-is-my-screen-resolution',
      isNew: false,
    },
    {
      icon: '/images/icons/resolution-simulator.svg',
      iconFallback: '💻',
      title: 'Screen Resolution Simulator',
      description: 'Test how your site looks on different screens',
      link: '/management-tools/screen-resolution-simulator',
      isNew: false,
    },
    {
      icon: '/images/icons/page-size.svg',
      iconFallback: '📏',
      title: 'Page Size Checker',
      description: 'Check the size of your web pages',
      link: '/management-tools/page-size-checker',
      isNew: false,
    },
    {
      icon: '/images/icons/url-opener.svg',
      iconFallback: '🔗',
      title: 'URL Opener',
      description: 'Open multiple URLs at once',
      link: '/management-tools/url-opener',
      isNew: false,
    },
    {
      icon: '/images/icons/credit-card-generator.svg',
      iconFallback: '💳',
      title: 'Credit Card Generator',
      description: 'Generate test credit card numbers',
      link: '/management-tools/credit-card-generator',
      isNew: false,
    },
    {
      icon: '/images/icons/credit-card-validator.svg',
      iconFallback: '✅',
      title: 'Credit Card Validator',
      description: 'Validate credit card numbers',
      link: '/management-tools/credit-card-validator',
      isNew: false,
    },
    {
      icon: '/images/icons/wordpress-theme.svg',
      iconFallback: 'ⓦ',
      title: 'WordPress Theme Detector',
      description: 'Identify WordPress themes used on websites',
      link: '/management-tools/wordpress-theme-detector',
      isNew: false,
    },
    {
      icon: '/images/icons/adsense-calculator.svg',
      iconFallback: '💰',
      title: 'Adsense Calculator',
      description: 'Calculate potential AdSense earnings',
      link: '/management-tools/adsense-calculator',
      isNew: false,
    },
    {
      icon: '/images/icons/keywords-suggestion.svg',
      iconFallback: '🔤',
      title: 'Keywords Suggestion Tool',
      description: 'Get keyword ideas for your content',
      link: '/management-tools/keywords-suggestion-tool',
      isNew: false,
    },
    {
      icon: '/images/icons/faq-schema.svg',
      iconFallback: '❓',
      title: 'FAQ Schema Generator',
      description: 'Create schema markup for FAQ sections',
      link: '/management-tools/faq-schema-generator',
      isNew: true,
    },
    {
      icon: '/images/icons/json-schema.svg',
      iconFallback: '📄',
      title: 'JSON to JSON Schema',
      description: 'Convert JSON to JSON Schema format',
      link: '/management-tools/json-to-json-schema',
      isNew: true,
    },
    {
      icon: '/images/icons/dns-records.svg',
      iconFallback: '🔌',
      title: 'DNS Records Checker',
      description: 'Check DNS records for any domain',
      link: '/management-tools/dns-records-checker',
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
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 relative">Website Management Tools</h2>
          <p className="text-white/90 text-base relative">Use these website management tools and in-depth web analytics to get more traffic and improve your website performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
                <p className="text-gray-600 text-xs mt-0.5 hidden md:block line-clamp-1">{tool.description}</p>
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

export default WebsiteManagementTools; 