const fs = require('fs');
const path = require('path');

// Image URLs curated for pesticides, fertilizers, and seeds
const pesticideImages = [
  'https://images.unsplash.com/photo-1621331462282-0c890b7c933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1684853807644-428f89ce35fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1595300471195-6062f1b01750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

const fertilizerImages = [
  'https://images.unsplash.com/photo-1597066371673-2088a5c19802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1609168172263-45c6d202007a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

const seedImages = [
  'https://images.unsplash.com/photo-1647553756926-21a62021b9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1588096285007-fc080e63a58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

const cropList = ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'];

// Product definitions generator
const products = [];

// Helper
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 1. PESTICIDES (180 Items)
const pesticideChemicals = [
  { name: 'Monocrotophos 36% SL', type: 'Insecticide', crops: ['Cotton', 'Rice', 'Soybean'], dosage: '1.5-2ml per L' },
  { name: 'Chlorpyrifos 20% EC', type: 'Insecticide', crops: ['Cotton', 'Sugarcane', 'Wheat'], dosage: '2ml per L' },
  { name: 'Imidacloprid 17.8% SL', type: 'Systemic Insecticide', crops: ['Cotton', 'Rice', 'Wheat'], dosage: '0.5ml per L' },
  { name: 'Thiamethoxam 25% WG', type: 'Neonicotinoid Insecticide', crops: ['Cotton', 'Rice', 'Soybean'], dosage: '0.4g per L' },
  { name: 'Emamectin Benzoate 5% SG', type: 'Bio-Insecticide', crops: ['Cotton', 'Soybean'], dosage: '0.4g per L' },
  { name: 'Chlorantraniliprole 18.5% SC', type: 'Advanced Insecticide', crops: ['Cotton', 'Rice', 'Sugarcane'], dosage: '0.3ml per L' },
  { name: 'Fipronil 5% SC', type: 'Insecticide', crops: ['Rice', 'Sugarcane', 'Cotton'], dosage: '1.5ml per L' },
  { name: 'Acephate 75% SP', type: 'Systemic Insecticide', crops: ['Cotton', 'Soybean', 'Rice'], dosage: '1.5g per L' },
  { name: 'Profenofos 50% EC', type: 'Organophosphate Insecticide', crops: ['Cotton', 'Soybean'], dosage: '2ml per L' },
  { name: 'Lambda-Cyhalothrin 5% EC', type: 'Pyrethroid Insecticide', crops: ['Cotton', 'Rice', 'Wheat'], dosage: '1ml per L' },
  { name: 'Cartap Hydrochloride 50% SP', type: 'Insecticide', crops: ['Rice', 'Sugarcane'], dosage: '1g per L' },
  { name: 'Diafenthiuron 50% WP', type: 'Mite & Whitefly Control', crops: ['Cotton', 'Soybean'], dosage: '1g per L' },
  { name: 'Spinetoram 11.7% SC', type: 'Bio-Insecticide', crops: ['Cotton', 'Soybean'], dosage: '0.9ml per L' },
  { name: 'Cypermethrin 25% EC', type: 'Knockdown Insecticide', crops: ['Cotton', 'Wheat', 'Rice'], dosage: '1ml per L' },
  { name: 'Deltamethrin 2.8% EC', type: 'Pyrethroid Insecticide', crops: ['Cotton', 'Soybean'], dosage: '1ml per L' },
  { name: 'Mancozeb 75% WP', type: 'Contact Fungicide', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean'], dosage: '2.5g per L' },
  { name: 'Carbendazim 50% WP', type: 'Systemic Fungicide', crops: ['Cotton', 'Rice', 'Wheat'], dosage: '1g per L' },
  { name: 'Hexaconazole 5% SC', type: 'Triazole Fungicide', crops: ['Rice', 'Wheat', 'Cotton'], dosage: '2ml per L' },
  { name: 'Propiconazole 25% EC', type: 'Systemic Fungicide', crops: ['Wheat', 'Rice'], dosage: '1ml per L' },
  { name: 'Tebuconazole 25.9% EC', type: 'Broad Spectrum Fungicide', crops: ['Wheat', 'Soybean', 'Rice'], dosage: '1.5ml per L' },
  { name: 'Azoxystrobin 23% SC', type: 'Strobilurin Fungicide', crops: ['Rice', 'Cotton', 'Wheat'], dosage: '1ml per L' },
  { name: 'Difenoconazole 25% EC', type: 'Systemic Fungicide', crops: ['Cotton', 'Wheat', 'Rice'], dosage: '0.5ml per L' },
  { name: 'Copper Oxychloride 50% WP', type: 'Protective Fungicide', crops: ['Cotton', 'Rice', 'Sugarcane'], dosage: '3g per L' },
  { name: 'Metalaxyl 8% + Mancozeb 64% WP', type: 'Dual Fungicide', crops: ['Cotton', 'Soybean'], dosage: '2g per L' },
  { name: 'Tricyclazole 75% WP', type: 'Rice Blast Fungicide', crops: ['Rice'], dosage: '0.6g per L' },
  { name: 'Glyphosate 41% SL', type: 'Non-Selective Herbicide', crops: ['Cotton', 'Sugarcane', 'Wheat'], dosage: '8-10ml per L' },
  { name: 'Atrazine 50% WP', type: 'Pre-emergence Herbicide', crops: ['Sugarcane', 'Wheat'], dosage: '3-4g per L' },
  { name: 'Pendimethalin 30% EC', type: 'Selective Herbicide', crops: ['Cotton', 'Soybean', 'Wheat'], dosage: '3-5ml per L' },
  { name: 'Pretilachlor 50% EC', type: 'Rice Herbicide', crops: ['Rice'], dosage: '3ml per L' },
  { name: 'Metribuzin 70% WP', type: 'Selective Herbicide', crops: ['Sugarcane', 'Wheat', 'Soybean'], dosage: '1.5g per L' },
  { name: 'Quizalofop-Ethyl 5% EC', type: 'Grass Herbicide', crops: ['Cotton', 'Soybean'], dosage: '2ml per L' },
  { name: '2,4-D Amine Salt 58% SL', type: 'Broadleaf Herbicide', crops: ['Wheat', 'Sugarcane', 'Rice'], dosage: '2.5ml per L' },
];

const pesticideBrands = [
  'Bayer CropScience', 'Syngenta', 'UPL', 'Tata Rallis', 'Dhanuka', 'FMC',
  'Crystal Crop Protection', 'PI Industries', 'Indofil', 'Sumitomo Chemical',
  'Coromandel', 'Godrej Agrovet', 'ADAMA', 'Biostadt', 'Sharda Cropchem'
];

let pCount = 1;

for (const chem of pesticideChemicals) {
  for (const brand of pesticideBrands.slice(0, 6)) { // 32 * 6 = 192 items
    if (products.length >= 180) break;
    const price = Math.round(rnd(250, 1950) / 10) * 10 + 5;
    const origPrice = Math.round((price * rnd(112, 130) / 100) / 10) * 10;
    const rating = parseFloat((rnd(41, 49) / 10).toFixed(1));
    const reviews = rnd(45, 650);
    const stock = rnd(45, 350);
    const id = `p${pCount++}`;

    products.push({
      id,
      name: `${brand} ${chem.name.split(' ')[0]} (${chem.name})`,
      category: 'pesticide',
      price,
      originalPrice: origPrice,
      image: pick(pesticideImages),
      description: `${chem.type} for effective protection of ${chem.crops.join(', ')}.`,
      fullDescription: `${brand} ${chem.name} is a high efficacy ${chem.type.toLowerCase()} formulated for quick knockdown and long residual control against target pests.`,
      crops: chem.crops,
      brand,
      stock,
      rating,
      reviews,
      usage: 'Spray during early morning or evening hours upon pest arrival',
      dosage: chem.dosage,
      benefits: [
        'Broad spectrum protection',
        'Fast acting formula',
        'Excellent crop safety',
        'Rain-fast within hours'
      ],
      variants: [
        { size: '100', unit: 'ml', price: Math.round(price * 0.3), stock: rnd(30, 150) },
        { size: '250', unit: 'ml', price: Math.round(price * 0.6), stock: rnd(30, 150) },
        { size: '500', unit: 'ml', price: price, stock: stock },
        { size: '1', unit: 'L', price: Math.round(price * 1.85), stock: rnd(20, 100) }
      ]
    });
  }
}

// 2. FERTILIZERS (170 Items)
const fertilizerTypes = [
  { name: 'NPK 19:19:19 Water Soluble', desc: '100% water soluble balanced NPK ratio', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [120, 350] },
  { name: 'NPK 12:61:0 Mono Ammonium Phosphate', desc: 'High phosphorus starter fertilizer for root growth', crops: ['Cotton', 'Wheat', 'Soybean'], priceRange: [180, 420] },
  { name: 'NPK 0:52:34 Mono Potassium Phosphate', desc: 'High P and K for blooming, flower retention and fruit formation', crops: ['Cotton', 'Soybean', 'Sugarcane'], priceRange: [220, 480] },
  { name: 'NPK 13:0:45 Potassium Nitrate', desc: 'Water soluble potassium and nitrate nitrogen for fruit enlargement', crops: ['Cotton', 'Sugarcane', 'Rice'], priceRange: [190, 450] },
  { name: 'NPK 0:0:50 Sulphate of Potash', desc: 'Chlorine-free potassium for fruit sweetness and color', crops: ['Sugarcane', 'Cotton', 'Soybean'], priceRange: [210, 460] },
  { name: 'NPK 20:20:0:13 Granular', desc: 'High nitrogen and phosphorus with 13% sulphur', crops: ['Soybean', 'Cotton', 'Wheat'], priceRange: [1250, 1550] },
  { name: 'NPK 10:26:26 Complex', desc: 'Phosphorus and potash rich complex fertilizer', crops: ['Cotton', 'Sugarcane', 'Soybean'], priceRange: [1350, 1650] },
  { name: 'NPK 12:32:16 Complex', desc: 'High phosphorus starter complex for root development', crops: ['Cotton', 'Wheat', 'Soybean'], priceRange: [1380, 1680] },
  { name: 'Di-Ammonium Phosphate (DAP 18:46:0)', desc: 'Concentrated nitrogen and phosphorus fertilizer', crops: ['Cotton', 'Soybean', 'Wheat', 'Sugarcane'], priceRange: [1300, 1450] },
  { name: 'Neem Coated Urea (46% N)', desc: 'Slow release nitrogen fertilizer for vegetative growth', crops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton'], priceRange: [260, 290] },
  { name: 'Muriate of Potash (MOP 60% K2O)', desc: 'High potassium source for stress resistance and grain filling', crops: ['Cotton', 'Sugarcane', 'Soybean'], priceRange: [1050, 1250] },
  { name: 'Single Super Phosphate (SSP 16% P + 11% S)', desc: 'Phosphorus with sulphur for pulse and oilseed crops', crops: ['Soybean', 'Cotton', 'Wheat'], priceRange: [350, 450] },
  { name: 'Calcium Nitrate + Boron', desc: 'Water soluble calcium and boron for cell wall strength', crops: ['Cotton', 'Sugarcane', 'Soybean'], priceRange: [850, 1150] },
  { name: 'Magnesium Sulphate 9.5% Mg', desc: 'Chlorophyll builder preventing yellowing between leaf veins', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean'], priceRange: [350, 550] },
  { name: 'Zinc Sulphate 21% Heptahydrate', desc: 'Essential zinc micronutrient for enzymatic activity', crops: ['Rice', 'Wheat', 'Cotton', 'Soybean'], priceRange: [420, 620] },
  { name: 'Zinc Sulphate 33% Monohydrate', desc: 'Concentrated zinc formula for quick deficiency recovery', crops: ['Rice', 'Wheat', 'Cotton'], priceRange: [550, 780] },
  { name: 'Boron 20% Disodium Octaborate', desc: 'Water soluble boron for flower formation and fruit set', crops: ['Cotton', 'Soybean', 'Sugarcane'], priceRange: [450, 680] },
  { name: 'Ferrous Sulphate 19% Fe', desc: 'Iron micronutrient for dark green foliage', crops: ['Cotton', 'Rice', 'Wheat'], priceRange: [280, 420] },
  { name: 'Chelated Micronutrient Mixture', desc: 'EDTA chelated Zn, Fe, Mn, Cu, B, Mo mixture', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [650, 950] },
  { name: 'Humic Acid 98% Potassium Humate', desc: 'Organic soil conditioner and root stimulator', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [750, 1250] },
  { name: 'Seaweed Extract Liquid Sagarika', desc: '100% bio-organic growth booster from seaweed', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [480, 750] },
  { name: 'Bio-NPK Liquid Consortium', desc: 'Azotobacter + PSB + KMB beneficial bio-fertilizer', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [320, 520] },
  { name: 'VAM Mycorrhiza Bio-Fertilizer', desc: 'Vesicular Arbuscular Mycorrhizae root colonizer', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [450, 780] },
  { name: 'Premium Vermicompost (40kg)', desc: 'Earthworm enriched organic manure', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [320, 450] },
  { name: 'Deoiled Neem Cake Powder (50kg)', desc: 'Organic manure with natural pest deterrent properties', crops: ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'], priceRange: [980, 1350] },
];

const fertilizerBrands = [
  'IFFCO', 'KRIBHCO', 'Coromandel', 'GSFC', 'RCF', 'Chambal Fertilizers',
  'Tata Chemicals', 'Deepak Fertilizers', 'Aries Agro', 'Multiplex', 'Zuari Agro',
  'Mahadhan', 'Shakti Organic', 'Nature Bio', 'Organic India'
];

let fCount = 1;

for (const fert of fertilizerTypes) {
  for (const brand of fertilizerBrands.slice(0, 7)) { // 25 * 7 = 175 items
    if (products.length >= 350) break;
    const price = Math.round(rnd(fert.priceRange[0], fert.priceRange[1]) / 5) * 5;
    const origPrice = Math.round((price * rnd(110, 125) / 100) / 5) * 5;
    const rating = parseFloat((rnd(43, 50) / 10).toFixed(1));
    const reviews = rnd(60, 850);
    const stock = rnd(50, 400);
    const id = `f${fCount++}`;

    products.push({
      id,
      name: `${brand} ${fert.name}`,
      category: 'fertilizer',
      price,
      originalPrice: origPrice,
      image: pick(fertilizerImages),
      description: fert.desc,
      fullDescription: `${brand} ${fert.name} provides high purity nutrients specially formulated for optimal root uptake and balanced crop nutrition.`,
      crops: fert.crops,
      brand,
      stock,
      rating,
      reviews,
      usage: 'Apply as basal dose or via drip irrigation/foliar spray during growth phase',
      dosage: '5-10kg per acre for drip or 50kg per acre for soil application',
      benefits: [
        'High nutrient availability',
        'Improves soil health',
        'Enhances root development',
        'Increases yield and crop quality'
      ]
    });
  }
}

// 3. SEEDS (170 Items)
const seedVarieties = [
  // Cotton
  { crop: 'Cotton', name: 'Bollgard II Bt Cotton Seeds', brand: 'Mahyco', price: 920, desc: 'High yield Bt cotton with bollworm protection - 450g' },
  { crop: 'Cotton', name: 'Ajeet 155 BG II Cotton', brand: 'Ajeet Seeds', price: 910, desc: 'Drought tolerant Bt cotton hybrid - 450g' },
  { crop: 'Cotton', name: 'Rasi 659 BG II Cotton', brand: 'Rasi Seeds', price: 935, desc: 'Big boll size easy picking Bt cotton - 450g' },
  { crop: 'Cotton', name: 'Jadu BG II Cotton', brand: 'Kaveri Seeds', price: 925, desc: 'High boll weight hybrid - 450g' },
  { crop: 'Cotton', name: 'Bhakti BG II Cotton', brand: 'Nuziveedu Seeds', price: 915, desc: 'Heavy branching hybrid for rainfed conditions - 450g' },
  { crop: 'Cotton', name: 'Ankur 3028 BG II Cotton', brand: 'Ankur Seeds', price: 930, desc: 'Early maturing compact cotton hybrid - 450g' },

  // Rice
  { crop: 'Rice', name: 'Pusa Basmati 1121 Rice Seeds', brand: 'IARI Pusa', price: 850, desc: 'Extra long aromatic basmati rice - 10kg' },
  { crop: 'Rice', name: 'Pusa Basmati 1509 Rice Seeds', brand: 'IARI Pusa', price: 890, desc: 'Early maturing basmati variety - 10kg' },
  { crop: 'Rice', name: 'Arize 6444 Gold Hybrid Rice', brand: 'Bayer Arize', price: 980, desc: 'Bacterial leaf blight resistant hybrid rice - 3kg' },
  { crop: 'Rice', name: 'Sona Masuri Certified Rice Seeds', brand: 'Kaveri Seeds', price: 1450, desc: 'Lightweight aromatic medium grain rice - 25kg' },
  { crop: 'Rice', name: 'US 312 Hybrid Rice Seeds', brand: 'BioSeed', price: 870, desc: 'Heavy panicle high grain weight rice hybrid - 3kg' },
  { crop: 'Rice', name: 'KRH-2 Hybrid Rice Seeds', brand: 'Kaveri Seeds', price: 920, desc: 'High yielding irrigated rice hybrid - 3kg' },

  // Wheat
  { crop: 'Wheat', name: 'HD 2967 Wheat Seeds', brand: 'IARI Pusa', price: 950, desc: 'High yielding double rust resistant wheat - 40kg' },
  { crop: 'Wheat', name: 'HD 3086 (Pusa Gautami) Wheat', brand: 'IARI Pusa', price: 980, desc: 'Heat tolerant disease resistant wheat - 40kg' },
  { crop: 'Wheat', name: 'PBW 550 Certified Wheat Seeds', brand: 'PAU Ludhiana', price: 920, desc: 'Bold grain medium height wheat - 40kg' },
  { crop: 'Wheat', name: 'DBW 187 (Karan Vandana) Wheat', brand: 'ICAR', price: 1050, desc: 'Biofortified zinc rich high yield wheat - 40kg' },
  { crop: 'Wheat', name: 'DBW 303 (Karan Narendra) Wheat', brand: 'ICAR', price: 1120, desc: 'Super high yielding wheat variety - 40kg' },

  // Soybean
  { crop: 'Soybean', name: 'JS 335 Soybean Seeds', brand: 'ICAR Jabalpur', price: 1850, desc: 'High oil content yellow soybean - 30kg' },
  { crop: 'Soybean', name: 'JS 9560 Early Soybean Seeds', brand: 'ICAR Jabalpur', price: 1950, desc: 'Early maturing 85-90 days soybean - 30kg' },
  { crop: 'Soybean', name: 'JS 2034 High Yield Soybean', brand: 'ICAR Jabalpur', price: 2050, desc: 'Girdle beetle resistant soybean - 30kg' },
  { crop: 'Soybean', name: 'RVS 2004-1 Soybean Seeds', brand: 'Advanta Seeds', price: 2100, desc: 'High pod count per plant soybean - 30kg' },

  // Maize / Corn
  { crop: 'Wheat', name: 'Pioneer 3397 Hybrid Maize Seeds', brand: 'Corteva Pioneer', price: 1420, desc: 'Yellow corn hybrid with tight husk cover - 4kg' },
  { crop: 'Wheat', name: 'Pioneer 3401 Grain Maize', brand: 'Corteva Pioneer', price: 1450, desc: 'Drought tolerant heavy kernel maize - 4kg' },
  { crop: 'Wheat', name: 'NK 6240 Hybrid Corn Seeds', brand: 'Syngenta', price: 1380, desc: 'High starch kernel corn hybrid - 4kg' },

  // Vegetables
  { crop: 'Cotton', name: 'Tomato Seeds - Arka Rakshak', brand: 'IIHR Bangalore', price: 450, desc: 'Triple disease resistant hybrid tomato - 10g' },
  { crop: 'Cotton', name: 'Chili Seeds - Teja 4', brand: 'Namdhari Seeds', price: 620, desc: 'High pungency deep red chili - 10g' },
  { crop: 'Cotton', name: 'Onion Seeds - N-53', brand: 'DOGR Pune', price: 850, desc: 'Kharif dark red onion seeds - 500g' },
  { crop: 'Cotton', name: 'Okra Seeds - Radhika', brand: 'VNR Seeds', price: 380, desc: 'YVMV resistant dark green okra - 100g' },
  { crop: 'Cotton', name: 'Brinjal Seeds - VNR 212', brand: 'VNR Seeds', price: 420, desc: 'Round purple glossy brinjal - 10g' },
  { crop: 'Cotton', name: 'Cucumber Seeds - Malini', brand: 'Seminis', price: 480, desc: 'Crisp green slicing cucumber - 10g' },
  { crop: 'Cotton', name: 'Watermelon Seeds - Sugar Baby', brand: 'Known You Seed', price: 550, desc: 'Dark green sweet red flesh watermelon - 50g' },
];

let sCount = 1;

for (let i = 0; i < 6; i++) { // Repeat with variations to generate ~170 items
  for (const v of seedVarieties) {
    if (products.length >= 520) break;
    const isVar = i > 0;
    const nameStr = isVar ? `${v.name} (Batch ${String.fromCharCode(65 + i)})` : v.name;
    const price = Math.round((v.price * (1 + (i * 0.03))) / 5) * 5;
    const origPrice = Math.round((price * rnd(112, 125) / 100) / 5) * 5;
    const rating = parseFloat((rnd(44, 50) / 10).toFixed(1));
    const reviews = rnd(30, 500);
    const stock = rnd(40, 300);
    const id = `s${sCount++}`;

    products.push({
      id,
      name: nameStr,
      category: 'seed',
      price,
      originalPrice: origPrice,
      image: pick(seedImages),
      description: v.desc,
      fullDescription: `${v.brand} ${nameStr} is a certified high germination seed variety bred for high yield potential, disease resistance, and uniform crop stand.`,
      crops: [v.crop, 'Rice', 'Wheat'].filter((c, idx, self) => self.indexOf(c) === idx),
      brand: v.brand,
      stock,
      rating,
      reviews,
      usage: 'Sow at recommended spacing in well-prepared seedbed with adequate soil moisture',
      dosage: 'Refer to packet seed rate for specific crop spacing',
      benefits: [
        '90%+ high germination rate',
        'Certified disease resistant strain',
        'Uniform growth & flowering',
        'High yield output'
      ]
    });
  }
}

console.log(`Generated ${products.length} total products.`);

const fileContent = `import { Product } from '../types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const cropTypes = ['Cotton', 'Rice', 'Wheat', 'Soybean', 'Sugarcane'];
export const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
`;

const targetPath = path.join(__dirname, 'products.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log(`Successfully wrote ${products.length} products to ${targetPath}`);

module.exports = { products };
