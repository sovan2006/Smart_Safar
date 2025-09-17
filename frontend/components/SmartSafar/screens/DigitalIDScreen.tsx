import React, { useState, useRef, ChangeEvent } from 'react';
import { Tourist } from '../../../types';

interface DigitalIDScreenProps {
    currentUser: Tourist;
}

// Interface for a document
interface Document {
    id: number;
    name: string;
    type: string;
    url: string;
}

// Component for the document viewer modal
const DocumentViewerModal: React.FC<{ document: Document; onClose: () => void }> = ({ document, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-4 w-full max-w-lg h-4/5 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center pb-2 border-b border-light-300 dark:border-dark-700">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">{document.name}</h3>
                    <button onClick={onClose} className="text-gray-700 dark:text-gray-300 text-2xl font-bold">&times;</button>
                </div>
                <div className="flex-grow mt-4 overflow-auto">
                    {document.type.startsWith('image/') ? (
                        <img src={document.url} alt={document.name} className="max-w-full max-h-full mx-auto" />
                    ) : (
                        <iframe src={document.url} title={document.name} className="w-full h-full border-0" />
                    )}
                </div>
            </div>
        </div>
    );
};


const DigitalIDScreen: React.FC<DigitalIDScreenProps> = ({ currentUser }) => {
    const touristId = currentUser.touristId || `T-${currentUser.mobileNumber.slice(-5)}`;
    const nationality = currentUser.nationality || 'Not Specified';
    const dateOfBirth = currentUser.dateOfBirth || 'Not Specified';
    
    const [documents, setDocuments] = useState<Document[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const newDocument: Document = {
                id: Date.now(),
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file),
            };
            setDocuments(prev => [...prev, newDocument]);
        }
        if(e.target) e.target.value = ''; // Reset input to allow uploading the same file again
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            const docToDelete = documents.find(doc => doc.id === id);
            if (docToDelete) {
                URL.revokeObjectURL(docToDelete.url); // Clean up object URL from memory
            }
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        }
    };
    
    const handleView = (doc: Document) => {
        setViewingDocument(doc);
    };

    const filteredDocuments = documents.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Digital ID</h1>

            <div className="bg-gradient-to-br from-primary-600 to-primary-500 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start">
                    <div className="font-bold">SmartSafar</div>
                    <div className="w-8 h-8 border-2 rounded-sm"></div>
                </div>
                <div className="text-center my-6">
                    <img src="https://picsum.photos/id/1027/200/200" alt={currentUser.fullName} className="w-24 h-24 rounded-full mx-auto border-4 border-white/50" />
                    <h2 className="text-2xl font-bold mt-2">{currentUser.fullName}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="opacity-80">TOURIST ID</p>
                        <p className="font-semibold">{touristId}</p>
                    </div>
                     <div>
                        <p className="opacity-80">NATIONALITY</p>
                        <p className="font-semibold">{nationality}</p>
                    </div>
                     <div>
                        <p className="opacity-80">DATE OF BIRTH</p>
                        <p className="font-semibold">{dateOfBirth}</p>
                    </div>
                </div>
                <div className="text-center mt-6 text-sm opacity-90">✓ Verified by SmartSafar</div>
            </div>

            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Personal Documents</h2>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                 />
                 <button onClick={handleUploadClick} className="w-full border-2 border-dashed border-primary-400 text-primary-600 dark:border-primary-500 dark:text-primary-400 py-2 rounded-lg mb-4 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors font-semibold">
                    ↑ Upload Document
                </button>
                <div className="relative mb-4 flex items-center gap-2">
                     <input 
                        type="text" 
                        placeholder="Search documents..." 
                        className="w-full p-2 border border-light-300 dark:border-dark-700 bg-white dark:bg-dark-900 rounded-lg focus:ring-primary-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                     <button type="button" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex-shrink-0">
                         Submit
                     </button>
                </div>

                <div className="space-y-2">
                    {filteredDocuments.length > 0 ? (
                        filteredDocuments.map(doc => (
                            <div key={doc.id} className="flex justify-between items-center p-2 bg-light-200 dark:bg-dark-700 rounded-lg">
                                <span className="text-gray-800 dark:text-gray-200 truncate pr-2">📄 {doc.name}</span>
                                <div>
                                    <button onClick={() => handleView(doc)} className="text-primary-600 dark:text-primary-400 mr-2 font-semibold">View</button>
                                    <button onClick={() => handleDelete(doc.id)} className="text-red-500 dark:text-red-400">🗑️</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            <p>No documents uploaded yet.</p>
                            <p className="text-sm">Click "Upload Document" to add one.</p>
                        </div>
                    )}
                </div>
            </div>
            
            {viewingDocument && <DocumentViewerModal document={viewingDocument} onClose={() => setViewingDocument(null)} />}
        </div>
    )
};

export default DigitalIDScreen;