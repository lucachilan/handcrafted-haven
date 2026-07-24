import Image from "next/image";
import Link from "next/link";



import style from "@/components/Navbar/Navbar.module.css"

export default async function Navbar() {
    return (
        <>
        <header className={style.header}>
            <div className={style.inner}>
                <Link href="/" className={style.logo} aria-label="Handcrafted Haven, home">
                    <Image
                        src="logo.svg"
                        alt="Logo"
                        width={120}
                        height={80}
                        loading="eager"
                        className={style.logoIcon}
                    />
                </Link>
                <nav className={style.nav} aria-label="Primary">
                    <Link href="/#" className={style.nav__link}>Products</Link>
                    <Link href="/#" className={style.nav__link}>Artisans</Link>
                    <Link href="/#" className={style.nav__link}>Become a seller</Link>
                </nav>

            </div>




        </header>
        </>
    )
}