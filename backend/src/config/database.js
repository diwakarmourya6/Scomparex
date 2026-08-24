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
    // Simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log(`✅ Prisma PostgreSQL connected successfully.`);
    return true;
  } catch (err) {
    console.error('❌ Prisma PostgreSQL connection failed:', err.message);
    return false;
  }
}

module.exports = { prisma, testConnection };
