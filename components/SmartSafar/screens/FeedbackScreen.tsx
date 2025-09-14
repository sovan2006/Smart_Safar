import React, { useState } from 'react';

const FeedbackScreen: React.FC = () => {
    const [feedbackType, setFeedbackType] = useState('General');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full text-center bg-gray-50">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
                <h1 className="text-xl font-bold">Thank You!</h1>
                <p className="text-gray-600 max-w-sm">Your feedback has been submitted successfully. We appreciate you helping us improve SmartSafar.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">Submit Another</button>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Feedback</h1>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Feedback Type</label>
                        <div className="flex space-x-2 bg-gray-100 p-1 rounded-full mt-2">
                            <button type="button" onClick={() => setFeedbackType('General')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'General' ? 'bg-cyan-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>General</button>
                            <button type="button" onClick={() => setFeedbackType('Bug')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'Bug' ? 'bg-cyan-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Bug Report</button>
                            <button type="button" onClick={() => setFeedbackType('Feature')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'Feature' ? 'bg-cyan-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Feature</button>
                        </div>
                    </div>

                    <div>
                         <label htmlFor="feedback-message" className="text-sm font-semibold text-gray-700">Your Message</label>
                         <textarea 
                            id="feedback-message"
                            rows={6}
                            placeholder="Tell us what you think..."
                            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
                            required
                         />
                    </div>

                     <div>
                        <button type="submit" className="w-full bg-cyan-500 text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-cyan-600">
                           Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackScreen;
