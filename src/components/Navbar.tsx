'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const pathname = usePathname();
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const { openLoginModal, openRegisterModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current && 
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  // Set default language
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg'
          : 'bg-gradient-to-r from-slate-800/95 to-slate-900/95'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent`}>
                SEO Tools
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                      : 'text-gray-200 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Dropdown */}
              <div className="relative" ref={languageDropdownRef}>
                <button 
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-gray-200 hover:bg-slate-700 hover:text-white"
                >
                  <span className="mr-1">{currentLanguage.flag}</span>
                  <span>{currentLanguage.label}</span>
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLanguageOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-slate-700 flex items-center"
                        onClick={() => {
                          // Set the selected language
                          setCurrentLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                      >
                        <span className="mr-2 text-xl">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Auth Links */}
            <div className="ml-6 flex items-center space-x-3">
              <button
                onClick={openLoginModal}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-gray-200 hover:bg-slate-700 hover:text-white"
              >
                Login
              </button>
              <button
                onClick={openRegisterModal}
                className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-md"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                pathname === link.href
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                  : 'text-gray-200 hover:bg-slate-700 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Language Options */}
          <div className="pt-2">
            <p className="px-3 py-1 text-sm font-medium text-gray-400">
              Language
            </p>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  currentLanguage.code === lang.code 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                    : 'text-gray-200 hover:bg-slate-700 hover:text-white'
                }`}
                onClick={() => {
                  // Set the selected language
                  setCurrentLanguage(lang);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="mr-2 text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
          
          {/* Mobile Auth Links */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                openLoginModal();
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                openRegisterModal();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-3 py-2.5 rounded-xl text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 mt-2 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 