'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { AlertTriangle, Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/firebase';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * A confirmation popup. Pass `trigger` to open it from a button, or control it
 * with `open` / `onOpenChange` (e.g. from a dropdown item). Stays open with a
 * spinner while an async `onConfirm` runs.
 */
export function ConfirmDialog({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  destructive = true,
  icon: Icon = AlertTriangle,
  onConfirm,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  destructive?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onConfirm: () => void | Promise<unknown>;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const isOpen = open ?? internalOpen;

  // Safety net: after the popup closes (and its animation ends), make sure the page is
  // clickable again unless another popup or menu is still open. Overlapping Radix layers
  // (e.g. a menu that opened this popup) can otherwise leave `pointer-events: none` on <body>.
  useEffect(() => {
    if (isOpen) return;
    const timer = window.setTimeout(() => {
      const stillOpen = document.querySelector('[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"], [role="menu"][data-state="open"]');
      if (!stillOpen && document.body.style.pointerEvents === 'none') {
        document.body.style.pointerEvents = '';
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const setOpen = (value: boolean) => {
    if (isRunning) return;
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  const handleConfirm = async () => {
    setIsRunning(true);
    try {
      await onConfirm();
    } finally {
      setIsRunning(false);
      setInternalOpen(false);
      onOpenChange?.(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="rounded-3xl max-w-[calc(100vw-2rem)] sm:max-w-md">
        <AlertDialogHeader className="sm:text-left">
          <div
            className={cn(
              'size-12 rounded-2xl flex items-center justify-center mb-2 mx-auto sm:mx-0',
              destructive ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary',
            )}
          >
            <Icon className="size-6" />
          </div>
          <AlertDialogTitle className="text-primary">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isRunning}>Cancel</AlertDialogCancel>
          <Button variant={destructive ? 'destructive' : 'secondary'} onClick={handleConfirm} disabled={isRunning} className="font-semibold">
            {isRunning && <Loader2 className="size-4 mr-2 animate-spin" />}
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** "Sign out?" confirmation, opened from the sidebar or the profile menu. */
export function SignOutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const auth = useAuth();

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out?"
      description="You will need to log in again to manage the website. Any unsaved changes will be lost."
      confirmLabel="Sign out"
      icon={LogOut}
      onConfirm={() => signOut(auth)}
    />
  );
}
