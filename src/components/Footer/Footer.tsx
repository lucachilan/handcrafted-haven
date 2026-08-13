import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const columns = [
  {
    heading: "Shop",
    links: [
      {
        label: "Ceramics & Pottery",
        href: `/products?category=${encodeURIComponent("Ceramics & Pottery")}`,
      },
      {
        label: "Textiles & Living",
        href: `/products?category=${encodeURIComponent("Textiles & Living")}`,
      },
      {
        label: "Leather Goods",
        href: `/products?category=${encodeURIComponent("Leather Goods")}`,
      },
      {
        label: "Woodworking",
        href: `/products?category=${encodeURIComponent("Woodworking")}`,
      },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Artisans", href: "/artisans" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/auth/login" },
      { label: "Orders", href: "/dashboard/customer/orders" },
      { label: "Settings", href: "/dashboard/customer/settings" },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/large-logo.webp"
              alt="Handcrafted Haven Logo"
              width={250}
              height={80}
              unoptimized
              priority
            />
          </Link>
        </div>
        <nav className={styles.cols} aria-label="Footer Navigation">
          {columns.map((col) => (
            <div key={col.heading} className={styles.col}>
              <h3 className={styles.colHeading}>{col.heading}</h3>
              <ul>
                {col.links.map((link, index) => (
                  <li key={link.label ? link.label : `link-${index}`}>
                    <Link href={link.href || "#"}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className={`container ${styles.bottom}`}>
          <p>&copy;2026 | Handcrafted Haven</p>
          <p className={styles.small}>Luca Chilan</p>
        </div>
        <p className={styles.disclaimer}>Not a real store</p>
      </footer>
    </>
  );
}
