export interface Session {
  sessionID: string; // The unique session ID
  status: "created" | "started" | "computing" | "finished"; // The current status of the session
  value?: string; // The name of the value
  unit?: string; // The unit of the value
  interval_range?: number; // The interval range
  result?: JSON; // The result of the session
}
