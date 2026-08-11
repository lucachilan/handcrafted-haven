"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// ─── List ────────────────────────────────────────────────────────────────────

export async function listProducts() {
  await requireRole(Role.ADMIN);

  return prisma.product.findMany({
    orderBy: { name: "asc" },
    include: {
      category: { select: { name: true } },
      artisan: { select: { id: true, name: true, email: true } },
    },
  });
}

// ─── Create ──────────────────────────────────────────────────────────────────

export async function createProduct(formData: FormData) {
  await requireRole(Role.ADMIN);

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string | null) ?? null;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const categoryId = (formData.get("categoryId") as string | null) || null;
  const artisanId = (formData.get("artisanId") as string | null) || null;

  if (!name || isNaN(price) || isNaN(stock)) {
    throw new Error("Invalid product data: name, price, and stock are required.");
  }

  await prisma.product.create({
    data: { name, description, price, stock, artisanId, categoryId },
  });

  redirect("/dashboard/admin/products");
}

// ─── Edit ────────────────────────────────────────────────────────────────────

export async function editProduct(formData: FormData, productId: string) {
  await requireRole(Role.ADMIN);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found.");

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string | null) ?? null;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10) || 0;
  const categoryId = (formData.get("categoryId") as string | null) || null;
  const artisanId = (formData.get("artisanId") as string | null) || null;

  if (!name || isNaN(price) || isNaN(stock)) {
    throw new Error("Invalid product data: name, price, and stock are required.");
  }

  await prisma.product.update({
    where: { id: productId },
    data: { name, description, price, stock, categoryId, artisanId },
  });

  redirect("/dashboard/admin/products");
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export async function deleteProduct(productId: string) {
  await requireRole(Role.ADMIN);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found.");

  await prisma.product.delete({ where: { id: productId } });

  redirect("/dashboard/admin/products");
}
