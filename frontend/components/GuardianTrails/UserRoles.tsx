

import React from 'react';
import Card from '../shared/Card';
import { MOCK_USERS } from '../../constants';
import { SearchIcon } from '../../constants';

const UserRow: React.FC<{ user: typeof MOCK_USERS[0] }> = ({ user }) => (
    <div className="flex items-center justify-between p-3 hover:bg-dark-900 rounded-lg">
        <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
            </div>
        </div>
        <div>
            <button className="text-sm bg-dark-900 border border-dark-700 px-4 py-1 rounded-md mr-2 hover:bg-dark-700">Edit User</button>
            <button className="text-sm bg-red-500/20 text-red-400 px-4 py-1 rounded-md hover:bg-red-500/40">Deactivate</button>
        </div>
    </div>
);

const PermissionItem: React.FC<{ label: string, checked?: boolean, arrow?: boolean }> = ({ label, checked = false, arrow = false }) => (
    <div className="flex items-center justify-between p-3 hover:bg-dark-700 rounded-lg">
        <div className="flex items-center space-x-3">
            {checked ? <span className="text-primary-400">✓</span> : <span className="opacity-0">✓</span>}
            <p>{label}</p>
        </div>
        {arrow && <span className="text-gray-500">→</span>}
    </div>
);


const UserRoles: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">User Accounts</h2>
                    <button className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-700">+ Add New User</button>
                </div>
                <div className="relative mb-4">
                    <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="text" placeholder="Search" className="w-full bg-dark-900 border border-dark-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="space-y-2">
                    {MOCK_USERS.map(user => <UserRow key={user.id} user={user} />)}
                </div>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Role Management</h2>
                    <button className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-700">+ Create New Role</button>
                </div>
                <div className="bg-dark-900 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Admin</h3>
                    <div className="space-y-1">
                        <PermissionItem label="View Tourist Heat Map" />
                        <PermissionItem label="Access Digital ID Records" arrow={true} />
                        <PermissionItem label="Generate E-FIR" />
                        <PermissionItem label="Send Geo-Fence Alerts" />
                        <PermissionItem label="Manage User Accounts" checked={true} />
                    </div>
                </div>
                <div className="text-right mt-4">
                     <button className="bg-primary-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-700">Edit Permissions</button>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default UserRoles;