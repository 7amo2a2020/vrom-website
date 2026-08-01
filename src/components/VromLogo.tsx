import { BASE } from '../base'

/**
 * The VROM mark — the outlined "V" with a wrench worked into its right arm.
 *
 * The real artwork (`assets/images/logo.png` in the app repo) rather than a
 * redrawing of it, so the site, the app and the admin panel carry the same mark
 * exactly. It ships in two colours because one file cannot serve both a light
 * page and the dark footer: white on white is nothing, and there is no CSS
 * filter that turns white into a specific brand blue.
 *
 * Never mirrored, even in RTL (design.md §5).
 */
export function VromMark({
  size = 38,
  tone = 'blue',
  className = '',
}: {
  size?: number
  tone?: 'blue' | 'white'
  className?: string
}) {
  return (
    <img
      src={`${BASE}logo-${tone}.png`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

/**
 * Mark plus wordmark.
 *
 * The wordmark is live text rather than baked into the image: it stays crisp at
 * any size, it is selectable, and it reaches a screen reader as the company's
 * name instead of a decorative picture.
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
      <VromMark size={size} tone={onDark ? 'white' : 'blue'} />
      <span
        className="text-[19px] font-semibold tracking-[3px]"
        style={{ color: onDark ? '#FFFFFF' : 'var(--color-primary)' }}
      >
        VROM
      </span>
    </span>
  )
}
