import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/products");
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
      artisan: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <h1 className={`title`}>Admin Products</h1>
        <div ></div>
      </main>
      <Footer />
    </>
  );
}
