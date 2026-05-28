import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  mockCompany,
  mockCompanyUsers,
  mockDevices,
  mockDrivers,
  mockModules,
} from "../../data/mock-platform";
import type { CompanyUser, PlatformModule } from "../../types/company";
import type { Device, Driver } from "../../types/fleet";

export default function AdminDashboardPage() {
  const users = mockCompanyUsers;
  const drivers = mockDrivers;
  const devices = mockDevices;
  const enabledModules = mockModules;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              AtlasBlake Company Admin
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Manage company access, drivers, tablets, trucks, and purchased modules.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page is now reading from the shared AtlasBlake platform data
              layer. Later, this same page will connect to real company users,
              driver PINs, Android tablets, module access, and workspace settings.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard
              label="Company"
              value={mockCompany.name}
              subtext="First workspace"
            />
            <StatCard label="Users" value={users.length} subtext="Mock access" />
            <StatCard label="Drivers" value={drivers.length} subtext="Tablet-ready" />
            <StatCard label="Devices" value={devices.length} subtext="GPS tablets" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Company Users</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Future connection: login accounts, roles, module permissions,
                  and company workspace access.
                </p>
              </div>

              <div className="space-y-4">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Purchased Modules</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Future customers will only see the modules their company has
                  purchased.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {enabledModules.map((module) => (
                  <ModuleBadge key={module} module={module} />
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                <h3 className="font-bold">Future SaaS control</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This is where AtlasBlake can control whether a company has
                  access to dispatch, fleet, eTickets, reports, AI, billing, and
                  admin tools.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Drivers</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Future connection: driver PIN login, driver status, truck
                  assignments, and tablet access.
                </p>
              </div>

              <div className="space-y-4">
                {drivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Tablet Devices</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Future connection: Android device UUIDs, assigned trucks,
                  active drivers, and last GPS activity.
                </p>
              </div>

              <div className="space-y-4">
                {devices.map((device) => (
                  <DeviceCard key={device.device_uuid} device={device} />
                ))}
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Company Admin is what turns AtlasBlake from a single BTC system
              into a true SaaS platform. This is where each company will manage
              its own users, drivers, tablets, trucks, module access, and company
              settings.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext: string;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{subtext}</p>
    </div>
  );
}

function UserCard({ user }: { user: CompanyUser }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-white">{user.name}</p>
          <p className="mt-1 text-sm text-slate-400">{user.email}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-blue-300">
            {user.role}
          </p>
        </div>

        <span className="w-fit rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          {user.active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

function DriverCard({ driver }: { driver: Driver }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-white">{driver.name}</p>
          <p className="mt-1 text-sm text-slate-400">
            Truck {driver.truck_number || "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wider text-blue-300">
            Signed in: {driver.signed_in_at || "-"}
          </p>
        </div>

        <span className="w-fit rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          {driver.active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

function DeviceCard({ device }: { device: Device }) {
  const warning = device.last_seen_at?.includes("12");

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-white">{device.device_name}</p>
          <p className="mt-1 text-sm text-slate-400">
            {device.truck_number} • {device.driver_name}
          </p>
          <p className="mt-1 text-xs text-slate-500">{device.device_uuid}</p>
          <p className="mt-1 text-xs text-slate-500">
            Last seen: {device.last_seen_at}
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
            warning
              ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {warning ? "Check" : "Online"}
        </span>
      </div>
    </div>
  );
}

function ModuleBadge({ module }: { module: PlatformModule }) {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
      <p className="font-bold capitalize text-blue-200">
        {module.replace("_", " ")}
      </p>
      <p className="mt-1 text-xs text-slate-400">Enabled module</p>
    </div>
  );
}