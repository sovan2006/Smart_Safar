import React from 'react';
import Card from '../shared/Card';
import MapView from '../shared/MapView';
// FIX: Import types from types.ts
import { MOCK_OFFICERS, MOCK_ACTIVE_ALERTS, ThreeDotsIcon, RefreshIcon } from '../../constants';
import { Officer, ActiveAlert } from '../../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

const OfficerItem: React.FC<{ officer: Officer }> = ({ officer }) => {
    const getStatusClasses = () => {
        switch (officer.status) {
            case 'Available': return 'bg-green-500';
            case 'Busy': return 'bg-red-500';
            case 'On Route': return 'bg-yellow-500';
        }
    }
    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-light-200 dark:hover:bg-dark-700">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img src={officer.avatar} alt={officer.name} className="w-10 h-10 rounded-full" />
                    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${getStatusClasses()} border-2 border-light-100 dark:border-dark-800`}></span>
                </div>
                <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{officer.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{officer.status}</p>
                </div>
            </div>
            {officer.status === 'Available' && (
                <button className="text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 px-3 py-1 rounded-full hover:bg-primary-200 dark:hover:bg-primary-500/30">
                    Assign
                </button>
            )}
        </div>
    );
};

const ActiveAlertItem: React.FC<{ alert: ActiveAlert }> = ({ alert }) => {
    const getPriorityClasses = () => {
        switch (alert.priority) {
            case 'Critical': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-500/10';
            case 'High': return 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-500/10';
            case 'Medium': return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10';
        }
    }
    return (
        <div className={`p-3 rounded-r-lg ${getPriorityClasses()}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{alert.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.user} @ {alert.location}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><ThreeDotsIcon className="w-5 h-5" /></button>
            </div>
            <div className="flex justify-between items-end mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">{alert.time}</p>
                {alert.status && <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-0.5 rounded-full">{alert.status}</span>}
            </div>
        </div>
    )
}

const IncidentResponse: React.FC = () => {
    const responseAnalyticsData = [
        {name: '00:00', value: 0}, {name: '04:00', value: 0.25}, {name: '08:00', value: 0.1}, {name: '12:00', value: 0.75},
        {name: '16:00', value: 0.5}, {name: '20:00', value: 1}, {name: '24:00', value: 0.4}
    ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full items-start">
      <div className="xl:col-span-2 space-y-6">
        <Card className="h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Interactive Incident Map</h2>
            <div className="flex-grow bg-light-200 dark:bg-dark-700 rounded-lg min-h-[400px]">
                <MapView pins={[{ x: 70, y: 70, color: 'red', label: 'SOS' }, { x: 140, y: 40, color: 'orange', label: 'Breach' }]} />
            </div>
        </Card>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Officer Availability Panel</h2>
                    <button className="text-xs font-semibold bg-primary-600 text-white px-3 py-1 rounded-full hover:bg-primary-700">One-click Assign</button>
                </div>
                <div className="space-y-2">
                    {MOCK_OFFICERS.map(officer => <OfficerItem key={officer.id} officer={officer} />)}
                </div>
            </Card>
            <Card>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">AI-Powered Suggestions</h2>
                    <button className="text-gray-400 hover:text-gray-600"><RefreshIcon className="w-5 h-5" /></button>
                </div>
                <div className="h-48 flex items-center justify-center bg-light-200 dark:bg-dark-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Generating insights...</p>
                </div>
            </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="max-h-[50vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Active Alerts Feed</h2>
            <div className="space-y-3">
                {MOCK_ACTIVE_ALERTS.map(alert => <ActiveAlertItem key={alert.id} alert={alert} />)}
            </div>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Response Analytics & Trends</h2>
            <div className="grid grid-cols-3 gap-4 text-center my-4">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Response Time</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">5m 30s</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cases Resolved</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">2</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Most Common</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">Geo-Fence</p>
                </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-2">Incidents Over Time</h3>
            <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseAnalyticsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <Line type="monotone" dataKey="value" stroke="#0284c7" strokeWidth={2} dot={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                         <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
             <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-2">Incident Triggers</h3>
             <div className="space-y-2">
                <div className="w-full bg-light-200 dark:bg-dark-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "80%"}}></div>
                </div>
                <div className="w-full bg-light-200 dark:bg-dark-700 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{width: "45%"}}></div>
                </div>
             </div>
        </Card>
      </div>
    </div>
  );
};

export default IncidentResponse;