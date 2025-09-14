import React from 'react';
import { TouristScreen } from '../../../types';

interface ProfileScreenProps {
    onLogout: () => void;
    setActiveScreen: (screen: TouristScreen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, setActiveScreen }) => {

    const ProfileOption: React.FC<{ children: React.ReactNode, onClick?: () => void, isDestructive?: boolean }> = ({ children, onClick, isDestructive = false }) => (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors ${isDestructive ? 'text-red-600' : 'text-gray-800'}`}
        >
            {children}
            {!isDestructive && <span className="text-gray-400">&rarr;</span>}
        </button>
    );

    return (
        <div className="p-4 space-y-6 bg-gray-50 h-full">
            <div className="flex flex-col items-center space-y-2 pt-4">
                <img src="https://picsum.photos/id/1027/200/200" alt="User" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-500">john.doe@email.com</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
                <ProfileOption>
                    <span>Edit Profile</span>
                </ProfileOption>
                <ProfileOption>
                    <span>Emergency Contacts</span>
                </ProfileOption>
                <ProfileOption onClick={() => setActiveScreen('Settings')}>
                    <span>App Settings</span>
                </ProfileOption>
            </div>

             <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
                 <ProfileOption>
                    <span>Help & Support</span>
                </ProfileOption>
                <ProfileOption>
                    <span>Terms & Conditions</span>
                </ProfileOption>
             </div>

             <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
                 <ProfileOption onClick={onLogout} isDestructive>
                    <span>Log Out</span>
                </ProfileOption>
             </div>
        </div>
    );
};

export default ProfileScreen;