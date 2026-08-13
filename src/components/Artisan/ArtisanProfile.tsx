"use client";

import { Product, Category, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import {useState} from "react"
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

const PLACEHOLDER_IMAGE = "/profile-placeholder.png";

export default function ArtisanProfile({ artisan }: ArtisanProfileProps) {
    const initialImage = artisan.profileImageUrl || PLACEHOLDER_IMAGE;
    const [imgSrc, setImgSrc] = useState<string>(initialImage);
    return (
        <div className="container section">
            {/* Profile Header */}
            <div className={styles.header}>
                <div className={styles.avatarContainer}>
                    <Image
                        src= {imgSrc}
                        alt={artisan.name || "Artisan"}
                        fill
                        className={styles.avatar}
                        sizes="(max-width: 768px) 12rem, 12rem"
                        priority
                        onError={() => {
                            if (imgSrc !== PLACEHOLDER_IMAGE) {
                                setImgSrc(PLACEHOLDER_IMAGE);
                            }
                        }}
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.name}>{artisan.name}</h1>
                    <p className={styles.bio}>
                        {artisan.bio || "This artisan hasn't provided a bio yet."}
                    </p>
                    <div className="pill pill--neutral">
                        {artisan.productCount} {artisan.productCount === 1 ? "Product" : "Products"} Crafted
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div>
                <h2 className="section-title">Products by {artisan.name}</h2>
                
                {artisan.products && artisan.products.length > 0 ? (
                    <div className="grid-cards">
                        {artisan.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>This artisan doesn&apos;t have any products yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}