import { GoogleGenAI, Type } from "@google/genai";

export interface Factor {
    name: string;
    score: number;
    weight: number;
}

export interface DataSummary {
    used: string[];
    missing: string[];
    filteredSignals: string[];
}

export interface CompanyData {
    name: string;
    industry: string;
    ctsScore: number;
    rlsScore: number;
    riskVerdict: 'Low Risk' | 'Medium Risk' | 'High Risk';
    factorBreakdown: Factor[];
    dataSummary: DataSummary;
}


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        industry: { type: Type.STRING },
        ctsScore: { type: Type.INTEGER },
        rlsScore: { type: Type.INTEGER },
        riskVerdict: { type: Type.STRING, enum: ['Low Risk', 'Medium Risk', 'High Risk'] },
        factorBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    score: { type: Type.INTEGER },
                    weight: { type: Type.INTEGER },
                },
                required: ['name', 'score', 'weight'],
            }
        },
        dataSummary: {
            type: Type.OBJECT,
            properties: {
                used: { type: Type.ARRAY, items: { type: Type.STRING } },
                missing: { type: Type.ARRAY, items: { type: Type.STRING } },
                filteredSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['used', 'missing', 'filteredSignals'],
        }
    },
    required: ['name', 'industry', 'ctsScore', 'rlsScore', 'riskVerdict', 'factorBreakdown', 'dataSummary'],
};

const getSystemInstruction = () => `
You are Lovable AI's Trust & Legitimacy Scoring Engine. Your job is to fetch real data, apply filters, compute weighted trust scores, and produce transparent explanations.

You must:
- Fetch Information from APIs like Glassdoor, AmbitionBox, MCA Portal, Tofler, InstaFinancials, Blind, Reddit, Quora, Layoffs.fyi, Naukri, Indeed, Comparably, DNS/Email verification APIs, and LinkedIn Organization API.
- If data is not available via API for a factor, treat the factor score as 0 by default.

GLOBAL RULES:
1.  Default Score = 0: If any factor has no data, or data does not pass authenticity filter, assign 0 score for that factor.
2.  Apply Authenticity Filters for Social Platforms (Reddit/Quora/Blind):
    - Popularity Threshold: Reddit (>=10k views OR subreddit size >=100k), Quora (>=2k views), Blind (>=5 comments).
    - Upvote Reliability: Upvote ratio >=70% AND Net upvotes >=20.
    - User Confirmation: >=5 comments OR >=3 unique users confirming.
    - Credibility Multiplier: >=200 upvotes -> 1.2x, 50-199 -> 1.0x, 20-49 -> 0.8x, <20 -> discard.
3.  Only Use Verified, API-Fetched Data. No assumptions.

COMPANY TRUST SCORE (CTS) - TOTAL 100%:
- Culture & Work Environment (17%): Glassdoor, AmbitionBox.
- Financial Stability Score (30%): MCA Portal, Tofler, InstaFinancials.
- Candidate Experience (NPS) (15%): Survey APIs, form inputs.
- External Sentiment Score (13%): Reddit, Quora, Blind (apply all filters).
- Employer Red Flag Index (15%): Blind, Layoffs.fyi, Reddit (verify with upvote ratio >=70%, net upvotes >=20, >=3 confirmations or news validation).
- CTS Formula: (Culture*0.17) + (Financial*0.30) + (NPS*0.15) + (Sentiment*0.13) + (RedFlag*0.15)

RECRUITER LEGITIMACY SCORE (RLS) - TOTAL 100%:
- Outcome Metrics (25%): Naukri, Glassdoor, Indeed.
- Candidate Satisfaction (30%): Indeed reviews, Comparably.
- External Reputation (20%): Reddit, complaint portals (apply filters).
- Identity & Domain Verification (15%): DNS, GST, MCA, LinkedIn Org verified badge.
- Process Transparency & Compliance (10%): Recruiter logs, offered documents.
- RLS Formula: (Outcome*0.25) + (Satisfaction*0.30) + (Reputation*0.20) + (Identity*0.15) + (Transparency*0.10)

BEHAVIOR RULES:
- Never hallucinate data.
- Always use API-fetched information only.
- Assign 0 score when uncertain or data is not found.
- Maintain consistency with weight logic.
`;


export async function getCompanyTrustScore(companyName: string): Promise<CompanyData> {
    const prompt = `
    Generate a trust and legitimacy score for the company: "${companyName}".

    Follow all the system instructions precisely. Fetch and process data according to the rules.

    Output a JSON object that strictly adheres to the provided schema. Include the CTS Score, RLS Score (if applicable, otherwise default to a reasonable value or 0), a factor-wise breakdown, a summary of data used vs. missing, signals that failed authenticity filters, and a one-line risk verdict.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction(),
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText) as CompanyData;
        return data;

    } catch (error) {
        console.error("Error fetching company trust score:", error);
        throw new Error("Failed to generate company trust score from the API.");
    }
}