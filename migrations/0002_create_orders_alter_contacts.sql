-- Orders table: tracks all app purchases
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_id TEXT NOT NULL,
    app_name TEXT NOT NULL,
    payer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount INTEGER NOT NULL,
    fee INTEGER NOT NULL DEFAULT 0,
    reference TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    lipila_ref TEXT,
    webhook_received_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Add status, source, notes columns to contacts
ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE contacts ADD COLUMN source TEXT NOT NULL DEFAULT 'website';
ALTER TABLE contacts ADD COLUMN notes TEXT DEFAULT '';
