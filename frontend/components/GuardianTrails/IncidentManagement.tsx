

import React from 'react';
import Card from '../shared/Card';
import { SearchIcon } from '../../constants';
import { MOCK_INCIDENTS } from '../../constants';
import MapView from '../shared/MapView';

const IncidentManagement: React.FC = () => {

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Unassigned': return 'bg-yellow-500/20 text-yellow-400';
            case 'Investigating': return 'bg-blue-500/20 text-blue-400';
            case 'Resolved': return 'bg-green-500/20 text-green-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Incident Management</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-700 transition-colors">
            + New Incident Report
          </button>
          <div className="relative">
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Incidents..."
              className="bg-dark-800 border border-dark-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select className="bg-dark-800 border border-dark-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Status: All</option>
            <option>Unassigned</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>
      
      <Card className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Live Incident Feed</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dark-700">
              <th className="p-3">Time Reported</th>
              <th className="p-3">Incident Name</th>
              <th className="p-3">Tourist Case</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INCIDENTS.map(incident => (
              <tr key={incident.id} className="border-b border-dark-700 last:border-b-0 hover:bg-dark-900">
                <td className="p-3">{incident.time}</td>
                <td className="p-3">{incident.name}</td>
                <td className="p-3">{incident.tourist}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(incident.status)}`}>
                    {incident.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-700 transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Pending Assignments</h2>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold mb-4">Incident Heat Map</h2>
            <div className="h-64 bg-dark-900 rounded-md flex items-center justify-center">
                <MapView pins={MOCK_INCIDENTS.map((inc, i) => ({ x: 20 + i * 40, y: 40 + (i % 2) * 30, color: 'orange' }))} />
            </div>
        </Card>
      </div>
    </div>
  );
};

export default IncidentManagement;