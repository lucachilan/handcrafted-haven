import { requireRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import Sidebar from "@/components/Sidebar";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(Role.CUSTOMER);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
