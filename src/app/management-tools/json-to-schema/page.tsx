'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaCode, FaSearch, FaDesktop, FaWordpress, FaQuestion, FaKeyboard } from 'react-icons/fa';

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
}

interface JSONSchema {
  $schema: string;
  type: string;
  properties: { [key: string]: SchemaProperty };
  required: string[];
}

const JsonToSchemaPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [schema, setSchema] = useState<JSONSchema | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
    }

    return schema;
  };

  const handleGenerateSchema = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const generatedSchema: JSONSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: generateSchema(parsedJson).properties || {},
        required: Object.keys(parsedJson),
      };
      setSchema(generatedSchema);
      setError('');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              JSON to JSON Schema Converter
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              Convert your JSON data into a valid JSON Schema. Perfect for API documentation and data validation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON Input</h2>
            <textarea
              className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
            />
            <button
              onClick={handleGenerateSchema}
              className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Schema
            </button>
            {error && (
              <p className="mt-2 text-red-600">{error}</p>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">JSON Schema</h2>
              {schema && (
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Schema'}
                </button>
              )}
            </div>
            <pre className="w-full h-96 p-4 bg-gray-50 border border-gray-300 rounded-md overflow-auto">
              <code className="text-sm">
                {schema ? JSON.stringify(schema, null, 2) : 'Generated schema will appear here...'}
              </code>
            </pre>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About JSON Schema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is JSON Schema?</h3>
              <p className="text-gray-600">
                JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It helps you describe your existing data format and provide clear human- and machine-readable documentation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Use Cases</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>API Documentation</li>
                <li>Data Validation</li>
                <li>Content Validation</li>
                <li>Testing</li>
                <li>Code Generation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Type Inference</li>
                <li>Nested Object Support</li>
                <li>Array Support</li>
                <li>Required Fields</li>
                <li>Schema Validation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="block p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 text-blue-600">
                    {tool.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{tool.title}</h3>
                </div>
                <p className="text-gray-500">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToSchemaPage; 