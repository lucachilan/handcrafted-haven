import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface SuccessPageProps {
  searchParams: Promise<{
    message?: string;
    redirect?: string;
    buttonText?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const message =
    params.message || "Your changes have been saved successfully.";
  const redirectPath = params.redirect || "/products";
  const buttonText = params.buttonText || "Return to Dashboard";

  return (
    <>
      <Navbar />
      <main className="container section">
        <section className="card card--pad">
          <span className="badge">Success</span>
          <h1 className={`title`}>{message}</h1>
          <Link
            href={redirectPath}
            className={`btn btn-secondary btn-lg btn-center`}
          >
            {buttonText}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
