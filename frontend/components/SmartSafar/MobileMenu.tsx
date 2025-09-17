
import React from 'react';
import { TouristScreen, Tourist } from '../../types';
import { LogoutIcon } from '../../constants';
import { Language, TranslationKey } from '../../translations';

interface MobileMenuProps {
  currentUser: Tourist;
  onClose: () => void;
  setActiveScreen: (screen: TouristScreen) => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ currentUser, onClose, setActiveScreen, onLogout, language, setLanguage, t }) => {

    const handleNavigation = (screen: TouristScreen) => {
        setActiveScreen(screen);
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-light-100 dark:bg-dark-800 shadow-lg p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between pb-4 border-b border-light-200 dark:border-dark-700">
                     <div className="flex items-center space-x-3">
                        <img src="https://picsum.photos/id/1027/200/200" alt={currentUser.fullName} className="w-12 h-12 rounded-full"/>
                        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">{currentUser.fullName}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-700 dark:text-gray-300 text-2xl">&times;</button>
                </div>
                
                <nav className="flex-grow mt-6">
                    <h3 className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-6 mb-2">{t('mainNavigation')}</h3>
                    <ul className="space-y-1 text-gray-800 dark:text-gray-200 font-medium">
                        <li><button onClick={() => handleNavigation('Home')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('home')}</button></li>
                        <li><button onClick={() => handleNavigation('Profile')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('myProfile')}</button></li>
                        <li><button onClick={() => handleNavigation('Alerts')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('alertsAndNotifications')}</button></li>
                        <li><button onClick={() => handleNavigation('Map')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('map')}</button></li>
                    </ul>

                    <h3 className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-6 mb-2">{t('settingsAndSupport')}</h3>
                     <ul className="space-y-1 text-gray-800 dark:text-gray-200 font-medium">
                        <li><button onClick={() => handleNavigation('Settings')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('settings')}</button></li>
                        <li><button onClick={() => handleNavigation('Feedback')} className="w-full text-left py-2 px-2 rounded hover:bg-light-200 dark:hover:bg-dark-700">{t('feedback')}</button></li>
                    </ul>
                </nav>

                <div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">{t('language')}</h3>
                    <div className="flex items-center bg-light-200 dark:bg-dark-700 border border-light-300 dark:border-dark-600 rounded-full p-1">
                        <button onClick={() => setLanguage('en')} className={`flex-1 text-center py-1 rounded-full text-sm transition-colors ${language === 'en' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>English</button>
                        <button onClick={() => setLanguage('hi')} className={`flex-1 text-center py-1 rounded-full text-sm transition-colors ${language === 'hi' ? 'bg-primary-600 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>हिन्दी</button>
                    </div>
                    <button onClick={onLogout} className="w-full flex items-center space-x-2 text-left py-3 mt-4 text-red-500 dark:text-red-400 font-semibold">
                        <LogoutIcon className="w-6 h-6" />
                        <span>{t('logout')}</span>
                    </button>
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">v1.3.5</p>
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;