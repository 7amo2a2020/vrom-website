/**
 * The Apple and Google Play marks.
 *
 * Redrawn rather than fetched so the badge is a single inline SVG with no extra
 * request, but the proportions and colours follow the official artwork —
 * anything else reads as a knock-off.
 *
 * ⚠️ Both are trademarks. Apple's and Google's badge guidelines expect the
 * badge to link to a live listing, which is exactly why ours is disabled and
 * carries «قريبًا» until the app actually ships. When it does, swap these for
 * the official artwork from Apple's Marketing Resources and Google's Play
 * Badge generator, in the localised (Arabic) variant.
 */

export function AppleMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M17.05 12.04c-.03-2.4 1.96-3.56 2.05-3.62-1.12-1.63-2.86-1.86-3.48-1.88-1.48-.15-2.89.87-3.64.87-.75 0-1.91-.85-3.14-.83-1.62.02-3.11.94-3.94 2.39-1.68 2.91-.43 7.22 1.2 9.58.8 1.16 1.75 2.46 3 2.41 1.2-.05 1.66-.78 3.11-.78 1.45 0 1.86.78 3.13.75 1.29-.02 2.11-1.18 2.9-2.35.91-1.35 1.29-2.65 1.31-2.72-.03-.01-2.51-.96-2.54-3.82Z"
        fill="currentColor"
      />
      <path
        d="M14.7 4.9c.66-.8 1.11-1.92.99-3.03-.95.04-2.11.63-2.79 1.43-.61.71-1.15 1.85-1.01 2.94 1.06.08 2.15-.54 2.81-1.34Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** The four-colour play triangle. Colours are the brand's, not our palette. */
export function GooglePlayMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.61 1.81 13.79 12 3.61 22.19A2.01 2.01 0 0 1 3 20.75V3.25c0-.56.24-1.07.61-1.44Z"
        fill="#00A0FF"
      />
      <path
        d="M17.74 15.94 13.79 12l3.95-3.94 3.29 1.87c1.03.58 1.03 2.06 0 2.64l-3.29 1.87Z"
        fill="#FFBC00"
      />
      <path
        d="M3.61 1.81a2.02 2.02 0 0 1 1.99-.06l12.14 6.31L13.79 12 3.61 1.81Z"
        fill="#00CF5C"
      />
      <path
        d="M13.79 12l3.95 3.94L5.6 22.25a2.02 2.02 0 0 1-1.99-.06L13.79 12Z"
        fill="#FF3A44"
      />
    </svg>
  )
}
