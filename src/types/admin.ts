export type AppStatus = "pending" | "approved" | "rejected";
export type StatusFilter = "all" | AppStatus;

export interface ApplicationRow {
  id: string;
  user_id: string;
  status: AppStatus;
  created_at: string;
  decision_message: string | null; // ← جدید
  decided_at: string | null;       // ← جدید (timestamptz)
  decided_by: string | null;       // ← جدید (uuid)
}

export interface PersonalNameRow {
  user_id: string;
  last_name: string | null;
}

export interface ApplicationWithName extends ApplicationRow {
  last_name: string | null;
}


export type DecisionStatus = Exclude<AppStatus, "pending">;