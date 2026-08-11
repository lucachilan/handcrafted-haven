"use server";

import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getCart() {
  const user = await requireRole(Role.CUSTOMER);

  return prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, name: true, price: true },
          },
        },
      },
    },
  });
}

export async function addToCart(productId: string, quantity = 1) {
  const user = await requireRole(Role.CUSTOMER);

  // Get or create the customer's cart
  let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } });
  }

  // Upsert the cart item
  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity },
  });
}

export async function removeFromCart(productId: string) {
  const user = await requireRole(Role.CUSTOMER);

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
}
