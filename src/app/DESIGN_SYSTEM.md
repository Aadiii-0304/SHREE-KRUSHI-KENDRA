# Shree Krushi Kendra - Farmer-Friendly Design System

## Overview
This design system is specifically created for Indian farmers, prioritizing mobile-first design, simplicity, trust, and accessibility for rural and semi-rural users.

---

## 🎨 Color Palette

### Primary Colors (Agriculture Theme)
- **Green Dark** (`#1a7a3e`) - Primary actions, headers
- **Green** (`#22c55e`) - Success states, CTAs
- **Green Light** (`#86efac`) - Highlights, hover states
- **Yellow** (`#fbbf24`) - Secondary CTAs, trust badges
- **Yellow Light** (`#fef3c7`) - Backgrounds, accents
- **White** (`#ffffff`) - Backgrounds
- **Gray** (`#f3f4f6`) - Neutral backgrounds

### Semantic Colors
- **Success**: Green (`#22c55e`)
- **Warning**: Yellow (`#fbbf24`)
- **Error**: Red (`#dc2626`)
- **Info**: Blue (`#3b82f6`)

---

## 📱 Typography

### Font Families
- **Headings**: Poppins (bold, clear, farmer-friendly)
- **Body Text**: Inter (readable, professional)
- **Fallbacks**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif

### Font Sizes (Mobile-First)
- **H1**: 2rem (32px) - Page titles
- **H2**: 1.75rem (28px) - Section headings
- **H3**: 1.5rem (24px) - Subsections
- **H4**: 1.25rem (20px) - Card titles
- **Body**: 1rem (16px) - Regular text
- **Small**: 0.875rem (14px) - Labels, captions
- **Button**: 1.0625rem (17px) - Large touch targets

### Font Weights
- **Bold**: 700 - Headings, emphasis
- **Semibold**: 600 - Subheadings, buttons
- **Medium**: 500 - Labels
- **Regular**: 400 - Body text

---

## 🔘 Button Styles

### Primary Button
```css
className="bg-green-600 hover:bg-green-700 text-white btn-large"
```
- Used for main actions: "Add to Cart", "Buy Now"
- Min height: 56px (easy to tap)
- Bold font, rounded corners

### Secondary Button
```css
className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 btn-large"
```
- Used for alternative actions
- High visibility, contrasts with green

### WhatsApp Button
```css
className="whatsapp-green text-white btn-large"
```
- Background: #25d366 (WhatsApp brand color)
- Used for expert consultation
- Always includes WhatsApp icon

### Ghost Button
```css
className="border-2 border-green-600 text-green-700 hover:bg-green-50"
```
- Used for tertiary actions
- Transparent background

---

## 📦 Component Library

### 1. Mobile Bottom Navigation
**Location**: `/components/MobileBottomNav.tsx`

**Features**:
- Fixed bottom navigation (only on mobile)
- 5 tabs: Home, Categories, Crop Solutions, Expert Help, Cart
- Large touch targets (64px height)
- Active state highlighting
- Badge for cart count

**Usage**:
```tsx
import { MobileBottomNav } from './components/MobileBottomNav';
<MobileBottomNav />
```

### 2. Language Switcher
**Location**: `/components/LanguageSwitcher.tsx`

**Supported Languages**:
- English, Hindi, Marathi, Telugu, Tamil, Kannada, Punjabi, Bengali, Gujarati

**Features**:
- Dropdown menu with native script
- Clear selection indicator
- Mobile-optimized

**Usage**:
```tsx
import { LanguageSwitcher } from './components/LanguageSwitcher';
<LanguageSwitcher />
```

### 3. WhatsApp Button
**Location**: `/components/WhatsAppButton.tsx`

**Variants**:
- **Inline Button**: For CTAs in sections
- **Floating Button**: Fixed bottom-right, always accessible

**Usage**:
```tsx
import { WhatsAppButton, FloatingWhatsAppButton } from './components/WhatsAppButton';

// Inline
<WhatsAppButton 
  size="lg" 
  message="Custom message in Hindi/Marathi"
/>

// Floating
<FloatingWhatsAppButton />
```

### 4. Crop Finder
**Location**: `/components/CropFinder.tsx`

**Features**:
- 3 dropdown selectors: Crop, Problem, Season
- Bilingual labels (Hindi + English)
- Large touch-friendly dropdowns
- Emoji icons for visual recognition
- Redirects to crop solutions page

**Usage**:
```tsx
import { CropFinder } from './components/CropFinder';
<CropFinder />
```

### 5. Trust Badges
**Location**: `/components/TrustBadges.tsx`

**Displays**:
- Licensed Store (Government approval)
- Genuine Products (100% authentic)
- 14+ Years (Experience)
- Expert Guidance (Free consultation)

**Usage**:
```tsx
import { TrustBadges } from './components/TrustBadges';
<TrustBadges />
```

### 6. Product Safety Info
**Location**: `/components/ProductSafetyInfo.tsx`

**Includes**:
- Dosage table (per acre, per crop)
- Application method (step-by-step)
- Safety precautions (for pesticides)
- Harvest waiting period
- Government approval info

**Usage**:
```tsx
import { ProductSafetyInfo } from './components/ProductSafetyInfo';
<ProductSafetyInfo category="pesticide" />
```

---

## 📄 Page Templates

### 1. Homepage (`/pages/NewHomepage.tsx`)
**Mobile-First Structure**:
1. Hero section with owner info
2. Trust badges strip
3. **Crop Finder** (prominent placement)
4. WhatsApp banner
5. Shop by category (large cards)
6. Crop-wise solutions
7. Featured products
8. Farmer testimonials
9. Physical store section
10. Google Maps embed
11. Floating WhatsApp button

### 2. Crop Solutions Page (`/pages/CropSolutionsPage.tsx`)
**Features**:
- Crop and problem context display
- Recommended products
- Usage guidelines
- Expert consultation CTA

### 3. Expert Help Page (`/pages/ExpertHelpPage.tsx`)
**Features**:
- WhatsApp & Phone contact cards
- Crop photo upload
- Common problem categories
- Trust indicators
- Working hours display

### 4. Product Detail Page (`/pages/ProductDetailPage.tsx`)
**Enhanced with**:
- Dosage information table
- Application method (step-by-step)
- Safety precautions (bilingual)
- Harvest waiting period
- Government approval badges
- WhatsApp consultation CTA

---

## 🎯 Design Principles

### 1. **Mobile-First**
- Bottom navigation for thumb-friendly access
- Large touch targets (minimum 48px)
- Single-column layouts on mobile
- Minimal horizontal scrolling

### 2. **Bilingual by Default**
- Hindi + English labels everywhere
- Native script for language switcher
- Cultural relevance (use of namaste, etc.)

### 3. **Trust-Focused**
- Government license badges
- Owner name and photo
- Physical store address
- Years of experience highlighted
- Farmer testimonials with villages

### 4. **Simple & Clear**
- Large fonts (minimum 16px body text)
- High contrast colors
- Emoji icons for quick recognition
- Step-by-step instructions
- Minimal jargon

### 5. **Expert-Guided**
- WhatsApp button on every page
- Crop finder for recommendations
- Dosage tables and safety info
- Free consultation emphasized

---

## 📐 Layout Guidelines

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Border Radius
- **Small**: 0.5rem (8px) - Inputs, badges
- **Medium**: 0.75rem (12px) - Cards
- **Large**: 1rem (16px) - Buttons
- **XL**: 1.5rem (24px) - Hero sections

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## ♿ Accessibility

### Touch Targets
- Minimum size: 48x48px
- Preferred: 56x56px for primary actions

### Color Contrast
- Body text: 4.5:1 minimum
- Large text: 3:1 minimum
- High contrast mode support

### Screen Reader Support
- Semantic HTML (nav, main, section)
- ARIA labels on icons
- Alt text on all images

---

## 🚀 Key Features Implemented

✅ **Mobile-First Homepage** with crop finder
✅ **Multi-language support** (9 Indian languages)
✅ **WhatsApp integration** (inline + floating)
✅ **Crop-wise product recommendations**
✅ **Expert consultation page**
✅ **Product detail page with dosage & safety**
✅ **Mobile bottom navigation**
✅ **Trust badges** (license, experience, genuine)
✅ **Bilingual UI** (Hindi + English)
✅ **Large touch-friendly buttons**
✅ **Farmer testimonials** with local context
✅ **Physical store information** with map

---

## 📊 Usage Examples

### Large Touch-Friendly Card
```tsx
<div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer card-tap">
  <div className="text-5xl mb-4">🌱</div>
  <h3 className="text-2xl font-bold mb-1">बीज</h3>
  <p className="text-lg font-semibold text-gray-700 mb-2">Seeds</p>
  <Button className="w-full">देखें / Browse</Button>
</div>
```

### Bilingual Text Pattern
```tsx
<h2 className="text-3xl font-bold mb-2">फसल के अनुसार समाधान</h2>
<p className="text-gray-600">Crop-wise Solutions</p>
```

### WhatsApp CTA Section
```tsx
<div className="bg-[#25d366] text-white py-8 px-4">
  <h3 className="text-2xl font-bold mb-2">
    WhatsApp पर Agri Expert से बात करें
  </h3>
  <p className="mb-4">
    मुफ्त सलाह | स्थानीय विशेषज्ञ | तुरंत जवाब
  </p>
  <WhatsAppButton size="lg" />
</div>
```

---

## 🔧 Technical Notes

### Custom CSS Classes
```css
.btn-large - Large button (56px min-height)
.card-tap - Active tap feedback
.whatsapp-green - WhatsApp brand color
.safe-bottom - Safe area for mobile bottom nav
```

### Color Variables
All agriculture theme colors are defined in `/styles/globals.css`:
- `--agri-green-dark`, `--agri-green`, `--agri-green-light`
- `--agri-yellow`, `--agri-yellow-light`
- `--agri-white`, `--agri-gray`

---

## 📞 Contact & Support

For any design system questions or component usage:
- Check component files in `/components/`
- Review page implementations in `/pages/`
- Refer to this documentation

---

**Design System Version**: 1.0
**Last Updated**: January 2026
**Optimized For**: Indian Farmers, Mobile-First, Rural Usage
