'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'JSON to Schema',
    description: 'Convert JSON to JSON Schema',
    link: '/management-tools/json-to-schema',
    icon: '📝',
  },
  {
    title: 'Keyword Suggestion',
    description: 'Get keyword ideas for your content',
    link: '/management-tools/keyword-suggestion',
    icon: '🔍',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
  {
    title: 'WordPress Theme Detector',
    description: 'Identify WordPress themes and plugins',
    link: '/management-tools/wordpress-theme-detector',
    icon: '🎨',
  },
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSchemaGeneratorPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([{ id: '1', question: '', answer: '' }]);
  const [schema, setSchema] = useState<string>('');
  const [showInfo, setShowInfo] = useState(true);
  const [copied, setCopied] = useState(false);

  const addFAQ = () => {
    const newId = (faqs.length + 1).toString();
    setFaqs([...faqs, { id: newId, question: '', answer: '' }]);
  };

  const removeFAQ = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const generateSchema = () => {
    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    setSchema(JSON.stringify(schemaObj, null, 2));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const validateFAQs = (): boolean => {
    return faqs.every(faq => faq.question.trim() && faq.answer.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-20 mb-12">
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
                  animation: `float-icon ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              >
                {i % 3 === 0 ? '❓' : i % 3 === 1 ? '📝' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              FAQ Schema <span className="text-yellow-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Generate structured data markup for your FAQ sections
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* FAQ Input Section */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">FAQ #{index + 1}</h3>
                    {faqs.length > 1 && (
                      <button
                        onClick={() => removeFAQ(faq.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                        placeholder="Enter your question"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                        placeholder="Enter your answer"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add FAQ Button */}
              <div className="text-center">
                <button
                  onClick={addFAQ}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  Add Another FAQ
                </button>
              </div>

              {/* Generate Schema Button */}
              <div className="text-center">
                <button
                  onClick={generateSchema}
                  disabled={!validateFAQs()}
                  className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-colors"
                >
                  Generate Schema
                </button>
              </div>
            </div>

            {/* Schema Output */}
            {schema && (
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Generated Schema</h3>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <code>{schema}</code>
                </pre>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Add this schema to your page inside a script tag:</p>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 mt-2 overflow-x-auto">
                    <code>{`<script type="application/ld+json">
${schema}
</script>`}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-yellow-50 rounded-xl p-6 border border-yellow-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About FAQ Schema</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Benefits</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Enhanced search results with FAQ rich snippets
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Improved visibility in search results
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Better user experience with direct answers
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Potential increase in click-through rates
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Best Practices</h4>
                    <div className="bg-white rounded-lg p-4 border border-yellow-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Keep questions concise and clear</li>
                        <li>• Provide detailed, accurate answers</li>
                        <li>• Use natural, conversational language</li>
                        <li>• Include relevant keywords naturally</li>
                        <li>• Update FAQs regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
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
        @keyframes float-icon {
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