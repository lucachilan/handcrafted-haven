import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import StarRating from "@/components/StarRating/StarRating";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import QuantityInput from "@/components/QuantityInput/QuantityInput";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ProductCard from "@/components/ProductCard/ProductCard";
import { addToCartAction } from "@/actions/cart-act";
import styles from "./page.module.css";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true },
  });

  return {
    title: product?.name
      ? `${product.name} | Handcrafted Haven`
      : "Product | Handcrafted Haven",
    description: product?.description ?? undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
      artisan: {
        select: {
          id: true,
          name: true,
          bio: true,
          profileImageUrl: true,
        },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          rating: true,
          title: true,
          text: true,
          createdAt: true,
          user: { select: { name: true } },
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const relatedProducts = product.categoryId
    ? await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
        },
        take: 4,
        orderBy: { name: "asc" },
        include: {
          category: true,
          images: { take: 1 },
          reviews: { select: { rating: true } },
        },
      })
    : [];

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;
  const artisanInitial = (product.artisan?.name ?? "A").trim().charAt(0) ?? "A";

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/products" className={styles.breadcrumbLink}>
            Products
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            ›
          </span>
          {product.category && (
            <>
              <Link
                href={`/products?categoryId=${encodeURIComponent(product.category.id)}`}
                className={styles.breadcrumbLink}
              >
                {product.category.name}
              </Link>
              <span className={styles.breadcrumbSep} aria-hidden="true">
                ›
              </span>
            </>
          )}
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          <ProductGallery images={product.images} alt={product.name} />

          <div className={styles.info}>
            {product.category && (
              <p className={styles.category}>{product.category.name}</p>
            )}

            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.ratingRow}>
              {product.reviews.length > 0 ? (
                <>
                  <StarRating value={averageRating} showValue />
                  <span className={styles.ratingCount}>
                    ({product.reviews.length}{" "}
                    {product.reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </>
              ) : (
                <p className={styles.ratingEmpty}>No reviews yet</p>
              )}
            </div>

            <p className={styles.price}>${product.price.toString()}</p>

            {inStock ? (
              <p
                className={
                  lowStock ? styles.lowStockBadge : styles.stockBadge
                }
                aria-live="polite"
              >
                {lowStock
                  ? `Only ${product.stock} left in stock`
                  : `In stock (${product.stock})`}
              </p>
            ) : (
              <p className={styles.soldOutBadge} aria-live="polite">
                Sold out
              </p>
            )}

            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            {inStock && (
              <form action={addToCartAction} className={styles.cartForm}>
                <input type="hidden" name="productId" value={product.id} />
                <input
                  type="hidden"
                  name="redirectTo"
                  value={`/products/${product.id}`}
                />
                <QuantityInput max={product.stock} />
                <AddToCartButton idleText="Add to cart" pendingText="Adding…" />
              </form>
            )}

            {product.artisan && (
              <Link
                href={`/artisans/${product.artisan.id}/profile`}
                className={styles.artisanLink}
              >
                <div className={styles.artisan}>
                  <span className={styles.artisanAvatar} aria-hidden="true">
                    {artisanInitial}
                  </span>
                  <div className={styles.artisanInfo}>
                    <span className={styles.artisanLabel}>
                      Handcrafted by
                    </span>
                    <span className={styles.artisanName}>
                      {product.artisan.name ?? "An artisan"}
                    </span>
                    {product.artisan.bio && (
                      <p className={styles.artisanBio}>
                        {product.artisan.bio}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        <section className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Customer reviews</h2>

          {product.reviews.length > 0 ? (
            <ul className={styles.reviewsList}>
              {product.reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <StarRating value={review.rating} showValue />
                    <span className={styles.reviewAuthor}>
                      {review.user.name ?? "Guest"}
                    </span>
                    <time
                      className={styles.reviewDate}
                      dateTime={review.createdAt.toISOString()}
                    >
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  {review.title && (
                    <h3 className={styles.reviewTitle}>{review.title}</h3>
                  )}
                  <p className={styles.reviewText}>{review.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.reviewsEmpty}>
              Be the first to review this piece.
            </p>
          )}

          <div className={styles.reviewFormWrap}>
            {userId ? (
              <ReviewForm productId={product.id} />
            ) : (
              <p className={styles.reviewLoginPrompt}>
                <Link href="/auth/login" className={styles.reviewLoginLink}>
                  Sign in
                </Link>{" "}
                to write a review.
              </p>
            )}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>You might also like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}