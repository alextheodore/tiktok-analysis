CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analysis_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    video_id VARCHAR(255),
    username VARCHAR(255),
    duration INTEGER,
    views INTEGER,
    hashtags TEXT[],
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hashtag_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    hashtag VARCHAR(255),
    total_videos INTEGER,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_logs (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(50),
    endpoint VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analysis_user ON analysis_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_hashtag_user ON hashtag_logs(user_id);
