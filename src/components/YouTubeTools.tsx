'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const YouTubeTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount
    setIsVisible(true);
  }, []);

  const tools = [
    {
      icon: '/images/icons/youtube-trend.svg',
      iconFallback: '📊',
      title: 'YouTube Trend',
      description: 'Discover trending topics on YouTube',
      link: '/youtube-trend',
      isNew: true,
      category: 'analytics'
    },
    {
      icon: '/images/icons/youtube-tag.svg',
      iconFallback: '🏷️',
      title: 'YouTube Tag Extractor',
      description: 'Extract tags from any YouTube video',
      link: '/youtube-tag-extractor',
      isNew: true,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-tag-generator.svg',
      iconFallback: '🏷️',
      title: 'YouTube Tag Generator',
      description: 'Generate optimized tags for your videos',
      link: '/youtube-tag-generator',
      isNew: true,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-hashtag.svg',
      iconFallback: '#️⃣',
      title: 'YouTube Hashtag Extractor',
      description: 'Extract hashtags from any YouTube video',
      link: '/youtube-hashtag-extractor',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-hashtag-generator.svg',
      iconFallback: '#️⃣',
      title: 'YouTube Hashtag Generator',
      description: 'Generate trending hashtags for your videos',
      link: '/youtube-hashtag-generator',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-title.svg',
      iconFallback: '📝',
      title: 'YouTube Title Extractor',
      description: 'Extract titles from any YouTube video',
      link: '/youtube-title-extractor',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-title-generator.svg',
      iconFallback: '📝',
      title: 'YouTube Title Generator',
      description: 'Generate engaging titles for better CTR',
      link: '/youtube-title-generator',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-description.svg',
      iconFallback: '📄',
      title: 'YouTube Description Extractor',
      description: 'Extract descriptions from any YouTube video',
      link: '/youtube-description-extractor',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-description-generator.svg',
      iconFallback: '📄',
      title: 'YouTube Description Generator',
      description: 'Generate SEO-optimized video descriptions',
      link: '/youtube-description-generator',
      isNew: false,
      category: 'content'
    },
    {
      icon: '/images/icons/youtube-embed.svg',
      iconFallback: '⚙️',
      title: 'YouTube Embed Code Generator',
      description: 'Create custom embed codes for your website',
      link: '/youtube-embed-code-generator',
      isNew: false,
      category: 'utilities'
    },
    {
      icon: '/images/icons/youtube-channel-id.svg',
      iconFallback: '🆔',
      title: 'YouTube Channel ID',
      description: 'Find channel ID from any YouTube channel',
      link: '/youtube-channel-id',
      isNew: false,
      category: 'channel'
    },
    {
      icon: '/images/icons/youtube-video-statistics.svg',
      iconFallback: '📊',
      title: 'YouTube Video Statistics',
      description: 'Analyze performance metrics of any video',
      link: '/youtube-video-statistics',
      isNew: false,
      category: 'analytics'
    },
    {
      icon: '/images/icons/youtube-channel-statistics.svg',
      iconFallback: '📊',
      title: 'YouTube Channel Statistics',
      description: 'Get comprehensive stats for any channel',
      link: '/youtube-channel-statistics',
      isNew: false,
      category: 'analytics'
    },
    {
      icon: '/images/icons/youtube-money.svg',
      iconFallback: '💰',
      title: 'YouTube Money Calculator',
      description: 'Estimate potential earnings from your videos',
      link: '/youtube-money-calculator',
      isNew: false,
      category: 'analytics'
    },
    {
      icon: '/images/icons/youtube-region.svg',
      iconFallback: '🌎',
      title: 'YouTube Region Restriction Checker',
      description: 'Check if videos are blocked in certain regions',
      link: '/youtube-region-restriction-checker',
      isNew: false,
      category: 'utilities'
    },
    {
      icon: '/images/icons/youtube-logo.svg',
      iconFallback: '🖼️',
      title: 'YouTube Channel Logo Downloader',
      description: 'Download high-resolution channel logos',
      link: '/youtube-channel-logo-downloader',
      isNew: false,
      category: 'channel'
    },
    {
      icon: '/images/icons/youtube-banner.svg',
      iconFallback: '🖼️',
      title: 'YouTube Channel Banner Downloader',
      description: 'Download channel banners in original quality',
      link: '/youtube-channel-banner-downloader',
      isNew: false,
      category: 'channel'
    },
    {
      icon: '/images/icons/youtube-search.svg',
      iconFallback: '🔍',
      title: 'YouTube Channel Search',
      description: 'Find channels by keywords and metrics',
      link: '/youtube-channel-search',
      isNew: false,
      category: 'channel'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🧰' },
    { id: 'content', name: 'Content Tools', icon: '✏️' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'channel', name: 'Channel Tools', icon: '📹' },
    { id: 'utilities', name: 'Utilities', icon: '🔧' }
  ];

  // Always show all tools without filtering
  const filteredTools = tools;

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
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 relative">YouTube Tools</h2>
          <p className="text-white/90 text-base relative">The powerful YouTube tools you need to grow your YouTube audience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, index) => (
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

export default YouTubeTools; 