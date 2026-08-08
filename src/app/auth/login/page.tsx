import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import Hero from "@/components/Hero/Hero";
import Blank from "@/components/Blank";
import LoginForm from "./LoginForm";
import styles from "@/app/auth/form.module.css";
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
        <div className={styles.authOptions}>
          <p className={`btn btn-lg btn-secondary ${styles.otherAuth}`}>
            <Link href="/auth/register/customer">Create a new account</Link>
          </p>
          <p className={`btn btn-lg btn-secondary ${styles.otherAuth}`}>
            <Link href="/auth/register/artisan">Want to be an artisan?</Link>
          </p>
          `
        </div>
      </main>
      <Footer />
    </>
  );
}
