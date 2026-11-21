import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Leaf, ArrowRight, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { products } from '../data/products';

const cropInfo = {
  cotton: {
    name: 'कपास / Cotton',
    icon: '🌱',
    commonProblems: ['Pink Bollworm', 'Whitefly', 'Aphids', 'Leaf Curl'],
  },
  paddy: {
    name: 'धान / Paddy',
    icon: '🌾',
    commonProblems: ['Stem Borer', 'Leaf Folder', 'Brown Plant Hopper', 'Blast Disease'],
  },
  wheat: {
    name: 'गेहूं / Wheat',
    icon: '🌾',
    commonProblems: ['Aphids', 'Termites', 'Rust Disease', 'Nutrient Deficiency'],
  },
  vegetables: {
    name: 'सब्जियां / Vegetables',
    icon: '🥬',
    commonProblems: ['Fruit Borer', 'Aphids', 'Powdery Mildew', 'Leaf Spot'],
  },
  fruits: {
    name: 'फल / Fruits',
    icon: '🍎',
    commonProblems: ['Fruit Fly', 'Thrips', 'Anthracnose', 'Nutrient Management'],
  },
  sugarcane: {
    name: 'गन्ना / Sugarcane',
    icon: '🎋',
    commonProblems: ['Top Borer', 'Whitefly', 'Red Rot', 'Smut Disease'],
  },
  soybean: {
    name: 'सोयाबीन / Soybean',
    icon: '🫘',
    commonProblems: ['Girdle Beetle', 'Stem Fly', 'Yellow Mosaic', 'Root Rot'],
  },
};

const problemSolutions = {
  pest: {
    title: 'कीट नियंत्रण / Pest Control',
    description: 'Recommended pesticides for effective pest management',
    categories: ['pesticide'],
  },
  disease: {
    title: 'रोग प्रबंधन / Disease Management',
    description: 'Fungicides and treatments for crop diseases',
    categories: ['pesticide'],
  },
  nutrition: {
    title: 'पोषण प्रबंधन / Nutrition Management',
    description: 'Fertilizers for optimal crop nutrition',
    categories: ['fertilizer'],
  },
  'low-growth': {
    title: 'वृद्धि बढ़ाना / Growth Enhancement',
    description: 'Growth promoters and balanced fertilizers',
    categories: ['fertilizer'],
  },
  weed: {
    title: 'खरपतवार नियंत्रण / Weed Control',
    description: 'Herbicides for weed management',
    categories: ['pesticide'],
  },
};

export const CropSolutionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  const crop = searchParams.get('crop');
  const problem = searchParams.get('problem');
  const season = searchParams.get('season');

  useEffect(() => {
    if (problem) {
      const solution = problemSolutions[problem as keyof typeof problemSolutions];
      if (solution) {
        const filtered = products.filter(p =>
          solution.categories.includes(p.category.toLowerCase())
        );
        setRecommendedProducts(filtered.slice(0, 6));
      }
    }
  }, [problem]);

  if (!crop || !problem) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Leaf className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">फसल समाधान / Crop Solutions</h1>
            <p className="text-gray-600 mb-8">Please select crop and problem to get recommendations</p>
            <Button onClick={() => navigate('/')}>Go to Homepage</Button>
          </div>
        </div>
      </div>
    );
  }

  const currentCrop = cropInfo[crop as keyof typeof cropInfo];
  const currentProblem = problemSolutions[problem as keyof typeof problemSolutions];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-5xl">{currentCrop?.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{currentCrop?.name}</h1>
              <p className="text-green-100 text-lg">{currentProblem?.title}</p>
            </div>
          </div>
          {season && (
            <div className="inline-block bg-white/20 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
              Season: {season.charAt(0).toUpperCase() + season.slice(1)}
            </div>
          )}
        </div>
      </div>

      {/* Problem Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">समस्या विवरण / Problem Description</h3>
              <p className="text-blue-800">{currentProblem?.description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  आम समस्याएं / Common Problems in {currentCrop?.name}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentCrop?.commonProblems.map((prob, idx) => (
                    <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-blue-900 border border-blue-300">
                      {prob}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">सुझाए गए उत्पाद / Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-yellow-900 mb-4 text-xl">
            उपयोग दिशानिर्देश / Usage Guidelines
          </h3>
          <ul className="space-y-3 text-yellow-900">
            <li className="flex gap-3">
              <span className="text-xl">1️⃣</span>
              <span>उत्पाद लेबल को ध्यान से पढ़ें / Read product label carefully</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">2️⃣</span>
              <span>सही मात्रा का उपयोग करें / Use correct dosage per acre</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">3️⃣</span>
              <span>सुरक्षा उपकरण पहनें / Wear safety equipment</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">4️⃣</span>
              <span>Expert की सलाह लें / Consult with expert before use</span>
            </li>
          </ul>
        </div>

        {/* Expert Consultation */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            क्या आपको और सहायता चाहिए? / Need More Help?
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            हमारे कृषि विशेषज्ञ से मुफ्त सलाह लें / Get free advice from our agriculture experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton 
              size="lg" 
              message={`नमस्ते, मुझे ${currentCrop?.name} में ${currentProblem?.title} के लिए सलाह चाहिए।`}
            />
            <Button
              onClick={() => navigate('/expert-help')}
              size="lg"
              variant="outline"
              className="border-2 border-green-600 text-green-700"
            >
              Expert Help Page
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
