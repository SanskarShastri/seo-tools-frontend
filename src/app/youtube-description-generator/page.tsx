'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related YouTube tools data
const relatedTools = [
  {
    title: 'YouTube Description Extractor',
    description: 'Extract descriptions from existing videos',
    link: '/youtube-description-extractor',
    icon: '📄',
  },
  {
    title: 'YouTube Embed Code Generator',
    description: 'Generate embed codes for your videos',
    link: '/youtube-embed-code-generator',
    icon: '🔗',
  },
  {
    title: 'YouTube Channel ID',
    description: 'Find channel ID from YouTube URL',
    link: '/youtube-channel-id',
    icon: '🆔',
  },
  {
    title: 'YouTube Video Statistics',
    description: 'View detailed video statistics',
    link: '/youtube-video-statistics',
    icon: '📊',
  },
];

export default function YouTubeDescriptionGeneratorPage() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoKeywords, setVideoKeywords] = useState('');
  const [videoNiche, setVideoNiche] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [error, setError] = useState('');

  const generateDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Here you would make an API call to your backend
      // For demo, we'll simulate an API call
      setTimeout(() => {
        const mockDescription = `🔥 ULTIMATE GUIDE: ${videoTitle} 🔥

In this comprehensive video, I'm sharing everything you need to know about ${videoKeywords}. Whether you're a beginner or advanced, these tips will help you master these techniques!

📌 WHAT YOU'LL LEARN:
• The fundamentals of ${videoKeywords.split(',')[0] || 'this topic'}
• Advanced strategies for better results
• Common mistakes to avoid
• Expert tips and recommendations

⏱️ TIMESTAMPS:
00:00 Introduction
01:23 Getting Started
04:56 Key Techniques
08:32 Advanced Methods
12:45 Final Tips & Advice

👉 RESOURCES MENTIONED:
• Ultimate Guide PDF: https://mywebsite.com/guide
• Recommended Tools: https://mywebsite.com/tools
• Community Forum: https://mywebsite.com/forum

🎁 FREE DOWNLOAD:
Get my complete ${videoNiche} resource pack here: https://mywebsite.com/resources

👍 If you found this video helpful, please give it a LIKE, SHARE with others who might benefit, and SUBSCRIBE for more valuable content!

📱 CONNECT WITH ME:
• Instagram: https://instagram.com/mychannel
• Twitter: https://twitter.com/mychannel
• Website: https://www.mywebsite.com

#${videoNiche.replace(' ', '')} #${videoKeywords.split(',')[0]?.replace(' ', '') || 'Tutorial'} #HowTo`;

        setGeneratedDescription(mockDescription);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to generate description. Please try again.');
      setIsLoading(false);
    }
  };

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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 mb-12">
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
                  animation: `float-desc ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                📝
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube Description <span className="text-yellow-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create engaging and SEO-optimized descriptions for your YouTube videos
          </p>

          {/* Interactive Demo */}
          <div className="max-w-xl mx-auto mt-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-fade-in-delayed">
            <div className="text-left">
              <div className="text-white/60 text-sm mb-2">Example Description Preview</div>
              <div className="text-white text-sm line-clamp-3">
                🔥 ULTIMATE GUIDE: How to Create Engaging Content 🔥
                
                In this comprehensive video, I'm sharing everything you need to know about content creation...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={generateDescription} className="max-w-3xl mx-auto">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Video Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter your video title..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Video Keywords (comma separated)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={videoKeywords}
                  onChange={(e) => setVideoKeywords(e.target.value)}
                  placeholder="content creation, tutorial, beginners guide..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Video Niche
              </label>
              <div className="relative">
                <select
                  value={videoNiche}
                  onChange={(e) => setVideoNiche(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white"
                >
                  <option value="general">General</option>
                  <option value="gaming">Gaming</option>
                  <option value="education">Education</option>
                  <option value="tech">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="travel">Travel</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!videoTitle || isLoading}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                    Generating Description...
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Generate Description
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

          {generatedDescription && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Generated Description</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="whitespace-pre-wrap text-gray-700 font-mono text-sm bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                    {generatedDescription}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {generatedDescription.length} characters
                    </span>
                    <button
                      onClick={() => copyToClipboard(generatedDescription)}
                      className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy Description
                    </button>
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
        @keyframes float-desc {
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