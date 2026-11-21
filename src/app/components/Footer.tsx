import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-green-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <div className="font-bold">Shree Krushi Kendra</div>
                <div className="text-sm text-green-200">
                  {language === 'en' ? 'By ' : language === 'hi' ? 'द्वारा ' : 'द्वारे '}
                  <span className="text-red-400 font-bold">Mohan Damdhar</span>
                </div>
              </div>
            </div>
            <p className="text-green-100 text-sm">
              {language === 'en' 
                ? 'Your Trusted Partner in Agriculture. Providing quality pesticides, fertilizers, and seeds to farmers.' 
                : language === 'hi' 
                ? 'कृषि में आपका विश्वसनीय साथी। किसानों को गुणवत्तापूर्ण कीटनाशक, उर्वरक और बीज प्रदान करना।' 
                : 'कृषी क्षेत्रातील तुमचा विश्वासू साथीदार. शेतकऱ्यांना दर्जेदार कीटकनाशके, खते आणि बियाणे पुरवणे.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-green-100">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 font-bold">{t('footer.customerService')}</h3>
            <ul className="space-y-2 text-green-100">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Privacy Policy' : language === 'hi' ? 'गोपनीयता नीति' : 'गोपनीयता धोरण'}
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Terms & Conditions' : language === 'hi' ? 'नियम और शर्तें' : 'नियम आणि अटी'}
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Shipping Policy' : language === 'hi' ? 'शिपिंग नीति' : 'शिपिंग धोरण'}
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-white transition-colors">
                  {language === 'en' ? 'Sitemap' : language === 'hi' ? 'साइटमैप' : 'साईटमॅप'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-bold">{language === 'en' ? 'Categories' : language === 'hi' ? 'श्रेणियां' : 'श्रेणी'}</h3>
            <ul className="space-y-2 text-green-100">
              <li>
                <Link to="/products?category=pesticide" className="hover:text-white transition-colors">
                  {t('categories.pesticide')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=fertilizer" className="hover:text-white transition-colors">
                  {t('categories.fertilizer')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=seed" className="hover:text-white transition-colors">
                  {t('categories.seed')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-bold">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">+91 7219437160</div>
                  <div className="text-sm">
                    {language === 'en' 
                      ? 'Mon-Sun: 7:30 AM - 9:00 PM' 
                      : language === 'hi' 
                      ? 'सोमवार-रविवार: सुबह 7:30 - रात 9:00' 
                      : 'सोमवार-रविवार: सकाळी ७:३० - रात्री ९:००'}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:aadityadamdhar342006@gmail.com" className="hover:text-white text-sm break-words">
                  aadityadamdhar342006@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/YqjHw4q53FVzRRNB7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-sm underline"
                  >
                    {t('contact.openInMaps')}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-green-100 text-sm">
            {t('footer.copyright')}
          </div>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-green-700 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="mb-2 font-bold">
              {language === 'en' 
                ? 'Subscribe to Shree Krushi Kendra' 
                : language === 'hi' 
                ? 'श्री कृषि केंद्र की सदस्यता लें' 
                : 'श्री कृषी केंद्राचे सदस्य व्हा'}
            </h3>
            <p className="text-green-100 text-sm mb-4">
              {language === 'en' 
                ? 'Get updates on new products and special offers' 
                : language === 'hi' 
                ? 'नए उत्पादों और विशेष प्रस्तावों पर अपडेट प्राप्त करें' 
                : 'नवीन उत्पादने आणि विशेष ऑफरवर अपडेट मिळवा'}
            </p>
            <form className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={
                    language === 'en' 
                      ? 'Enter your email' 
                      : language === 'hi' 
                      ? 'अपना ईमेल दर्ज करें' 
                      : 'तुमचा ईमेल प्रविष्ट करा'
                  }
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
              >
                {language === 'en' ? 'Subscribe' : language === 'hi' ? 'सदस्यता लें' : 'सबस्क्राईब'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
