"use server";

import Image from "next/image";
import Link from "next/link";
// import NavbarSearch from "./NavbarSearch";
// import { Suspense } from "react";
import Blank from "@/components/Blank";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/actions/auth-act";

import styles from "@/components/Navbar/Navbar.module.css";

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button type="submit" className={styles.element} aria-label="logout">
        <Image
          src={`/symbols/logout.svg`}
          alt="logout"
          width={32}
          height={32}
          unoptimized
          className={styles.login}
        />
      </button>
    </form>
  );
};

const CartButton = () => {
  return (
    <>
      <div className={styles.element}>
        <Link href={`/cart`}>
          <Image
            src={"/symbols/shopping_cart.svg"}
            alt="shopping_cart"
            width={32}
            height={32}
            unoptimized
            className={styles.login}
          ></Image>
        </Link>
      </div>
    </>
  );
};

const LoginButton = () => {
  return (
    <Link href={`/auth/login`} className={styles.element}>
      <Image
        src={`/symbols/login.svg`}
        alt="login"
        width={32}
        height={32}
        unoptimized
        className={styles.login}
      />
    </Link>
  );
};

export default async function Navbar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : null;
  return (
    <>
      <Blank />
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Handcrafted Haven, home"
          >
            <Image
              src="/logo.webp"
              alt="Logo"
              width={120}
              height={80}
              loading="eager"
              unoptimized
              className={styles.logoIcon}
            />
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            <Link href="/products" className={styles.nav__link}>
              Products
            </Link>
            <Link href="/artisans" className={styles.nav__link}>
              Artisans
            </Link>
            <Link href="/about" className={styles.nav__link}>
              About us
            </Link>
            {user ? (
              <>
                <Link
                  href={`/dashboard/${user.role.trim().toLowerCase()}/products`}
                  className={styles.nav__link}
                >
                  Dashboard
                </Link>
                <CartButton />
                <LogoutButton />
              </>
            ) : (
              <>
                <LoginButton />
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
