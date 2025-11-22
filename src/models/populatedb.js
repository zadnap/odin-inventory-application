#! /usr/bin/env node
const dotenv = require('dotenv');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

dotenv.config();

const client = new Client({ connectionString: process.env.DB_URL });
const SQL = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();

async function main() {
  try {
    console.log('seeding...');
    await client.connect();
    await client.query(SQL);
    console.log('done');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

main();
