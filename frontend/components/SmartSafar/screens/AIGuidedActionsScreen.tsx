import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ActionGuideModal: React.FC<{ title: string; steps: string; isLoading: boolean; onClose: () => void }> = ({ title, steps, isLoading, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center pb-3 border-b border-light-300 dark:border-dark-700">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
                    <button onClick={onClose} className="text-gray-700 dark:text-gray-300 text-2xl font-bold">&times;</button>
                </div>
                <div className="flex-grow mt-4 overflow-y-auto pr-2">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {steps}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const AIGuidedActionsScreen: React.FC = () => {
    const [tip, setTip] = useState("Click 'Get New Tip' for an AI-powered safety nudge.");
    const [loading, setLoading] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [actionSteps, setActionSteps] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    
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

    const handleEmergencyAction = async (action: string) => {
        setSelectedAction(action);
        setActionLoading(true);
        setActionSteps('');

        let prompt = '';
        switch (action) {
            case 'Lost Wallet/Passport':
                prompt = 'You are a helpful assistant for a tourist who has lost their wallet and passport in a foreign city. Provide a clear, step-by-step action plan. The steps should be concise, easy to follow, and formatted with clear headings or numbered lists.';
                break;
            case 'Medical Assistance':
                prompt = 'You are a calm and helpful assistant for a tourist facing a non-life-threatening medical issue in a foreign city. Provide a clear, step-by-step guide on what to do. Include advice on finding a doctor or pharmacy and what information to have ready. Format the steps clearly.';
                break;
            case 'Feeling Unsafe':
                prompt = 'You are a safety expert providing immediate advice to a tourist who is feeling unsafe but is not in immediate physical danger. Provide a clear, calming, step-by-step action plan to help them get to a safe place and de-escalate the situation. Format the steps clearly.';
                break;
            default:
                setActionLoading(false);
                setSelectedAction(null);
                return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setActionSteps(response.text);
        } catch (error) {
            console.error("Error generating action steps:", error);
            setActionSteps("Could not generate guidance at this time. Please contact local authorities if you are in danger.");
        } finally {
            setActionLoading(false);
        }
    };

    const emergencyActions = [
        { title: 'Lost Wallet/Passport', id: 'lost-wallet' },
        { title: 'Medical Assistance', id: 'medical' },
        { title: 'Feeling Unsafe', id: 'unsafe' },
    ];

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Guided Actions</h1>
            
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Proactive Safety Nudge</h2>
                <div className="bg-primary-100 dark:bg-primary-500/20 p-4 rounded-lg text-primary-800 dark:text-primary-300 font-semibold text-center mb-4 min-h-[60px] flex items-center justify-center">
                    <p>{tip}</p>
                </div>
                <button onClick={getNewTip} disabled={loading} className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed">
                    {loading ? 'Generating...' : 'Get New Tip'}
                </button>
            </div>
            
             <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Notes: Example Nudges</h2>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-2">
                    <li>You are approaching a restricted zone. For your safety, we recommend staying on marked tourist routes.</li>
                    <li>This area has low mobile connectivity. Please enable Offline Safety Mode so we can still track your location securely.</li>
                    <li>You're entering a high-risk zone after dark. Would you like to share live location with your emergency contact?</li>
                </ul>
            </div>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Emergency Actions</h2>
                <div className="space-y-3 text-gray-900 dark:text-gray-100">
                     {emergencyActions.map(action => (
                         <button 
                            key={action.id}
                            onClick={() => handleEmergencyAction(action.title)}
                            className="w-full text-left p-3 bg-light-200 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                         >
                            {action.title}
                         </button>
                    ))}
                </div>
            </div>

            {selectedAction && (
                <ActionGuideModal
                    title={selectedAction}
                    steps={actionSteps}
                    isLoading={actionLoading}
                    onClose={() => setSelectedAction(null)}
                />
            )}
        </div>
    );
};

export default AIGuidedActionsScreen;