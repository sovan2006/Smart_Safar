
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
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTrackingEnabled) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setIsDisplayingTracking(false);
      }
      return;
    }

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    // Attempt to get a quick, low-accuracy position first for better UX
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationError(null);
        const { latitude, longitude } = position.coords;
        onLocationUpdate({ lat: latitude, lng: longitude });
        setIsDisplayingTracking(true);
      },
      () => {
        // We don't need to show an error here, as the high-accuracy watcher will try next.
        console.warn("Could not get a quick location fix. Waiting for high-accuracy watcher.");
      },
      {
        enableHighAccuracy: false,
        timeout: 5000, // 5 seconds for a quick fix
        maximumAge: 60000, // OK to use a cached position up to 1 minute old
      }
    );

    // Start the high-accuracy watcher
    const startWatcher = () => {
      if (watchIdRef.current === null) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            setLocationError(null);
            const { latitude, longitude } = position.coords;
            onLocationUpdate({ lat: latitude, lng: longitude });
            setIsDisplayingTracking(true);
          },
          (error) => {
            let message = 'An unknown error occurred while fetching your location.';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                message = 'Location permission denied. Please enable it in your browser settings to use location features.';
                break;
              case error.POSITION_UNAVAILABLE:
                message = 'Location information is currently unavailable. Please check your device settings.';
                break;
              case error.TIMEOUT:
                message = 'The request to get user location timed out. The device may be unable to get a satellite fix.';
                break;
            }
            console.error(`Geolocation error: ${error.message}`);
            setLocationError(message);
            setIsDisplayingTracking(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000, // Increased timeout to 20 seconds
            maximumAge: 0, // Force a new position
          }
        );
      }
    };

    startWatcher();

    // Cleanup function
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setIsDisplayingTracking(false);
      }
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
            locationError={locationError}
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
            {locationError && (
              <div className="p-3 bg-red-100 dark:bg-red-900/50 border-b border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-medium text-center">
                <span className="font-bold">Location Error:</span> {locationError}
              </div>
            )}
            {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default SmartSafar;
