'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaCode, FaSearch, FaDesktop, FaWordpress, FaQuestion, FaKeyboard, FaCheck, FaTimes, FaUndo } from 'react-icons/fa';

// Related tools data
const relatedTools = [
  {
    title: 'FAQ Schema Generator',
    description: 'Generate structured FAQ data for better SEO',
    link: '/management-tools/faq-schema-generator',
    icon: <FaQuestion className="w-6 h-6" />,
  },
  {
    title: 'SEO Analyzer',
    description: 'Analyze your website for SEO improvements',
    link: '/management-tools/seo-analyzer',
    icon: <FaSearch className="w-6 h-6" />,
  },
  {
    title: 'Browser Checker',
    description: 'Check browser compatibility and features',
    link: '/management-tools/browser-checker',
    icon: <FaDesktop className="w-6 h-6" />,
  },
  {
    title: 'WordPress Theme Detector',
    description: 'Detect WordPress themes and plugins',
    link: '/management-tools/wordpress-theme-detector',
    icon: <FaWordpress className="w-6 h-6" />,
  },
];

interface SchemaProperty {
  type: string;
  description?: string;
  items?: any;
  properties?: { [key: string]: SchemaProperty };
  required?: string[];
  format?: string;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  enum?: any[];
}

interface JSONSchema {
  $schema: string;
  type: string;
  properties: { [key: string]: SchemaProperty };
  required: string[];
  title?: string;
  description?: string;
}

const JsonToSchemaPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [schema, setSchema] = useState<JSONSchema | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [schemaTitle, setSchemaTitle] = useState('');
  const [schemaDescription, setSchemaDescription] = useState('');
  const [formatDetection, setFormatDetection] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const detectFormat = (value: any): string | undefined => {
    if (!formatDetection) return undefined;
    
    if (typeof value === 'string') {
      // Email format
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
      // Date format
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'date';
      // URL format
      if (/^https?:\/\/.*/.test(value)) return 'uri';
      // Time format
      if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return 'time';
      // UUID format
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) return 'uuid';
    }
    return undefined;
  };

  const inferType = (value: any): string => {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    if (typeof value === 'object') return 'object';
    return typeof value;
  };

  const generateSchema = (json: any): SchemaProperty => {
    const type = inferType(json);
    let schema: SchemaProperty = { type };

    if (type === 'array' && json.length > 0) {
      schema.items = generateSchema(json[0]);
    } else if (type === 'object') {
      schema.properties = {};
      schema.required = [];
      
      Object.entries(json).forEach(([key, value]) => {
        schema.properties![key] = generateSchema(value);
        schema.required!.push(key);
      });
    } else if (type === 'string') {
      const format = detectFormat(json);
      if (format) schema.format = format;
    } else if (type === 'number') {
      if (Number.isInteger(json)) {
        schema.type = 'integer';
      }
    }

    return schema;
  };

  const handleGenerateSchema = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const generatedSchema: JSONSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        title: schemaTitle || undefined,
        description: schemaDescription || undefined,
        properties: generateSchema(parsedJson).properties || {},
        required: Object.keys(parsedJson),
      };
      setSchema(generatedSchema);
      setError('');
      
      // Add to history
      setHistory(prev => [...prev, jsonInput]);
      setCurrentHistoryIndex(prev => prev + 1);
    } catch (err) {
      setError('Invalid JSON input. Please check your JSON syntax.');
      setSchema(null);
    }
  };

  const handleCopy = () => {
    if (schema) {
      navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
      setJsonInput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON input. Please check your JSON syntax.');
    }
  };

  const clearInput = () => {
    setJsonInput('');
    setSchema(null);
    setError('');
  };

  const undoChange = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1);
      setJsonInput(history[currentHistoryIndex - 1]);
    }
  };

  const redoChange = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1);
      setJsonInput(history[currentHistoryIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
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
            Convert JSON data to JSON Schema definitions with advanced validation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-12 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Schema Options */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schema Title
                  </label>
                  <input
                    type="text"
                    value={schemaTitle}
                    onChange={(e) => setSchemaTitle(e.target.value)}
                    placeholder="Enter schema title"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schema Description
                  </label>
                  <input
                    type="text"
                    value={schemaDescription}
                    onChange={(e) => setSchemaDescription(e.target.value)}
                    placeholder="Enter schema description"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatDetection}
                    onChange={(e) => setFormatDetection(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable format detection (email, date, URI, etc.)</span>
                </label>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">JSON Input</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={undoChange}
                    disabled={currentHistoryIndex <= 0}
                    className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-50"
                    title="Undo"
                  >
                    <FaUndo className="w-4 h-4" />
                  </button>
                  <button
                    onClick={formatJson}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Format JSON
                  </button>
                  <button
                    onClick={clearInput}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="relative">
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  rows={12}
                />
                {error && (
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm flex items-center">
                      <FaTimes className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleGenerateSchema}
                  disabled={!jsonInput.trim()}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  <FaCode className="w-5 h-5 mr-2" />
                  Generate Schema
                </button>
              </div>
            </div>

            {/* Schema Output */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Schema</h3>
                {schema && (
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
                  >
                    {copied ? (
                      <>
                        <FaCheck className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FaCode className="w-4 h-4 mr-2" />
                        Copy Schema
                      </>
                    )}
                  </button>
                )}
              </div>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">
                  {schema ? JSON.stringify(schema, null, 2) : 'Generated schema will appear here...'}
                </code>
              </pre>
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About JSON Schema</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Features</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        Smart format detection (email, date, URI)
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
                        Customizable schema metadata
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Use Cases</h4>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        API documentation
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Data validation
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Code generation
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Database schema design
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Configuration validation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-12">
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
                <div className="text-blue-600 mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </Link>
            ))}
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
};

export default JsonToSchemaPage; 