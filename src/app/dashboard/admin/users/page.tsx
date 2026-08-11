import { listUsers, updateUserRole, deleteUser } from "./actions";
import { Role } from "@prisma/client";

const ROLE_OPTIONS: Role[] = [Role.CUSTOMER, Role.ARTISAN, Role.ADMIN];

const ROLE_COLORS: Record<Role, string> = {
  ADMIN: "#fef2f2",
  ARTISAN: "#fffbeb",
  CUSTOMER: "#f0fdf4",
};

const ROLE_TEXT_COLORS: Record<Role, string> = {
  ADMIN: "#b91c1c",
  ARTISAN: "#b45309",
  CUSTOMER: "#15803d",
};

export const metadata = {
  title: "User Management — Handcrafted Haven Admin",
};

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            color: "var(--color-secondary)",
            marginBottom: "0.25rem",
          }}
        >
          User Management
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          {users.length} registered user{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "var(--color-secondary)",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {["Name", "Email", "Role", "Change Role", "Delete"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                style={{
                  background: idx % 2 === 0 ? "#fff" : "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background 0.15s",
                }}
              >
                {/* Name */}
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#111827",
                  }}
                >
                  {user.name ?? <span style={{ color: "#9ca3af" }}>—</span>}
                </td>

                {/* Email */}
                <td
                  style={{
                    padding: "0.85rem 1.25rem",
                    fontSize: "0.875rem",
                    color: "#374151",
                    fontFamily: "monospace",
                  }}
                >
                  {user.email}
                </td>

                {/* Current role badge */}
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.7rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: ROLE_COLORS[user.role],
                      color: ROLE_TEXT_COLORS[user.role],
                    }}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Change role form */}
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  <form
                    action={async (formData: FormData) => {
                      "use server";
                      const newRole = formData.get("role") as Role;
                      await updateUserRole(user.id, newRole);
                    }}
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                  >
                    <select
                      name="role"
                      defaultValue={user.role}
                      id={`role-select-${user.id}`}
                      style={{
                        padding: "0.35rem 0.6rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid #d1d5db",
                        fontSize: "0.8rem",
                        fontFamily: "inherit",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      id={`update-role-${user.id}`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--color-secondary)",
                        color: "#fff",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        fontFamily: "inherit",
                        transition: "opacity 0.15s",
                      }}
                    >
                      Save
                    </button>
                  </form>
                </td>

                {/* Delete form */}
                <td style={{ padding: "0.85rem 1.25rem" }}>
                  <form
                    action={async () => {
                      "use server";
                      await deleteUser(user.id);
                    }}
                  >
                    <button
                      type="submit"
                      id={`delete-user-${user.id}`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        background: "#fef2f2",
                        color: "#b91c1c",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1px solid #fca5a5",
                        fontFamily: "inherit",
                        transition: "background 0.15s",
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                  }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
