"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./ProductFilter.module.css";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFilterProps {
  categories: CategoryOption[];
  activeCategoryId?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  inStock?: boolean | null;
  sort?: string | null;
}

export default function ProductFilter({
  categories = [],
  activeCategoryId = null,
  minPrice = null,
  maxPrice = null,
  inStock = null,
  sort = null,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPriceState, setMinPriceState] = useState(minPrice ?? "");
  const [maxPriceState, setMaxPriceState] = useState(maxPrice ?? "");

  const priceKey = `${minPrice ?? ""}|${maxPrice ?? ""}`;
  const [prevPriceKey, setPrevPriceKey] = useState(priceKey);
  if (prevPriceKey !== priceKey) {
    setPrevPriceKey(priceKey);
    setMinPriceState(minPrice ?? "");
    setMaxPriceState(maxPrice ?? "");
  }

  function updateParam(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    const queryString = next.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function handlePriceSubmit(event: FormEvent) {
    event.preventDefault();
    updateParam({
      minPrice: minPriceState.trim() || null,
      maxPrice: maxPriceState.trim() || null,
    });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <aside className={styles.panel} aria-label="Product filters">
      <h2 className={styles.heading}>Filter products</h2>

      <form onSubmit={handlePriceSubmit} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Category</span>
          <select
            value={activeCategoryId ?? ""}
            onChange={(event) =>
              updateParam({
                categoryId: event.target.value || null,
                category: null,
              })
            }
            className={styles.select}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Price range</legend>
          <div className={styles.priceRow}>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Min"
              value={minPriceState}
              onChange={(event) => setMinPriceState(event.target.value)}
              className={styles.input}
            />
            <span className={styles.sep} aria-hidden="true">
              –
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Max"
              value={maxPriceState}
              onChange={(event) => setMaxPriceState(event.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.apply}>
            Apply price
          </button>
        </fieldset>

        <label className={styles.check}>
          <input
            type="checkbox"
            checked={inStock ?? false}
            onChange={(event) =>
              updateParam({ inStock: event.target.checked ? "1" : null })
            }
          />
          <span>In stock only</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Sort by</span>
          <select
            value={sort ?? ""}
            onChange={(event) =>
              updateParam({ sort: event.target.value || null })
            }
            className={styles.select}
          >
            <option value="">Recommended</option>
            <option value="name_asc">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </label>

        <button type="button" onClick={clearAll} className={styles.clear}>
          Clear all filters
        </button>
      </form>
    </aside>
  );
}