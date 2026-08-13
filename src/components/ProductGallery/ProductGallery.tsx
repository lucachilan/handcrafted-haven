"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage/ProductImage";
import styles from "./ProductGallery.module.css";

interface GalleryImage {
  id: string;
  url: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  alt: string;
}

export default function ProductGallery({
  images,
  alt,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexClamped = Math.min(
    activeIndex,
    Math.max(images.length - 1, 0),
  );
  const activeImage = images[activeIndexClamped];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <ProductImage
          src={activeImage?.url}
          alt={alt}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Product images">
          {images.map((image, index) => {
            const isActive = index === activeIndexClamped;
            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View image ${index + 1}`}
                className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <ProductImage
                  src={image.url}
                  alt={`${alt} — image ${index + 1}`}
                  sizes="72px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}