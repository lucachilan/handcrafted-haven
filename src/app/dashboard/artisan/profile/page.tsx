import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { updateArtisanProfileAction } from "@/actions/profile-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import DeleteAccountForm from "@/components/DeleteAccountForm/DeleteAccountForm";
import styles from "./page.module.css";

export const metadata = { title: "My Profile" };

export default async function ArtisanProfilePage() {
  const user = await requireRole(Role.ARTISAN);

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, bio: true, profileImageUrl: true, email: true },
  });

  return (
    <DashboardShell user={user} active="/dashboard/artisan/profile">
      <h1 className="section-title">My Profile</h1>

      <form
        action={updateArtisanProfileAction}
        className={`card card--pad ${styles.form}`}
      >
        <p className="text-muted">
          This profile is shown on your public artisan page.
        </p>

        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input"
            defaultValue={profile?.name ?? ""}
          />
        </div>

        <div className="form-field">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="textarea"
            defaultValue={profile?.bio ?? ""}
          />
        </div>

        <div className="form-field">
          <label htmlFor="profileImageUrl" className="form-label">
            Profile photo URL (optional)
          </label>
          <input
            type="url"
            id="profileImageUrl"
            name="profileImageUrl"
            placeholder="https://images.unsplash.com/..."
            className="input"
            defaultValue={profile?.profileImageUrl ?? ""}
          />
        </div>

        <button type="submit" className="btn btn-primary btn--block">
          Save profile
        </button>
      </form>

      <div className={styles.deleteZone}>
        <DeleteAccountForm />
      </div>
    </DashboardShell>
  );
}