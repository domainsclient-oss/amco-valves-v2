'use client';

import { useCallback, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, type Timestamp } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Eye, KeyRound, Loader2, MoreHorizontal, Pencil, Plus, ShieldCheck, UserMinus } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Field, Section } from '@/components/admin/fields';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ROLES_COLLECTION = 'roles_admin';

/** An admin account: its roles_admin record (the document ID is the Firebase user ID). */
interface AdminAccount {
  uid: string;
  email: string;
  name: string;
  phone: string;
  jobTitle: string;
  notes: string;
  lastSignInAt: Date | null;
  addedAt: Date | null;
}

type EditableFields = Pick<AdminAccount, 'email' | 'name' | 'phone' | 'jobTitle' | 'notes'>;

const str = (v: unknown) => (typeof v === 'string' ? v : '');
const date = (v: unknown) => (v && typeof (v as Timestamp).toDate === 'function' ? (v as Timestamp).toDate() : null);

function toAccount(uid: string, data: Record<string, unknown>): AdminAccount {
  return {
    uid,
    email: str(data.email),
    name: str(data.name),
    phone: str(data.phone),
    jobTitle: str(data.jobTitle),
    notes: str(data.notes),
    lastSignInAt: date(data.lastSignInAt),
    addedAt: date(data.addedAt),
  };
}

function formatDate(value?: string | Date | null) {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-border last:border-none">
      <span className="text-xs font-bold uppercase tracking-wide text-foreground/50 sm:w-40 shrink-0">{label}</span>
      <span className={mono ? 'text-sm text-primary font-mono break-all select-all' : 'text-sm text-primary break-all whitespace-pre-line'}>{value}</span>
    </div>
  );
}

function Avatar({ text, large }: { text: string; large?: boolean }) {
  return (
    <span
      className={
        large
          ? 'size-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold uppercase shrink-0'
          : 'size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold uppercase shrink-0'
      }
    >
      {text.trim()[0] ?? 'A'}
    </span>
  );
}

/** View an admin's details. */
function ViewDialog({ account, isYou, onClose, onEdit }: { account: AdminAccount | null; isYou: boolean; onClose: () => void; onEdit: () => void }) {
  return (
    <Dialog open={!!account} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        {account && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4 text-left">
                <Avatar text={account.name || account.email} large />
                <div className="min-w-0">
                  <DialogTitle className="text-primary truncate">{account.name || account.email || 'Admin user'}</DialogTitle>
                  <DialogDescription className="flex items-center gap-1 text-green-700 font-semibold">
                    <ShieldCheck className="size-3.5" /> Admin{isYou && ' · You'}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div>
              <Detail label="Name" value={account.name || '—'} />
              <Detail label="Email" value={account.email || 'Not recorded yet'} />
              <Detail label="Phone" value={account.phone || '—'} />
              <Detail label="Job title" value={account.jobTitle || '—'} />
              <Detail label="Notes" value={account.notes || '—'} />
              <Detail label="Last visit" value={formatDate(account.lastSignInAt)} />
              <Detail label="Added" value={formatDate(account.addedAt)} />
              <Detail label="User ID" value={account.uid} mono />
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button variant="secondary" className="font-bold" onClick={onEdit}>
                <Pencil className="size-4 mr-1" /> Edit
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Edit an admin's details, or add a new admin (with their Firebase user ID). */
function EditDialog({
  open,
  account,
  onClose,
  onSave,
}: {
  open: boolean;
  /** null = adding a new admin. */
  account: AdminAccount | null;
  onClose: () => void;
  onSave: (uid: string, fields: EditableFields) => Promise<boolean>;
}) {
  const [uid, setUid] = useState('');
  const [fields, setFields] = useState<EditableFields>({ email: '', name: '', phone: '', jobTitle: '', notes: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setUid(account?.uid ?? '');
    setFields({
      email: account?.email ?? '',
      name: account?.name ?? '',
      phone: account?.phone ?? '',
      jobTitle: account?.jobTitle ?? '',
      notes: account?.notes ?? '',
    });
  }, [open, account]);

  const set = (patch: Partial<EditableFields>) => setFields((f) => ({ ...f, ...patch }));
  const isNew = !account;
  const validUid = /^[A-Za-z0-9]{10,128}$/.test(uid.trim());

  const save = async () => {
    setIsSaving(true);
    const ok = await onSave(uid.trim(), fields);
    setIsSaving(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isSaving && onClose()}>
      <DialogContent className="max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">{isNew ? 'Add admin user' : 'Edit admin user'}</DialogTitle>
          <DialogDescription>
            {isNew
              ? 'First create the login in Firebase Console → Authentication → Add user, then paste its User UID here.'
              : 'These details are shown in the Users list. The login email and password are managed in Firebase Authentication.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {isNew && (
            <Field
              label="User UID"
              value={uid}
              onChange={setUid}
              hint={uid && !validUid ? 'This doesn\'t look like a User UID (letters and numbers, e.g. "fH3k…Q2").' : 'Copy it from the UID column in Firebase Console → Authentication.'}
            />
          )}
          <Field label="Name" value={fields.name} onChange={(name) => set({ name })} />
          <Field label="Email" value={fields.email} onChange={(email) => set({ email })} hint="The email they sign in with; updated automatically when they sign in." />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone" value={fields.phone} onChange={(phone) => set({ phone })} />
            <Field label="Job title" value={fields.jobTitle} onChange={(jobTitle) => set({ jobTitle })} />
          </div>
          <Field label="Notes" value={fields.notes} onChange={(notes) => set({ notes })} multiline />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
          <Button variant="secondary" className="font-bold" onClick={save} disabled={isSaving || (isNew && !validUid)}>
            {isSaving && <Loader2 className="size-4 mr-1 animate-spin" />}
            {isNew ? 'Add admin' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  const [viewing, setViewing] = useState<AdminAccount | null>(null);
  const [editing, setEditing] = useState<{ account: AdminAccount | null } | null>(null);
  const [removing, setRemoving] = useState<AdminAccount | null>(null);

  const load = useCallback(() => {
    getDocs(collection(db, ROLES_COLLECTION))
      .then((snap) => {
        const list = snap.docs.map((d) => toAccount(d.id, d.data()));
        // You first, then by name / email.
        list.sort((a, b) => Number(b.uid === user?.uid) - Number(a.uid === user?.uid) || (a.name || a.email).localeCompare(b.name || b.email));
        setAdmins(list);
        setLoadError(null);
      })
      .catch((err) => setLoadError(err?.message ?? 'Could not load the admin users.'));
  }, [db, user?.uid]);

  useEffect(() => {
    load();
  }, [load]);

  // The profile menu links to #profile; scroll there once the page has rendered.
  useEffect(() => {
    if (window.location.hash === '#profile') document.getElementById('profile')?.scrollIntoView({ block: 'start' });
  }, []);

  const sendReset = async (email: string, isYou: boolean) => {
    setIsSending(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: 'Email sent', description: `A link to ${isYou ? 'change your' : 'set a new'} password was sent to ${email}.` });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not send the email', description: err?.message });
    } finally {
      setIsSending(false);
    }
  };

  const saveAccount = async (uid: string, fields: EditableFields) => {
    const isNew = !admins?.some((a) => a.uid === uid);
    const trimmed = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.trim()])) as EditableFields;
    try {
      await setDoc(
        doc(db, ROLES_COLLECTION, uid),
        { id: uid, ...trimmed, updatedAt: serverTimestamp(), ...(isNew ? { addedAt: serverTimestamp(), addedBy: user?.email ?? user?.uid ?? null } : {}) },
        { merge: true },
      );
      toast({ title: isNew ? 'Admin added' : 'Saved', description: isNew ? `${trimmed.email || uid} can now sign in to this dashboard.` : 'The user details have been updated.' });
      load();
      return true;
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Could not save',
        description: err?.code === 'permission-denied' ? 'Not allowed. Please publish the latest Firestore rules and try again.' : err?.message,
      });
      return false;
    }
  };

  const removeAccount = async (account: AdminAccount) => {
    try {
      await deleteDoc(doc(db, ROLES_COLLECTION, account.uid));
      toast({ title: 'Admin access removed', description: `${account.name || account.email || account.uid} can no longer use this dashboard.` });
      load();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Could not remove access', description: err?.message });
    }
  };

  const you = admins?.find((a) => a.uid === user?.uid) ?? null;
  const provider = user?.providerData[0]?.providerId === 'password' ? 'Email and password' : user?.providerData[0]?.providerId ?? '—';

  return (
    <div className="pb-24">
      <AdminHeader
        title="Users"
        description="Your profile and the accounts that can use this admin dashboard."
        actions={
          <Button variant="secondary" className="font-bold" onClick={() => setEditing({ account: null })}>
            <Plus className="size-4 mr-1" /> Add admin
          </Button>
        }
      />

      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-5xl">
        <div id="profile" className="scroll-mt-40">
          <Section title="Your profile" description="The account you are signed in with.">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar text={you?.name || user?.email || 'A'} large />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-primary truncate">{you?.name || user?.email}</p>
                <p className="text-xs text-green-700 font-semibold inline-flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> Admin{you?.jobTitle && <span className="text-foreground/50 font-medium"> · {you.jobTitle}</span>}
                </p>
              </div>
              {you && (
                <Button variant="outline" onClick={() => setEditing({ account: you })}>
                  <Pencil className="size-4 mr-1" /> Edit profile
                </Button>
              )}
            </div>
            <div>
              {you?.name && <Detail label="Name" value={you.name} />}
              <Detail label="Email" value={user?.email ?? '—'} />
              {you?.phone && <Detail label="Phone" value={you.phone} />}
              <Detail label="User ID" value={user?.uid ?? '—'} mono />
              <Detail label="Sign-in method" value={provider} />
              <Detail label="Account created" value={formatDate(user?.metadata.creationTime)} />
              <Detail label="Last sign-in" value={formatDate(user?.metadata.lastSignInTime)} />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="outline" onClick={() => user?.email && sendReset(user.email, true)} disabled={isSending || !user?.email}>
                {isSending ? <Loader2 className="size-4 mr-1 animate-spin" /> : <KeyRound className="size-4 mr-1" />}
                Change password
              </Button>
              <p className="text-xs text-foreground/50">We'll email you a secure link to set a new password.</p>
            </div>
          </Section>
        </div>

        <Section title={`Admin users${admins ? ` (${admins.length})` : ''}`} description="Everyone who can sign in to this dashboard. Click a user to view their details.">
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
                const shown = { ...admin, email };
                return (
                  <div key={admin.uid} className="flex flex-wrap items-center gap-3 p-3 sm:p-4 bg-white">
                    <button type="button" onClick={() => setViewing(shown)} className="flex items-center gap-3 min-w-0 flex-1 text-left group">
                      <Avatar text={admin.name || email || 'A'} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary truncate group-hover:text-secondary transition-colors">
                          {admin.name || email || 'Email not recorded yet'}
                          {isYou && <span className="ml-2 text-xs font-semibold text-secondary">You</span>}
                        </p>
                        <p className="text-xs text-foreground/50 truncate">
                          {[admin.name && email, admin.jobTitle, admin.lastSignInAt && `Last visit ${formatDate(admin.lastSignInAt)}`].filter(Boolean).join(' · ') ||
                            admin.uid}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-1 ml-auto">
                      <Button size="sm" variant="ghost" onClick={() => setViewing(shown)}>
                        <Eye className="size-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditing({ account: shown })}>
                        <Pencil className="size-4 mr-1" /> Edit
                      </Button>
                      {/* Non-modal: a modal menu that opens a confirmation popup can leave the page unclickable. */}
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="px-2" aria-label="More actions">
                            <MoreHorizontal className="size-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 rounded-xl">
                          <DropdownMenuItem onSelect={() => email && sendReset(email, isYou)} disabled={!email || isSending} className="cursor-pointer">
                            <KeyRound className="size-4 mr-2" /> Send password reset email
                          </DropdownMenuItem>
                          {!isYou && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onSelect={() => setRemoving(shown)} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                                <UserMinus className="size-4 mr-2" /> Remove admin access
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-xs text-foreground/50">
            To add someone: create their login in Firebase Console → Authentication → Add user, then click <strong>Add admin</strong> and paste their User UID.
            Emails and last visits fill in automatically when each admin signs in.
          </p>
        </Section>
      </main>

      <ViewDialog
        account={viewing}
        isYou={viewing?.uid === user?.uid}
        onClose={() => setViewing(null)}
        onEdit={() => {
          setEditing({ account: viewing });
          setViewing(null);
        }}
      />
      <EditDialog open={!!editing} account={editing?.account ?? null} onClose={() => setEditing(null)} onSave={saveAccount} />
      <ConfirmDialog
        open={!!removing}
        onOpenChange={(open) => !open && setRemoving(null)}
        title="Remove admin access?"
        description={
          <>
            <strong className="text-primary">{removing?.name || removing?.email || removing?.uid}</strong> will no longer be able to use this dashboard. Their login
            itself is not deleted, and you can add them again any time.
          </>
        }
        confirmLabel="Remove access"
        icon={UserMinus}
        onConfirm={() => (removing ? removeAccount(removing) : undefined)}
      />
    </div>
  );
}
