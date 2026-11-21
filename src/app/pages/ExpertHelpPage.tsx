import React, { useState } from 'react';
import { Phone, MessageCircle, Upload, Clock, CheckCircle2, Leaf, Bug, Droplet } from 'lucide-react';
import { Button } from '../components/ui/button';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Card } from '../components/ui/card';

export const ExpertHelpPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const problemCategories = [
    { icon: Bug, title: 'कीट समस्या', subtitle: 'Pest Problems', color: 'bg-red-50 text-red-600 border-red-200' },
    { icon: Leaf, title: 'रोग', subtitle: 'Plant Disease', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { icon: Droplet, title: 'पोषण', subtitle: 'Nutrition', color: 'bg-green-50 text-green-600 border-green-200' },
    { icon: Leaf, title: 'खरपतवार', subtitle: 'Weed Control', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <MessageCircle className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            कृषि विशेषज्ञ सहायता
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-100 mb-6">
            Agriculture Expert Help
          </h2>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            हमारे अनुभवी कृषि विशेषज्ञों से मुफ्त सलाह पाएं
            <br />
            Get free advice from our experienced agriculture experts
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Card */}
          <Card className="p-8 border-2 border-green-200 hover:shadow-xl transition-shadow">
            <div className="bg-[#25d366] rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-3">WhatsApp पर बात करें</h3>
            <p className="text-center text-gray-600 mb-6">
              तुरंत जवाब पाएं / Get instant response
            </p>
            <WhatsAppButton fullWidth size="lg" />
            <div className="mt-4 text-center text-sm text-gray-500">
              <Clock className="h-4 w-4 inline mr-1" />
              सुबह 7:30 - रात 9:00 (सोमवार से रविवार)
            </div>
          </Card>

          {/* Phone Card */}
          <Card className="p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-3">फोन पर बात करें</h3>
            <p className="text-center text-gray-600 mb-6">
              सीधे बात करें / Direct conversation
            </p>
            <a href="tel:+917219437160" className="block">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                +91 7219437160
              </Button>
            </a>
            <div className="mt-4 text-center text-sm text-gray-500">
              <Clock className="h-4 w-4 inline mr-1" />
              Mon-Sun: 7:30 AM - 9:00 PM
            </div>
          </Card>
        </div>

        {/* Upload Crop Photo */}
        <Card className="p-8 mb-12 border-2 border-purple-200">
          <h3 className="text-2xl font-bold mb-4 text-center">
            फसल की फोटो भेजें / Upload Crop Photo
          </h3>
          <p className="text-center text-gray-600 mb-6">
            अपनी फसल की समस्या की फोटो अपलोड करें, हम आपको सही समाधान बताएंगे
            <br />
            Upload photo of your crop problem for accurate solution
          </p>
          
          <div className="max-w-md mx-auto">
            <label className="block">
              <div className="border-3 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors">
                {selectedImage ? (
                  <div>
                    <img src={selectedImage} alt="Selected crop" className="max-h-64 mx-auto rounded-lg mb-4" />
                    <p className="text-green-600 font-semibold">✓ Photo Selected</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-purple-900 mb-2">
                      फोटो अपलोड करें / Upload Photo
                    </p>
                    <p className="text-sm text-gray-600">Click to select or drag and drop</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            {selectedImage && (
              <div className="mt-6">
                <WhatsAppButton
                  fullWidth
                  size="lg"
                  message="नमस्ते, मैंने अपनी फसल की समस्या की फोटो ली है। कृपया मुझे सही समाधान बताएं।"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Problem Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            आम समस्याएं / Common Crop Problems
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problemCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx} className={`p-6 border-2 ${category.color} text-center cursor-pointer hover:shadow-lg transition-all card-tap`}>
                  <Icon className="h-12 w-12 mx-auto mb-3" strokeWidth={2} />
                  <h4 className="font-bold text-lg mb-1">{category.title}</h4>
                  <p className="text-sm opacity-75">{category.subtitle}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust Section */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-center mb-8">क्यों हम पर भरोसा करें? / Why Trust Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">14+ वर्ष अनुभव</h4>
              <p className="text-sm text-gray-600">14+ Years Experience</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">स्थानीय विशेषज्ञ</h4>
              <p className="text-sm text-gray-600">Local Agriculture Experts</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">मुफ्त सलाह</h4>
              <p className="text-sm text-gray-600">Free Consultation</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

