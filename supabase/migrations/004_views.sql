-- Migration 004: Database Views
-- Creates views for efficient data access

-- ============================================
-- LEDGER BALANCES VIEW
-- Calculates current balance for each ledger based on opening balance + all entries
-- ============================================
CREATE OR REPLACE VIEW ledger_balances AS
SELECT 
  l.id AS ledger_id,
  l.user_id,
  l.name,
  l.type,
  l.currency,
  l.opening_balance,
  l.opening_balance + COALESCE(
    SUM(
      CASE 
        WHEN le.entry_type = 'credit' THEN le.amount
        WHEN le.entry_type = 'debit' THEN -le.amount
        ELSE 0
      END
    ), 0
  ) AS current_balance
FROM ledgers l
LEFT JOIN ledger_entries le ON le.ledger_id = l.id
WHERE l.is_archived = FALSE
GROUP BY l.id;

-- ============================================
-- TRANSACTIONS WITH CLASSIFICATIONS VIEW
-- Joins transactions with their classification and category info
-- ============================================
CREATE OR REPLACE VIEW transactions_with_classification AS
SELECT 
  t.*,
  c.id AS classification_id,
  c.category_id,
  c.counterparty AS classified_counterparty,
  c.notes AS classification_notes,
  c.source AS classification_source,
  c.rule_id,
  c.status AS classification_status,
  cat.name AS category_name,
  cat.type AS category_type,
  cat.icon AS category_icon,
  cat.color AS category_color
FROM transactions t
LEFT JOIN classifications c ON c.transaction_id = t.id AND c.status = 'active'
LEFT JOIN categories cat ON cat.id = c.category_id
WHERE t.is_deleted = FALSE;

-- ============================================
-- REVIEW QUEUE WITH TRANSACTIONS VIEW
-- Joins review items with transaction details
-- ============================================
CREATE OR REPLACE VIEW review_queue_full AS
SELECT 
  rq.*,
  t.transaction_date,
  t.description AS transaction_description,
  t.amount AS transaction_amount,
  t.entry_type AS transaction_entry_type,
  t.ledger_id,
  l.name AS ledger_name,
  l.currency AS ledger_currency,
  rt.description AS related_transaction_description,
  rt.amount AS related_transaction_amount
FROM review_queue rq
LEFT JOIN transactions t ON t.id = rq.transaction_id
LEFT JOIN ledgers l ON l.id = t.ledger_id
LEFT JOIN transactions rt ON rt.id = rq.related_transaction_id
WHERE rq.status = 'pending';

-- ============================================
-- SUBSCRIPTIONS WITH DETAILS VIEW
-- Joins subscriptions with category and ledger info
-- ============================================
CREATE OR REPLACE VIEW subscriptions_full AS
SELECT 
  s.*,
  cat.name AS category_name,
  cat.icon AS category_icon,
  l.name AS ledger_name,
  l.type AS ledger_type
FROM subscriptions s
LEFT JOIN categories cat ON cat.id = s.category_id
LEFT JOIN ledgers l ON l.id = s.ledger_id;

-- ============================================
-- MONTHLY SUMMARY VIEW
-- Aggregates transactions by month for reporting
-- ============================================
CREATE OR REPLACE VIEW monthly_summary AS
SELECT 
  t.user_id,
  DATE_TRUNC('month', t.transaction_date) AS month,
  t.ledger_id,
  l.name AS ledger_name,
  l.currency,
  SUM(CASE WHEN t.entry_type = 'credit' THEN t.amount ELSE 0 END) AS total_credits,
  SUM(CASE WHEN t.entry_type = 'debit' THEN t.amount ELSE 0 END) AS total_debits,
  COUNT(*) AS transaction_count
FROM transactions t
JOIN ledgers l ON l.id = t.ledger_id
WHERE t.is_deleted = FALSE
GROUP BY t.user_id, DATE_TRUNC('month', t.transaction_date), t.ledger_id, l.name, l.currency;

-- ============================================
-- SPENDING BY CATEGORY VIEW
-- Aggregates spending by category for reports
-- ============================================
CREATE OR REPLACE VIEW spending_by_category AS
SELECT 
  t.user_id,
  DATE_TRUNC('month', t.transaction_date) AS month,
  c.category_id,
  cat.name AS category_name,
  cat.type AS category_type,
  cat.icon AS category_icon,
  cat.color AS category_color,
  SUM(t.amount) AS total_amount,
  COUNT(*) AS transaction_count
FROM transactions t
JOIN classifications c ON c.transaction_id = t.id AND c.status = 'active'
JOIN categories cat ON cat.id = c.category_id
WHERE t.is_deleted = FALSE
GROUP BY t.user_id, DATE_TRUNC('month', t.transaction_date), c.category_id, 
         cat.name, cat.type, cat.icon, cat.color;

-- ============================================
-- UNCATEGORIZED TRANSACTIONS VIEW
-- Quick access to transactions needing classification
-- ============================================
CREATE OR REPLACE VIEW uncategorized_transactions AS
SELECT 
  t.*,
  l.name AS ledger_name,
  l.currency AS ledger_currency
FROM transactions t
JOIN ledgers l ON l.id = t.ledger_id
LEFT JOIN classifications c ON c.transaction_id = t.id AND c.status = 'active'
WHERE t.is_deleted = FALSE
  AND c.id IS NULL;

-- ============================================
-- RECENT ACTIVITY VIEW
-- Last 50 transactions with all details for dashboard
-- ============================================
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  t.*,
  l.name AS ledger_name,
  l.currency AS ledger_currency,
  c.category_id,
  cat.name AS category_name,
  cat.icon AS category_icon,
  cat.color AS category_color,
  c.counterparty AS classified_counterparty
FROM transactions t
JOIN ledgers l ON l.id = t.ledger_id
LEFT JOIN classifications c ON c.transaction_id = t.id AND c.status = 'active'
LEFT JOIN categories cat ON cat.id = c.category_id
WHERE t.is_deleted = FALSE
ORDER BY t.transaction_date DESC, t.created_at DESC
LIMIT 50;
