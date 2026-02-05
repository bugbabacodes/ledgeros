-- Migration 001: Initial Schema
-- Creates core tables: profiles, ledgers, transactions, ledger_entries

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  default_currency TEXT DEFAULT 'INR',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- LEDGERS TABLE
-- ============================================
CREATE TYPE ledger_type AS ENUM ('bank_account', 'credit_card', 'cash_pool', 'crypto_exchange', 'crypto_wallet');
CREATE TYPE currency_code AS ENUM ('INR', 'USD', 'USDC', 'ETH', 'BTC');

CREATE TABLE ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  type ledger_type NOT NULL,
  currency currency_code DEFAULT 'INR',
  
  -- Opening balance in smallest unit (paise/cents)
  opening_balance BIGINT NOT NULL DEFAULT 0,
  opening_date DATE NOT NULL,
  
  -- Statement password (encrypted)
  statement_password_encrypted TEXT,
  
  -- Metadata
  institution_name TEXT,
  account_number_last4 TEXT,
  
  -- Status
  is_archived BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ledgers_user_id ON ledgers(user_id);
CREATE INDEX idx_ledgers_type ON ledgers(type);

-- Enable RLS
ALTER TABLE ledgers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can CRUD own ledgers"
  ON ledgers FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ledger_id UUID NOT NULL REFERENCES ledgers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Core transaction data (immutable)
  transaction_date DATE NOT NULL,
  description TEXT NOT NULL,
  amount BIGINT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('debit', 'credit')),
  running_balance BIGINT,
  
  -- Fingerprint for deduplication
  fingerprint TEXT NOT NULL,
  
  -- Source tracking
  source_type TEXT DEFAULT 'csv_import' CHECK (source_type IN ('csv_import', 'manual', 'api_sync')),
  source_file_id UUID,
  source_row_number INTEGER,
  
  -- Status
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique fingerprint per ledger
CREATE UNIQUE INDEX idx_transactions_fingerprint 
  ON transactions(ledger_id, fingerprint) 
  WHERE is_deleted = FALSE;

CREATE INDEX idx_transactions_ledger_date ON transactions(ledger_id, transaction_date);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- LEDGER ENTRIES TABLE (Double-entry accounting)
-- ============================================
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  ledger_id UUID NOT NULL REFERENCES ledgers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  entry_type TEXT NOT NULL CHECK (entry_type IN ('debit', 'credit')),
  amount BIGINT NOT NULL,
  entry_date DATE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ledger_entries_ledger ON ledger_entries(ledger_id, entry_date);
CREATE INDEX idx_ledger_entries_transaction ON ledger_entries(transaction_id);

-- Enable RLS
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entries"
  ON ledger_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON ledger_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- UPDATE TRIGGER FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ledgers_updated_at
  BEFORE UPDATE ON ledgers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
