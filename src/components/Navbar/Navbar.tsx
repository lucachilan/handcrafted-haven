import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";

import styles from "@/components/Navbar/Navbar.module.css"



export default async function Navbar() {

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Link href="/" className={styles.logo} aria-label="Handcrafted Haven, home">
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
                        <Link href="/products" className={styles.nav__link}>Products</Link>
                        <Link href="/artisans" className={styles.nav__link}>Artisans</Link>
                        <Link href="/auth/register" className={styles.nav__link}>Become a seller</Link>
                    </nav>
                    <div className={styles.symbolsContainer}>
                        {/* Suspense is required because NavbarSearch calls useSearchParams() */}
                        <Suspense fallback={
                            <button type="button" aria-label="Toggle search" className={styles.searchToggle}>
                                <Image src="/symbols/search.webp" alt="" width={32} height={32} unoptimized />
                            </button>
                        }>
                            <NavbarSearch placeholder="Search products" className={styles.element} />
                        </Suspense>
                        <Link href="/auth/login" className={styles.element}>
                            <Image
                                src="/symbols/login.svg"
                                alt="login"
                                width={32}
                                height={32}
                                unoptimized
                                className={styles.login}
                            />
                        </Link>
                    </div>
                </div>




            </header >
        </>
    )
}
