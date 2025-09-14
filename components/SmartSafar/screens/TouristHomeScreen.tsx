import React from 'react';
import { TouristScreen } from '../../../types';
import { ItineraryIcon, BellIcon, MapIcon, SparklesIcon, IdCardIcon, DocumentTextIcon, SunIcon } from '../../../constants';

interface TouristHomeScreenProps {
  setActiveScreen: (screen: TouristScreen) => void;
}

const ActionButton: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <button onClick={onClick} className="bg-white p-4 rounded-xl shadow-sm text-left hover:shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1 flex items-start space-x-4">
    <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </button>
);

const WeatherCard: React.FC = () => (
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between">
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

const ResilienceScore: React.FC<{ setActiveScreen: (screen: TouristScreen) => void }> = ({ setActiveScreen }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <h2 className="font-semibold text-gray-800">Your Resilience Score</h2>
        <div className="relative w-32 h-32 mx-auto my-3">
            <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                <path
                    className="text-gray-200"
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
                <span className="text-3xl font-bold text-gray-800">75</span>
                <span className="text-sm text-gray-500">Good</span>
            </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">Adding emergency contacts and keeping your documents updated improves your score.</p>
        <button 
          onClick={() => setActiveScreen('Profile')}
          className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold transition-colors hover:bg-gray-200">
            Improve Your Score
        </button>
    </div>
);

const TouristHomeScreen: React.FC<TouristHomeScreenProps> = ({ setActiveScreen }) => {
  const actions = [
    {
      icon: <ItineraryIcon className="w-6 h-6" />,
      title: 'Live Itinerary',
      description: 'View & manage your daily travel plan.',
      screen: 'Itinerary' as TouristScreen
    },
    {
      icon: <BellIcon className="w-6 h-6" />,
      title: 'Alerts',
      description: 'Check real-time safety & weather alerts.',
      screen: 'Alerts' as TouristScreen
    },
    {
      icon: <MapIcon className="w-6 h-6" />,
      title: 'Safe Navigation',
      description: 'Get AI-powered safe route analysis.',
      screen: 'Map' as TouristScreen
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'AI Guided Actions',
      description: 'Get proactive safety nudges and tips.',
      screen: 'AI Actions' as TouristScreen
    },
    {
      icon: <IdCardIcon className="w-6 h-6" />,
      title: 'Digital ID',
      description: 'Access your verified digital identity card.',
      screen: 'Digital ID' as TouristScreen
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6" />,
      title: 'File E-FIR',
      description: 'Report an incident electronically to police.',
      screen: 'File E-FIR' as TouristScreen
    },
  ];

  return (
    <div className="p-4 space-y-4 bg-gray-50 h-full overflow-y-auto">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-xl font-bold">Welcome, John Doe</h1>
        <p className="text-gray-600">Your safety is our priority. Here's your SmartSafar dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherCard />
        <ResilienceScore setActiveScreen={setActiveScreen} />
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
      
       <div className="bg-white p-4 rounded-xl shadow-sm mt-4">
          <h2 className="font-semibold mb-2 flex items-center">Live Map View <span className="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> <span className="ml-1 text-xs text-red-500">LIVE</span></h2>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            [Interactive Map Overview]
          </div>
        </div>
    </div>
  );
};

export default TouristHomeScreen;