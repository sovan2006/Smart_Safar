import React from 'react';
import { TouristScreen } from '../../types';
import { ShieldCheckIcon } from '../../constants';
import DarkModeToggle from '../shared/DarkModeToggle';
import { TranslationKey } from '../../translations';

interface MobileHeaderProps {
    onMenuClick: () => void;
    activeScreen: TouristScreen;
    setActiveScreen: (screen: TouristScreen) => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    t: (key: TranslationKey) => string;
    isTracking: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick, activeScreen, setActiveScreen, isDarkMode, onToggleDarkMode, t, isTracking }) => {
    
    const getTitle = () => {
        switch(activeScreen) {
            case 'Home': return t('smartSafar');
            case 'File E-FIR': return t('fileEFIR');
            case 'AI Actions': return t('aiGuidedActions');
            case 'Alerts': return t('alerts');
            case 'Map': return t('map');
            case 'Profile': return t('profile');
            case 'Settings': return t('settings');
            default: return activeScreen;
        }
    }

    return (
        <header className="flex-shrink-0 h-16 flex items-center justify-between px-4 bg-light-100 dark:bg-dark-800 border-b border-light-200 dark:border-dark-700 text-gray-800 dark:text-gray-200">
            <div className="w-10 h-10 flex items-center justify-start">
              {activeScreen === 'Home' ? (
                  <button onClick={() => setActiveScreen('Profile')}>
                    <img src="https://picsum.photos/id/1027/200/200" alt="User" className="w-10 h-10 rounded-full"/>
                  </button>
              ) : (
                  <button onClick={() => setActiveScreen('Home')} className="p-2 -ml-2">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                  </button>
              )}
            </div>

            <div className="flex items-center space-x-1 text-primary-600 font-bold text-lg">
                 {isTracking && (
                    <span title="Location tracking is active" className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                 )}
                 {activeScreen === 'Home' && (
                     <ShieldCheckIcon className="w-6 h-6" />
                 )}
                <span>{getTitle()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
                <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
                <button onClick={onMenuClick} className="p-2 -mr-2">
                     <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default MobileHeader;