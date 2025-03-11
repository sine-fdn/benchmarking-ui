CREATE TABLE submissions (
  submission_id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(session_id),
  party INT NOT NULL CHECK (party BETWEEN 0 AND 2),
  alias VARCHAR(50) NOT NULL
);
