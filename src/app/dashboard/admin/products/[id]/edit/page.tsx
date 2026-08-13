import { notFound } from "next/navigation";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { getProductCategories } from "@/actions/product-act";
import { updateProduct, deleteProduct } from "@/actions/product-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import ProductForm from "@/components/ProductForm/ProductForm";
import styles from "./page.module.css";

interface AdminEditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Admin · Edit Product" };

export default async function AdminEditProductPage({
  params,
}: AdminEditProductPageProps) {
  const { id } = await params;
  const user = await requireRole(Role.ADMIN);

  const [product, categories, artisans] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        description: true,
        categoryId: true,
        artisanId: true,
      },
    }),
    getProductCategories(),
    prisma.user.findMany({
      where: { role: Role.ARTISAN },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <DashboardShell user={user} active="/dashboard/admin/products">
      <h1 className="section-title">Edit Product</h1>
      <ProductForm
        action={updateProduct.bind(null, product.id)}
        categories={categories}
        artisans={artisans}
        product={product}
      />

      <div className={styles.deleteZone}>
        <form action={deleteProduct.bind(null, product.id)}>
          <button type="submit" className="btn btn-danger">
            Delete this product
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}