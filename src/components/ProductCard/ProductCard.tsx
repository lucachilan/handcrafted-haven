import Image from "next/image";
import Link from "next/link";
import { Product, Category, Image as PrismaImage } from "@prisma/client";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product & {
    category?: Category | null;
    images?: PrismaImage[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url || "/product-placeholder.png";

  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={imageUrl} 
          alt={product.name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        {product.category && (
          <p className={styles.category}>
            {product.category.name}
          </p>
        )}
        <h3 className={styles.name}>
          {product.name}
        </h3>
        <p className={styles.price}>
          ${product.price.toString()}
        </p>
      </div>
    </Link>
  );
}
