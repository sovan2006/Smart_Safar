
import React, { useState } from 'react';
import { MOCK_TOURIST_ALERTS } from '../../../constants';
import { Alert } from '../../../types';

const AlertItem: React.FC<{alert: Alert}> = ({ alert }) => {
    const getIcon = () => {
        switch(alert.type) {
            case 'alert': return <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">🔔</div>;
            case 'info': return <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">ℹ️</div>;
            default: return null;
        }
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm flex space-x-4">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="flex-grow">
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm text-gray-500">{alert.description}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>
            <button className="text-gray-400 self-start">&times;</button>
        </div>
    )
}

const AlertsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredAlerts = MOCK_TOURIST_ALERTS.filter(alert => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Alerts') return alert.type === 'alert';
        if (activeTab === 'Updates') return alert.type === 'info';
        return false;
    });

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Alerts & Notifications</h1>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
                        <button onClick={() => setActiveTab('All')} className={`px-4 py-1 rounded-full text-sm ${activeTab === 'All' ? 'bg-cyan-500 text-white' : ''}`}>All</button>
                        <button onClick={() => setActiveTab('Alerts')} className={`px-4 py-1 rounded-full text-sm ${activeTab === 'Alerts' ? 'bg-cyan-500 text-white' : ''}`}>Alerts</button>
                        <button onClick={() => setActiveTab('Updates')} className={`px-4 py-1 rounded-full text-sm ${activeTab === 'Updates' ? 'bg-cyan-500 text-white' : ''}`}>Updates</button>
                    </div>
                </div>
                <button className="text-sm text-cyan-600 mb-4">✓ Mark all as read</button>
                <div className="space-y-4">
                    {filteredAlerts.map(alert => <AlertItem key={alert.id} alert={alert}/>)}
                </div>
            </div>
        </div>
    )
}

export default AlertsScreen;
