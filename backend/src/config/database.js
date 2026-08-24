const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
