import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import Hero from "@/components/Hero/Hero";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section>
          <h1 className="title">Login</h1>
        </section>
        <div></div>
        <LoginForm />
        <div className="auth-options">
          <p className="btn btn-lg btn-secondary">
            <Link href="/auth/register/customer">Create a new account</Link>
          </p>
          <p className="btn btn-lg btn-secondary">
            <Link href="/auth/register/artisan">Want to be an artisan?</Link>
          </p>
          `
        </div>
      </main>
      <Footer />
    </>
  );
}
