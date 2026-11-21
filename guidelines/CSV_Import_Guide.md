# Product CSV Import Guide for Shree Krushi Kendra

## Overview
This guide explains how to import 500+ products into your agricultural e-commerce website using CSV files.

## CSV Format Requirements

### Required Columns
Your CSV file must include these columns in the first row (header):

1. **id** - Unique product identifier (e.g., p1, p2, f1, f2, s1, s2)
2. **name** - Product name (e.g., "Monocil (Monocrotophos 36% SL)")
3. **category** - Must be one of: `pesticide`, `fertilizer`, or `seed`
4. **price** - Selling price in INR (numbers only, no ₹ symbol)

### Optional Columns
5. **originalPrice** - Original price before discount (for showing discounts)
6. **stock** - Available quantity in stock
7. **brand** - Manufacturer/brand name (e.g., "Bayer", "Syngenta", "IFFCO")
8. **description** - Short product description
9. **fullDescription** - Detailed product information
10. **image** - Product image URL
11. **crops** - Applicable crops, separated by semicolons (e.g., "Cotton;Wheat;Rice")
12. **usage** - How to use the product
13. **dosage** - Recommended dosage
14. **benefits** - Product benefits, separated by semicolons

## Sample CSV Format

```csv
id,name,category,price,originalPrice,stock,brand,description,image,crops
p1,Monocil 250ml,pesticide,385,450,180,Rallis India,Broad spectrum insecticide,https://images.unsplash.com/photo-1621331462282-0c890b7c933b,Cotton;Wheat;Rice
f1,NPK 18:18:10 - 50kg,fertilizer,1380,1500,320,Coromandel,Complete fertilizer with micronutrients,https://images.unsplash.com/photo-1597066371673-2088a5c19802,Cotton;Rice;Wheat;Soybean
s1,Cotton Seeds Hybrid - 5kg,seed,1200,1350,250,Mahyco,High yielding cotton hybrid seeds,https://images.unsplash.com/photo-1560493676-04071c5f467b,Cotton
```

## Step-by-Step Import Process

### Option 1: Using the Admin Dashboard

1. **Login** to your account (use admin email: aadityadamdhar342006@gmail.com)
2. Navigate to **Dashboard** → **Manage Products**
3. Click **"Download Sample CSV"** to get a template file
4. Fill in your product data following the sample format
5. Click **"Import CSV"** button
6. Select your CSV file
7. Wait for the import to complete
8. You'll see a success message showing how many products were imported

### Option 2: Quick Sample Data Import

1. Go to **Admin → Manage Products**
2. Click **"Import Sample Data"** button
3. This will import 75+ pre-configured agricultural products instantly
4. You can then edit or delete products as needed

## Best Practices for 500+ Products

### 1. Organize Your Data
- Use Excel or Google Sheets to prepare your data
- Keep one sheet per category (pesticides, fertilizers, seeds)
- Use consistent naming conventions

### 2. Product IDs
- Use prefixes: `p` for pesticides, `f` for fertilizers, `s` for seeds
- Example: `p001`, `p002`, `f001`, `f002`, `s001`, `s002`

### 3. Images
- Use Unsplash URLs for stock images
- Or upload images to a CDN and use those URLs
- Recommended image size: 800x800px minimum
- Format: JPEG or PNG

### 4. Categories
- **pesticide** - For insecticides, fungicides, herbicides, etc.
- **fertilizer** - For NPK, Urea, DAP, organic manure, etc.
- **seed** - For all types of seeds

### 5. Crops Field
- Use semicolons to separate multiple crops
- Example: `Cotton;Wheat;Rice;Soybean`
- Common crops: Cotton, Wheat, Rice, Soybean, Sugarcane, Maize, Vegetables

### 6. Pricing
- Enter prices without currency symbols (just numbers)
- Use originalPrice for discount display
- Example: price=385, originalPrice=450 (shows 14% discount)

### 7. Stock Management
- Keep stock numbers realistic
- Update regularly to reflect actual inventory
- Low stock alerts trigger at < 50 units

## Sample Product Categories

### Pesticides (100-200 products)
- Insecticides (Monocrotophos, Chlorpyrifos, Imidacloprid)
- Fungicides (Mancozeb, Propiconazole, Carbendazim)
- Herbicides (Glyphosate, 2,4-D, Paraquat)
- Bio-pesticides (Neem-based, Bt products)

### Fertilizers (150-250 products)
- NPK Complexes (10:26:26, 19:19:19, 12:32:16)
- Straight Fertilizers (Urea, DAP, MOP, SSP)
- Micronutrients (Zinc Sulphate, Boron, Iron)
- Organic Fertilizers (Vermicompost, FYM, Compost)

### Seeds (50-100 products)
- Cotton Seeds (Hybrid, Bt varieties)
- Wheat Seeds (Different varieties)
- Vegetable Seeds (Tomato, Chili, Brinjal)
- Oilseed (Soybean, Sunflower, Groundnut)

## Troubleshooting

### Common Errors

**Error: "No valid products found in CSV"**
- Check that your CSV has the required columns: id, name, category, price
- Ensure category values are exactly: pesticide, fertilizer, or seed
- Make sure prices are numeric (no text or symbols)

**Error: "Failed to parse CSV file"**
- Open CSV in a text editor to check for special characters
- Ensure commas are used as delimiters
- Check for extra commas or missing values

**Products not showing up**
- Verify products were imported (check success message)
- Click "Refresh" button to reload the product list
- Check filter settings (category, search)

### Data Validation Tips

1. **Test with small batch first** - Import 10-20 products to verify format
2. **Check data types** - Numbers for price/stock, text for names
3. **Verify required fields** - Every product needs id, name, category, price
4. **Remove special characters** - Avoid quotes, extra commas in descriptions

## Advanced Features

### Bulk Updates
- Export current products to CSV
- Make changes in Excel/Sheets
- Re-import (existing products will be updated)

### Managing Large Catalogs
- Import in batches of 100-200 products
- Use consistent naming for easy searching
- Regularly update stock levels
- Remove discontinued products

### Image Management
- Consider using a CDN for faster loading
- Compress images before upload
- Use consistent image dimensions
- Add descriptive alt text for SEO

## API Access (For Developers)

Products can also be managed via API:

```javascript
// Bulk import products
POST /make-server-dfeaf20d/products/bulk-import
{
  "products": [
    { "id": "p1", "name": "...", "category": "pesticide", "price": 385 },
    // ... more products
  ]
}
```

## Support

For assistance with CSV imports:
- Email: aadityadamdhar342006@gmail.com
- Phone: +91 7219437160
- Visit: Shree Krushi Kendra

## Quick Reference

| Field | Type | Required | Example |
|-------|------|----------|---------|
| id | Text | Yes | p1, f1, s1 |
| name | Text | Yes | Monocil 250ml |
| category | Text | Yes | pesticide |
| price | Number | Yes | 385 |
| originalPrice | Number | No | 450 |
| stock | Number | No | 180 |
| brand | Text | No | Bayer |
| description | Text | No | Broad spectrum... |
| image | URL | No | https://... |
| crops | Text | No | Cotton;Wheat |

---

**Last Updated:** November 3, 2025  
**Version:** 1.0
