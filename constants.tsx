import React from 'react';
import { User, Incident, Alert } from './types';

// SVG Icons
export const GuardianShieldIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V6.3l7-3.11v10.8z"/>
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
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
    </svg>
);
export const SwitchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
    </svg>
);
export const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
);

export const BellIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
);

export const LogoutIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
);

// Mock Data
export const MOCK_USERS: User[] = [
    { id: 1, name: 'Tania L', email: 'admin@gtrails.com', role: 'Admin', avatar: 'https://picsum.photos/id/1027/200/200', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john.d@gtrails.com', role: 'Admin', avatar: 'https://picsum.photos/id/1005/200/200', status: 'Active' },
    { id: 3, name: 'Priya Singh', email: 'priya.s@gtrails.com', role: 'Admin', avatar: 'https://picsum.photos/id/1011/200/200', status: 'Active' },
    { id: 4, name: 'Tourist Helper', email: 'tourist.h@gtrails.com', role: 'Tourist Helper', avatar: 'https://picsum.photos/id/1012/200/200', status: 'Active' }
];

export const MOCK_INCIDENTS: Incident[] = [
    { id: 1, time: '5m ago', name: 'Geo-Fence Breach', tourist: 'Tania T.', status: 'Unassigned', case_id: '#2024-001' },
    { id: 2, time: '8m ago', name: 'Geo-Fence Detected', tourist: 'John Doe', status: 'Investigating', case_id: '#2024-002' },
    { id: 3, time: '11m ago', name: 'Panic Button', tourist: 'Ziro Valley', status: 'Investigating', case_id: '#2024-003' },
    { id: 4, time: '12m ago', name: 'Police Dispatched', tourist: 'Ziro Valley', status: 'Resolved', case_id: '#2024-004' },
];

export const MOCK_ALERTS: Alert[] = [
    { id: 1, title: 'GEO-FENCE BREACH', description: 'Tania T. - No signal last 30 min (Route)', time: '4m ago', type: 'warning' },
    { id: 2, title: 'ANOMALY DETECTED', description: 'John Doe - No signal last 30 min (Route)', time: '1h ago', type: 'warning' },
];

export const MOCK_TOURIST_ALERTS: Alert[] = [
    { id: 1, title: 'High-Risk Zone Entered', description: 'You have entered an area with a high number of reported incidents. Stay vigilant.', time: '2m ago', type: 'alert' },
    { id: 2, title: 'Weather Update: Rain Expected', description: 'Light showers are expected in your area around 4 PM. Plan accordingly.', time: '15m ago', type: 'info' },
    { id: 3, title: 'Itinerary Updated', description: 'Your visit to Janpath Market has been rescheduled to 3:30 PM.', time: '1h ago', type: 'info' },
    { id: 4, title: 'Device Signal Lost', description: 'We lost connection to your IOT device. Please check its status.', time: '3h ago', type: 'alert' },
];

export const REPORT_CHART_DATA = [
  { name: '20 mth', Incidents: 8, amt: 2400 },
  { name: 'Region', Incidents: 9, amt: 2210 },
  { name: '10 mth', Incidents: 8, amt: 2290 },
  { name: 'Region', Incidents: 234, amt: 2000 },
  { name: '10 mth', Incidents: 9, amt: 2181 },
  { name: 'Region', Incidents: 13, amt: 2500 },
];

export const REPORT_PIE_DATA = [
  { name: 'Geofence Breach', value: 400 },
  { name: 'Medical Emergency', value: 300 },
  { name: 'Missing Person', value: 300 },
];

export const MapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 8.5l-2.3 2.3-2.3-2.3-1.4 1.4 2.3 2.3-2.3 2.3 1.4 1.4 2.3-2.3 2.3 2.3 1.4-1.4-2.3-2.3 2.3-2.3-1.4-1.4zM9.5 5l-1.4-3.1L5 3.5 6.4 5 5 6.5l1.4 1.6L8.1 6.5 9.5 5zM3.5 15.5l1.6 1.4L6.5 15.5l-1.6-1.4-1.4 1.4z"/>
    </svg>
);

export const IdCardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm10 10H4v-2h10v2zm4-4H4v-2h14v2z"/>
    </svg>
);

export const DocumentTextIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    </svg>
);

export const ItineraryIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.5 3h-15A2.5 2.5 0 002 5.5v13A2.5 2.5 0 004.5 21h15a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0019.5 3zM18 17h-8v-2h8v2zm0-4h-8v-2h8v2zm-4-4H6V7h8v2z" />
  </svg>
);

export const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm0-7c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1zm0 18c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1zm-8.24-2.41c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41zm12.72 0c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41zM3 12c0-.55-.45-1-1-1H0c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zm19 0c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1-.45 1-1zm-16.63-6.24c.39-.39.39-1.02 0-1.41L3.96 2.94c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0zm12.72 0c.39-.39.39-1.02 0-1.41l-1.41-1.41c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0z"/>
    </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1.05 15.54L6.2 12.8l1.41-1.41 3.34 3.34 7.07-7.07 1.41 1.41-8.48 8.48z"/>
    </svg>
);