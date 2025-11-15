import React, { useState } from 'react';
import CompanyProfile from './CompanyProfile';

const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10 border-b border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-blue-600">
            TrustHoop
          </a>
        </div>
        <nav className="hidden md:flex md:items-center md:space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Employers</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Recruiters</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">About</a>
        </nav>
        <div>
          <a
            href="#"
            className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            aria-label="Sign up for an account"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </header>
);

const Hero: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  return (
    <section className="pt-32 pb-20 text-center bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Job search with <span className="text-blue-600">confidence</span>.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          Make informed career decisions with our evidence-backed Trust Score for any employer or recruiter in India.
        </p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex items-center border border-gray-300 rounded-full p-1 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-shadow shadow-sm">
          <input
            type="search"
            name="search"
            placeholder="Search for a company or recruiter..."
            className="flex-grow bg-transparent text-gray-900 placeholder-gray-500 border-none focus:ring-0 px-6 py-3"
            aria-label="Search for a company or recruiter"
            defaultValue="Innovate Inc."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 flex-shrink-0"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 transform hover:scale-105 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => (
  <section className="py-20 bg-slate-100 border-y border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Unified Trust Score"
          description="We aggregate data from verified reviews, financial records, and social sentiment into a single, objective score."
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
        />
        <FeatureCard
          title="Evidence-Backed Insights"
          description="Access detailed insights from public financial records, recruiter legitimacy signals, and transparent job listing analysis."
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
        />
        <FeatureCard
          title="Verified & Anonymous Reviews"
          description="Share your experience with confidence. All employee reviews are verified for authenticity while ensuring your anonymity."
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
        />
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => {
    const dataPoints = [
        { title: "Company Trust Score", description: "Weighted composite of culture, transparency, financial stability, and more.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
        { title: "Recruiter Legitimacy", description: "Measures LinkedIn authenticity, hiring outcomes, and candidate satisfaction.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { title: "MCA/GST Verification", description: "Analyzes director history, revenue, and profit/loss trends from public filings.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
        { title: "Verified Review System", description: "AI-based spam detection and verification ensures authentic, anonymous feedback.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
        { title: "External Sentiment Engine", description: "Scrapes and analyzes Reddit, Quora, and news via NLP for public sentiment.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9.3l.16-.29M12 21a9.004 9.004 0 008.34-5.958" /></svg> },
        { title: "Evidence-Based Badges", description: "Earn verifiable badges for 'Trusted Recruiter' or 'Transparent Employer'.", icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
    ];
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        How the Trust Score Works
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        We analyze millions of data points across multiple categories to create a single, reliable score.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dataPoints.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const TrustedCompanies: React.FC = () => {
    const companies = [
        { name: 'Innovate Inc.', industry: 'Technology', score: 4.8 },
        { name: 'GreenLeaf Organics', industry: 'E-commerce', score: 4.7 },
        { name: 'Quantum Solutions', industry: 'Fintech', score: 4.6 },
    ];
    return (
        <section className="py-20 bg-slate-100 border-y border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Trending Trusted Companies
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover top-rated employers based on our comprehensive trust analysis.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {companies.map((company, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-gray-500 text-2xl">{company.name.charAt(0)}</div>
                            <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                            <p className="text-gray-500 mb-4">{company.industry}</p>
                            <div className="inline-flex items-center bg-green-100 text-green-800 text-lg font-bold px-4 py-1 rounded-full">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                {company.score}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const EmployerWatchlist: React.FC = () => {
    const alerts = [
        { name: 'Unstable Corp.', reason: 'Multiple reports of salary delays.' },
        { name: 'Ghost Recruiters', reason: 'High volume of fraudulent job listings detected.' },
        { name: 'RedFlag Solutions', reason: 'Recent major layoffs and poor financial health.' },
    ];
    return (
        <section className="py-20 bg-white border-y border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Employer Watchlist
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Review companies with reported concerns and low trust scores to make informed decisions.
                    </p>
                </div>
                 <div className="max-w-3xl mx-auto bg-slate-50 border border-gray-200 rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {alerts.map((alert, index) => (
                            <li key={index} className="p-4 flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                   <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{alert.name}</p>
                                    <p className="text-gray-600">{alert.reason}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const Testimonials: React.FC = () => {
    const testimonials = [
        { quote: "TrustHoop helped me dodge a bullet. The company I was interviewing with had major red flags on their financial health report. A real lifesaver!", name: 'Rohan Sharma', title: 'Software Engineer' },
        { quote: "Finally, a way to see the real picture. The verified reviews gave me the confidence to accept a job offer from a truly great startup.", name: 'Priya Patel', title: 'Marketing Manager' },
        { quote: "As a recruiter, I use TrustHoop to show my legitimacy. The 'Trusted Recruiter' badge has made a huge difference in attracting quality candidates.", name: 'Ankit Desai', title: 'Talent Acquisition Lead' },
    ];
    return (
        <section className="py-20 bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Why Job Seekers & Recruiters Trust Us
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg border border-gray-200">
                            <svg className="w-10 h-10 text-blue-300 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" /></svg>
                            <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                            <div>
                                <p className="font-bold text-gray-900">{testimonial.name}</p>
                                <p className="text-gray-600">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const ForEmployees: React.FC = () => (
    <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Share Your Experience. <span className="text-blue-600">Help the Community.</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Contribute to a more transparent job market by sharing your anonymous, verified review. Your insights help fellow job seekers make better career choices.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        aria-label="Write a review"
                    >
                        Write a Review
                    </a>
                </div>
                <div className="flex justify-center">
                    <div className="p-8 bg-blue-50 border border-blue-200 rounded-full">
                        <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M9 12h6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ForEmployers: React.FC = () => (
    <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center md:order-2">
                     <div className="p-8 bg-blue-50 border border-blue-200 rounded-full">
                        <svg className="w-24 h-24 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    </div>
                </div>
                <div className="text-center md:text-left md:order-1">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Attract Top Talent with <span className="text-blue-600">Trust.</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Showcase your commitment to a positive workplace. Get your TrustHoop score, earn legitimacy badges, and stand out to the best candidates in India. Let your reputation speak for itself.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-gray-700 font-semibold px-8 py-3 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Claim your profile"
                    >
                        Claim Your Profile
                    </a>
                </div>
            </div>
        </div>
    </section>
);


const Footer: React.FC = () => (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-blue-600">
              TrustHoop
            </a>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-sm order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} TrustHoop. All rights reserved.
          </p>
          <div className="flex space-x-5 order-1 sm:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="LinkedIn">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
);


const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'profile'>('home');
  const [companyQuery, setCompanyQuery] = useState('');

  const handleSearch = (query: string) => {
    setCompanyQuery(query || "Innovate Inc."); // Default if query is empty
    setPage('profile');
  };

  const handleGoBack = () => {
    setPage('home');
    setCompanyQuery('');
  };

  if (page === 'profile') {
    return <CompanyProfile companyName={companyQuery} onBack={handleGoBack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero onSearch={handleSearch} />
        <Features />
        <HowItWorks />
        <TrustedCompanies />
        <EmployerWatchlist />
        <Testimonials />
        <ForEmployees />
        <ForEmployers />
      </main>
      <Footer />
    </div>
  );
};

export default App;