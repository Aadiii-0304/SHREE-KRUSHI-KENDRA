import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, X, RefreshCw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { products as fallbackProducts, cropTypes, brands } from '../data/products';
import { fetchProducts } from '../utils/api';
import { Product } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../context/LanguageContext';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedNpkGrades, setSelectedNpkGrades] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useBackend, setUseBackend] = useState(true);
  
  // Accordion states for filter sections
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [npkOpen, setNpkOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  // Load products from backend
  useEffect(() => {
    const loadProducts = async () => {
      if (!useBackend) {
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProducts({});
        
        if (data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (error) {
        console.error('Error loading products from backend:', error);
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setUseBackend(false);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Initialize filters from searchParams
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategories([cat]);
    }
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
    const subcatParam = searchParams.get('subcategory');
    if (subcatParam) {
      setSelectedSubcategories([subcatParam]);
    }
  }, [searchParams]);

  // Calculate max price from products
  const maxPrice = Math.max(...products.map(p => p.price), 5000);

  // Dynamic filter lists
  const availableBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort();
  const availableSubcategories = [
    'Conventional Fertilizers',
    'NPK Complex Fertilizers',
    'Water-Soluble NPK Fertilizers',
    'Drip Irrigation Fertilizers',
    'Foliar Spray Fertilizers',
    'Micronutrient Fertilizers',
    'Calcium and Magnesium Fertilizers',
    'Potash and Phosphorus Fertilizers',
    'Organic Fertilizers and Soil Conditioners',
    'Specialty Fertilizers',
    'Biofertilizers'
  ];
  const availableNpkGrades = Array.from(new Set(products.map(p => p.npkGrade).filter(Boolean))).sort();

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...products];

    // Apply URL search param
    const searchParam = searchParams.get('search');
    if (searchParam) {
      const search = searchParam.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        (p.brand && p.brand.toLowerCase().includes(search)) ||
        (p.npkGrade && p.npkGrade.toLowerCase().includes(search)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(search)) ||
        (p.crops && p.crops.some(c => c.toLowerCase().includes(search)))
      );
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Apply subcategory filters
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => p.subcategory && selectedSubcategories.includes(p.subcategory));
    }

    // Apply NPK Grade filters
    if (selectedNpkGrades.length > 0) {
      result = result.filter(p => p.npkGrade && selectedNpkGrades.includes(p.npkGrade));
    }

    // Apply crop filters
    if (selectedCrops.length > 0) {
      result = result.filter(p =>
        p.crops && p.crops.some(crop => selectedCrops.includes(crop))
      );
    }

    // Apply brand filters
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Apply price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Apply stock filter
    if (inStockOnly) {
      result = result.filter(p => (p.stock || 0) > 0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredProducts(result);
  }, [products, searchParams, selectedCategories, selectedSubcategories, selectedNpkGrades, selectedCrops, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubcategory = (subcat: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcat)
        ? prev.filter(s => s !== subcat)
        : [...prev, subcat]
    );
  };

  const toggleNpkGrade = (grade: string) => {
    setSelectedNpkGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev =>
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedNpkGrades([]);
    setSelectedCrops([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    selectedNpkGrades.length > 0 ||
    selectedCrops.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    minRating > 0 ||
    inStockOnly;

  const activeFilterCount = 
    selectedCategories.length +
    selectedSubcategories.length +
    selectedNpkGrades.length +
    selectedCrops.length +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const FilterSection = () => (
    <div className="space-y-4 text-sm">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={clearAllFilters} 
          className="w-full border-red-300 text-red-600 hover:bg-red-50 text-xs py-1.5"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          {language === 'en' ? 'Clear All Filters' : language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'सर्व फिल्टर साफ करा'} ({activeFilterCount})
        </Button>
      )}

      {/* Main Category Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{t('products.category')}</span>
          {categoryOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {categoryOpen && (
          <div className="space-y-2">
            {['pesticide', 'fertilizer', 'seed'].map(category => {
              const count = products.filter(p => p.category === category).length;
              return (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="cursor-pointer capitalize flex-1 font-medium">
                    {category === 'pesticide' ? t('categories.pesticide') : category === 'fertilizer' ? t('categories.fertilizer') : t('categories.seed')}
                  </Label>
                  <span className="text-xs text-gray-500 font-mono">
                    ({count})
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fertilizer Subcategory Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setSubcategoryOpen(!subcategoryOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>Fertilizer Subcategories</span>
          {subcategoryOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {subcategoryOpen && (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {availableSubcategories.map(subcat => {
              const count = products.filter(p => p.subcategory === subcat).length;
              return (
                <div key={subcat} className="flex items-start space-x-2 py-0.5">
                  <Checkbox
                    id={`subcat-${subcat}`}
                    checked={selectedSubcategories.includes(subcat)}
                    onCheckedChange={() => toggleSubcategory(subcat)}
                    className="mt-0.5"
                  />
                  <Label htmlFor={`subcat-${subcat}`} className="cursor-pointer flex-1 text-xs text-gray-700 leading-tight">
                    {subcat}
                  </Label>
                  <span className="text-[11px] text-gray-400 font-mono">({count})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Brand Filter (with Mahafeed highlighted) */}
      <div className="border-b pb-4">
        <button
          onClick={() => setBrandOpen(!brandOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{t('products.brand')}</span>
          {brandOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {brandOpen && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map(brand => {
              const count = products.filter(p => p.brand === brand).length;
              const isMahafeed = brand.toLowerCase().includes('mahafeed');
              return (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className={`cursor-pointer flex-1 text-xs ${isMahafeed ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                    {brand} {isMahafeed && '⭐'}
                  </Label>
                  <span className="text-[11px] text-gray-400 font-mono">({count})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* NPK Grade Filter */}
      {availableNpkGrades.length > 0 && (
        <div className="border-b pb-4">
          <button
            onClick={() => setNpkOpen(!npkOpen)}
            className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
          >
            <span>NPK Grade / Composition</span>
            {npkOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
          </button>
          {npkOpen && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableNpkGrades.map(grade => {
                const count = products.filter(p => p.npkGrade === grade).length;
                return (
                  <div key={grade} className="flex items-center space-x-2">
                    <Checkbox
                      id={`npk-${grade}`}
                      checked={selectedNpkGrades.includes(grade)}
                      onCheckedChange={() => toggleNpkGrade(grade)}
                    />
                    <Label htmlFor={`npk-${grade}`} className="cursor-pointer flex-1 font-mono text-xs text-gray-700">
                      NPK {grade}
                    </Label>
                    <span className="text-[11px] text-gray-400 font-mono">({count})</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Price Range Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{t('products.priceRange')}</span>
          {priceOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {priceOpen && (
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={maxPrice}
              step={50}
              className="my-4"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-green-700">₹{priceRange[0]}</span>
              <span className="text-gray-400">{language === 'en' ? 'to' : language === 'hi' ? 'तक' : 'पर्यंत'}</span>
              <span className="font-semibold text-green-700">₹{priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setRatingOpen(!ratingOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{t('productDetail.rating')}</span>
          {ratingOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {ratingOpen && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                  onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                />
                <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center gap-1 flex-1 text-xs">
                  <span>{rating}</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-500">{language === 'en' ? '& above' : language === 'hi' ? 'और अधिक' : 'आणि अधिक'}</span>
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stock Availability */}
      <div className="border-b pb-4">
        <button
          onClick={() => setStockOpen(!stockOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{language === 'en' ? 'Availability' : language === 'hi' ? 'उपलब्धता' : 'उपलब्धता'}</span>
          {stockOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {stockOpen && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            />
            <Label htmlFor="in-stock" className="cursor-pointer text-xs">
              {language === 'en' ? 'In Stock Only' : language === 'hi' ? 'केवल स्टॉक में' : 'केवळ स्टॉकमध्ये'}
            </Label>
          </div>
        )}
      </div>

      {/* Crop Type Filter */}
      <div className="pb-4">
        <button
          onClick={() => setCropOpen(!cropOpen)}
          className="flex items-center justify-between w-full mb-3 font-semibold text-gray-900 hover:text-green-600 transition-colors"
        >
          <span>{t('products.cropType')}</span>
          {cropOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
        </button>
        {cropOpen && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {cropTypes.slice(0, 10).map(crop => (
              <div key={crop} className="flex items-center space-x-2">
                <Checkbox
                  id={`crop-${crop}`}
                  checked={selectedCrops.includes(crop)}
                  onCheckedChange={() => toggleCrop(crop)}
                />
                <Label htmlFor={`crop-${crop}`} className="cursor-pointer flex-1 text-xs">
                  {crop}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">{t('products.title')}</h1>
            <p className="text-gray-600">
              {loading ? (
                t('common.loading')
              ) : (
                <>
                  {language === 'en' ? (
                    <>Showing <span className="font-semibold text-green-600">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products</>
                  ) : language === 'hi' ? (
                    <><span className="font-semibold">{products.length}</span> उत्पादों में से <span className="font-semibold text-green-600">{filteredProducts.length}</span> दिखाए जा रहे हैं</>
                  ) : (
                    <><span className="font-semibold">{products.length}</span> उत्पादनांपैकी <span className="font-semibold text-green-600">{filteredProducts.length}</span> दाखवले जात आहेत</>
                  )}
                  {!useBackend && <span className="text-orange-600 ml-2">(Sample data)</span>}
                </>
              )}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {/* Desktop Toggle Filters Button */}
            <Button
              variant={filtersVisible ? "default" : "outline"}
              onClick={() => setFiltersVisible(!filtersVisible)}
              className={`hidden md:flex items-center gap-2 ${filtersVisible ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {filtersVisible 
                ? (language === 'en' ? 'Hide Filters' : language === 'hi' ? 'फ़िल्टर छिपाएँ' : 'फिल्टर लपवा') 
                : (language === 'en' ? 'Show Filters' : language === 'hi' ? 'फ़िल्टर दिखाएँ' : 'फिल्टर दाखवा')}
              {hasActiveFilters && !filtersVisible && (
                <Badge variant="destructive" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Filter Sheet */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex-1 relative">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('products.filters')}
                  {hasActiveFilters && (
                    <Badge variant="destructive" className="ml-2">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>{language === 'en' ? 'Filter Products' : language === 'hi' ? 'फ़िल्टर उत्पाद' : 'फिल्टर उत्पादने'}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 overflow-y-auto h-[calc(100vh-8rem)]">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={t('products.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{language === 'en' ? 'Featured' : language === 'hi' ? 'विशेष रुप से प्रदर्शित' : 'वैशिष्ट्यीकृत'}</SelectItem>
                <SelectItem value="popular">{t('products.popularity')}</SelectItem>
                <SelectItem value="price-low">{t('products.priceLowHigh')}</SelectItem>
                <SelectItem value="price-high">{t('products.priceHighLow')}</SelectItem>
                <SelectItem value="rating">{language === 'en' ? 'Highest Rated' : language === 'hi' ? 'उच्चतम रेटेड' : 'उच्चतम रेटेड'}</SelectItem>
                <SelectItem value="name">{t('products.nameAZ')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{language === 'en' ? 'Active Filters:' : language === 'hi' ? 'सक्रिय फ़िल्टर:' : 'सक्रिय फिल्टर:'}</span>
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {cat === 'pesticide' ? t('categories.pesticide') : cat === 'fertilizer' ? t('categories.fertilizer') : t('categories.seed')}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                </Badge>
              ))}
              {selectedSubcategories.map(subcat => (
                <Badge key={subcat} variant="secondary" className="gap-1 bg-blue-100 text-blue-800">
                  {subcat}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSubcategory(subcat)} />
                </Badge>
              ))}
              {selectedNpkGrades.map(grade => (
                <Badge key={grade} variant="secondary" className="gap-1 bg-emerald-100 text-emerald-800 font-mono">
                  NPK {grade}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleNpkGrade(grade)} />
                </Badge>
              ))}
              {selectedCrops.map(crop => (
                <Badge key={crop} variant="secondary" className="gap-1">
                  {crop}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCrop(crop)} />
                </Badge>
              ))}
              {selectedBrands.map(brand => (
                <Badge key={brand} variant="secondary" className="gap-1 bg-amber-100 text-amber-800">
                  {brand}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary">
                  {minRating}★ & above
                </Badge>
              )}
              {inStockOnly && (
                <Badge variant="secondary">{language === 'en' ? 'In Stock' : language === 'hi' ? 'स्टॉक में' : 'स्टॉकमध्ये'}</Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {language === 'en' ? 'Clear All' : language === 'hi' ? 'सभी साफ़ करें' : 'सर्व साफ करा'}
              </Button>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          {filtersVisible && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hidden md:block w-72 flex-shrink-0"
            >
              <div className="sticky top-24 bg-white rounded-lg border shadow-sm p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">{t('products.filters')}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFiltersVisible(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FilterSection />
              </div>
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <RefreshCw className="h-12 w-12 animate-spin text-green-600 mb-4" />
                <p className="text-gray-600 text-lg">
                  {language === 'en' ? 'Loading products...' : language === 'hi' ? 'उत्पाद लोड हो रहे हैं...' : 'उत्पादने लोड होत आहेत...'}
                </p>
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className={`grid gap-6 ${
                  filtersVisible
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.2,
                        delay: index < 20 ? index * 0.02 : 0 
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border"
              >
                <div className="text-center">
                  <div className="mb-4 text-gray-400">
                    <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t('products.noResults')}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {language === 'en' 
                      ? "We couldn't find any products matching your selected filters. Try adjusting your filters to see more results." 
                      : language === 'hi' 
                      ? "हमें आपके द्वारा चुने गए फ़िल्टर से मेल खाने वाले कोई उत्पाद नहीं मिले। अधिक परिणाम देखने के लिए अपने फ़िल्टर को समायोजित करने का प्रयास करें।" 
                      : "आम्हाला तुमच्या निवडलेल्या फिल्टरशी जुळणारे कोणतेही उत्पादन आढळले नाही. अधिक परिणाम पाहण्यासाठी तुमचे फिल्टर बदलून पहा."}
                  </p>
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearAllFilters}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t('products.clearFilters')}
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
