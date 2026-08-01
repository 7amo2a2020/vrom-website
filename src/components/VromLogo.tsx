/**
 * The VROM mark — a "V" whose right arm carries a wrench.
 *
 * Same geometry as the app's launcher icon and the admin panel's
 * `VromLogo.tsx`, so the three surfaces are literally the same mark rather than
 * three drawings of one. Never mirrored, even in RTL (design.md §5).
 */
export function VromMark({
  size = 38,
  color = 'var(--color-primary)',
  className = '',
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path
        d="M11 14 24 36 37 14"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 8.5a4.6 4.6 0 0 0-5.6 5.9l-2.2 3.4 3 2 2.2-3.4A4.6 4.6 0 0 0 37 12l-2.6 1.5-2.3-1.3.3-2.7L34 8.5Z"
        fill={color}
      />
    </svg>
  )
}

/**
 * Mark plus wordmark. `tone="dark"` is the footer variant: the mark goes white
 * on the dark surface instead of losing itself in it.
 */
export function VromLogo({
  tone = 'light',
  size = 38,
}: {
  tone?: 'light' | 'dark'
  size?: number
}) {
  const onDark = tone === 'dark'
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="flex items-center justify-center rounded-xl"
        style={{
          width: size,
          height: size,
          background: onDark ? 'rgba(255,255,255,.10)' : 'var(--color-primary-light)',
        }}
      >
        <VromMark
          size={size * 0.72}
          color={onDark ? '#FFFFFF' : 'var(--color-primary)'}
        />
      </span>
      <span
        className="text-[19px] font-extrabold tracking-[1px]"
        style={{ color: onDark ? '#FFFFFF' : 'var(--color-text-1)' }}
      >
        VROM
      </span>
    </span>
  )
}
