import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Blank from "@/components/Blank";
import styles from "./page.module.css";

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
      <main className={`container ${styles.main}`}>
        <section className={`surface-card ${styles.card}`}>
          <span className="section-label">Success</span>
          <h1 className={`page-title ${styles.title}`}>{message}</h1>
          <Link
            href={redirectPath}
            className={`button button--primary button--subtle-lift ${styles.button}`}
          >
            {buttonText}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
