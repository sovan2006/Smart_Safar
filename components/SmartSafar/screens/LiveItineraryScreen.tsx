import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

type ItineraryStatus = 'Completed' | 'Current' | 'Upcoming';

interface ItineraryItemProps {
    time: string;
    title: string;
    description: string;
    status: ItineraryStatus;
    icon: string;
}


const ItineraryItem: React.FC<ItineraryItemProps> = ({ time, title, description, status, icon }) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'Completed': return 'border-green-500 bg-green-100 text-green-700';
            case 'Current': return 'border-cyan-500 bg-cyan-100 text-cyan-700';
            case 'Upcoming': return 'border-gray-300 bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="flex space-x-4 relative">
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses()}`}>{icon}</div>
                {status !== 'Upcoming' && <div className="w-0.5 flex-grow bg-gray-300 mt-2"></div>}
            </div>
            <div>
                <p className="text-sm text-gray-500">{time}</p>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
                 <div className="absolute top-2 -right-2">
                    {status === 'Completed' && <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ Completed</span>}
                    {status === 'Current' && <span className="text-xs text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full">Current</span>}
                </div>
            </div>
        </div>
    )
}

const LiveItineraryScreen: React.FC = () => {
    const [interests, setInterests] = useState('history, food, local markets');
    const [duration, setDuration] = useState('1 day');
    const [itinerary, setItinerary] = useState<ItineraryItemProps[] | null>(null);
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
- "status": A string, which must be "Upcoming".`;

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
                            time: { type: Type.STRING, description: "Time of the event." },
                            title: { type: Type.STRING, description: "Title of the event." },
                            description: { type: Type.STRING, description: "Description of the event." },
                            icon: { type: Type.STRING, description: "A single emoji." },
                            status: { type: Type.STRING, enum: ['Upcoming', 'Current', 'Completed'] },
                          },
                          required: ["time", "title", "description", "icon", "status"]
                        },
                    },
                },
            });
            
            const generatedItinerary = JSON.parse(response.text);
            setItinerary(generatedItinerary);

        } catch (e) {
            console.error("Error generating itinerary:", e);
            setError("Sorry, we couldn't create your itinerary right now. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
    const handleReset = () => {
        setItinerary(null);
        setError('');
        setInterests('history, food, local markets');
        setDuration('1 day');
    }

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-xl font-bold">Live Itinerary & Navigation</h1>
            
            {!itinerary && (
                 <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                    <h2 className="font-semibold text-lg">Create Your Personalized Plan</h2>
                    <div>
                        <label htmlFor="interests" className="text-sm text-gray-600">What are your interests?</label>
                        <input id="interests" type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., history, food, shopping" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="duration" className="text-sm text-gray-600">Trip duration?</label>
                        <input id="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 2 days" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"/>
                    </div>
                    <button onClick={handleGenerateItinerary} disabled={loading} className="w-full bg-cyan-500 text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-cyan-600 disabled:bg-cyan-300 disabled:cursor-not-allowed">
                        {loading ? 'Generating Your Plan...' : '✨ Generate with AI'}
                    </button>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                </div>
            )}

            {itinerary && (
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Your Personal Plan</h2>
                        <button onClick={handleReset} className="text-sm text-cyan-600 hover:underline">Start Over</button>
                    </div>
                    <div className="space-y-6">
                        {itinerary.map(item => <ItineraryItem key={item.title} {...item} />)}
                    </div>
                </div>
            )}
           
            <div className="bg-white p-4 rounded-xl shadow-sm">
                 <h2 className="font-semibold mb-2 flex items-center">Live Map View <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> <span className="ml-1 text-xs text-red-500">LIVE</span></h2>
                 <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    [Interactive Map Showing Route]
                 </div>
            </div>
        </div>
    )
};

export default LiveItineraryScreen;