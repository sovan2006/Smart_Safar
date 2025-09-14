import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIGuidedActionsScreen: React.FC = () => {
    const [tip, setTip] = useState("Click 'Get New Tip' for an AI-powered safety nudge.");
    const [loading, setLoading] = useState(false);
    
    const getNewTip = async () => {
        setLoading(true);
        setTip("🧠 Generating new tip...");
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: 'Generate a short, actionable safety tip for a tourist visiting a new city. The tip should be a single sentence and easy to understand.',
            });
            setTip(response.text || "Could not generate a tip at this time. Please try again later.");
        } catch (error) {
            console.error("Error generating tip:", error);
            setTip("Could not generate a tip at this time. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">AI Guided Actions</h1>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Proactive Safety Nudge</h2>
                <div className="bg-cyan-50 p-4 rounded-lg text-cyan-700 font-semibold text-center mb-4 min-h-[60px] flex items-center justify-center">
                    <p>{tip}</p>
                </div>
                <button onClick={getNewTip} disabled={loading} className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold transition-colors disabled:bg-cyan-300 disabled:cursor-not-allowed">
                    {loading ? 'Generating...' : 'Get New Tip'}
                </button>
            </div>
            
             <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Notes: Example Nudges</h2>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                    <li>You are approaching a restricted zone. For your safety, we recommend staying on marked tourist routes.</li>
                    <li>This area has low mobile connectivity. Please enable Offline Safety Mode so we can still track your location securely.</li>
                    <li>You're entering a high-risk zone after dark. Would you like to share live location with your emergency contact?</li>
                </ul>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Emergency Actions</h2>
                <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Lost Wallet/Passport</button>
                    <button className="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Medical Assistance</button>
                    <button className="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Feeling Unsafe</button>
                </div>
            </div>

        </div>
    );
};

export default AIGuidedActionsScreen;