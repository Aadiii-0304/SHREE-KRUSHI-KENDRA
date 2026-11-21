import React from 'react';
import { Target, Award, Heart, Users } from 'lucide-react';
import shopImage from 'figma:asset/9eb7fbbfd7f085cafbe5b26b3998b3f33e09d57a.png';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

  const localContent = {
    en: {
      meetOwner: 'Meet Mohan Damdhar',
      ownerDesc1: 'Mohan Damdhar, the founder and owner of Shree Krushi Kendra (Since 2011), has dedicated his life to serving the farming community. With years of experience in agriculture and a deep understanding of farmers\' needs, he established this shop to provide quality agricultural products at fair prices.',
      ownerDesc2: 'His vision is to support farmers by offering the best pesticides, fertilizers, and seeds, along with expert guidance to help them achieve better yields and sustainable farming practices.',
      ownerDesc3: 'Under his leadership, Shree Krushi Kendra has become a trusted name in the region, known for authentic products and exceptional customer service.',
      missionDesc: 'To provide farmers with the best quality fertilizers, pesticides, and seeds at fair prices. We are committed to supporting sustainable agriculture and helping farmers achieve higher productivity while maintaining soil health and environmental balance.',
      visionDesc: 'To become the most trusted agricultural supply store in the region, known for quality products, expert advice, and unwavering commitment to farmer success. We envision a future where every farmer has access to the resources they need to thrive.',
      valQualityDesc: 'We never compromise on product quality. Every item we sell is authentic, tested, and meets the highest standards.',
      valFarmerDesc: 'Farmers are at the heart of everything we do. Their success is our success, and we work tirelessly to support them.',
      valGuidanceDesc: 'We provide more than just products. Our team offers expert advice to help farmers make informed decisions.',
      offerPestTitle: 'Premium Pesticides',
      offerPestDesc: 'Effective pest control solutions for all types of crops. Our pesticides are safe, tested, and provide long-lasting protection against pests and diseases.',
      offerFertTitle: 'Quality Fertilizers',
      offerFertDesc: 'Nutrient-rich fertilizers including organic compost, NPK, urea, DAP, and micronutrient mixes to boost soil health and crop growth.',
      offerSeedTitle: 'High-Yield Seeds',
      offerSeedDesc: 'Certified seeds of cotton, rice, wheat, soybean, sugarcane, and other crops with high germination rates and yield potential.',
    },
    hi: {
      meetOwner: 'मोहन दामधर से मिलें',
      ownerDesc1: 'श्री कृषि केंद्र के संस्थापक और मालिक मोहन दामधर (2011 से) ने अपना जीवन किसान समुदाय की सेवा में समर्पित कर दिया है। कृषि में वर्षों के अनुभव और किसानों की आवश्यकताओं की गहरी समझ के साथ, उन्होंने उचित मूल्य पर गुणवत्तापूर्ण कृषि उत्पाद प्रदान करने के लिए इस दुकान की स्थापना की।',
      ownerDesc2: 'उनका दृष्टिकोण किसानों को सर्वोत्तम कीटनाशक, उर्वरक और बीज प्रदान करने के साथ-साथ बेहतर उपज और टिकाऊ कृषि पद्धतियों को प्राप्त करने में मदद करने के लिए विशेषज्ञ मार्गदर्शन प्रदान करना है।',
      ownerDesc3: 'उनके नेतृत्व में, श्री कृषि केंद्र क्षेत्र में एक विश्वसनीय नाम बन गया है, जो प्रामाणिक उत्पादों और असाधारण ग्राहक सेवा के लिए जाना जाता है।',
      missionDesc: 'किसानों को उचित मूल्य पर सर्वोत्तम गुणवत्ता वाले उर्वरक, कीटनाशक और बीज प्रदान करना। हम टिकाऊ कृषि का समर्थन करने और मिट्टी के स्वास्थ्य और पर्यावरणीय संतुलन को बनाए रखते हुए किसानों को उच्च उत्पादकता प्राप्त करने में मदद करने के लिए प्रतिबद्ध हैं।',
      visionDesc: 'क्षेत्र में सबसे भरोसेमंद कृषि आपूर्ति स्टोर बनना, जो गुणवत्तापूर्ण उत्पादों, विशेषज्ञ सलाह और किसान की सफलता के प्रति अटूट प्रतिबद्धता के लिए जाना जाता है। हम एक ऐसे भविष्य की कल्पना करते हैं जहां हर किसान के पास फलने-फूलने के लिए आवश्यक संसाधनों तक पहुंच हो।',
      valQualityDesc: 'हम उत्पाद की गुणवत्ता से कभी समझौता नहीं करते हैं। हमारे द्वारा बेची जाने वाली प्रत्येक वस्तु प्रामाणिक, परीक्षित है और उच्चतम मानकों को पूरा करती है।',
      valFarmerDesc: 'किसान हमारे हर काम के केंद्र में हैं। उनकी सफलता ही हमारी सफलता है, और हम उनका समर्थन करने के लिए अथक प्रयास करते हैं।',
      valGuidanceDesc: 'हम केवल उत्पादों से अधिक प्रदान करते हैं। हमारी टीम किसानों को सूचित निर्णय लेने में मदद करने के लिए विशेषज्ञ सलाह प्रदान करती है।',
      offerPestTitle: 'प्रीमियम कीटनाशक',
      offerPestDesc: 'सभी प्रकार की फसलों के लिए प्रभावी कीट नियंत्रण समाधान। हमारे कीटनाशक सुरक्षित, परीक्षित हैं और कीटों और बीमारियों के खिलाफ लंबे समय तक सुरक्षा प्रदान करते हैं।',
      offerFertTitle: 'गुणवत्ता वाले उर्वरक',
      offerFertDesc: 'मिट्टी के स्वास्थ्य और फसल के विकास को बढ़ावा देने के लिए जैविक खाद, एनपीके, यूरिया, डीएपी और सूक्ष्म पोषक तत्व मिश्रण सहित पोषक तत्वों से भरपूर उर्वरक।',
      offerSeedTitle: 'उच्च उपज वाले बीज',
      offerSeedDesc: 'उच्च अंकुरण दर और उपज क्षमता वाली कपास, चावल, गेहूं, सोयाबीन, गन्ना और अन्य फसलों के प्रमाणित बीज।',
    },
    mr: {
      meetOwner: 'मोहन दामधर यांना भेटा',
      ownerDesc1: 'श्री कृषी केंद्राचे संस्थापक आणि मालक मोहन दामधर (२०११ पासून) यांनी आपले जीवन शेतकरी बांधवांच्या सेवेसाठी समर्पित केले आहे. शेतीचा प्रदीर्घ अनुभव आणि शेतकऱ्यांच्या गरजांची सखोल जाणीव यातून त्यांनी शेतकऱ्यांना रास्त दरात दर्जेदार कृषी उत्पादने उपलब्ध करून देण्यासाठी या केंद्राची स्थापना केली.',
      ownerDesc2: 'शेतकऱ्यांना सर्वोत्तम कीटकनाशके, खते आणि बियाणे पुरवणे, तसेच पिकांचे दर्जेदार उत्पादन वाढवण्यासाठी आणि शाश्वत शेती पद्धतींसाठी तज्ञांचे मार्गदर्शन देणे हे त्यांचे ध्येय आहे.',
      ownerDesc3: 'त्यांच्या सक्षम नेतृत्वाखाली, श्री कृषी केंद्र हे परिसरातील एक नामांकित आणि विश्वासार्ह नाव बनले आहे, जे अस्सल उत्पादने आणि उत्कृष्ट सेवेसाठी ओळखले जाते.',
      missionDesc: 'शेतकऱ्यांना वाजवी दरात उत्तम दर्जाची खते, कीटकनाशके आणि बियाणे उपलब्ध करून देणे. आम्ही शाश्वत शेतीला पाठिंबा देण्यासाठी आणि जमिनीचे आरोग्य व पर्यावरणीय समतोल राखून शेतकऱ्यांना अधिक उत्पादकता मिळवून देण्यासाठी वचनबद्ध आहोत.',
      visionDesc: 'दर्जेदार उत्पादने, तज्ञांचा सल्ला आणि शेतकऱ्यांच्या यशाप्रती अखंड वचनबद्धतेसाठी ओळखले जाणारे परिसरातील सर्वात विश्वासू कृषी सेवा केंद्र बनणे. प्रत्येक शेतकऱ्याला समृद्धीसाठी आवश्यक संसाधने सहज मिळतील अशा भविष्याची आम्ही कल्पना करतो.',
      valQualityDesc: 'आम्ही उत्पादनाच्या गुणवत्तेशी कधीही तडजोड करत नाही. आम्ही विक्री करत असलेले प्रत्येक उत्पादन अस्सल, प्रमाणित आणि उच्च दर्जाचे असते.',
      valFarmerDesc: 'शेतकरी आमच्या सर्व कार्याचा मुख्य केंद्रबिंदू आहेत. त्यांचे यश हेच आमचे यश आहे आणि आम्ही त्यांना पाठिंबा देण्यासाठी सतत प्रयत्नशील असतो.',
      valGuidanceDesc: 'आम्ही फक्त उत्पादनेच देत नाही. आमची टीम शेतकऱ्यांना योग्य निर्णय घेण्यास मदत करण्यासाठी मोफत व तज्ञ सल्ला प्रदान करते.',
      offerPestTitle: 'उत्कृष्ट कीटकनाशके',
      offerPestDesc: 'सर्व प्रकारच्या पिकांसाठी प्रभावी कीटक नियंत्रण उपाय. आमची कीटकनाशके सुरक्षित, चाचणी केलेली आणि पिकांचे रोग व कीटकांपासून दीर्घकाळ संरक्षण करणारी आहेत.',
      offerFertTitle: 'दर्जेदार खते',
      offerFertDesc: 'जमिनीचे आरोग्य आणि पिकांची वाढ वाढवण्यासाठी सेंद्रिय खत, एनपीके (NPK), युरिया, डीएपी (DAP) आणि सूक्ष्म अन्नद्रव्य मिश्रणांसह पोषक खते उपलब्ध आहेत.',
      offerSeedTitle: 'अधिक उत्पादन देणारे बियाणे',
      offerSeedDesc: 'उच्च उगवण क्षमता आणि अधिक उत्पादन देणारे कापूस, भात, गहू, सोयाबीन, ऊस आणि इतर पिकांची प्रमाणित बियाणे उपलब्ध आहेत.',
    }
  };

  const text = localContent[language] || localContent.en;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4 text-4xl md:text-5xl font-bold">{t('about.title')}</h1>
          <p className="text-xl text-center text-green-100 max-w-3xl mx-auto font-medium">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Owner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-green-50">
            <img
              src={shopImage}
              alt="Shree Krushi Kendra Shop"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold">
              {language === 'en' ? 'Meet ' : language === 'hi' ? 'मिलिए ' : 'भेटा ' }
              <span className="text-red-600 font-bold">Mohan Damdhar</span>
            </h2>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              {text.ownerDesc1}
            </p>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              {text.ownerDesc2}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {text.ownerDesc3}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-green-100 shadow-md">
              <Target className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="mb-4 text-2xl font-bold">{t('about.mission')}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {text.missionDesc}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-green-100 shadow-md">
              <Award className="h-12 w-12 text-green-600 mb-4" />
              <h2 className="mb-4 text-2xl font-bold">{t('about.vision')}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {text.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center mb-12 text-3xl font-bold">{t('about.values')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{t('about.quality')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {text.valQualityDesc}
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{t('about.farmer')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {text.valFarmerDesc}
            </p>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{t('about.guidance')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {text.valGuidanceDesc}
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-3xl font-bold">{t('about.whatWeOffer')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="mb-3 text-xl font-bold text-green-700">{text.offerPestTitle}</h3>
              <p className="text-gray-600 leading-relaxed">
                {text.offerPestDesc}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="mb-3 text-xl font-bold text-green-700">{text.offerFertTitle}</h3>
              <p className="text-gray-600 leading-relaxed">
                {text.offerFertDesc}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="mb-3 text-xl font-bold text-green-700">{text.offerSeedTitle}</h3>
              <p className="text-gray-600 leading-relaxed">
                {text.offerSeedDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">{t('about.readyToGrow')}</h2>
          <p className="text-xl text-green-100 mb-8 font-medium">
            {language === 'en' 
              ? 'Visit our store or shop online for the best agricultural products' 
              : language === 'hi'
              ? 'सर्वोत्तम कृषि उत्पादों के लिए हमारे स्टोर पर आएं या ऑनलाइन खरीदारी करें'
              : 'सर्वोत्तम कृषी उत्पादनांसाठी आमच्या स्टोअरला भेट द्या किंवा ऑनलाइन खरेदी करा'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/ezXQAqdvmF2Pt9866"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-bold shadow-md"
            >
              {t('about.visitStore')}
            </a>
            <a
              href="/products"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bold shadow-md"
            >
              {t('about.shopOnline')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
