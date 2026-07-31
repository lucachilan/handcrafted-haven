import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("database seed starting...");

  // Clear existing data to avoid foreign key or unique constraint conflicts
  await prisma.image.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("code1234", 10);

  // Admin user
  await prisma.user.create({
    data: {
      email: "admin@haven.com",
      password: passwordHash,
      name: "admin",
      role: "ADMIN",
    },
  });

  // Artisans
  const artisanFirst = await prisma.user.create({
    data: {
      email: "luca@haven.com",
      password: passwordHash,
      name: "Luca Chilan",
      bio: "Master woodworker crafting hand-carved home goods from sustainable lumber.",
      profileImageUrl: "https://avatars.githubusercontent.com/u/203291826?v=4",
      role: "ARTISAN",
    },
  });

  const artisanSecond = await prisma.user.create({
    data: {
      email: "peter@haven.com",
      password: passwordHash,
      name: "Peter Parker",
      bio: "Hand-thrown stoneware focused on precision, balance, and durability.",
      profileImageUrl: "https://static.wikia.nocookie.net/the-amazing-spiderman-universe/images/5/5b/Peterbenjaminparker.jpg/revision/latest?cb=20121103052021&path-prefix=es",
      role: "ARTISAN",
    },
  });

  const artisanThird = await prisma.user.create({
    data: {
      email: "bruce@haven.com",
      password: passwordHash,
      name: "Bruce Wayne",
      bio: "Crafting heavy-duty leather armor and accessories from the shadowy depths.",
      profileImageUrl:
        "https://static.wikia.nocookie.net/bane/images/a/a6/Imagename.jpg/revision/latest/scale-to-width-down/250?cb=20150920115058",
      role: "ARTISAN",
    },
  });

  const artisanFourth = await prisma.user.create({
    data: {
      email: "barry@haven.com",
      password: passwordHash,
      name: "Barry Allen",
      bio: "Speedy artisan producing high-grade modern textiles and home accents.",
      profileImageUrl: "https://static.tvtropes.org/pmwiki/pub/images/1_258_5.jpg",
      role: "ARTISAN",
    },
  });

  // Product Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Woodworking" } }),
    prisma.category.create({ data: { name: "Ceramics & Pottery" } }),
    prisma.category.create({ data: { name: "Leather Goods" } }),
    prisma.category.create({ data: { name: "Home Decor" } }),
    prisma.category.create({ data: { name: "Textiles & Living" } }),
  ]);

  const [woodworking, ceramics, leather, homeDecor, textiles] = categories;

  // 15 Products distributed across artisans and categories
  const productsData = [
    // Luca Chilan (Woodworking & Home Decor)
    {
      name: "Hand-Carved Walnut Cutting Board",
      description: "Sustainably sourced black walnut board finished with natural beeswax and food-safe mineral oil.",
      price: 65.0,
      stock: 12,
      categoryId: woodworking.id,
      artisanId: artisanFirst.id,
      imageUrl: "https://images.unsplash.com/photo-1615865417236-d67f572a746f",
    },
    {
      name: "Oak Nesting Bowls (Set of 3)",
      description: "Set of three solid oak decorative nested bowls finished with organic oil.",
      price: 89.5,
      stock: 8,
      categoryId: woodworking.id,
      artisanId: artisanFirst.id,
      imageUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2",
    },
    {
      name: "Hexagonal Cedar Coasters",
      description: "Set of 4 handcrafted cedar coasters featuring cork backings for tabletops.",
      price: 24.0,
      stock: 30,
      categoryId: homeDecor.id,
      artisanId: artisanFirst.id,
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94801759",
    },

    // Peter Parker (Ceramics & Home Decor)
    {
      name: "Speckled Stoneware Mug",
      description: "Hand-thrown 12oz pottery mug featuring a smooth matte speckled glaze.",
      price: 28.0,
      stock: 25,
      categoryId: ceramics.id,
      artisanId: artisanSecond.id,
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    },
    {
      name: "Raw Terracotta Planter",
      description: "Breathable clay planter pot complete with a matching drainage dish.",
      price: 36.0,
      stock: 15,
      categoryId: ceramics.id,
      artisanId: artisanSecond.id,
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    },
    {
      name: "Ceramic Coffee Dripper",
      description: "Conical stoneware pour-over dripper designed for standard paper filters.",
      price: 42.0,
      stock: 10,
      categoryId: ceramics.id,
      artisanId: artisanSecond.id,
      imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38",
    },
    {
      name: "Sculptural Clay Table Vase",
      description: "Minimalist ceramic vase ideal for dried floral arrangements.",
      price: 75.0,
      stock: 6,
      categoryId: homeDecor.id,
      artisanId: artisanSecond.id,
      imageUrl: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c",
    },

    // Bruce Wayne (Leather Goods & Home Decor)
    {
      name: "Full-Grain Leather Bifold Wallet",
      description: "Hand-stitched dark brown wallet with 6 card slots and a main bill compartment.",
      price: 58.0,
      stock: 18,
      categoryId: leather.id,
      artisanId: artisanThird.id,
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    },
    {
      name: "Heritage Leather Valet Tray",
      description: "Snap-corner leather catch-all tray for keys, watches, and EDC gear.",
      price: 38.0,
      stock: 20,
      categoryId: leather.id,
      artisanId: artisanThird.id,
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    },
    {
      name: "Heavy Duty Craftsman Apron",
      description: "Rugged full-grain leather apron designed for workshop and craft use.",
      price: 135.0,
      stock: 5,
      categoryId: leather.id,
      artisanId: artisanThird.id,
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    },
    {
      name: "Refillable Leather Journal Cover",
      description: "Fitted leather cover for A5 notebooks with integrated pen loop.",
      price: 45.0,
      stock: 14,
      categoryId: leather.id,
      artisanId: artisanThird.id,
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    },

    // Barry Allen (Textiles & Home Decor)
    {
      name: "Chunky Knit Merino Blanket",
      description: "Ultra-soft merino wool throw blanket hand-knitted for maximum warmth.",
      price: 110.0,
      stock: 7,
      categoryId: textiles.id,
      artisanId: artisanFourth.id,
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    },
    {
      name: "Pure Flax Linen Table Runner",
      description: "100% European flax linen runner in natural stone gray.",
      price: 32.0,
      stock: 22,
      categoryId: textiles.id,
      artisanId: artisanFourth.id,
      imageUrl: "https://images.unsplash.com/photo-1528458901483-366556e4c700",
    },
    {
      name: "Woven Canvas Tote Bag",
      description: "Heavyweight cotton canvas bag with reinforced leather shoulder straps.",
      price: 48.0,
      stock: 16,
      categoryId: textiles.id,
      artisanId: artisanFourth.id,
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363",
    },
    {
      name: "Textured Wool Cushion Cover",
      description: "18x18 inch woven cushion cover with hidden zipper closure.",
      price: 35.0,
      stock: 19,
      categoryId: homeDecor.id,
      artisanId: artisanFourth.id,
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    },
  ];

  // Insert products with connected images
  for (const item of productsData) {
    const { imageUrl, ...productData } = item;

    await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: [{ url: imageUrl }],
        },
      },
    });
  }

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });