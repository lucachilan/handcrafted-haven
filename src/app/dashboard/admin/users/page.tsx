import Link from "next/link";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { updateUserRole, deleteUser } from "@/actions/user-act";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import styles from "./page.module.css";

const ALL_ROLES = Object.values(Role) as Role[];

const ROLE_PILL: Record<Role, string> = {
  [Role.ADMIN]: "pill--danger",
  [Role.ARTISAN]: "pill--warning",
  [Role.CUSTOMER]: "pill--success",
};

export const metadata = { title: "Admin · Users" };

export default async function AdminUsersPage() {
  const user = await requireRole(Role.ADMIN);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      _count: {
        select: {
          products: true,
          orders: true,
        },
      },
    },
    orderBy: { email: "asc" },
  });

  return (
    <DashboardShell user={user} active="/dashboard/admin/users">
      <h1 className="section-title">Manage Users</h1>
      <p className="text-muted">
        {users.length} account{users.length === 1 ? "" : "s"} in the store.
      </p>

      <div className={`card ${styles.tableCard}`}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Products</th>
                <th>Orders</th>
                <th>Role</th>
                <th>Change role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {users.map((userRow) => {
              const isAdmin = userRow.role === Role.ADMIN;

              return (
                <tr key={userRow.id}>
                  <td>
                    <Link
                      href={`/dashboard/admin/users/${userRow.id}/edit`}
                      className={styles.userName}
                    >
                      {userRow.name ?? "Unnamed user"}
                    </Link>
                    <div className={styles.userEmail}>{userRow.email}</div>
                  </td>
                  <td>{userRow._count.products}</td>
                  <td>{userRow._count.orders}</td>
                  <td>
                    <span className={`pill ${ROLE_PILL[userRow.role]}`}>
                      {userRow.role}
                    </span>
                  </td>
                  <td>
                    {isAdmin ? (
                      <span className={styles.locked}>Locked</span>
                    ) : (
                      <form
                        action={updateUserRole.bind(null, userRow.id)}
                        className={styles.roleForm}
                      >
                        <select
                          name="role"
                          className="input"
                          defaultValue={userRow.role}
                        >
                          {ALL_ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </form>
                    )}
                  </td>
                  <td>
                    <form action={deleteUser.bind(null, userRow.id)}>
                      <button
                        type="submit"
                        className="btn btn-danger"
                        disabled={isAdmin}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}