import React, { useState, useEffect, useRef } from 'react';
import { TouristScreen, Tourist } from '../../types';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';
import TouristHomeScreen from './screens/TouristHomeScreen';
import LiveItineraryScreen from './screens/LiveItineraryScreen';
import AlertsScreen from './screens/AlertsScreen';
import SafeNavigationScreen from './screens/SafeNavigationScreen';
import AIGuidedActionsScreen from './screens/AIGuidedActionsScreen';
import DigitalIDScreen from './screens/DigitalIDScreen';
import FileEfirScreen from './screens/FileEfirScreen';
import SettingsScreen from './screens/SettingsScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ProfileScreen from './screens/ProfileScreen';
import TermsScreen from './screens/TermsScreen';
import { translations, Language, TranslationKey } from '../../translations';

interface SmartSafarProps {
  currentUser: Tourist;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLocationUpdate: (location: { lat: number, lng: number }) => void;
  onUpdateUser: (updatedUser: Tourist) => void;
  isTrackingEnabled: boolean;
  onToggleTracking: () => void;
}

const SmartSafar: React.FC<SmartSafarProps> = ({ currentUser, onLogout, isDarkMode, onToggleDarkMode, onLocationUpdate, onUpdateUser, isTrackingEnabled, onToggleTracking }) => {
  const [activeScreen, setActiveScreen] = useState<TouristScreen>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isDisplayingTracking, setIsDisplayingTracking] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    const startWatcher = () => {
      if (navigator.geolocation && watchIdRef.current === null) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onLocationUpdate({ lat: latitude, lng: longitude });
            setIsDisplayingTracking(true);
          },
          (error) => {
            console.error("Geolocation error", error);
            setIsDisplayingTracking(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    };

    const stopWatcher = () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setIsDisplayingTracking(false);
      }
    };

    if (isTrackingEnabled) {
      startWatcher();
    } else {
      stopWatcher();
    }

    return () => {
      stopWatcher(); // Cleanup on component unmount
    };
  }, [isTrackingEnabled, onLocationUpdate]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key];
  };
  
  const renderScreen = () => {
      const screenProps = {
        currentUser,
        setActiveScreen,
        onLogout,
        t,
      };
      switch(activeScreen) {
          case 'Home': return <TouristHomeScreen {...screenProps} />;
          case 'Itinerary': return <LiveItineraryScreen />;
          case 'Alerts': return <AlertsScreen />;
          case 'Map': return <SafeNavigationScreen />;
          case 'AI Actions': return <AIGuidedActionsScreen currentUser={currentUser} />;
          case 'Digital ID': return <DigitalIDScreen currentUser={currentUser} />;
          case 'File E-FIR': return <FileEfirScreen currentUser={currentUser} />;
          case 'Settings': return <SettingsScreen onLogout={onLogout} isTrackingEnabled={isTrackingEnabled} onToggleTracking={onToggleTracking} />;
          case 'Feedback': return <FeedbackScreen />;
          case 'Profile': return <ProfileScreen {...screenProps} onUpdateUser={onUpdateUser} />;
          case 'Terms': return <TermsScreen />;
          default: return <TouristHomeScreen {...screenProps} />;
      }
  }

  return (
    <div className="w-full min-h-screen bg-light-200 dark:bg-dark-900 flex justify-center">
      <div className="w-full lg:max-w-5xl bg-light-100 dark:bg-dark-900 min-h-screen flex flex-col relative shadow-lg">
        <MobileHeader 
            currentUser={currentUser}
            onMenuClick={() => setIsMenuOpen(true)}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            isTracking={isDisplayingTracking}
            t={t}
        />
        {isMenuOpen && <MobileMenu 
            currentUser={currentUser} 
            onClose={() => setIsMenuOpen(false)} 
            setActiveScreen={setActiveScreen} 
            onLogout={onLogout}
            language={language}
            setLanguage={setLanguage}
            t={t}
        />}
        <main className="flex-1 overflow-y-auto bg-light-200 dark:bg-dark-900">
            {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default SmartSafar;