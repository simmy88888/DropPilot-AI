"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = __importDefault(require("../db/index.js"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const password_hash = await bcryptjs_1.default.hash(password, 10);
        const stmt = index_js_1.default.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
        const result = stmt.run(email, password_hash, name);
        const token = jsonwebtoken_1.default.sign({ id: result.lastInsertRowid, email }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: result.lastInsertRowid, email, name } });
    }
    catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = index_js_1.default.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user || !(await bcryptjs_1.default.compare(password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = index_js_1.default.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getMe = getMe;
