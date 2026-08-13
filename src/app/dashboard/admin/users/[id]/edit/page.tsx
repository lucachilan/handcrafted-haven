import Link from "next/link";
import { notFound } from "next/navigation";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { updateUser, deleteUser } from "@/actions/user-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import styles from "./page.module.css";

const ALL_ROLES = Object.values(Role) as Role[];

interface AdminEditUserPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Admin · Edit User" };

export default async function AdminEditUserPage({
  params,
}: AdminEditUserPageProps) {
  const { id } = await params;
  const user = await requireRole(Role.ADMIN);

  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      role: true,
      profileImageUrl: true,
    },
  });

  if (!targetUser) {
    notFound();
  }

  const isAdmin = targetUser.role === Role.ADMIN;

  return (
    <DashboardShell user={user} active="/dashboard/admin/users">
      <Link href="/dashboard/admin/users" className="btn btn-secondary">
        Back to users
      </Link>

      <h1 className="section-title">Edit User</h1>

      <form
        action={updateUser.bind(null, targetUser.id)}
        className="card card--pad"
      >
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
            defaultValue={targetUser.name ?? ""}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input"
            defaultValue={targetUser.email}
          />
        </div>

        <div className="form-field">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="input"
            defaultValue={targetUser.role}
            disabled={isAdmin}
          >
            {ALL_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {isAdmin && (
            <p className="form-hint">
              Administrator accounts cannot change their role.
            </p>
          )}
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
            defaultValue={targetUser.bio ?? ""}
          />
        </div>

        <div className="form-field">
          <label htmlFor="profileImageUrl" className="form-label">
            Profile image URL (optional)
          </label>
          <input
            type="url"
            id="profileImageUrl"
            name="profileImageUrl"
            placeholder="https://images.unsplash.com/..."
            className="input"
            defaultValue={targetUser.profileImageUrl ?? ""}
          />
        </div>

        <button type="submit" className="btn btn-primary btn--block">
          Save changes
        </button>
      </form>

      <div className={styles.deleteZone}>
        <form action={deleteUser.bind(null, targetUser.id)}>
          <button
            type="submit"
            className="btn btn-danger"
            disabled={isAdmin}
          >
            Delete this user
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}