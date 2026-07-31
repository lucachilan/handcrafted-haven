import Link from "next/link";

import styles from "./ArtisanCard.module.css";

interface ArtisanCardProps {
    artisan: {
        id: string;
        name: string | null;
        profileImageUrl?: string | null;
        productCount: number;
        bio: string | null;
    }
}


export default async function ArtisanCard({ artisan }: ArtisanCardProps) {
    return (
        <>
            <Link href={`/artisans/${artisan.id}/profile`}>
                <div className={styles.card_container}>
                    {artisan.profileImageUrl ? (
                        <img
                            src={artisan.profileImageUrl}
                            alt={`Portrait of ${artisan.name || "artisan"}`}
                            className={styles.avatar}
                        />
                    ) : (
                        <img
                            src="/public/profile-placeholder.png"
                            alt={`Portrait of ${artisan.name || "artisan"}`}
                            className={styles.avatar}
                        />
                    )}
                    <div className={styles.info}>
                        <p>{artisan.bio}</p>
                        <h1 className={styles.artisan_name}>
                            {artisan.name}
                        </h1>
                    </div>
                </div>
            </Link>
        </>
    )
}