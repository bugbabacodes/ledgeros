-- Migration 003: Rules, Subscriptions, Review Queue, and Statement Files
-- Creates rules, subscriptions, review_queue, and statement_files tables

-- ============================================
-- RULES TABLE
-- ============================================
CREATE TABLE rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT,
  
  -- Matching criteria
  pattern TEXT NOT NULL,
  pattern_type TEXT DEFAULT 'contains' CHECK (pattern_type IN ('contains', 'regex', 'exact')),
  
  -- Actions
  category_id UUID REFERENCES categories(id),
  counterparty TEXT,
  
  -- Metadata
  match_count INTEGER DEFAULT 0,
  last_matched_at TIMESTAMPTZ,
  
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rules_user ON rules(user_id);

-- Enable RLS
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own rules"
  ON rules FOR ALL
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_rules_updated_at
  BEFORE UPDATE ON rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TYPE subscription_frequency AS ENUM ('weekly', 'monthly', 'quarterly', 'yearly');
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled', 'detected');

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  merchant_pattern TEXT NOT NULL,
  
  amount BIGINT NOT NULL,
  currency currency_code DEFAULT 'INR',
  frequency subscription_frequency NOT NULL,
  
  -- Tracking
  next_expected_date DATE,
  last_charged_date DATE,
  last_amount BIGINT,
  
  -- Status
  status subscription_status DEFAULT 'detected',
  
  -- Price history stored as JSONB
  price_history JSONB DEFAULT '[]',
  
  category_id UUID REFERENCES categories(id),
  ledger_id UUID REFERENCES ledgers(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own subscriptions"
  ON subscriptions FOR ALL
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STATEMENT FILES TABLE
-- ============================================
CREATE TABLE statement_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ledger_id UUID NOT NULL REFERENCES ledgers(id) ON DELETE CASCADE,
  
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('csv', 'pdf')),
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  
  -- Coverage
  start_date DATE,
  end_date DATE,
  transaction_count INTEGER DEFAULT 0,
  
  -- Processing status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  
  -- Column mapping (for CSV)
  column_mapping JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_statement_files_ledger ON statement_files(ledger_id);

-- Enable RLS
ALTER TABLE statement_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own statement files"
  ON statement_files FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- REVIEW QUEUE TABLE
-- ============================================
CREATE TYPE review_item_type AS ENUM (
  'uncategorized',
  'potential_transfer',
  'potential_subscription',
  'duplicate_warning',
  'balance_mismatch'
);

CREATE TABLE review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  item_type review_item_type NOT NULL,
  transaction_id UUID REFERENCES transactions(id),
  related_transaction_id UUID REFERENCES transactions(id),
  
  -- Question to ask user
  question TEXT NOT NULL,
  
  -- Suggested actions (JSONB array)
  suggestions JSONB DEFAULT '[]',
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'skipped')),
  resolved_at TIMESTAMPTZ,
  resolution TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  priority INTEGER DEFAULT 0
);

CREATE INDEX idx_review_queue_user_status ON review_queue(user_id, status);

-- Enable RLS
ALTER TABLE review_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own review items"
  ON review_queue FOR ALL
  USING (auth.uid() = user_id);

-- Add foreign key for source_file_id in transactions (now that statement_files exists)
ALTER TABLE transactions
  ADD CONSTRAINT fk_transactions_source_file
  FOREIGN KEY (source_file_id) REFERENCES statement_files(id)
  ON DELETE SET NULL;

-- Add foreign key for rule_id in classifications (now that rules exists)
ALTER TABLE classifications
  ADD CONSTRAINT fk_classifications_rule
  FOREIGN KEY (rule_id) REFERENCES rules(id)
  ON DELETE SET NULL;
