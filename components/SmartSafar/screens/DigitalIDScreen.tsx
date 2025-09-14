
import React from 'react';

const DigitalIDScreen: React.FC = () => {
    const documents = ["Aadhar Card", "PAN Card", "Passport"];
    
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">Digital ID</h1>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                    <div className="font-bold">SmartSafar</div>
                    <div className="w-8 h-8 border-2 rounded-sm"></div>
                </div>
                <div className="text-center my-6">
                    <img src="https://picsum.photos/id/1027/200/200" alt="John Doe" className="w-24 h-24 rounded-full mx-auto border-4 border-white/50" />
                    <h2 className="text-2xl font-bold mt-2">John Doe</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="opacity-80">TOURIST ID</p>
                        <p className="font-semibold">T-48291</p>
                    </div>
                     <div>
                        <p className="opacity-80">NATIONALITY</p>
                        <p className="font-semibold">United States</p>
                    </div>
                     <div>
                        <p className="opacity-80">DATE OF BIRTH</p>
                        <p className="font-semibold">1990-08-15</p>
                    </div>
                </div>
                <div className="text-center mt-6 text-sm opacity-90">✓ Verified by SmartSafar</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Personal Documents</h2>
                 <button className="w-full border-2 border-dashed border-cyan-400 text-cyan-500 py-2 rounded-lg mb-4">
                    ↑ Upload Document
                </button>
                <div className="relative mb-4">
                     <input type="text" placeholder="Search documents..." className="w-full p-2 border rounded-lg pl-8" />
                </div>
                <div className="space-y-2">
                    {documents.map(doc => (
                        <div key={doc} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <span>📄 {doc}</span>
                            <div>
                                <button className="text-cyan-600 mr-2">View</button>
                                <button className="text-red-500">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
};

export default DigitalIDScreen;
