import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function requireRole(role: Role) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  if (user.role !== role) redirect(homeForRole(user.role));
  return user;
}

export function homeForRole(role: Role) {
  switch (role) {
    case Role.ADMIN:
      return "/dashboard/admin";
    case Role.ARTISAN:
      return "/dashboard/artisan/products";
    case Role.CUSTOMER:
      return "/dashboard/customer";
    default:
      return "/dashboard/customer";
  }
}

export type SessionUser = Awaited<ReturnType<typeof getCurrentUser>>;