CREATE TABLE sessions (
    session_id UUID PRIMARY KEY NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('created', 'started', 'computing', 'finished')),
    value_name VARCHAR(50),
    description TEXT,
    interval_range NUMERIC,
    result JSONB
);
