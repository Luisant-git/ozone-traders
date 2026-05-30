import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌾 Seeding Ozone Traders database...');

  // Create Admin User
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ozonetraders.com' },
    update: {},
    create: {
      email: 'admin@ozonetraders.com',
      name: 'Ozone Admin',
      password: hashedPassword,
      isActive: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Categories
  const categories = [
    {
      name: 'Whole Spices',
      description: 'Premium quality whole spices sourced directly from farmers',
      image: null,
    },
    {
      name: 'Ground Spices',
      description: 'Freshly ground spice powders with authentic flavors',
      image: null,
    },
    {
      name: 'Dry Fruits',
      description: 'Premium quality dry fruits and nuts',
      image: null,
    },
    {
      name: 'Herbs',
      description: 'Fresh and dried herbs for cooking and wellness',
      image: null,
    },
    {
      name: 'Agricultural Products',
      description: 'Farm fresh agricultural products',
      image: null,
    },
    {
      name: 'Wholesale Items',
      description: 'Bulk wholesale spice products at competitive prices',
      image: null,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
  console.log('✅ Categories created');

  // Get category IDs
  const wholeSpicesCategory = await prisma.category.findUnique({
    where: { name: 'Whole Spices' },
  });
  const groundSpicesCategory = await prisma.category.findUnique({
    where: { name: 'Ground Spices' },
  });
  const dryFruitsCategory = await prisma.category.findUnique({
    where: { name: 'Dry Fruits' },
  });

  if (!wholeSpicesCategory || !groundSpicesCategory || !dryFruitsCategory) {
    throw new Error('Required categories not found');
  }

  // Create Sample Products
  const sampleProducts = [
    {
      name: 'Premium Black Pepper',
      description: 'High-quality black pepper from Kerala with rich aroma and bold flavor. Perfect for all types of cooking.',
      categoryId: wholeSpicesCategory.id,
      image: null,
      weightOptions: [
        { weight: '100g', price: '80', wholesalePrice: '70', stock: 500 },
        { weight: '250g', price: '190', wholesalePrice: '170', stock: 300 },
        { weight: '500g', price: '360', wholesalePrice: '330', stock: 200 },
        { weight: '1kg', price: '700', wholesalePrice: '650', stock: 150 },
        { weight: '5kg', price: '3300', wholesalePrice: '3000', stock: 50 },
      ],
      basePrice: '80',
      wholesalePrice: '70',
      mrp: '100',
      hsnCode: '09041100',
      originLocation: 'Kerala, India',
      qualityGrade: 'Premium Grade A',
      packagingType: 'Food-grade sealed pouch',
      tags: ['pepper', 'spices', 'kerala', 'whole-spices'],
      gallery: [],
      status: 'active',
      featured: true,
      inStock: true,
    },
    {
      name: 'Turmeric Powder',
      description: 'Pure turmeric powder with high curcumin content. Sourced from organic farms in Tamil Nadu.',
      categoryId: groundSpicesCategory.id,
      image: null,
      weightOptions: [
        { weight: '100g', price: '50', wholesalePrice: '45', stock: 600 },
        { weight: '250g', price: '120', wholesalePrice: '110', stock: 400 },
        { weight: '500g', price: '230', wholesalePrice: '210', stock: 300 },
        { weight: '1kg', price: '450', wholesalePrice: '420', stock: 200 },
        { weight: '5kg', price: '2100', wholesalePrice: '1950', stock: 80 },
      ],
      basePrice: '50',
      wholesalePrice: '45',
      mrp: '65',
      hsnCode: '09103010',
      originLocation: 'Tamil Nadu, India',
      qualityGrade: 'Premium Grade A',
      packagingType: 'Airtight container',
      tags: ['turmeric', 'powder', 'organic', 'ground-spices'],
      gallery: [],
      status: 'active',
      featured: true,
      inStock: true,
    },
    {
      name: 'Green Cardamom',
      description: 'Premium quality green cardamom with intense aroma. Ideal for both sweet and savory dishes.',
      categoryId: wholeSpicesCategory.id,
      image: null,
      weightOptions: [
        { weight: '50g', price: '180', wholesalePrice: '165', stock: 300 },
        { weight: '100g', price: '350', wholesalePrice: '320', stock: 200 },
        { weight: '250g', price: '850', wholesalePrice: '780', stock: 150 },
        { weight: '500g', price: '1650', wholesalePrice: '1500', stock: 100 },
      ],
      basePrice: '180',
      wholesalePrice: '165',
      mrp: '200',
      hsnCode: '09083100',
      originLocation: 'Kerala, India',
      qualityGrade: 'Premium Grade A',
      packagingType: 'Vacuum sealed pack',
      tags: ['cardamom', 'elaichi', 'spices', 'whole-spices'],
      gallery: [],
      status: 'active',
      featured: true,
      inStock: true,
    },
    {
      name: 'Red Chilli Powder',
      description: 'Vibrant red chilli powder with perfect heat level. Made from sun-dried red chillies.',
      categoryId: groundSpicesCategory.id,
      image: null,
      weightOptions: [
        { weight: '100g', price: '60', wholesalePrice: '55', stock: 500 },
        { weight: '250g', price: '140', wholesalePrice: '130', stock: 350 },
        { weight: '500g', price: '270', wholesalePrice: '250', stock: 250 },
        { weight: '1kg', price: '520', wholesalePrice: '480', stock: 180 },
        { weight: '5kg', price: '2400', wholesalePrice: '2200', stock: 70 },
      ],
      basePrice: '60',
      wholesalePrice: '55',
      mrp: '75',
      hsnCode: '09042110',
      originLocation: 'Andhra Pradesh, India',
      qualityGrade: 'Premium Grade A',
      packagingType: 'Moisture-proof pouch',
      tags: ['chilli', 'red-chilli', 'powder', 'ground-spices'],
      gallery: [],
      status: 'active',
      featured: true,
      inStock: true,
    },
    {
      name: 'Premium Cashew Nuts',
      description: 'Whole cashew nuts (W320) with creamy texture. Perfect for snacking and cooking.',
      categoryId: dryFruitsCategory.id,
      image: null,
      weightOptions: [
        { weight: '250g', price: '280', wholesalePrice: '260', stock: 200 },
        { weight: '500g', price: '550', wholesalePrice: '510', stock: 150 },
        { weight: '1kg', price: '1080', wholesalePrice: '1000', stock: 100 },
      ],
      basePrice: '280',
      wholesalePrice: '260',
      mrp: '320',
      hsnCode: '08013200',
      originLocation: 'Kerala, India',
      qualityGrade: 'W320 Grade',
      packagingType: 'Vacuum sealed pack',
      tags: ['cashew', 'dry-fruits', 'nuts'],
      gallery: [],
      status: 'active',
      featured: false,
      inStock: true,
    },
    {
      name: 'Coriander Powder',
      description: 'Aromatic coriander powder ground from premium quality coriander seeds.',
      categoryId: groundSpicesCategory.id,
      image: null,
      weightOptions: [
        { weight: '100g', price: '40', wholesalePrice: '36', stock: 550 },
        { weight: '250g', price: '95', wholesalePrice: '88', stock: 400 },
        { weight: '500g', price: '185', wholesalePrice: '170', stock: 300 },
        { weight: '1kg', price: '360', wholesalePrice: '335', stock: 220 },
      ],
      basePrice: '40',
      wholesalePrice: '36',
      mrp: '50',
      hsnCode: '09092100',
      originLocation: 'Rajasthan, India',
      qualityGrade: 'Premium Grade A',
      packagingType: 'Airtight pouch',
      tags: ['coriander', 'dhania', 'powder', 'ground-spices'],
      gallery: [],
      status: 'active',
      featured: false,
      inStock: true,
    },
  ];

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log('✅ Sample products created');

  // Create App Settings
  await prisma.appSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      codShippingCharge: 40,
      maintenanceMode: false,
      hiddenPages: [],
    },
  });
  console.log('✅ App settings created');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
