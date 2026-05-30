# Ozone Traders Migration Guide

## Database Migration Steps

### 1. Backup Current Database
```bash
pg_dump -U postgres -d ozone-traders > backup_en3_fashions.sql
```

### 2. Run Prisma Migration
```bash
cd backend
npx prisma migrate dev --name convert_to_ozone_traders
```

### 3. Update Existing Data (Optional)

If you want to preserve some data, run these SQL commands:

```sql
-- Remove coupon-related data
DELETE FROM "CouponUsage";
DELETE FROM "Coupon";

-- Remove brand and subcategory data
DELETE FROM "Brand";
DELETE FROM "SubCategory";

-- Remove size chart data
DELETE FROM "SizeChart";

-- Update products to remove fashion-specific fields
-- Note: You'll need to manually update products with new spice-related data
```

### 4. Seed Initial Spice Categories

Create initial categories for spice trading:

```sql
-- Insert spice categories
INSERT INTO "Category" (name, description) VALUES
('Whole Spices', 'Premium quality whole spices'),
('Ground Spices', 'Freshly ground spice powders'),
('Dry Fruits', 'Premium dry fruits and nuts'),
('Herbs', 'Fresh and dried herbs'),
('Agricultural Products', 'Farm fresh agricultural products'),
('Wholesale Items', 'Bulk wholesale spice products');
```

### 5. Reset Product Data

Since the product structure has changed significantly, you may want to:
- Export existing product names and images
- Clear product table
- Re-add products with new spice-specific fields

```sql
-- Backup product names
SELECT id, name, "categoryId" FROM "Product";

-- Clear products (if needed)
DELETE FROM "OrderItem";
DELETE FROM "CartItem";
DELETE FROM "WishlistItem";
DELETE FROM "Product";
```

## Post-Migration Checklist

- [ ] Database schema updated successfully
- [ ] Backend modules removed (brand, subcategory, coupon, size-chart)
- [ ] Frontend updated with Ozone Traders branding
- [ ] Test product creation with new weight options
- [ ] Test cart and order flow
- [ ] Update admin panel UI
- [ ] Test WhatsApp integration
- [ ] Update SEO metadata
- [ ] Replace all images and logos
- [ ] Test wholesale pricing features

## Important Notes

1. **Product Structure Changed**: Products now use `weightOptions` JSON array instead of color/size variants
2. **No More Coupons**: Coupon system completely removed
3. **No Brands/SubCategories**: Simplified category structure
4. **Weight-Based Pricing**: Each product can have multiple weight options with different prices
5. **Wholesale Support**: Added wholesale pricing fields

## Example Product Data Structure

```json
{
  "name": "Premium Black Pepper",
  "description": "High-quality black pepper from Kerala",
  "categoryId": 1,
  "image": "pepper.jpg",
  "weightOptions": [
    {
      "weight": "100g",
      "price": "80",
      "wholesalePrice": "70",
      "stock": 500
    },
    {
      "weight": "250g",
      "price": "190",
      "wholesalePrice": "170",
      "stock": 300
    },
    {
      "weight": "500g",
      "price": "360",
      "wholesalePrice": "330",
      "stock": 200
    },
    {
      "weight": "1kg",
      "price": "700",
      "wholesalePrice": "650",
      "stock": 150
    }
  ],
  "basePrice": "80",
  "wholesalePrice": "70",
  "mrp": "100",
  "hsnCode": "09041100",
  "originLocation": "Kerala, India",
  "qualityGrade": "Premium Grade A",
  "packagingType": "Food-grade sealed pouch",
  "tags": ["pepper", "spices", "kerala"],
  "status": "active",
  "featured": true,
  "inStock": true
}
```
