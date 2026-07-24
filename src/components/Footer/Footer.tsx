import Link from "next/link";
import Image from "next/image"
import styles from "./footer.module.css";

const columns = [
    {
        heading: "Shop",
        links: [
            {label: "Ceramics", href:""},
            {label: "Textiles", href:""},
            {label: "Jewelry", href:""},
            {label: "Woodwork", href:""},
        ]
    },
    {
        heading: "Explore",
        links: [
            {label: "", href:""},
            {label: "", href:""},
            {label: "", href:""}
        ]
    },
    {
        heading: "Account",
        links: [
            {label: "", href:""},
            {label: "", href:""},
            {label: "", href:""}
        ]
    }


]

export default async function Footer(){
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.grid}>
                    <div className={styles.brand}>        
                        <Link href="/" className={styles.logo}>
                        <Image
                            src="large-logo.svg"
                            alt="Logo"
                            width={250}
                            height={80}
                            loading="eager"
                            className={styles.logoIcon}
                            />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}