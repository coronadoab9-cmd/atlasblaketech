export type IconName =
  | "browser"
  | "code"
  | "phone"
  | "spark"
  | "link"
  | "cloud"
  | "arrow"
  | "check"
  | "layers"
  | "ticket"
  | "truck"
  | "portal"
  | "chart"
  | "shield"
  | "users"
  | "menu"
  | "close"
  | "mail"
  | "map"
  | "clock";

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "browser":
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18"/><path d="M7 6h.01M10 6h.01"/></svg>;
    case "code":
      return <svg {...common}><path d="m8 9-3 3 3 3"/><path d="m16 9 3 3-3 3"/><path d="m14 5-4 14"/></svg>;
    case "phone":
      return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>;
    case "spark":
      return <svg {...common}><path d="m12 3-1.4 4.1a5 5 0 0 1-3.1 3.1L3.5 12l4 1.4a5 5 0 0 1 3.1 3.1L12 21l1.4-4.5a5 5 0 0 1 3.1-3.1l4-1.4-4-1.8a5 5 0 0 1-3.1-3.1L12 3Z"/></svg>;
    case "link":
      return <svg {...common}><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></svg>;
    case "cloud":
      return <svg {...common}><path d="M17.5 19H7a5 5 0 1 1 1.6-9.7A6 6 0 0 1 20 12a3.5 3.5 0 0 1-2.5 7Z"/></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
    case "layers":
      return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>;
    case "ticket":
      return <svg {...common}><path d="M4 6a2 2 0 0 0 0 4 2 2 0 0 1 0 4v4h16v-4a2 2 0 0 1 0-4 2 2 0 0 0 0-4V3H4v3Z"/><path d="M13 5v2M13 11v2M13 17v1"/></svg>;
    case "truck":
      return <svg {...common}><path d="M3 6h11v10H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
    case "portal":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg>;
    case "chart":
      return <svg {...common}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "users":
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case "map":
      return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  }
}
