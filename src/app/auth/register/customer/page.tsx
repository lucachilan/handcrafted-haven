import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import Hero from "@/components/Hero/Hero";
import styles from "@/app/auth/form.module.css";
import Link from "next/link";
import RegisterCustomerForm from "../customer/RegisterCustomerForm";

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="title">Be a Customer</h1>
      <RegisterCustomerForm />
      <div className={styles.authOptions}>
        <p className={`btn btn-lg btn-secondary ${styles.otherAuth}`}>
          <Link href="/auth/login">Already have an account?</Link>
        </p>
        <p className={`btn btn-lg btn-secondary ${styles.otherAuth}`}>
          <Link href="/auth/register/artisan">Want to be an artisan?</Link>
        </p>
        `
      </div>
      <Footer></Footer>
    </>
  );
}
