import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

export const initDb = () => {
  const schemaPath = path.resolve(__dirname, './schema.sql');
  const seedPath = path.resolve(__dirname, './seed.sql');

  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);

  // Check if we should seed (e.g., if users table is empty)
  const rowCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (rowCount.count === 0) {
    console.log('Seeding database...');
    const seed = fs.readFileSync(seedPath, 'utf8');
    db.exec(seed);
  }
};

export default db;
