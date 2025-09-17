export const translations = {
  en: {
    // Shared
    home: 'Home',
    alerts: 'Alerts',
    map: 'Map',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Log Out',
    
    // Mobile Menu
    myProfile: 'My Profile',
    alertsAndNotifications: 'Alerts & Notifications',
    mainNavigation: 'MAIN NAVIGATION',
    settingsAndSupport: 'SETTINGS & SUPPORT',
    feedback: 'Feedback',
    language: 'LANGUAGE',

    // Mobile Header
    smartSafar: 'SmartSafar',
    fileEFIR: 'File E-FIR',
    aiGuidedActions: 'AI Guided Actions',
    
    // Home Screen
    welcome: 'Welcome',
    safetyPriority: "Your safety is our priority. Here's your SmartSafar dashboard.",
    liveItinerary: 'Live Itinerary',
    liveItineraryDesc: 'View & manage your daily travel plan.',
    alertsDesc: 'Check real-time safety & weather alerts.',
    safeNavigation: 'Safe Navigation',
    safeNavigationDesc: 'Get AI-powered safe route analysis.',
    aiGuidedActionsDesc: 'Get proactive safety nudges and tips.',
    digitalID: 'Digital ID',
    digitalIDDesc: 'Access your verified digital identity card.',
    fileEFIRDesc: 'Report an incident electronically to police.',
    resilienceScore: 'Your Resilience Score',
    improveScore: 'Improve Your Score',
    liveMapView: 'Live Map View',
    live: 'LIVE',
  },
  hi: {
    // Shared
    home: 'होम',
    alerts: 'अलर्ट',
    map: 'नक्शा',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    
    // Mobile Menu
    myProfile: 'मेरी प्रोफ़ाइल',
    alertsAndNotifications: 'अलर्ट और सूचनाएं',
    mainNavigation: 'मुख्य नेविगेशन',
    settingsAndSupport: 'सेटिंग्स और सहायता',
    feedback: 'प्रतिक्रिया',
    language: 'भाषा',
    
    // Mobile Header
    smartSafar: 'स्मार्टसफर',
    fileEFIR: 'ई-एफआईआर दर्ज करें',
    aiGuidedActions: 'एआई गाइडेड एक्शन',
    
    // Home Screen
    welcome: 'स्वागत है',
    safetyPriority: 'आपकी सुरक्षा हमारी प्राथमिकता है। यह रहा आपका स्मार्टसफर डैशबोर्ड।',
    liveItinerary: 'लाइव यात्रा कार्यक्रम',
    liveItineraryDesc: 'अपनी दैनिक यात्रा योजना देखें और प्रबंधित करें।',
    alertsDesc: 'वास्तविक समय की सुरक्षा और मौसम अलर्ट देखें।',
    safeNavigation: 'सुरक्षित नेविगेशन',
    safeNavigationDesc: 'एआई-संचालित सुरक्षित मार्ग विश्लेषण प्राप्त करें।',
    aiGuidedActionsDesc: 'सक्रिय सुरक्षा सुझाव और टिप्स प्राप्त करें।',
    digitalID: 'डिजिटल आईडी',
    digitalIDDesc: 'अपना सत्यापित डिजिटल पहचान पत्र एक्सेस करें।',
    fileEFIRDesc: 'पुलिस को इलेक्ट्रॉनिक रूप से घटना की रिपोर्ट करें।',
    resilienceScore: 'आपका लचीलापन स्कोर',
    improveScore: 'अपना स्कोर सुधारें',
    liveMapView: 'लाइव मैप व्यू',
    live: 'लाइव',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
