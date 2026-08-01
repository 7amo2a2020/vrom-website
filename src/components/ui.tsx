import type { ReactNode } from 'react'

/**
 * Shared shells. Every section shares one rhythm — `clamp(56px, 8vw, 96px)`
 * vertical, a 1216px measure — so the page reads as one document rather than a
 * stack of separately-built blocks.
 */

export function Section({
  id,
  alt = false,
  className = '',
  children,
}: {
  id?: string
  /** Alternating band. Both bands carry the same shallow gradient so the seams
   *  read as one system instead of flat swatches. */
  alt?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`px-5 py-[clamp(56px,8vw,96px)] sm:px-6 ${className}`}
      style={{
        background: alt
          ? 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 12%, var(--color-bg-alt) 88%, var(--color-bg) 100%)'
          : 'var(--color-bg)',
      }}
    >
      <div className="mx-auto flex max-w-[1216px] flex-col gap-10">{children}</div>
    </section>
  )
}

export function Eyebrow({
  children,
  tone = 'primary',
}: {
  children: ReactNode
  tone?: 'primary' | 'danger' | 'success' | 'plain'
}) {
  const tones = {
    primary: 'bg-primary-light text-cover border-[#D3E5F6]',
    danger: 'bg-danger-bg text-danger border-[#F3D2D2]',
    success: 'bg-success-bg text-success border-[#C6E7D0]',
    plain: 'bg-white text-cover border-[#D3E5F6]',
  }
  return (
    <span
      className={`self-start rounded-full border px-4 py-1.5 text-[13px] font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string
  eyebrowTone?: 'primary' | 'danger' | 'success' | 'plain'
  title: string
  lede?: string
  center?: boolean
}) {
  return (
    <div
      data-reveal="0"
      className={`flex flex-col gap-3 ${center ? 'items-center text-center' : 'max-w-[52ch]'}`}
    >
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(26px,3.4vw,42px)] leading-[1.25] font-extrabold text-balance">
        {title}
      </h2>
      {lede && (
        <p className="max-w-[56ch] text-[clamp(16px,1.4vw,19px)] text-text-2 text-pretty">
          {lede}
        </p>
      )}
    </div>
  )
}

export function Card({
  className = '',
  hover = false,
  children,
  ...rest
}: {
  className?: string
  hover?: boolean
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-hairline bg-white shadow-[0_1px_2px_rgba(13,27,46,.05)] ${
        hover
          ? 'transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_34px_-16px_rgba(31,94,163,.28)]'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

const buttonBase =
  'inline-flex items-center justify-center gap-2.5 rounded-xl font-bold transition-[transform,background-color,box-shadow,border-color] duration-[180ms] [transition-timing-function:var(--ease-out-quint)] disabled:pointer-events-none'

export const buttonStyles = {
  primary: `${buttonBase} bg-primary text-white shadow-[0_6px_16px_-6px_rgba(59,130,196,.6)] hover:-translate-y-0.5 hover:bg-[#2F72B2] hover:shadow-[0_12px_24px_-8px_rgba(31,94,163,.5)] active:translate-y-0 active:bg-cover`,
  secondary: `${buttonBase} border border-border-soft bg-white text-cover hover:-translate-y-0.5 hover:border-primary hover:bg-[#F7FBFF] active:translate-y-0`,
  ghost: `${buttonBase} text-text-2 hover:bg-primary-light hover:text-cover`,
}

/** Latin runs and digits inside Arabic text: `bdi` fixes the ordering. */
export function Ltr({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" className={`nums ${className}`}>
      {children}
    </bdi>
  )
}
