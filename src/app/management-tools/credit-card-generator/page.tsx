'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Credit Card Validator',
    description: 'Validate credit card numbers',
    link: '/management-tools/credit-card-validator',
    icon: '✅',
  },
  {
    title: 'Password Generator',
    description: 'Generate secure passwords',
    link: '/management-tools/password-generator',
    icon: '🔐',
  },
  {
    title: 'Hash Generator',
    description: 'Generate hash values',
    link: '/management-tools/hash-generator',
    icon: '🔒',
  },
  {
    title: 'UUID Generator',
    description: 'Generate unique identifiers',
    link: '/management-tools/uuid-generator',
    icon: '🎲',
  },
];

interface CardType {
  name: string;
  prefix: string[];
  length: number[];
  icon: string;
  color: string;
}

const cardTypes: CardType[] = [
  {
    name: 'Visa',
    prefix: ['4'],
    length: [13, 16],
    icon: '💳',
    color: 'blue',
  },
  {
    name: 'Mastercard',
    prefix: ['51', '52', '53', '54', '55'],
    length: [16],
    icon: '💳',
    color: 'red',
  },
  {
    name: 'American Express',
    prefix: ['34', '37'],
    length: [15],
    icon: '💳',
    color: 'green',
  },
  {
    name: 'Discover',
    prefix: ['6011', '644', '645', '646', '647', '648', '649', '65'],
    length: [16],
    icon: '💳',
    color: 'orange',
  },
];

interface GeneratedCard {
  number: string;
  type: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}

export default function CreditCardGeneratorPage() {
  const [selectedType, setSelectedType] = useState<string>('random');
  const [quantity, setQuantity] = useState<number>(1);
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generateLuhn = (partial: string): string => {
    let sum = 0;
    let isEven = false;

    // Calculate Luhn sum
    for (let i = partial.length - 1; i >= 0; i--) {
      let digit = parseInt(partial[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    // Calculate check digit
    const checkDigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    return partial + checkDigit.toString();
  };

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateCard = (type?: CardType): GeneratedCard => {
    const cardType = type || cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const prefix = cardType.prefix[Math.floor(Math.random() * cardType.prefix.length)];
    const length = cardType.length[Math.floor(Math.random() * cardType.length.length)];
    
    // Generate random digits
    let number = prefix;
    const remainingLength = length - prefix.length - 1; // -1 for check digit
    for (let i = 0; i < remainingLength; i++) {
      number += Math.floor(Math.random() * 10).toString();
    }

    // Add Luhn check digit
    number = generateLuhn(number);

    // Generate expiry date (between now and 4 years from now)
    const now = new Date();
    const month = generateRandomNumber(1, 12).toString().padStart(2, '0');
    const year = generateRandomNumber(
      now.getFullYear(),
      now.getFullYear() + 4
    ).toString().slice(-2);

    // Generate CVV
    const cvv = Array(cardType.name === 'American Express' ? 4 : 3)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join('');

    return {
      number,
      type: cardType.name,
      cvv,
      expiryMonth: month,
      expiryYear: year,
    };
  };

  const generateCards = () => {
    const cards: GeneratedCard[] = [];
    const type = selectedType === 'random' ? undefined : cardTypes.find(t => t.name === selectedType);

    for (let i = 0; i < quantity; i++) {
      cards.push(generateCard(type));
    }

    setGeneratedCards(cards);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (number: string): string => {
    const chunks = [];
    let i = 0;
    while (i < number.length) {
      chunks.push(number.slice(i, i + 4));
      i += 4;
    }
    return chunks.join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '💳' : i % 3 === 1 ? '🔢' : '✨'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Credit Card <span className="text-violet-300">Generator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Generate valid credit card numbers for testing purposes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Generator Options */}
            <div className="bg-violet-50 rounded-xl p-6 border border-violet-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Generator Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="random">Random</option>
                    {cardTypes.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Cards
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-6">
                <button
                  onClick={generateCards}
                  className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
                >
                  Generate Cards
                </button>
              </div>
            </div>

            {/* Generated Cards */}
            {generatedCards.length > 0 && (
              <div className="bg-violet-50 rounded-xl p-6 border border-violet-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Generated Cards</h3>
                <div className="space-y-4">
                  {generatedCards.map((card, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 border border-violet-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💳</span>
                            <span className="font-medium text-gray-900">{card.type}</span>
                          </div>
                          <div className="font-mono text-lg text-gray-700">
                            {formatCardNumber(card.number)}
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>Expiry: {card.expiryMonth}/{card.expiryYear}</span>
                            <span>CVV: {card.cvv}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(card.number)}
                          className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
                        >
                          {copied ? 'Copied!' : 'Copy Number'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Information Section */}
            <div className="mt-12 bg-violet-50 rounded-xl p-6 border border-violet-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About Credit Card Generator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Features</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-violet-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Generate valid card numbers using Luhn algorithm
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-violet-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Support for multiple card types
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-violet-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Generate multiple cards at once
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-violet-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Easy copy to clipboard functionality
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Important Note</h4>
                  <div className="bg-white rounded-lg p-4 border border-violet-100">
                    <p className="text-sm text-gray-600 mb-4">
                      These generated card numbers are for testing purposes only. They follow the format and validation rules of real credit cards but cannot be used for actual transactions.
                    </p>
                    <div className="text-sm text-gray-600">
                      <strong>Common Uses:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Testing e-commerce platforms</li>
                        <li>Validating payment forms</li>
                        <li>Development and QA testing</li>
                        <li>Educational purposes</li>
                      </ul>
                    </div>
                  </div>
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
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-purple-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium"
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