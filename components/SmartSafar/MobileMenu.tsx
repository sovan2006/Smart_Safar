import React from 'react';
import { TouristScreen } from '../../types';
import { LogoutIcon } from '../../constants';

interface MobileMenuProps {
  onClose: () => void;
  setActiveScreen: (screen: TouristScreen) => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, setActiveScreen, onLogout }) => {

    const handleNavigation = (screen: TouristScreen) => {
        setActiveScreen(screen);
        onClose();
    }
    
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between pb-4 border-b">
                     <div className="flex items-center space-x-3">
                        <img src="https://picsum.photos/id/1027/200/200" alt="John Doe" className="w-12 h-12 rounded-full"/>
                        <span className="font-bold text-lg text-gray-800">John Doe</span>
                    </div>
                    <button onClick={onClose} className="text-gray-700 text-2xl">&times;</button>
                </div>
                
                <nav className="flex-grow mt-6">
                    <h3 className="text-sm text-gray-600 font-semibold mt-6 mb-2">MAIN NAVIGATION</h3>
                    <ul className="space-y-1 text-gray-800 font-medium">
                        <li><button onClick={() => handleNavigation('Home')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">Home</button></li>
                        <li><button onClick={() => handleNavigation('Profile')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">My Profile</button></li>
                        <li><button onClick={() => handleNavigation('Alerts')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">Alerts & Notifications</button></li>
                        <li><button onClick={() => handleNavigation('Map')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">Map</button></li>
                    </ul>

                    <h3 className="text-sm text-gray-600 font-semibold mt-6 mb-2">SETTINGS & SUPPORT</h3>
                     <ul className="space-y-1 text-gray-800 font-medium">
                        <li><button onClick={() => handleNavigation('Settings')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">Setting & Support</button></li>
                        <li><button onClick={() => handleNavigation('Feedback')} className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">Feedback</button></li>
                    </ul>
                </nav>

                <div>
                    <h3 className="text-sm text-gray-600 font-semibold mb-2">LANGUAGE</h3>
                    <div className="flex items-center bg-gray-100 border rounded-full p-1">
                        <button className="flex-1 text-center py-1 bg-cyan-500 text-white rounded-full text-sm">English</button>
                        <button className="flex-1 text-center py-1 text-gray-600 text-sm">हिन्दी</button>
                    </div>
                    <button onClick={onLogout} className="w-full flex items-center space-x-2 text-left py-3 mt-4 text-red-500 font-semibold">
                        <LogoutIcon className="w-6 h-6" />
                        <span>Log Out</span>
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-2">v1.3.5</p>
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;