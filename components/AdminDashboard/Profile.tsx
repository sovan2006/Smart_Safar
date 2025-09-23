import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from '../shared/Card';
import { ClockIcon, UsersIcon, SettingsIcon } from '../../constants';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [adminDetails, setAdminDetails] = useState({
        fullName: 'Admin User',
        email: 'admin@smartsafar.com',
        phone: '+91 98765 43210',
        role: 'Administrator'
    });

    const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: FormEvent) => {
        e.preventDefault();
        alert('Password change functionality is not implemented in this demo.');
    };

    const recentActivities = [
        { time: '2 hours ago', action: 'Resolved incident GN-2024-9816.' },
        { time: '5 hours ago', action: 'Assigned Officer Singh to incident GN-2024-9817.' },
        { time: '1 day ago', action: 'Updated high-risk zone near City Center.' },
        { time: '2 days ago', action: 'Logged in to the system.' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column: Profile Card & Activity */}
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <div className="flex flex-col items-center text-center">
                        <img 
                            src="https://i.pravatar.cc/150?u=admin" 
                            alt="Admin User"
                            className="w-24 h-24 rounded-full mb-4 border-4 border-primary-200 dark:border-primary-500/50"
                        />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{adminDetails.fullName}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{adminDetails.email}</p>
                        <span className="mt-2 text-sm font-semibold bg-primary-100 text-primary-800 dark:bg-primary-500/20 dark:text-primary-300 px-3 py-1 rounded-full">{adminDetails.role}</span>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        Recent Activity
                    </h3>
                    <ul className="space-y-3">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="text-sm">
                                <p className="text-gray-700 dark:text-gray-300">{activity.action}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Right Column: Details & Security */}
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                            <UsersIcon className="w-5 h-5 mr-2" />
                            Personal Information
                        </h3>
                        <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    {isEditing ? (
                        <form className="space-y-4">
                            <InputField label="Full Name" name="fullName" value={adminDetails.fullName} onChange={handleDetailsChange} />
                            <InputField label="Email Address" name="email" type="email" value={adminDetails.email} onChange={handleDetailsChange} />
                            <InputField label="Phone Number" name="phone" value={adminDetails.phone} onChange={handleDetailsChange} />
                            <div className="text-right">
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-3 text-sm">
                            <InfoRow label="Full Name" value={adminDetails.fullName} />
                            <InfoRow label="Email Address" value={adminDetails.email} />
                            <InfoRow label="Phone Number" value={adminDetails.phone} />
                            <InfoRow label="Role" value={adminDetails.role} />
                        </div>
                    )}
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <SettingsIcon className="w-5 h-5 mr-2" />
                        Security
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <InputField label="Current Password" name="currentPassword" type="password" placeholder="••••••••" />
                        <InputField label="New Password" name="newPassword" type="password" placeholder="••••••••" />
                        <InputField label="Confirm New Password" name="confirmPassword" type="password" placeholder="••••••••" />
                        <div className="text-right">
                            <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700">
                                Change Password
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row">
        <p className="w-full sm:w-1/3 text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="w-full sm:w-2/3 text-gray-800 dark:text-gray-200">{value}</p>
    </div>
);

const InputField: React.FC<{ label: string, name: string, value?: string, type?: string, placeholder?: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void }> = 
({ label, name, value, type = 'text', placeholder, onChange }) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full mt-1 p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
        />
    </div>
);


export default Profile;
