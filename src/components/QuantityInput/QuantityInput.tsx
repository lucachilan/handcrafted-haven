"use client";

import { useState } from "react";
import styles from "./QuantityInput.module.css";

interface QuantityInputProps {
  name?: string;
  max?: number;
  defaultValue?: number;
}

export default function QuantityInput({
  name = "quantity",
  max,
  defaultValue = 1,
}: QuantityInputProps) {
  const upper =
    typeof max === "number" && max > 0 ? max : Number.MAX_SAFE_INTEGER;
  const [value, setValue] = useState(
    Math.min(Math.max(defaultValue, 1), upper),
  );

  function handleChange(next: number) {
    setValue(Math.min(Math.max(next, 1), upper));
  }

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        className={styles.button}
        onClick={() => handleChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        name={name}
        min={1}
        max={typeof max === "number" ? max : undefined}
        value={value}
        onChange={(event) => {
          const parsed = parseInt(event.target.value, 10);
          handleChange(Number.isFinite(parsed) ? parsed : 1);
        }}
        className={styles.input}
        aria-label="Quantity"
      />
      <button
        type="button"
        className={styles.button}
        onClick={() => handleChange(value + 1)}
        disabled={value >= upper}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}