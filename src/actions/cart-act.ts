"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

class CartValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CartValidationError";
  }
}

export async function addToCartAction(formData: FormData) {
  const productId = formData.get("productId") as string;
  const redirectToInput = formData.get("redirectTo");
  const redirectTo =
    typeof redirectToInput === "string" &&
    redirectToInput.startsWith("/") &&
    !redirectToInput.startsWith("//")
      ? redirectToInput
      : "/dashboard/customer/cart";

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    redirect("/products");
  }
  try {
    await prisma.$transaction(
      async (tx) => {
        const product = await tx.product.findUnique({
          where: { id: productId },
          select: {
            id: true,
            name: true,
            stock: true,
          },
        });

        if (!product) {
          throw new CartValidationError("This product is no longer available.");
        }

        if (product.stock <= 0) {
          throw new CartValidationError(
            "This product is currently out of stock.",
          );
        }

        const quantityInput = formData.get("quantity");
        const requestedQuantity =
          typeof quantityInput === "string" && quantityInput.trim() !== ""
            ? parseInt(quantityInput, 10)
            : 1;
        const addQuantity = Number.isFinite(requestedQuantity)
          ? Math.min(Math.max(requestedQuantity, 1), product.stock)
          : 1;

        const cart = await tx.cart.upsert({
          where: { userId },
          update: {},
          create: { userId },
          select: { id: true },
        });

        const existingCartItem = await tx.cartItem.findUnique({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId,
            },
          },
          select: {
            quantity: true,
          },
        });

        const currentQuantity = existingCartItem?.quantity ?? 0;

        if (currentQuantity + addQuantity > product.stock) {
          throw new CartValidationError(
            `You are already buying all of our ${product.name} stock!.`,
          );
        }

        await tx.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId,
            },
          },
          update: {
            quantity: {
              increment: addQuantity,
            },
          },
          create: {
            cartId: cart.id,
            productId,
            quantity: addQuantity,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  } catch (error) {
    if (error instanceof CartValidationError) {
      redirect(
        "/success?message=" +
          encodeURIComponent(error.message) +
          "&redirect=" +
          encodeURIComponent(redirectTo) +
          "&buttonText=" +
          encodeURIComponent("Continue"),
      );
    }

    throw error;
  }

  revalidatePath("/dashboard/customer/cart");
  revalidatePath("/products");

  redirect(redirectTo);
}
