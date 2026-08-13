import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import RegisterCustomerForm from "../customer/RegisterCustomerForm";

export const metadata = { title: "Join as a Customer" };

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="title">Be a Customer</h1>
      <RegisterCustomerForm />
      <div className="auth-options">
        <p className="btn btn-lg btn-secondary">
          <Link href="/auth/login">Already have an account?</Link>
        </p>
        <p className="btn btn-lg btn-secondary">
          <Link href="/auth/register/artisan">Want to be an artisan?</Link>
        </p>
        `
      </div>
      <Footer></Footer>
    </>
  );
}
