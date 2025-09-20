import React from 'react';
import { User, DetailedIncident, Alert, Officer, ActiveAlert, Tourist } from './types';

// SVG Icons
export const GuardianShieldIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"/>
    </svg>
);
export const SmartSafarLogoIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
       <path d="M12 2L3.5 6.5v9L12 20l8.5-4.5v-9L12 2zm0 2.24L18.5 9 12 11.24 5.5 9 12 4.24zM5 14.54l5 2.5V19l-5-2.5v-1.96zm7 4.96v-1.96l5-2.5v1.96l-5 2.5z"/>
    </svg>
);
export const DashboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
);
export const IncidentIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
    </svg>
);
export const ReportsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 10h-2v4h2v-4zm4 0h-2v8h2v-8zm4-4h-2v12h2V6zM20 20h-2v-6h2v6zm-4-8h-2v8h2v-8zm-8 2H6v6h2v-6zM4 20H2v-4h2v4zM22 22H0V4h22v18zM20 6H4V4h16v2z"/>
    </svg>
);
export const UsersIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);
export const SettingsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12-.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
    </svg>
);
export const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
);
export const LogoutIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
);
export const ThreeDotsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
);
export const RefreshIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
);
export const DeviceIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
    </svg>
);
export const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm0-7c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1zm0 18c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1zm-8.24-2.41c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41zm12.72 0c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41zM3 12c0-.55-.45-1-1-1H0c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zm19 0c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zm-16.63-6.24c.39-.39.39-1.02 0-1.41L3.96 2.94c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0zm12.72 0c.39-.39.39-1.02 0-1.41l-1.41-1.41c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0z"/>
    </svg>
);
export const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/>
    </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1.06 14.44L7.5 12.5l1.41-1.41L10.94 13l3.54-3.54L15.89 11l-4.95 4.95z" clipRule="evenodd"/>
    </svg>
);

export const ItineraryIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/>
    </svg>
);

export const BellIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
);

export const MapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 3l-6.5 18-6.5-18L20.5 3M12 5.5L6.5 20.4l5.5-14.9 5.5 14.9L12 5.5z"/>
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5l1.09 3.37h3.54l-2.86 2.08 1.09 3.37-2.86-2.08-2.86 2.08 1.09-3.37-2.86-2.08h3.54L12 2.5zm-6 8l1.09 3.37h3.54l-2.86 2.08 1.09 3.37-2.86-2.08L5.14 19.32l1.09-3.37-2.86-2.08h3.54L8 10.5zm10 0l1.09 3.37h3.54l-2.86 2.08 1.09 3.37-2.86-2.08-2.86 2.08 1.09-3.37-2.86-2.08h3.54L18 10.5z"/>
    </svg>
);

export const IdCardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM4 18H2V6h2v12zm18-1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h13c.55 0 1 .45 1 1v10zM9 9h6v2H9V9zm0 3h6v2H9v-2z"/>
    </svg>
);

export const DocumentTextIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
);

export const SwitchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
    </svg>
);

export const ChainIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8v-2z"/>
    </svg>
);
export const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
    </svg>
);

export const ClockIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
);

// Mock Data
export const MOCK_USERS: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@smartsafar.com', role: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', status: 'Active' },
    { id: 2, name: 'Officer Singh', email: 'singh@smartsafar.com', role: 'Officer', avatar: 'https://i.pravatar.cc/150?u=officer1', status: 'Active' },
    { id: 3, name: 'Officer Gupta', email: 'gupta@smartsafar.com', role: 'Officer', avatar: 'https://i.pravatar.cc/150?u=officer2', status: 'Inactive' },
];

export const MOCK_DETAILED_INCIDENTS: DetailedIncident[] = [
    { id: 'GN-2024-9818', time: '2m ago', type: 'Geo-Fence Breach', tourist: 'Tania T.', location: 'Sela Pass, A.', priority: 'Critical', status: 'Unassigned', lat: 27.5, lng: 92.1 },
    { id: 'GN-2024-9817', time: '15m ago', type: 'Panic Button', tourist: 'John D.', location: 'Ziro Valley', priority: 'Critical', status: 'Assigned', lat: 27.6, lng: 93.8 },
    { id: 'GN-2024-9816', time: '45m ago', type: 'Anomaly', tourist: 'Priya S.', location: 'Tawang Monast.', priority: 'High', status: 'Investigating', lat: 27.58, lng: 91.85 },
    { id: 'GN-2024-9815', time: '1h ago', type: 'Medical', tourist: 'Alex R.', location: 'City Center', priority: 'High', status: 'Unassigned', lat: 28.61, lng: 77.23 },
    { id: 'GN-2024-9814', time: '3h ago', type: 'Lost Item', tourist: 'Sara W.', location: 'Main Market', priority: 'Medium', status: 'Investigating', lat: 28.63, lng: 77.21 },
    { id: 'GN-2024-9812', time: '8h ago', type: 'Lost Item', tourist: 'Mike B.', location: 'Hotel Lobby', priority: 'Low', status: 'Resolved', lat: 28.62, lng: 77.22 },
    { id: 'GN-2024-9811', time: '1d ago', type: 'Geo-Fence Breach', tourist: 'Chen L.', location: 'Restricted Area', priority: 'Medium', status: 'Resolved', lat: 27.7, lng: 91.9 },
];

export const MOCK_OFFICERS: Officer[] = [
    { id: 1, name: 'Officer Singh', avatar: 'https://i.pravatar.cc/150?u=officer1', status: 'Available', location: { lat: 28.62, lng: 77.22 } },
    { id: 2, name: 'Officer Gupta', avatar: 'https://i.pravatar.cc/150?u=officer2', status: 'On Route', location: { lat: 27.55, lng: 93.0 } },
    { id: 3, name: 'Officer Sharma', avatar: 'https://i.pravatar.cc/150?u=officer3', status: 'Busy', location: { lat: 27.59, lng: 91.86 } },
    { id: 4, name: 'Officer Kumar', avatar: 'https://i.pravatar.cc/150?u=officer4', status: 'Available', location: { lat: 28.60, lng: 77.20 } },
    { id: 5, name: 'Officer Verma', avatar: 'https://i.pravatar.cc/150?u=officer5', status: 'Busy', location: { lat: 27.6, lng: 92.0 } },
];

export const MOCK_ACTIVE_ALERTS: ActiveAlert[] = [
    { id: 1, priority: 'Critical', title: 'EMERGENCY: SOS SIGNAL', user: 'Jirya S.', location: 'Mago Cave', time: '3m ago', lat: 27.8, lng: 92.5 },
    { id: 2, priority: 'High', title: 'GEO-FENCE BREACH', user: 'Tania T.', location: 'Sela Pass', time: '4m ago', lat: 27.5, lng: 92.1 },
    { id: 3, priority: 'Medium', title: 'ANOMALY: SERCB-UP', user: 'John Doe', location: 'Ziro Valley', time: '1h ago', status: 'Assigned', lat: 27.6, lng: 93.8 },
];

export const REPORT_CHART_DATA = [
  { name: 'Jan', Incidents: 40, Resolved: 24 },
  { name: 'Feb', Incidents: 30, Resolved: 13 },
  { name: 'Mar', Incidents: 50, Resolved: 42 },
  { name: 'Apr', Incidents: 47, Resolved: 39 },
  { name: 'May', Incidents: 58, Resolved: 48 },
  { name: 'Jun', Incidents: 63, Resolved: 55 },
];

export const REPORT_PIE_DATA = [
  { name: 'Geo-Fence Breach', value: 45 },
  { name: 'Medical Emergency', value: 20 },
  { name: 'Lost Item', value: 15 },
  { name: 'Anomaly', value: 10 },
  { name: 'Other', value: 10 },
];

export const MOCK_ALERTS: Alert[] = [
    { id: 1, title: 'GEO-FENCE BREACH', description: 'Tania T. entered a restricted zone.', time: '5m ago', type: 'alert' },
    { id: 2, title: 'LOW BATTERY', description: 'John D.\'s device is at 15%.', time: '12m ago', type: 'info' },
    { id: 3, title: 'ANOMALY DETECTED', description: 'Unusual activity from Priya S.', time: '30m ago', type: 'warning' },
];

export const MOCK_INCIDENTS = MOCK_DETAILED_INCIDENTS.map(incident => ({
  id: incident.id,
  time: incident.time,
  name: incident.type, // Map 'type' to 'name'
  tourist: incident.tourist,
  status: incident.status,
}));

export const MOCK_TOURIST_ALERTS: Alert[] = [
    { id: 1, title: 'Weather Warning', description: 'Heavy rain expected in the afternoon. Plan accordingly.', time: '1h ago', type: 'alert' },
    { id: 2, title: 'Itinerary Update', description: 'Your visit to the museum has been confirmed for 2 PM.', time: '3h ago', type: 'info' },
    { id: 3, title: 'Road Closure', description: 'Main Street is closed for a local event until 6 PM.', time: '4h ago', type: 'warning' },
];

export const MOCK_TOURISTS_DATA: Tourist[] = [
  { 
    fullName: 'Tania T.', 
    mobileNumber: '+1 123 456 7890', 
    email: 'tourist@smartsafar.com', 
    password: 'password123',
    touristId: 'T-48291',
    nationality: 'United States',
    dateOfBirth: '1990-08-15',
    fatherName: 'Ramesh T.',
    motherName: 'Sunita T.',
    location: { lat: 28.6139, lng: 77.2090, timestamp: Date.now() },
    emergencyContacts: [
      { id: 1, name: 'Ramesh T. (Father)', phone: '+11234567891' },
      { id: 2, name: 'Sunita T. (Mother)', phone: '+11234567892' }
    ]
  },
  { 
    fullName: 'John Doe', 
    mobileNumber: '+44 20 7946 0958', 
    email: 'john.doe@example.com', 
    password: 'password456',
    touristId: 'T-12345',
    nationality: 'British',
    dateOfBirth: '1985-05-20',
    fatherName: 'Richard Doe',
    motherName: 'Jane Doe',
    location: { lat: 28.6304, lng: 77.2177, timestamp: Date.now() }
  }
];
