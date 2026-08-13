import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import RegisterArtisanForm from "../artisan/RegisterArtisanForm";

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="title">Be a Artisan</h1>
      <RegisterArtisanForm />
      <div className="auth-options">
        <p className="btn btn-lg btn-secondary">
          <Link href="/auth/login">Already have an account?</Link>
        </p>
        <p className="btn btn-lg btn-secondary">
          <Link href="/auth/register/customer">Want to buy cute things?</Link>
        </p>
        `
      </div>
      <Footer></Footer>
    </>
  );
}
