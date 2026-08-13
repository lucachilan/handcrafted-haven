import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell/DashboardShell";
import DeleteAccountForm from "@/components/DeleteAccountForm/DeleteAccountForm";
import styles from "./page.module.css";

export const metadata = { title: "My Settings" };

export default async function CustomerSettingsPage() {
  const user = await requireRole(Role.CUSTOMER);

  const account = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true },
  });

  return (
    <DashboardShell user={user} active="/dashboard/customer/settings">
      <h1 className="section-title">Account Settings</h1>

      <div className={styles.account}>
        <dl>
          <div className={styles.field}>
            <dt>Name</dt>
            <dd>{account?.name ?? "—"}</dd>
          </div>
          <div className={styles.field}>
            <dt>Email</dt>
            <dd>{account?.email}</dd>
          </div>
          <div className={styles.field}>
            <dt>Role</dt>
            <dd>Customer</dd>
          </div>
        </dl>
      </div>

      <DeleteAccountForm />
    </DashboardShell>
  );
}