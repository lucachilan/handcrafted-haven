" use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReview(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });

  if (!user) {
    redirect("/products");
  }

  const productId = formData.get("productId") as string;
  const ratingValue = Number(formData.get("rating"));
  const titleInput = formData.get("title");
  const textInput = formData.get("body");

  const title = typeof titleInput === "string" ? titleInput.trim() : "";
  const text = typeof textInput === "string" ? textInput.trim() : "";

  if (
    !productId ||
    !Number.isInteger(ratingValue) ||
    ratingValue < 1 ||
    ratingValue > 5 ||
    !text
  ) {
    redirect(`/products/${productId || ""}`);
  }

  await prisma.review.create({
    data: {
      productId,
      userId: user.id,
      rating: ratingValue,
      title: title || null,
      text,
    },
  });
  revalidatePath(`/products/${productId}`);
  redirect(`/products/${productId}`);
}
