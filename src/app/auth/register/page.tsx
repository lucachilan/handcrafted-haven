import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = { title: "Create an Account" };

export default async function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="container section">
        <h1 className="title">Join Handcrafted Haven</h1>
        <p className="subtitle">
          Create an account to shop handcrafted goods or sell your own.
        </p>

        <div className="auth-options">
          <div className="card card--pad">
            <h2 className="section-title">I want to shop</h2>
            <p className="text-muted">
              Discover handmade pieces and follow the makers you love.
            </p>
            <Link
              href="/auth/register/customer"
              className="btn btn-primary btn--block"
            >
              Create a customer account
            </Link>
          </div>

          <div className="card card--pad">
            <h2 className="section-title">I am an artisan</h2>
            <p className="text-muted">
              List your handmade products and build your profile.
            </p>
            <Link
              href="/auth/register/artisan"
              className="btn btn-secondary btn--block"
            >
              Create an artisan account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}