import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface SafetyAnalysis {
    safetyScore: string;
    potentialRisks: string[];
    recommendations: string[];
    safestTransport: string;
}

const SafeNavigationScreen: React.FC = () => {
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<SafetyAnalysis | null>(null);
    const [error, setError] = useState('');

    const handleAnalyzeRoute = async () => {
        if (!startLocation || !destination) {
            setError('Please enter both a start and destination location.');
            return;
        }
        setLoading(true);
        setError('');
        setAnalysisResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `As a tourist safety expert, analyze the route from "${startLocation}" to "${destination}" in a major city. Provide a safety analysis as a JSON object.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            safetyScore: { type: Type.STRING, description: "A safety score, e.g., '8/10' or 'High'." },
                            potentialRisks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of potential risks." },
                            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of safety recommendations." },
                            safestTransport: { type: Type.STRING, description: "The safest mode of transport." }
                        },
                        required: ["safetyScore", "potentialRisks", "recommendations", "safestTransport"]
                    }
                }
            });
            
            const result = JSON.parse(response.text);
            setAnalysisResult(result);

        } catch (e) {
            console.error("Error analyzing route:", e);
            setError("Sorry, we couldn't analyze the route at this time. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Live Map & Safe Navigation</h1>

            <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                <div>
                    <label className="text-sm text-gray-600">From</label>
                    <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} placeholder="e.g., India Gate, New Delhi" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"/>
                </div>
                 <div>
                    <label className="text-sm text-gray-600">To</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Connaught Place, New Delhi" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"/>
                </div>
                <button onClick={handleAnalyzeRoute} disabled={loading} className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold transition-colors disabled:bg-cyan-300 disabled:cursor-not-allowed">
                    {loading ? 'Analyzing...' : 'Analyze Safe Route'}
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded-xl shadow-sm text-sm" role="alert">{error}</div>}

            {loading && (
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2 animate-pulse">
                         <svg className="w-6 h-6 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L15 12l-6 3zm0 0l6-3m-6 3V7" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-500">Our AI is analyzing the safest route for you...</p>
                </div>
            )}
            
            {!loading && !analysisResult && !error && (
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">📍</div>
                    <p className="text-sm text-gray-500">Enter a start and destination to get an AI-powered safety analysis of the best route.</p>
                </div>
            )}

            {analysisResult && (
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">AI Route Safety Analysis</h2>
                    <div>
                        <h3 className="font-semibold text-gray-700">Overall Safety Score</h3>
                        <p className="text-2xl font-bold text-cyan-600">{analysisResult.safetyScore}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Potential Risks</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-1">
                            {analysisResult.potentialRisks.map((risk, index) => <li key={index}>{risk}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Safety Recommendations</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-1">
                            {analysisResult.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Safest Mode of Transport</h3>
                        <p className="text-sm text-gray-600 mt-1">{analysisResult.safestTransport}</p>
                    </div>
                </div>
            )}

             <div className="bg-white p-4 rounded-xl shadow-sm">
                 <h2 className="font-semibold mb-2">Live Map</h2>
                 <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    [Interactive Map Showing Safe Route & Waypoints]
                 </div>
            </div>
        </div>
    )
};

export default SafeNavigationScreen;