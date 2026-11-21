import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Sprout } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const crops = [
  { value: 'cotton', label: 'कपास / Cotton', icon: '🌱' },
  { value: 'paddy', label: 'धान / Paddy', icon: '🌾' },
  { value: 'wheat', label: 'गेहूं / Wheat', icon: '🌾' },
  { value: 'vegetables', label: 'सब्जियां / Vegetables', icon: '🥬' },
  { value: 'fruits', label: 'फल / Fruits', icon: '🍎' },
  { value: 'sugarcane', label: 'गन्ना / Sugarcane', icon: '🎋' },
  { value: 'soybean', label: 'सोयाबीन / Soybean', icon: '🫘' },
];

const problems = [
  { value: 'pest', label: 'कीट / Pest Attack' },
  { value: 'disease', label: 'रोग / Disease' },
  { value: 'nutrition', label: 'पोषण / Nutrition' },
  { value: 'low-growth', label: 'कम वृद्धि / Low Growth' },
  { value: 'weed', label: 'खरपतवार / Weed Control' },
];

const seasons = [
  { value: 'kharif', label: 'खरीफ / Kharif (June-Oct)' },
  { value: 'rabi', label: 'रबी / Rabi (Nov-Mar)' },
  { value: 'summer', label: 'ग्रीष्म / Summer (Apr-May)' },
];

export const CropFinder: React.FC = () => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState('');
  const [problem, setProblem] = useState('');
  const [season, setSeason] = useState('');

  const handleSearch = () => {
    if (crop && problem) {
      navigate(`/crop-solutions?crop=${crop}&problem=${problem}&season=${season}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-xl">
          <Sprout className="h-7 w-7 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">फसल के लिए समाधान खोजें</h3>
          <p className="text-sm text-gray-600">Find Solutions for Your Crop</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            फसल चुनें / Select Crop *
          </label>
          <Select value={crop} onValueChange={setCrop}>
            <SelectTrigger className="w-full h-14 text-base border-2 border-gray-300 focus:border-green-500">
              <SelectValue placeholder="अपनी फसल चुनें / Choose your crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((c) => (
                <SelectItem key={c.value} value={c.value} className="py-3 text-base">
                  <span className="flex items-center gap-2">
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            समस्या चुनें / Select Problem *
          </label>
          <Select value={problem} onValueChange={setProblem}>
            <SelectTrigger className="w-full h-14 text-base border-2 border-gray-300 focus:border-green-500">
              <SelectValue placeholder="समस्या चुनें / Choose problem" />
            </SelectTrigger>
            <SelectContent>
              {problems.map((p) => (
                <SelectItem key={p.value} value={p.value} className="py-3 text-base">
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            मौसम / Season (Optional)
          </label>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-full h-14 text-base border-2 border-gray-300 focus:border-green-500">
              <SelectValue placeholder="मौसम चुनें / Choose season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((s) => (
                <SelectItem key={s.value} value={s.value} className="py-3 text-base">
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSearch}
          disabled={!crop || !problem}
          className="w-full btn-large bg-green-600 hover:bg-green-700 text-white"
        >
          <Search className="h-5 w-5 mr-2" />
          Expert सलाह पाएं / Get Expert Recommendation
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        * आवश्यक जानकारी / Required information
      </p>
    </div>
  );
};
