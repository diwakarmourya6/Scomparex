const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/healthRoutes');
const brandRoutes = require('./routes/brandRoutes');
const smartphoneRoutes = require('./routes/smartphoneRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();

// ---------------------------------------------------------------------------
// Security middleware
// ---------------------------------------------------------------------------
app.use(helmet());

// ---------------------------------------------------------------------------
// CORS — allow the Vite frontend during development
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow any origin during development to solve local IP access issues
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Body parsers
// ---------------------------------------------------------------------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Request logging (lightweight, dev-friendly)
// ---------------------------------------------------------------------------
app.use((req, _res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

const path = require('path');

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to CompareX API', status: 'active' });
});

app.use('/api', healthRoutes);
app.use('/api/users', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/smartphones', smartphoneRoutes);

// ---------------------------------------------------------------------------
// Static Frontend Serving
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// ---------------------------------------------------------------------------
// Error handling & SPA Fallback
// ---------------------------------------------------------------------------
// SPA Fallback: send index.html for any unhandled non-API routes
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next(); // Let the API notFoundHandler handle it
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
