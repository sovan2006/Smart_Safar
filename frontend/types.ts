export enum ViewMode {
  Admin = 'admin',
  Tourist = 'tourist',
}

export type AdminPage = 'Dashboard' | 'Incident Management' | 'Incident Response' | 'Reports' | 'User & Roles' | 'Settings' | 'Profile';

// FIX: Added TouristScreen type export
export type TouristScreen = 'Home' | 'Itinerary' | 'Alerts' | 'Map' | 'AI Actions' | 'Digital ID' | 'File E-FIR' | 'Settings' | 'Feedback' | 'Profile' | 'Terms';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Tourist Helper' | 'Officer';
  avatar: string;
  status: 'Active' | 'Inactive';
}

export interface EmergencyContact {
    id: number;
    name: string;
    phone: string;
}

export interface Tourist {
  fullName: string;
  mobileNumber: string;
  email: string;
  password?: string; // Made password optional as it won't be sent from backend
  touristId?: string;
  nationality?: string;
  dateOfBirth?: string;
  fatherName?: string;
  motherName?: string;
  isTrackingEnabled?: boolean;
  profilePictureUrl?: string;
  location?: {
    lat: number;
    lng: number;
    timestamp: number;
  };
  emergencyContacts?: EmergencyContact[];
}

export interface DetailedIncident {
    id: string; // e.g., GN-2024-9818
    time: string; // e.g., 2m ago
    type: string; // e.g., Geo-Fence Breach, Panic Button
    tourist: string; // e.g., Tania T.
    location: string; // e.g., Sela Pass, A.
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Unassigned' | 'Assigned' | 'Investigating' | 'Resolved';
    lat?: number;
    lng?: number;
}


export interface Alert {
    id: number;
    title: string;
    description: string;
    time: string;
    type: 'alert' | 'info' | 'warning';
}

export interface Officer {
  id: number;
  name: string;
  avatar: string;
  status: 'Available' | 'Busy' | 'On Route';
  location?: {
    lat: number;
    lng: number;
  };
}

export interface ActiveAlert {
  id: number;
  priority: 'Critical' | 'High' | 'Medium';
  title: string;
  user: string;
  location: string;
  time: string;
  status?: 'Assigned';
  lat?: number;
  lng?: number;
}