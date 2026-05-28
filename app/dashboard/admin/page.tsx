import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getCompany,
  getCompanyModules,
  getCompanyUsers,
  getDevices,
  getDrivers,
} from "../../lib/platform-api";

export default async function AdminDashboardPage() {
  const [company, modules, users, devices, drivers] = await Promise.all([
    getCompany(),
    getCompanyModules(),
    getCompanyUsers(),
    getDevices(),
    getDrivers(),
  ]);

  const activeUsers = users.filter((user) => user.active).length;
  const activeDrivers = drivers.filter((driver) => driver.active).length;
  const activeDevices = devices.filter((device) => device.active !== false).length;

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
              Manage company users, drivers, devices, modules, and workspace settings.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              This page now reads through the AtlasBlake platform API layer.
              For now, it still uses mock data behind the scenes. Later, this
              same page can manage real company workspaces, users, drivers,
              tablets, and module access.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <StatCard label="Company" value={company.name} />
            <StatCard label="Active Users" value={activeUsers} />
            <StatCard label="Active Drivers" value={activeDrivers} />
            <StatCard label="Active Devices" value={activeDevices} />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Company Users</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    API source path: company users, roles, and module permissions.
                  </p>
                </div>

                <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                  API Layer
                </span>
              </div>

              <div className="space-y-4">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    active={user.active}
                    modules={user.allowed_modules || []}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Workspace Settings</h2>

              <div className="mt-6 space-y-4">
                <SettingRow label="Company Name" value={company.name} />
                <SettingRow label="Company Slug" value={company.slug} />
                <SettingRow label="Status" value={company.status} />
                <SettingRow label="Plan" value={company.plan || "Not set"} />
                <SettingRow
                  label="Contact Email"
                  value={company.contact_email || "Not set"}
                />
                <SettingRow
                  label="Support Email"
                  value={company.support_email || "Not set"}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                  Purchased Modules
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {modules.map((module) => (
                    <span
                      key={module}
                      className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold capitalize text-blue-300"
                    >
                      {module.replaceAll("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Drivers</h2>

              <p className="mt-2 text-sm text-slate-400">
                Future connection: driver PINs, assigned trucks, tablet sessions,
                and GPS tracking.
              </p>

              <div className="mt-6 space-y-4">
                {drivers.map((driver) => (
                  <DriverCard
                    key={driver.id}
                    name={driver.name}
                    truckNumber={driver.truck_number || "-"}
                    active={driver.active}
                    signedInAt={driver.signed_in_at || "-"}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#12315F] bg-[#071225] p-6 shadow-2xl shadow-blue-950/20">
              <h2 className="text-2xl font-bold">Devices</h2>

              <p className="mt-2 text-sm text-slate-400">
                Future connection: Android tablets, device UUIDs, assigned trucks,
                and last-seen tracking.
              </p>

              <div className="mt-6 space-y-4">
                {devices.map((device) => (
                  <DeviceCard
                    key={device.device_uuid}
                    deviceName={device.device_name || "Unnamed Device"}
                    deviceUuid={device.device_uuid}
                    truckNumber={device.truck_number || "-"}
                    driverName={device.driver_name || "-"}
                    active={device.active !== false}
                    lastSeenAt={device.last_seen_at || "-"}
                  />
                ))}
              </div>
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Why this page matters</h2>

            <p className="mt-4 max-w-4xl text-slate-300">
              Admin controls are what make AtlasBlake a multi-company platform.
              Each company can have its own users, roles, trucks, drivers,
              tablets, modules, and settings while still using the same core
              system.
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
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-[#12315F] bg-[#071225] p-5">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function UserCard({
  name,
  email,
  role,
  active,
  modules,
}: {
  name: string;
  email: string;
  role: string;
  active: boolean;
  modules: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{email}</p>
        </div>

        <StatusBadge active={active} />
      </div>

      <p className="mt-4 text-sm capitalize text-blue-300">
        Role: {role.replaceAll("_", " ")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {modules.map((module) => (
          <span
            key={module}
            className="rounded-full border border-slate-700 bg-[#071225] px-3 py-1 text-xs capitalize text-slate-300"
          >
            {module.replaceAll("_", " ")}
          </span>
        ))}
      </div>
    </div>
  );
}

function DriverCard({
  name,
  truckNumber,
  active,
  signedInAt,
}: {
  name: string;
  truckNumber: string;
  active: boolean;
  signedInAt: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">Truck: {truckNumber}</p>
        </div>

        <StatusBadge active={active} />
      </div>

      <p className="mt-3 text-xs text-slate-500">Signed in: {signedInAt}</p>
    </div>
  );
}

function DeviceCard({
  deviceName,
  deviceUuid,
  truckNumber,
  driverName,
  active,
  lastSeenAt,
}: {
  deviceName: string;
  deviceUuid: string;
  truckNumber: string;
  driverName: string;
  active: boolean;
  lastSeenAt: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1730] p-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="font-bold text-white">{deviceName}</h3>
          <p className="mt-1 text-xs text-slate-500">{deviceUuid}</p>
        </div>

        <StatusBadge active={active} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-400">
        <p>Truck: {truckNumber}</p>
        <p>Driver: {driverName}</p>
        <p>Last seen: {lastSeenAt}</p>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-800 bg-[#0B1730] p-4 md:flex-row md:items-center">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
        active
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          : "border-slate-500/40 bg-slate-500/10 text-slate-300"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}