import Link from "next/link";
import { listMyProducts, deleteProduct } from "./actions";

export const metadata = {
  title: "My Products — Handcrafted Haven",
};

export default async function ArtisanProductsPage() {
  const products = await listMyProducts();

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              color: "var(--color-secondary)",
              marginBottom: "0.25rem",
            }}
          >
            My Products
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {products.length} product{products.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Link
          href="/dashboard/artisan/products/new"
          id="artisan-create-product-link"
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          + New Product
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "var(--color-secondary)",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {["Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                style={{
                  background: idx % 2 === 0 ? "#fff" : "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#111827",
                  }}
                >
                  {product.name}
                </td>
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                  }}
                >
                  {product.category?.name ?? (
                    <span style={{ color: "#9ca3af" }}>—</span>
                  )}
                </td>
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  ${Number(product.price).toFixed(2)}
                </td>
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.875rem",
                    color: product.stock === 0 ? "#dc2626" : "#374151",
                    fontWeight: product.stock === 0 ? 700 : 400,
                  }}
                >
                  {product.stock}
                </td>
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/dashboard/artisan/products/${product.id}/edit`}
                      id={`artisan-edit-product-${product.id}`}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "var(--radius-sm)",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        border: "1px solid #bfdbfe",
                      }}
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(product.id);
                      }}
                    >
                      <button
                        type="submit"
                        id={`artisan-delete-product-${product.id}`}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "var(--radius-sm)",
                          background: "#fef2f2",
                          color: "#b91c1c",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "1px solid #fca5a5",
                          fontFamily: "inherit",
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                  }}
                >
                  You have no products yet.{" "}
                  <Link
                    href="/dashboard/artisan/products/new"
                    style={{ color: "var(--color-primary)", fontWeight: 600 }}
                  >
                    Create your first product →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}