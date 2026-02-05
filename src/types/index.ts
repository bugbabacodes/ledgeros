// Types for LedgerOS

// Enums
export type LedgerType = 'bank_account' | 'credit_card' | 'cash_pool' | 'crypto_exchange' | 'crypto_wallet';
export type CurrencyCode = 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
export type EntryType = 'debit' | 'credit';
export type CategoryType = 'income' | 'expense' | 'transfer';
export type ReviewItemType = 'uncategorized' | 'potential_transfer' | 'potential_subscription' | 'duplicate_warning' | 'balance_mismatch';
export type SubscriptionFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'detected';

// Core Types
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  default_currency: CurrencyCode;
  created_at: string;
  updated_at: string;
}

export interface Ledger {
  id: string;
  user_id: string;
  name: string;
  type: LedgerType;
  currency: CurrencyCode;
  opening_balance: number;
  opening_date: string;
  statement_password_encrypted: string | null;
  institution_name: string | null;
  account_number_last4: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  current_balance?: number;
}

export interface Transaction {
  id: string;
  ledger_id: string;
  user_id: string;
  transaction_date: string;
  description: string;
  amount: number;
  entry_type: EntryType;
  running_balance: number | null;
  fingerprint: string;
  source_type: 'csv_import' | 'manual' | 'api_sync';
  source_file_id: string | null;
  source_row_number: number | null;
  is_deleted: boolean;
  created_at: string;
  // Joined fields
  classification?: Classification;
  ledger?: Ledger;
}

export interface LedgerEntry {
  id: string;
  transaction_id: string;
  ledger_id: string;
  user_id: string;
  entry_type: EntryType;
  amount: number;
  entry_date: string;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string | null;
  name: string;
  parent_id: string | null;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  is_system: boolean;
  sort_order: number;
  created_at: string;
  // Joined fields
  parent?: Category;
  children?: Category[];
}

export interface Classification {
  id: string;
  transaction_id: string;
  user_id: string;
  category_id: string | null;
  linked_transaction_id: string | null;
  counterparty: string | null;
  notes: string | null;
  source: 'manual' | 'rule' | 'suggestion';
  rule_id: string | null;
  status: 'active' | 'pending_review';
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
}

export interface Rule {
  id: string;
  user_id: string;
  name: string | null;
  pattern: string;
  pattern_type: 'contains' | 'regex' | 'exact';
  category_id: string | null;
  counterparty: string | null;
  match_count: number;
  last_matched_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
}

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  merchant_pattern: string;
  amount: number;
  currency: CurrencyCode;
  frequency: SubscriptionFrequency;
  next_expected_date: string | null;
  last_charged_date: string | null;
  last_amount: number | null;
  status: SubscriptionStatus;
  price_history: Array<{
    date: string;
    amount: number;
  }>;
  category_id: string | null;
  ledger_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  ledger?: Ledger;
}

export interface StatementFile {
  id: string;
  user_id: string;
  ledger_id: string;
  filename: string;
  file_type: 'csv' | 'pdf';
  file_size: number | null;
  storage_path: string;
  start_date: string | null;
  end_date: string | null;
  transaction_count: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  column_mapping: ColumnMapping | null;
  created_at: string;
  processed_at: string | null;
}

export interface ReviewQueueItem {
  id: string;
  user_id: string;
  item_type: ReviewItemType;
  transaction_id: string | null;
  related_transaction_id: string | null;
  question: string;
  suggestions: Array<{
    type: string;
    label: string;
    value: string;
  }>;
  status: 'pending' | 'resolved' | 'skipped';
  resolved_at: string | null;
  resolution: string | null;
  created_at: string;
  priority: number;
  // Joined fields
  transaction?: Transaction;
  related_transaction?: Transaction;
}

// Input Types
export interface CreateLedgerInput {
  name: string;
  type: LedgerType;
  currency: CurrencyCode;
  opening_balance: number;
  opening_date: string;
  institution_name?: string;
  account_number_last4?: string;
}

export interface UpdateLedgerInput {
  name?: string;
  institution_name?: string;
  account_number_last4?: string;
  is_archived?: boolean;
}

export interface CreateTransactionInput {
  ledger_id: string;
  transaction_date: string;
  description: string;
  amount: number;
  entry_type: EntryType;
  running_balance?: number;
}

export interface CreateCategoryInput {
  name: string;
  parent_id?: string;
  type: CategoryType;
  icon?: string;
  color?: string;
}

export interface CreateRuleInput {
  name?: string;
  pattern: string;
  pattern_type: 'contains' | 'regex' | 'exact';
  category_id?: string;
  counterparty?: string;
}

// CSV/Statement Types
export interface ColumnMapping {
  date: string;
  description: string;
  amount: string;
  entry_type?: string;
  running_balance?: string;
  date_format?: string;
}

export interface RawTransaction {
  date: string;
  description: string;
  amount: number;
  entry_type?: EntryType;
  running_balance?: number;
}

export interface ParseResult {
  transactions: RawTransaction[];
  errors: Array<{
    row: number;
    message: string;
  }>;
  totalRows: number;
  validRows: number;
}

export interface ImportSummary {
  totalTransactions: number;
  newTransactions: number;
  duplicateTransactions: number;
  errors: number;
  uncategorizedCount: number;
}

// Dashboard Types
export interface DashboardSummary {
  netWorth: number;
  netWorthByCurrency: Record<CurrencyCode, number>;
  netWorthByType: Record<LedgerType, number>;
  ledgerCount: number;
  transactionCount: number;
  inboxCount: number;
}

export interface RecentTransaction {
  id: string;
  transaction_date: string;
  description: string;
  amount: number;
  entry_type: EntryType;
  ledger: {
    name: string;
    currency: CurrencyCode;
  };
  category?: {
    name: string;
    icon?: string;
  };
}
