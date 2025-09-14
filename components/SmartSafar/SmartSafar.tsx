import React, { useState } from 'react';
import { TouristScreen } from '../../types';
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
import SOSButton from './SOSButton';

interface SmartSafarProps {
  onLogout: () => void;
}

const SmartSafar: React.FC<SmartSafarProps> = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState<TouristScreen>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const renderScreen = () => {
      switch(activeScreen) {
          case 'Home': return <TouristHomeScreen setActiveScreen={setActiveScreen} />;
          case 'Itinerary': return <LiveItineraryScreen />;
          case 'Alerts': return <AlertsScreen />;
          case 'Map': return <SafeNavigationScreen />;
          case 'AI Actions': return <AIGuidedActionsScreen />;
          case 'Digital ID': return <DigitalIDScreen />;
          case 'File E-FIR': return <FileEfirScreen />;
          case 'Settings': return <SettingsScreen />;
          case 'Feedback': return <FeedbackScreen />;
          case 'Profile': return <ProfileScreen onLogout={onLogout} setActiveScreen={setActiveScreen} />;
          default: return <TouristHomeScreen setActiveScreen={setActiveScreen} />;
      }
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center">
      <div className="w-full lg:max-w-5xl bg-white min-h-screen flex flex-col relative shadow-lg">
        <MobileHeader 
            onMenuClick={() => setIsMenuOpen(true)}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
        />
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} setActiveScreen={setActiveScreen} onLogout={onLogout} />}
        <main className="flex-1 overflow-y-auto bg-gray-50">
            {renderScreen()}
        </main>
        <SOSButton />
      </div>
    </div>
  );
};

export default SmartSafar;