"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

class CheckoutValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutValidationError";
  }
}

export async function checkoutCartAction() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role === "ADMIN") {
    redirect("/products");
  }

  try {
    await prisma.$transaction(
      async (t) => {
        const cart = await t.cart.findFirst({
          where: { userId },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
        if (!cart || cart.items.length === 0) {
          throw new CheckoutValidationError(
            "Try adding something to your cart!",
          );
        }

        const stockErrors: string[] = [];
        for (const item of cart.items) {
          const stockNumber = await t.product.updateMany({
            where: {
              id: item.productId,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
          if (stockNumber.count === 0) {
            stockErrors.push(item.product.name);
          }
        }
        if (stockErrors.length > 0) {
          throw new CheckoutValidationError(
            `Sorry, we don't have enough stock for: ${stockErrors.join(", ")}.`,
          );
        }

        const total = cart.items.reduce(
          (suma, item) => suma.plus(item.product.price.mul(item.quantity)),
          new Prisma.Decimal(0),
        );

        await t.order.create({
          data: {
            userId,
            total,
            items: {
              create: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.product.price,
              })),
            },
          },
        });
        await t.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      redirect(
        "/success?message=" +
          encodeURIComponent(error.message) +
          "&redirect=" +
          encodeURIComponent("/dashboard/customer/cart") +
          "&buttonText=" +
          encodeURIComponent("Return to Cart"),
      );
    }
    throw error;
  }

  revalidatePath("/dashboard/customer/cart");
  revalidatePath("/dashboard/customer/orders");
  revalidatePath("/products");
  revalidatePath("/artisans");

  redirect(
    "/success?message=" +
      encodeURIComponent("Your order has been placed successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/customer/orders") +
      "&buttonText=" +
      encodeURIComponent("View Orders"),
  );
}
