
import React from 'react';
import Card from '../shared/Card';
import { MOCK_ALERTS } from '../../constants';

const AlertItem: React.FC<{ alert: typeof MOCK_ALERTS[0] }> = ({ alert }) => (
    <Card className="mb-4">
        <p className="font-semibold text-red-400 flex items-center">
            <span className="w-5 h-5 mr-2">⚠️</span> {alert.title}
        </p>
        <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
        <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
        <div className="mt-3 space-x-2">
            <button className="text-xs bg-brand-border px-3 py-1 rounded hover:bg-gray-600 transition-colors">View Details</button>
            <button className="text-xs bg-brand-border px-3 py-1 rounded hover:bg-gray-600 transition-colors">Assign Police</button>
        </div>
    </Card>
);

const IncidentResponse: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 h-full">
        <Card className="h-full flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Active Incidents & Live Map</h2>
          <div className="flex-grow bg-brand-dark rounded-md">
             <img src="https://picsum.photos/seed/activeresponse/1000/600" alt="Active Incidents Map" className="object-cover w-full h-full rounded-md opacity-70"/>
          </div>
        </Card>
      </div>
      <div className="h-full flex flex-col">
        <Card className="flex-grow flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold mb-4">Incident Details & Assignment</h2>
          <div className="flex-grow overflow-y-auto pr-2">
            {MOCK_ALERTS.map(alert => <AlertItem key={alert.id} alert={alert} />)}
            <AlertItem key={3} alert={{id:3, title: "EMERGENCY: SOS SIGNAL", description: "Jirya S. - Mago Cave", time:"3m ago", type:"warning"}}/>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IncidentResponse;
