export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          default_currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          default_currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          default_currency?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      ledgers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'bank_account' | 'credit_card' | 'cash_pool' | 'crypto_exchange' | 'crypto_wallet';
          currency: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          opening_balance: number;
          opening_date: string;
          statement_password_encrypted: string | null;
          institution_name: string | null;
          account_number_last4: string | null;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'bank_account' | 'credit_card' | 'cash_pool' | 'crypto_exchange' | 'crypto_wallet';
          currency?: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          opening_balance?: number;
          opening_date: string;
          statement_password_encrypted?: string | null;
          institution_name?: string | null;
          account_number_last4?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'bank_account' | 'credit_card' | 'cash_pool' | 'crypto_exchange' | 'crypto_wallet';
          currency?: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          opening_balance?: number;
          opening_date?: string;
          statement_password_encrypted?: string | null;
          institution_name?: string | null;
          account_number_last4?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          ledger_id: string;
          user_id: string;
          transaction_date: string;
          description: string;
          amount: number;
          entry_type: 'debit' | 'credit';
          running_balance: number | null;
          fingerprint: string;
          source_type: 'csv_import' | 'manual' | 'api_sync';
          source_file_id: string | null;
          source_row_number: number | null;
          is_deleted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          ledger_id: string;
          user_id: string;
          transaction_date: string;
          description: string;
          amount: number;
          entry_type: 'debit' | 'credit';
          running_balance?: number | null;
          fingerprint: string;
          source_type?: 'csv_import' | 'manual' | 'api_sync';
          source_file_id?: string | null;
          source_row_number?: number | null;
          is_deleted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          ledger_id?: string;
          user_id?: string;
          transaction_date?: string;
          description?: string;
          amount?: number;
          entry_type?: 'debit' | 'credit';
          running_balance?: number | null;
          fingerprint?: string;
          source_type?: 'csv_import' | 'manual' | 'api_sync';
          source_file_id?: string | null;
          source_row_number?: number | null;
          is_deleted?: boolean;
          created_at?: string;
        };
      };
      ledger_entries: {
        Row: {
          id: string;
          transaction_id: string;
          ledger_id: string;
          user_id: string;
          entry_type: 'debit' | 'credit';
          amount: number;
          entry_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          ledger_id: string;
          user_id: string;
          entry_type: 'debit' | 'credit';
          amount: number;
          entry_date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          ledger_id?: string;
          user_id?: string;
          entry_type?: 'debit' | 'credit';
          amount?: number;
          entry_date?: string;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          parent_id: string | null;
          type: 'income' | 'expense' | 'transfer';
          icon: string | null;
          color: string | null;
          is_system: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          parent_id?: string | null;
          type: 'income' | 'expense' | 'transfer';
          icon?: string | null;
          color?: string | null;
          is_system?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          parent_id?: string | null;
          type?: 'income' | 'expense' | 'transfer';
          icon?: string | null;
          color?: string | null;
          is_system?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      classifications: {
        Row: {
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
        };
        Insert: {
          id?: string;
          transaction_id: string;
          user_id: string;
          category_id?: string | null;
          linked_transaction_id?: string | null;
          counterparty?: string | null;
          notes?: string | null;
          source: 'manual' | 'rule' | 'suggestion';
          rule_id?: string | null;
          status?: 'active' | 'pending_review';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          user_id?: string;
          category_id?: string | null;
          linked_transaction_id?: string | null;
          counterparty?: string | null;
          notes?: string | null;
          source?: 'manual' | 'rule' | 'suggestion';
          rule_id?: string | null;
          status?: 'active' | 'pending_review';
          created_at?: string;
          updated_at?: string;
        };
      };
      rules: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string | null;
          pattern: string;
          pattern_type?: 'contains' | 'regex' | 'exact';
          category_id?: string | null;
          counterparty?: string | null;
          match_count?: number;
          last_matched_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string | null;
          pattern?: string;
          pattern_type?: 'contains' | 'regex' | 'exact';
          category_id?: string | null;
          counterparty?: string | null;
          match_count?: number;
          last_matched_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          merchant_pattern: string;
          amount: number;
          currency: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
          next_expected_date: string | null;
          last_charged_date: string | null;
          last_amount: number | null;
          status: 'active' | 'paused' | 'cancelled' | 'detected';
          price_history: Json;
          category_id: string | null;
          ledger_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          merchant_pattern: string;
          amount: number;
          currency?: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
          next_expected_date?: string | null;
          last_charged_date?: string | null;
          last_amount?: number | null;
          status?: 'active' | 'paused' | 'cancelled' | 'detected';
          price_history?: Json;
          category_id?: string | null;
          ledger_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          merchant_pattern?: string;
          amount?: number;
          currency?: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC';
          frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
          next_expected_date?: string | null;
          last_charged_date?: string | null;
          last_amount?: number | null;
          status?: 'active' | 'paused' | 'cancelled' | 'detected';
          price_history?: Json;
          category_id?: string | null;
          ledger_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      statement_files: {
        Row: {
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
          column_mapping: Json | null;
          created_at: string;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          ledger_id: string;
          filename: string;
          file_type: 'csv' | 'pdf';
          file_size?: number | null;
          storage_path: string;
          start_date?: string | null;
          end_date?: string | null;
          transaction_count?: number;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          error_message?: string | null;
          column_mapping?: Json | null;
          created_at?: string;
          processed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          ledger_id?: string;
          filename?: string;
          file_type?: 'csv' | 'pdf';
          file_size?: number | null;
          storage_path?: string;
          start_date?: string | null;
          end_date?: string | null;
          transaction_count?: number;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          error_message?: string | null;
          column_mapping?: Json | null;
          created_at?: string;
          processed_at?: string | null;
        };
      };
      review_queue: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'uncategorized' | 'potential_transfer' | 'potential_subscription' | 'duplicate_warning' | 'balance_mismatch';
          transaction_id: string | null;
          related_transaction_id: string | null;
          question: string;
          suggestions: Json;
          status: 'pending' | 'resolved' | 'skipped';
          resolved_at: string | null;
          resolution: string | null;
          created_at: string;
          priority: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'uncategorized' | 'potential_transfer' | 'potential_subscription' | 'duplicate_warning' | 'balance_mismatch';
          transaction_id?: string | null;
          related_transaction_id?: string | null;
          question: string;
          suggestions?: Json;
          status?: 'pending' | 'resolved' | 'skipped';
          resolved_at?: string | null;
          resolution?: string | null;
          created_at?: string;
          priority?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: 'uncategorized' | 'potential_transfer' | 'potential_subscription' | 'duplicate_warning' | 'balance_mismatch';
          transaction_id?: string | null;
          related_transaction_id?: string | null;
          question?: string;
          suggestions?: Json;
          status?: 'pending' | 'resolved' | 'skipped';
          resolved_at?: string | null;
          resolution?: string | null;
          created_at?: string;
          priority?: number;
        };
      };
    };
    Views: {
      ledger_balances: {
        Row: {
          ledger_id: string | null;
          user_id: string | null;
          name: string | null;
          type: 'bank_account' | 'credit_card' | 'cash_pool' | 'crypto_exchange' | 'crypto_wallet' | null;
          currency: 'INR' | 'USD' | 'USDC' | 'ETH' | 'BTC' | null;
          opening_balance: number | null;
          current_balance: number | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
