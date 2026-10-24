'use client';

/** Page header inside the admin layout: title on the left, page actions (e.g. Save) on the right. */
export function AdminHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-border">
      <div className="px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-primary truncate">{title}</h1>
          {description && <p className="text-sm text-foreground/55 mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
