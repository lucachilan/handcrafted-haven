"use server";

import { prisma } from "@/lib/prisma";
import { normalizeUrl } from "@/lib/image-profile-check";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type DeleteOwnAccountState = {
  error: string | null;
};

export async function updateArtisanProfileAction(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const artisan = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!artisan || artisan.role !== "ARTISAN") {
    redirect("/auth/login");
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;

  const normalizedProfileImageUrl = normalizeUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !normalizedProfileImageUrl) {
    throw new Error("Please provide a valid profile image URL.");
  }

  await prisma.user.update({
    where: { id: artisan.id },
    data: {
      name,
      bio,
      profileImageUrl: normalizedProfileImageUrl,
    },
  });

  redirect(
    "/success?message=" +
      encodeURIComponent("Your changes have been saved successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/artisan/products") +
      "&buttonText=" +
      encodeURIComponent("Return to Dashboard"),
  );
}

export async function deleteOwnAccountAction(
  _prevState: DeleteOwnAccountState,
  formData: FormData,
): Promise<DeleteOwnAccountState> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Your session has expired. Please sign in again." };
  }

  const confirmationWord = String(formData.get("confirmDelete") ?? "").trim();

  if (confirmationWord !== "DELETE") {
    return { error: "Please type DELETE exactly to confirm." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  if (!user) {
    return { error: "Account not found." };
  }

  if (user.role === "ADMIN") {
    return { error: "Admin accounts cannot be deleted from this screen." };
  }

  if (user._count.orders > 0) {
    return {
      error:
        "This account has order history and cannot be permanently deleted. Please contact support for account closure.",
    };
  }

  try {
    await prisma.user.delete({
      where: { id: user.id },
    });
  } catch {
    return {
      error:
        "We could not delete your account right now. Please try again in a moment.",
    };
  }

  cookieStore.delete("userId");

  redirect(
    "/success?message=" +
      encodeURIComponent("Your account has been deleted successfully.") +
      "&redirect=" +
      encodeURIComponent("/auth/login") +
      "&buttonText=" +
      encodeURIComponent("Go to Login"),
  );
}
