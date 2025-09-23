import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import MapView from '../../shared/MapView';
import { ArrowRightLeftIcon, AlertTriangleIcon, LightBulbIcon, BusIcon, ChevronDownIcon } from '../../../constants';

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

const AccordionItem: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; }> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-light-200 dark:border-dark-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left">
                <span className="flex items-center font-semibold text-gray-800 dark:text-gray-200">{icon}{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-500 dark:text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="pb-3 text-sm text-gray-600 dark:text-gray-400">{children}</div>}
        </div>
    );
};

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
- "safestTransport": A string for the safest mode of transport. Be specific. If public transport is recommended, you MUST suggest a concrete route, for example: 'Delhi Metro Violet Line towards Kashmere Gate' or 'Bus Route 534A from India Gate stop'.
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
    
    const handleReset = () => {
        setAnalysisResult(null);
        setMapPins([]);
        setError('');
    };

    const swapLocations = () => {
        setStartLocation(destination);
        setDestination(startLocation);
    };
    
    const safetyScoreValue = analysisResult ? parseInt(analysisResult.safetyScore.split('/')[0]) * 10 : 0;
    const scoreColor = safetyScoreValue > 70 ? 'text-green-500' : safetyScoreValue > 40 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="flex flex-col h-full w-full bg-light-200 dark:bg-dark-900">
            <div className="flex-grow relative">
                <MapView pins={mapPins} alwaysShowLabels showRoute className="absolute inset-0" />
                {loading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                        <p className="text-white font-semibold">AI is analyzing your route...</p>
                    </div>
                )}
            </div>
            
            <div className="flex-shrink-0 bg-light-100 dark:bg-dark-800 p-4 rounded-t-2xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.2)] z-20">
                <div className="w-10 h-1.5 bg-light-300 dark:bg-dark-600 rounded-full mx-auto mb-3"></div>
                
                {!analysisResult ? (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Plan a Safe Route</h2>
                        <div className="relative">
                            <InputField label="From" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
                            <InputField label="To" value={destination} onChange={(e) => setDestination(e.target.value)} />
                            <button onClick={swapLocations} className="absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full bg-light-200 dark:bg-dark-700 hover:bg-light-300 dark:hover:bg-dark-600 transition-colors" aria-label="Swap locations">
                                <ArrowRightLeftIcon className="w-4 h-4 text-gray-600 dark:text-gray-300"/>
                            </button>
                        </div>
                        <button onClick={handleAnalyzeRoute} disabled={loading} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed">
                            Analyze Safe Route
                        </button>
                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">AI Safety Analysis</h2>
                            <button onClick={handleReset} className="text-sm font-semibold text-primary-600 hover:underline">New Route</button>
                        </div>

                        <div className="bg-light-200 dark:bg-dark-700/50 p-4 rounded-xl flex items-center gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-current text-light-300 dark:text-dark-600" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className={`stroke-current ${scoreColor}`} strokeWidth="3" strokeDasharray={`${safetyScoreValue}, 100`} strokeLinecap="round"/>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{analysisResult.safetyScore}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Safest Transport</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"><BusIcon className="w-4 h-4" />{analysisResult.safestTransport}</p>
                            </div>
                        </div>
                        
                        <div>
                            <AccordionItem title="Potential Risks" icon={<AlertTriangleIcon className="w-5 h-5 mr-2 text-yellow-500" />} defaultOpen>
                                 <ul className="list-disc list-inside space-y-1 mt-1 pl-2">{analysisResult.potentialRisks.map((risk, index) => <li key={index}>{risk}</li>)}</ul>
                            </AccordionItem>
                            <AccordionItem title="Recommendations" icon={<LightBulbIcon className="w-5 h-5 mr-2 text-green-500" />}>
                                 <ul className="list-disc list-inside space-y-1 mt-1 pl-2">{analysisResult.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}</ul>
                            </AccordionItem>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, value, onChange }) => (
    <div className="mb-1">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 px-1">{label}</label>
        <input type="text" value={value} onChange={onChange} className="w-full bg-transparent p-1 border-b-2 border-light-300 dark:border-dark-600 focus:border-primary-500 outline-none transition-colors" />
    </div>
);

export default SafeNavigationScreen;
