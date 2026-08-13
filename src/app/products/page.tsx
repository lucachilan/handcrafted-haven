import { Suspense } from "react";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  getFilteredProducts,
  getProductCategories,
  getProductPriceRange,
} from "@/actions/product-act";
import { addToCartAction } from "@/actions/cart-act";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import StarRating from "@/components/StarRating/StarRating";
import ProductFilter from "@/components/ProductFilter/ProductFilter";
import ProductImage from "@/components/ProductImage/ProductImage";
import styles from "./page.module.css";

interface ProductsPageProps {
  searchParams: Promise<{
    categoryId?: string;
    category?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  price: Prisma.Decimal | number | string;
  stock: number;
  description?: string | null;
  images: ProductImage[];
  category?: ProductCategory | null;
  reviews: { rating: number }[];
}

interface ProductImage {
  id: string;
  url: string;
}
interface ProductCategory {
  id: string;
  name: string;
}

export default async function Page({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const activeCategoryId = params.categoryId?.trim();
  const legacyCategoryName = params.category?.trim();
  const query = params.q?.trim();
  const minPrice = params.minPrice?.trim();
  const maxPrice = params.maxPrice?.trim();
  const inStock = params.inStock?.trim();
  const sort = params.sort?.trim();

  const [categories, products, priceRange] = await Promise.all([
    getProductCategories(),
    getFilteredProducts({
      categoryId: activeCategoryId,
      categoryName: legacyCategoryName,
      query,
      minPrice,
      maxPrice,
      inStockOnly: inStock,
      sort,
    }),
    getProductPriceRange(),
  ]);

  const activeCategoryName =
    categories.find((category) => category.id === activeCategoryId)?.name ??
    legacyCategoryName;

  const hasActiveFilters = Boolean(
    activeCategoryId ||
    legacyCategoryName ||
    query ||
    minPrice ||
    maxPrice ||
    inStock ||
    sort,
  );

  return (
    <>
      <Navbar />
      <main className="container section">
        <h1 className="title">Our Handcrafted Products</h1>
        <p className="subtitle">
          {activeCategoryName && query
            ? `Showing results for "${query}" in ${activeCategoryName}.`
            : activeCategoryName
              ? `Showing ${activeCategoryName} pieces from independent makers.`
              : query
                ? `Showing results for "${query}".`
                : "Discover handmade pieces created by independent makers and small-batch artisans."}
        </p>

        {hasActiveFilters && (
          <div className={styles.clearFilterWrap}>
            <Link href="/products" className={styles.clearFilterButton}>
              Clear filters
            </Link>
          </div>
        )}

        <div className={styles.catalogLayout}>
          <Suspense
            fallback={
              <div className={styles.filterFallback}>Loading filters…</div>
            }
          >
            <ProductFilter
              categories={categories}
              activeCategoryId={activeCategoryId}
              priceBounds={priceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              inStock={inStock === "1"}
              sort={sort}
            />
          </Suspense>

          <section className={styles.catalogResults}>
            <div className="grid-cards">
              {products.map((product: Product) => {
                const averageRating =
                  product.reviews.length > 0
                    ? product.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0,
                      ) / product.reviews.length
                    : 0;

                return (
                  <article key={product.id} className="card card--hover">
                    <Link
                      href={`/products/${product.id}`}
                      className={styles.cardLink}
                    >
                      <div className={styles.cardImageWrap}>
                          <ProductImage
                            src={product.images[0]?.url}
                            alt={product.name}
                            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                          />
                        </div>
                    </Link>

                    <div className="card__body">
                      <h2 className="card__title">
                        <Link href={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </h2>

                      {product.reviews.length > 0 ? (
                        <div className="rating-row">
                          <StarRating value={averageRating} showValue />
                          <span className="rating-count">
                            ({product.reviews.length})
                          </span>
                        </div>
                      ) : (
                        <p className="rating-empty">No reviews yet</p>
                      )}

                      <div className={styles.cardFooter}>
                        <p className="card__price">
                          ${product.price.toString()}
                        </p>

                        {product.stock > 0 ? (
                          <form
                            action={addToCartAction}
                            className={styles.actionForm}
                          >
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                            <input
                              type="hidden"
                              name="redirectTo"
                              value="/products"
                            />
                            <AddToCartButton
                              idleText="Add to cart"
                              pendingText="Adding…"
                            />
                          </form>
                        ) : (
                          <p
                            className="pill pill--danger"
                            aria-live="polite"
                          >
                            Sold out
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        {products.length === 0 && (
          <p className={`subtitle ${styles.emptyState}`}>
            No products found with the current filters.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
