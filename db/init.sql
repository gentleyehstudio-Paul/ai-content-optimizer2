CREATE TABLE IF NOT EXISTS venues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(300),
  address VARCHAR(500),
  contact VARCHAR(200),
  website VARCHAR(500),
  portaly_url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS facilitators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  title VARCHAR(200),
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  contact VARCHAR(200),
  website VARCHAR(500),
  portaly_url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS herbals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  origin VARCHAR(200),
  usage_notes TEXT,
  supplier VARCHAR(200),
  website VARCHAR(500),
  portaly_url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  origin VARCHAR(200),
  season VARCHAR(100),
  supplier VARCHAR(200),
  website VARCHAR(500),
  portaly_url VARCHAR(500),
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venues_featured ON venues(featured);
CREATE INDEX IF NOT EXISTS idx_facilitators_featured ON facilitators(featured);
CREATE INDEX IF NOT EXISTS idx_herbals_featured ON herbals(featured);
CREATE INDEX IF NOT EXISTS idx_ingredients_featured ON ingredients(featured);
