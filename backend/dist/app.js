"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const trendRoutes_1 = __importDefault(require("./routes/trendRoutes"));
const competitorRoutes_1 = __importDefault(require("./routes/competitorRoutes"));
const supplierRoutes_1 = __importDefault(require("./routes/supplierRoutes"));
const performanceRoutes_1 = __importDefault(require("./routes/performanceRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/trends', trendRoutes_1.default);
app.use('/api/competitors', competitorRoutes_1.default);
app.use('/api/suppliers', supplierRoutes_1.default);
app.use('/api/performance', performanceRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'DropPilot AI API is running' });
});
exports.default = app;
