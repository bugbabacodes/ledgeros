-- Seed data for LedgerOS
-- Run this after migrations to populate default data

-- ============================================
-- DEFAULT CATEGORIES (if not already inserted by migration 002)
-- ============================================

-- Income Categories
INSERT INTO categories (id, name, type, icon, color, is_system, sort_order) VALUES
  (gen_random_uuid(), 'Salary', 'income', 'briefcase', '#10B981', true, 1),
  (gen_random_uuid(), 'Business Income', 'income', 'building-2', '#10B981', true, 2),
  (gen_random_uuid(), 'Freelance', 'income', 'laptop', '#10B981', true, 3),
  (gen_random_uuid(), 'Investments', 'income', 'trending-up', '#10B981', true, 4),
  (gen_random_uuid(), 'Gifts Received', 'income', 'gift', '#10B981', true, 5),
  (gen_random_uuid(), 'Refunds', 'income', 'rotate-ccw', '#10B981', true, 6),
  (gen_random_uuid(), 'Other Income', 'income', 'plus-circle', '#10B981', true, 99)
ON CONFLICT DO NOTHING;

-- Expense Categories
INSERT INTO categories (id, name, type, icon, color, is_system, sort_order) VALUES
  (gen_random_uuid(), 'Food & Dining', 'expense', 'utensils', '#EF4444', true, 1),
  (gen_random_uuid(), 'Groceries', 'expense', 'shopping-basket', '#EF4444', true, 2),
  (gen_random_uuid(), 'Transportation', 'expense', 'bus', '#EF4444', true, 3),
  (gen_random_uuid(), 'Fuel', 'expense', 'fuel', '#EF4444', true, 4),
  (gen_random_uuid(), 'Shopping', 'expense', 'shopping-bag', '#EF4444', true, 5),
  (gen_random_uuid(), 'Entertainment', 'expense', 'film', '#EF4444', true, 6),
  (gen_random_uuid(), 'Utilities', 'expense', 'zap', '#EF4444', true, 7),
  (gen_random_uuid(), 'Rent / Housing', 'expense', 'home', '#EF4444', true, 8),
  (gen_random_uuid(), 'Healthcare', 'expense', 'heart-pulse', '#EF4444', true, 9),
  (gen_random_uuid(), 'Insurance', 'expense', 'shield', '#EF4444', true, 10),
  (gen_random_uuid(), 'Education', 'expense', 'graduation-cap', '#EF4444', true, 11),
  (gen_random_uuid(), 'Travel', 'expense', 'plane', '#EF4444', true, 12),
  (gen_random_uuid(), 'Personal Care', 'expense', 'smile', '#EF4444', true, 13),
  (gen_random_uuid(), 'Subscriptions', 'expense', 'repeat', '#EF4444', true, 14),
  (gen_random_uuid(), 'EMI / Loans', 'expense', 'credit-card', '#EF4444', true, 15),
  (gen_random_uuid(), 'Investments', 'expense', 'trending-up', '#EF4444', true, 16),
  (gen_random_uuid(), 'Taxes', 'expense', 'file-text', '#EF4444', true, 17),
  (gen_random_uuid(), 'Gifts Given', 'expense', 'gift', '#EF4444', true, 18),
  (gen_random_uuid(), 'Donations', 'expense', 'heart', '#EF4444', true, 19),
  (gen_random_uuid(), 'Other Expenses', 'expense', 'minus-circle', '#EF4444', true, 99)
ON CONFLICT DO NOTHING;

-- Transfer Categories
INSERT INTO categories (id, name, type, icon, color, is_system, sort_order) VALUES
  (gen_random_uuid(), 'Internal Transfer', 'transfer', 'arrow-left-right', '#3B82F6', true, 1),
  (gen_random_uuid(), 'Credit Card Payment', 'transfer', 'credit-card', '#3B82F6', true, 2),
  (gen_random_uuid(), 'Investment Transfer', 'transfer', 'landmark', '#3B82F6', true, 3),
  (gen_random_uuid(), 'Crypto Purchase', 'transfer', 'bitcoin', '#3B82F6', true, 4),
  (gen_random_uuid(), 'Crypto Sale', 'transfer', 'coins', '#3B82F6', true, 5)
ON CONFLICT DO NOTHING;
