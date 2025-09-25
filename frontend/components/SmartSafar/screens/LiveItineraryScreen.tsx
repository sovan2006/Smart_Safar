import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import MapView from '../../shared/MapView';

type ItineraryStatus = 'Completed' | 'Current' | 'Upcoming';

interface MapPin {
    id: string;
    x: number;
    y: number;
    color: string;
    label?: string;
}

interface ItineraryItemProps {
    time: string;
    title: string;
    description: string;
    status: ItineraryStatus;
    icon: string;
    location: {
        name: string;
        x: number;
        y: number;
    };
}


const ItineraryItem: React.FC<ItineraryItemProps> = ({ time, title, description, status, icon, location }) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'Completed': return 'border-green-500 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300';
            case 'Current': return 'border-primary-500 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300';
            case 'Upcoming': return 'border-gray-300 dark:border-dark-600 bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400';
        }
    };

    return (
        <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses()}`}>{icon}</div>
                <div className="w-0.5 flex-grow bg-gray-300 dark:bg-dark-600 my-2"></div>
            </div>
            <div className="pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">📍 {location.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                 <div className="absolute top-2 -right-2">
                    {status === 'Completed' && <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20 px-2 py-0.5 rounded-full">✓ Completed</span>}
                    {status === 'Current' && <span className="text-xs text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-500/20 px-2 py-0.5 rounded-full font-semibold">Current</span>}
                </div>
            </div>
        </div>
    )
}

const LiveItineraryScreen: React.FC = () => {
    const [interests, setInterests] = useState('history, food, local markets');
    const [duration, setDuration] = useState('1 day');
    const [itinerary, setItinerary] = useState<ItineraryItemProps[] | null>(null);
    const [mapPins, setMapPins] = useState<MapPin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateItinerary = async () => {
        if (!interests || !duration) {
            setError('Please provide your interests and trip duration.');
            return;
        }
        setLoading(true);
        setError('');
        setItinerary(null);
        setMapPins([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are an expert travel agent for New Delhi, India. Create a personalized itinerary for a tourist.
Interests: ${interests}
Duration: ${duration}

The output must be a valid JSON array of objects. Each object represents a step in the itinerary and must include:
- "time": A string for the time (e.g., "09:00 AM").
- "title": A short, catchy string for the activity.
- "description": A brief string describing the activity.
- "icon": A single, relevant emoji string.
- "status": A string, which must be "Upcoming".
- "location": An object with:
  - "name": The name of the location (string).
  - "x": An x-coordinate between 10 and 290 for map plotting (number).
  - "y": A y-coordinate between 10 and 170 for map plotting (number).`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            time: { type: Type.STRING },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            icon: { type: Type.STRING },
                            status: { type: Type.STRING, enum: ['Upcoming'] },
                            location: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    x: { type: Type.NUMBER },
                                    y: { type: Type.NUMBER }
                                },
                                required: ["name", "x", "y"]
                            }
                          },
                          required: ["time", "title", "description", "icon", "status", "location"]
                        },
                    },
                },
            });
            
            const generatedItinerary: ItineraryItemProps[] = JSON.parse(response.text);
            setItinerary(generatedItinerary);

            if (generatedItinerary && generatedItinerary.length > 0) {
                const pins: MapPin[] = generatedItinerary.map((item, index) => ({
                    id: `loc-${index}`,
                    x: item.location.x,
                    y: item.location.y,
                    color: '#3b82f6', // primary blue
                    label: item.title,
                }));
                setMapPins(pins);
            }

        } catch (e) {
            console.error("Error generating itinerary:", e);
            setError("Sorry, we couldn't create your itinerary right now. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    const handleReset = () => {
        setItinerary(null);
        setMapPins([]);
        setError('');
        setInterests('history, food, local markets');
        setDuration('1 day');
    }

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Live Itinerary & Navigation</h1>
            
            {!itinerary && (
                 <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Create Your Personalized Plan</h2>
                    <div>
                        <label htmlFor="interests" className="text-sm text-gray-600 dark:text-gray-400">What are your interests?</label>
                        <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., history, food, shopping" className="w-full mt-1 p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-400 outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="duration" className="text-sm text-gray-600 dark:text-gray-400">Trip duration?</label>
                        <input id="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 2 days" className="w-full mt-1 p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-400 outline-none"/>
                    </div>
                    <button onClick={handleGenerateItinerary} disabled={loading} className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed">
                        {loading ? 'Generating Your Plan...' : '✨ Generate with AI'}
                    </button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                </div>
            )}

            {itinerary && (
                <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Your Personal Plan</h2>
                        <button onClick={handleReset} className="text-sm text-primary-600 hover:underline">Start Over</button>
                    </div>
                    <div className="space-y-0">
                        {itinerary.map((item, index) => (
                            <ItineraryItem key={item.title + index} {...item} />
                        ))}
                    </div>
                </div>
            )}
           
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                 <h2 className="font-semibold mb-2 flex items-center text-gray-900 dark:text-gray-100">Live Map View <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> <span className="ml-1 text-xs text-red-500">LIVE</span></h2>
                 <div className="h-48 bg-gray-200 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <MapView pins={mapPins} showRoute alwaysShowLabels />
                 </div>
            </div>
        </div>
    )
};

export default LiveItineraryScreen;
