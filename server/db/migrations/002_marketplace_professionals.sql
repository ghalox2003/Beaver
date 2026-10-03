CREATE TABLE trades (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE professionals (
  id                  TEXT PRIMARY KEY,
  user_id             TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  business_name       TEXT NOT NULL,
  description         TEXT NOT NULL,
  trade_id            TEXT NOT NULL REFERENCES trades(id),
  location            TEXT NOT NULL,
  latitude            REAL NOT NULL,
  longitude           REAL NOT NULL,
  service_radius      INTEGER NOT NULL CHECK (service_radius > 0),
  years_experience    INTEGER NOT NULL CHECK (years_experience >= 0),
  website             TEXT,
  verification_status TEXT NOT NULL DEFAULT 'unverified'
                      CHECK (verification_status IN ('unverified', 'pending', 'verified')),
  availability        TEXT NOT NULL DEFAULT 'available'
                      CHECK (availability IN ('available', 'busy', 'unavailable')),
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_professionals_trade_id
  ON professionals(trade_id);

CREATE INDEX idx_professionals_location
  ON professionals(location);

CREATE INDEX idx_professionals_verification
  ON professionals(verification_status);

CREATE INDEX idx_professionals_availability
  ON professionals(availability);
