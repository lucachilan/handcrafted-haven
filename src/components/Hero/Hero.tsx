import Image from "next/image";
import styles from "@/components/Hero/hero.module.css"


export default function Hero() {

    return (
        <section className={styles.hero_wrapper}>
            {/* LCP image: preloaded and eagerly loaded so the browser
                discovers it as early as possible. */}
            <div className={styles.hero_content}>
                <h1 id="hero-title" className={styles.title}>Modern Craft. Timeless pieces.</h1>
                <div className={styles.ctaHero}>
                    <button className={styles.buy}>
                        Shop
                    </button>
                    <button className={styles.meet}>
                        Meet the Artisans
                    </button>
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
