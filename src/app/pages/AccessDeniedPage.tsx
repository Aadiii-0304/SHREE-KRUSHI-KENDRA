import React from 'react';
import { Link } from 'react-router';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useLanguage } from '../context/LanguageContext';

export const AccessDeniedPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <ShieldX className="h-20 w-20 text-red-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">403</h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          You do not have permission to access this page. This area is restricted to authorized administrators only.
        </p>

        {/* Additional Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> If you believe you should have access to this page, please contact the system administrator.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg">
              <Home className="h-5 w-5" />
              Go to Homepage
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="gap-2 border-gray-300 hover:bg-gray-50 px-6 py-3 text-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Shree Krushi Kendra &copy; 2025 - All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};
