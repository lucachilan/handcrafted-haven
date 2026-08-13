import { Role } from "@prisma/client";
import { requireRole } from "@/lib/auth";
import { getProductCategories } from "@/actions/product-act";
import { createOwnProductAction } from "@/actions/product-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import ProductForm from "@/components/ProductForm/ProductForm";

export const metadata = { title: "New Product" };

export default async function ArtisanNewProductPage() {
  const user = await requireRole(Role.ARTISAN);
  const categories = await getProductCategories();

  return (
    <DashboardShell user={user} active="/dashboard/artisan/products">
      <h1 className="section-title">New Product</h1>
      <ProductForm action={createOwnProductAction} categories={categories} />
    </DashboardShell>
  );
}