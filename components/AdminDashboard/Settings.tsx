import React, { useState } from 'react';
import Card from '../shared/Card';

const Toggle: React.FC<{ label: string, description: string, defaultChecked?: boolean }> = ({ label, description, defaultChecked = false }) => {
    const [isOn, setIsOn] = useState(defaultChecked);
    return (
        <div className="flex items-start justify-between p-4 border-b border-light-200 dark:border-dark-700 last:border-b-0">
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <button onClick={() => setIsOn(!isOn)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${isOn ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Alert Preferences</h2>
          <div className="divide-y divide-light-200 dark:divide-dark-700">
            <Toggle label="Geo-fencing Alerts" description="Receive alerts when tourists enter or leave designated zones." defaultChecked={true} />
            <Toggle label="Anomaly Detection" description="Enable AI-based anomaly detection for unusual behavior." defaultChecked={true} />
            <Toggle label="Panic Button Notifications" description="Immediate notifications for all SOS / Panic Button presses." defaultChecked={true} />
            <Toggle label="Low Signal Warnings" description="Get notified when a tourist's device has low connectivity." />
          </div>
      </Card>
      
      <Card>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">System Integrations</h2>
           <div className="divide-y divide-light-200 dark:divide-dark-700">
            <Toggle label="Blockchain ID Platform" description="Sync digital IDs with the national blockchain registry." />
            <Toggle label="IOT Device Sync" description="Enable real-time synchronization with tourist IOT devices." defaultChecked={true} />
            <Toggle label="E-FIR Automation" description="Automatically forward critical incident reports to local police." />
          </div>
      </Card>
       <div className="flex justify-end space-x-4 mt-6">
            <button className="bg-light-100 dark:bg-dark-700 border border-light-300 dark:border-dark-600 px-6 py-2 rounded-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-600">Cancel</button>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">Save Changes</button>
        </div>
    </div>
  );
};

export default Settings;
