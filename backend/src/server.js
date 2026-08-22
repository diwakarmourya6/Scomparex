require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Verify database connectivity before accepting requests
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error('⚠️  Server starting WITHOUT database connectivity.');
    console.error('   Health endpoint will report db: false.');
    console.error('   Make sure PostgreSQL is running and .env credentials are correct.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 CompareX API server running on http://localhost:${PORT}`);
    console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });
}

startServer();
