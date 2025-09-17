import React from 'react';
import Card from '../shared/Card';
import { MOCK_ACTIVE_ALERTS, REPORT_CHART_DATA } from '../../constants';
import MapView from '../shared/MapView';
import { ActiveAlert } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <Card>
        <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
    </Card>
);

const AlertItem: React.FC<{ alert: ActiveAlert }> = ({ alert }) => {
    const getPriorityClasses = () => {
        switch (alert.priority) {
            case 'Critical': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-500/10';
            case 'High': return 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-500/10';
            case 'Medium': return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10';
        }
    }
    return (
        <div className={`p-3 rounded-r-lg ${getPriorityClasses()}`}>
            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{alert.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{alert.user} @ {alert.location}</p>
            <div className="flex justify-between items-end mt-1">
                <p className="text-xs text-gray-400 dark:text-gray-500">{alert.time}</p>
                {alert.status && <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-0.5 rounded-full">{alert.status}</span>}
            </div>
        </div>
    )
}

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard title="Total Tourists" value="12,450" />
         <StatCard title="Active Incidents" value="12" />
         <StatCard title="Resolved Today" value="48" />
         <StatCard title="Officers on Duty" value="24" />
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Monthly Incident Overview</h2>
                    <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={REPORT_CHART_DATA}>
                        <XAxis dataKey="name" stroke="currentColor" tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400"/>
                        <YAxis stroke="currentColor" tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
                        <Tooltip 
                            cursor={{fill: 'rgba(113, 113, 122, 0.1)'}}
                            contentStyle={{ 
                              backgroundColor: 'var(--color-light-100, #ffffff)', 
                              border: '1px solid var(--color-light-300, #e2e8f0)', 
                              borderRadius: '0.5rem'
                            }}
                            />
                        <Legend />
                        <Bar dataKey="Incidents" fill="#0ea5e9" name="Total Incidents" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Resolved" fill="#84cc16" name="Incidents Resolved" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div>
                 <Card className="h-full">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Live Alerts</h2>
                    <div className="space-y-3">
                        {MOCK_ACTIVE_ALERTS.map(alert => <AlertItem key={alert.id} alert={alert} />)}
                    </div>
                </Card>
            </div>
       </div>

        <Card>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Live Tourist Heatmap</h2>
            <div className="h-96">
                <MapView pins={[{ x: 80, y: 50, color: 'red' }, { x: 120, y: 80, color: 'orange' }, { x: 95, y: 65, color: 'yellow' }]} />
            </div>
       </Card>

    </div>
  );
};

export default Dashboard;