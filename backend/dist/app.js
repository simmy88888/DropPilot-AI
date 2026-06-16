"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const trendRoutes_js_1 = __importDefault(require("./routes/trendRoutes.js"));
const competitorRoutes_js_1 = __importDefault(require("./routes/competitorRoutes.js"));
const supplierRoutes_js_1 = __importDefault(require("./routes/supplierRoutes.js"));
const performanceRoutes_js_1 = __importDefault(require("./routes/performanceRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/products', productRoutes_js_1.default);
app.use('/api/trends', trendRoutes_js_1.default);
app.use('/api/competitors', competitorRoutes_js_1.default);
app.use('/api/suppliers', supplierRoutes_js_1.default);
app.use('/api/performance', performanceRoutes_js_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'DropPilot AI API is running' });
});
exports.default = app;
