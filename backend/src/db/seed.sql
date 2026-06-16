-- Seed Users (password is 'password123')
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@droppilot.ai', '$2b$10$EpjX0ZXP.mS5x4YV0qYVreC1K7Uf9oXh8pYvMvFp4M/XzXG/XzXG.', 'Admin User', 'admin'),
('user@droppilot.ai', '$2b$10$EpjX0ZXP.mS5x4YV0qYVreC1K7Uf9oXh8pYvMvFp4M/XzXG/XzXG.', 'Demo User', 'user');

-- Seed Suppliers
INSERT INTO suppliers (name, contact_info, rating) VALUES 
('Global Source Co.', 'contact@globalsource.com', 4.5),
('FastShip Logistics', 'info@fastship.logistics', 4.8);

-- Seed Products
INSERT INTO products (name, description, category, price, cost, supplier_id, image_url) VALUES 
('Portable Blender', '6-blade portable blender for shakes and smoothies.', 'Kitchen', 29.99, 12.50, 1, 'https://example.com/blender.jpg'),
('Neck Massager', 'Intelligent neck massager with heat function.', 'Health', 45.00, 18.00, 1, 'https://example.com/massager.jpg'),
('Minimalist Wallet', 'RFID blocking slim wallet for men.', 'Fashion', 19.99, 5.00, 2, 'https://example.com/wallet.jpg');

-- Seed Competitors
INSERT INTO competitors (name, website_url, tracked_products_count) VALUES 
('DropShip King', 'https://dropshipking.com', 150),
('Ecom Master', 'https://ecommaster.io', 85);

-- Seed Trends
INSERT INTO trends (name, description, growth_score, source) VALUES 
('Home Office Decor', 'Increased demand for ergonomic office chairs and desk accessories.', 85.5, 'Google Trends'),
('Sustainable Living', 'Eco-friendly products like reusable straws and bamboo toothbrushes.', 92.0, 'TikTok');

-- Seed Ad Campaigns
INSERT INTO ad_campaigns (product_id, platform, status, budget, spend, revenue) VALUES 
(1, 'Facebook', 'active', 500, 150, 450),
(2, 'TikTok', 'active', 1000, 300, 1200);

-- Seed Profit Calculations
INSERT INTO profit_calculations (product_id, user_id, price, cost, shipping, ad_spend, net_profit) VALUES 
(1, 2, 29.99, 12.50, 5.00, 2.50, 9.99);

-- Seed Content Calendar
INSERT INTO content_calendar (user_id, title, description, scheduled_at, platform) VALUES 
(2, 'Blender Video Ad', 'Post the new blender video ad on Instagram.', '2026-07-01 10:00:00', 'Instagram');
