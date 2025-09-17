import React from 'react';

const TermsScreen: React.FC = () => {
    return (
        <div className="p-4 space-y-4 bg-light-200 dark:bg-dark-900 text-gray-800 dark:text-gray-200 h-full overflow-y-auto">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Terms & Conditions</h1>
            <div className="bg-light-100 dark:bg-dark-800 p-4 rounded-xl shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">1. Introduction</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome to SmartSafar. By using our application, you agree to these terms and conditions. Please read them carefully.</p>

                <h2 className="text-lg font-semibold">2. Use of Service</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">SmartSafar provides a platform for tourist safety and management. The services are provided "as is" without any warranties. You agree to use the service responsibly and not for any unlawful purposes.</p>

                <h2 className="text-lg font-semibold">3. User Data & Privacy</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">We collect data to improve our services and ensure your safety. This includes location data when using features like SOS or Safe Navigation. We are committed to protecting your privacy. We do not sell your personal information to third parties.</p>

                <h2 className="text-lg font-semibold">4. Limitation of Liability</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">While SmartSafar aims to enhance tourist safety, we are not liable for any incidents, accidents, or losses that may occur during your travel. The emergency features are dependent on network connectivity and local emergency service response.</p>

                <h2 className="text-lg font-semibold">5. Changes to Terms</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">We may update these terms from time to time. We will notify you of any changes. Continued use of the service after changes constitutes your acceptance of the new terms.</p>
            </div>
        </div>
    );
};

export default TermsScreen;
