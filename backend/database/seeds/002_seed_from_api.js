/**
 * Seed database with real-looking smartphone data from Real-Time Amazon Data API via RapidAPI.
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { prisma } = require('../../src/config/database');

const API_HOST = 'real-time-amazon-data.p.rapidapi.com';
const API_URL = `https://${API_HOST}/search?query=smartphones&page=1&country=IN`;

// Utility to generate a slug from text
function generateSlug(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '')
    .substring(0, 100); // Keep slugs reasonably short
}

// Rough utility to extract a brand name from an Amazon product title
function extractBrand(title) {
  const commonBrands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Redmi', 'Realme', 'vivo', 'OPPO', 'Motorola', 'Poco', 'iQOO', 'Nothing', 'Google'];
  for (const brand of commonBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return 'Other'; 
}

async function seedFromAPI() {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      throw new Error("Missing RAPIDAPI_KEY in .env file!");
    }

    console.log(`\n🌐 Fetching live Amazon data from: ${API_HOST} per brand`);
    
    let allProducts = [];
    
    const targetBrands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Redmi', 'Realme', 'vivo', 'OPPO', 'Motorola', 'Poco', 'iQOO'];
    
    for (const brand of targetBrands) {
      console.log(`Fetching top 10 smartphones for ${brand}...`);
      
      try {
        const response = await fetch(`https://${API_HOST}/search?query=${brand} smartphones&page=1&country=IN`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': API_HOST
          }
        });

        if (!response.ok) {
          console.warn(`⚠️ API returned status: ${response.status} for ${brand}. Skipping.`);
          continue;
        }
        
        const data = await response.json();
        const products = (data.data && data.data.products) ? data.data.products : (data.products || []);
        
        if (products.length === 0) {
          console.log(`  No products found for ${brand}.`);
          continue;
        }
        
        // Filter out non-smartphones (basic check) and get up to 10
        const validProducts = products.filter(p => {
          const title = (p.product_title || p.title || '').toLowerCase();
          return title.includes(brand.toLowerCase());
        }).slice(0, 10);
        
        console.log(`  Found ${validProducts.length} smartphones for ${brand}.`);
        allProducts = allProducts.concat(validProducts);
        
      } catch (err) {
        console.warn(`⚠️ Error fetching ${brand}:`, err.message);
      }
    }
    
    if (allProducts.length === 0) {
      console.log('No products found in the API responses. Check if you have sufficient API quota.');
      return;
    }
    
    console.log(`✅ Received ${allProducts.length} total Amazon products across all brands.`);
    
    // Use all fetched products
    const products = allProducts;
    
    // Clean existing data
    console.log('🧹 Clearing old data...');
    await prisma.smartphoneSpec.deleteMany({});
    await prisma.smartphone.deleteMany({});
    await prisma.brand.deleteMany({});

    // 2. Extract and insert unique brands
    console.log('🏢 Inserting brands...');
    
    // Assign a brand to each product based on its title
    products.forEach(p => { p.extractedBrand = extractBrand(p.product_title || p.title || 'Unknown'); });
    const uniqueBrands = [...new Set(products.map(p => p.extractedBrand).filter(Boolean))];
    const brandMap = {}; 
    
    for (const brandName of uniqueBrands) {
      const slug = generateSlug(brandName);
      const brand = await prisma.brand.upsert({
        where: { name: brandName },
        update: { name: brandName },
        create: { name: brandName, slug, country: 'Global' },
      });
      brandMap[brandName] = brand.id;
    }

    // 3. Insert Smartphones and Specs
    console.log('📱 Inserting smartphones and specifications...');
    let insertedCount = 0;
    
    for (const product of products) {
      const brandId = brandMap[product.extractedBrand];
      if (!brandId) continue; 
      
      const title = product.product_title || product.title || 'Unknown Phone';
      const phoneSlug = generateSlug(title) + '-' + Math.floor(Math.random() * 1000); // Ensure unique slug
      
      // Parse pricing (removing currency symbols)
      let currentPriceStr = (product.product_price || '0').replace(/[^0-9.]/g, '');
      let originalPriceStr = (product.product_original_price || currentPriceStr).replace(/[^0-9.]/g, '');
      
      const price = parseInt(currentPriceStr) || 15000;
      const originalPrice = parseInt(originalPriceStr) || price;
      
      const rating = parseFloat(product.product_star_rating || product.rating || '4.0');
      const reviewCount = parseInt(product.product_num_ratings || '0');
      const image = product.product_photo || product.thumbnail || null;
      
      try {
        const phone = await prisma.smartphone.create({
          data: {
            brandId, 
            slug: phoneSlug, 
            name: title.substring(0, 190), // truncate if too long
            model: title.substring(0, 190), 
            price, 
            originalPrice, 
            rating, 
            reviewCount, 
            image, 
            galleryImages: [image].filter(Boolean),
            description: title, 
            shortDescription: title.substring(0, 100),
            highlights: ['Amazon Best Seller'],
            availability: product.is_prime ? 'In Stock (Prime)' : 'In Stock',
            scoreOverall: Math.round(rating * 20),
            specs: {
              create: {
                processor: 'Octa-core Processor', 
                ram: 8, 
                storage: 128, 
                displaySize: '6.5 inches',
                batteryCapacity: 5000
              }
            }
          }
        });
        insertedCount++;
      } catch (err) {
        console.log(`Skipping product due to error: ${err.message}`);
      }
    }

    console.log(`\n🎉 Success! Inserted ${uniqueBrands.length} brands and ${insertedCount} Amazon smartphones.`);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedFromAPI();
