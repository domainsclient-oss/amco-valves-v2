'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, doc, onSnapshot, query, updateDoc, where, writeBatch, type Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Bell, ExternalLink, LogOut, Mail, Phone, UserRound } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { SignOutDialog } from '@/components/admin/ConfirmDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/** Top bar of the admin content area: notifications and the profile menu. */
export function AdminTopBar({ leading }: { leading?: React.ReactNode }) {
  return (
    <div
      className="sticky top-0 z-40 h-16 bg-white border-b border-border flex items-center justify-between gap-4 px-4 lg:px-10"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', boxSizing: 'content-box' }}
    >
      <div className="flex items-center gap-3 min-w-0">{leading}</div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <ProfileMenu />
      </div>
    </div>
  );
}

const iconButton =
  'relative size-10 rounded-full flex items-center justify-center text-primary/70 hover:text-primary hover:bg-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: Date | null;
}

/** Live list of contact-form enquiries that haven't been marked as read. */
function NotificationBell() {
  const db = useFirestore();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'contactSubmissions'), where('status', '==', 'New'));
    return onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => {
          const data = d.data();
          const meta = data.metadata ?? {};
          return {
            id: d.id,
            name: meta.name ?? 'Unknown',
            email: meta.email ?? '',
            phone: meta.phone ?? '',
            message: meta.message ?? '',
            submittedAt: (data.submittedAt as Timestamp | undefined)?.toDate?.() ?? null,
          };
        });
        list.sort((a, b) => (b.submittedAt?.getTime() ?? 0) - (a.submittedAt?.getTime() ?? 0));
        setEnquiries(list);
      },
      // Missing rules or permissions: just show no notifications instead of breaking the dashboard.
      () => setEnquiries([]),
    );
  }, [db]);

  const markRead = (id: string) => updateDoc(doc(db, 'contactSubmissions', id), { status: 'Read' }).catch(() => {});

  const markAllRead = async () => {
    const batch = writeBatch(db);
    enquiries.forEach((e) => batch.update(doc(db, 'contactSubmissions', e.id), { status: 'Read' }));
    await batch.commit().catch(() => {});
  };

  const count = enquiries.length;

  return (
    <Popover>
      <PopoverTrigger className={iconButton} aria-label={count ? `${count} new enquiries` : 'Notifications'}>
        <Bell className="size-5" />
        {count > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(24rem,calc(100vw-2rem))] p-0 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="font-bold text-primary">New enquiries</p>
          {count > 0 && (
            <button type="button" onClick={markAllRead} className="text-xs font-semibold text-secondary hover:underline">
              Mark all as read
            </button>
          )}
        </div>
        {count === 0 ? (
          <div className="px-4 py-10 text-center">
            <Bell className="size-8 text-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-foreground/50">You're all caught up.</p>
          </div>
        ) : (
          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-border">
            {enquiries.map((e) => (
              <li key={e.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-sm text-primary">{e.name}</p>
                  {e.submittedAt && (
                    <span className="text-[11px] text-foreground/40 whitespace-nowrap">
                      {formatDistanceToNow(e.submittedAt, { addSuffix: true })}
                    </span>
                  )}
                </div>
                {e.message && <p className="text-xs text-foreground/60 line-clamp-2">{e.message}</p>}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/50">
                  {e.email && (
                    <span className="inline-flex items-center gap-1 select-all">
                      <Mail className="size-3" /> {e.email}
                    </span>
                  )}
                  {e.phone && (
                    <span className="inline-flex items-center gap-1 select-all">
                      <Phone className="size-3" /> {e.phone}
                    </span>
                  )}
                  <button type="button" onClick={() => markRead(e.id)} className="ml-auto font-semibold text-secondary hover:underline">
                    Mark as read
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}

function ProfileMenu() {
  const { user } = useUser();
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const initial = user?.email?.[0]?.toUpperCase() ?? 'A';

  return (
    <>
      {/* Non-modal: a modal menu that opens a confirmation popup can leave the page unclickable. */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary" aria-label="Account menu">
          <span className="size-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
            {initial}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 rounded-xl">
          <DropdownMenuLabel className="font-normal">
            <p className="text-xs text-foreground/50">Signed in as</p>
            <p className="text-sm font-semibold text-primary truncate">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin/users#profile" className="cursor-pointer">
              <UserRound className="size-4 mr-2" /> View profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/" target="_blank" className="cursor-pointer">
              <ExternalLink className="size-4 mr-2" /> View website
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setConfirmSignOut(true)} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
            <LogOut className="size-4 mr-2" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Rendered outside the menu so it stays open after the menu closes. */}
      <SignOutDialog open={confirmSignOut} onOpenChange={setConfirmSignOut} />
    </>
  );
}
