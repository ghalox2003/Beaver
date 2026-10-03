CREATE TABLE quote_requests (
  id TEXT PRIMARY KEY,
  client_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  professional_id TEXT NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  preferred_date TEXT,
  budget REAL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled', 'completed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_quote_requests_client
  ON quote_requests(client_user_id);

CREATE INDEX idx_quote_requests_professional
  ON quote_requests(professional_id);

CREATE INDEX idx_quote_requests_status
  ON quote_requests(status);
