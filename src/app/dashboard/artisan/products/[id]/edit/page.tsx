import { notFound } from "next/navigation";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { getProductCategories } from "@/actions/product-act";
import {
  updateOwnProductAction,
  deleteOwnProduct,
} from "@/actions/product-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import ProductForm from "@/components/ProductForm/ProductForm";
import styles from "./page.module.css";

interface ArtisanEditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Product" };

export default async function ArtisanEditProductPage({
  params,
}: ArtisanEditProductPageProps) {
  const { id } = await params;
  const user = await requireRole(Role.ARTISAN);

  const [product, categories] = await Promise.all([
    prisma.product.findFirst({
      where: { id, artisanId: user.id },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        description: true,
        categoryId: true,
      },
    }),
    getProductCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <DashboardShell user={user} active="/dashboard/artisan/products">
      <h1 className="section-title">Edit Product</h1>
      <ProductForm
        action={updateOwnProductAction}
        categories={categories}
        product={product}
      />

      <div className={styles.deleteZone}>
        <form action={deleteOwnProduct.bind(null, product.id)}>
          <button type="submit" className="btn btn-danger">
            Delete this product
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}