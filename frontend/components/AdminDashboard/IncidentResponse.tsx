import React, { useState, useMemo } from 'react';
import Card from '../shared/Card';
import MapView from '../shared/MapView';
import { MOCK_OFFICERS, MOCK_ACTIVE_ALERTS } from '../../constants';
import { Officer, ActiveAlert, Tourist } from '../../types';

const ActiveAlertItem: React.FC<{
    alert: ActiveAlert;
    isSelected: boolean;
    onClick: () => void;
}> = ({ alert, isSelected, onClick }) => {
    const getPriorityClasses = () => {
        switch (alert.priority) {
            case 'Critical': return { border: 'border-red-500', bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-600 dark:text-red-400' };
            case 'High': return { border: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400' };
            case 'Medium': return { border: 'border-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10', text: 'text-yellow-600 dark:text-yellow-400' };
            default: return { border: 'border-gray-300', bg: 'bg-gray-50 dark:bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' };
        }
    };
    const priorityClass = getPriorityClasses();

    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-3 rounded-lg border-l-4 transition-all ${isSelected ? `${priorityClass.border} ${priorityClass.bg} shadow-sm` : `border-transparent hover:bg-light-200/50 dark:hover:bg-dark-700/50`}`}
            aria-pressed={isSelected}
        >
            <p className={`font-semibold text-sm ${isSelected ? priorityClass.text : 'text-gray-800 dark:text-gray-200'}`}>{alert.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{alert.user} @ {alert.location}</p>
            <div className="flex justify-between items-end mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">{alert.time}</p>
                {alert.status && <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-0.5 rounded-full">{alert.status}</span>}
            </div>
        </button>
    );
};

const OfficerItem: React.FC<{ officer: Officer; onAssign: () => void; }> = ({ officer, onAssign }) => {
    const getStatusClasses = (status: Officer['status']) => {
        switch (status) {
            case 'Available': return 'bg-green-500';
            case 'Busy': return 'bg-red-500';
            case 'On Route': return 'bg-yellow-500';
        }
    };

    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-light-200/50 dark:hover:bg-dark-700/50">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img src={officer.avatar} alt={officer.name} className="w-9 h-9 rounded-full" />
                    <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ${getStatusClasses(officer.status)} border border-light-100 dark:border-dark-800`}></span>
                </div>
                <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{officer.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{officer.status}</p>
                </div>
            </div>
            {officer.status === 'Available' && (
                <button onClick={onAssign} className="text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 px-3 py-1 rounded-full hover:bg-primary-200 dark:hover:bg-primary-500/30">
                    Assign
                </button>
            )}
        </div>
    );
};

interface IncidentResponseProps {
    tourists: Tourist[];
}

const IncidentResponse: React.FC<IncidentResponseProps> = ({ tourists }) => {
    const [alerts, setAlerts] = useState<ActiveAlert[]>(MOCK_ACTIVE_ALERTS);
    const [officers, setOfficers] = useState<Officer[]>(MOCK_OFFICERS);
    const [selectedAlertId, setSelectedAlertId] = useState<number | null>(alerts.length > 0 ? alerts[0].id : null);
    const [assignments, setAssignments] = useState<Record<number, number>>({ 3: 2 }); // { alertId: officerId }

    const selectedAlert = useMemo(() => alerts.find(a => a.id === selectedAlertId), [alerts, selectedAlertId]);

    const handleAssign = (officerId: number) => {
        if (!selectedAlertId) return;
        setAssignments(prev => ({ ...prev, [selectedAlertId]: officerId }));
        setOfficers(prev => prev.map(o => o.id === officerId ? { ...o, status: 'Busy' } : o));
        setAlerts(prev => prev.map(a => a.id === selectedAlertId ? { ...a, status: 'Assigned' } : a));
    };

    const handleUnassign = (officerId: number) => {
        if (!selectedAlertId || assignments[selectedAlertId] !== officerId) return;
        
        setAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[selectedAlertId];
            return newAssignments;
        });

        setOfficers(prev => prev.map(o => o.id === officerId ? { ...o, status: 'Available' } : o));
        
        setAlerts(prev => prev.map(a => {
            if (a.id === selectedAlertId) {
                const { status, ...rest } = a;
                return rest;
            }
            return a;
        }));
    };

    const handleResolve = () => {
        if (!selectedAlertId) return;

        // Find assigned officer and make them available again
        const assignedOfficerId = assignments[selectedAlertId];
        if (assignedOfficerId) {
            setOfficers(prev =>
                prev.map(o => o.id === assignedOfficerId ? { ...o, status: 'Available' } : o)
            );
        }

        const currentIndex = alerts.findIndex(a => a.id === selectedAlertId);
        const remainingAlerts = alerts.filter(a => a.id !== selectedAlertId);

        // Remove the alert from the list of active alerts
        setAlerts(remainingAlerts);

        // Remove the assignment
        setAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[selectedAlertId];
            return newAssignments;
        });

        // Smartly select the next alert
        if (remainingAlerts.length > 0) {
            // If the deleted item was the last in the list, select the new last item.
            // Otherwise, select the item that took its place.
            const newIndex = currentIndex >= remainingAlerts.length ? remainingAlerts.length - 1 : currentIndex;
            setSelectedAlertId(remainingAlerts[newIndex].id);
        } else {
            setSelectedAlertId(null);
        }
    };

    const assignedOfficer = useMemo(() => {
        if (!selectedAlertId || !assignments[selectedAlertId]) return null;
        return officers.find(o => o.id === assignments[selectedAlertId]);
    }, [selectedAlertId, assignments, officers]);

    const availableOfficers = officers.filter(o => o.status === 'Available');

    const mapCoords = (lat: number, lng: number) => {
        const mapX = ((lng - 77.1) / 0.2) * 300;
        const mapY = ((28.7 - lat) / 0.2) * 180;
        return { x: Math.max(0, Math.min(300, mapX)), y: Math.max(0, Math.min(180, mapY)) };
    };

    const touristPins = tourists
        .filter(t => t.location)
        .map(tourist => ({
            id: tourist.touristId!,
            ...mapCoords(tourist.location!.lat, tourist.location!.lng),
            color: '#22c55e', // green for active tourist
            label: tourist.fullName,
        }));

    const alertPins = alerts.map(alert => {
        const mockCoords: { [key: number]: { x: number, y: number } } = {
            1: { x: 150, y: 50 },
            2: { x: 180, y: 130 },
            3: { x: 80, y: 90 }
        };
        let color = 'blue';
        if (alert.priority === 'Critical') color = '#ef4444';
        else if (alert.priority === 'High') color = '#f97316';
        else if (alert.priority === 'Medium') color = '#eab308';

        return {
            id: alert.id,
            x: mockCoords[alert.id]?.x || 50,
            y: mockCoords[alert.id]?.y || 50,
            color,
            label: alert.user,
        };
    });
    
    const allPins = [...alertPins, ...touristPins];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
                <Card className="h-[50vh] lg:h-[calc(100vh-8rem)] flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Interactive Incident Map</h2>
                    <div className="flex-grow bg-light-200 dark:bg-dark-700 rounded-lg">
                        <MapView
                            pins={allPins}
                            selectedPinId={selectedAlertId}
                            onPinClick={(id) => setSelectedAlertId(id as number)}
                        />
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card className="max-h-[45vh] flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Active Alerts Feed</h2>
                    <div className="flex-grow space-y-2 pr-2 -mr-2 overflow-y-auto">
                        {alerts.map(alert => (
                            <ActiveAlertItem
                                key={alert.id}
                                alert={alert}
                                isSelected={selectedAlertId === alert.id}
                                onClick={() => setSelectedAlertId(alert.id)}
                            />
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Incident Action Panel</h2>
                    {selectedAlert ? (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Assigned Officer</h3>
                                {assignedOfficer ? (
                                    <div className="flex items-center justify-between p-2 mt-1 bg-light-200/50 dark:bg-dark-700/50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <img src={assignedOfficer.avatar} alt={assignedOfficer.name} className="w-9 h-9 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{assignedOfficer.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{assignedOfficer.status}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleUnassign(assignedOfficer.id)} className="text-xs font-semibold text-red-600 hover:underline">Unassign</button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No officer assigned.</p>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Available Officers</h3>
                                <div className="mt-1 space-y-1 max-h-40 overflow-y-auto">
                                    {availableOfficers.length > 0 && !assignedOfficer ? availableOfficers.map(officer => (
                                        <OfficerItem key={officer.id} officer={officer} onAssign={() => handleAssign(officer.id)} />
                                    )) : <p className="text-sm text-gray-500 dark:text-gray-400 p-2">{assignedOfficer ? 'Officer already assigned.' : 'No officers available.'}</p>}
                                </div>
                            </div>
                             <div className="flex space-x-2 pt-4 border-t border-light-200 dark:border-dark-700">
                                <button onClick={handleResolve} className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-700">Resolve</button>
                                <button className="bg-light-200 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-light-300 dark:hover:bg-dark-600">Add Log</button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            <p>Select an alert from the feed to view details and take action.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default IncidentResponse;
