export type DispatchLoadStatus =
  | "Scheduled"
  | "Assigned"
  | "Loading"
  | "En Route"
  | "On Site"
  | "Pouring"
  | "Completed"
  | "Delayed"
  | "Cancelled"
  | string;

export type DispatchLoad = {
  id: string;
  company_id?: string;

  order_number: string;
  customer_name: string;
  job_number: string;

  plant?: string;
  truck_number: string;
  driver_name?: string;

  mix: string;
  quantity: number;

  status: DispatchLoadStatus;
  scheduled_time: string;

  ticket_token?: string;
  ticket_number?: string;

  created_at?: string;
  updated_at?: string;
};

export type DispatchStats = {
  scheduled_loads: number;
  dispatched: number;
  on_site: number;
  needs_attention: number;
};