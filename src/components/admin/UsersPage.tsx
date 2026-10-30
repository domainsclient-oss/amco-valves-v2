'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { KeyRound, Loader2, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Section } from '@/components/admin/fields';
import { Button } from '@/components/ui/button';

interface AdminAccount {
  uid: string;
  email: string;
}

function formatDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-border last:border-none">
      <span className="text-xs font-bold uppercase tracking-wide text-foreground/50 sm:w-40 shrink-0">{label}</span>
      <span className={mono ? 'text-sm text-primary font-mono break-all select-all' : 'text-sm text-primary break-all'}>{value}</span>
    </div>
  );
}

/** The signed-in admin's profile and the list of accounts with admin access. */
export function UsersPage() {
  const db = useFirestore();
  const auth = useAuth();
  const { user } = useUser();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminAccount[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getDocs(collection(db, 'roles_admin'))
      .then((snap) =>
        setAdmins(
          snap.docs.map((d) => {
            const data = d.data();
            return { uid: d.id, email: typeof data.email === 'string' ? data.email : '' };
          }),
        ),
      )
      .catch((err) => setLoadError(err?.message ?? 'Could not load the admin users.'));
  }, [db]);

  // The profile menu links to #profile; scroll there once the page has rendered.
  useEffect(() => {
    if (window.location.hash === '#profile') document.getElementById('profile')?.scrollIntoView({ block: 'start' });
  }, []);

  const sendReset = async () => {
    if (!user?.email) return;
    setIsSending(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast({ title: 'Email sent', description: `A link to change your password was sent to ${user.email}.` });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not send the email', description: err?.message });
    } finally {
      setIsSending(false);
    }
  };

  const provider = user?.providerData[0]?.providerId === 'password' ? 'Email and password' : user?.providerData[0]?.providerId ?? '—';

  return (
    <div className="pb-24">
      <AdminHeader title="Users" description="Your profile and the accounts that can use this admin dashboard." />

      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-5xl">
        <div id="profile" className="scroll-mt-40">
          <Section title="Your profile" description="The account you are signed in with.">
            <div className="flex items-center gap-4">
              <span className="size-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold uppercase shrink-0">
                {user?.email?.[0] ?? 'A'}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-primary truncate">{user?.email}</p>
                <p className="text-xs text-green-700 font-semibold inline-flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> Admin
                </p>
              </div>
            </div>
            <div>
              <Detail label="Email" value={user?.email ?? '—'} />
              <Detail label="User ID" value={user?.uid ?? '—'} mono />
              <Detail label="Sign-in method" value={provider} />
              <Detail label="Account created" value={formatDate(user?.metadata.creationTime)} />
              <Detail label="Last sign-in" value={formatDate(user?.metadata.lastSignInTime)} />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="outline" onClick={sendReset} disabled={isSending || !user?.email}>
                {isSending ? <Loader2 className="size-4 mr-1 animate-spin" /> : <KeyRound className="size-4 mr-1" />}
                Change password
              </Button>
              <p className="text-xs text-foreground/50">We'll email you a secure link to set a new password.</p>
            </div>
          </Section>
        </div>

        <Section title={`Admin users${admins ? ` (${admins.length})` : ''}`} description="Accounts listed in the roles_admin collection in Firestore can sign in here.">
          {loadError ? (
            <p className="text-sm text-destructive">{loadError}</p>
          ) : !admins ? (
            <div className="py-8 flex justify-center">
              <Loader2 className="size-6 animate-spin text-secondary" />
            </div>
          ) : (
            <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
              {admins.map((admin) => {
                const isYou = admin.uid === user?.uid;
                const email = admin.email || (isYou ? user?.email ?? '' : '');
                return (
                  <div key={admin.uid} className="flex items-center gap-3 p-3 bg-white">
                    <span className="size-9 rounded-full bg-background text-primary flex items-center justify-center shrink-0">
                      <UserRound className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-primary truncate">
                        {email || 'Email not recorded'}
                        {isYou && <span className="ml-2 text-xs font-semibold text-secondary">You</span>}
                      </p>
                      <p className="text-xs text-foreground/50 font-mono truncate">{admin.uid}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-xs text-foreground/50">
            To give someone admin access, create their account in Firebase Console → Authentication, then add a document with their user ID to the{' '}
            <code>roles_admin</code> collection.
          </p>
        </Section>
      </main>
    </div>
  );
}
