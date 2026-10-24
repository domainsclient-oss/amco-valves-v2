import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AdminGate } from '@/components/admin/AdminGate';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Admin Dashboard | AMCO Valves',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminGate>
        <AdminShell>{children}</AdminShell>
      </AdminGate>
      <Toaster />
    </div>
  );
}
