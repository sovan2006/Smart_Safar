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
            <div className="p-4 flex flex-col items-center justify-center h-full text-center bg-light-200 dark:bg-dark-900">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Thank You!</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm">Your feedback has been submitted successfully. We appreciate you helping us improve SmartSafar.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">Submit Another</button>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Feedback</h1>
            
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Feedback Type</label>
                        <div className="flex space-x-2 bg-light-200 dark:bg-dark-700 p-1 rounded-full mt-2">
                            <button type="button" onClick={() => setFeedbackType('General')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'General' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'}`}>General</button>
                            <button type="button" onClick={() => setFeedbackType('Bug')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'Bug' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'}`}>Bug Report</button>
                            <button type="button" onClick={() => setFeedbackType('Feature')} className={`flex-1 px-4 py-1 rounded-full text-sm font-medium transition-colors ${feedbackType === 'Feature' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'}`}>Feature</button>
                        </div>
                    </div>

                     <div>
                         <label htmlFor="feedback-message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Message</label>
                         <textarea 
                            id="feedback-message"
                            rows={6}
                            placeholder="Tell us what you think..."
                            className="w-full mt-1 p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            required
                         />
                    </div>

                     <div>
                        <button type="submit" className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold transition-colors hover:bg-primary-700">
                           Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackScreen;