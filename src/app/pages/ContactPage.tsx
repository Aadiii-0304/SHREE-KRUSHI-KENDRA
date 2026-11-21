import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const successMsg = language === 'en'
      ? 'Thank you! Your message has been sent successfully.'
      : language === 'hi'
      ? 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।'
      : 'धन्यवाद! तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे.';
    toast.success(successMsg);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-center text-green-100 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('contact.sendMessage')}</h2>
            <p className="text-gray-600 mb-8">{t('contact.formSubtitle')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.name')} *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Enter your name' : language === 'hi' ? 'अपना नाम दर्ज करें' : 'तुमचे नाव प्रविष्ट करा'}
                  className="h-12 text-base border-2 border-gray-300 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.email')} *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="h-12 text-base border-2 border-gray-300 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.phone')} *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  className="h-12 text-base border-2 border-gray-300 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.message')} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'Write your message here...' : language === 'hi' ? 'अपना संदेश यहां लिखें...' : 'तुमचा संदेश येथे लिहा...'}
                  rows={6}
                  className="text-base border-2 border-gray-300 focus:border-green-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white btn-large"
              >
                <Send className="h-5 w-5 mr-2" />
                {t('contact.submit')}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">{t('contact.contactInfo')}</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.address')}</h3>
                    <p className="text-gray-700">
                      Shree Krushi Kendra
                      <br />
                      Jamod, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{language === 'en' ? 'Phone' : language === 'hi' ? 'फ़ोन' : 'फोन'}</h3>
                    <a href="tel:+917219437160" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                      +91 7219437160
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{language === 'en' ? 'Email' : language === 'hi' ? 'ईमेल' : 'ईमेल'}</h3>
                    <a href="mailto:info@shreekrushikendra.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                      info@shreekrushikendra.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white border-2 border-yellow-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.workingHours')}</h3>
                    <p className="text-gray-700 font-semibold">
                      {language === 'en' 
                        ? 'Monday - Sunday' 
                        : language === 'hi' 
                        ? 'सोमवार - रविवार' 
                        : 'सोमवार - रविवार'}
                    </p>
                    <p className="text-gray-600 mt-1 font-semibold text-sm">
                      {language === 'en' 
                        ? '7:30 AM - 9:00 PM' 
                        : language === 'hi' 
                        ? 'सुबह 7:30 - रात 9:00' 
                        : 'सकाळी ७:३० - रात्री ९:००'}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-7 w-7 text-green-600" />
                  <h3 className="font-bold text-lg">{t('contact.quickContact')}</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  {language === 'en' 
                    ? 'Get instant response on WhatsApp' 
                    : language === 'hi' 
                    ? 'WhatsApp पर तुरंत जवाब पाएं' 
                    : 'WhatsApp वर त्वरित प्रतिसाद मिळवा'}
                </p>
                <WhatsAppButton 
                  fullWidth 
                  size="lg"
                  message={
                    language === 'en'
                      ? 'Hello, I want some information about Shree Krushi Kendra.'
                      : language === 'hi'
                      ? 'नमस्ते, मुझे श्री कृषि केंद्र के बारे में जानकारी चाहिए।'
                      : 'नमस्ते, मला श्री कृषी केंद्राबद्दल काही माहिती हवी आहे.'
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('contact.ourStore')}</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-green-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.5!2d76.5299!3d20.8380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUwJzE2LjgiTiA3NsKwMzEnNDcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shree Krushi Kendra Location"
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/ezXQAqdvmF2Pt9866"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
                <MapPin className="h-5 w-5 mr-2" />
                {t('contact.openInMaps')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
