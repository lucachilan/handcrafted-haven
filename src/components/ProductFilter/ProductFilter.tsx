"use client";

import {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./ProductFilter.module.css";

interface CategoryOption {
  id: string;
  name: string;
}

interface PriceBounds {
  min: number;
  max: number;
}

interface ProductFilterProps {
  categories: CategoryOption[];
  activeCategoryId?: string | null;
  priceBounds?: PriceBounds;
  minPrice?: string | null;
  maxPrice?: string | null;
  inStock?: boolean | null;
  sort?: string | null;
}

const STEP = 1;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export default function ProductFilter({
  categories = [],
  activeCategoryId = null,
  priceBounds,
  minPrice = null,
  maxPrice = null,
  inStock = null,
  sort = null,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const priceMin = priceBounds?.min ?? 0;
  const priceMax = Math.max(priceBounds?.max ?? 1, priceMin + 1);

  const [sliderMin, setSliderMin] = useState(() => {
    const base = minPrice ? Math.round(Number(minPrice)) : priceMin;
    return clamp(base, priceMin, priceMax);
  });
  const [sliderMax, setSliderMax] = useState(() => {
    const base = maxPrice ? Math.round(Number(maxPrice)) : priceMax;
    return clamp(base, priceMin, priceMax);
  });

  const priceKey = `${minPrice ?? ""}|${maxPrice ?? ""}`;
  const [prevPriceKey, setPrevPriceKey] = useState(priceKey);
  if (prevPriceKey !== priceKey) {
    setPrevPriceKey(priceKey);
    const nextMin = minPrice
      ? clamp(Math.round(Number(minPrice)), priceMin, priceMax)
      : priceMin;
    const nextMax = maxPrice
      ? clamp(Math.round(Number(maxPrice)), priceMin, priceMax)
      : priceMax;
    setSliderMin(Math.min(nextMin, nextMax));
    setSliderMax(Math.max(nextMin, nextMax));
  }

  const railRef = useRef<HTMLDivElement>(null);
  const draggingThumb = useRef<"min" | "max" | null>(null);

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

  function commitPrice(explicitMin = sliderMin, explicitMax = sliderMax) {
    updateParam({
      minPrice: explicitMin > priceMin ? String(explicitMin) : null,
      maxPrice: explicitMax < priceMax ? String(explicitMax) : null,
    });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  function percent(value: number) {
    return ((value - priceMin) / (priceMax - priceMin)) * 100;
  }

  function valueFromClientX(clientX: number) {
    const rail = railRef.current;
    if (!rail) return priceMin;
    const rect = rail.getBoundingClientRect();
    if (rect.width <= 0) return priceMin;
    const ratio = (clientX - rect.left) / rect.width;
    return clamp(
      Math.round(priceMin + ratio * (priceMax - priceMin)),
      priceMin,
      priceMax,
    );
  }

  function handlePointerDown(
    which: "min" | "max",
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingThumb.current = which;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingThumb.current) return;
    const next = valueFromClientX(event.clientX);
    if (draggingThumb.current === "min") {
      setSliderMin(Math.min(next, sliderMax));
    } else {
      setSliderMax(Math.max(next, sliderMin));
    }
  }

  function handlePointerUp() {
    if (!draggingThumb.current) return;
    draggingThumb.current = null;
    commitPrice();
  }

  function handleKeyDown(
    which: "min" | "max",
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    const current = which === "min" ? sliderMin : sliderMax;
    let next: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = current - STEP;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = current + STEP;
    } else if (event.key === "Home") {
      next = priceMin;
    } else if (event.key === "End") {
      next = priceMax;
    }
    if (next === null) return;
    event.preventDefault();

    const nextMin =
      which === "min" ? clamp(Math.min(next, sliderMax), priceMin, priceMax) : sliderMin;
    const nextMax =
      which === "max" ? clamp(Math.max(next, sliderMin), priceMin, priceMax) : sliderMax;

    setSliderMin(nextMin);
    setSliderMax(nextMax);
    commitPrice(nextMin, nextMax);
  }

  return (
    <aside className={styles.panel} aria-label="Product filters">
      <h2 className={styles.heading}>Filter products</h2>

      <div className={styles.form}>
        <div className="form-field">
          <span className="form-label">Category</span>
          <select
            value={activeCategoryId ?? ""}
            onChange={(event) =>
              updateParam({
                categoryId: event.target.value || null,
                category: null,
              })
            }
            className="input"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <span className="form-label">Price range</span>
          <p className={styles.rangeValue} aria-live="polite">
            ${sliderMin} – ${sliderMax}
          </p>
          <div className={styles.range}>
            <div className={styles.rail} ref={railRef} aria-hidden="true" />
            <div
              className={styles.rangeFill}
              style={{
                left: `${percent(sliderMin)}%`,
                width: `${percent(sliderMax) - percent(sliderMin)}%`,
              }}
              aria-hidden="true"
            />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Minimum price"
              aria-valuemin={priceMin}
              aria-valuemax={priceMax}
              aria-valuenow={sliderMin}
              aria-valuetext={`$${sliderMin}`}
              className={styles.thumb}
              style={{ left: `${percent(sliderMin)}%` }}
              onPointerDown={(event) => handlePointerDown("min", event)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={(event) => handleKeyDown("min", event)}
            />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Maximum price"
              aria-valuemin={priceMin}
              aria-valuemax={priceMax}
              aria-valuenow={sliderMax}
              aria-valuetext={`$${sliderMax}`}
              className={styles.thumb}
              style={{ left: `${percent(sliderMax)}%` }}
              onPointerDown={(event) => handlePointerDown("max", event)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onKeyDown={(event) => handleKeyDown("max", event)}
            />
          </div>
        </div>

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

        <div className="form-field">
          <span className="form-label">Sort by</span>
          <select
            value={sort ?? ""}
            onChange={(event) =>
              updateParam({ sort: event.target.value || null })
            }
            className="input"
          >
            <option value="">Recommended</option>
            <option value="name_asc">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        <button type="button" onClick={clearAll} className={styles.clear}>
          Clear all filters
        </button>
      </div>
    </aside>
  );
}