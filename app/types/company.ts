export type CompanyStatus =
  | "active"
  | "trial"
  | "paused"
  | "cancelled"
  | "suspended"
  | string;

export type UserRole =
  | "owner"
  | "admin"
  | "dispatcher"
  | "driver"
  | "manager"
  | "customer_viewer"
  | "support"
  | string;

export type PlatformModule =
  | "dispatch"
  | "etickets"
  | "fleet"
  | "reports"
  | "customers"
  | "ai_assistant"
  | "admin"
  | "billing"
  | string;

export type Company = {
  id: string;
  name: string;
  slug: string;

  status: CompanyStatus;

  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;

  contact_email?: string;
  support_email?: string;

  plan?: string;
  purchased_modules?: PlatformModule[];

  created_at?: string;
  updated_at?: string;
};

export type CompanyUser = {
  id: string;
  company_id: string;

  name: string;
  email: string;

  role: UserRole;
  active: boolean;

  allowed_modules?: PlatformModule[];

  created_at?: string;
  updated_at?: string;
};

export type ModuleAccess = {
  company_id: string;
  module: PlatformModule;
  enabled: boolean;

  plan_required?: string;
  enabled_at?: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;

  monthly_price?: number;
  annual_price?: number;

  included_modules: PlatformModule[];
  user_limit?: number;
  truck_limit?: number;
  ticket_limit?: number;

  active: boolean;
};

export type CompanyDashboardContext = {
  company: Company;
  user: CompanyUser;
  modules: ModuleAccess[];
};