import { useMemo, useState } from "react";
import { registerAction } from "@/actions/auth-act";
import { normalizeUrl } from "@/lib/image-profile-check";
import styles from "@/app/auth/form.module.css";

const imageValidationMsg =
  "Invalid URL, try another URL or a valid image extension (.jpg .png .jpeg .webp .gif .svg)";


export default function RegisterArtisanForm() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageUrlError, setProfileImageUrlError] = useState<
    string | null
  >(null);

  const profileImageHintId = useMemo(() => "profileImageUrlHint", []);
  const profileImageErrorId = useMemo(() => "profileImageUrlError", []);

  const validateProfileImageUrl = (value: string) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      setProfileImageUrlError(null);
      return true;
    }

    const isValid = Boolean(normalizeUrl(normalizedValue));
    setProfileImageUrlError(isValid ? null : imageValidationMsg);

    return isValid;
  };

  return (
    <form action={registerAction} className={styles.authForm}>
      <input type="hidden" name="role" value="ARTISAN" />

      <div className={styles.formField}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.label} htmlFor="profileImageUrl">
          Profile Photo URL (optional)
        </label>
        <input
          type="url"
          id="profileImageUrl"
          name="profileImageUrl"
          placeholder="https://images.unsplash.com/..."
          className={styles.input}
          value={profileImageUrl}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setProfileImageUrl(nextValue);

            if (profileImageUrlError) {
              validateProfileImageUrl(nextValue);
            }
          }}
          onBlur={(event) => {
            validateProfileImageUrl(event.currentTarget.value);
          }}
          aria-invalid={profileImageUrlError ? true : undefined}
          aria-describedby={
            profileImageUrlError
              ? `${profileImageHintId} ${profileImageErrorId}`
              : profileImageHintId
          }
        />
      </div>

      <p id={profileImageHintId} className={styles.fieldHint}>
        Enter a public image URL (http/https). Accepted if the URL ends with
        .jpg, .jpeg, .png, .webp, .gif, or .svg, or if it is from a supported
        image host.
      </p>

      {profileImageUrlError && (
        <p
          id={profileImageErrorId}
          className={styles.fieldError}
          role="alert"
          aria-live="polite"
        >
          {profileImageUrlError}
        </p>
      )}

      <button
        type="submit"
        className={`btn btn-primary ${styles.submit}`}
        disabled={Boolean(profileImageUrlError)}
      >
        Create Artisan Account
      </button>
    </form>
  );
}
