/**
 * Data + image helpers for the Near Insanity concept preview (multi-page
 * demo rooted at /cartoon-preview). Frontend-only: no payment, signup,
 * referral tracking, or downloadable image generation.
 */

/** Where Bob's cartoon images live (public assets, served at this path). */
export const ART_BASE = '/near-insanity-preview/art';

/** Image formats probed in order, so Bob can drop jpg, png, or webp files. */
export const EXTS = ['jpg', 'png', 'webp'] as const;
export type Ext = (typeof EXTS)[number];
export type Resolution = Ext | 'missing';

export interface Cartoon {
  id: string;
  title: string;
  tag: string;
  base: string; // path without extension — the loader probes jpg → png → webp
  alt: string;
}

// The supplied cartoons. "Too Much to Dream" is the featured bedroom cartoon;
// the two rock-and-roll cartoons sit alongside it. The gallery layout scales
// to Bob's full 50-cartoon catalog — just add more entries to this array.
export const CARTOONS: Cartoon[] = [
  {
    id: 'too-much-to-dream',
    title: '“Too Much to Dream”',
    tag: 'Strange everyday moments',
    base: `${ART_BASE}/cartoon-too-much-to-dream`,
    alt: 'Bob Johnson cartoon, “Too Much to Dream”: a bedroom scene where an ordinary night of sleep turns into an absurd, overflowing dream.',
  },
  {
    id: 'rock-1',
    title: 'Rock ’n’ Roll Chaos #1',
    tag: 'Rock-and-roll chaos',
    base: `${ART_BASE}/cartoon-rock-1`,
    alt: 'Bob Johnson rock-and-roll cartoon #1: onstage pandemonium — amps, noise, and energy running wild.',
  },
  {
    id: 'rock-2',
    title: 'Rock ’n’ Roll Chaos #2',
    tag: 'Rock-and-roll chaos',
    base: `${ART_BASE}/cartoon-rock-2`,
    alt: 'Bob Johnson rock-and-roll cartoon #2: a second scene of stage-side chaos and loud, absurd rock-and-roll.',
  },
];

/** The four pack sizes; 10 is the proposed starting offer. */
export const PACKS = [
  { size: 10, desc: 'A starter set of Bob’s best cartoons — the proposed starting pack.' },
  { size: 20, desc: 'A deeper run through the favourites.' },
  { size: 30, desc: 'A solid wall of absurdity.' },
  { size: 50, desc: 'The near-complete shared catalog.' },
] as const;

export interface Offer {
  key: string; // 'packs/10' | 'packs/20' | 'packs/30' | 'packs/50' | 'membership'
  label: string;
  href: string;
  size?: number; // pack size for pack offers
  blurb: string;
}

/** The five offers that will live on nearinsanity.com. */
export const OFFERS: Offer[] = [
  {
    key: 'packs/10',
    label: '10-Cartoon Pack',
    href: '/cartoon-preview/packs/10',
    size: 10,
    blurb: 'The proposed starting pack — a starter set of Bob’s best cartoons.',
  },
  {
    key: 'packs/20',
    label: '20-Cartoon Pack',
    href: '/cartoon-preview/packs/20',
    size: 20,
    blurb: 'A deeper run through the favourites.',
  },
  {
    key: 'packs/30',
    label: '30-Cartoon Pack',
    href: '/cartoon-preview/packs/30',
    size: 30,
    blurb: 'A solid wall of absurdity.',
  },
  {
    key: 'packs/50',
    label: '50-Cartoon Pack',
    href: '/cartoon-preview/packs/50',
    size: 50,
    blurb: 'The near-complete shared catalog.',
  },
  {
    key: 'membership',
    label: 'Membership',
    href: '/cartoon-preview/membership',
    blurb: 'Ongoing access to the catalog — $25/month proposed.',
  },
];

/** Resolved src for a cartoon given the current probe state. */
export function srcFor(cartoon: Cartoon, resolved: Record<string, Resolution>) {
  const r = resolved[cartoon.id];
  if (!r || r === 'missing') return `${cartoon.base}.jpg`;
  return `${cartoon.base}.${r}`;
}

export function isMissing(cartoon: Cartoon, resolved: Record<string, Resolution>) {
  return resolved[cartoon.id] === 'missing';
}

/** Advance the probe state for a failed image load (jpg → png → webp). */
export function advanceResolution(
  prev: Record<string, Resolution>,
  id: string,
): Record<string, Resolution> {
  const cur = prev[id];
  // No entry yet means the default .jpg probe is what just failed — advance
  // straight to the next candidate so the src actually changes.
  if (!cur) return { ...prev, [id]: EXTS[1] };
  const idx = cur === 'missing' ? -1 : EXTS.indexOf(cur);
  if (idx === -1 || idx >= EXTS.length - 1) {
    return { ...prev, [id]: 'missing' };
  }
  return { ...prev, [id]: EXTS[idx + 1] };
}