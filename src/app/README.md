# Shree Krushi Kendra - Agricultural E-Commerce Platform

**Owner:** Mohan Damdhar  
**Contact:** +91 7219437160 | aadityadamdhar342006@gmail.com  
**Hours:** Monday to Sunday, 7:30 AM - 9:00 PM

## 🌾 Overview

A modern, full-featured e-commerce platform for agricultural products including pesticides, fertilizers, and seeds. Built with React, TypeScript, Tailwind CSS, and Supabase backend for scalable product management.

## ✨ Features

### Customer Features
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🔍 **Advanced Search & Filtering** - Find products by category, crop type, brand
- 🛒 **Shopping Cart** - Add products with variant selection (different sizes)
- 💳 **Checkout Process** - Multiple payment options (UPI, Card, COD)
- 👤 **User Accounts** - Login, order history, order tracking
- 🗺️ **Store Locator** - Embedded Google Maps with directions
- ⭐ **Product Reviews** - Rating and review system
- 🎨 **Smooth Animations** - Motion/Framer Motion for enhanced UX

### Admin Features
- 📊 **Product Management** - Add, edit, delete 500+ products
- 📁 **CSV Import** - Bulk import products from CSV files
- 📦 **Inventory Tracking** - Real-time stock management
- 📈 **Analytics Dashboard** - Sales, revenue, and user statistics
- 🔄 **Order Management** - Track and update order status

### Technical Features
- ⚡ **Backend API** - Supabase-powered REST API
- 💾 **Database** - Key-value store for products and orders
- 🔐 **Authentication** - Secure user login system
- 🚀 **Performance** - Optimized images, lazy loading
- ♿ **Accessibility** - WCAG compliant, keyboard navigation

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **React Router** - Navigation
- **Shadcn/ui** - Component library

### Backend
- **Supabase** - Backend as a Service
- **Hono** - Web server framework (Deno)
- **PostgreSQL** - Database (via Supabase)
- **Edge Functions** - Serverless API

### Libraries & Tools
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Recharts** - Data visualization

## 📂 Project Structure

```
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn components
│   └── ...             # Custom components
├── pages/              # Page components
│   ├── Homepage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── DashboardPage.tsx
│   ├── AdminProductManagement.tsx
│   └── ...
├── context/            # React contexts
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── data/               # Sample data
│   └── products.ts     # 75+ sample products
├── supabase/
│   └── functions/
│       └── server/     # Backend API
│           ├── index.tsx       # API routes
│           └── kv_store.tsx    # Database utils
├── utils/
│   ├── api.ts          # API client
│   └── supabase/       # Supabase config
├── types/              # TypeScript types
└── styles/             # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Deno
- Supabase account (provided)

### Installation

1. **Clone or access the project**
2. **Install dependencies** (if needed - they're auto-installed in Figma Make)

### Admin Access

**Admin Email:** aadityadamdhar342006@gmail.com

Admin users get access to:
- Product Management (`/admin/products`)
- Analytics Dashboard (`/admin/analytics`)

## 📦 Managing 500+ Products

### Method 1: CSV Import (Recommended)

1. **Login as admin**
2. Go to **Dashboard → Manage Products**
3. Click **"Download Sample CSV"**
4. Fill in your product data following this format:

```csv
id,name,category,price,originalPrice,stock,brand,description,image,crops
p1,Monocil 250ml,pesticide,385,450,180,Bayer,Description,https://...,Cotton;Wheat
f1,NPK 18:18:10,fertilizer,1380,1500,320,IFFCO,Description,https://...,Cotton;Rice
s1,Cotton Seeds,seed,1200,1350,250,Mahyco,Description,https://...,Cotton
```

5. Click **"Import CSV"** and select your file
6. Products will be imported automatically

**CSV Requirements:**
- **Required columns:** id, name, category, price
- **Category values:** `pesticide`, `fertilizer`, or `seed`
- **Crops:** Separate multiple crops with semicolons (e.g., "Cotton;Wheat;Rice")
- **Images:** Use URLs (Unsplash or your CDN)

**See:** `/guidelines/CSV_Import_Guide.md` for detailed instructions

### Method 2: Sample Data Import

1. Go to **Admin → Manage Products**
2. Click **"Import Sample Data"**
3. This imports 75+ pre-configured agricultural products
4. Edit or delete as needed

### Method 3: Manual Entry

1. Click **"Add Product"** button
2. Fill in product details
3. Submit to add single product

## 🔌 Backend API

### Base URL
```
https://nfiyrollavuanipymmxq.supabase.co/functions/v1/make-server-dfeaf20d
```

### API Endpoints

#### Products

**Get all products**
```
GET /products
Query params: category, search, brand, crop, limit, offset
```

**Get single product**
```
GET /products/:id
```

**Create product** (Admin)
```
POST /products
Body: { id, name, category, price, ... }
```

**Update product** (Admin)
```
PUT /products/:id
Body: { name, price, stock, ... }
```

**Delete product** (Admin)
```
DELETE /products/:id
```

**Bulk import** (Admin)
```
POST /products/bulk-import
Body: { products: [...] }
```

**Product statistics** (Admin)
```
GET /products/stats/summary
```

#### Orders

**Create order**
```
POST /orders
Body: { items, customerInfo, totalAmount, paymentMethod }
```

**Get user orders**
```
GET /orders/user/:email
```

**Get single order**
```
GET /orders/:id
```

**Update order status** (Admin)
```
PUT /orders/:id/status
Body: { status: "pending" | "processing" | "shipped" | "delivered" }
```

## 📊 Product Categories

### Pesticides (100-200 products)
- **Insecticides:** Monocrotophos, Chlorpyrifos, Imidacloprid, Thiamethoxam
- **Fungicides:** Mancozeb, Propiconazole, Carbendazim, Hexaconazole
- **Herbicides:** Glyphosate, 2,4-D, Paraquat, Atrazine
- **Bio-pesticides:** Neem oil, Bt products

### Fertilizers (150-250 products)
- **NPK Complexes:** 10:26:26, 19:19:19, 12:32:16, 18:18:10
- **Straight Fertilizers:** Urea, DAP, MOP, SSP
- **Micronutrients:** Zinc Sulphate, Boron, Iron, Manganese
- **Organic:** Vermicompost, FYM, Humic acid

### Seeds (50-100 products)
- **Cotton:** Hybrid varieties, Bt cotton
- **Wheat:** Different varieties for different regions
- **Vegetables:** Tomato, Chili, Brinjal, Okra
- **Oilseeds:** Soybean, Sunflower, Groundnut

## 🎨 Design System

### Colors
- **Primary Green:** #16a34a (Green-600)
- **Secondary Yellow:** #eab308 (Yellow-500)
- **Accent Red:** #dc2626 (Red-600)
- **Neutral Gray:** Various shades

### Typography
- System font stack (optimized for performance)
- Responsive text sizes
- Accessible contrast ratios

### Components
All components from Shadcn/ui:
- Buttons, Cards, Dialogs, Forms, Tables, etc.
- Fully accessible and customizable

## 🔐 Authentication

### User Flow
1. **Signup** → Enter name, email, phone, password
2. **Login** → Email + password or phone OTP (future)
3. **Session** → Stored in localStorage (persistent)
4. **Logout** → Clear session and redirect

### Admin Access
- Login with admin email to access admin features
- Admin routes: `/admin/products`, `/admin/analytics`

## 🛒 Shopping Flow

1. **Browse** → Filter by category, crop, brand
2. **Product Detail** → Select variant (size), view details
3. **Add to Cart** → Animated fly-to-cart effect
4. **Cart** → Review items, adjust quantities
5. **Checkout** → Enter shipping info, select payment
6. **Order Placed** → Get order ID, track status
7. **Dashboard** → View order history and status

## 📱 Pages Overview

### Customer Pages
- **Homepage** (`/`) - Hero, categories, featured products, testimonials
- **Products** (`/products`) - Product grid with filters
- **Product Detail** (`/product/:id`) - Full product info, variants, reviews
- **Cart** (`/cart`) - Shopping cart review
- **Checkout** (`/checkout`) - Order placement
- **Dashboard** (`/dashboard`) - User profile, order history
- **About** (`/about`) - About Mohan Damdhar and store
- **Contact** (`/contact`) - Contact form, store info, map

### Admin Pages
- **Product Management** (`/admin/products`) - CRUD operations, CSV import
- **Analytics** (`/admin/analytics`) - Sales dashboard (future)

### Legal Pages
- **Privacy Policy** (`/privacy-policy`)
- **Terms & Conditions** (`/terms-conditions`)
- **Shipping Policy** (`/shipping-policy`)
- **FAQ** (`/faq`)

## 🗺️ Store Location

**Address:** Shree Krushi Kendra (update with actual address)  
**Map:** Embedded Google Maps with directions link  
**Link:** https://maps.app.goo.gl/DR8JcmZQ25FHtVAMA

## 🎯 SEO & Performance

### Optimizations
- Lazy loading images
- Code splitting
- Responsive images
- Semantic HTML
- Meta tags for social sharing

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus states
- Screen reader support

## 🔧 Troubleshooting

### Browse Category Buttons Not Working
**Fixed!** The category filtering now properly resets when switching between categories.

### Products Not Loading
1. Check if backend is connected (look for "Using sample data" message)
2. Click "Refresh" button on products page
3. If backend fails, app automatically falls back to sample data

### CSV Import Fails
1. Check CSV format (required columns: id, name, category, price)
2. Ensure category values are exactly: `pesticide`, `fertilizer`, or `seed`
3. Remove special characters from data
4. See `/guidelines/CSV_Import_Guide.md`

### Orders Not Saving
1. Check if user is logged in
2. Verify backend connection
3. Orders save to both backend and localStorage

## 📞 Support

**Email:** aadityadamdhar342006@gmail.com  
**Phone:** +91 7219437160  
**WhatsApp:** +91 7219437160  
**Hours:** Mon-Sun, 7:30 AM - 9:00 PM

## 🚀 Future Enhancements

- [ ] Real-time order tracking
- [ ] WhatsApp order notifications
- [ ] OTP-based login
- [ ] Razorpay payment integration
- [ ] Advanced analytics dashboard
- [ ] Product recommendations
- [ ] Customer reviews & ratings
- [ ] Wishlist functionality
- [ ] Multi-language support (Marathi)
- [ ] Mobile app

## 📄 License

Proprietary - © 2025 Shree Krushi Kendra

## 🙏 Acknowledgments

- **Owner:** Mohan Damdhar
- **Developer:** (Your name/company)
- **Product Images:** Unsplash
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React

---

**Last Updated:** November 3, 2025  
**Version:** 2.0 - Backend Integrated

For detailed CSV import instructions, see `/guidelines/CSV_Import_Guide.md`
