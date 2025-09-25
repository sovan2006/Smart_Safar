import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Tourist } from '../../../types';

interface FileEfirScreenProps {
    currentUser: Tourist;
}

const StepIndicator: React.FC<{ step: number, currentStep: number, label: string }> = ({ step, currentStep, label }) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;

    return (
        <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-primary-600 border-primary-600 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-500 dark:text-gray-400'}`}>
                {isCompleted ? '✓' : step}
            </div>
            <p className={`text-xs mt-1 text-center ${isActive ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>{label}</p>
        </div>
    );
};

const FileEfirScreen: React.FC<FileEfirScreenProps> = ({ currentUser }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    // Form state
    const [narrative, setNarrative] = useState('');
    const [incidentType, setIncidentType] = useState('Theft');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [description, setDescription] = useState('');
    
    // AI state
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState('');

    const handleAnalyzeIncident = async () => {
        if (!narrative) {
            setAnalysisError("Please describe the incident first.");
            return;
        }
        setIsAnalyzing(true);
        setAnalysisError('');

        const locationContext = currentUser.location
            ? `The user's current location is approximately at latitude ${currentUser.location.lat.toFixed(5)}, longitude ${currentUser.location.lng.toFixed(5)}. Infer a common name for this location (e.g., "near Connaught Place, New Delhi") and use that as the incident location, unless the user explicitly specifies a different one in their narrative.`
            : `The user's location is not available. You must extract the location from the user's narrative. If no location is mentioned, leave the 'location' field in the JSON response as an empty string.`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are an intelligent assistant helping a tourist file a police report (E-FIR). Analyze the following incident description provided by the user. Extract the key information and return it as a JSON object.

User's description: "${narrative}"

Contextual Information:
${locationContext}

The JSON object must match the required schema.
- For 'incidentType', choose the most appropriate category from 'Theft', 'Assault', or 'Lost Item'.
- For 'location', determine the location based on the contextual information and user narrative.
- For 'description', create a clear and formal summary suitable for a police report based on the narrative.
- If the user mentions a date and time, extract it for 'dateTime' and format it as YYYY-MM-DDTHH:mm.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            incidentType: { type: Type.STRING, enum: ['Theft', 'Assault', 'Lost Item'], description: "The type of incident." },
                            location: { type: Type.STRING, description: "The location of the incident." },
                            description: { type: Type.STRING, description: "A formal summary of the incident." },
                            dateTime: { type: Type.STRING, description: "The date and time of the incident in YYYY-MM-DDTHH:mm format. Optional." }
                        },
                        required: ["incidentType", "location", "description"]
                    }
                }
            });

            const result = JSON.parse(response.text);
            setIncidentType(result.incidentType);
            setLocation(result.location);
            setDescription(result.description);
            if (result.dateTime) {
                setDateTime(result.dateTime);
            }
            // Move to the next step automatically on success
            setStep(2);
            
        } catch (e) {
            console.error("Error analyzing incident:", e);
            setAnalysisError("Sorry, we couldn't analyze the incident. Please fill the form manually.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">File an Electronic First Information Report (E-FIR)</h1>

            <div className="bg-light-100 dark:bg-dark-800 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <StepIndicator step={1} currentStep={step} label="Basics" />
                    <div className="flex-grow h-px bg-gray-300 dark:bg-dark-600 mt-4 mx-2"></div>
                    <StepIndicator step={2} currentStep={step} label="Description" />
                     <div className="flex-grow h-px bg-gray-300 dark:bg-dark-600 mt-4 mx-2"></div>
                    <StepIndicator step={3} currentStep={step} label="Details" />
                     <div className="flex-grow h-px bg-gray-300 dark:bg-dark-600 mt-4 mx-2"></div>
                    <StepIndicator step={4} currentStep={step} label="Review" />
                </div>
                
                {step === 1 && (
                    <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Incident Basics</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Start by providing the essential details about the incident.</p>
                        
                        <div className="bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-700 p-4 rounded-lg mb-6 space-y-2">
                             <label htmlFor="narrative" className="text-sm font-semibold text-primary-800 dark:text-primary-300">Describe What Happened</label>
                             <p className="text-xs text-primary-700 dark:text-primary-400">Our AI will help you fill out the form based on your story.</p>
                             <textarea 
                                id="narrative"
                                value={narrative}
                                onChange={(e) => setNarrative(e.target.value)}
                                rows={4}
                                placeholder="e.g., Someone on a bike snatched my bag with my phone and wallet while I was walking near Connaught Place around 3 PM yesterday."
                                className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                             />
                             <button onClick={handleAnalyzeIncident} disabled={isAnalyzing} className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed">
                                {isAnalyzing ? 'Analyzing...' : '✨ Analyze Incident with AI'}
                             </button>
                             {analysisError && <p className="text-xs text-red-600 text-center mt-1">{analysisError}</p>}
                        </div>

                        <div className="space-y-4 text-gray-800 dark:text-gray-200">
                            <div>
                                <label className="text-sm">Type of Incident</label>
                                <select value={incidentType} onChange={(e) => setIncidentType(e.target.value)} className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg">
                                    <option>Theft</option>
                                    <option>Assault</option>
                                    <option>Lost Item</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm">Place of Occurrence</label>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                            </div>
                             <div>
                                <label className="text-sm">Date &amp; Time of Incident</label>
                                <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                     <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Incident Description</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Provide a detailed account of the incident. The AI has generated a summary you can edit.</p>
                        <textarea 
                            rows={10}
                            placeholder="Describe the incident in detail..."
                            className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                         />
                    </div>
                )}

                {step === 3 && (
                     <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Additional Details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Add any other relevant information, like suspect description or stolen items.</p>
                         <textarea 
                            rows={10}
                            placeholder="e.g., The suspect was wearing a red jacket. My stolen phone was an iPhone 14."
                            className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                         />
                    </div>
                )}

                {step === 4 && (
                     <div>
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Review & Submit</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Please review all the information carefully before submitting your E-FIR.</p>
                        <div className="space-y-3 bg-gray-50 dark:bg-dark-700 p-4 rounded-lg border border-light-300 dark:border-dark-600">
                            <p className="text-gray-800 dark:text-gray-200"><strong>Type:</strong> {incidentType}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Location:</strong> {location}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Date & Time:</strong> {dateTime ? new Date(dateTime).toLocaleString() : 'Not set'}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Description:</strong> {description}</p>
                        </div>
                    </div>
                )}
                
                <div className="mt-6 flex justify-between">
                    <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"> &larr; Previous</button>
                    <button onClick={() => { if (step < totalSteps) setStep(s => s + 1) }} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        {step === totalSteps ? 'Submit E-FIR' : 'Next Step →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileEfirScreen;