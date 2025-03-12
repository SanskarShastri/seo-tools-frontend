'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Domain Authority Checker',
    description: 'Check domain authority score',
    link: '/tracking-tools/domain-authority-checker',
    icon: '📊',
  },
  {
    title: 'Whois Domain Lookup',
    description: 'Check domain registration details',
    link: '/tracking-tools/whois-domain-lookup',
    icon: '🔎',
  },
  {
    title: 'Google Index Checker',
    description: 'Check if your URL is indexed by Google',
    link: '/tracking-tools/google-index-checker',
    icon: '🔍',
  },
  {
    title: 'Moz Rank Checker',
    description: 'Check Moz rank for any domain',
    link: '/tracking-tools/moz-rank-checker',
    icon: '📈',
  },
];

interface DomainAgeResult {
  domain: string;
  registrationDate: string;
  age: {
    years: number;
    months: number;
    days: number;
  };
  registrar?: string;
  expiryDate?: string;
  domainStatus?: string;
}

export default function DomainAgeCheckerPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<DomainAgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDomainAge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!domain.trim()) {
      setError('Please enter a domain to check');
      return;
    }

    try {
      // Domain validation with regex
      const domainPattern = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/;
      // Extract domain name if a URL was entered
      const domainName = domain.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];
      
      if (!domainPattern.test(domainName)) {
        setError('Please enter a valid domain (e.g., example.com)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate a random registration date between 1 and 25 years ago
        const now = new Date();
        const yearsAgo = Math.floor(Math.random() * 24) + 1; // 1 to 25 years
        const monthsAgo = Math.floor(Math.random() * 12); // 0 to 11 months
        const daysAgo = Math.floor(Math.random() * 30); // 0 to 29 days
        
        const registrationDate = new Date();
        registrationDate.setFullYear(now.getFullYear() - yearsAgo);
        registrationDate.setMonth(now.getMonth() - monthsAgo);
        registrationDate.setDate(now.getDate() - daysAgo);
        
        // Generate a random expiry date in the future
        const yearsToExpiry = Math.floor(Math.random() * 5) + 1; // 1 to 5 years
        const expiryDate = new Date();
        expiryDate.setFullYear(now.getFullYear() + yearsToExpiry);
        
        // Domain registrars
        const registrars = [
          'GoDaddy.com, LLC',
          'Namecheap, Inc.',
          'Amazon Registrar, Inc.',
          'Google LLC',
          'Tucows Domains Inc.',
          'NameSilo, LLC',
          'Network Solutions, LLC',
          'OVH SAS',
          'Dynadot, LLC',
          'Cloudflare, Inc.'
        ];
        
        // Domain statuses
        const statuses = [
          'clientTransferProhibited',
          'clientUpdateProhibited',
          'clientDeleteProhibited',
          'clientRenewProhibited',
          'ok'
        ];
        
        const result: DomainAgeResult = {
          domain: domainName,
          registrationDate: registrationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          age: {
            years: yearsAgo,
            months: monthsAgo,
            days: daysAgo
          },
          registrar: registrars[Math.floor(Math.random() * registrars.length)],
          expiryDate: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          domainStatus: statuses[Math.floor(Math.random() * statuses.length)]
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the domain age');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '📅' : i % 3 === 1 ? '🕒' : '🔍'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Domain Age <span className="text-purple-300">Checker</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Find out how old a domain is and when it was first registered
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkDomainAge} className="mb-8">
              <div className="mb-6">
                <label htmlFor="domain" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a domain to check its age
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Domain
                  </span>
                  <input
                    type="text"
                    id="domain"
                    className="focus:ring-purple-500 focus:border-purple-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a domain name without http:// or www (e.g., example.com)
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || !domain.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Check Domain Age
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {results && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Domain Age Results</h2>
                
                <div className="p-6 rounded-xl border bg-purple-50 border-purple-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-purple-700 uppercase tracking-wide font-semibold">Domain</div>
                      <h3 className="text-2xl font-bold text-gray-800">{results.domain}</h3>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="text-sm text-gray-500 mb-1">Registration Date</div>
                        <div className="text-xl font-bold text-gray-800">{results.registrationDate}</div>
                      </div>
                      <div className="flex-shrink-0 bg-purple-100 rounded-lg px-4 py-2">
                        <div className="text-sm text-purple-700 uppercase tracking-wide font-semibold">Domain Age</div>
                        <div className="text-xl font-bold text-purple-700">
                          {results.age.years > 0 ? `${results.age.years} year${results.age.years !== 1 ? 's' : ''}` : ''}
                          {results.age.months > 0 ? ` ${results.age.months} month${results.age.months !== 1 ? 's' : ''}` : ''}
                          {results.age.years === 0 && results.age.months === 0 ? `${results.age.days} day${results.age.days !== 1 ? 's' : ''}` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Registrar</div>
                      <div className="font-semibold text-gray-800">{results.registrar}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Expiry Date</div>
                      <div className="font-semibold text-gray-800">{results.expiryDate}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                      <div className="text-sm text-gray-500 mb-1">Domain Status</div>
                      <div className="font-semibold text-gray-800">{results.domainStatus}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-purple-100 mb-4">
                    <div className="text-purple-700 font-semibold mb-2">Domain Age Score</div>
                    <div className="flex items-center">
                      <div className="flex-1 h-3 rounded-full bg-gray-200 mr-2">
                        <div 
                          className={`h-3 rounded-full ${
                            results.age.years < 2 ? 'bg-red-500' : 
                            results.age.years < 5 ? 'bg-yellow-500' : 
                            results.age.years < 10 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(results.age.years * 4, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 w-14">
                        {results.age.years < 2 ? 'New' : 
                         results.age.years < 5 ? 'Young' : 
                         results.age.years < 10 ? 'Mature' : 'Established'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Domain Age Importance */}
                <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Domain Age Matters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Trust & Credibility</h4>
                        <p className="text-gray-600 text-sm">Older domains often signal established businesses and are generally considered more trustworthy by both users and search engines.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">SEO Benefits</h4>
                        <p className="text-gray-600 text-sm">While not the most critical factor, domain age can positively influence search rankings as part of a broader set of trust signals.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Backlink History</h4>
                        <p className="text-gray-600 text-sm">Older domains have had more time to accumulate quality backlinks, which can positively impact SEO performance.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-gray-800 mb-1">Competitive Analysis</h4>
                        <p className="text-gray-600 text-sm">Knowing your competitors' domain ages helps understand their potential authority advantages in your market.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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