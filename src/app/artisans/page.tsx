import { prisma } from "@/lib/prisma"; // Adjust path if needed
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ArtisanCard from "@/components/Artisan/ArtisanCard"; // Adjust import path if needed

export default async function Page() {
  const artisans = await prisma.user.findMany({
    where: { role: "ARTISAN" },
    select: {
      id: true,
      name: true,
      profileImageUrl: true,
      email: true,
      _count: {
        select: { products: true },
      },
      bio: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <h1 className="title">Meet Our Artisans</h1>
        <p className="subtitle">
          Discover the talented craftspeople behind our handmade items.
        </p>

        {artisans.length === 0 ? (
          <div className="empty-state">No artisans found at this time.</div>
        ) : (
          <div className="artisans-list">
            {artisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={{
                  id: artisan.id,
                  name: artisan.name,
                  profileImageUrl:
                    artisan.profileImageUrl || "/profile-placeholder.png",
                  productCount: artisan._count.products,
                  bio: artisan.bio,
                }}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
