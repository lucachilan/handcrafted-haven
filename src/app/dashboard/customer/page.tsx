import Link from "next/link";
import { Role, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import styles from "./page.module.css";

export const metadata = { title: "My Dashboard" };

export default async function CustomerDashboardPage() {
  const user = await requireRole(Role.CUSTOMER);

  const [cart, orderSummary] = await Promise.all([
    prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    }),
    prisma.order.aggregate({
      where: { userId: user.id },
      _count: true,
      _sum: { total: true },
    }),
  ]);

  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const ordersCount = orderSummary._count;
  const totalSpent = orderSummary._sum.total ?? new Prisma.Decimal(0);

  const statCards = [
    {
      label: "Cart items",
      value: String(itemCount),
      href: "/dashboard/customer/cart",
      cta: "View cart",
    },
    {
      label: "Orders",
      value: String(ordersCount),
      href: "/dashboard/customer/orders",
      cta: "View orders",
    },
    {
      label: "Total spent",
      value: `$${totalSpent.toString()}`,
      href: "/dashboard/customer/orders",
      cta: "Order history",
    },
  ];

  return (
    <DashboardShell user={user} active="/dashboard/customer">
      <h1 className="section-title">Welcome back, {user.name ?? "there"}!</h1>
      <p className="text-muted">
        Manage your cart, check your orders, and keep your account up to date.
      </p>

      <div className={styles.grid}>
        {statCards.map((card) => (
          <div key={card.label} className={`card card--hover ${styles.card}`}>
            <span className="eyebrow">{card.label}</span>
            <p className={styles.cardValue}>{card.value}</p>
            <Link href={card.href} className="btn btn-secondary">
              {card.cta}
            </Link>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}