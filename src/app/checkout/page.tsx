import Image from "next/image";
import Link from "next/link";
import { Role, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { checkoutCartAction } from "@/actions/checkout-act";
import styles from "./page.module.css";

const PLACEHOLDER_IMAGE = "/product-placeholder.png";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const user = await requireRole(Role.CUSTOMER);

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: { include: { images: { take: 1 } } },
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
    <>
      <Navbar />
      <main className="container section">
        <h1 className="section-title">Checkout</h1>

        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link href="/products" className="btn btn-primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={`card ${styles.itemsCard}`}>
              <h2 className="section-title">Items</h2>
              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <div className={styles.thumb}>
                      <Image
                        src={
                          item.product.images[0]?.url || PLACEHOLDER_IMAGE
                        }
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className={styles.thumbImage}
                      />
                    </div>
                    <span className={styles.itemName}>
                      {item.product.name}
                    </span>
                    <span className={styles.itemQty}>× {item.quantity}</span>
                    <span className={styles.itemTotal}>
                      ${item.product.price.mul(item.quantity).toString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className={`card ${styles.summary}`}>
              <h2 className="section-title">Order summary</h2>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.total}>${total.toString()}</span>
              </div>
              <form action={checkoutCartAction}>
                <button type="submit" className="btn btn-primary btn--block">
                  Place order
                </button>
              </form>
              <Link
                href="/dashboard/customer/cart"
                className="btn btn-secondary btn--block"
              >
                Back to cart
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}