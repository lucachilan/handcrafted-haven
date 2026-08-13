import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = { title: "Sign Out" };

export default function LogoutPage() {
  return (
    <>
      <Navbar />
      <main className="container section">
        <section className="card card--pad">
          <span className="badge">Session Ended</span>
          <h1 className="title">You are now logged out</h1>
          <p className="subtitle">Thanks for visiting Handcrafted Haven.</p>

          <div className="auth-options">
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
