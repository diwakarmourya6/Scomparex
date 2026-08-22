/**
 * Migration: Create brands, smartphones, and smartphone_specs tables.
 *
 * Run:  npm run migrate
 *       (or: node database/migrations/001_create_tables.js)
 *
 * Schema mirrors the frontend Smartphone TypeScript interface so that
 * future API responses can be consumed without transformation.
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { pool } = require('../../src/config/database');

const CREATE_BRANDS = `
CREATE TABLE IF NOT EXISTS brands (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL UNIQUE,
  slug          VARCHAR(100)  NOT NULL UNIQUE,
  logo_url      TEXT,
  country       VARCHAR(100),
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

const CREATE_SMARTPHONES = `
CREATE TABLE IF NOT EXISTS smartphones (
  id                SERIAL PRIMARY KEY,
  brand_id          INTEGER       NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  slug              VARCHAR(200)  NOT NULL UNIQUE,
  name              VARCHAR(200)  NOT NULL,
  model             VARCHAR(200)  NOT NULL,
  price             INTEGER       NOT NULL,
  original_price    INTEGER,
  rating            NUMERIC(2,1)  NOT NULL DEFAULT 0,
  review_count      INTEGER       NOT NULL DEFAULT 0,
  image             TEXT,
  gallery_images    TEXT[],
  description       TEXT,
  short_description TEXT,
  highlights        TEXT[],
  availability      VARCHAR(50)   NOT NULL DEFAULT 'In Stock',
  release_date      VARCHAR(100),
  best_for          TEXT,

  -- Scores (1-100)
  score_overall     SMALLINT,
  score_performance SMALLINT,
  score_camera      SMALLINT,
  score_battery     SMALLINT,
  score_display     SMALLINT,
  score_value       SMALLINT,

  -- Pros / Cons
  pros              TEXT[],
  cons              TEXT[],

  -- Retail offers stored as JSONB array
  offers            JSONB,

  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_smartphones_brand_id ON smartphones(brand_id);
CREATE INDEX IF NOT EXISTS idx_smartphones_slug ON smartphones(slug);
CREATE INDEX IF NOT EXISTS idx_smartphones_price ON smartphones(price);
CREATE INDEX IF NOT EXISTS idx_smartphones_rating ON smartphones(rating DESC);
`;

const CREATE_SMARTPHONE_SPECS = `
CREATE TABLE IF NOT EXISTS smartphone_specs (
  id                  SERIAL PRIMARY KEY,
  smartphone_id       INTEGER NOT NULL UNIQUE REFERENCES smartphones(id) ON DELETE CASCADE,

  -- Display
  display_size        VARCHAR(50),
  display_size_number NUMERIC(4,2),
  display_type        VARCHAR(200),
  display_resolution  VARCHAR(200),
  refresh_rate        SMALLINT,
  peak_brightness     INTEGER,
  display_protection  VARCHAR(200),
  aspect_ratio        VARCHAR(20),
  hdr_support         VARCHAR(200),

  -- Performance
  processor           VARCHAR(200),
  cpu                 VARCHAR(300),
  gpu                 VARCHAR(200),
  ram                 SMALLINT,
  ram_type            VARCHAR(50),
  storage             SMALLINT,
  storage_type        VARCHAR(50),
  expandable_storage  BOOLEAN DEFAULT FALSE,
  antutu_score        INTEGER,

  -- Camera
  main_camera         VARCHAR(300),
  main_sensor_mp      SMALLINT,
  ultrawide           VARCHAR(300),
  telephoto           VARCHAR(300),
  telephoto_mp        SMALLINT,
  front_camera        VARCHAR(300),
  front_camera_mp     SMALLINT,
  video               VARCHAR(300),
  ois                 BOOLEAN DEFAULT FALSE,
  camera_features     TEXT[],

  -- Battery
  battery_capacity      INTEGER,
  charging_speed        SMALLINT,
  wireless_charging     BOOLEAN DEFAULT FALSE,
  wireless_charging_speed SMALLINT,
  reverse_charging      BOOLEAN DEFAULT FALSE,
  battery_life_hours    NUMERIC(4,1),

  -- Connectivity
  five_g              BOOLEAN DEFAULT FALSE,
  wifi                VARCHAR(100),
  bluetooth           VARCHAR(100),
  nfc                 BOOLEAN DEFAULT FALSE,
  usb                 VARCHAR(200),
  sim                 VARCHAR(200),

  -- Software
  os                  VARCHAR(50),
  os_version          VARCHAR(100),
  update_support_years SMALLINT,

  -- Physical
  weight              SMALLINT,
  dimensions          VARCHAR(100),
  ip_rating           VARCHAR(100),
  build_materials     VARCHAR(300),
  colors              TEXT[],

  created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_specs_smartphone_id ON smartphone_specs(smartphone_id);
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔨 Running migrations...\n');

    await client.query('BEGIN');

    console.log('  Creating table: brands');
    await client.query(CREATE_BRANDS);

    console.log('  Creating table: smartphones');
    await client.query(CREATE_SMARTPHONES);

    console.log('  Creating table: smartphone_specs');
    await client.query(CREATE_SMARTPHONE_SPECS);

    await client.query('COMMIT');

    console.log('\n✅ All tables created successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
