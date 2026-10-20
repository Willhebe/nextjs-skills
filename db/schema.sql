-- The app creates this table automatically on first use,
-- but here it is if you'd rather run it yourself in the Neon SQL editor.
CREATE TABLE IF NOT EXISTS quiz_results (
  id          SERIAL PRIMARY KEY,
  test_id     TEXT        NOT NULL,
  level       TEXT        NOT NULL,
  score       INTEGER     NOT NULL,
  total       INTEGER     NOT NULL,
  answers     JSONB       NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
