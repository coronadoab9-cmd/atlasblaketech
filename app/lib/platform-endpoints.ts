export const PLATFORM_ENDPOINTS = {
  company: "/api/platform/company",
  modules: "/api/platform/modules",
  users: "/api/platform/users",
  alerts: "/api/platform/alerts",
  recentActivity: "/api/platform/recent-activity",

  fleetStats: "/api/fleet/stats",
  trucks: "/api/fleet/trucks",
  drivers: "/api/fleet/drivers",
  devices: "/api/fleet/devices",

  etickets: "/api/etickets",
  eticketByToken: (token: string) =>
    `/api/etickets/${encodeURIComponent(token)}`,

  dispatchStats: "/api/dispatch/stats",
  dispatchLoads: "/api/dispatch/loads",

  reportStats: "/api/reports/stats",
  reports: "/api/reports",

  aiInsights: "/api/ai/insights",
} as const;