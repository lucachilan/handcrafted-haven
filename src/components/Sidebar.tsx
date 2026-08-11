import Link from "next/link";
import { Role } from "@prisma/client";
import { homeForRole } from "@/lib/auth";

interface SidebarProps {
  role: Role;
}

interface NavLink {
  label: string;
  href: string;
}

function getLinks(role: Role): NavLink[] {
  const base: NavLink[] = [{ label: "Dashboard", href: homeForRole(role) }];

  if (role === Role.ADMIN) {
    return [
      ...base,
      { label: "Products", href: "/dashboard/admin/products" },
      { label: "Users", href: "/dashboard/admin/users" },
    ];
  }

  if (role === Role.ARTISAN) {
    return [
      ...base,
      { label: "Products", href: "/dashboard/artisan/products" },
    ];
  }

  if (role === Role.CUSTOMER) {
    return [
      ...base,
      { label: "Cart", href: "/dashboard/customer/cart" },
      { label: "Orders", href: "/dashboard/customer/orders" },
      { label: "Checkout", href: "/dashboard/customer/checkout" },
    ];
  }

  return base;
}

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  ARTISAN: "Artisan",
  CUSTOMER: "Customer",
};

const ROLE_COLORS: Record<Role, string> = {
  ADMIN: "#dc2626",
  ARTISAN: "#d97706",
  CUSTOMER: "#16a34a",
};

export default function Sidebar({ role }: SidebarProps) {
  const links = getLinks(role);

  return (
    <aside
      style={{
        width: "16rem",
        minHeight: "100vh",
        background: "var(--color-secondary)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "1.75rem 1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.35rem",
            color: "var(--color-primary)",
            letterSpacing: "0.02em",
            display: "block",
            lineHeight: 1.2,
          }}
        >
          Handcrafted Haven
        </span>
        {/* Role badge */}
        <span
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            padding: "0.15rem 0.6rem",
            borderRadius: "999px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            background: ROLE_COLORS[role],
          }}
        >
          {ROLE_LABELS[role]}
        </span>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: "1rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "block",
              padding: "0.6rem 0.85rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
            className="sidebar-link"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div
        style={{
          padding: "1rem 0.75rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Link
          href="/auth/logout"
          style={{
            display: "block",
            padding: "0.6rem 0.85rem",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
          className="sidebar-link"
        >
          ← Logout
        </Link>
      </div>

      <style>{`
        .sidebar-link:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
      `}</style>
    </aside>
  );
}
