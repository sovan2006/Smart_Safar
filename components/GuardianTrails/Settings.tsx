
import React, { useState } from 'react';
import Card from '../shared/Card';

const Toggle: React.FC<{ label: string }> = ({ label }) => {
    const [isOn, setIsOn] = useState(false);
    return (
        <div className="flex items-center justify-between p-3 hover:bg-brand-dark rounded-lg">
            <span>{label}</span>
            <button onClick={() => setIsOn(!isOn)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-brand-teal' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
    );
};

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <h2 className="text-lg font-semibold mb-2">General Settings</h2>
            <Toggle label="Multilingual Support" />
            <Toggle label="Real-time Tracking (Opt-in)" />
            <Toggle label="Dark Mode" />
        </Card>
        <Card>
            <h2 className="text-lg font-semibold mb-2">Alert Preferences</h2>
            <Toggle label="Geo-fencing Alerts" />
            <Toggle label="Anamaly Detection" />
            <Toggle label="Panic Button Notifications" />
        </Card>
        <Card>
            <h2 className="text-lg font-semibold mb-2">Account & Security</h2>
            <div className="p-3">
                <p>Change Password</p>
                <p className="text-sm text-gray-400">English, Hindi, Bengali, Assa ++7 others</p>
            </div>
        </Card>
         <Card className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">System Integrations</h2>
            <div className="p-3 flex justify-between items-center">
                <span>Blockchain ID Platform</span>
                <span className="text-gray-400">2.12.38</span>
            </div>
             <div className="p-3 flex justify-between items-center">
                <span>IOT Device Sync</span>
                 <span className="text-gray-400">2.22.6.152</span>
            </div>
             <div className="p-3 flex justify-between items-center">
                <span>E-FIR Automation</span>
            </div>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            <button className="w-full bg-brand-teal text-brand-dark px-4 py-2 rounded-md font-semibold mt-4">Manage Roles & Permissions</button>
        </Card>
      </div>
       <div className="flex justify-end space-x-4">
            <button className="bg-brand-dark-secondary border border-brand-border px-6 py-2 rounded-md">Cancel</button>
            <button className="bg-brand-teal text-brand-dark px-6 py-2 rounded-md font-semibold">Save Changes</button>
        </div>
    </div>
  );
};

export default Settings;
