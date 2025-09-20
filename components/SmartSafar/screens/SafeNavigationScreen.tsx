import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import MapView from '../../shared/MapView';

// A local interface for map pins since it's not exported from MapView
interface MapPin {
  id: string;
  x: number;
  y: number;
  color: string;
  label?: string;
}

interface SafetyAnalysis {
    safetyScore: string;
    potentialRisks: string[];
    recommendations: string[];
    safestTransport: string;
    waypoints: { name: string, x: number, y: number }[];
}

const SafeNavigationScreen: React.FC = () => {
    const [startLocation, setStartLocation] = useState('India Gate, New Delhi');
    const [destination, setDestination] = useState('Connaught Place, New Delhi');
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<SafetyAnalysis | null>(null);
    const [mapPins, setMapPins] = useState<MapPin[]>([]);
    const [error, setError] = useState('');

    const handleAnalyzeRoute = async () => {
        if (!startLocation || !destination) {
            setError('Please enter both a start and destination location.');
            return;
        }
        setLoading(true);
        setError('');
        setAnalysisResult(null);
        setMapPins([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `As a tourist safety expert for New Delhi, India, analyze the route from "${startLocation}" to "${destination}". Provide a detailed safety analysis. If the route is risky, suggest a safer alternative route by providing key waypoints.

Return the analysis as a JSON object with the following structure:
- "safetyScore": A safety score (e.g., "8/10").
- "potentialRisks": An array of strings describing potential risks.
- "recommendations": An array of strings with safety recommendations.
- "safestTransport": A string for the safest mode of transport. If public transport is recommended, suggest specific options like "Delhi Metro Violet Line" or "Bus Route 534".
- "waypoints": An array of objects for the safest route. Each object should have:
  - "name": The name of the waypoint (string).
  - "x": An x-coordinate between 10 and 290 for map plotting (number).
  - "y": A y-coordinate between 10 and 170 for map plotting (number).

The waypoints array must start with the starting location and end with the destination. Include 1-3 key safe spots in between.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            safetyScore: { type: Type.STRING, description: "A safety score, e.g., '8/10'." },
                            potentialRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
                            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                            safestTransport: { type: Type.STRING },
                            waypoints: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING },
                                        x: { type: Type.NUMBER },
                                        y: { type: Type.NUMBER }
                                    },
                                    required: ["name", "x", "y"]
                                }
                            }
                        },
                        required: ["safetyScore", "potentialRisks", "recommendations", "safestTransport", "waypoints"]
                    }
                }
            });
            
            const result = JSON.parse(response.text);
            setAnalysisResult(result);

            if (result.waypoints && result.waypoints.length > 0) {
                const pins: MapPin[] = result.waypoints.map((point: any, index: number) => ({
                    id: `${point.name}-${index}`,
                    x: point.x,
                    y: point.y,
                    color: index === 0 ? '#16a34a' : index === result.waypoints.length - 1 ? '#ef4444' : '#3b82f6',
                    label: point.name
                }));
                setMapPins(pins);
            }

        } catch (e) {
            console.error("Error analyzing route:", e);
            setError("Sorry, we couldn't analyze the route at this time. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Live Map & Safe Navigation</h1>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">From</label>
                    <input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} placeholder="e.g., India Gate, New Delhi" className="w-full mt-1 p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
                </div>
                 <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">To</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Connaught Place, New Delhi" className="w-full mt-1 p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
                </div>
                <button onClick={handleAnalyzeRoute} disabled={loading} className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed">
                    {loading ? 'Analyzing...' : 'Analyze Safe Route'}
                </button>
            </div>

            {error && <div className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 p-3 rounded-xl shadow-sm text-sm" role="alert">{error}</div>}

            {loading && (
                <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto bg-light-200 dark:bg-dark-700 rounded-full flex items-center justify-center mb-2 animate-pulse">
                         <svg className="w-6 h-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L15 12l-6 3zm0 0l6-3m-6 3V7" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Our AI is analyzing the safest route for you...</p>
                </div>
            )}
            
            {!loading && !analysisResult && !error && (
                <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm text-center">
                    <div className="w-12 h-12 mx-auto bg-light-200 dark:bg-dark-700 rounded-full flex items-center justify-center mb-2">📍</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter a start and destination to get an AI-powered safety analysis of the best route.</p>
                </div>
            )}

            {analysisResult && (
                <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">AI Route Safety Analysis</h2>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Overall Safety Score</h3>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{analysisResult.safetyScore}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Potential Risks</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                            {analysisResult.potentialRisks.map((risk, index) => <li key={index}>{risk}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Safety Recommendations</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                            {analysisResult.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Safest Mode of Transport</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{analysisResult.safestTransport}</p>
                    </div>
                </div>
            )}

             <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                 <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Recommended Route</h2>
                 <div className="h-48 bg-gray-200 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <MapView pins={mapPins} alwaysShowLabels showRoute />
                 </div>
            </div>
        </div>
    )
};

export default SafeNavigationScreen;
