'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldAlert } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHomeContent } from '@/hooks/use-home-content';
import { defaultHomeContent, siteImage } from '@/lib/home-content';

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
      .then((snap) => {
        if (!active) return;
        setIsAdmin(snap.exists());
        // Keep the Users list up to date: the admin's email and last visit (once per browser session).
        const key = `admin-seen:${user.uid}`;
        let seen = false;
        try {
          seen = sessionStorage.getItem(key) === '1';
          sessionStorage.setItem(key, '1');
        } catch {}
        if (snap.exists() && !seen) {
          setDoc(snap.ref, { id: user.uid, email: user.email ?? '', lastSignInAt: serverTimestamp() }, { merge: true }).catch(() => {});
        }
      })
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
  const { header } = useHomeContent();
  const logoSrc = siteImage(header.logo.src, defaultHomeContent.header.logo.src);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
        {/* Site logo (editable in the admin Header section). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={header.logo.alt} className="h-16 w-auto max-w-[12rem] object-contain mx-auto" />
        <div className="h-px bg-border my-6" />
        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
        <p className="text-sm text-foreground/60 mt-1">Sign in to manage the website content.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary font-semibold">Email</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 pointer-events-none" />
            <Input
              id="email"
              type="email"
              required
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-11 rounded-xl bg-background border-border focus-visible:ring-secondary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-primary font-semibold">Password</Label>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pl-11 pr-12 rounded-xl bg-background border-border focus-visible:ring-secondary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
            <ShieldAlert className="size-4 shrink-0" />
            {error}
          </div>
        )}
        <Button type="submit" variant="secondary" className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-secondary/20" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isSubmitting ? 'Signing in…' : 'Sign In'}
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
