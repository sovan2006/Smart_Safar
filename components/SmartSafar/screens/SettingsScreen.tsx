import React, { useState } from 'react';

const Toggle: React.FC<{ label: string, description?: string }> = ({ label, description }) => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
                <p className="font-semibold">{label}</p>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
            <button onClick={() => setIsOn(!isOn)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isOn ? 'bg-cyan-500' : 'bg-gray-300'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

const SettingsScreen: React.FC = () => {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Settings & Support</h1>
            
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Alert Preferences</h2>
                <Toggle label="High-Risk Zone Alerts" description="Notify me when I enter a high-risk area." />
                <Toggle label="Weather Updates" description="Receive alerts for significant weather changes." />
                <Toggle label="Itinerary Changes" description="Get notified about updates to my daily plan." />
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Account</h2>
                 <button className="w-full text-left py-3 border-b hover:bg-gray-50 rounded-t-lg">Edit Profile</button>
                 <button className="w-full text-left py-3 border-b hover:bg-gray-50">Change Password</button>
                 <button className="w-full text-left py-3 text-red-500 hover:bg-gray-50 rounded-b-lg">Log Out</button>
            </div>

             <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Support</h2>
                 <button className="w-full text-left py-3 border-b hover:bg-gray-50 rounded-t-lg">Help Center</button>
                 <button className="w-full text-left py-3 border-b hover:bg-gray-50">Contact Support</button>
                 <button className="w-full text-left py-3 hover:bg-gray-50 rounded-b-lg">Terms of Service</button>
            </div>
        </div>
    );
};

export default SettingsScreen;
