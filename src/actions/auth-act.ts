"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { normalizeUrl } from "@/lib/image-profile-check";
import bcrypt from "bcryptjs";

export type LoginActionState = {
  error: string | null;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const emailInput = formData.get("email") as string;
  const email = emailInput?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  if (user.role === Role.ARTISAN) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You have logged in successfully.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard"),
    );
  }

  if (user.role === Role.ADMIN) {
    redirect(
      "/success?message=" +
        encodeURIComponent("You have logged in successfully.") +
        "&redirect=" +
        encodeURIComponent("/dashboard/admin/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Admin Dashboard"),
    );
  }

  redirect(
    "/success?message=" +
      encodeURIComponent("You have logged in successfully.") +
      "&redirect=" +
      encodeURIComponent("/dashboard/customer") +
      "&buttonText=" +
      encodeURIComponent("Go to Dashboard"),
  );
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");

  redirect("/auth/logout");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const emailInput = formData.get("email") as string;
  const email = emailInput?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const roleValue = (formData.get("role") as string) || "CUSTOMER";
  const profileImageUrlInput = formData.get("profileImageUrl") as string | null;

  if (!name || !email || !password) {
    throw new Error("Please provide your name, email, and password.");
  }

  const role = roleValue === "ARTISAN" ? Role.ARTISAN : Role.CUSTOMER;
  const normalizedUrl = normalizeUrl(profileImageUrlInput);

  if (profileImageUrlInput?.trim() && !normalizedUrl) {
    throw new Error("Please provide a valid profile image URL.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  if (existingUser) {
    throw new Error("An account with that email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role,
      profileImageUrl: role === Role.ARTISAN ? normalizedUrl : null,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  if (role === Role.ARTISAN) {
    redirect(
      "/success?message=" +
        encodeURIComponent(
          "Your artisan account has been created successfully.",
        ) +
        "&redirect=" +
        encodeURIComponent("/dashboard/artisan/products") +
        "&buttonText=" +
        encodeURIComponent("Return to Dashboard"),
    );
  }

  redirect(
    "/success?message=" +
      encodeURIComponent(
        "Your customer account has been created successfully.",
      ) +
      "&redirect=" +
      encodeURIComponent("/dashboard/customer") +
      "&buttonText=" +
      encodeURIComponent("Go to Dashboard"),
  );
}
