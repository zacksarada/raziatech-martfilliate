-- Drop tables if they exist (optional)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'AFFILIATE',
  "affiliateCode" VARCHAR(100) UNIQUE DEFAULT gen_random_uuid()::VARCHAR,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  commission DECIMAL(5,2),
  "affiliateUrl" TEXT,
  category VARCHAR(100),
  "imageUrl" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::VARCHAR,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_affiliate_code ON users("affiliateCode");
CREATE INDEX idx_products_category ON products(category);

-- Insert initial categories
INSERT INTO categories (name, slug) VALUES
  ('Online Courses', 'online-courses'),
  ('E-Books', 'e-books'),
  ('Software Tools', 'software-tools'),
  ('Website Templates', 'website-templates')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, commission, "affiliateUrl", category) VALUES
  ('MikroTik License', 'Professional networking software license', 199.99, 30, 'https://mikrotik.com/buy', 'Software Tools'),
  ('React E-Commerce Template', 'Modern React template with Tailwind CSS', 49.99, 40, 'https://themeforest.net/react-templates', 'Website Templates'),
  ('Python Data Science Course', 'Complete Python data science bootcamp', 89.99, 50, 'https://udemy.com/python-data-science', 'Online Courses')
ON CONFLICT (name) DO NOTHING;

-- Create admin user (password: admin123 hashed)
INSERT INTO users (email, name, password, role, "affiliateCode") VALUES
  ('admin@raziatech.com', 'Admin User', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 'ADMIN001'),
  ('affiliate@test.com', 'Test Affiliate', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'AFFILIATE', 'AFF001')
ON CONFLICT (email) DO NOTHING;

-- Verify tables
SELECT 'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'categories', COUNT(*) FROM categories;
