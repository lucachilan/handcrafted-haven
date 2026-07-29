import Image from "next/image";
import styles from "@/components/Hero/hero.module.css"
import Link from "next/link";


export default function Hero() {

    return (
        <section className={styles.hero_wrapper}>
            <div className={styles.hero_content}>
                <h1 id="hero-title" className={styles.title}>Modern Craft. Timeless pieces.</h1>
                <div className={styles.ctaHero}>
                    <Link href="/products">
                        <button className={styles.buy}>
                            Shop
                        </button>
                    </Link>
                    <Link href="/artisans">
                        <button className={styles.meet}>
                            Meet the Artisans
                        </button>
                    </Link>
                </div>
            </div>
            <Image
                src="/heroImage.webp"
                alt="Handcrafted goods arranged on a rustic wooden table"
                fill
                sizes="100vw"
                className={styles.hero_bg}
                preload
                loading="eager"
            />
        </section>
    )
}
