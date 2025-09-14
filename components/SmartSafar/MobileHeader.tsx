import React from 'react';
import { TouristScreen } from '../../types';

interface MobileHeaderProps {
    onMenuClick: () => void;
    activeScreen: TouristScreen;
    setActiveScreen: (screen: TouristScreen) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick, activeScreen, setActiveScreen }) => {
    
    const getTitle = () => {
        if (activeScreen === 'Home') return 'SmartSafar';
        if (activeScreen === 'File E-FIR') return 'File E-FIR';
        if (activeScreen === 'AI Actions') return 'AI Guided Actions';
        return activeScreen;
    }

    return (
        <header className="flex-shrink-0 h-16 flex items-center justify-between px-4 bg-white border-b">
            <div className="w-10 h-10 flex items-center justify-start">
              {activeScreen === 'Home' ? (
                  <button onClick={() => setActiveScreen('Profile')}>
                    <img src="https://picsum.photos/id/1027/200/200" alt="User" className="w-10 h-10 rounded-full"/>
                  </button>
              ) : (
                  <button onClick={() => setActiveScreen('Home')} className="text-gray-600 p-2 -ml-2">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                  </button>
              )}
            </div>

            <div className="flex items-center space-x-1 text-cyan-600 font-bold">
                 {activeScreen === 'Home' && (
                     <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1.05 15.54L6.2 12.8l1.41-1.41 3.34 3.34 7.07-7.07 1.41 1.41-8.48 8.48z"/>
                     </svg>
                 )}
                <span>{getTitle()}</span>
            </div>
            
            <div className="w-10 h-10 flex items-center justify-end">
                <button onClick={onMenuClick} className="text-gray-800 p-2 -mr-2">
                     <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default MobileHeader;