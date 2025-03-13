'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'FAQ Schema Generator',
    description: 'Generate FAQ schema markup',
    link: '/management-tools/faq-schema-generator',
    icon: '❓',
  },
  {
    title: 'DNS Record Checker',
    description: 'Check DNS records of any domain',
    link: '/management-tools/dns-record-checker',
    icon: '🌐',
  },
  {
    title: 'HTTP Headers',
    description: 'View HTTP response headers',
    link: '/management-tools/http-headers',
    icon: '📋',
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze website SEO metrics',
    link: '/management-tools/seo-analyzer',
    icon: '📊',
  },
];

interface SchemaOptions {
  title: string;
  description: string;
  required: boolean;
  examples: boolean;
  defaultValues: boolean;
}

export default function JsonToSchemaPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [schema, setSchema] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [options, setOptions] = useState<SchemaOptions>({
    title: '',
    description: '',
    required: true,
    examples: true,
    defaultValues: true,
  });

  const generateSchema = () => {
    try {
      // Parse JSON input
      const jsonData = JSON.parse(jsonInput);
      
      // Generate schema
      const schema = generateJsonSchema(jsonData, options);
      
      // Format and set schema
      setSchema(JSON.stringify(schema, null, 2));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setSchema('');
    }
  };

  const generateJsonSchema = (data: any, options: SchemaOptions): any => {
    const schema: any = {
      $schema: 'http://json-schema.org/draft-07/schema#',
    };

    if (options.title) {
      schema.title = options.title;
    }

    if (options.description) {
      schema.description = options.description;
    }

    // Add type and properties based on data type
    if (Array.isArray(data)) {
      schema.type = 'array';
      if (data.length > 0) {
        schema.items = generateJsonSchema(data[0], options);
      }
      if (options.examples && data.length > 0) {
        schema.examples = [data.slice(0, 2)];
      }
    } else if (data === null) {
      schema.type = 'null';
    } else {
      switch (typeof data) {
        case 'object':
          schema.type = 'object';
          schema.properties = {};
          if (options.required) {
            schema.required = [];
          }
          
          for (const [key, value] of Object.entries(data)) {
            schema.properties[key] = generateJsonSchema(value, options);
            if (options.required) {
              schema.required.push(key);
            }
          }
          
          if (options.examples) {
            schema.examples = [data];
          }
          break;
          
        case 'string':
          schema.type = 'string';
          if (options.defaultValues) {
            schema.default = data;
          }
          break;
          
        case 'number':
          schema.type = data % 1 === 0 ? 'integer' : 'number';
          if (options.defaultValues) {
            schema.default = data;
          }
          break;
          
        case 'boolean':
          schema.type = 'boolean';
          if (options.defaultValues) {
            schema.default = data;
          }
          break;
          
        default:
          schema.type = typeof data;
      }
    }

    return schema;
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

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📝' : i % 3 === 1 ? '🔄' : '⚙️'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              JSON to <span className="text-blue-300">Schema</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Convert JSON data to JSON Schema definitions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Options */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schema Title
                  </label>
                  <input
                    type="text"
                    value={options.title}
                    onChange={(e) => setOptions({ ...options, title: e.target.value })}
                    placeholder="Enter schema title"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schema Description
                  </label>
                  <input
                    type="text"
                    value={options.description}
                    onChange={(e) => setOptions({ ...options, description: e.target.value })}
                    placeholder="Enter schema description"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.required}
                    onChange={(e) => setOptions({ ...options, required: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include required fields</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.examples}
                    onChange={(e) => setOptions({ ...options, examples: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include examples</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.defaultValues}
                    onChange={(e) => setOptions({ ...options, defaultValues: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include default values</span>
                </label>
              </div>
            </div>

            {/* JSON Input */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">JSON Input</h3>
                <button
                  onClick={formatJson}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700"
                >
                  Format JSON
                </button>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON here..."
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {error && (
                <div className="mt-2 text-red-600 text-sm">{error}</div>
              )}
              <div className="mt-4">
                <button
                  onClick={generateSchema}
                  disabled={!jsonInput.trim()}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  Generate Schema
                </button>
              </div>
            </div>

            {/* Schema Output */}
            {schema && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Schema</h3>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <code>{schema}</code>
                </pre>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About JSON Schema</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Features</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Automatic type detection and validation
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Support for nested objects and arrays
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Examples and default values
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          Required field specification
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Use Cases</h4>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• API documentation</li>
                        <li>• Data validation</li>
                        <li>• Code generation</li>
                        <li>• Database schema design</li>
                        <li>• Configuration validation</li>
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
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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