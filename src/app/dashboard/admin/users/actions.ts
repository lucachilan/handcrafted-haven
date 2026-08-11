"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listUsers() {
  await requireRole(Role.ADMIN);

  return prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, name: true, email: true, role: true },
  });
}

// ─── Update Role ─────────────────────────────────────────────────────────────

export async function updateUserRole(userId: string, newRole: Role) {
  const admin = await requireRole(Role.ADMIN);

  // An admin cannot demote themselves
  if (userId === admin.id) {
    throw new Error("You cannot change your own role.");
  }

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) throw new Error("User not found.");

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  redirect("/dashboard/admin/users");
}

// ─── Delete ──────────────────────────────────────────────────────────────────

export async function deleteUser(userId: string) {
  const admin = await requireRole(Role.ADMIN);

  // An admin cannot delete themselves
  if (userId === admin.id) {
    throw new Error("You cannot delete your own account.");
  }

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) throw new Error("User not found.");

  await prisma.user.delete({ where: { id: userId } });

  redirect("/dashboard/admin/users");
}
