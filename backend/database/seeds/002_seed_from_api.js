/**
 * Seed database with real-looking smartphone data from Real-Time Amazon Data API via RapidAPI.
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { pool } = require('../../src/config/database');

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
  const client = await pool.connect();

  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      throw new Error("Missing RAPIDAPI_KEY in .env file!");
    }

    console.log(`\n🌐 Fetching live Amazon data from: ${API_HOST}`);
    
    // 1. Fetch data from the API
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': API_HOST
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API returned status: ${response.status} - ${errText}`);
    }
    
    const data = await response.json();
    
    // Real-Time Amazon Data usually returns results in data.products
    const products = (data.data && data.data.products) ? data.data.products : (data.products || []);
    
    if (products.length === 0) {
      console.log('No products found in the API response. Check if you have sufficient API quota.');
      return;
    }
    
    console.log(`✅ Received ${products.length} Amazon products.`);
    
    await client.query('BEGIN');

    // Clean existing data
    console.log('🧹 Clearing old data...');
    await client.query('DELETE FROM smartphone_specs');
    await client.query('DELETE FROM smartphones');
    await client.query('DELETE FROM brands');

    // 2. Extract and insert unique brands
    console.log('🏢 Inserting brands...');
    
    // Assign a brand to each product based on its title
    products.forEach(p => { p.extractedBrand = extractBrand(p.product_title || p.title || 'Unknown'); });
    const uniqueBrands = [...new Set(products.map(p => p.extractedBrand).filter(Boolean))];
    const brandMap = {}; 
    
    for (const brandName of uniqueBrands) {
      const slug = generateSlug(brandName);
      const res = await client.query(
        `INSERT INTO brands (name, slug, country) VALUES ($1, $2, $3) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [brandName, slug, 'Global']
      );
      brandMap[brandName] = res.rows[0].id;
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
        const phoneRes = await client.query(
          `INSERT INTO smartphones (
            brand_id, slug, name, model, price, original_price,
            rating, review_count, image, gallery_images,
            description, short_description, highlights,
            availability, score_overall
          ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10,
            $11, $12, $13,
            $14, $15
          ) RETURNING id`,
          [
            brandId, 
            phoneSlug, 
            title.substring(0, 190), // truncate if too long
            title.substring(0, 190), 
            price, 
            originalPrice, 
            rating, 
            reviewCount, 
            image, 
            [image].filter(Boolean),
            title, 
            title.substring(0, 100),
            ['Amazon Best Seller'],
            product.is_prime ? 'In Stock (Prime)' : 'In Stock',
            Math.round(rating * 20) 
          ]
        );
        
        const phoneId = phoneRes.rows[0].id;
        
        await client.query(
          `INSERT INTO smartphone_specs (
            smartphone_id, processor, ram, storage, display_size, battery_capacity
          ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            phoneId,
            'Octa-core Processor', 
            8, 
            128, 
            '6.5 inches',
            5000
          ]
        );
        insertedCount++;
      } catch (err) {
        console.log(`Skipping product due to error: ${err.message}`);
      }
    }

    await client.query('COMMIT');
    console.log(`\n🎉 Success! Inserted ${uniqueBrands.length} brands and ${insertedCount} Amazon smartphones.`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n❌ Seeding failed:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedFromAPI();
