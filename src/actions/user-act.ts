"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { homeForRole } from "@/lib/auth";
import { normalizeUrl } from "@/lib/image-profile-check";

const ALL_ROLES = Object.values(Role) as Role[];

async function requireAdminUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== Role.ADMIN) {
    redirect(homeForRole(user?.role ?? Role.CUSTOMER));
  }

  return user.id;
}

function successRedirect(message: string, buttonText: string) {
  return (
    "/success?message=" +
    encodeURIComponent(message) +
    "&redirect=" +
    encodeURIComponent("/dashboard/admin/users") +
    "&buttonText=" +
    encodeURIComponent(buttonText)
  );
}

export async function updateUserRole(id: string, formData: FormData) {
  await requireAdminUserId();

  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });

  if (!targetUser) {
    redirect(successRedirect("That user no longer exists.", "Return to Users"));
  }

  if (targetUser.role === Role.ADMIN) {
    redirect(
      successRedirect(
        "Administrator accounts cannot have their role changed.",
        "Return to Users",
      ),
    );
  }

  const roleInput = formData.get("role") as string;
  if (!ALL_ROLES.includes(roleInput as Role)) {
    redirect(successRedirect("Invalid role selected.", "Return to Users"));
  }

  await prisma.user.update({
    where: { id },
    data: { role: roleInput as Role },
  });

  revalidatePath("/dashboard/admin/users");
  revalidatePath("/artisans");

  redirect(successRedirect("The user role was updated successfully.", "Done"));
}

export async function deleteUser(id: string) {
  await requireAdminUserId();

  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  if (!targetUser) {
    redirect(successRedirect("That user no longer exists.", "Return to Users"));
  }

  if (targetUser.role === Role.ADMIN) {
    redirect(
      successRedirect(
        "Administrator accounts cannot be deleted.",
        "Return to Users",
      ),
    );
  }

  if (targetUser._count.orders > 0) {
    redirect(
      successRedirect(
        `${targetUser.name ?? "This user"} cannot be deleted because they have an order history.`,
        "Return to Users",
      ),
    );
  }

  await prisma.user.delete({
    where: { id: targetUser.id },
  });

  revalidatePath("/dashboard/admin/users");

  redirect(successRedirect("The user was deleted successfully.", "Done"));
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdminUserId();

  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!targetUser) {
    redirect(successRedirect("That user no longer exists.", "Return to Users"));
  }

  const name = (formData.get("name") as string)?.trim();
  const emailInput = (formData.get("email") as string)?.trim().toLowerCase();
  const bio = (formData.get("bio") as string)?.trim() || null;
  const roleInput = formData.get("role") as string;
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;
  const profileImageUrl = normalizeUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !profileImageUrl) {
    redirect(
      successRedirect("Please provide a valid profile image URL.", "Try again"),
    );
  }

  if (!name || !emailInput) {
    redirect(successRedirect("Please provide a name and email.", "Try again"));
  }

  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)
    ? emailInput
    : null;
  if (!email) {
    redirect(successRedirect("Please provide a valid email address.", "Try again"));
  }

  const duplicate = await prisma.user.findFirst({
    where: {
      email: { equals: email, mode: "insensitive" },
      NOT: { id: targetUser.id },
    },
    select: { id: true },
  });
  if (duplicate) {
    redirect(
      successRedirect("Another account already uses that email.", "Try again"),
    );
  }

  let role = targetUser.role;
  if (ALL_ROLES.includes(roleInput as Role) && targetUser.role !== Role.ADMIN) {
    role = roleInput as Role;
  }

  await prisma.user.update({
    where: { id: targetUser.id },
    data: {
      name,
      email,
      bio,
      role,
      profileImageUrl,
    },
  });

  revalidatePath("/dashboard/admin/users");
  revalidatePath("/artisans");
  revalidatePath("/artisans/[id]/profile");

  redirect(successRedirect("The user was updated successfully.", "Done"));
}