import React from 'react';
import { Camera, MessageCircle, Phone, Truck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

interface PrescriptionOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrescriptionOrderModal: React.FC<PrescriptionOrderModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { language, t } = useLanguage();

  const handleWhatsAppSend = () => {
    const text =
      language === 'en'
        ? 'Hello Shree Krushi Kendra, I want to send my crop prescription/order list slip photo. Please check and let me know the availability and total price.'
        : language === 'hi'
        ? 'नमस्ते, मैं अपनी खाद/दवाई की पर्ची या रोगट पौधे का फोटो भेज रहा हूं। कृपया देखकर कीमत और उपलब्धता बताएं।'
        : 'नमस्कार, मी माझ्या पिकाच्या औषधांची/खतांची चिठ्ठी किंवा रोगट पानाचा फोटो पाठवत आहे. कृपया तपासून दर व उपलब्धता सांगा.';

    window.open(`https://wa.me/917219437160?text=${encodeURIComponent(text)}`, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg p-5 sm:p-6 rounded-2xl bg-white border-2 border-green-500 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-xs w-fit">
            <FileText className="h-4 w-4" />
            <span>
              {language === 'en'
                ? 'Quick Prescription Order'
                : language === 'hi'
                ? 'पर्ची से झटपट ऑर्डर'
                : 'चिठ्ठीवरून झटपट ऑर्डर'}
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {language === 'en'
              ? 'Send Handwritten Slip or Crop Photo'
              : language === 'hi'
              ? 'चिठ्ठी / पर्ची का फोटो भेजकर दवाइयां मंगाएं'
              : 'चिठ्ठी किंवा रोगट पानाचा फोटो पाठवून औषधे मागवा'}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {language === 'en'
              ? 'No need to search for each product! Just send your doctor prescription slip or list.'
              : language === 'hi'
              ? 'एक-एक दवा खोजने की जरूरत नहीं! बस अपनी पर्ची या लिस्ट का फोटो भेजें।'
              : 'प्रत्येक औषध शोधायची गरज नाही! डॉक्टरांची चिठ्ठी किंवा यादीचा थेट फोटो पाठवा.'}
          </DialogDescription>
        </DialogHeader>

        {/* 3 Steps Visual Guide */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 space-y-3.5 my-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
              1
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-green-700" />
                {language === 'en'
                  ? 'Take a clear photo'
                  : language === 'hi'
                  ? 'स्पष्ट फोटो खींचें'
                  : 'स्पष्ट फोटो काढा'}
              </p>
              <p className="text-xs text-gray-600">
                {language === 'en'
                  ? 'Snap your doctor slip, handwritten list, or crop pest leaf.'
                  : language === 'hi'
                  ? 'अपनी डॉक्टर की पर्ची, हाथ से लिखी लिस्ट या रोगट पौधे का फोटो लें।'
                  : 'तुमच्या डॉक्टरांच्या चिठ्ठीचा, हाताने लिहिलेल्या यादीचा किंवा रोगाचा फोटो काढा.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
              2
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-green-700" />
                {language === 'en'
                  ? 'Send to Helpline on WhatsApp'
                  : language === 'hi'
                  ? 'WhatsApp पर सीधे भेजें'
                  : 'WhatsApp वर थेट पाठवा'}
              </p>
              <p className="text-xs text-gray-600">
                {language === 'en'
                  ? 'Click the button below to directly chat on WhatsApp.'
                  : language === 'hi'
                  ? 'नीचे दिए गए बटन पर क्लिक करके सीधा WhatsApp पर चैट करें।'
                  : 'खालील बटण दाबून थेट WhatsApp वर पाठवा.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
              3
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-green-700" />
                {language === 'en'
                  ? 'Fast Doorstep Delivery'
                  : language === 'hi'
                  ? 'सीधा घर/खेत तक डिलीवरी'
                  : 'थेट घरी किंवा शेतावर डिलिव्हरी'}
              </p>
              <p className="text-xs text-gray-600">
                {language === 'en'
                  ? 'We will verify availability, provide best rates, and dispatch.'
                  : language === 'hi'
                  ? 'हम सही दवाइयां और उचित दाम बताकर तुरंत माल रवाना करेंगे।'
                  : 'आम्ही योग्य दर व खात्रीशीर औषधे सांगून लगेच माल पाठवू.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <Button
            onClick={handleWhatsAppSend}
            className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-6 text-base rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          >
            <MessageCircle className="h-6 w-6 shrink-0" />
            <span>
              {language === 'en'
                ? 'Open WhatsApp & Send Slip'
                : language === 'hi'
                ? 'WhatsApp खोलें और पर्ची भेजें'
                : 'WhatsApp उघडा आणि चिठ्ठी पाठवा'}
            </span>
            <ArrowRight className="h-5 w-5 ml-1" />
          </Button>

          <a
            href="tel:+917219437160"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-yellow-500 bg-yellow-50 hover:bg-yellow-100 text-gray-900 font-bold text-sm transition-colors"
          >
            <Phone className="h-4 w-4 text-yellow-700" />
            <span>
              {language === 'en'
                ? 'Call Inquiry: +91 7219437160'
                : language === 'hi'
                ? 'फोन पर पूछताछ: 7219437160'
                : 'थेट फोन चौकशी: 7219437160'}
            </span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
