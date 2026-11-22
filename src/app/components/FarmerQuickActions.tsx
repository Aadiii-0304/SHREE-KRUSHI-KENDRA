import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Phone,
  MessageCircle,
  FileText,
  Camera,
  Stethoscope,
  Mic,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Sprout
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { PrescriptionOrderModal } from './PrescriptionOrderModal';
import { VoiceSearchButton } from './VoiceSearchButton';

export const FarmerQuickActions: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);

  const handleWhatsAppOrder = () => {
    const text =
      language === 'en'
        ? 'Hello Shree Krushi Kendra, I want to inquire and order agricultural products. Please share prices and details.'
        : language === 'hi'
        ? 'नमस्ते, मुझे श्री कृषि केंद्र से कृषि उत्पाद (खाद/दवा/बीज) के बारे में पूछताछ और ऑर्डर करना है। कृपया जानकारी दें।'
        : 'नमस्कार, मला श्री कृषी केंद्राकडून शेतीसाठी औषधे/खते/बियाणे मागवायची आहेत व चौकशी करायची आहे. कृपया दर व माहिती द्या.';

    window.open(`https://wa.me/917219437160?text=${encodeURIComponent(text)}`, '_blank');
  };

  const actionButtons = [
    {
      id: 'call',
      title:
        language === 'en'
          ? 'Call Inquiry'
          : language === 'hi'
          ? 'कॉल पूछताछ'
          : 'फोन चौकशी',
      subtitle:
        language === 'en'
          ? 'Helpline: +91 7219437160'
          : language === 'hi'
          ? 'हेल्पलाइन: +91 7219437160'
          : 'हेल्पलाइन: +91 7219437160',
      badge:
        language === 'en'
          ? '1-Tap Call'
          : language === 'hi'
          ? 'सीधा फोन'
          : '१-क्लिक कॉल',
      icon: Phone,
      bg: 'from-amber-500 to-amber-600',
      textColor: 'text-white',
      badgeBg: 'bg-white/25 text-white',
      href: 'tel:+917219437160',
    },
    {
      id: 'whatsapp',
      title:
        language === 'en'
          ? 'Order on WhatsApp'
          : language === 'hi'
          ? 'WhatsApp पर ऑर्डर करें'
          : 'व्हॉट्सॲपवर ऑर्डर करा',
      subtitle:
        language === 'en'
          ? 'Send name or list & get delivery'
          : language === 'hi'
          ? 'नाम या लिस्ट भेजें और डिलीवरी पाएं'
          : 'नाव किंवा यादी पाठवून घरपोच मागवा',
      badge:
        language === 'en'
          ? 'Fastest'
          : language === 'hi'
          ? 'सर्वात जलद'
          : 'सर्वात जलद',
      icon: MessageCircle,
      bg: 'from-emerald-500 to-green-600',
      textColor: 'text-white',
      badgeBg: 'bg-white/25 text-white',
      onClick: handleWhatsAppOrder,
    },
    {
      id: 'prescription',
      title:
        language === 'en'
          ? 'Send Doctor Slip / Photo'
          : language === 'hi'
          ? 'पर्ची / लिस्ट का फोटो भेजें'
          : 'चिठ्ठीचा फोटो पाठवा',
      subtitle:
        language === 'en'
          ? 'Take slip photo & order easily'
          : language === 'hi'
          ? 'डॉक्टर की पर्ची से झटपट मंगाएं'
          : 'चिठ्ठीवरून सर्व औषधे घरपोच मिळवा',
      badge:
        language === 'en'
          ? 'Easy for Farmers'
          : language === 'hi'
          ? 'किसानों के लिए आसान'
          : 'शेतकऱ्यांसाठी सोपे',
      icon: Camera,
      bg: 'from-blue-600 to-indigo-700',
      textColor: 'text-white',
      badgeBg: 'bg-white/25 text-white',
      onClick: () => setPrescriptionOpen(true),
    },
    {
      id: 'doctor',
      title:
        language === 'en'
          ? 'Crop Doctor Advice'
          : language === 'hi'
          ? 'फसल डॉक्टर सलाह'
          : 'पीक डॉक्टर सल्ला',
      subtitle:
        language === 'en'
          ? 'Cotton, Soybean, Wheat solutions'
          : language === 'hi'
          ? 'कपास, सोयाबीन, गेहूं समाधान'
          : 'कापूस, सोयाबीन, गहू रोगांवर अचूक उपाय',
      badge:
        language === 'en'
          ? 'Free Advice'
          : language === 'hi'
          ? 'मुफ्त सलाह'
          : 'मोफत सल्ला',
      icon: Sprout,
      bg: 'from-teal-600 to-emerald-700',
      textColor: 'text-white',
      badgeBg: 'bg-white/25 text-white',
      to: '/crop-solutions',
    },
  ];

  return (
    <>
      <section className="relative z-20 my-6">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-green-200 p-4 sm:p-6 lg:p-8">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 font-bold text-xs mb-2">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span>
                  {language === 'en'
                    ? 'Special Quick Buttons for Farmers'
                    : language === 'hi'
                    ? 'किसान भाइयों के लिए खास आसान बटन'
                    : 'शेतकरी बांधवांसाठी खास सोपे पर्याय'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                {language === 'en'
                  ? 'One-Tap Quick Actions'
                  : language === 'hi'
                  ? 'एक क्लिक में ऑर्डर व सलाह'
                  : 'एका क्लिकवर ऑर्डर व कृषी सल्ला'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {language === 'en'
                  ? 'No typing required! Call directly, send photo of doctor slip, or order on WhatsApp.'
                  : language === 'hi'
                  ? 'टाइप करने की जरूरत नहीं! सीधे फोन करें, पर्ची का फोटो भेजें या WhatsApp पर मंगाएं।'
                  : 'टाइप करण्याची अजिबात गरज नाही! थेट फोन करा, चिठ्ठीचा फोटो पाठवा किंवा WhatsApp वर मागवा.'}
              </p>
            </div>

            {/* Voice Search Quick Pill */}
            <div className="flex items-center gap-2 bg-green-50 p-2 rounded-2xl border border-green-200 self-start md:self-auto">
              <span className="text-xs font-semibold text-green-800 pl-2 hidden sm:inline">
                {language === 'en'
                  ? 'Speak product name:'
                  : language === 'hi'
                  ? 'बोलकर खोजें:'
                  : 'बोलून औषध शोधा:'}
              </span>
              <VoiceSearchButton size="default" />
            </div>
          </div>

          {/* Grid of Farmer Easy Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;

              const CardContent = (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${btn.bg} ${btn.textColor} shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col justify-between`}
                >
                  {/* Subtle Background Icon Decoration */}
                  <div className="absolute -right-2 -bottom-2 opacity-15 pointer-events-none">
                    <Icon className="h-28 w-28" />
                  </div>

                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${btn.badgeBg}`}>
                      {btn.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug mb-1">
                      {btn.title}
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed mb-3">
                      {btn.subtitle}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300">
                      <span>
                        {language === 'en'
                          ? 'Tap here'
                          : language === 'hi'
                          ? 'यहां दबाएं'
                          : 'येथे दाबा'}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </motion.div>
              );

              if (btn.href) {
                return (
                  <a key={btn.id} href={btn.href} className="block h-full">
                    {CardContent}
                  </a>
                );
              }

              if (btn.to) {
                return (
                  <Link key={btn.id} to={btn.to} className="block h-full">
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div key={btn.id} onClick={btn.onClick} className="block h-full">
                  {CardContent}
                </div>
              );
            })}
          </div>

          {/* Bottom Quick Help Info Banner */}
          <div className="mt-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0" />
              <span>
                <strong>
                  {language === 'en'
                    ? '100% Genuine Certified Agri Products'
                    : language === 'hi'
                    ? '100% असली व प्रमाणित कृषि उत्पाद'
                    : '१००% अस्सल व खात्रीशीर कृषी औषधे'}
                </strong>{' '}
                - {language === 'en'
                  ? 'Delivery available in Jamod, Jalgaon, Asalgaon & surrounding villages!'
                  : language === 'hi'
                  ? 'जामोद, जलगांव, आसलगांव व आसपास के सभी गांवों में डिलीवरी उपलब्ध!'
                  : 'जामोद, जळगाव, आसलगाव व परिसरातील सर्व गावांसाठी थेट शेतावर डिलिव्हरी!'}
              </span>
            </div>
            <button
              onClick={() => setPrescriptionOpen(true)}
              className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm"
            >
              📸 {language === 'en' ? 'Send Slip Photo' : language === 'hi' ? 'पर्ची भेजें' : 'चिठ्ठी पाठवा'}
            </button>
          </div>
        </div>
      </section>

      {/* Prescription Modal */}
      <PrescriptionOrderModal
        open={prescriptionOpen}
        onOpenChange={setPrescriptionOpen}
      />
    </>
  );
};
