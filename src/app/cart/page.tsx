"use server";

import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { getCurrentUser, homeForRole } from "@/lib/auth";

export default async function CartRoute() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  redirect(
    user.role === Role.CUSTOMER
      ? "/dashboard/customer/cart"
      : homeForRole(user.role),
  );
}