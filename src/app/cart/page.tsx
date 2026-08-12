"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function CartRoute() {
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

  redirect(`/dashboard/${user.role.trim().toLowerCase()}/cart`);
}
