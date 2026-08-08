import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./logout.module.css";

export default function LogoutPage() {
  return (
    <>
      <Navbar />

      <main className={`container ${styles.main}`}>
        <section className={`surface-card ${styles.card}`}>
          <span className={styles.badge}>Session Ended</span>
          <h1 className={styles.title}>You are now logged out</h1>
          <p className={styles.subtitle}>
            Thanks for visiting Handcrafted Haven.
          </p>

          <div className={styles.actions}>
            <Link
              href="/auth/login"
              className="button button--primary button--subtle-lift"
            >
              Sign in again
            </Link>
            <Link href="/products" className={styles.secondaryLink}>
              Continue browsing
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
