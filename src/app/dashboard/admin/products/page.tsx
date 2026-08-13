import Link from "next/link";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import { deleteProduct } from "@/actions/product-act";
import styles from "./page.module.css";

export const metadata = { title: "Admin · Products" };

export default async function AdminProductsPage() {
  const user = await requireRole(Role.ADMIN);

  const products = await prisma.product.findMany({
    include: {
      category: true,
      artisan: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <DashboardShell user={user} active="/dashboard/admin/products">
      <h1 className="section-title">All Products</h1>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products in the catalog.</p>
        </div>
      ) : (
        <div className={`card ${styles.tableCard}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Artisan</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Link
                      href={`/dashboard/admin/products/${product.id}/edit`}
                      className={styles.productName}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.category?.name ?? "—"}</td>
                  <td>{product.artisan?.name ?? "—"}</td>
                  <td>
                    <span
                      className={
                        product.stock > 0
                          ? "pill pill--success"
                          : "pill pill--danger"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>${product.price.toString()}</td>
                  <td className={styles.actions}>
                    <Link
                      href={`/dashboard/admin/products/${product.id}/edit`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button type="submit" className="btn btn-danger">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}