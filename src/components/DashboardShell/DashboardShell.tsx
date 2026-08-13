import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Role } from "@prisma/client";
import styles from "./DashboardShell.module.css";

interface Tab {
  label: string;
  href: string;
}

const TABS_BY_ROLE: Record<Role, Tab[]> = {
  [Role.CUSTOMER]: [
    { label: "Dashboard", href: "/dashboard/customer" },
    { label: "Cart", href: "/dashboard/customer/cart" },
    { label: "Orders", href: "/dashboard/customer/orders" },
    { label: "Settings", href: "/dashboard/customer/settings" },
  ],
  [Role.ARTISAN]: [
    { label: "Products", href: "/dashboard/artisan/products" },
    { label: "Profile", href: "/dashboard/artisan/profile" },
  ],
  [Role.ADMIN]: [
    { label: "Products", href: "/dashboard/admin/products" },
    { label: "Users", href: "/dashboard/admin/users" },
  ],
};

interface DashboardShellProps {
  user: { role: Role };
  active: string;
  children: React.ReactNode;
}

export default function DashboardShell({
  user,
  active,
  children,
}: DashboardShellProps) {
  const tabs = TABS_BY_ROLE[user.role] ?? [];

  return (
    <>
      <Navbar />
      <main className="container section">
        <nav className={styles.tabs} aria-label="Dashboard navigation">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`${styles.tab} ${
                tab.href === active ? styles.tabActive : ""
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        {children}
      </main>
      <Footer />
    </>
  );
}
