import React, { useState, useRef, useEffect } from 'react';

const SOSModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [location, setLocation] = useState('Fetching location...');

    useEffect(() => {
        // Mock location fetching
        setTimeout(() => {
            setLocation('Near India Gate, New Delhi, India');
        }, 1000);
    }, []);

    const EmergencyButton: React.FC<{ children: React.ReactNode, className: string, onClick?: () => void }> = ({ children, className, onClick }) => (
        <button onClick={onClick} className={`w-full text-left p-4 rounded-lg font-semibold flex items-center space-x-4 ${className}`}>
            {children}
        </button>
    );

    const handleNotify = () => {
        alert("Emergency contacts have been notified of your location.");
    };

    const handleSmsAmbulance = () => {
        const message = encodeURIComponent(`Emergency! Ambulance needed at my current location: ${location}`);
        window.location.href = `sms:102?body=${message}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[110] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-6 w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-red-600 mb-2">EMERGENCY ALERT</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Help is on the way. Your current location is:</p>
                <p className="font-semibold bg-gray-100 dark:bg-dark-700 p-2 rounded-lg mb-6">{location}</p>

                <div className="space-y-3">
                    <EmergencyButton onClick={() => window.location.href = 'tel:100'} className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                        <span className="text-2xl">🚓</span>
                        <span>Call Police (100)</span>
                    </EmergencyButton>
                     <EmergencyButton onClick={handleSmsAmbulance} className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">
                        <span className="text-2xl">🚑</span>
                        <span>SMS Ambulance (102)</span>
                    </EmergencyButton>
                     <EmergencyButton onClick={handleNotify} className="bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
                        <span className="text-2xl">👥</span>
                        <span>Notify Emergency Contacts</span>
                    </EmergencyButton>
                </div>
                
                <button onClick={onClose} className="mt-6 bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg w-full">
                    Cancel
                </button>
            </div>
        </div>
    );
};


const SOSButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseDown = () => {
        setIsHolding(true);
        holdTimeout.current = setTimeout(() => {
            setIsModalOpen(true);
            setIsHolding(false); // Reset holding state
        }, 1500); // 1.5 second hold
    };

    const handleMouseUp = () => {
        setIsHolding(false);
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (holdTimeout.current) {
                clearTimeout(holdTimeout.current);
            }
        };
    }, []);

    return (
        <>
            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="fixed bottom-6 right-6 w-20 h-20 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-[100] transform active:scale-95 transition-transform"
                aria-label="Hold for Emergency SOS"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <span className="font-bold text-2xl z-10">SOS</span>
                    {isHolding && (
                         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                            <path
                                className="text-red-400"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                             <path
                                className="text-white animate-hold-progress"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray="100, 100"
                                strokeDashoffset="100"
                            />
                         </svg>
                    )}
                </div>
                 <style>{`
                    @keyframes hold-progress-animation {
                        from { stroke-dashoffset: 100; }
                        to { stroke-dashoffset: 0; }
                    }
                    .animate-hold-progress {
                        animation: hold-progress-animation 1.5s linear forwards;
                    }
                `}</style>
            </button>
            {isModalOpen && <SOSModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default SOSButton;