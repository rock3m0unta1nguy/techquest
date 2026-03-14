-- Users
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  tier        VARCHAR(20) DEFAULT 'explorer',
  goal        INTEGER DEFAULT 30,
  points      INTEGER DEFAULT 0,
  streak      INTEGER DEFAULT 0,
  last_active DATE,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Tracks
CREATE TABLE IF NOT EXISTS tracks (
  id    SERIAL PRIMARY KEY,
  slug  VARCHAR(50) UNIQUE NOT NULL,
  name  VARCHAR(100) NOT NULL
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id       SERIAL PRIMARY KEY,
  track_id INTEGER REFERENCES tracks(id),
  title    VARCHAR(255) NOT NULL,
  content  JSONB NOT NULL,
  points   INTEGER DEFAULT 20,
  order_num INTEGER NOT NULL
);

-- User Progress
CREATE TABLE IF NOT EXISTS user_progress (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    INTEGER REFERENCES lessons(id),
  completed    BOOLEAN DEFAULT FALSE,
  score        INTEGER DEFAULT 0,
  completed_at TIMESTAMP
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  emoji       VARCHAR(10),
  points_required INTEGER DEFAULT 0
);

-- User Badges
CREATE TABLE IF NOT EXISTS user_badges (
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  badge_id   INTEGER REFERENCES badges(id),
  earned_at  TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Seed tracks
INSERT INTO tracks (slug, name) VALUES
  ('scripting', 'Scripting'),
  ('networking', 'Networking')
ON CONFLICT (slug) DO NOTHING;

-- Seed badges
INSERT INTO badges (name, description, emoji, points_required) VALUES
  ('First Steps',  'Complete your first lesson', '⭐', 0),
  ('On Fire',      'Reach a 5 day streak',       '🔥', 0),
  ('Track Master', 'Complete a full track',       '🏆', 0),
  ('Dedicated',    'Reach a 30 day streak',       '💎', 0),
  ('Certified',    'Earn a voucher',              '🎓', 1000)
ON CONFLICT DO NOTHING;