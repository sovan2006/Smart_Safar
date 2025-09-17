import React, { useState } from 'react';
import { MOCK_TOURIST_ALERTS } from '../../../constants';
import { Alert } from '../../../types';

interface AlertItemProps {
    alert: Alert;
    onDismiss: (id: number) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onDismiss }) => {
    const getIcon = () => {
        switch(alert.type) {
            case 'alert': return <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center text-xl">🔔</div>;
            case 'info': return <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center text-xl">ℹ️</div>;
            default: return null;
        }
    }

    return (
        <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm flex space-x-4 items-start">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{alert.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{alert.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{alert.time}</p>
            </div>
            <button onClick={() => onDismiss(alert.id)} className="text-gray-400 dark:text-gray-500 self-start text-xl leading-none" aria-label={`Dismiss alert: ${alert.title}`}>&times;</button>
        </div>
    )
}

const AlertsScreen: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>(MOCK_TOURIST_ALERTS);
    const [activeTab, setActiveTab] = useState('All');

    const handleDismiss = (id: number) => {
        setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
    };

    const handleMarkAllAsRead = () => {
        setAlerts([]);
    };

    const filteredAlerts = alerts.filter(alert => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Alerts') return alert.type === 'alert';
        if (activeTab === 'Updates') return alert.type === 'info';
        return false;
    });

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Alerts & Notifications</h1>
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 bg-light-200 dark:bg-dark-700 p-1 rounded-full">
                        <button onClick={() => setActiveTab('All')} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'All' ? 'bg-primary-600 text-white shadow' : 'text-gray-700 dark:text-gray-300'}`}>All</button>
                        <button onClick={() => setActiveTab('Alerts')} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'Alerts' ? 'bg-primary-600 text-white shadow' : 'text-gray-700 dark:text-gray-300'}`}>Alerts</button>
                        <button onClick={() => setActiveTab('Updates')} className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'Updates' ? 'bg-primary-600 text-white shadow' : 'text-gray-700 dark:text-gray-300'}`}>Updates</button>
                    </div>
                </div>
                 {alerts.length > 0 && (
                    <button onClick={handleMarkAllAsRead} className="text-sm text-primary-600 dark:text-primary-400 mb-4 font-semibold">✓ Mark all as read</button>
                )}
                <div className="space-y-4">
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => <AlertItem key={alert.id} alert={alert} onDismiss={handleDismiss} />)
                    ) : (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            <div className="w-16 h-16 mx-auto bg-light-200 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4 text-3xl">🎉</div>
                            <h3 className="font-semibold text-lg">All caught up!</h3>
                            <p>You have no new notifications.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AlertsScreen;