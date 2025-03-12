import Hero from '@/components/Hero';
import YouTubeTools from '@/components/YouTubeTools';
import TextAnalysisTools from '@/components/TextAnalysisTools';
import WebsiteTrackingTools from '@/components/WebsiteTrackingTools';
import WebsiteManagementTools from '@/components/WebsiteManagementTools';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="space-y-4">
        <YouTubeTools />
        <TextAnalysisTools />
        <WebsiteTrackingTools />
        <WebsiteManagementTools />
      </div>

      {/* CEO Message Section - Compact Version */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-blue-500" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row">
              {/* CEO Image Side */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-teal-50 p-6 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-5 transform transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full animate-pulse-slow"></div>
                  <div className="absolute inset-1 bg-white rounded-full overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80" 
                      alt="Alex Johnson - CEO" 
                      width={256} 
                      height={256} 
                      className="w-full h-full object-cover rounded-full" 
                      priority
                      unoptimized
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">Alex Johnson</h3>
                <p className="text-blue-600 font-medium text-sm mb-4">Founder & CEO</p>
                
                <div className="flex justify-center space-x-4 mb-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                
                <div className="px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100 text-xs font-medium text-blue-600">
                  15+ Years in SEO
                </div>
              </div>
              
              {/* Message Side */}
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Leadership Message</h2>
                </div>
                
                <div className="relative mb-8 pl-6">
                  <svg className="absolute top-0 left-0 h-6 w-6 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      At <span className="font-semibold text-blue-600">SEO Tools</span>, we're democratizing search engine optimization so every business can be discovered online, regardless of size or technical expertise.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Our tools transform complex SEO data into actionable insights that drive real business outcomes. What sets us apart is our unwavering commitment to your success—we provide solutions that help you connect authentically with your audience in today's competitive digital landscape.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-5 border-t border-gray-100">
                  <div className="mb-6 sm:mb-0">
                    <div className="relative h-10 w-32">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" className="h-full">
                        <path d="M20 40 C 40 10, 60 10, 80 40" stroke="#3B82F6" strokeWidth="2" fill="transparent"/>
                        <text x="50" y="30" fontFamily="cursive" fontSize="16" fill="#3B82F6" textAnchor="middle">Alex Johnson</text>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">10K+</div>
                      <p className="text-xs text-gray-600 mt-1">Customers</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">15+</div>
                      <p className="text-xs text-gray-600 mt-1">Years</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-500">24/7</div>
                      <p className="text-xs text-gray-600 mt-1">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="mb-4">
            <svg className="h-8 w-8 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-700 font-medium">
              Copyrights © 2025. All Rights Reserved by <a href="https://webbuddy.agency" className="text-blue-600 hover:text-blue-800 transition-colors">Webbuddy.agency</a>
            </p>
            
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <span>crafted with</span>
              <svg className="h-4 w-4 text-red-500 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>by <a href="https://webbuddy.agency" className="text-blue-600 hover:text-blue-800 transition-colors">webbuddy.agency</a></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
