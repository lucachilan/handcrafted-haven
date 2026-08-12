import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/auth/form.module.css";

export default function LogoutPage() {
  return (
    <>
      <Navbar />
      <main className={`container ${styles.main}`}>
        <section className={`surface-card ${styles.card}`}>
          <span className="badge">Session Ended</span>
          <h1 className="title">You are now logged out</h1>
          <p className="subtitle">Thanks for visiting Handcrafted Haven.</p>

          <div className={`${styles.flex__vert} ${styles.authOptions}`}>
            <Link href="/" className="btn btn-lg btn-primary btn-center">
              Continue browsing
            </Link>
            <Link
              href="/auth/login"
              className="btn btn-lg btn-secondary btn-center"
            >
              Sign in again
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
