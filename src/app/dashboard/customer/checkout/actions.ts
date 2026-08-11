"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function checkout() {
  const user = await requireRole(Role.CUSTOMER);

  // Fetch the customer's cart with items
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: { select: { id: true, price: true, stock: true } },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // Validate stock availability
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new Error(
        `Insufficient stock for product ${item.productId}. Available: ${item.product.stock}`
      );
    }
  }

  // Calculate total
  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  // Create order + decrement stock in a transaction
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: user.id,
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

    // Decrement stock for each product
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear the cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  });

  redirect("/dashboard/customer/orders");
}
