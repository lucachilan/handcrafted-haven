import Image from "next/image";
import Link from "next/link";
import { Role, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import {
  updateCartItemAction,
  removeCartItemAction,
} from "@/actions/cart-act";
import { checkoutCartAction } from "@/actions/checkout-act";
import styles from "./page.module.css";

const PLACEHOLDER_IMAGE = "/product-placeholder.png";

export const metadata = { title: "My Cart" };

export default async function CustomerCartPage() {
  const user = await requireRole(Role.CUSTOMER);

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: {
            include: { images: { take: 1 } },
          },
        },
      },
    },
  });

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum, item) => sum.plus(item.product.price.mul(item.quantity)),
    new Prisma.Decimal(0),
  );

  return (
    <DashboardShell user={user} active="/dashboard/customer/cart">
      <h1 className="section-title">Your Cart</h1>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link href="/products" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {items.map((item) => {
              const lineTotal = item.product.price.mul(item.quantity);
              const imageUrl = item.product.images[0]?.url || PLACEHOLDER_IMAGE;
              const atMax = item.quantity >= item.product.stock;

              return (
                <li key={item.id} className={`card ${styles.row}`}>
                  <div className={styles.thumb}>
                    <Image
                      src={imageUrl}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className={styles.thumbImage}
                    />
                  </div>

                  <div className={styles.rowInfo}>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="card__title"
                    >
                      {item.product.name}
                    </Link>
                    <p className="card__price">
                      ${item.product.price.toString()}
                    </p>
                  </div>

                  <form
                    action={updateCartItemAction}
                    className={styles.qtyForm}
                  >
                    <input
                      type="hidden"
                      name="productId"
                      value={item.productId}
                    />
                    <button
                      type="submit"
                      name="quantity"
                      value={String(item.quantity - 1)}
                      className={styles.qtyBtn}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      type="submit"
                      name="quantity"
                      value={String(item.quantity + 1)}
                      className={styles.qtyBtn}
                      disabled={atMax}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </form>

                  <p className={styles.lineTotal}>${lineTotal.toString()}</p>

                  <form action={removeCartItemAction}>
                    <input
                      type="hidden"
                      name="productId"
                      value={item.productId}
                    />
                    <button
                      type="submit"
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      ✕
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>

          <aside className={`card ${styles.summary}`}>
            <h2 className="section-title">Order summary</h2>
            <dl className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <dt>Items</dt>
                <dd>
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>Subtotal</dt>
                <dd>${total.toString()}</dd>
              </div>
              <div className={styles.summaryRow}>
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <dt>Total</dt>
                <dd>${total.toString()}</dd>
              </div>
            </dl>

            <form action={checkoutCartAction}>
              <button type="submit" className="btn btn-primary btn--block">
                Checkout
              </button>
            </form>
            <Link href="/products" className="btn btn-secondary btn--block">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </DashboardShell>
  );
}