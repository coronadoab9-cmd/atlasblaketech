import { apiFetch } from "./api";

import {
  mockAIInsights,
  mockAlerts,
  mockCompany,
  mockCompanyUsers,
  mockDevices,
  mockDispatchLoads,
  mockDispatchStats,
  mockETickets,
  mockFleetStats,
  mockModules,
  mockRecentActivity,
  mockReports,
  mockReportStats,
  mockTrucks,
  mockDrivers,
} from "../data/mock-platform";
import { PLATFORM_ENDPOINTS } from "./platform-endpoints";
import type { Company, CompanyUser, PlatformModule } from "../types/company";
import type { ETicket } from "../types/eticket";
import type { Truck, FleetDashboardStats, Driver, Device } from "../types/fleet";
import type { DispatchLoad, DispatchStats } from "../types/dispatch";
import type { ReportRow, ReportStats } from "../types/reports";
import type { AIInsight, DashboardAlert, RecentActivity } from "../types/dashboard";

type PlatformMode = "mock" | "live";

export const PLATFORM_MODE: PlatformMode =
  process.env.NEXT_PUBLIC_PLATFORM_MODE === "live" ? "live" : "mock";

async function safeApiFetch<T>(path: string, fallback: T): Promise<T> {
  if (PLATFORM_MODE === "mock") {
    return fallback;
  }

  try {
    return await apiFetch<T>(path);
  } catch (error) {
    console.warn(`AtlasBlake API fallback used for ${path}:`, error);
    return fallback;
  }
}

export async function getCompany(): Promise<Company> {
  return safeApiFetch<Company>("/api/platform/company", mockCompany);
}

export async function getCompanyModules(): Promise<PlatformModule[]> {
  return safeApiFetch<PlatformModule[]>("/api/platform/modules", mockModules);
}

export async function getCompanyUsers(): Promise<CompanyUser[]> {
  return safeApiFetch<CompanyUser[]>("/api/platform/users", mockCompanyUsers);
}

export async function getFleetStats(): Promise<FleetDashboardStats> {
  return safeApiFetch<FleetDashboardStats>("/api/fleet/stats", mockFleetStats);
}

export async function getTrucks(): Promise<Truck[]> {
  return safeApiFetch<Truck[]>("/api/fleet/trucks", mockTrucks);
}

export async function getDrivers(): Promise<Driver[]> {
  return safeApiFetch<Driver[]>("/api/fleet/drivers", mockDrivers);
}

export async function getDevices(): Promise<Device[]> {
  return safeApiFetch<Device[]>("/api/fleet/devices", mockDevices);
}

export async function getETickets(): Promise<ETicket[]> {
  return safeApiFetch<ETicket[]>("/api/etickets", mockETickets);
}

export async function getETicketByToken(token: string): Promise<ETicket | null> {
  if (PLATFORM_MODE === "mock") {
    return mockETickets.find((ticket) => ticket.token === token) || null;
  }

  return safeApiFetch<ETicket | null>(
    `/api/etickets/${encodeURIComponent(token)}`,
    mockETickets.find((ticket) => ticket.token === token) || null
  );
}

export async function getDispatchStats(): Promise<DispatchStats> {
  return safeApiFetch<DispatchStats>("/api/dispatch/stats", mockDispatchStats);
}

export async function getDispatchLoads(): Promise<DispatchLoad[]> {
  return safeApiFetch<DispatchLoad[]>("/api/dispatch/loads", mockDispatchLoads);
}

export async function getReportStats(): Promise<ReportStats> {
  return safeApiFetch<ReportStats>("/api/reports/stats", mockReportStats);
}

export async function getReports(): Promise<ReportRow[]> {
  return safeApiFetch<ReportRow[]>("/api/reports", mockReports);
}

export async function getAIInsights(): Promise<AIInsight[]> {
  return safeApiFetch<AIInsight[]>("/api/ai/insights", mockAIInsights);
}

export async function getAlerts(): Promise<DashboardAlert[]> {
  return safeApiFetch<DashboardAlert[]>("/api/platform/alerts", mockAlerts);
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  return safeApiFetch<RecentActivity[]>(
    "/api/platform/recent-activity",
    mockRecentActivity
  );
}