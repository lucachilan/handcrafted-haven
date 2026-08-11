"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// ─── List (own products only) ─────────────────────────────────────────────────

export async function listMyProducts() {
  const user = await requireRole(Role.ARTISAN);

  return prisma.product.findMany({
    where: { artisanId: user.id },
    orderBy: { name: "asc" },
    include: { category: { select: { name: true } } },
  });
}

// ─── Create ──────────────────────────────────────────────────────────────────

export async function createProduct(formData: FormData) {
  const user = await requireRole(Role.ARTISAN);

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string | null) ?? null;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const categoryId = (formData.get("categoryId") as string | null) || null;

  if (!name || isNaN(price) || isNaN(stock)) {
    throw new Error("Invalid product data: name, price, and stock are required.");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      categoryId,
      artisanId: user.id, // always set to the logged-in artisan
    },
  });

  redirect("/dashboard/artisan/products");
}

// ─── Edit (ownership enforced) ────────────────────────────────────────────────

export async function editProduct(formData: FormData, productId: string) {
  const user = await requireRole(Role.ARTISAN);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found.");

  // Ownership check — artisan A may never edit artisan B's product
  if (product.artisanId !== user.id) {
    throw new Error("Forbidden: you can only edit your own products.");
  }

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string | null) ?? null;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const categoryId = (formData.get("categoryId") as string | null) || null;

  if (!name || isNaN(price) || isNaN(stock)) {
    throw new Error("Invalid product data: name, price, and stock are required.");
  }

  await prisma.product.update({
    where: { id: productId },
    data: { name, description, price, stock, categoryId },
    // artisanId is intentionally NOT updated — ownership is immutable
  });

  redirect("/dashboard/artisan/products");
}

// ─── Delete (ownership enforced) ─────────────────────────────────────────────

export async function deleteProduct(productId: string) {
  const user = await requireRole(Role.ARTISAN);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found.");

  // Ownership check
  if (product.artisanId !== user.id) {
    throw new Error("Forbidden: you can only delete your own products.");
  }

  await prisma.product.delete({ where: { id: productId } });

  redirect("/dashboard/artisan/products");
}
