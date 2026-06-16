"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dbPath = path_1.default.resolve(__dirname, '../../database.sqlite');
const db = new better_sqlite3_1.default(dbPath);
const initDb = () => {
    const schemaPath = path_1.default.resolve(__dirname, './schema.sql');
    const seedPath = path_1.default.resolve(__dirname, './seed.sql');
    const schema = fs_1.default.readFileSync(schemaPath, 'utf8');
    db.exec(schema);
    // Check if we should seed (e.g., if users table is empty)
    const rowCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (rowCount.count === 0) {
        console.log('Seeding database...');
        const seed = fs_1.default.readFileSync(seedPath, 'utf8');
        db.exec(seed);
    }
};
exports.initDb = initDb;
exports.default = db;
