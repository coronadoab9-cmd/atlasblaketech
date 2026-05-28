export type ReportStatus =
  | "Ready"
  | "Processing"
  | "Needs Review"
  | "Failed"
  | string;

export type ReportRow = {
  id: string;
  company_id?: string;

  report_name: string;
  module: string;
  period: string;

  status: ReportStatus;
  last_generated: string;

  file_url?: string;
  created_at?: string;
};

export type ReportStats = {
  reports_today: number;
  ready: number;
  processing: number;
  needs_review: number;
};