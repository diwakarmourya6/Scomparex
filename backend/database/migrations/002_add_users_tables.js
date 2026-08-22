/**
 * Migration: Create users and favorites tables.
 *
 * Run:  node database/migrations/002_add_users_tables.js
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { pool } = require('../../src/config/database');

const CREATE_USERS = `
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(200)  NOT NULL,
  email         VARCHAR(200)  NOT NULL UNIQUE,
  password_hash TEXT          NOT NULL,
  role          VARCHAR(50)   NOT NULL DEFAULT 'user',
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

const CREATE_FAVORITES = `
CREATE TABLE IF NOT EXISTS favorites (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  smartphone_id INTEGER NOT NULL REFERENCES smartphones(id) ON DELETE CASCADE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, smartphone_id)
);
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔨 Running migration: Add Users and Favorites...\n');

    await client.query('BEGIN');

    console.log('  Creating table: users');
    await client.query(CREATE_USERS);

    console.log('  Creating table: favorites');
    await client.query(CREATE_FAVORITES);

    await client.query('COMMIT');

    console.log('\n✅ Users and favorites tables created successfully.');
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
