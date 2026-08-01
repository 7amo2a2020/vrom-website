/**
 * The VROM icon family, lifted from the design's §6 sheet.
 *
 * One system: a 24×24 grid, stroke 1.4, round caps and joins, no fill and no
 * gradient. Colour comes from `stroke`, so the same path serves the blue
 * category icons, the green trust icons and the red problem icons.
 *
 * The circle behind an icon is always a **separate element underneath** — never
 * drawn inside the SVG — which is what keeps the halo and the glyph independent
 * (design.md §6).
 */

type IconProps = {
  size?: number
  stroke?: string
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}

/** Every glyph as raw path data, so a consumer can re-render it at any size. */
export const iconPaths = {
  // ---------------------------------------------------------- the 5 categories
  mechanics: [
    'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1',
    'M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z',
  ],
  electrics: [
    'M4 8h13a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2z',
    'M7 8V6M14 8V6',
    'M11.5 10.5L9 14h2.5l-.5 3 2.8-4h-2.4l.6-2.5z',
  ],
  suspension: ['M12 2.5v3.5', 'M12 18v3.5', 'M8 6h8M8 18h8', 'M8.5 8l7 2.2-7 2.2 7 2.2'],
  body: [
    'M2.5 15h19',
    'M4 15l1.8-5.2A2.5 2.5 0 018.2 8h7.6a2.5 2.5 0 012.4 1.8L20 15',
    'M4 15v2.5M20 15v2.5',
    'M6.5 17.5a1.5 1.5 0 103 0M14.5 17.5a1.5 1.5 0 103 0',
  ],
  filters: [
    'M8 4h8v3.2a2 2 0 01-.6 1.4L14 10v8a2 2 0 01-2 2 2 2 0 01-2-2v-8L8.6 8.6A2 2 0 018 7.2V4z',
    'M18.5 13.5c1.2 1.6 1.8 2.7 1.8 3.5a1.8 1.8 0 11-3.6 0c0-.8.6-1.9 1.8-3.5z',
  ],

  // ------------------------------------------------------ the 3 part conditions
  brandNew: [
    'M12 2.8l2.6 1.5 3 .2.9 2.9 2 2.2-1.2 2.8.2 3-2.7 1.3-1.7 2.5-3-.5-2.9.5-1.7-2.5L5 15.4l.2-3L4 9.6l2-2.2.9-2.9 3-.2L12 2.8z',
    'M9.2 11.8l2 2 3.6-3.8',
  ],
  aftermarket: ['M4 8.5h13l-2.6-2.6M20 15.5H7l2.6 2.6', 'M4 8.5l2.6-2.6M20 15.5l-2.6 2.6'],
  used: ['M20 12a8 8 0 11-3.2-6.4', 'M20 4v4.2h-4.2', 'M12 8v4.4l3 1.8'],

  // ----------------------------------------------------------- the 4 trust marks
  verified: [
    'M12 2.8l7.5 2.7v6c0 4.4-3.1 8.3-7.5 9.7-4.4-1.4-7.5-5.3-7.5-9.7v-6L12 2.8z',
    'M8.8 11.8l2.2 2.2 4.2-4.4',
  ],
  shipping: [
    'M2.5 7.5h9.5v8.5h-9.5z',
    'M12 10.5h4l3 3v2.5h-7z',
    'M5.5 16a1.6 1.6 0 103.2 0M15 16a1.6 1.6 0 103.2 0',
  ],
  rating: ['M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5z'],
  phoneAuth: [
    'M8 2.8h8a1.6 1.6 0 011.6 1.6v15.2A1.6 1.6 0 0116 21.2H8a1.6 1.6 0 01-1.6-1.6V4.4A1.6 1.6 0 018 2.8z',
    'M10.4 17.6h3.2',
    'M9.6 8.6h4.8v3.8H9.6zM10.9 8.6V7.4a1.1 1.1 0 012.2 0v1.2',
  ],

  // ------------------------------------------------------------- the 3 pain points
  searching: ['M4.5 19.5l4.6-4.6', 'M11.2 4.2a6 6 0 100 12 6 6 0 000-12z', 'M9 10.2h4.4'],
  priceTag: [
    'M11.4 3.4h6.2a2.6 2.6 0 012.6 2.6v6.2L11.6 21 3 12.4 11.4 3.4z',
    'M16.4 7.6h.01',
    'M7.4 12.2l4.4 4.4',
  ],
  returns: ['M20 12a8 8 0 11-3.2-6.4', 'M20 4v4.2h-4.2', 'M9.6 9.6l4.8 4.8M14.4 9.6l-4.8 4.8'],

  // -------------------------------------------------------------------- interface
  /** RTL: "next" points left. */
  next: ['M14 6l-6 6 6 6'],
  prev: ['M10 6l6 6-6 6'],
  chevronDown: ['M6 10l6 6 6-6'],
  check: ['M5.5 12.5l4.2 4.2 8.8-9.4'],
  plus: ['M12 5v14M5 12h14'],
  close: ['M6 6l12 12M18 6L6 18'],
  scrollDown: ['M12 5v13M12 18l-5-5M12 18l5-5'],
  chat: ['M4 5.5h16v10H9l-5 4v-14z'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  mail: ['M3.5 6.5h17v11h-17z', 'M4 7l8 6 8-6'],
  list: ['M4 6h16M4 12h10M4 18h13'],

  // --------------------------------------------------------------------- social
  facebook: ['M14.8 7.4h-1.7A2.1 2.1 0 0011 9.5V21M8.6 13.2h5.8'],
  instagram: [
    'M8 3.8h8A4.2 4.2 0 0120.2 8v8a4.2 4.2 0 01-4.2 4.2H8A4.2 4.2 0 013.8 16V8A4.2 4.2 0 018 3.8z',
    'M12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2z',
    'M16.7 7.3h.01',
  ],
  tiktok: ['M14 4.2v10.6a3.5 3.5 0 11-3.5-3.5h.7', 'M14 4.2c.4 2.3 2 3.7 4.3 3.9'],
  whatsapp: [
    'M3.5 20.5l1.3-4A8.2 8.2 0 1112 20.2a8.2 8.2 0 01-4.1-1.1l-4.4 1.4z',
    'M9 9.2c0 2.6 3.2 5.8 5.8 5.8.6 0 1.2-.6 1.2-1.2l-1.6-1-1 .8c-1-.4-2.6-2-3-3l.8-1-1-1.6c-.6 0-1.2.6-1.2 1.2z',
  ],

  // ------------------------------------------------------------------ store logos
  googlePlay: ['M4 3.5l11 8.5-11 8.5V3.5zM4 3.5l8.2 6.3M4 20.5l8.2-6.3'],
  appStore: [
    'M16.3 12.4c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.9.9-3.6 2.3-1.5 2.7-.4 6.6 1.1 8.8.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.9-1.1 2.6-2.1M14.6 4.2c.6-.8 1-1.8.9-2.9',
  ],
} as const

export type IconName = keyof typeof iconPaths

/** A glyph on its own. Decorative by default — pair it with a readable label. */
export function Icon({
  name,
  size = 24,
  stroke = 'currentColor',
  strokeWidth = 1.4,
  className,
  style,
}: IconProps & { name: IconName }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {iconPaths[name].map((d) => (
        <path
          key={d}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

/**
 * A glyph over a coloured disc — the two stacked, not nested, per §6.
 * The icon is about half the disc's diameter.
 */
export function IconHalo({
  name,
  size = 64,
  halo = 'var(--color-primary-light)',
  stroke = 'var(--color-primary)',
  className = '',
}: {
  name: IconName
  size?: number
  halo?: string
  stroke?: string
  className?: string
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: halo }}
      />
      <Icon
        name={name}
        size={size / 2}
        stroke={stroke}
        className="relative"
      />
    </span>
  )
}
