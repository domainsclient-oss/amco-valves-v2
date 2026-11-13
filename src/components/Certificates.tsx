"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Search, CheckCircle2, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

/**
 * The enlarged logo in the lightbox, with zoom: the + / − buttons, the mouse wheel,
 * or a click / double-tap zoom in; drag (mouse or finger) to look around while zoomed.
 * The original file is shown (no re-compression) so zoomed detail stays sharp.
 */
function ZoomableLogo({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  // Zoom level and pan offset (px from centre), kept together so they always change as one.
  const [view, setView] = useState({ zoom: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; startY: number; x: number; y: number; moved: boolean } | null>(null);
  const { zoom } = view;

  /** Keeps the zoomed image covering the frame, so it can't be dragged out of view. */
  const clamp = (x: number, y: number, z: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const maxX = ((z - 1) * rect.width) / 2;
    const maxY = ((z - 1) * rect.height) / 2;
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };

  /** Zooms towards a point (relative to the frame centre), so what's under the cursor stays put. */
  const zoomTo = (next: number | ((z: number) => number), point = { x: 0, y: 0 }) =>
    setView((v) => {
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, typeof next === "function" ? next(v.zoom) : next));
      const ratio = z / v.zoom;
      return { zoom: z, ...clamp(point.x - (point.x - v.x) * ratio, point.y - (point.y - v.y) * ratio, z) };
    });

  const pointFrom = (clientX: number, clientY: number) => {
    const rect = frameRef.current!.getBoundingClientRect();
    return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 };
  };

  // The wheel listener must be non-passive to stop the page from scrolling behind the lightbox.
  const zoomToRef = useRef(zoomTo);
  zoomToRef.current = zoomTo;
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = frame.getBoundingClientRect();
      const point = { x: e.clientX - rect.left - rect.width / 2, y: e.clientY - rect.top - rect.height / 2 };
      zoomToRef.current((z) => z * (e.deltaY < 0 ? 1.15 : 1 / 1.15), point);
    };
    frame.addEventListener("wheel", onWheel, { passive: false });
    return () => frame.removeEventListener("wheel", onWheel);
  }, []);

  const zoomed = zoom > 1;

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={frameRef}
        className={`absolute inset-0 overflow-hidden touch-none select-none ${zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { startX: e.clientX, startY: e.clientY, x: view.x, y: view.y, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.startX;
          const dy = e.clientY - d.startY;
          if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
          if (zoomed && d.moved) {
            setDragging(true);
            setView((v) => ({ ...v, ...clamp(d.x + dx, d.y + dy, v.zoom) }));
          }
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          setDragging(false);
          // A click (not a drag) zooms in on that spot; once fully zoomed it zooms back out.
          if (d && !d.moved) {
            if (zoom >= MAX_ZOOM) zoomTo(1);
            else zoomTo(zoom === 1 ? 2 : zoom + ZOOM_STEP * 2, pointFrom(e.clientX, e.clientY));
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
      >
        <div
          className={`absolute inset-0 will-change-transform ${dragging ? "" : "transition-transform duration-150 ease-out"}`}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${zoom})` }}
        >
          <Image src={src} alt={alt} fill unoptimized draggable={false} className="object-contain p-3 md:p-5" priority />
        </div>
      </div>

      {/* Zoom controls, bottom-right inside the card */}
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm border border-primary/10 shadow-sm p-1">
        <button
          type="button"
          onClick={() => zoomTo((z) => z - ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="p-1.5 md:p-2 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ZoomOut className="size-4 md:size-5" />
        </button>
        <span className="min-w-[3ch] text-center text-xs font-bold text-primary tabular-nums" aria-live="polite">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomTo((z) => z + ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="p-1.5 md:p-2 rounded-full text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ZoomIn className="size-4 md:size-5" />
        </button>
        {zoomed && (
          <button
            type="button"
            onClick={() => zoomTo(1)}
            aria-label="Reset zoom"
            className="p-1.5 md:p-2 rounded-full text-primary hover:bg-primary/10 transition-all"
          >
            <RotateCcw className="size-4 md:size-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function Certificates({ content = defaultHomeContent.certificates }: { content?: HomeContent["certificates"] }) {
  const [selectedLogo, setSelectedLogo] = useState<ImagePlaceholder | null>(null);

  // Only site paths are rendered; anything else would break next/image.
  const certLogos = content.logos
    .filter((logo) => logo.src.startsWith("/"))
    .map((logo) => ({ id: logo.id, imageUrl: logo.src, description: logo.alt, imageHint: logo.hint }));

  const { approvals, thirdParty } = content;

  // The grid fits three logos; a fourth or more switches to the marquee.
  const logosMarquee = certLogos.length > 3;

  // The marquee track renders the logos twice for a seamless loop; the copy is hidden from keyboard and screen readers.
  // The name entered for each logo in the admin is shown under its tile.
  const renderLogo = (logo: ImagePlaceholder, idx: number, extraClassName = "", isCopy = false) => (
    <div
      key={`${isCopy ? "copy-" : ""}${logo?.id || idx}`}
      aria-hidden={isCopy || undefined}
      className={`flex flex-col gap-2 md:gap-3 ${extraClassName}`}
    >
      <div
        role="button"
        tabIndex={isCopy ? -1 : 0}
        aria-label={`View ${logo.description}`}
        onClick={() => setSelectedLogo(logo)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedLogo(logo);
          }
        }}
        className={`relative h-[110px] md:h-auto md:aspect-[1.4/1] rounded-[1.5rem] bg-white border border-border shadow-sm overflow-hidden p-4 flex items-center justify-center hover:shadow-lg hover:border-secondary/20 transition-all duration-300 cursor-zoom-in`}
      >
        {logo && (
          <Image
            src={logo.imageUrl}
            alt={logo.description}
            fill
            className="object-contain p-4 md:p-6"
            data-ai-hint={logo.imageHint}
          />
        )}
      </div>
      {logo.description && (
        <p className="text-center text-xs md:text-sm font-semibold text-primary leading-snug line-clamp-2 px-1">
          {logo.description}
        </p>
      )}
    </div>
  );

  return (
    <section id="certificates" className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="size-5 md:size-3.5" />
              {content.badge}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              {content.title}
            </h3>
            <p className="text-[#000000] text-lg mb-12 leading-relaxed max-w-xl">
              {content.description}
            </p>

            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  {content.approvalsHeading}
                </h4>
                <ul className="grid gap-4 sm:grid-cols-1">
                  {approvals.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#000000] text-sm">
                      <CheckCircle2 className="text-secondary shrink-0 mt-0.5 size-7 md:size-[18px]" />
                      <span className="leading-tight font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {/* Up to three logos sit still in the grid; from the fourth on they run as a marquee.
                  Marquee tiles match the grid size (2 per row, 3 on lg), looping right to left.
                  Widths use the strip's width (cqw) and spacing is a right margin, so the -50% loop is seamless. */}
              {!logosMarquee ? (
                certLogos.map((logo, idx) => renderLogo(logo, idx))
              ) : (
                <div className="col-span-2 lg:col-span-3 min-w-0 overflow-hidden pt-1 pb-3 [container-type:inline-size]">
                  <div
                    className="flex w-max animate-marquee will-change-transform"
                    style={{ animationDuration: `${Math.max(certLogos.length, 3) * 6}s` }}
                  >
                    {[false, true].flatMap((isCopy) =>
                      certLogos.map((logo, idx) =>
                        renderLogo(
                          logo,
                          idx,
                          "shrink-0 mr-4 md:mr-5 w-[calc((100cqw-1rem)/2)] md:w-[calc((100cqw-1.25rem)/2)] lg:w-[calc((100cqw-2.5rem)/3)]",
                          isCopy
                        )
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="col-span-2 lg:col-span-3 p-6 md:p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                <h4 className="text-base md:text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Search className="text-secondary size-8 md:size-5" />
                  {content.thirdPartyHeading}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {thirdParty.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 md:px-4 py-1.5 bg-white border border-border rounded-full text-[10px] md:text-[12px] font-bold text-primary shadow-sm hover:border-secondary/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 bg-primary p-6 md:p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 flex flex-col justify-center items-center text-center">
                <h5 className="text-lg md:text-xl font-bold mb-2">{content.boxTitle}</h5>
                <p className="text-white text-[11px] md:text-xs max-w-xs">
                  {content.boxText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Lightbox Dialog */}
      <Dialog open={!!selectedLogo} onOpenChange={(open) => !open && setSelectedLogo(null)}>
        <DialogContent className="max-w-[95vw] max-h-[98vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-visible z-[100]">
          <div className="relative w-full h-full flex items-center justify-center p-4 md:px-12 md:py-4">
            {!selectedLogo?.description && (
              <DialogTitle className="sr-only">Certificate Logo View</DialogTitle>
            )}

            {selectedLogo && (
              <>
                <div className="relative w-full max-w-3xl aspect-[1/1.2] max-h-[96vh] rounded-3xl overflow-hidden bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-300 flex flex-col">
                  {/* The certificate name sits inside the card, above the enlarged logo; side padding keeps it clear of the close button. */}
                  {selectedLogo.description && (
                    <DialogTitle className="shrink-0 text-center text-lg md:text-2xl font-bold text-primary px-14 md:px-16 pt-5 md:pt-7 leading-snug">
                      {selectedLogo.description}
                    </DialogTitle>
                  )}
                  <ZoomableLogo key={selectedLogo.imageUrl} src={selectedLogo.imageUrl} alt={selectedLogo.description} />
                  <button
                    onClick={() => setSelectedLogo(null)}
                    aria-label="Close"
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 transition-all"
                  >
                    <X className="size-5 md:size-6" />
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
