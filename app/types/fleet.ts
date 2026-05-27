export type TruckStatus =
  | "Idle"
  | "At Plant"
  | "Loading"
  | "En Route"
  | "Arrived On Site"
  | "Pouring"
  | "Post Pour"
  | "Returning"
  | "Washed Out"
  | "Service"
  | string;

export type Truck = {
  id?: number;
  company_id?: string;

  truck_number: string;
  driver_id?: number;
  driver_name?: string;

  latitude?: number;
  longitude?: number;
  speed_mph?: number;

  status: TruckStatus;
  job_number?: string;
  customer_name?: string;
  address?: string;

  device_uuid?: string;
  last_updated?: string;
  created_at?: string;
  updated_at?: string;
};

export type TruckLocation = {
  id?: number;
  company_id?: string;

  truck_number: string;
  driver_id?: number;
  device_uuid?: string;

  latitude: number;
  longitude: number;
  speed_mph?: number;

  status?: TruckStatus;
  job_number?: string;

  recorded_at?: string;
};

export type Driver = {
  id: number;
  company_id?: string;

  name: string;
  pin?: string;
  active: boolean;

  truck_number?: string;
  device_uuid?: string;

  signed_in_at?: string;
  created_at?: string;
  updated_at?: string;
};

export type Device = {
  id?: number;
  company_id?: string;

  device_uuid: string;
  device_name?: string;
  truck_number?: string;

  driver_id?: number;
  driver_name?: string;

  active?: boolean;
  last_seen_at?: string;
};

export type CurrentJob = {
  company_id?: string;

  job_number: string;
  customer_name?: string;
  address?: string;

  ordered_qty?: number;
  delivered_qty?: number;

  status?: string;
};

export type FleetDashboardStats = {
  active_trucks: number;
  active_loads: number;
  en_route: number;
  pouring: number;
  exceptions: number;
};