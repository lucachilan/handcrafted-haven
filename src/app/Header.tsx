"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./header.module.css";

const NAV_LINKS = [
  { href: "#shop",      label: "Shop" },
  { href: "#artisans",  label: "Artisans" },
  { href: "#categories", label: "Categories" },
  { href: "#about",     label: "Our Story" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = [
    styles.header,
    scrolled ? styles["header--scrolled"] : styles["header--transparent"],
  ].join(" ");

  return (
    <header className={headerClass} role="banner">
      <div className={`container ${styles.header__inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Handcrafted Haven Home">
          <div className={styles.logo__icon} aria-hidden="true">🧶</div>
          <div className={styles.logo__text}>
            <span className={styles.logo__name}>Handcrafted Haven</span>
            <span className={styles.logo__tagline}>Artisan Marketplace</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.nav__link}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.header__actions}>
          <button
            className={styles.header__icon_btn || styles["header__icon-btn"]}
            aria-label="Search products"
            id="header-search-btn"
          >
            🔍
          </button>
          <button
            className={styles["header__icon-btn"]}
            aria-label="Wishlist"
            id="header-wishlist-btn"
          >
            🤍
          </button>
          <button
            className={styles["header__icon-btn"]}
            aria-label="Shopping cart, 2 items"
            id="header-cart-btn"
          >
            🛍️
            <span className={styles["cart-badge"]} aria-hidden="true">2</span>
          </button>
          <Link
            href="#join"
            className="btn btn-primary"
            id="header-join-btn"
            style={{ fontSize: "var(--text-xs)", padding: "0.5rem 1.25rem" }}
          >
            Join as Artisan
          </Link>

          {/* Mobile toggle */}
          <button
            className={styles["mobile-toggle"]}
            aria-label="Open mobile menu"
            id="mobile-menu-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
