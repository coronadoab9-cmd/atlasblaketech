import type { ETicket } from "./eticket";
import type { Truck } from "./fleet";
import type { Company } from "./company";

export type DashboardMetric = {
  label: string;
  value: string | number;
  change?: string;
  status?: "good" | "warning" | "danger" | "neutral";
};

export type DashboardAlert = {
  id: string;
  company_id?: string;

  title: string;
  message: string;

  severity: "info" | "warning" | "critical" | "success";
  module?: "dispatch" | "etickets" | "fleet" | "reports" | "ai" | string;

  created_at?: string;
  resolved_at?: string;
};

export type RecentActivity = {
  id: string;
  company_id?: string;

  title: string;
  description?: string;

  module?: string;
  actor_name?: string;

  created_at?: string;
};

export type OperationsSummary = {
  company: Company;

  metrics: DashboardMetric[];

  active_trucks: Truck[];
  recent_tickets: ETicket[];
  alerts: DashboardAlert[];
  recent_activity: RecentActivity[];
};

export type AIInsight = {
  id: string;
  company_id?: string;

  title: string;
  summary: string;

  confidence?: number;
  category:
    | "ticket_exception"
    | "late_delivery"
    | "missing_data"
    | "fleet_performance"
    | "reporting"
    | "general"
    | string;

  recommended_action?: string;

  created_at?: string;
};