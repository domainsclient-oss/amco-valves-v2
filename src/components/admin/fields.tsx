'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/** Form building blocks shared by the admin editors. */

export function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-primary font-semibold">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="min-h-[110px] bg-background border-none" />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-background border-none" />
      )}
      {hint && <p className="text-xs text-foreground/50">{hint}</p>}
    </div>
  );
}

/** Edits a list of strings as a textarea with one item per line. */
export function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <Field
      label={label}
      value={value.join('\n')}
      onChange={(text) => onChange(text.split('\n'))}
      multiline
      hint="One item per line."
    />
  );
}

export function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-3xl border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}


/**
 * A button's text, plus a Link / ID switch that shows one box at a time,
 * so each button takes little space in the editor.
 */
export function ButtonField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { label: string; href: string; id: string };
  onChange: (value: { label: string; href: string; id: string }) => void;
}) {
  const [tab, setTab] = useState<'href' | 'id'>('href');

  return (
    <div className="space-y-2">
      <Label className="text-primary font-semibold">{label}</Label>
      <div className="rounded-xl bg-background p-1.5 space-y-1.5">
        <Input
          value={value.label}
          onChange={(e) => onChange({ ...value, label: e.target.value })}
          placeholder="Button text"
          aria-label={`${label} text`}
          className="bg-white border-none"
        />
        <div className="flex items-center gap-1.5">
          <div role="tablist" className="flex shrink-0 rounded-lg bg-white p-0.5">
            {(['href', 'id'] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
                  tab === key ? 'bg-primary text-white' : 'text-foreground/55 hover:text-primary',
                )}
              >
                {key === 'href' ? 'Link' : 'ID'}
                {/* A dot shows an ID has been set while the Link tab is open. */}
                {key === 'id' && value.id && tab !== 'id' && <span className="ml-1 inline-block size-1.5 rounded-full bg-secondary align-middle" />}
              </button>
            ))}
          </div>
          {tab === 'href' ? (
            <Input
              value={value.href}
              onChange={(e) => onChange({ ...value, href: e.target.value })}
              placeholder="/#contact, #products, /blog or https://…"
              aria-label={`${label} link`}
              className="bg-white border-none h-9 text-sm"
            />
          ) : (
            <Input
              value={value.id}
              onChange={(e) => onChange({ ...value, id: e.target.value })}
              placeholder="Optional, e.g. hero-catalog-button"
              aria-label={`${label} ID`}
              className="bg-white border-none h-9 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
