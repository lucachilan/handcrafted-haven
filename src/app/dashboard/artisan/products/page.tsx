import Image from "next/image";
import Link from "next/link";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import { deleteOwnProduct } from "@/actions/product-act";
import styles from "./page.module.css";

const PLACEHOLDER_IMAGE = "/product-placeholder.png";

export const metadata = { title: "My Products" };

export default async function ArtisanProductsPage() {
  const user = await requireRole(Role.ARTISAN);

  const products = await prisma.product.findMany({
    where: { artisanId: user.id },
    include: {
      category: true,
      images: { take: 1 },
    },
    orderBy: { name: "asc" },
  });

  return (
    <DashboardShell user={user} active="/dashboard/artisan/products">
      <div className={styles.header}>
        <h1 className="section-title">My Products</h1>
        <Link href="/dashboard/artisan/products/new" className="btn btn-primary">
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>You have not listed any products yet.</p>
          <Link
            href="/dashboard/artisan/products/new"
            className="btn btn-primary"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid-cards">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className={styles.imageWrap}>
                <Image
                  src={product.images[0]?.url || PLACEHOLDER_IMAGE}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className={styles.image}
                />
              </div>
              <div className="card__body">
                {product.category && (
                  <p className="eyebrow">{product.category.name}</p>
                )}
                <h2 className="card__title">{product.name}</h2>
                <p className="card__price">${product.price.toString()}</p>
                <p
                  className={
                    product.stock > 0
                      ? "pill pill--success"
                      : "pill pill--danger"
                  }
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Sold out"}
                </p>

                <div className={styles.actions}>
                  <Link
                    href={`/dashboard/artisan/products/${product.id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                  <form action={deleteOwnProduct.bind(null, product.id)}>
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}