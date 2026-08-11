import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ArtisanProfile from "@/components/Artisan/ArtisanProfile";

interface ArtisanProfilePage {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({
  params,
}: ArtisanProfilePage) {
  const { id } = await params;

  const artisan = await prisma.user.findFirst({
    where: {
      id,
      role: "ARTISAN",
    },
    select: {
      id: true,
      name: true,
      bio: true,
      profileImageUrl: true,
      products: {
        include: {
          category: true,
          images: { take: 1 },
        },
      },
    },
  });

  if (!artisan) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ArtisanProfile
          key={artisan.id}
          artisan={{
            id: artisan.id,
            name: artisan.name,
            profileImageUrl:
              artisan.profileImageUrl || "/profile-placeholder.png",
            products: artisan.products,
            bio: artisan.bio,
            productCount: artisan.products.length,
          }}
        />
      </main>
      <Footer></Footer>
    </>
  );
}
