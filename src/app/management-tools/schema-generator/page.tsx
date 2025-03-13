'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Meta Tag Generator',
    description: 'Generate meta tags for your website',
    link: '/management-tools/meta-tag-generator',
    icon: '🏷️',
  },
  {
    title: 'Robots.txt Generator',
    description: 'Create robots.txt files',
    link: '/management-tools/robots-txt-generator',
    icon: '🤖',
  },
  {
    title: 'Sitemap Generator',
    description: 'Create XML sitemaps for your website',
    link: '/management-tools/sitemap-generator',
    icon: '🗺️',
  },
  {
    title: '.htaccess Generator',
    description: 'Generate .htaccess files',
    link: '/management-tools/htaccess-generator',
    icon: '⚙️',
  },
];

interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface SchemaType {
  name: string;
  description: string;
  fields: SchemaField[];
}

const schemaTypes: SchemaType[] = [
  {
    name: 'Article',
    description: 'News, blog posts, or other articles',
    fields: [
      { name: 'headline', type: 'string', required: true, description: 'The headline of the article' },
      { name: 'author', type: 'string', required: true, description: 'The author of the article' },
      { name: 'datePublished', type: 'date', required: true, description: 'The date the article was published' },
      { name: 'image', type: 'url', required: false, description: 'URL of an image associated with the article' },
      { name: 'description', type: 'text', required: false, description: 'A brief description of the article' },
      { name: 'articleBody', type: 'text', required: false, description: 'The actual content of the article' },
      { name: 'publisher', type: 'string', required: false, description: 'The publisher of the article' },
      { name: 'keywords', type: 'string', required: false, description: 'Keywords describing the article' },
    ],
  },
  {
    name: 'Product',
    description: 'Products or services',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'The name of the product' },
      { name: 'description', type: 'text', required: true, description: 'Description of the product' },
      { name: 'price', type: 'number', required: true, description: 'The price of the product' },
      { name: 'priceCurrency', type: 'string', required: true, description: 'The currency (e.g., USD)' },
      { name: 'image', type: 'url', required: false, description: 'URL of the product image' },
      { name: 'brand', type: 'string', required: false, description: 'The brand name' },
      { name: 'sku', type: 'string', required: false, description: 'Stock keeping unit' },
      { name: 'availability', type: 'string', required: false, description: 'Product availability status' },
      { name: 'condition', type: 'string', required: false, description: 'Condition of the product' },
      { name: 'rating', type: 'number', required: false, description: 'Product rating (1-5)' },
    ],
  },
  {
    name: 'LocalBusiness',
    description: 'Local businesses and organizations',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'Business name' },
      { name: 'address', type: 'text', required: true, description: 'Physical address' },
      { name: 'telephone', type: 'string', required: true, description: 'Contact phone number' },
      { name: 'openingHours', type: 'text', required: false, description: 'Business hours' },
      { name: 'priceRange', type: 'string', required: false, description: 'Price range (e.g., $$$)' },
      { name: 'image', type: 'url', required: false, description: 'Business image URL' },
      { name: 'description', type: 'text', required: false, description: 'Business description' },
      { name: 'email', type: 'string', required: false, description: 'Contact email' },
      { name: 'website', type: 'url', required: false, description: 'Business website' },
      { name: 'paymentAccepted', type: 'string', required: false, description: 'Accepted payment methods' },
    ],
  },
  {
    name: 'Event',
    description: 'Events and activities',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'Event name' },
      { name: 'startDate', type: 'date', required: true, description: 'Start date and time' },
      { name: 'location', type: 'text', required: true, description: 'Event location' },
      { name: 'description', type: 'text', required: false, description: 'Event description' },
      { name: 'endDate', type: 'date', required: false, description: 'End date and time' },
      { name: 'price', type: 'number', required: false, description: 'Ticket price' },
      { name: 'image', type: 'url', required: false, description: 'Event image URL' },
      { name: 'performer', type: 'string', required: false, description: 'Performer name' },
      { name: 'organizer', type: 'string', required: false, description: 'Event organizer' },
      { name: 'eventStatus', type: 'string', required: false, description: 'Event status' },
    ],
  },
  {
    name: 'Recipe',
    description: 'Cooking and food recipes',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'Recipe name' },
      { name: 'author', type: 'string', required: true, description: 'Recipe author' },
      { name: 'description', type: 'text', required: true, description: 'Recipe description' },
      { name: 'image', type: 'url', required: false, description: 'Recipe image URL' },
      { name: 'prepTime', type: 'string', required: false, description: 'Preparation time (e.g., PT15M)' },
      { name: 'cookTime', type: 'string', required: false, description: 'Cooking time (e.g., PT1H)' },
      { name: 'recipeYield', type: 'string', required: false, description: 'Number of servings' },
      { name: 'recipeIngredient', type: 'text', required: false, description: 'List of ingredients' },
      { name: 'recipeInstructions', type: 'text', required: false, description: 'Cooking instructions' },
      { name: 'nutrition', type: 'text', required: false, description: 'Nutritional information' },
    ],
  },
  {
    name: 'FAQPage',
    description: 'Frequently asked questions page',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'FAQ page title' },
      { name: 'description', type: 'text', required: true, description: 'FAQ page description' },
      { name: 'questions', type: 'text', required: true, description: 'Questions and answers (JSON array)' },
      { name: 'mainEntity', type: 'text', required: false, description: 'Main entity being described' },
      { name: 'dateModified', type: 'date', required: false, description: 'Last modified date' },
    ],
  },
];

export default function SchemaGeneratorPage() {
  const [selectedType, setSelectedType] = useState<SchemaType | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [copied, setCopied] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showTestingTools, setShowTestingTools] = useState(false);

  const handleTypeSelect = (type: SchemaType) => {
    setSelectedType(type);
    setFormData({});
    setGeneratedSchema('');
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const validateForm = () => {
    if (!selectedType) return false;

    const errors: string[] = [];
    selectedType.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors.push(`${field.name} is required`);
      }

      if (formData[field.name]) {
        if (field.type === 'url' && !isValidUrl(formData[field.name])) {
          errors.push(`${field.name} must be a valid URL`);
        }
        if (field.type === 'number' && !isValidNumber(formData[field.name])) {
          errors.push(`${field.name} must be a valid number`);
        }
        if (field.type === 'date' && !isValidDate(formData[field.name])) {
          errors.push(`${field.name} must be a valid date`);
        }
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidNumber = (num: string): boolean => {
    return !isNaN(parseFloat(num));
  };

  const isValidDate = (date: string): boolean => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  };

  const generateSchema = () => {
    if (!validateForm()) {
      return;
    }

    if (!selectedType) return;

    const schemaData: { [key: string]: any } = {
      '@context': 'https://schema.org',
      '@type': selectedType.name,
    };

    selectedType.fields.forEach(field => {
      if (formData[field.name]) {
        if (field.type === 'number') {
          schemaData[field.name] = parseFloat(formData[field.name]);
        } else if (field.type === 'date') {
          schemaData[field.name] = new Date(formData[field.name]).toISOString();
        } else if (field.name === 'questions' && selectedType.name === 'FAQPage') {
          try {
            const questions = JSON.parse(formData[field.name]);
            schemaData.mainEntity = questions.map((q: any) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer
              }
            }));
          } catch (e) {
            setValidationErrors([...validationErrors, 'Questions must be valid JSON']);
            return;
          }
        } else {
          schemaData[field.name] = formData[field.name];
        }
      }
    });

    setGeneratedSchema(JSON.stringify(schemaData, null, 2));
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const downloadSchema = () => {
    const blob = new Blob([generatedSchema], { type: 'application/ld+json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📝' : i % 3 === 1 ? '🔍' : '🎯'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Schema Markup <span className="text-purple-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Create JSON-LD schema markup for better search engine visibility
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Show Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-200">
                <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Schema Type Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {schemaTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => handleTypeSelect(type)}
                  className={`p-6 rounded-xl border transition-all duration-300 text-left hover:shadow-lg ${
                    selectedType?.name === type.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>

            {/* Schema Form */}
            {selectedType && (
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedType.name} Schema Details
                    </h3>
                    <button
                      onClick={() => setShowTestingTools(!showTestingTools)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      {showTestingTools ? 'Hide Testing Tools' : 'Show Testing Tools'}
                    </button>
                  </div>

                  {showTestingTools && (
                    <div className="mb-6 p-4 bg-white rounded-lg border border-purple-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Testing Tools</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                          href="https://search.google.com/test/rich-results"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all"
                        >
                          <div className="text-2xl mr-4">🔍</div>
                          <div>
                            <h5 className="font-medium text-gray-900">Google Rich Results Test</h5>
                            <p className="text-sm text-gray-600">Test your schema markup</p>
                          </div>
                        </a>
                        <a
                          href="https://validator.schema.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all"
                        >
                          <div className="text-2xl mr-4">✅</div>
                          <div>
                            <h5 className="font-medium text-gray-900">Schema Markup Validator</h5>
                            <p className="text-sm text-gray-600">Validate your schema markup</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedType.fields.map((field) => (
                      <div key={field.name} className={field.type === 'text' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.name}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.type === 'text' ? (
                          <textarea
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            rows={3}
                            placeholder={field.description}
                          />
                        ) : field.type === 'date' ? (
                          <input
                            type="datetime-local"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          />
                        ) : (
                          <input
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            placeholder={field.description}
                            step={field.type === 'number' ? 'any' : undefined}
                          />
                        )}
                        <p className="mt-1 text-sm text-gray-500">{field.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={generateSchema}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Generate Schema
                  </button>
                </div>
              </div>
            )}

            {/* Preview Section */}
            {showPreview && generatedSchema && (
              <div className="mt-8 p-4 bg-gray-800 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Preview</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-3 py-1 text-sm text-gray-300 hover:text-white"
                    >
                      Hide Preview
                    </button>
                  </div>
                </div>
                <pre className="text-gray-100 font-mono text-sm overflow-x-auto p-4 bg-gray-900 rounded-lg">
                  {generatedSchema}
                </pre>
              </div>
            )}

            {/* Generated Schema */}
            {generatedSchema && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generated Schema</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadSchema}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                  {generatedSchema}
                </pre>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Schema Markup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">What is Schema Markup?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Schema markup is a code (semantic vocabulary) that you put on your website to help search engines return more informative results for users. It helps search engines understand the context of your content.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <h5 className="font-medium text-gray-800 mb-2">Benefits</h5>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>Enhanced Search Results</li>
                      <li>Better Click-Through Rates</li>
                      <li>Improved SEO Performance</li>
                      <li>Rich Snippets in Search Results</li>
                      <li>Better Content Understanding</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Implementation Tips</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Place the JSON-LD script in the head section of your HTML
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Test your markup using Google's Rich Results Test
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Keep your schema markup up to date
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Use the most specific schema type possible
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Tools</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
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