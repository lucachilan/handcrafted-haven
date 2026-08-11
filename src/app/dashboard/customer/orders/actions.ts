"use server";

import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getMyOrders() {
  const user = await requireRole(Role.CUSTOMER);

  return prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true } },
        },
      },
    },
  });
}
