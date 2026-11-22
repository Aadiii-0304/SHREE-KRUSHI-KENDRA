import React, { useState } from 'react';
import { Phone, MessageCircle, Camera, Sprout, X, HelpCircle, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PrescriptionOrderModal } from './PrescriptionOrderModal';
import { useNavigate } from 'react-router';

export const FarmerQuickHelpFloat: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);

  const handleWhatsApp = () => {
    const text =
      language === 'en'
        ? 'Hello Shree Krushi Kendra, I need advice and inquiry regarding farming products or crop protection.'
        : language === 'hi'
        ? 'नमस्ते, मुझे कृषि उत्पादों या फसल की बीमारी के बारे में पूछताछ और सलाह चाहिए।'
        : 'नमस्कार, मला शेतीची औषधे किंवा पिकाच्या रोगाबद्दल चौकशी व सल्ला हवा आहे.';

    window.open(`https://wa.me/917219437160?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  const handleCropHelp = () => {
    navigate('/crop-solutions');
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6 flex flex-col items-end">
        {/* Speed Dial Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mb-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border-2 border-green-500 w-64 space-y-2 text-left"
            >
              <div className="px-2 py-1 text-xs font-bold text-green-900 border-b border-green-100 flex items-center justify-between">
                <span>
                  {language === 'en'
                    ? '🌾 Farmer Help Desk'
                    : language === 'hi'
                    ? '🌾 किसान सहायता केंद्र'
                    : '🌾 शेतकरी मदत केंद्र'}
                </span>
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                  {language === 'en' ? 'Online' : 'सुरू आहे'}
                </span>
              </div>

              {/* 1. Direct Call */}
              <a
                href="tel:+917219437160"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50 text-gray-800 transition-colors border border-amber-200 bg-amber-50/60"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {language === 'en'
                      ? 'Call Inquiry'
                      : language === 'hi'
                      ? 'कॉल पूछताछ'
                      : 'फोन चौकशी'}
                  </p>
                  <p className="text-[11px] text-amber-700 font-semibold">+91 7219437160</p>
                </div>
              </a>

              {/* 2. WhatsApp Chat */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 transition-colors border border-emerald-200 bg-emerald-50/60 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {language === 'en'
                      ? 'WhatsApp Chat'
                      : language === 'hi'
                      ? 'WhatsApp चैट व ऑर्डर'
                      : 'व्हॉट्सॲप चॅट व ऑर्डर'}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {language === 'en' ? 'Instant response' : 'त्वरित प्रतिसाद'}
                  </p>
                </div>
              </button>

              {/* 3. Send Doctor Slip */}
              <button
                onClick={() => {
                  setPrescriptionOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-gray-800 transition-colors border border-blue-200 bg-blue-50/60 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {language === 'en'
                      ? 'Send Doctor Slip'
                      : language === 'hi'
                      ? 'चिठ्ठी / पर्ची भेजें'
                      : 'चिठ्ठीचा फोटो पाठवा'}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {language === 'en' ? 'Photo order' : 'फोटो काढून ऑर्डर'}
                  </p>
                </div>
              </button>

              {/* 4. Crop Solutions */}
              <button
                onClick={handleCropHelp}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-teal-50 text-gray-800 transition-colors border border-teal-200 bg-teal-50/60 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {language === 'en'
                      ? 'Crop Solutions'
                      : language === 'hi'
                      ? 'फसल डॉक्टर सलाह'
                      : 'पीक डॉक्टर सल्ला'}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {language === 'en' ? 'Pest & disease' : 'रोग व कीड उपाय'}
                  </p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="whatsapp-green text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-2xl flex items-center gap-2.5 border-2 border-white/50 ring-4 ring-green-500/20"
            aria-label="Farmer Help"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
            <span className="font-extrabold text-sm sm:text-base hidden xs:inline whitespace-nowrap">
              {isOpen
                ? language === 'en'
                  ? 'Close'
                  : 'बंद करा'
                : language === 'en'
                ? 'Farmer Help'
                : language === 'hi'
                ? 'किसान सहायता'
                : 'शेतकरी मदत'}
            </span>
            {!isOpen && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Prescription Order Modal */}
      <PrescriptionOrderModal
        open={prescriptionOpen}
        onOpenChange={setPrescriptionOpen}
      />
    </>
  );
};
