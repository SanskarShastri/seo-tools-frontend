'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data
const relatedTools = [
  {
    title: 'Credit Card Generator',
    description: 'Generate test credit card numbers',
    link: '/management-tools/credit-card-generator',
    icon: '💳',
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
  pattern: RegExp;
  format: RegExp;
  length: number[];
  cvvLength: number;
  icon: string;
  color: string;
}

const cardTypes: CardType[] = [
  {
    name: 'Visa',
    pattern: /^4/,
    format: /(\d{1,4})/g,
    length: [13, 16],
    cvvLength: 3,
    icon: '💳',
    color: 'blue',
  },
  {
    name: 'Mastercard',
    pattern: /^(5[1-5]|2[2-7])/,
    format: /(\d{1,4})/g,
    length: [16],
    cvvLength: 3,
    icon: '💳',
    color: 'red',
  },
  {
    name: 'American Express',
    pattern: /^3[47]/,
    format: /(\d{1,4})/g,
    length: [15],
    cvvLength: 4,
    icon: '💳',
    color: 'green',
  },
  {
    name: 'Discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: /(\d{1,4})/g,
    length: [16],
    cvvLength: 3,
    icon: '💳',
    color: 'orange',
  },
];

interface ValidationResult {
  isValid: boolean;
  cardType: CardType | null;
  error?: string;
  formattedNumber?: string;
}

export default function CreditCardValidatorPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  const formatCardNumber = (number: string): string => {
    const digits = number.replace(/\D/g, '');
    const cardType = detectCardType(digits);
    
    if (!cardType) {
      return digits;
    }

    const matches = digits.match(cardType.format);
    if (!matches) {
      return digits;
    }

    return matches.join(' ');
  };

  const detectCardType = (number: string): CardType | null => {
    return cardTypes.find(type => type.pattern.test(number)) || null;
  };

  const validateLuhn = (number: string): boolean => {
    const digits = number.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    // Loop through values starting from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateCard = () => {
    const digits = cardNumber.replace(/\D/g, '');
    
    if (!digits) {
      setValidationResult({
        isValid: false,
        cardType: null,
        error: 'Please enter a card number',
      });
      return;
    }

    const cardType = detectCardType(digits);
    
    if (!cardType) {
      setValidationResult({
        isValid: false,
        cardType: null,
        error: 'Unrecognized card type',
      });
      return;
    }

    if (!cardType.length.includes(digits.length)) {
      setValidationResult({
        isValid: false,
        cardType,
        error: `${cardType.name} numbers must be ${cardType.length.join(' or ')} digits long`,
      });
      return;
    }

    const isValidLuhn = validateLuhn(digits);
    
    setValidationResult({
      isValid: isValidLuhn,
      cardType,
      error: isValidLuhn ? undefined : 'Invalid card number (fails Luhn check)',
      formattedNumber: formatCardNumber(digits),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatCardNumber(input);
    setCardNumber(formatted);
    setValidationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '💳' : i % 3 === 1 ? '✅' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Credit Card <span className="text-indigo-300">Validator</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Validate credit card numbers and identify card types
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            {/* Validator Input */}
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 mb-8">
              <div className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Enter Credit Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleInputChange}
                  placeholder="Enter card number (spaces allowed)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={validateCard}
                  disabled={!cardNumber}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  Validate Card
                </button>
              </div>
            </div>

            {/* Validation Result */}
            {validationResult && (
              <div className={`bg-${validationResult.isValid ? 'green' : 'red'}-50 rounded-xl p-6 border border-${validationResult.isValid ? 'green' : 'red'}-100 mb-8`}>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">
                    {validationResult.isValid ? '✅' : '❌'}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {validationResult.isValid ? 'Valid Card' : 'Invalid Card'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {validationResult.cardType && (
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium mr-2">Card Type:</span>
                      <span>{validationResult.cardType.name}</span>
                    </div>
                  )}
                  {validationResult.formattedNumber && (
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium mr-2">Formatted Number:</span>
                      <span className="font-mono">{validationResult.formattedNumber}</span>
                    </div>
                  )}
                  {validationResult.error && (
                    <div className="text-red-600">
                      {validationResult.error}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Supported Card Types */}
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Card Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardTypes.map((type) => (
                  <div
                    key={type.name}
                    className="bg-white p-4 rounded-lg border border-indigo-200"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{type.icon}</span>
                      <span className="font-medium text-gray-900">{type.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Length: {type.length.join(', ')} digits
                    </div>
                    <div className="text-sm text-gray-600">
                      CVV: {type.cvvLength} digits
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Information Section */}
            <div className="mt-12 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">About Credit Card Validation</h3>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {showInfo ? 'Hide' : 'Show'}
                </button>
              </div>
              {showInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Validation Process</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Card type detection based on prefix
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Length validation for each card type
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Luhn algorithm checksum verification
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Automatic number formatting
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">The Luhn Algorithm</h4>
                    <div className="bg-white rounded-lg p-4 border border-indigo-100">
                      <p className="text-sm text-gray-600 mb-4">
                        The Luhn algorithm, also known as the "modulus 10" algorithm, is a checksum formula used to validate various identification numbers, including credit card numbers.
                      </p>
                      <div className="text-sm text-gray-600">
                        <strong>Steps:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Double every second digit from right to left</li>
                          <li>If doubling results in a two-digit number, add those digits together</li>
                          <li>Add all single digits together</li>
                          <li>The total should be divisible by 10</li>
                        </ol>
                      </div>
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
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-violet-600 mx-auto rounded-full"></div>
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
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
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