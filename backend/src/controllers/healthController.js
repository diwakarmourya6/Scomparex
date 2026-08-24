const { prisma } = require('../config/database');

/**
 * GET /api/health
 * Returns server status and database connectivity.
 */
async function getHealth(_req, res) {
  let dbStatus = false;
  let dbError = null;
  let brandCount = null;
  let smartphoneCount = null;

  try {
    // Prisma 7 driver adapters do not support $queryRaw — use ORM queries instead
    brandCount = await prisma.brand.count();
    smartphoneCount = await prisma.smartphone.count();
    dbStatus = true;
  } catch (err) {
    // DB is down or tables don't exist yet — report it
    dbError = err.message;
    console.error('Health check DB probe failed:', err.message);
    console.error('DATABASE_URL set:', !!process.env.DATABASE_URL);
  }

  const uptime = process.uptime();

  res.status(dbStatus ? 200 : 503).json({
    success: dbStatus,
    message: dbStatus ? 'CompareX API is healthy' : 'CompareX API is up, but database is unreachable',
    data: {
      server: {
        status: 'running',
        environment: process.env.NODE_ENV || 'development',
        uptime: `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`,
        timestamp: new Date().toISOString(),
        dbUrlSet: !!process.env.DATABASE_URL,
      },
      database: {
        connected: dbStatus,
        error: dbError,
        brands: brandCount,
        smartphones: smartphoneCount,
      },
    },
  });
}

module.exports = { getHealth };
