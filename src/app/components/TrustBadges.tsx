import React from 'react';
import { Shield, Award, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TrustBadges: React.FC = () => {
  const { language } = useLanguage();

  const getBadges = () => {
    switch (language) {
      case 'hi':
        return [
          { icon: Shield, title: 'सरकारी लाइसेंस', subtitle: 'परवानाधारक दुकान', color: 'bg-green-50 text-green-600' },
          { icon: CheckCircle, title: '100% असली उत्पाद', subtitle: 'प्रामाणिक गुणवत्ता', color: 'bg-blue-50 text-blue-600' },
          { icon: Award, title: '14+ वर्षों का भरोसा', subtitle: '2011 से विश्वसनीय', color: 'bg-yellow-50 text-yellow-600' },
          { icon: Users, title: 'मुफ्त विशेषज्ञ सलाह', subtitle: 'अनुभवी टीम मार्गदर्शन', color: 'bg-purple-50 text-purple-600' },
        ];
      case 'mr':
        return [
          { icon: Shield, title: 'शासकीय परवानाधारक', subtitle: 'अधिकृत कृषी केंद्र', color: 'bg-green-50 text-green-600' },
          { icon: CheckCircle, title: '100% अस्सल उत्पादने', subtitle: 'उत्कृष्ट गुणवत्ता', color: 'bg-blue-50 text-blue-600' },
          { icon: Award, title: '14+ वर्षांचा विश्वास', subtitle: '2011 पासून अविरत सेवा', color: 'bg-yellow-50 text-yellow-600' },
          { icon: Users, title: 'मोफत तज्ञ सल्ला', subtitle: 'अनुभवी कृषी सल्लागार', color: 'bg-purple-50 text-purple-600' },
        ];
      default:
        return [
          { icon: Shield, title: 'Licensed Store', subtitle: 'Govt. Approved', color: 'bg-green-50 text-green-600' },
          { icon: CheckCircle, title: 'Genuine Products', subtitle: '100% Authentic', color: 'bg-blue-50 text-blue-600' },
          { icon: Award, title: '14+ Years Trust', subtitle: 'Serving since 2011', color: 'bg-yellow-50 text-yellow-600' },
          { icon: Users, title: 'Expert Guidance', subtitle: 'Free Consultations', color: 'bg-purple-50 text-purple-600' },
        ];
    }
  };

  const badges = getBadges();

  return (
    <div className="bg-gradient-to-r from-green-50 to-yellow-50 py-6 px-4 border-y-2 border-green-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                <div className={`${badge.color} p-2.5 rounded-lg flex-shrink-0`}>
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{badge.title}</div>
                  <div className="text-xs text-gray-600 truncate">{badge.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
