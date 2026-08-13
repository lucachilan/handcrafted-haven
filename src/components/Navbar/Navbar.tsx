import Image from "next/image";
import Link from "next/link";
import Blank from "@/components/Blank";
import NavbarMenu from "@/components/Navbar/NavbarMenu";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

import styles from "@/components/Navbar/Navbar.module.css";

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
            className={styles.logoIcon}
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
          <NavbarMenu user={user ? { role: user.role } : null} />
        </div>
      </header>
    </>
  );
}