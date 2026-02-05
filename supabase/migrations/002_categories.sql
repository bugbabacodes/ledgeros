-- Migration 002: Categories and Classifications
-- Creates categories table and classifications layer

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
  
  icon TEXT,
  color TEXT,
  
  is_system BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_user ON categories(user_id);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view system and own categories"
  ON categories FOR SELECT
  USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can CRUD own categories"
  ON categories FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- CLASSIFICATIONS TABLE
-- ============================================
CREATE TABLE classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  category_id UUID REFERENCES categories(id),
  
  -- Optional linking for transfers
  linked_transaction_id UUID REFERENCES transactions(id),
  
  -- Counterparty (person/business)
  counterparty TEXT,
  
  -- Notes
  notes TEXT,
  
  -- Source of classification
  source TEXT NOT NULL CHECK (source IN ('manual', 'rule', 'suggestion')),
  rule_id UUID,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending_review')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_classifications_transaction 
  ON classifications(transaction_id) 
  WHERE status = 'active';

-- Enable RLS
ALTER TABLE classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own classifications"
  ON classifications FOR ALL
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_classifications_updated_at
  BEFORE UPDATE ON classifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DEFAULT CATEGORIES
-- ============================================

-- Income Categories
INSERT INTO categories (id, name, type, icon, color, is_system, sort_order) VALUES
  (gen_random_uuid(), 'Salary', 'income', 'briefcase', '#10B981', true, 1),
  (gen_random_uuid(), 'Business Income', 'income', 'building-2', '#10B981', true, 2),
  (gen_random_uuid(), 'Freelance', 'income', 'laptop', '#10B981', true, 3),
  (gen_random_uuid(), 'Investments', 'income', 'trending-up', '#10B981', true, 4),
  (gen_random_uuid(), 'Gifts Received', 'income', 'gift', '#10B981', true, 5),
  (gen_random_uuid(), 'Refunds', 'income', 'rotate-ccw', '#10B981', true, 6),
  (gen_random_uuid(), 'Other Income', 'income', 'plus-circle', '#10B981', true, 99);

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
  (gen_random_uuid(), 'Other Expenses', 'expense', 'minus-circle', '#EF4444', true, 99);

-- Transfer Categories
INSERT INTO categories (id, name, type, icon, color, is_system, sort_order) VALUES
  (gen_random_uuid(), 'Internal Transfer', 'transfer', 'arrow-left-right', '#3B82F6', true, 1),
  (gen_random_uuid(), 'Credit Card Payment', 'transfer', 'credit-card', '#3B82F6', true, 2),
  (gen_random_uuid(), 'Investment Transfer', 'transfer', 'landmark', '#3B82F6', true, 3),
  (gen_random_uuid(), 'Crypto Purchase', 'transfer', 'bitcoin', '#3B82F6', true, 4),
  (gen_random_uuid(), 'Crypto Sale', 'transfer', 'coins', '#3B82F6', true, 5);
