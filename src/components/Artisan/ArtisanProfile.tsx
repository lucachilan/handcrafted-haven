import { Product, Category, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ArtisanProfile.module.css";

interface ArtisanProfileProps {
    artisan: {
        id: string;
        name: string | null;
        profileImageUrl?: string | null;
        productCount: number;
        bio: string | null;
        products: (Product & {
            category?: Category | null;
            images?: PrismaImage[];
        })[] | null;
    }
}

export default function ArtisanProfile({ artisan }: ArtisanProfileProps) {
    return (
        <div className={styles.container}>
            {/* Profile Header */}
            <div className={styles.header}>
                <div className={styles.avatarContainer}>
                    <Image
                        src={artisan.profileImageUrl || "/profile-placeholder.png"}
                        alt={artisan.name || "Artisan"}
                        fill
                        className={styles.avatar}
                        sizes="(max-width: 768px) 12rem, 12rem"
                        priority
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.name}>{artisan.name}</h1>
                    <p className={styles.bio}>
                        {artisan.bio || "This artisan hasn't provided a bio yet."}
                    </p>
                    <div className={styles.badge}>
                        {artisan.productCount} {artisan.productCount === 1 ? "Product" : "Products"} Crafted
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className={styles.productsSection}>
                <h2>Products by {artisan.name}</h2>
                
                {artisan.products && artisan.products.length > 0 ? (
                    <div className={styles.productsGrid}>
                        {artisan.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>This artisan doesn't have any products yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}