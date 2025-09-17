import React, { useState } from 'react';
import Card from '../shared/Card';

const Toggle: React.FC<{ 
    label: string, 
    description: string, 
    isOn: boolean,
    onToggle: () => void 
}> = ({ label, description, isOn, onToggle }) => {
    return (
        <div className="flex items-start justify-between p-4 border-b border-light-200 dark:border-dark-700 last:border-b-0">
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${isOn ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

interface SettingsState {
    geoFencing: boolean;
    anomalyDetection: boolean;
    panicButton: boolean;
    lowSignal: boolean;
    iotSync: boolean;
    efirAutomation: boolean;
}

const initialSettings: SettingsState = {
    geoFencing: true,
    anomalyDetection: true,
    panicButton: true,
    lowSignal: false,
    iotSync: true,
    efirAutomation: false,
};


const Settings: React.FC = () => {
    const [settings, setSettings] = useState<SettingsState>(initialSettings);
    
    const handleToggle = (key: keyof SettingsState) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveChanges = () => {
        // In a real app, this would be an API call
        console.log('Saving settings:', settings);
        alert('Settings saved successfully!');
    };
    
    const handleCancel = () => {
        // Reset changes to initial state
        setSettings(initialSettings);
        alert('Changes have been canceled.');
    };

  return (
    <div className="space-y-6">
      <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 p-4 pb-0">Alert Preferences</h2>
          <div className="divide-y divide-light-200 dark:divide-dark-700">
            <Toggle label="Geo-fencing Alerts" description="Receive alerts when tourists enter or leave designated zones." isOn={settings.geoFencing} onToggle={() => handleToggle('geoFencing')} />
            <Toggle label="Anomaly Detection" description="Enable AI-based anomaly detection for unusual behavior." isOn={settings.anomalyDetection} onToggle={() => handleToggle('anomalyDetection')} />
            <Toggle label="Panic Button Notifications" description="Immediate notifications for all SOS / Panic Button presses." isOn={settings.panicButton} onToggle={() => handleToggle('panicButton')} />
            <Toggle label="Low Signal Warnings" description="Get notified when a tourist's device has low connectivity." isOn={settings.lowSignal} onToggle={() => handleToggle('lowSignal')} />
          </div>
      </Card>
      
      <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 p-4 pb-0">System Integrations</h2>
           <div className="divide-y divide-light-200 dark:divide-dark-700">
            <div className="flex items-start justify-between p-4">
              <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Blockchain ID Platform</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sync digital IDs with the national blockchain registry.</p>
              </div>
              <span className="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300 px-3 py-1 rounded-full flex-shrink-0">
                  Active
              </span>
            </div>
            <Toggle label="IOT Device Sync" description="Enable real-time synchronization with tourist IOT devices." isOn={settings.iotSync} onToggle={() => handleToggle('iotSync')} />
            <Toggle label="E-FIR Automation" description="Automatically forward critical incident reports to local police." isOn={settings.efirAutomation} onToggle={() => handleToggle('efirAutomation')} />
          </div>
      </Card>
       <div className="flex justify-end space-x-4 mt-6">
            <button onClick={handleCancel} className="bg-light-100 dark:bg-dark-700 border border-light-300 dark:border-dark-600 px-6 py-2 rounded-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-light-200 dark:hover:bg-dark-600">Cancel</button>
            <button onClick={handleSaveChanges} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">Save Changes</button>
        </div>
    </div>
  );
};

export default Settings;