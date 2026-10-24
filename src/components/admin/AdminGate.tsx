'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Loader2, LockKeyhole, ShieldAlert } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/** Shows the admin pages only to signed-in users listed in `roles_admin`. */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  // null = still checking; only meaningful for a signed-in, non-anonymous user.
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const isRealUser = !!user && !user.isAnonymous;

  useEffect(() => {
    setIsAdmin(null);
    if (!user || user.isAnonymous) return;

    let active = true;
    getDoc(doc(db, 'roles_admin', user.uid))
      .then((snap) => active && setIsAdmin(snap.exists()))
      .catch(() => active && setIsAdmin(false));
    return () => {
      active = false;
    };
  }, [user, db]);

  if (isUserLoading || (isRealUser && isAdmin === null)) {
    return (
      <CenteredCard>
        <Loader2 className="size-8 animate-spin text-secondary mx-auto" />
      </CenteredCard>
    );
  }

  // Visitors who used the contact form are signed in anonymously; they still need to log in here.
  if (!isRealUser) return <AdminLogin />;
  if (!isAdmin) return <NotAuthorized uid={user.uid} email={user.email} />;

  return <>{children}</>;
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-border p-8 md:p-10">
        {children}
      </div>
    </div>
  );
}

function AdminLogin() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('Incorrect email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CenteredCard>
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-4">
          <LockKeyhole className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
        <p className="text-sm text-foreground/60 mt-1">Sign in to manage the website content.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="secondary" className="w-full h-12 font-bold" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </CenteredCard>
  );
}

function NotAuthorized({ uid, email }: { uid: string; email: string | null }) {
  const auth = useAuth();

  return (
    <CenteredCard>
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-4">
          <ShieldAlert className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-primary">No admin access</h1>
        <p className="text-sm text-foreground/60 mt-2">
          {email ?? 'This account'} is signed in but is not an admin. Ask the site owner to add this user ID to the
          <code className="mx-1">roles_admin</code> collection in Firestore:
        </p>
        <code className="block mt-4 p-3 rounded-xl bg-background text-xs break-all select-all">{uid}</code>
        <Button variant="outline" className="mt-6" onClick={() => signOut(auth)}>
          Sign out
        </Button>
      </div>
    </CenteredCard>
  );
}
