
import React, { useState, FormEvent, useEffect } from 'react';
import Card from '../shared/Card';
import { MOCK_USERS } from '../../constants';
import { SearchIcon } from '../../constants';
import { User } from '../../types';

// --- MODAL COMPONENT --- //
const UserFormModal: React.FC<{
    userToEdit: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}> = ({ userToEdit, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Officer' as User['role'],
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                name: userToEdit.name,
                email: userToEdit.email,
                role: userToEdit.role,
            });
        } else {
             setFormData({ name: '', email: '', role: 'Officer' });
        }
    }, [userToEdit]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            id: userToEdit?.id || Date.now(),
            avatar: userToEdit?.avatar || `https://i.pravatar.cc/150?u=${Date.now()}`,
            status: userToEdit?.status || 'Active',
            ...formData,
        };
        onSave(newUser);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-xl shadow-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    {userToEdit ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                        <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                        <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</label>
                        <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as User['role']})} required className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg">
                            <option>Admin</option>
                            <option>Officer</option>
                            <option>Tourist Helper</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="bg-light-200 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-light-300 dark:hover:bg-dark-600">Cancel</button>
                        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- USER ROW COMPONENT --- //
const UserRow: React.FC<{ 
    user: User;
    onEdit: () => void;
    onToggleStatus: () => void;
}> = ({ user, onEdit, onToggleStatus }) => (
    <div className="flex items-center justify-between p-3 hover:bg-light-200/50 dark:hover:bg-dark-700/50 rounded-lg">
        <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
             <button onClick={onEdit} className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">Edit</button>
             <button onClick={onToggleStatus} className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300'}`}>
                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
        </div>
    </div>
);


const PermissionItem: React.FC<{ label: string, checked?: boolean }> = ({ label, checked = true }) => (
    <div className="flex items-center space-x-3 p-3">
        <input type="checkbox" defaultChecked={checked} className="form-checkbox h-4 w-4 text-primary-600 rounded focus:ring-primary-500 bg-light-200 dark:bg-dark-800 border-light-300 dark:border-dark-600" />
        <p className="text-gray-700 dark:text-gray-300">{label}</p>
    </div>
);


const UserRoles: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    
    const handleOpenModal = (user: User | null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (userToSave: User) => {
        if (editingUser) {
            setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
        } else {
            setUsers([userToSave, ...users]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleToggleStatus = (userId: number) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    };

    const handleSaveChanges = () => {
        alert('Permissions have been saved successfully!');
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">User Accounts</h2>
                        <button onClick={() => handleOpenModal(null)} className="bg-primary-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-700">+ Add New User</button>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="relative mb-4 flex items-center gap-2">
                        <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-light-200 dark:bg-dark-700 border-light-300 dark:border-dark-700 border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" 
                         />
                         <button type="submit" className="bg-light-200 dark:bg-dark-700 px-4 py-2 rounded-md font-semibold text-sm hover:bg-light-300 dark:hover:bg-dark-600">Search</button>
                    </form>
                    <div className="space-y-1">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => 
                                <UserRow 
                                    key={user.id} 
                                    user={user} 
                                    onEdit={() => handleOpenModal(user)}
                                    onToggleStatus={() => handleToggleStatus(user.id)}
                                />
                            )
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No users found.</p>
                        )}
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-3">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Role Management: Admin</h2>
                        <button onClick={handleSaveChanges} className="bg-primary-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-700">Save Changes</button>
                    </div>
                    <div className="bg-light-200/50 dark:bg-dark-700/50 p-4 rounded-lg divide-y divide-light-300 dark:divide-dark-600">
                        <PermissionItem label="View Tourist Heat Map" />
                        <PermissionItem label="Access Digital ID Records" />
                        <PermissionItem label="Generate E-FIR" />
                        <PermissionItem label="Send Geo-Fence Alerts" />
                        <PermissionItem label="Manage User Accounts" />
                        <PermissionItem label="Access Full Reports" checked={false} />
                    </div>
                </Card>
            </div>
        </div>
        
        {isModalOpen && (
            <UserFormModal 
                userToEdit={editingUser}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                }}
                onSave={handleSaveUser}
            />
        )}
    </>
  );
};

export default UserRoles;
