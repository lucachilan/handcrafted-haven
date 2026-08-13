"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/actions/auth-act";
import styles from "@/components/Navbar/Navbar.module.css";

interface NavbarMenuProps {
  user: { role: string } | null;
}

const LogoutButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={styles.element}
        aria-label="logout"
        onClick={onClose}
      >
        <Image
          src={`/symbols/logout.svg`}
          alt="logout"
          width={32}
          height={32}
          unoptimized
        />
      </button>
    </form>
  );
};

const CartButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={styles.element}>
      <Link href={`/cart`} onClick={onClose}>
        <Image
          src={"/symbols/shopping_cart.svg"}
          alt="shopping_cart"
          width={32}
          height={32}
          unoptimized
        ></Image>
      </Link>
    </div>
  );
};

const LoginButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <Link
      href={`/auth/login`}
      className={styles.element}
      onClick={onClose}
    >
      <Image
        src={`/symbols/login.svg`}
        alt="login"
        width={32}
        height={32}
        unoptimized
      />
    </Link>
  );
};

export default function NavbarMenu({ user }: NavbarMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div className={styles.menu} ref={menuRef}>
      <button
        type="button"
        className={`${styles.hamburger} ${open ? styles.hamburgerActive : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      <nav
        id="primary-nav"
        aria-label="Primary"
        className={`${styles.nav} ${open ? styles.navOpen : ""}`}
      >
        <Link href="/products" className={styles.nav__link} onClick={closeMenu}>
          Products
        </Link>
        <Link href="/artisans" className={styles.nav__link} onClick={closeMenu}>
          Artisans
        </Link>
        <Link href="/about" className={styles.nav__link} onClick={closeMenu}>
          About us
        </Link>

        {user ? (
          <>
            {user.role === "CUSTOMER" ? (
              <CartButton onClose={closeMenu} />
            ) : (
              <Link
                href={`/dashboard/${user.role.trim().toLowerCase()}/products`}
                className={styles.nav__link}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            <LogoutButton onClose={closeMenu} />
          </>
        ) : (
          <LoginButton onClose={closeMenu} />
        )}
      </nav>
    </div>
  );
}