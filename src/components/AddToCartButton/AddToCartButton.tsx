"use client";

import { useFormStatus } from "react-dom";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
  className?: string;
  idleText?: string;
  pendingText?: string;
}

export default function AddToCartButton({
  className = "",
  idleText = "Add to cart",
  pendingText = "Adding…",
}: AddToCartButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${styles.button} ${className}`.trim()}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? pendingText : idleText}
    </button>
  );
}