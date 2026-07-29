import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const columns = [
    {
        heading: "Shop",
        links: [
            { label: "Ceramics", href: "/shop/ceramics" },
            { label: "Textiles", href: "/shop/textiles" },
            { label: "Jewelry", href: "/shop/jewelry" },
            { label: "Woodwork", href: "/shop/woodwork" },
        ]
    },
    {
        heading: "Explore",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Artisans", href: "/artisans" },
            { label: "Blog", href: "/blog" }
        ]
    },
    {
        heading: "Account",
        links: [
            { label: "Sign In", href: "/login" },
            { label: "Orders", href: "/account/orders" },
            { label: "Settings", href: "/account/settings" }
        ]
    }
];

export default async function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.brand}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/large-logo.webp"
                        alt="Handcrafted Haven Logo"
                        width={250}
                        height={80}
                        unoptimized
                        className={styles.logoIcon}
                        loading="lazy"
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
                <p className={styles.small}>Team 01</p>
            </div>
        </footer>
    );
}