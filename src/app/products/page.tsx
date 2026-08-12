import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import {
  getFilteredProducts,
  getProductCategories,
} from "@/actions/product-act";
import { addToCartAction } from "@/actions/cart-act";
import styles from "./page.module.css";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import StarRating from "@/components/StarRating/StarRating";
import ProductFilter from "@/components/ProductFilter/ProductFilter";

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

  const [categories, products] = await Promise.all([
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
  ]);

  const activeCategoryName =
    categories.find((category) => category.id === activeCategoryId)?.name ??
    legacyCategoryName;

  return (
    <>
      <Navbar />
      <main className={`products-page ${styles.main}`}>
        <h1 className="page-title">Our Handcrafted Products</h1>
        <p className="section-subtitle">
          {activeCategoryName && query
            ? `Showing results for "${query}" in ${activeCategoryName}.`
            : activeCategoryName
              ? `Showing ${activeCategoryName} pieces from independent makers.`
              : query
                ? `Showing results for "${query}".`
                : "Discover handmade pieces created by independent makers and small-batch artisans."}
        </p>

        {(activeCategoryId ||
          legacyCategoryName ||
          query ||
          minPrice ||
          maxPrice ||
          inStock ||
          sort) && (
          <div className={styles.clearFilterWrap}>
            <Link
              href="/products"
              className={`button button--light ${styles.clearFilterButton}`}
            >
              Clear filters
            </Link>
          </div>
        )}

        <div className={styles.catalogLayout}>
          <ProductFilter
          // category={categories}
          // activeCategoryId={activeCategoryId}
          // minPrice={minPrice}
          // maxPrice={maxPrice}
          // inStock={inStock === "1"}
          // sort={sort}
          />

          <section className={styles.catalogResults}>
            <div className="products-grid">
              {products.map((product: Product) => (
                <article key={product.id} className="product-card">
                  <Link
                    href={`/products/${product.id}`}
                    className="product-card__contentLink"
                  >
                    {product.images[0]?.url ? (
                      <div className="product-card__image-wrap">
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1120px) 50vw, 33vw"
                          className="product-card__image"
                        />
                      </div>
                    ) : (
                      <div
                        className="product-card__placeholder"
                        aria-hidden="true"
                      >
                        No image yet
                      </div>
                    )}
                    <h2 className="product-card__title">{product.name}</h2>
                  </Link>

                  {product.reviews.length > 0 ? (
                    <StarRating
                    // value={
                    //   product.reviews.reduce(
                    //     (sum, review) => sum + review.rating,
                    //     0,
                    //   ) / product.reviews.length
                    // }
                    // showValue
                    />
                  ) : (
                    <p className="product-card__ratingEmpty">No reviews yet</p>
                  )}

                  <p className="product-card__price">
                    ${product.price.toString()}
                  </p>

                  {product.stock > 0 ? (
                    <form
                      action={addToCartAction}
                      className="product-card__actionForm"
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
                      // className="button button--dark product-card__actionButton"
                      // idleText="Add to cart"
                      // pendingText="Adding..."
                      />
                    </form>
                  ) : (
                    <p className="product-card__stockBadge" aria-live="polite">
                      Sold out
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        {products.length === 0 && (
          <p className={`section-subtitle ${styles.emptyState}`}>
            No products found with the current filters.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
