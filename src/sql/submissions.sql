CREATE TABLE submissions (
  submission_id SERIAL PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(session_id),
  submitter VARCHAR(50) NOT NULL,
  submission JSONB NOT NULL
);
