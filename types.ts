

export type AdminPage = 'Dashboard' | 'Incident Management' | 'Incident Response' | 'Reports' | 'User & Roles' | 'Settings';

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

export interface Tourist {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  touristId?: string;
  nationality?: string;
  dateOfBirth?: string;
  fatherName?: string;
  motherName?: string;
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

export interface Officer {
  id: number;
  name: string;
  avatar: string;
  status: 'Available' | 'Busy' | 'On Route';
}

export interface ActiveAlert {
  id: number;
  priority: 'Critical' | 'High' | 'Medium';
  title: string;
  user: string;
  location: string;
  time: string;
  status?: 'Assigned';
}

export interface Alert {
    id: number;
    title: string;
    description: string;
    time: string;
    type: 'alert' | 'info' | 'warning';
}