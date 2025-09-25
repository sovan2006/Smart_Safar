

import React from 'react';
import { TouristScreen, Tourist } from '../../../types';
import { ItineraryIcon, BellIcon, MapIcon, SparklesIcon, IdCardIcon, DocumentTextIcon, SunIcon } from '../../../constants';
import MapView from '../../shared/MapView';
import { TranslationKey } from '../../../translations';

interface TouristHomeScreenProps {
  currentUser: Tourist;
  setActiveScreen: (screen: TouristScreen) => void;
  t: (key: TranslationKey) => string;
}

const ActionButton: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <button onClick={onClick} className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm text-left hover:shadow-md dark:hover:shadow-dark-700 hover:bg-white dark:hover:bg-dark-700 transition-all transform hover:-translate-y-1 flex items-start space-x-4">
    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </button>
);

const WeatherCard: React.FC = () => (
    <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
        <div>
            <p className="font-bold text-lg">New Delhi</p>
            <p className="text-4xl font-light">28°C</p>
            <p>Sunny</p>
        </div>
        <div className="text-6xl opacity-80">
            <SunIcon className="w-20 h-20"/>
        </div>
    </div>
);

const ResilienceScore: React.FC<{ setActiveScreen: (screen: TouristScreen) => void, t: (key: TranslationKey) => string }> = ({ setActiveScreen, t }) => (
    <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm text-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">{t('resilienceScore')}</h2>
        <div className="relative w-32 h-32 mx-auto my-3">
            <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                <path
                    className="text-gray-200 dark:text-dark-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                />
                <path
                    className="text-green-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">75</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Good</span>
            </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Adding emergency contacts and keeping your documents updated improves your score.</p>
        <button 
          onClick={() => setActiveScreen('Profile')}
          className="w-full bg-light-200 dark:bg-dark-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg font-semibold transition-colors hover:bg-gray-300 dark:hover:bg-dark-600">
            {t('improveScore')}
        </button>
    </div>
);

const TouristHomeScreen: React.FC<TouristHomeScreenProps> = ({ currentUser, setActiveScreen, t }) => {
  const actions = [
    {
      icon: <ItineraryIcon className="w-6 h-6" />,
      title: t('liveItinerary'),
      description: t('liveItineraryDesc'),
      screen: 'Itinerary' as TouristScreen
    },
    {
      icon: <BellIcon className="w-6 h-6" />,
      title: t('alerts'),
      description: t('alertsDesc'),
      screen: 'Alerts' as TouristScreen
    },
    {
      icon: <MapIcon className="w-6 h-6" />,
      title: t('safeNavigation'),
      description: t('safeNavigationDesc'),
      screen: 'Map' as TouristScreen
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: t('aiGuidedActions'),
      description: t('aiGuidedActionsDesc'),
      screen: 'AI Actions' as TouristScreen
    },
    {
      icon: <IdCardIcon className="w-6 h-6" />,
      title: t('digitalID'),
      description: t('digitalIDDesc'),
      screen: 'Digital ID' as TouristScreen
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6" />,
      title: t('fileEFIR'),
      description: t('fileEFIRDesc'),
      screen: 'File E-FIR' as TouristScreen
    },
  ];

  const mapCoords = (lat: number, lng: number) => {
    // This is a simplified mapping for demonstration purposes for the Delhi area.
    const mapX = ((lng - 77.1) / 0.2) * 300;
    const mapY = ((28.7 - lat) / 0.2) * 180;
    return { x: Math.max(10, Math.min(290, mapX)), y: Math.max(10, Math.min(170, mapY)) };
  };

  const userPin = currentUser.location 
    ? [{ 
        id: 'user', 
        ...mapCoords(currentUser.location.lat, currentUser.location.lng), 
        color: '#16a34a',
        label: 'You',
        isLive: true,
      }] 
    : [];

  return (
    <div className="p-4 space-y-4 bg-light-200 dark:bg-dark-900 h-full overflow-y-auto">
      <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('welcome')}, {currentUser.fullName}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('safetyPriority')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherCard />
        <ResilienceScore setActiveScreen={setActiveScreen} t={t} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map(action => (
          <ActionButton
            key={action.title}
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={() => setActiveScreen(action.screen)}
          />
        ))}
      </div>
      
       <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm mt-4">
          <h2 className="font-semibold mb-2 flex items-center text-gray-900 dark:text-gray-100">{t('liveMapView')} <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> <span className="ml-1 text-xs text-red-500">{t('live')}</span></h2>
          <div className="h-48 bg-gray-200 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
            <MapView pins={userPin} />
          </div>
        </div>
    </div>
  );
};

export default TouristHomeScreen;