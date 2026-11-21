import React from 'react';
import { Link } from 'react-router';
import { Sprout, Droplet, ChevronRight, Star, MapPin, Clock, Shield, Award, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CropFinder } from '../components/CropFinder';
import { WhatsAppButton, FloatingWhatsAppButton } from '../components/WhatsAppButton';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AllPagesShowcase } from '../components/AllPagesShowcase';
import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export const NewHomepage: React.FC = () => {
  const { language } = useLanguage();
  const featuredProducts = products.slice(0, 6);

  const categories = [
    {
      name: language === 'en' ? 'Seeds' : language === 'hi' ? 'बीज' : 'बियाणे',
      icon: Sprout,
      description: language === 'en' 
        ? 'High Quality Seeds' 
        : language === 'hi' 
        ? 'उच्च गुणवत्ता वाले बीज' 
        : 'उच्च दर्जाचे बियाणे',
      link: '/products?category=seed',
      color: 'bg-green-50 border-green-300',
      iconColor: 'text-green-600',
      emoji: '🌱',
    },
    {
      name: language === 'en' ? 'Fertilizers' : language === 'hi' ? 'उर्वरक' : 'खते',
      icon: Sprout,
      description: language === 'en' 
        ? 'For Crop Growth' 
        : language === 'hi' 
        ? 'फसल की वृद्धि के लिए' 
        : 'पिकांच्या वाढीसाठी',
      link: '/products?category=fertilizer',
      color: 'bg-yellow-50 border-yellow-300',
      iconColor: 'text-yellow-600',
      emoji: '🌾',
    },
    {
      name: language === 'en' ? 'Pesticides' : language === 'hi' ? 'कीटनाशक' : 'कीटमानाशके',
      icon: Droplet,
      description: language === 'en' 
        ? 'For Crop Protection' 
        : language === 'hi' 
        ? 'फसल सुरक्षा के लिए' 
        : 'पीक संरक्षणासाठी',
      link: '/products?category=pesticide',
      color: 'bg-red-50 border-red-300',
      iconColor: 'text-red-600',
      emoji: '🛡️',
    },
  ];

  const cropSolutions = [
    { name: language === 'en' ? 'Cotton' : language === 'hi' ? 'कपास' : 'कापूस', image: '🌱', crop: 'cotton' },
    { name: language === 'en' ? 'Paddy' : language === 'hi' ? 'धान' : 'भात', image: '🌾', crop: 'paddy' },
    { name: language === 'en' ? 'Wheat' : language === 'hi' ? 'गेहूं' : 'गहू', image: '🌾', crop: 'wheat' },
    { name: language === 'en' ? 'Vegetables' : language === 'hi' ? 'सब्जियां' : 'भाज्या', image: '🥬', crop: 'vegetables' },
  ];

  const testimonials = [
    {
      name: language === 'en' ? 'Rajesh Patil' : language === 'hi' ? 'राजेश पाटील' : 'राजेश पाटील',
      village: language === 'en' ? 'Jamod, Cotton Farmer' : language === 'hi' ? 'जामोद, कपास किसान' : 'जामोद, कापूस उत्पादक शेतकरी',
      text: language === 'en' 
        ? 'Best products and right advice. Mohan bhai always gives correct guidance.' 
        : language === 'hi' 
        ? 'सबसे अच्छे उत्पाद और सही सलाह। मोहन भाई हमेशा सही मार्गदर्शन देते हैं।' 
        : 'उत्कृष्ट उत्पादने आणि योग्य सल्ला. मोहन भाई नेहमीच योग्य मार्गदर्शन करतात.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1623211269755-569fec0536d2',
    },
    {
      name: language === 'en' ? 'Santosh Kamble' : language === 'hi' ? 'संतोष कांबळे' : 'संतोष कांबळे',
      village: language === 'en' ? 'Satara, Wheat Farmer' : language === 'hi' ? 'सातारा, गेहूं किसान' : 'सातारा, गहू उत्पादक शेतकरी',
      text: language === 'en' 
        ? 'Buying from Shree Krushi Kendra for 8 years. Genuine products and fair price.' 
        : language === 'hi' 
        ? '8 साल से श्री कृषी केंद्र से ही खरीदता हूं। असली उत्पाद और उचित दाम।' 
        : 'गेल्या ८ वर्षांपासून श्री कृषी केंद्राकडूनच खरेदी करतो. अस्सल उत्पादने आणि वाजवी दर.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1570966087241-20278ac27b2c',
    },
    {
      name: language === 'en' ? 'Prakash Jadhav' : language === 'hi' ? 'प्रकाश जाधव' : 'प्रकाश जाधव',
      village: language === 'en' ? 'Solapur, Sugarcane Farmer' : language === 'hi' ? 'सोलापुर, गन्ना किसान' : 'सोलापूर, ऊस उत्पादक शेतकरी',
      text: language === 'en' 
        ? 'Excellent service! Expert advice for free. Very satisfied.' 
        : language === 'hi' 
        ? 'बहुत अच्छी सेवा! विशेषज्ञ सलाह मुफ्त में मिलती है। बहुत संतुष्ट हूं।' 
        : 'खूप छान सेवा! तज्ञांचा सल्ला मोफत मिळतो. मी खूप समाधानी आहे.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1623211269755-569fec0536d2',
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      <SEO
        title="Home - Agricultural Shop Jamod"
        description="Shree Krushi Kendra by Mohan Damdhar - Your trusted partner for quality pesticides, fertilizers, and seeds in Jamod, Maharashtra. Since 2011. Shop 500+ products online or visit our store."
        keywords="agricultural shop jamod, pesticides, fertilizers, seeds, mohan damdhar, krushi kendra, farming products, agri store jamod, cotton seeds, wheat seeds, paddy seeds, jamod maharashtra"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1623211269755-569fec0536d2"
            alt="Farming"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative px-4 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Award className="h-4 w-4" />
              <span>
                {language === 'en' 
                  ? 'Trusted Service Since 2011' 
                  : language === 'hi' 
                  ? '2011 से विश्वसनीय सेवा' 
                  : '2011 पासून विश्वासू सेवा'}
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
              {language === 'en' ? 'Shree Krushi Kendra' : 'श्री कृषी केंद्र'}
            </h1>
            <p className="text-lg md:text-xl text-green-50 mb-6 leading-relaxed max-w-2xl">
              {language === 'en' 
                ? 'Seeds, Fertilizers, Pesticides - All in One Place' 
                : language === 'hi' 
                ? 'बीज, उर्वरक, कीटनाशक - सब एक जगह' 
                : 'बियाणे, खते, कीटकनाशके - सर्व एकाच ठिकाणी'}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="tel:+917219437160" className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/30 transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">+91 7219437160</span>
              </a>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
                <Clock className="h-5 w-5" />
                <span>
                  {language === 'en' 
                    ? '7:30 AM - 9:00 PM' 
                    : language === 'hi' 
                    ? 'सुबह 7:30 - रात 9:00' 
                    : 'सकाळी ७:३० - रात्री ९:००'}
                </span>
              </div>
            </div>
            
            {/* Owner Info */}
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-4 inline-block">
              <p className="text-sm text-green-100 mb-1">
                {language === 'en' ? 'Owner' : language === 'hi' ? 'संचालक' : 'मालक'}
              </p>
              <p className="text-xl font-bold">
                {language === 'en' ? 'Mohan Damdhar' : 'मोहन दामधर'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Crop Finder Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 -mt-8 relative z-10 md:mt-0">
        <CropFinder />
      </section>

      {/* WhatsApp Banner */}
      <section className="bg-gradient-to-r from-[#25d366] to-[#20ba5a] text-white py-8 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {language === 'en' 
                  ? 'Talk to Agri Expert on WhatsApp' 
                  : language === 'hi' 
                  ? 'WhatsApp पर Agri Expert से बात करें' 
                  : 'WhatsApp वर कृषी तज्ञांशी चर्चा करा'}
              </h3>
              <p className="text-lg text-white/90">
                {language === 'en' 
                  ? 'Free Advice | Local Expert | Instant Response' 
                  : language === 'hi' 
                  ? 'मुफ्त सलाह | स्थानीय विशेषज्ञ | तुरंत जवाब' 
                  : 'मोफत सल्ला | स्थानिक तज्ञ | त्वरित प्रतिसाद'}
              </p>
            </div>
            <WhatsAppButton size="lg" className="text-lg px-8" />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {language === 'en' ? 'Shop by Category' : language === 'hi' ? 'उत्पाद श्रेणी' : 'उत्पादन श्रेणी'}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {language === 'en' 
            ? 'Choose according to your needs' 
            : language === 'hi' 
            ? 'अपनी जरूरत के हिसाब से चुनें' 
            : 'तुमच्या गरजेनुसार निवडा'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.link}>
              <div className={`${category.color} border-2 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer h-full flex flex-col`}>
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-6 flex-1">{category.description}</p>
                <div className="flex items-center gap-2 text-green-700 font-semibold mt-auto">
                  <span>
                    {language === 'en' ? 'Browse' : language === 'hi' ? 'देखें' : 'पहा'}
                  </span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Crop-wise Solutions */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">
            {language === 'en' ? 'Crop-wise Solutions' : language === 'hi' ? 'फसल के अनुसार समाधान' : 'पिकानुसार उपाय'}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {language === 'en' 
              ? 'Find the right advice and products for your crops' 
              : language === 'hi' 
              ? 'अपनी फसलों के लिए सही सलाह और उत्पाद खोजें' 
              : 'तुमच्या पिकांसाठी योग्य सल्ला आणि उत्पादने शोधा'}
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cropSolutions.map((crop) => (
              <Link key={crop.crop} to={`/crop-solutions?crop=${crop.crop}&problem=pest`}>
                <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer text-center">
                  <div className="text-6xl mb-4">{crop.image}</div>
                  <h4 className="text-xl font-bold mb-3">{crop.name}</h4>
                  <Button variant="ghost" size="sm" className="w-full text-green-700 font-semibold">
                    {language === 'en' ? 'View Solutions' : language === 'hi' ? 'समाधान देखें' : 'उपाय पहा'}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              {language === 'en' ? 'Popular Products' : language === 'hi' ? 'लोकप्रिय उत्पाद' : 'लोकप्रिय उत्पादने'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' ? 'Highly rated agricultural inputs' : language === 'hi' ? 'उच्च श्रेणी के कृषि इनपुट' : 'उच्च दर्जाची कृषी उत्पादने'}
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="border-2 border-green-600 text-green-700">
              {language === 'en' ? 'View All' : language === 'hi' ? 'सभी देखें' : 'सर्व पहा'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-yellow-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">
            {language === 'en' ? 'What Farmers Say' : language === 'hi' ? 'किसानों की राय' : 'शेतकऱ्यांचे मत'}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {language === 'en' ? 'Real reviews from our trusted farming community' : language === 'hi' ? 'हमारे विश्वसनीय किसान समुदाय की वास्तविक समीक्षाएं' : 'आमच्या शेतकरी बांधवांचे अनुभव'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border-2 border-green-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl overflow-hidden">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.village}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Store Trust Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {language === 'en' ? 'Visit Our Physical Store' : language === 'hi' ? 'हमारी दुकान पर आएं' : 'आमच्या दुकानाला भेट द्या'}
              </h2>
              <p className="text-green-100 text-lg mb-8">
                {language === 'en' 
                  ? 'Get genuine agricultural inputs directly with expert support' 
                  : language === 'hi' 
                  ? 'विशेषज्ञों के सहयोग से सीधे असली कृषि इनपुट प्राप्त करें' 
                  : 'थेट तज्ञांच्या सल्ल्याने मूळ कृषी उत्पादने मिळवा'}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">
                      {language === 'en' ? 'Government Licensed Store' : language === 'hi' ? 'सरकारी लाइसेंस प्राप्त दुकान' : 'शासकीय परवानाधारक दुकान'}
                    </p>
                    <p className="text-green-100 text-sm">
                      {language === 'en' ? 'Fully authorized seeds & chemical dealer' : language === 'hi' ? 'पूर्णतः अधिकृत बीज और रासायनिक डीलर' : 'पूर्णपणे अधिकृत बियाणे आणि रासायनिक खते विक्रेते'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">
                      {language === 'en' ? '14+ Years of Experience' : language === 'hi' ? '14+ साल का अनुभव' : '१४+ वर्षांचा अनुभव'}
                    </p>
                    <p className="text-green-100 text-sm">
                      {language === 'en' ? 'Serving the regional farmers since 2011' : language === 'hi' ? '2011 से क्षेत्रीय किसानों की सेवा कर रहे हैं' : '2011 पासून स्थानिक शेतकऱ्यांची प्रामाणिक सेवा'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Shree Krushi Kendra, Jamod</p>
                    <p className="text-green-100 text-sm">
                      {language === 'en' ? 'Located in Maharashtra, India' : language === 'hi' ? 'महाराष्ट्र, भारत में स्थित' : 'महाराष्ट्र, भारत येथे स्थित'}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/ezXQAqdvmF2Pt9866"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold">
                  <MapPin className="h-5 w-5 mr-2" />
                  {language === 'en' ? 'Get Directions' : language === 'hi' ? 'दिशा निर्देश पाएं' : 'दिशा मिळवा'}
                </Button>
              </a>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728840719519-8a96817cb670"
                  alt="Shree Krushi Kendra Store"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? 'Store Timings' : language === 'hi' ? 'स्टोर का समय' : 'दुकानाची वेळ'}
                  </h4>
                  <p className="text-gray-700 font-semibold">
                    {language === 'en' 
                      ? 'Mon-Sun: 7:30 AM - 9:00 PM' 
                      : language === 'hi' 
                      ? 'सोमवार-रविवार: सुबह 7:30 - रात 9:00' 
                      : 'सोमवार-रविवार: सकाळी ७:३० - रात्री ९:००'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-green-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.5!2d76.5299!3d20.8380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDUwJzE2LjgiTiA3NsKwMzEnNDcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* All Pages Showcase */}
      <AllPagesShowcase />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
};
