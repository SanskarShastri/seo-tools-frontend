'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Related tools data with correct paths
const relatedTools = [
  {
    title: 'Domain Age Checker',
    description: 'Check how old a domain is',
    link: '/tracking-tools/domain-age-checker',
    icon: '📅',
  },
  {
    title: 'Domain Authority Checker',
    description: 'Check domain authority score',
    link: '/tracking-tools/domain-authority-checker',
    icon: '🌐',
  },
  {
    title: 'Google Index Checker',
    description: 'Check if a URL is indexed in Google',
    link: '/tracking-tools/google-index-checker',
    icon: '🔍',
  },
  {
    title: 'Redirect Checker',
    description: 'Check URL redirects and status codes',
    link: '/tracking-tools/redirect-checker',
    icon: '↪️',
  },
];

// Types for the whois result
interface WhoisResult {
  domain: string;
  registrar: string;
  registrationDate: string;
  expiryDate: string;
  updatedDate: string;
  status: string[];
  nameServers: string[];
  domainAge: string;
  privacyProtection: boolean;
  whoisData: string;
}

export default function WhoisDomainLookupPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<WhoisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRawData, setShowRawData] = useState(false);

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!domain.trim()) {
      setError('Please enter a domain name to check');
      return;
    }

    try {
      // Domain validation with regex
      const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      
      // Format domain properly
      let formattedDomain = domain.trim().toLowerCase();
      
      // Remove protocol and path if present
      if (formattedDomain.includes('://')) {
        formattedDomain = formattedDomain.split('://')[1];
      }
      
      // Remove path if present
      if (formattedDomain.includes('/')) {
        formattedDomain = formattedDomain.split('/')[0];
      }
      
      // Remove www. if present
      if (formattedDomain.startsWith('www.')) {
        formattedDomain = formattedDomain.substring(4);
      }
      
      if (!domainPattern.test(formattedDomain)) {
        setError('Please enter a valid domain name (e.g., example.com)');
        return;
      }

      setIsLoading(true);
      setError('');
      setResults(null);

      // In a real application, you would call a backend API here
      // For demo purposes, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate random registration date between 1-20 years ago
        const yearsAgo = Math.floor(Math.random() * 20) + 1;
        const registrationDate = new Date();
        registrationDate.setFullYear(registrationDate.getFullYear() - yearsAgo);
        
        // Generate random expiry date in 1-5 years from now
        const yearsToExpiry = Math.floor(Math.random() * 5) + 1;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + yearsToExpiry);
        
        // Generate random updated date in last year
        const daysAgo = Math.floor(Math.random() * 365);
        const updatedDate = new Date();
        updatedDate.setDate(updatedDate.getDate() - daysAgo);
        
        // Generate random name servers
        const nameServerProviders = ['ns1.example-registrar.com', 'ns2.example-registrar.com', 'ns3.example-registrar.com', 'ns1.backup-registrar.net', 'ns2.backup-registrar.net'];
        const nameServerCount = Math.floor(Math.random() * 3) + 2; // 2-4 name servers
        const shuffledNameServers = [...nameServerProviders].sort(() => 0.5 - Math.random());
        const nameServers = shuffledNameServers.slice(0, nameServerCount);
        
        // Generate random status codes
        const statusOptions = ['clientTransferProhibited', 'clientUpdateProhibited', 'clientDeleteProhibited', 'clientRenewProhibited', 'serverTransferProhibited', 'addPeriod', 'autoRenewPeriod', 'inactive', 'ok'];
        const statusCount = Math.floor(Math.random() * 3) + 1; // 1-3 status codes
        const shuffledStatuses = [...statusOptions].sort(() => 0.5 - Math.random());
        const statuses = shuffledStatuses.slice(0, statusCount);
        
        // List of registrars
        const registrars = ['GoDaddy.com, LLC', 'Namecheap, Inc.', 'Google Domains', 'Amazon Registrar, Inc.', 'Cloudflare, Inc.', 'Network Solutions, LLC', 'Name.com, Inc.', 'Bluehost Inc.', 'Tucows Domains Inc.', 'HostGator'];
        const registrar = registrars[Math.floor(Math.random() * registrars.length)];
        
        // Privacy protection
        const privacyProtection = Math.random() > 0.3; // 70% chance of having privacy protection
        
        // Calculate domain age in years, months, days
        const today = new Date();
        const ageInMilliseconds = today.getTime() - registrationDate.getTime();
        const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
        const years = Math.floor(ageInDays / 365);
        const months = Math.floor((ageInDays % 365) / 30);
        const days = Math.floor((ageInDays % 365) % 30);
        
        // Generate a simulated WHOIS raw data
        const whoisRawData = `Domain Name: ${formattedDomain.toUpperCase()}
Registrar: ${registrar}
Whois Server: whois.${registrar.toLowerCase().replace(', llc', '').replace(', inc.', '').replace(', inc', '').replace(', ', '-').replace(' ', '-').replace('.com', '')}.com
Referral URL: http://www.${registrar.toLowerCase().replace(', llc', '').replace(', inc.', '').replace(', inc', '').replace(', ', '').replace(' ', '')}.com
Name Server: ${nameServers.join('\nName Server: ')}
Status: ${statuses.join('\nStatus: ')}
Updated Date: ${updatedDate.toISOString().split('T')[0]}
Creation Date: ${registrationDate.toISOString().split('T')[0]}
Expiration Date: ${expiryDate.toISOString().split('T')[0]}
>>> Last update of whois database: ${new Date().toISOString().split('T')[0]}T${new Date().toISOString().split('T')[1].split('.')[0]}Z <<<

Domain Name System Security Extensions (DNSSEC): ${Math.random() > 0.5 ? 'Signed' : 'Unsigned'}

For more information on Whois status codes, please visit https://icann.org/epp

NOTICE: The expiration date displayed in this record is the date the
registrar's sponsorship of the domain name registration in the registry is
currently set to expire. This date does not necessarily reflect the expiration
date of the domain name registrant's agreement with the sponsoring
registrar. Users may consult the sponsoring registrar's Whois database to
view the registrar's reported date of expiration for this registration.

TERMS OF USE: You are not authorized to access or query our Whois
database through the use of electronic processes that are high-volume and
automated. Whois database is provided as a service to the internet
community.

The data in the WHOIS database is provided for information purposes only,
and is designed to assist persons in obtaining information related to domain
name registration records. We do not guarantee its accuracy.`;
        
        const result: WhoisResult = {
          domain: formattedDomain,
          registrar,
          registrationDate: registrationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          expiryDate: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          updatedDate: updatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: statuses,
          nameServers,
          domainAge: `${years} years, ${months} months, ${days} days`,
          privacyProtection,
          whoisData: whoisRawData,
        };
        
        setResults(result);
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('An error occurred while checking the domain');
      setIsLoading(false);
    }
  };
  
  // Copy WHOIS data to clipboard
  const copyToClipboard = () => {
    if (results?.whoisData) {
      navigator.clipboard.writeText(results.whoisData)
        .then(() => {
          alert('WHOIS data copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy data to clipboard');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Empty space for fixed navbar */}
      <div className="h-16"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mb-12">
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
                {i % 3 === 0 ? '🔎' : i % 3 === 1 ? '📋' : '🌐'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              WHOIS Domain <span className="text-blue-300">Lookup</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up">
            Check domain registration details, ownership info, and expiration dates
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={checkDomain} className="mb-8">
              <div className="mb-6">
                <label htmlFor="domain" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter a domain name to lookup
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Domain
                  </span>
                  <input
                    type="text"
                    id="domain"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-2.5 border"
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
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Looking up...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      Lookup WHOIS Data
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">WHOIS Results for {results.domain}</h2>
                
                {/* Domain Header */}
                <div className="p-6 rounded-xl border bg-blue-50 border-blue-200 mb-8">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-2 mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700 uppercase tracking-wide font-semibold">Domain</div>
                      <h3 className="text-xl font-bold text-gray-800">{results.domain}</h3>
                    </div>
                  </div>
                </div>
                
                {/* WHOIS Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Registrar</div>
                        <div className="font-medium text-gray-800">{results.registrar}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Registration Date</div>
                        <div className="font-medium text-gray-800">{results.registrationDate}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Expiry Date</div>
                        <div className="font-medium text-gray-800">{results.expiryDate}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Last Updated</div>
                        <div className="font-medium text-gray-800">{results.updatedDate}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Domain Age</div>
                        <div className="font-medium text-gray-800">{results.domainAge}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Privacy Protection</div>
                        <div className="font-medium">
                          {results.privacyProtection ? (
                            <span className="text-green-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              Enabled
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Disabled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Name Servers</div>
                        <ul className="list-disc list-inside text-gray-800">
                          {results.nameServers.map((server, index) => (
                            <li key={index} className="font-medium">{server}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Domain Status</div>
                        <ul className="list-disc list-inside text-gray-800">
                          {results.status.map((status, index) => (
                            <li key={index} className="font-medium">{status}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw WHOIS Data Toggle */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowRawData(!showRawData)}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showRawData ? 'Hide Raw WHOIS Data' : 'Show Raw WHOIS Data'}
                    <svg
                      className={`w-5 h-5 ml-2 transform transition-transform ${showRawData ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Raw WHOIS Data */}
                {showRawData && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Raw WHOIS Data</h3>
                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap bg-gray-800 text-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
                      {results.whoisData}
                    </pre>
                  </div>
                )}

                {/* WHOIS Information Guide */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding WHOIS Information</h3>
                  <p className="text-gray-700 mb-6">
                    WHOIS data provides information about the registration of a domain name, including who owns it, when it was registered, and when it expires. This information is maintained by domain registrars and is publicly accessible (unless privacy protection is enabled).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-4 border border-blue-100">
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key WHOIS Components
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Registrar:</strong> The company that manages the domain registration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Registration Date:</strong> When the domain was originally registered</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Expiry Date:</strong> When the domain registration will expire</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Name Servers:</strong> Servers that direct traffic to the website</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-blue-100">
                      <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Why WHOIS Information Matters
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Domain Acquisition:</strong> Check if a domain is available to purchase</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Verification:</strong> Verify the legitimacy of a website</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Monitoring:</strong> Track domain expiration dates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span><strong>Troubleshooting:</strong> Identify technical contacts for domain issues</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium text-blue-600">Note:</span> Due to privacy laws like GDPR, some WHOIS information may be redacted. Domain privacy services also mask personal information to protect domain owners from spam and identity theft.
                    </p>
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