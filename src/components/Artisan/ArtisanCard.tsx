"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ArtisanCard.module.css";

const PLACEHOLDER_IMAGE = "/profile-placeholder.png";

interface ArtisanCardProps {
  artisan: {
    id: string;
    name: string | null;
    profileImageUrl?: string | null;
    productCount: number;
    bio: string | null;
  };
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    artisan.profileImageUrl || PLACEHOLDER_IMAGE
  );

  return (
    <Link href={`/artisans/${artisan.id}/profile`}>
      <div className={styles.card_container}>
        <img
          src={imgSrc}
          alt={`Portrait of ${artisan.name || "artisan"}`}
          className={styles.avatar}
          onError={() => {
            // Fires if the network request fails (404, invalid domain, broken link, etc.)
            if (imgSrc !== PLACEHOLDER_IMAGE) {
              setImgSrc(PLACEHOLDER_IMAGE);
            }
          }}
        />
        <div className={styles.info}>
          <p>{artisan.bio}</p>
          <h1 className={styles.artisan_name}>{artisan.name}</h1>
        </div>
      </div>
    </Link>
  );
}