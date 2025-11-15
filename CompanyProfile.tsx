import React, { useState, useEffect } from 'react';
import { getCompanyTrustScore, CompanyData } from './gemini';

const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-100 ring-green-200';
    if (score >= 50) return 'text-amber-600 bg-amber-100 ring-amber-200';
    return 'text-red-600 bg-red-100 ring-red-200';
}

const getScoreRingColor = (score: number) => {
    if (score >= 75) return 'ring-green-100';
    if (score >= 50) return 'ring-amber-100';
    return 'ring-red-100';
}

const ProgressBar: React.FC<{ score: number }> = ({ score }) => {
    const bgColor = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
    );
};


const ProfileSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="flex items-center space-x-6 mb-10">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div>
                <div className="h-10 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-24 mx-auto mt-4"></div>
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                                    <div className="h-5 bg-gray-200 rounded w-1/6"></div>
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const CompanyProfile: React.FC<{ companyName: string; onBack: () => void }> = ({ companyName, onBack }) => {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCompanyTrustScore(companyName);
                setCompanyData(data);
            } catch (err) {
                setError('Failed to fetch company data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyName]);

    const renderContent = () => {
        if (loading) {
            return <ProfileSkeleton />;
        }

        if (error) {
            return (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <button
                        onClick={onBack}
                        className="mt-6 bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            );
        }

        if (!companyData) {
            return <div className="text-center py-20">No data available.</div>;
        }

        const { name, industry, ctsScore, riskVerdict, factorBreakdown, dataSummary } = companyData;
        const logoChar = name.charAt(0).toUpperCase();

        return (
            <div>
                 <div className="flex items-center space-x-6 mb-10">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-5xl">{logoChar}</div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">{name}</h1>
                        <p className="text-lg text-gray-600">{industry || 'Industry not specified'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Score */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">Company Trust Score</h2>
                            <div className={`relative w-40 h-40 mx-auto flex items-center justify-center rounded-full ring-8 ${getScoreRingColor(ctsScore)}`}>
                                <div className={`text-5xl font-extrabold ${getScoreColor(ctsScore).split(' ')[0]}`}>{ctsScore}</div>
                            </div>
                            <div className={`mt-4 inline-flex items-center font-bold px-4 py-1 rounded-full text-lg ${getScoreColor(ctsScore)}`}>
                                {riskVerdict}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Breakdown */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Score Breakdown</h2>
                            <ul className="space-y-5">
                                {factorBreakdown.map(factor => (
                                    <li key={factor.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold text-gray-700">{factor.name} <span className="text-sm text-gray-500">({factor.weight}%)</span></p>
                                            <p className={`font-bold ${getScoreColor(factor.score).split(' ')[0]}`}>{factor.score}<span className="text-sm text-gray-500">/100</span></p>
                                        </div>
                                        <ProgressBar score={factor.score} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Full-width Data Transparency */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Transparency Report</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div>
                                    <h3 className="font-bold text-green-700 mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Data Sources Used
                                    </h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        {dataSummary.used.map(source => <li key={source}>{source}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-700 mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 011 1v3.008a1 1 0 01-1 1H9a1 1 0 01-1-1V5z" clipRule="evenodd" /></svg>
                                        Missing Data
                                    </h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        {dataSummary.missing.map(source => <li key={source}>{source}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-700 mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                        Filtered Authenticity Signals
                                    </h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        {dataSummary.filteredSignals.map(signal => <li key={signal}>{signal}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


  return (
    <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                 <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Back to search"
                    >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Search
                </button>
                <div className="text-2xl font-bold text-blue-600">
                    TrustHoop
                </div>
            </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
           {renderContent()}
        </main>
    </div>
  );
};

export default CompanyProfile;