export enum ViewMode {
  Admin = 'admin',
  Tourist = 'tourist',
}

export type AdminPage = 'Dashboard' | 'Incident Management' | 'Incident Response' | 'Reports' | 'User & Roles' | 'Settings';

export type TouristScreen = 'Home' | 'Itinerary' | 'Alerts' | 'Map' | 'AI Actions' | 'Digital ID' | 'File E-FIR' | 'Settings' | 'Feedback' | 'Profile';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Tourist Helper' | 'Officer';
  avatar: string;
  status: 'Active' | 'Inactive';
}

export interface Incident {
    id: number;
    time: string;
    name: string;
    tourist: string;
    status: 'Unassigned' | 'Investigating' | 'Resolved';
    case_id: string;
}

export interface Alert {
    id: number;
    title: string;
    description: string;
    time: string;
    type: 'alert' | 'info' | 'warning';
}
