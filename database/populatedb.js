// Usage: node database/populatedb.js <CONNECTION_STRING>
const { Client } = require('pg');
const { argv } = require('node:process');

const CONNECTION_STRING = argv[2];

const SQL = `
  CREATE TABLE IF NOT EXISTS account (
    account_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    profile_emoji TEXT NOT NULL,
    profile_color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS post (
    post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES account(account_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS comment (
    post_id INTEGER NOT NULL REFERENCES post(post_id) ON DELETE CASCADE,
    account_id INTEGER NOT NULL REFERENCES account(account_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

async function main() {
  console.log('Setting database...');
  const client = new Client({ connectionString: CONNECTION_STRING });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
