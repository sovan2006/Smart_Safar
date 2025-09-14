
import React from 'react';
import Card from '../shared/Card';
import { MOCK_ALERTS } from '../../constants';

const StatCard: React.FC<{ value: string; label: string; }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-brand-teal">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

const AlertItem: React.FC<{ alert: typeof MOCK_ALERTS[0] }> = ({ alert }) => (
    <div className="p-3 bg-brand-dark rounded-md">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-red-400 flex items-center">
                    <span className="w-5 h-5 mr-2">⚠️</span> {alert.title}
                </p>
                <p className="text-sm text-gray-400">{alert.description}</p>
            </div>
            <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{alert.time}</p>
        </div>
        <div className="mt-2">
            <button className="text-xs bg-brand-border px-3 py-1 rounded hover:bg-gray-600 transition-colors">View Details</button>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Live Tourist Heat Map</h2>
          <div className="h-96 bg-brand-dark rounded-md flex items-center justify-center">
            <img src="https://picsum.photos/seed/map1/800/400" alt="Heat map" className="object-cover w-full h-full rounded-md opacity-70"/>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h2 className="text-lg font-semibold mb-4">High-Risk Zones</h2>
                 <div className="h-64 bg-brand-dark rounded-md flex items-center justify-center">
                    <img src="https://picsum.photos/seed/map2/400/300" alt="Risk Zones" className="object-cover w-full h-full rounded-md opacity-70"/>
                 </div>
            </Card>
            <Card>
                <h2 className="text-lg font-semibold mb-4">Alerts & Incidents</h2>
                 <div className="h-64 bg-brand-dark rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Alerts & Incidents Chart</p>
                 </div>
            </Card>
        </div>
      </div>

      {/* Right Sidebar Column */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Real-Time Stats</h2>
          <div className="flex justify-around">
            <StatCard value="12,450" label="Total Tourists" />
            <StatCard value="348" label="Incidents Resolved" />
            <StatCard value="12" label="Active Incidents" />
            <StatCard value="28" label="Safe Zones" />
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
          <div className="space-y-3">
            {MOCK_ALERTS.map(alert => <AlertItem key={alert.id} alert={alert} />)}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
