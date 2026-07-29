'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import styles from '@/components/Navbar/Navbar.module.css';

export default function NavbarSearch({ placeholder, className }: { placeholder: string; className?: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    // Focus the input whenever the bar opens
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    return (
        <>
            {/* Icon button */}
            <button
                type="button"
                aria-label="Toggle search"
                aria-expanded={open}
                className={`${styles.searchToggle}${className ? ` ${className}` : ''}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <Image
                    src="/symbols/search.svg"
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                    className= {styles.glassSearch}
                />
            </button>

            {/* Sliding search bar — rendered below the navbar via fixed positioning */}
            <div className={`${styles.searchBar} ${open ? styles.searchBarOpen : ''}`}>
                <input
                    ref={inputRef}
                    id="search"
                    className={styles.searchInput}
                    placeholder={placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <button
                    type="button"
                    aria-label="Close search"
                    className={styles.searchClose}
                    onClick={() => setOpen(false)}
                >
                    ✕
                </button>
            </div>
        </>
    );
}