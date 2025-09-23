import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { TouristScreen, Tourist, EmergencyContact } from '../../../types';
import CameraCapture from '../../shared/CameraCapture';

interface ProfileScreenProps {
    currentUser: Tourist;
    onLogout: () => void;
    setActiveScreen: (screen: TouristScreen) => void;
    onUpdateUser: (updatedUser: Tourist) => void;
}

interface UserDetails {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    fatherName: string;
    motherName: string;
}

const ProfileModal: React.FC<{
    onClose: () => void,
    onUpload: () => void,
    onTakePhoto: () => void,
    onRemove: () => void
}> = ({ onClose, onUpload, onTakePhoto, onRemove }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-2 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-light-300 dark:border-dark-700 text-center">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Change Profile Photo</h3>
                </div>
                <div className="flex flex-col">
                    <button onClick={onUpload} className="text-primary-600 font-semibold p-3 w-full text-center hover:bg-light-200 dark:hover:bg-dark-700 rounded-t-lg">Upload Photo</button>
                    <button onClick={onTakePhoto} className="text-primary-600 font-semibold p-3 w-full text-center hover:bg-light-200 dark:hover:bg-dark-700">Take Photo</button>
                    <button onClick={onRemove} className="text-red-500 p-3 w-full text-center hover:bg-light-200 dark:hover:bg-dark-700">Remove Current Photo</button>
                    <button onClick={onClose} className="p-3 w-full text-center text-gray-700 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700 rounded-b-lg mt-2 border-t border-light-300 dark:border-dark-700">Cancel</button>
                </div>
            </div>
        </div>
    );
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentUser, onLogout, setActiveScreen, onUpdateUser }) => {
    const [pfpSrc, setPfpSrc] = useState('https://picsum.photos/id/1027/200/200');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.mobileNumber,
        dateOfBirth: currentUser.dateOfBirth || '',
        fatherName: currentUser.fatherName || '',
        motherName: currentUser.motherName || '',
    });

    const [newContact, setNewContact] = useState({ name: '', phone: '' });
    const emergencyContacts = currentUser.emergencyContacts || [];

    const handleUserDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDetails = () => {
        setIsEditing(false);
        const updatedUser: Tourist = {
            ...currentUser,
            fullName: userDetails.name,
            email: userDetails.email,
            mobileNumber: userDetails.phone,
            dateOfBirth: userDetails.dateOfBirth,
            fatherName: userDetails.fatherName,
            motherName: userDetails.motherName,
        };
        onUpdateUser(updatedUser);
    };
    
    const handleAddNewContact = (e: FormEvent) => {
        e.preventDefault();
        if(newContact.name && newContact.phone) {
            const updatedContacts = [...emergencyContacts, {id: Date.now(), ...newContact}];
            onUpdateUser({ ...currentUser, emergencyContacts: updatedContacts });
            setNewContact({name: '', phone: ''});
        }
    }
    
    const handleRemoveContact = (id: number) => {
        const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
        onUpdateUser({ ...currentUser, emergencyContacts: updatedContacts });
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPfpSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        setIsModalOpen(false);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleTakePhotoClick = () => {
        setIsModalOpen(false);
        setIsCameraOpen(true);
    };
    
    const handleCapture = (imageDataUrl: string) => {
        setPfpSrc(imageDataUrl);
        setIsCameraOpen(false);
    };

    const handleRemovePhoto = () => {
        setPfpSrc('https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg');
        setIsModalOpen(false);
    };


    return (
        <div className="p-4 space-y-4 bg-light-200 dark:bg-dark-900 h-full overflow-y-auto">
             <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm flex flex-col items-center space-y-2">
                <div className="relative">
                    <img src={pfpSrc} alt="User" className="w-24 h-24 rounded-full border-4 border-light-200 dark:border-dark-700 shadow-md object-cover" />
                    <button onClick={() => setIsModalOpen(true)} className="absolute bottom-0 right-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-light-100 dark:border-dark-800 shadow-md hover:bg-primary-700 transition-colors" aria-label="Change profile picture">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userDetails.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{userDetails.email}</p>
            </div>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Personal Details</h3>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-primary-600 dark:text-primary-400">Edit</button>
                    ) : (
                        <button onClick={handleSaveDetails} className="text-sm font-semibold text-green-600 dark:text-green-400">Save</button>
                    )}
                </div>
                {isEditing ? (
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-500">Full Name</label>
                            <input name="name" value={userDetails.name} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Date of Birth</label>
                            <input name="dateOfBirth" type="date" value={userDetails.dateOfBirth} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Father's Name</label>
                            <input name="fatherName" value={userDetails.fatherName} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Mother's Name</label>
                            <input name="motherName" value={userDetails.motherName} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Email Address</label>
                            <input name="email" type="email" value={userDetails.email} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                         <div>
                            <label className="text-xs text-gray-500">Phone Number</label>
                            <input name="phone" type="tel" value={userDetails.phone} onChange={handleUserDetailsChange} className="w-full p-2 border border-light-300 dark:border-dark-600 bg-light-200 dark:bg-dark-700 rounded-lg mt-1" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Full Name:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.name}</span></p>
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Date of Birth:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.dateOfBirth}</span></p>
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Father's Name:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.fatherName}</span></p>
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Mother's Name:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.motherName}</span></p>
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Email:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.email}</span></p>
                        <p><strong className="font-medium text-gray-500 dark:text-gray-400 block">Phone:</strong> <span className="text-gray-800 dark:text-gray-200">{userDetails.phone}</span></p>
                    </div>
                )}
            </div>

             <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Emergency Contacts</h3>
                <div className="space-y-2">
                    {emergencyContacts.map(contact => (
                        <div key={contact.id} className="flex justify-between items-center p-3 bg-light-200 dark:bg-dark-700 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{contact.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
                            </div>
                            <button onClick={() => handleRemoveContact(contact.id)} className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleAddNewContact} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t border-light-200 dark:border-dark-700">
                    <input value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} placeholder="Contact Name" className="flex-grow p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    <input value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} placeholder="Phone Number" className="flex-grow p-2 border border-light-300 dark:border-dark-600 bg-white dark:bg-dark-900 rounded-lg" />
                    <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold">Add</button>
                </form>
             </div>

            <div className="bg-light-100 dark:bg-dark-800 rounded-xl shadow-sm divide-y divide-light-200 dark:divide-dark-700">
                 <button onClick={() => setActiveScreen('Settings')} className="w-full text-left p-4 hover:bg-light-200 dark:hover:bg-dark-700 flex justify-between items-center text-gray-800 dark:text-gray-200"><span>App Settings</span><span className="text-gray-400">&rarr;</span></button>
                 <button onClick={() => setActiveScreen('Terms')} className="w-full text-left p-4 hover:bg-light-200 dark:hover:bg-dark-700 flex justify-between items-center text-gray-800 dark:text-gray-200"><span>Terms & Conditions</span><span className="text-gray-400">&rarr;</span></button>
                 <button onClick={onLogout} className="w-full text-left p-4 text-red-600 dark:text-red-400 hover:bg-light-200 dark:hover:bg-dark-700 font-semibold">Log Out</button>
            </div>
             
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {isModalOpen && <ProfileModal 
                onClose={() => setIsModalOpen(false)} 
                onUpload={handleUploadClick}
                onTakePhoto={handleTakePhotoClick}
                onRemove={handleRemovePhoto}
            />}
            {isCameraOpen && <CameraCapture onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />}
        </div>
    );
};

export default ProfileScreen;