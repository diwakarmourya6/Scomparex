const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
  keepAlive: true
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

/**
 * Test the database connection.
 * @returns {Promise<boolean>}
 */
async function testConnection() {
  try {
    console.log('Testing DB connection...');
    console.log('DATABASE_URL starts with:', connectionString ? connectionString.substring(0, 15) : 'UNDEFINED');
    
    if (!connectionString) {
      console.error('DATABASE_URL is missing in environment!');
      return false;
    }

    // Simple query to verify connection
    await prisma.brand.count();
    console.log(`✅ Prisma PostgreSQL connected successfully.`);
    return true;
  } catch (err) {
    console.error('❌ Prisma PostgreSQL connection failed:', err);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    if (err.clientVersion) console.error('Prisma version:', err.clientVersion);
    return false;
  }
}

module.exports = { prisma, testConnection };
