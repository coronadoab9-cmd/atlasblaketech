export type ETicketStatus =
  | "pending"
  | "signed"
  | "rejected"
  | "archived"
  | "completed";

export type TicketAcceptance =
  | "Accepted Delivery"
  | "Rejected Delivery"
  | string;

export type ETicket = {
  id: number;
  company_id?: string;
  token: string;

  ticket_number: string;
  customer_name: string;
  customer_email?: string;

  job_number?: string;
  order_number?: string;
  address?: string;
  plant?: string;

  truck_number: string;
  driver_id?: number;
  driver_name?: string;

  product?: string;
  mix_number?: string;
  mix_description?: string;
  quantity?: number;

  delivered_qty_total?: number;
  order_total?: number;

  status: ETicketStatus | string;

  load_time?: string;
  signed_at?: string;

  water_allowed?: number;
  qc_water_added?: number;
  customer_water_added?: number;
  water_added?: number;

  curb_line_status?: string;
  curb_line_signed_at?: string;
  curb_line_signature_data_url?: string;

  signature_data_url?: string;
  photo_data_url?: string;

  latitude?: number;
  longitude?: number;

  ticket_acceptance?: TicketAcceptance;
  rejection_reason?: string;

  batch_weights_qr_url?: string;
  terms_qr_url?: string;

  pdf_url?: string;

  assigned_to_type?: string;
  assigned_to_id?: string;
  assigned_to_name?: string;
  assigned_at?: string;
  assigned_by?: string;

  created_at?: string;
  updated_at?: string;
};

export type ETicketListResponse = ETicket[];

export type SignETicketPayload = {
  name: string;
  latitude: number;
  longitude: number;

  water_choice?: string;
  water_added?: string | number;
  qc_water_added?: string | number;
  customer_water_added?: string | number;

  curb_line_status?: string;
  curb_line_signature_data_url?: string;
  curb_line_signed_at?: string;

  ticket_acceptance?: string;
  rejection_reason?: string;

  signature_data_url: string;
  photo_data_url?: string;

  terms_qr_url?: string;
  load_time?: string;
};

export type CreateETicketPayload = {
  company_id?: string;

  ticket_number: string;
  customer_name: string;
  customer_email?: string;

  job_number?: string;
  order_number?: string;
  address?: string;
  plant?: string;

  truck_number: string;

  product?: string;
  mix_number?: string;
  mix_description?: string;

  quantity?: number;
  delivered_qty_total?: number;
  order_total?: number;

  load_time?: string;
};