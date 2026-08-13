import { Role, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import styles from "./page.module.css";

const STATUS_PILL: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "pill pill--warning",
  [OrderStatus.CONFIRMED]: "pill pill--success",
  [OrderStatus.SHIPPED]: "pill pill--neutral",
  [OrderStatus.DELIVERED]: "pill pill--success",
  [OrderStatus.CANCELLED]: "pill pill--danger",
};

export const metadata = { title: "My Orders" };

export default async function CustomerOrdersPage() {
  const user = await requireRole(Role.CUSTOMER);

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return (
    <DashboardShell user={user} active="/dashboard/customer/orders">
      <h1 className="section-title">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.id} className={`card ${styles.order}`}>
              <div className={styles.orderHeader}>
                <span className={styles.orderNumber}>
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </span>
                <span className={STATUS_PILL[order.status]}>{order.status}</span>
              </div>

              <ul className={styles.items}>
                {order.items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <span>
                      {item.product.name}{" "}
                      <span className={styles.qty}>× {item.quantity}</span>
                    </span>
                    <span className={styles.itemTotal}>
                      ${item.priceAtPurchase.mul(item.quantity).toString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.orderFooter}>
                <span>Total</span>
                <span className={styles.total}>${order.total.toString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}