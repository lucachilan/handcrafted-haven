import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "@/app/about/page.module.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className={`${styles.section} ${styles.heroSection}`}>
          <div className="container">
            <h1 className="title">Welcome to Handcrafted Haven</h1>
            <p className="subtitle">
              Your creative sanctuary for artisan supplies, handmade treasures,
              and boundless inspiration.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className={`${styles.section} ${styles.storySection}`}>
          <div id="story" className="container">
            <h2 className={`title t-small`}>Our Story</h2>
            <p>
              Born from a simple belief that the best things in life are made by
              hand, Handcrafting Haven started in a small, dusty workshop with
              just a few spools of thread, a potters wheel, and a lot of heart.
              What began as a personal passion project has blossomed into a
              vibrant community of makers, dreamers, and artisans.
            </p>
            <p>
              We know the feeling of losing track of time while perfecting a
              stitch, turning a bowl, or pouring the perfect candle. That is why
              we built this space—to celebrate the slow, beautiful, and
              intentional art of making things from scratch.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className={`${styles.section} ${styles.missionSection}`}>
          <div className="container">
            <h2 id="mission" className={`title t-small`}>
              Our Mission
            </h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>Inspire Creativity</h3>
                <p>
                  Whether you are a seasoned artisan or a curious beginner
                  picking up knitting needles for the first time, we provide the
                  tools, materials, and encouragement to help your vision come
                  to life.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Source Ethically</h3>
                <p>
                  We are committed to sustainability. From organic yarns to
                  eco-friendly packaging, we carefully select suppliers who
                  share our deep respect for the environment and fair labor.
                </p>
              </div>
              <div className={styles.card}>
                <h3>Foster Community</h3>
                <p>
                  Crafting is better together. We host weekly workshops, local
                  artisan markets, and online forums to connect makers and share
                  the joy of handmade goods.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
