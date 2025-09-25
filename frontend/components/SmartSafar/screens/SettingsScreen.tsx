import React, { useState } from 'react';

const Toggle: React.FC<{ label: string, description?: string, isOn: boolean, onToggle: () => void }> = ({ label, description, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between py-3 border-b border-light-200 dark:border-dark-700 last:border-b-0">
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isOn ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-700'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

interface SettingsScreenProps {
    onLogout: () => void;
    isTrackingEnabled: boolean;
    onToggleTracking: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout, isTrackingEnabled, onToggleTracking }) => {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Settings & Support</h1>
            
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Privacy Settings</h2>
                <Toggle 
                    label="Real-time Location Tracking" 
                    description="Allow SmartSafar to track your location for safety."
                    isOn={isTrackingEnabled}
                    onToggle={onToggleTracking}
                />
            </div>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Alert Preferences</h2>
                <Toggle label="High-Risk Zone Alerts" description="Notify me when I enter a high-risk area." isOn={true} onToggle={() => {}} />
                <Toggle label="Weather Updates" description="Receive alerts for significant weather changes." isOn={true} onToggle={() => {}}/>
                <Toggle label="Itinerary Changes" description="Get notified about updates to my daily plan." isOn={false} onToggle={() => {}}/>
            </div>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Account</h2>
                 <div className="divide-y divide-light-200 dark:divide-dark-700">
                    <button className="w-full text-left py-3 px-2 text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-700 rounded-t-lg">Edit Profile</button>
                    <button className="w-full text-left py-3 px-2 text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-700">Change Password</button>
                    <button onClick={onLogout} className="w-full text-left py-3 px-2 text-red-500 font-semibold hover:bg-light-200 dark:hover:bg-dark-700 rounded-b-lg">Log Out</button>
                 </div>
            </div>

             <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Support</h2>
                 <div className="divide-y divide-light-200 dark:divide-dark-700">
                    <a href="mailto:support@smartsafar.com" className="w-full text-left py-3 px-2 flex justify-between items-center text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-700 rounded-t-lg">
                        <span>Email Support</span>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">support@smartsafar.com</span>
                    </a>
                    <a href="tel:+911234567890" className="w-full text-left py-3 px-2 flex justify-between items-center text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-700">
                        <span>Call Us</span>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">+91-123-456-7890</span>
                    </a>
                    <button className="w-full text-left py-3 px-2 flex justify-between items-center text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-700 rounded-b-lg">
                        <span>Help Center</span>
                        <span className="text-gray-400">&rarr;</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default SettingsScreen;