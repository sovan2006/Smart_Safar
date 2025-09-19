import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import Card from '../shared/Card';
import { SearchIcon, ThreeDotsIcon } from '../../constants';
import { MOCK_DETAILED_INCIDENTS } from '../../constants';
import { DetailedIncident, Tourist } from '../../types';
import MapView from '../shared/MapView';

// --- MODAL COMPONENTS --- //
const IncidentFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (incident: DetailedIncident) => void;
    incidentToEdit: DetailedIncident | null;
}> = ({ isOpen, onClose, onSave, incidentToEdit }) => {
    if (!isOpen) return null;

    const isEditing = !!incidentToEdit;
    const [formData, setFormData] = useState({
        type: incidentToEdit?.type || '',
        tourist: incidentToEdit?.tourist || '',
        location: incidentToEdit?.location || '',
        priority: incidentToEdit?.priority || 'Medium',
        status: incidentToEdit?.status || 'Unassigned',
    });

    useEffect(() => {
        if (incidentToEdit) {
            setFormData({
                type: incidentToEdit.type,
                tourist: incidentToEdit.tourist,
                location: incidentToEdit.location,
                priority: incidentToEdit.priority,
                status: incidentToEdit.status,
            });
        } else {
            // Reset for new incident
            setFormData({ type: '', tourist: '', location: '', priority: 'Medium', status: 'Unassigned' });
        }
    }, [incidentToEdit, isOpen]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const savedIncident: DetailedIncident = {
            id: incidentToEdit?.id || `GN-2024-${Math.floor(Math.random() * 9000) + 1000}`,
            time: incidentToEdit?.time || 'Just now',
            ...formData,
            priority: formData.priority as DetailedIncident['priority'],
            status: formData.status as DetailedIncident['status'],
        };
        onSave(savedIncident);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-xl shadow-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{isEditing ? 'Edit Incident Report' : 'New Incident Report'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tourist Name</label>
                        <input name="tourist" type="text" value={formData.tourist} onChange={handleChange} required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Incident Type</label>
                        <input name="type" type="text" value={formData.type} onChange={handleChange} placeholder="e.g., Medical" required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                        <input name="location" type="text" value={formData.location} onChange={handleChange} required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange} required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg">
                           <option>Unassigned</option>
                           <option>Assigned</option>
                           <option>Investigating</option>
                           <option>Resolved</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="bg-light-200 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-light-300 dark:hover:bg-dark-600">Cancel</button>
                        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700">{isEditing ? 'Save Changes' : 'Add Incident'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const IncidentDetailsModal: React.FC<{ incident: DetailedIncident | null; onClose: () => void; }> = ({ incident, onClose }) => {
    if (!incident) return null;
    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-xl shadow-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Incident Details: {incident.id}</h2>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">&times;</button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong className="block text-gray-500 dark:text-gray-400">Tourist:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.tourist}</span></div>
                        <div><strong className="block text-gray-500 dark:text-gray-400">Type:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.type}</span></div>
                        <div><strong className="block text-gray-500 dark:text-gray-400">Location:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.location}</span></div>
                        <div><strong className="block text-gray-500 dark:text-gray-400">Priority:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.priority}</span></div>
                        <div><strong className="block text-gray-500 dark:text-gray-400">Status:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.status}</span></div>
                         <div><strong className="block text-gray-500 dark:text-gray-400">Time:</strong><span className="font-medium text-gray-800 dark:text-gray-200">{incident.time}</span></div>
                    </div>
                     <div>
                        <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Location on Map</h3>
                        <div className="h-48 bg-light-200 dark:bg-dark-700 rounded-lg">
                           <MapView pins={incident.lat && incident.lng ? [{ id: incident.id, x: 150, y: 90, color: 'red', label: incident.tourist }] : []} />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                         <button type="button" onClick={onClose} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- RENDER HELPER FUNCTIONS & COMPONENTS --- //
const getPriorityClasses = (priority: DetailedIncident['priority']) => {
    switch (priority) {
        case 'Critical': return 'text-red-500';
        case 'High': return 'text-orange-500';
        case 'Medium': return 'text-yellow-500';
        case 'Low': return 'text-blue-500';
        default: return 'text-gray-500';
    }
};

const getStatusClasses = (status: DetailedIncident['status']) => {
    switch (status) {
        case 'Unassigned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case 'Assigned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'Investigating': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
        case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const StatCard: React.FC<{ title: string; value: number; color: string; }> = ({ title, value, color }) => (
    <Card className={`!p-4 bg-opacity-50 ${color}`}>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
    </Card>
);

const IncidentRow: React.FC<{ incident: DetailedIncident; onViewDetails: () => void; onEdit: () => void; }> = ({ incident, onViewDetails, onEdit }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <tr className="border-b border-light-200 dark:border-dark-700 last:border-0 hover:bg-light-200/50 dark:hover:bg-dark-700/50">
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{incident.time}</td>
            <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{incident.id}</td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{incident.type}</td>
            <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{incident.tourist}</td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{incident.location}</td>
            <td className={`px-4 py-3 font-bold ${getPriorityClasses(incident.priority)}`}>{incident.priority}</td>
            <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClasses(incident.status)}`}>{incident.status}</span></td>
            <td className="px-4 py-3 text-center">
                 <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                        <ThreeDotsIcon className="w-5 h-5" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-light-100 dark:bg-dark-800 rounded-md shadow-lg border border-light-200 dark:border-dark-700 z-10">
                            <button onClick={() => { onViewDetails(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700">View Details</button>
                            <button onClick={() => { onEdit(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700">Edit</button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700">Assign Officer</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

const IncidentCard: React.FC<{ incident: DetailedIncident; onViewDetails: () => void; onEdit: () => void; }> = ({ incident, onViewDetails, onEdit }) => (
    <Card className="!p-0 mb-4 overflow-hidden">
        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{incident.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{incident.tourist} - {incident.location}</p>
                </div>
                <span className={`text-sm font-bold ${getPriorityClasses(incident.priority)}`}>{incident.priority}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 font-semibold rounded-full ${getStatusClasses(incident.status)}`}>{incident.status}</span>
                <span className="text-gray-400">{incident.time}</span>
            </div>
        </div>
        <div className="bg-light-200/50 dark:bg-dark-700/50 px-4 py-2 flex justify-end space-x-4">
            <button onClick={onEdit} className="text-sm font-semibold text-primary-600 dark:text-primary-400">Edit</button>
            <button onClick={onViewDetails} className="text-sm font-semibold text-primary-600 dark:text-primary-400">View Details</button>
        </div>
    </Card>
);

interface IncidentManagementProps {
    tourists: Tourist[];
}

// --- MAIN COMPONENT --- //
const IncidentManagement: React.FC<IncidentManagementProps> = ({ tourists }) => {
    const [incidents, setIncidents] = useState<DetailedIncident[]>(MOCK_DETAILED_INCIDENTS);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [incidentToEdit, setIncidentToEdit] = useState<DetailedIncident | null>(null);
    const [selectedIncidentForDetails, setSelectedIncidentForDetails] = useState<DetailedIncident | null>(null);
    
    const handleOpenFormModal = (incident: DetailedIncident | null) => {
        setIncidentToEdit(incident);
        setIsFormModalOpen(true);
    };

    const handleSaveIncident = (incidentToSave: DetailedIncident) => {
        if (incidentToEdit) { // Editing existing
            setIncidents(incidents.map(inc => inc.id === incidentToSave.id ? incidentToSave : inc));
        } else { // Adding new
            setIncidents(prev => [incidentToSave, ...prev]);
        }
        setIsFormModalOpen(false);
        setIncidentToEdit(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="relative">
                    <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by ID, Tourist, Location..." className="w-full sm:w-80 bg-light-100 dark:bg-dark-800 border border-light-300 dark:border-dark-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <button onClick={() => handleOpenFormModal(null)} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                    + New Incident Report
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Critical Incidents" value={incidents.filter(i => i.priority === 'Critical').length} color="bg-red-100 dark:bg-red-500/10 text-red-800 dark:text-red-300" />
                <StatCard title="High Priority" value={incidents.filter(i => i.priority === 'High').length} color="bg-orange-100 dark:bg-orange-500/10 text-orange-800 dark:text-orange-300" />
                <StatCard title="Unassigned" value={incidents.filter(i => i.status === 'Unassigned').length} color="bg-yellow-100 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-300" />
                <StatCard title="Resolved (24h)" value={incidents.filter(i => i.status === 'Resolved').length} color="bg-green-100 dark:bg-green-500/10 text-green-800 dark:text-green-300" />
            </div>

            {/* Responsive Incident List */}
            <div>
                {/* Mobile Card View */}
                <div className="md:hidden">
                    {incidents.map(incident => (
                        <IncidentCard 
                            key={incident.id} 
                            incident={incident} 
                            onViewDetails={() => setSelectedIncidentForDetails(incident)}
                            onEdit={() => handleOpenFormModal(incident)}
                        />
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <Card className="!p-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-light-200/50 dark:bg-dark-700/50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Incident ID</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tourist</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-light-200 dark:divide-dark-700">
                                    {incidents.map(incident => 
                                        <IncidentRow 
                                            key={incident.id} 
                                            incident={incident} 
                                            onViewDetails={() => setSelectedIncidentForDetails(incident)}
                                            onEdit={() => handleOpenFormModal(incident)}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>

            <IncidentFormModal 
                isOpen={isFormModalOpen} 
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveIncident}
                incidentToEdit={incidentToEdit}
            />
            <IncidentDetailsModal
                incident={selectedIncidentForDetails}
                onClose={() => setSelectedIncidentForDetails(null)}
            />
        </div>
    );
};

export default IncidentManagement;