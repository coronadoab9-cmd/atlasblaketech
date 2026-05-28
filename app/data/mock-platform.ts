import type { Company, CompanyUser, PlatformModule } from "../types/company";
import type { Truck, FleetDashboardStats, Driver, Device } from "../types/fleet";
import type { ETicket } from "../types/eticket";
import type { DashboardAlert, RecentActivity, AIInsight } from "../types/dashboard";
import type { DispatchLoad, DispatchStats } from "../types/dispatch";
import type { ReportRow, ReportStats } from "../types/reports";


export const mockCompany: Company = {
  id: "btc",
  name: "Big Town Concrete",
  slug: "big-town-concrete",
  status: "active",
  contact_email: "operations@bigtownconcrete.com",
  support_email: "support@bigtownconcrete.com",
  plan: "Operations",
  purchased_modules: [
    "dispatch",
    "fleet",
    "etickets",
    "reports",
    "ai_assistant",
    "admin",
  ],
};

export const mockModules: PlatformModule[] = [
  "dispatch",
  "fleet",
  "etickets",
  "reports",
  "ai_assistant",
  "admin",
];

export const mockCompanyUsers: CompanyUser[] = [
  {
    id: "user-001",
    company_id: "btc",
    name: "Operations Admin",
    email: "admin@company.com",
    role: "admin",
    active: true,
    allowed_modules: ["dispatch", "fleet", "etickets", "reports", "admin"],
  },
  {
    id: "user-002",
    company_id: "btc",
    name: "Dispatcher",
    email: "dispatch@company.com",
    role: "dispatcher",
    active: true,
    allowed_modules: ["dispatch", "fleet", "etickets"],
  },
  {
    id: "user-003",
    company_id: "btc",
    name: "Manager",
    email: "manager@company.com",
    role: "manager",
    active: true,
    allowed_modules: ["fleet", "etickets", "reports"],
  },
];

export const mockFleetStats: FleetDashboardStats = {
  active_trucks: 3,
  active_loads: 7,
  en_route: 1,
  pouring: 0,
  exceptions: 1,
};

export const mockTrucks: Truck[] = [
  {
    company_id: "btc",
    truck_number: "BTS-01A",
    driver_name: "Driver Assigned",
    status: "En Route",
    speed_mph: 48,
    job_number: "JOB-1048",
    customer_name: "Customer Site",
    address: "Dallas, TX",
    last_updated: "2 min ago",
  },
  {
    company_id: "btc",
    truck_number: "BTS-002",
    driver_name: "Driver Assigned",
    status: "Loading",
    speed_mph: 0,
    job_number: "JOB-1051",
    customer_name: "Commercial Pour",
    address: "Irving, TX",
    last_updated: "4 min ago",
  },
  {
    company_id: "btc",
    truck_number: "BTS-003",
    driver_name: "Driver Assigned",
    status: "Arrived On Site",
    speed_mph: 0,
    job_number: "JOB-1054",
    customer_name: "Project Location",
    address: "Sherman, TX",
    last_updated: "1 min ago",
  },
];

export const mockDrivers: Driver[] = [
  {
    id: 1,
    company_id: "btc",
    name: "Driver Assigned",
    active: true,
    truck_number: "BTS-01A",
    signed_in_at: "Today, 7:45 AM",
  },
  {
    id: 2,
    company_id: "btc",
    name: "Driver Assigned",
    active: true,
    truck_number: "BTS-002",
    signed_in_at: "Today, 8:00 AM",
  },
  {
    id: 3,
    company_id: "btc",
    name: "Driver Assigned",
    active: true,
    truck_number: "BTS-003",
    signed_in_at: "Today, 8:20 AM",
  },
];

export const mockDevices: Device[] = [
  {
    company_id: "btc",
    device_uuid: "tablet-bts-01a",
    device_name: "BTC Tablet 01",
    truck_number: "BTS-01A",
    driver_name: "Driver Assigned",
    active: true,
    last_seen_at: "2 min ago",
  },
  {
    company_id: "btc",
    device_uuid: "tablet-bts-002",
    device_name: "BTC Tablet 02",
    truck_number: "BTS-002",
    driver_name: "Driver Assigned",
    active: true,
    last_seen_at: "4 min ago",
  },
  {
    company_id: "btc",
    device_uuid: "tablet-bts-003",
    device_name: "BTC Tablet 03",
    truck_number: "BTS-003",
    driver_name: "Driver Assigned",
    active: true,
    last_seen_at: "12 min ago",
  },
];

export const mockETickets: ETicket[] = [
  {
    id: 1,
    company_id: "btc",
    token: "sample-ticket-1001",
    ticket_number: "1001",
    customer_name: "Customer Site",
    job_number: "JOB-1048",
    truck_number: "BTS-01A",
    driver_name: "Driver Assigned",
    mix_number: "3000",
    mix_description: "Ready Mix Concrete",
    quantity: 10,
    status: "pending",
    load_time: "Today, 8:15 AM",
    water_allowed: 2,
  },
  {
    id: 2,
    company_id: "btc",
    token: "sample-ticket-1002",
    ticket_number: "1002",
    customer_name: "Commercial Pour",
    job_number: "JOB-1051",
    truck_number: "BTS-002",
    driver_name: "Driver Assigned",
    mix_number: "3500",
    mix_description: "Ready Mix Concrete",
    quantity: 9,
    status: "signed",
    load_time: "Today, 9:05 AM",
    signed_at: "Today, 9:42 AM",
  },
  {
    id: 3,
    company_id: "btc",
    token: "sample-ticket-1003",
    ticket_number: "1003",
    customer_name: "Project Location",
    job_number: "JOB-1054",
    truck_number: "BTS-003",
    driver_name: "Driver Assigned",
    mix_number: "4000",
    mix_description: "Ready Mix Concrete",
    quantity: 11,
    status: "rejected",
    load_time: "Today, 10:20 AM",
    rejection_reason: "Slump",
  },
];

export const mockAlerts: DashboardAlert[] = [
  {
    id: "alert-001",
    company_id: "btc",
    title: "Missing customer signature",
    message: "Ticket #1001 is still pending customer acceptance.",
    severity: "warning",
    module: "etickets",
    created_at: "5 min ago",
  },
  {
    id: "alert-002",
    company_id: "btc",
    title: "Tablet check needed",
    message: "BTC Tablet 03 has not checked in recently.",
    severity: "info",
    module: "fleet",
    created_at: "12 min ago",
  },
];

export const mockRecentActivity: RecentActivity[] = [
  {
    id: "activity-001",
    company_id: "btc",
    title: "Truck BTS-01A went en route",
    description: "GPS tracking updated the truck status.",
    module: "fleet",
    actor_name: "System",
    created_at: "2 min ago",
  },
  {
    id: "activity-002",
    company_id: "btc",
    title: "Ticket #1002 signed",
    description: "Customer signature was completed.",
    module: "etickets",
    actor_name: "Driver Assigned",
    created_at: "18 min ago",
  },
  {
    id: "activity-003",
    company_id: "btc",
    title: "Ticket #1003 rejected",
    description: "Rejected delivery reason: Slump.",
    module: "etickets",
    actor_name: "Customer",
    created_at: "30 min ago",
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: "ai-001",
    company_id: "btc",
    title: "Possible late delivery",
    summary: "Truck BTS-003 has been on site longer than the normal delivery window.",
    confidence: 0.82,
    category: "late_delivery",
    recommended_action: "Review job status and confirm whether the ticket has been signed.",
    created_at: "2 min ago",
  },
  {
    id: "ai-002",
    company_id: "btc",
    title: "Missing customer signature",
    summary: "Ticket #1001 has GPS activity but no completed customer signature.",
    confidence: 0.91,
    category: "ticket_exception",
    recommended_action: "Notify the driver or dispatcher to complete the eTicket workflow.",
    created_at: "5 min ago",
  },
];
export const mockDispatchStats: DispatchStats = {
  scheduled_loads: 12,
  dispatched: 7,
  on_site: 3,
  needs_attention: 1,
};

export const mockDispatchLoads: DispatchLoad[] = [
  {
    id: "load-1001",
    company_id: "btc",
    order_number: "ORD-2048",
    customer_name: "Customer Site",
    job_number: "JOB-1048",
    plant: "BTS-01A",
    truck_number: "BTS-01A",
    driver_name: "Driver Assigned",
    mix: "3000 PSI",
    quantity: 10,
    status: "En Route",
    scheduled_time: "8:15 AM",
    ticket_token: "sample-ticket-1001",
    ticket_number: "1001",
  },
  {
    id: "load-1002",
    company_id: "btc",
    order_number: "ORD-2051",
    customer_name: "Commercial Pour",
    job_number: "JOB-1051",
    plant: "BTS-002",
    truck_number: "BTS-002",
    driver_name: "Driver Assigned",
    mix: "3500 PSI",
    quantity: 9,
    status: "Loading",
    scheduled_time: "9:05 AM",
    ticket_token: "sample-ticket-1002",
    ticket_number: "1002",
  },
  {
    id: "load-1003",
    company_id: "btc",
    order_number: "ORD-2054",
    customer_name: "Project Location",
    job_number: "JOB-1054",
    plant: "BTS-003",
    truck_number: "BTS-003",
    driver_name: "Driver Assigned",
    mix: "4000 PSI",
    quantity: 11,
    status: "On Site",
    scheduled_time: "10:20 AM",
    ticket_token: "sample-ticket-1003",
    ticket_number: "1003",
  },
];

export const mockReportStats: ReportStats = {
  reports_today: 4,
  ready: 2,
  processing: 1,
  needs_review: 1,
};

export const mockReports: ReportRow[] = [
  {
    id: "report-001",
    company_id: "btc",
    report_name: "Daily Dispatch Summary",
    module: "Dispatch",
    period: "Today",
    status: "Ready",
    last_generated: "Today, 4:15 PM",
  },
  {
    id: "report-002",
    company_id: "btc",
    report_name: "Signed eTicket Export",
    module: "eTickets",
    period: "Today",
    status: "Ready",
    last_generated: "Today, 4:10 PM",
  },
  {
    id: "report-003",
    company_id: "btc",
    report_name: "Fleet Activity Summary",
    module: "Fleet",
    period: "Today",
    status: "Processing",
    last_generated: "Today, 3:55 PM",
  },
  {
    id: "report-004",
    company_id: "btc",
    report_name: "Rejected Delivery Exceptions",
    module: "eTickets",
    period: "This Week",
    status: "Needs Review",
    last_generated: "Today, 2:40 PM",
  },
];