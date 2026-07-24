import Link from "next/link";
import Header from "./Header";
import styles from "./page.module.css";

/* ── Data ── */
const CATEGORIES = [
  {
    id: "pottery",
    emoji: "🏺",
    name: "Pottery & Ceramics",
    tag: "Featured",
    count: "1,240+ items",
    bg: "hsl(14, 40%, 55%)",
    featured: true,
  },
  {
    id: "jewelry",
    emoji: "💍",
    name: "Jewelry",
    tag: "Popular",
    count: "3,800+ items",
    bg: "hsl(43, 55%, 52%)",
  },
  {
    id: "textiles",
    emoji: "🧵",
    name: "Textiles",
    tag: "New",
    count: "920+ items",
    bg: "hsl(130, 28%, 42%)",
  },
  {
    id: "woodwork",
    emoji: "🪵",
    name: "Woodwork",
    tag: "Trending",
    count: "640+ items",
    bg: "hsl(28, 50%, 40%)",
  },
  {
    id: "candles",
    emoji: "🕯️",
    name: "Candles & Soaps",
    tag: "Editor's Pick",
    count: "480+ items",
    bg: "hsl(48, 60%, 55%)",
  },
];

const PRODUCTS = [
  {
    id: "p1",
    emoji: "🏺",
    name: "Rustic Earth Vase",
    artisan: "Maya Chen",
    artisanEmoji: "🌿",
    price: "$68",
    rating: "4.9",
    reviews: 142,
    badge: "Bestseller",
    bg: "hsl(14, 35%, 88%)",
  },
  {
    id: "p2",
    emoji: "💍",
    name: "Hammered Silver Ring",
    artisan: "Lars Nielsen",
    artisanEmoji: "⚒️",
    price: "$120",
    rating: "4.8",
    reviews: 87,
    badge: null,
    bg: "hsl(220, 15%, 88%)",
  },
  {
    id: "p3",
    emoji: "🧶",
    name: "Merino Throw Blanket",
    artisan: "Amara Osei",
    artisanEmoji: "🌍",
    price: "$185",
    rating: "5.0",
    reviews: 63,
    badge: "New",
    bg: "hsl(36, 40%, 88%)",
  },
  {
    id: "p4",
    emoji: "🪵",
    name: "Live Edge Serving Board",
    artisan: "Jack Briggs",
    artisanEmoji: "🌲",
    price: "$95",
    rating: "4.7",
    reviews: 204,
    badge: null,
    bg: "hsl(28, 40%, 88%)",
  },
];

const ARTISANS = [
  {
    id: "a1",
    emoji: "🏺",
    name: "Maya Chen",
    specialty: "Ceramics & Pottery",
    location: "Portland, OR",
    bio: "Maya brings 12 years of traditional Japanese pottery techniques to modern functional art, each piece wheel-thrown and fired in her wood kiln.",
    items: "240",
    sales: "1.4k",
    rating: "4.9",
  },
  {
    id: "a2",
    emoji: "💍",
    name: "Lars Nielsen",
    specialty: "Silver & Gold Jewelry",
    location: "Copenhagen, DK",
    bio: "Trained at the Royal Danish Academy of Fine Arts, Lars crafts minimal yet deeply personal jewelry pieces inspired by Scandinavian nature.",
    items: "185",
    sales: "920",
    rating: "5.0",
  },
  {
    id: "a3",
    emoji: "🪵",
    name: "Jack Briggs",
    specialty: "Hardwood & Live Edge",
    location: "Asheville, NC",
    bio: "A former architect turned woodworker, Jack sources locally-fallen trees to create heirloom-quality furniture and serving pieces.",
    items: "98",
    sales: "600",
    rating: "4.8",
  },
];

const STEPS = [
  {
    num: "01",
    icon: "🔍",
    title: "Discover",
    desc: "Browse thousands of one-of-a-kind items crafted by talented artisans from around the world.",
  },
  {
    num: "02",
    icon: "💬",
    title: "Connect",
    desc: "Chat directly with makers to customize pieces, ask questions, or simply share your appreciation.",
  },
  {
    num: "03",
    icon: "🛒",
    title: "Purchase",
    desc: "Buy securely with buyer protection on every order. Your payment is held until delivery confirmed.",
  },
  {
    num: "04",
    icon: "📦",
    title: "Treasure",
    desc: "Receive your unique piece, beautifully packaged and accompanied by the artisan's personal story.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    emoji: "👩",
    text: "I found the most incredible hand-thrown pottery for my kitchen. The artisan even carved my initials on the bottom — such a personal touch that no store could ever match.",
    name: "Sarah M.",
    role: "Home Décor Enthusiast, NYC",
    stars: "★★★★★",
  },
  {
    id: "t2",
    emoji: "👨",
    text: "As a maker myself, Handcrafted Haven has been life-changing. My sales tripled in 3 months and the community support from other artisans is genuinely heartwarming.",
    name: "Diego R.",
    role: "Leather Goods Artisan, Barcelona",
    stars: "★★★★★",
  },
  {
    id: "t3",
    emoji: "👩‍🦱",
    text: "Gift shopping used to be stressful. Now I always come here first. Knowing every purchase directly supports an independent maker makes me feel genuinely good about spending.",
    name: "Priya K.",
    role: "Sustainable Living Advocate, London",
    stars: "★★★★★",
  },
];

const TRUST_ITEMS = [
  "🏺 1,200+ Artisans",
  "🌍 Ships to 80+ Countries",
  "⭐ 4.9 Average Rating",
  "🔒 Secure Buyer Protection",
  "🌿 Sustainably Made",
  "💬 Direct Artisan Messaging",
  "🎁 Gift Wrapping Available",
  "📦 Easy 30-Day Returns",
];

/* ── Page ── */
export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ─── HERO ─── */}
        <section className={styles.hero} aria-label="Hero">
          <div className={styles.hero__bg}>
            <div className={`${styles.hero__blob} ${styles["hero__blob--1"]}`} />
            <div className={`${styles.hero__blob} ${styles["hero__blob--2"]}`} />
            <div className={`${styles.hero__blob} ${styles["hero__blob--3"]}`} />
          </div>

          <div className="container">
            <div className={styles.hero__content}>
              {/* Text */}
              <div className={styles.hero__text}>
                <div className={`${styles.hero__eyebrow} animate-fade-down`}>
                  ✦ Artisan Marketplace
                </div>
                <h1 className={`${styles.hero__title} animate-fade-up delay-100`}>
                  Where Every Piece
                  <span className={styles["hero__title--accent"]}>
                    Tells a Story
                  </span>
                </h1>
                <p className={`${styles.hero__description} animate-fade-up delay-200`}>
                  Discover handcrafted treasures made by independent artisans
                  worldwide. Each item is unique, ethically sourced, and crafted
                  with extraordinary care.
                </p>
                <div className={`${styles.hero__cta} animate-fade-up delay-300`}>
                  <Link href="#shop" className="btn btn-primary btn-lg" id="hero-shop-btn">
                    Shop Now →
                  </Link>
                  <Link href="#artisans" className="btn btn-secondary btn-lg" id="hero-artisans-btn">
                    Meet Artisans
                  </Link>
                </div>
                <div className={`${styles.hero__stats} animate-fade-up delay-400`}>
                  {[
                    { num: "12K+", label: "Unique Items" },
                    { num: "1.2K+", label: "Artisans" },
                    { num: "85K+", label: "Happy Customers" },
                  ].map((s) => (
                    <div key={s.label} className={styles.hero__stat}>
                      <div className={styles["hero__stat-number"]}>{s.num}</div>
                      <div className={styles["hero__stat-label"]}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Mosaic */}
              <div className={`${styles.hero__visual} animate-scale-in delay-300`} aria-hidden="true">
                {[
                  { emoji: "🏺", label: "Ceramics", tall: true, bg: "hsl(14,40%,28%)" },
                  { emoji: "💍", label: "Jewelry",  tall: false, bg: "hsl(43,50%,30%)" },
                  { emoji: "🧵", label: "Textiles", tall: false, bg: "hsl(130,25%,26%)" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className={`${styles["hero__card"]} ${c.tall ? styles["hero__card--tall"] : ""}`}
                    style={{ background: c.bg }}
                  >
                    <div className={styles["hero__card-img"]}>{c.emoji}</div>
                    <div className={styles["hero__card-overlay"]}>
                      <span className={styles["hero__card-label"]}>{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST BAND ─── */}
        <div className={styles["trust-band"]} aria-label="Trust indicators">
          <div className={styles["trust-band__track"]}>
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <span key={i} className={styles["trust-band__item"]}>
                <span className={styles["trust-band__dot"]} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ─── CATEGORIES ─── */}
        <section
          id="categories"
          className={`${styles.categories} section-padding`}
          aria-labelledby="categories-title"
        >
          <div className="container">
            <header className={styles["section-header"]}>
              <div className={styles["section-header__label"]}>
                Browse by Craft
              </div>
              <h2 className={styles["section-header__title"]} id="categories-title">
                Find Your Perfect Category
              </h2>
              <p className={styles["section-header__subtitle"]}>
                From hand-thrown ceramics to woven textiles — explore the full
                spectrum of artisan craftsmanship.
              </p>
            </header>

            <div className={styles["categories__grid"]}>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`#${cat.id}`}
                  id={`category-${cat.id}`}
                  className={`${styles["category-card"]} ${cat.featured ? styles["category-card--featured"] : ""}`}
                  style={{ "--cat-bg": cat.bg } as React.CSSProperties}
                  aria-label={`Browse ${cat.name}`}
                >
                  <div
                    className={styles["category-card__bg"]}
                    style={{ background: `linear-gradient(135deg, ${cat.bg} 0%, hsl(20,35%,22%) 100%)` }}
                  >
                    <span>{cat.emoji}</span>
                  </div>
                  <div className={styles["category-card__overlay"]} />
                  <div className={styles["category-card__content"]}>
                    <span className={styles["category-card__tag"]}>{cat.tag}</span>
                    <h3 className={styles["category-card__name"]}>{cat.name}</h3>
                    <p className={styles["category-card__count"]}>{cat.count}</p>
                  </div>
                  <span className={styles["category-card__arrow"]} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURED PRODUCTS ─── */}
        <section
          id="shop"
          className={`${styles.featured} section-padding`}
          aria-labelledby="featured-title"
        >
          <div className="container">
            <header className={styles["section-header"]}>
              <div className={styles["section-header__label"]}>
                Handpicked For You
              </div>
              <h2 className={styles["section-header__title"]} id="featured-title">
                Featured Creations
              </h2>
              <p className={styles["section-header__subtitle"]}>
                Our editors spotlight the finest pieces — each one crafted with
                exceptional skill and passionate attention to detail.
              </p>
            </header>

            <div className={styles["products__grid"]}>
              {PRODUCTS.map((p) => (
                <article key={p.id} className={styles["product-card"]} aria-label={p.name}>
                  <div className={styles["product-card__image"]} style={{ background: p.bg }}>
                    {p.badge && (
                      <span className={styles["product-card__badge"]}>{p.badge}</span>
                    )}
                    <span aria-hidden="true">{p.emoji}</span>
                    <button
                      className={styles["product-card__wishlist"]}
                      aria-label={`Add ${p.name} to wishlist`}
                      id={`wishlist-${p.id}`}
                    >
                      🤍
                    </button>
                  </div>
                  <div className={styles["product-card__info"]}>
                    <div className={styles["product-card__artisan"]}>
                      <div className={styles["product-card__avatar"]} aria-hidden="true">
                        {p.artisanEmoji}
                      </div>
                      <span className={styles["product-card__artisan-name"]}>
                        {p.artisan}
                      </span>
                    </div>
                    <h3 className={styles["product-card__name"]}>{p.name}</h3>
                    <div className={styles["product-card__rating"]}>
                      <span className={styles["product-card__stars"]} aria-hidden="true">
                        ★★★★★
                      </span>
                      <span>{p.rating}</span>
                      <span>({p.reviews})</span>
                    </div>
                    <div className={styles["product-card__footer"]}>
                      <span className={styles["product-card__price"]}>{p.price}</span>
                      <button
                        className={styles["product-card__add"]}
                        aria-label={`Add ${p.name} to cart`}
                        id={`add-to-cart-${p.id}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles["products__cta"]}>
              <Link href="#shop" className="btn btn-outline btn-lg" id="view-all-btn">
                View All Products →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── ARTISAN SPOTLIGHT ─── */}
        <section
          id="artisans"
          className={`${styles.artisans} section-padding`}
          aria-labelledby="artisans-title"
        >
          <div className="container">
            <header className={styles["section-header"]}>
              <div className={styles["section-header__label"]}>
                The Makers Behind the Magic
              </div>
              <h2 className={styles["section-header__title"]} id="artisans-title">
                Meet Our Artisans
              </h2>
              <p className={styles["section-header__subtitle"]}>
                Every product has a person behind it — a craftsperson who poured
                years of skill and passion into their work.
              </p>
            </header>

            <div className={styles["artisans__grid"]}>
              {ARTISANS.map((a) => (
                <article key={a.id} className={styles["artisan-card"]} aria-label={`Artisan: ${a.name}`}>
                  <div className={styles["artisan-card__avatar"]} aria-hidden="true">
                    {a.emoji}
                  </div>
                  <div className={styles["artisan-card__verified"]}>
                    ✔ Verified Artisan
                  </div>
                  <h3 className={styles["artisan-card__name"]}>{a.name}</h3>
                  <p className={styles["artisan-card__specialty"]}>{a.specialty}</p>
                  <p className={styles["artisan-card__bio"]}>{a.bio}</p>
                  <div className={styles["artisan-card__stats"]}>
                    {[
                      { num: a.items, label: "Items" },
                      { num: a.sales, label: "Sales" },
                      { num: a.rating, label: "Rating" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className={styles["artisan-card__stat-num"]}>{s.num}</div>
                        <div className={styles["artisan-card__stat-label"]}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`#artisan-${a.id}`}
                    className="btn btn-outline"
                    id={`view-artisan-${a.id}`}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    View Shop
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section
          className={`${styles["how-it-works"]} section-padding`}
          aria-labelledby="how-it-works-title"
        >
          <div className="container">
            <header className={styles["section-header"]}>
              <div className={styles["section-header__label"]}>
                Simple & Transparent
              </div>
              <h2 className={styles["section-header__title"]} id="how-it-works-title">
                How It Works
              </h2>
              <p className={styles["section-header__subtitle"]}>
                A marketplace built on trust — between makers and buyers — with
                every step designed to feel magical.
              </p>
            </header>

            <div className={styles["steps__grid"]}>
              {STEPS.map((step) => (
                <div key={step.num} className={styles["step-card"]}>
                  <div className={styles["step-card__number"]}>{step.num}</div>
                  <div className={styles["step-card__icon"]} aria-hidden="true">
                    {step.icon}
                  </div>
                  <h3 className={styles["step-card__title"]}>{step.title}</h3>
                  <p className={styles["step-card__desc"]}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section
          className={`${styles.testimonials} section-padding`}
          aria-labelledby="testimonials-title"
        >
          <div className="container">
            <header className={styles["section-header"]}>
              <div className={styles["section-header__label"]}>
                From Our Community
              </div>
              <h2 className={styles["section-header__title"]} id="testimonials-title">
                Loved by Makers & Shoppers
              </h2>
            </header>

            <div className={styles["testimonials__grid"]}>
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.id} className={styles["testimonial-card"]}>
                  <div className={styles["testimonial-card__stars"]} aria-label="5 stars">
                    {t.stars}
                  </div>
                  <div className={styles["testimonial-card__quote"]} aria-hidden="true">"</div>
                  <p className={styles["testimonial-card__text"]}>{t.text}</p>
                  <footer className={styles["testimonial-card__author"]}>
                    <div className={styles["testimonial-card__avatar"]} aria-hidden="true">
                      {t.emoji}
                    </div>
                    <div>
                      <cite className={styles["testimonial-card__author-name"]}>{t.name}</cite>
                      <p className={styles["testimonial-card__author-role"]}>{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section
          id="join"
          className={`${styles["cta-section"]} section-padding`}
          aria-labelledby="cta-title"
        >
          <div className="container">
            <div className={styles["cta-box"]}>
              <div className={styles["cta-box__content"]}>
                <span className={styles["cta-box__eyebrow"]}>✦ Join the Community</span>
                <h2 className={styles["cta-box__title"]} id="cta-title">
                  Are You a Maker?
                  <br />
                  Start Selling Today.
                </h2>
                <p className={styles["cta-box__subtitle"]}>
                  Join over 1,200 artisans who have found their audience on
                  Handcrafted Haven. Your craft deserves to be seen.
                </p>
                <div className={styles["cta-box__actions"]}>
                  <Link href="#signup" className="btn btn-primary btn-lg" id="cta-signup-btn">
                    Open Your Shop Free →
                  </Link>
                  <Link href="#learn-more" className="btn btn-secondary btn-lg" id="cta-learn-btn">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer} role="contentinfo">
        <div className="container">
          <div className={styles["footer__top"]}>
            {/* Brand */}
            <div className={styles["footer__brand"]}>
              <div className={styles["footer__logo"]}>
                <div className={styles["footer__logo-icon"]} aria-hidden="true">🧶</div>
                <span className={styles["footer__logo-name"]}>Handcrafted Haven</span>
              </div>
              <p className={styles["footer__brand-desc"]}>
                A community marketplace connecting passionate artisans with
                people who appreciate the beauty of handmade goods.
              </p>
              <div className={styles["footer__socials"]}>
                {["📘", "📸", "🐦", "📌"].map((icon, i) => (
                  <button
                    key={i}
                    className={styles["footer__social"]}
                    aria-label={["Facebook", "Instagram", "Twitter", "Pinterest"][i]}
                    id={`footer-social-${i}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Shop",
                links: ["All Categories", "New Arrivals", "Bestsellers", "Gift Ideas", "On Sale"],
              },
              {
                title: "Artisans",
                links: ["Become a Seller", "Seller Handbook", "Success Stories", "Artisan Blog"],
              },
              {
                title: "Support",
                links: ["Help Center", "Buyer Protection", "Shipping Info", "Returns", "Contact Us"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h3 className={styles["footer__col-title"]}>{col.title}</h3>
                <ul className={styles["footer__links"]}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className={styles["footer__link"]}
                        id={`footer-${col.title.toLowerCase()}-${link.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles["footer__bottom"]}>
            <p>© 2026 Handcrafted Haven. Made with ❤️ for makers everywhere.</p>
            <div className={styles["footer__legal"]}>
              <Link href="#" id="footer-privacy">Privacy Policy</Link>
              <Link href="#" id="footer-terms">Terms of Service</Link>
              <Link href="#" id="footer-cookies">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
