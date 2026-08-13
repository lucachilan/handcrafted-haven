import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { requireRole } from "@/lib/auth";

export default async function AdminDashboardPage() {
  await requireRole(Role.ADMIN);
  redirect("/dashboard/admin/products");
}