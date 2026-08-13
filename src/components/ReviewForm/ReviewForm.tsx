"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createReview } from "@/actions/review-act";
import styles from "./ReviewForm.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? "Submitting…" : "Post review"}
    </button>
  );
}

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);

  return (
    <form action={createReview} className={styles.form}>
      <input type="hidden" name="productId" value={productId} />

      <div role="radiogroup" aria-label="Your rating">
        <span className={styles.label}>Your rating</span>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating >= star}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              className={`${styles.starButton} ${
                rating >= star ? styles.starButtonActive : ""
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Title (optional)</span>
        <input
          type="text"
          name="title"
          className={styles.input}
          placeholder="e.g. Beautiful craftsmanship"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Your review</span>
        <textarea
          name="body"
          rows={4}
          className={styles.textarea}
          placeholder="Share your experience with this piece..."
          required
        />
      </label>

      <SubmitButton />
    </form>
  );
}