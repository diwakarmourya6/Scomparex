const { pool } = require('../config/database');

/**
 * GET /api/health
 * Returns server status and database connectivity.
 */
async function getHealth(_req, res) {
  let dbStatus = false;
  let dbTime = null;
  let brandCount = null;
  let smartphoneCount = null;

  try {
    const timeResult = await pool.query('SELECT NOW() AS server_time');
    dbTime = timeResult.rows[0].server_time;
    dbStatus = true;

    // Also report record counts so you know the seed ran
    const brandsResult = await pool.query('SELECT COUNT(*) FROM brands');
    const phonesResult = await pool.query('SELECT COUNT(*) FROM smartphones');
    brandCount = parseInt(brandsResult.rows[0].count, 10);
    smartphoneCount = parseInt(phonesResult.rows[0].count, 10);
  } catch (err) {
    // DB is down or tables don't exist yet — that's fine, report it
    console.error('Health check DB probe failed:', err.message);
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
      },
      database: {
        connected: dbStatus,
        serverTime: dbTime,
        brands: brandCount,
        smartphones: smartphoneCount,
      },
    },
  });
}

module.exports = { getHealth };
