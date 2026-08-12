"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProductImage.module.css";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  sizes?: string;
}

const PLACEHOLDER_IMAGE = "/product-placeholder.png";

export default function ProductImage({ src, alt, sizes }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const imageSrc = src && !failed ? src : PLACEHOLDER_IMAGE;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={styles.image}
      onError={() => setFailed(true)}
    />
  );
}