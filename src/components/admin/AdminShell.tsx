'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ExternalLink, LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { SignOutDialog } from '@/components/admin/ConfirmDialog';
import { cn } from '@/lib/utils';
import { BLOG_NAV, HOME_SECTIONS, PARENT_PAGES_NAV, PRODUCTS_NAV, USERS_NAV, getHomeSection } from '@/components/admin/admin-nav';

/** Admin layout: fixed sidebar on desktop, slide-out menu on smaller screens. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col bg-primary text-white">
        <SidebarContent />
      </aside>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-primary text-white border-none flex flex-col [&>button]:text-white">
          <SheetTitle className="sr-only">Admin menu</SheetTitle>
          <SidebarContent onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <AdminTopBar
          leading={
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg text-primary hover:bg-background transition-colors"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </button>
              <Logo onLight />
            </div>
          }
        />
        {children}
      </div>
    </div>
  );
}

function Logo({ onLight }: { onLight?: boolean }) {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <span className={cn('relative w-20 h-10 bg-white rounded-lg shrink-0', onLight && 'border border-border')}>
        <Image src="/Logo-Asset.png" alt="AMCO Valves" fill className="object-contain p-1.5" />
      </span>
      <span className={cn('text-sm font-bold leading-tight', onLight && 'hidden sm:block text-primary')}>
        Admin
        <span className={cn('block text-[11px] font-medium', onLight ? 'text-foreground/50' : 'text-white/50')}>Website manager</span>
      </span>
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  return (
    <>
      <div className="px-5 py-6 border-b border-white/10">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Suspense fallback={null}>
          <NavLinks onNavigate={onNavigate} />
        </Suspense>
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink className="size-4" /> View website
        </Link>
        <button
          type="button"
          onClick={() => setConfirmSignOut(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="size-4" /> Sign out
        </button>
        <SignOutDialog open={confirmSignOut} onOpenChange={setConfirmSignOut} />
      </div>
    </>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSection = pathname === '/admin' ? getHomeSection(searchParams.get('section')).key : null;

  return (
    <>
      <NavGroup title="Website content">
        {HOME_SECTIONS.map((section) => (
          <NavItem
            key={section.key}
            href={`/admin?section=${section.key}`}
            icon={section.icon}
            label={section.label}
            active={activeSection === section.key}
            onNavigate={onNavigate}
          />
        ))}
      </NavGroup>
      <NavGroup title="Blog">
        <NavItem
          href={BLOG_NAV.href}
          icon={BLOG_NAV.icon}
          label={BLOG_NAV.label}
          active={pathname.startsWith(BLOG_NAV.href)}
          onNavigate={onNavigate}
        />
      </NavGroup>
      <NavGroup title="Products">
        <NavItem
          href={PRODUCTS_NAV.href}
          icon={PRODUCTS_NAV.icon}
          label={PRODUCTS_NAV.label}
          active={pathname.startsWith(PRODUCTS_NAV.href)}
          onNavigate={onNavigate}
        />
        <NavItem
          href={PARENT_PAGES_NAV.href}
          icon={PARENT_PAGES_NAV.icon}
          label={PARENT_PAGES_NAV.label}
          active={pathname.startsWith(PARENT_PAGES_NAV.href)}
          onNavigate={onNavigate}
        />
      </NavGroup>
      <NavGroup title="Settings">
        <NavItem
          href={USERS_NAV.href}
          icon={USERS_NAV.icon}
          label={USERS_NAV.label}
          active={pathname.startsWith(USERS_NAV.href)}
          onNavigate={onNavigate}
        />
      </NavGroup>
    </>
  );
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  onNavigate,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
        active ? 'bg-white/10 text-white' : 'text-white/65 hover:text-white hover:bg-white/5',
      )}
    >
      {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-secondary" />}
      <Icon className={cn('size-[18px] shrink-0', active ? 'text-secondary' : '')} />
      {label}
    </Link>
  );
}
