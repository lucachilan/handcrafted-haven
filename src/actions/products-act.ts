// "use server";

// import type { Prisma } from "@prisma/client";
// import { prisma } from "@/lib/prisma";
// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { normalizeUrl } from "@/lib/image-profile-check";

// interface ProductCatalogFilters {
//   categoryName?: string;
//   categoryId?: string;
//   query?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   inStockOnly?: string;
//   sort?: string;
// }

// function validImageUrl(
//   imageInput: string | null,
//   normalizedUrl: string | null,
// ) {
//   if (imageInput?.trim() && !normalizedUrl) {
//     throw new Error("That URL doesn't work, try another extension or host.");
//   }
// }

// function filterCatalog({
//   categoryId,
//   categoryName,
//   query,
//   minPrice,
//   maxPrice,
//   inStockOnly,
// }: ProductCatalogFilters): Prisma.ProductWhereInput | undefined {
//   const actCategoryID = categoryId?.trim();
//   const actCategoryName = categoryName?.trim();
//   const actQuery = query?.trim();
//   const actMinPrice = Number(minPrice);
//   const actMaxPrice = Number(maxPrice);
//   const minPriceRange = Number.isFinite(actMinPrice);
//   const maxPriceRange = Number.isFinite(actMaxPrice);
//   const filters: Prisma.ProductWhereInput[] = [];

//   if (actCategoryID) {
//     filters.push({
//       categoryId: actCategoryID,
//     });
//   } else if (actCategoryName) {
//     filters.push({
//       category: {
//         name: {
//           equals: actCategoryName,
//           mode: "insensitive",
//         },
//       },
//     });
//   }
// }
