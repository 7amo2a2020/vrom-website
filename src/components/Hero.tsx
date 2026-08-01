import { useEffect, useState } from 'react'
import { IconHalo } from './Icons'
import { AppleMark, GooglePlayMark } from './StoreMarks'
import { screens, trustStrip } from '../data/content'
import { useReducedMotion } from '../hooks/useMotion'

const STORES = [
  { name: 'Google Play', lead: 'احصل عليه من', Mark: GooglePlayMark },
  { name: 'App Store', lead: 'نزّلها من', Mark: AppleMark },
]

const TOOLTIP = 'التطبيق في المراحل الأخيرة — سيب إيميلك ونبلّغك أول ما ينزل.'

/**
 * Store badges for an app that has not shipped.
 *
 * They have to read as *deliberately* off rather than broken: greyed, cursor
 * `not-allowed`, a «قريبًا» tag, and — unlike every other control on the page —
 * no lift on hover. The explanation lands in a live region so it reaches a
 * screen reader too, and focus triggers it as well as hover.
 */
function StoreBadges({ tone = 'light' }: { tone?: 'light' | 'onBlue' }) {
  const [tip, setTip] = useState('')
  const onBlue = tone === 'onBlue'

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {STORES.map(({ name, lead, Mark }) => (
          <div key={name} className="relative">
            <div
              role="button"
              aria-disabled="true"
              tabIndex={0}
              aria-label={`${name} — قريبًا، التطبيق لسه ما نزلش`}
              onMouseEnter={() => setTip(TOOLTIP)}
              onMouseLeave={() => setTip('')}
              onFocus={() => setTip(TOOLTIP)}
              onBlur={() => setTip('')}
              className={`flex h-[58px] cursor-not-allowed items-center gap-3 rounded-[10px] bg-black px-4 text-white ${
                onBlue ? 'border border-white/25' : 'border border-black/10'
              }`}
              // Not the full-strength badge: it links nowhere yet, and reading
              // as live would promise a download that does not exist.
              style={{ opacity: 0.82 }}
            >
              <Mark size={26} />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[11px] text-white/85">{lead}</span>
                <span dir="ltr" className="mt-1 text-[19px] leading-tight font-semibold">
                  {name}
                </span>
              </span>
            </div>
            <span className="absolute -top-2.5 -end-2 rounded-full bg-warn px-2.5 py-1 text-xs font-bold text-white shadow-[0_2px_8px_rgba(196,122,30,.35)]">
              قريبًا
            </span>
          </div>
        ))}
      </div>
      <div
        role="status"
        aria-live="polite"
        className="min-h-[22px] text-sm"
        style={{ color: onBlue ? '#DDEBF8' : 'var(--color-text-2)' }}
      >
        {tip}
      </div>
    </div>
  )
}

export { StoreBadges }

/** The phone frame whose screens cycle. Tapping a dot stops the autoplay. */
function PhoneMockup() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (reduced || !auto) return
    const id = setInterval(() => setActive((i) => (i + 1) % screens.length), 2600)
    return () => clearInterval(id)
  }, [reduced, auto])

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-[268px] rounded-[46px] bg-[linear-gradient(160deg,#16324F,#0D1B2E)] p-3 shadow-[0_40px_80px_-40px_rgba(13,27,46,.65)] sm:w-[288px]">
        <div className="absolute start-1/2 top-[22px] z-10 h-5 w-[92px] -translate-x-1/2 rounded-full bg-[#0A1420]" />
        <div className="relative aspect-[640/1386] overflow-hidden rounded-[36px] bg-[#0D1B2E]">
          {screens.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 size-full object-contain transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] will-change-[opacity,transform]"
              style={{
                opacity: i === active ? 1 : 0,
                // RTL: the incoming screen arrives from the right.
                transform:
                  i === active ? 'none' : `translateX(${i > active ? 7 : -7}%)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full border border-[#D3E5F6] bg-white px-4.5 py-2.5 text-center text-sm font-bold text-cover shadow-[0_6px_18px_-10px_rgba(31,94,163,.4)]">
          {screens[active].caption}
        </div>
        <div role="tablist" aria-label="شاشات التطبيق" className="flex gap-2">
          {screens.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.alt}
              onClick={() => {
                setAuto(false)
                setActive(i)
              }}
              className="flex size-11 items-center justify-center"
            >
              <span
                className="block h-2 rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: i === active ? 26 : 8,
                  background:
                    i === active ? 'var(--color-primary)' : 'var(--color-border-soft)',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="blueprint relative overflow-hidden px-5 pt-8 pb-8 sm:px-6 lg:pt-10">
      {/* Soft light behind the mockup — decorative, so it never intercepts a tap. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 -end-28 size-[620px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, #E1EEFA 0%, rgba(244,248,253,0) 70%)',
        }}
      />
      <div className="relative mx-auto flex max-w-[1216px] flex-wrap items-start gap-10 lg:gap-14">
        <div className="flex min-w-[300px] flex-1 basis-[480px] flex-col gap-6">
          <span className="flex items-center gap-2 self-start rounded-full border border-[#D3E5F6] bg-primary-light px-4 py-2 text-sm font-bold text-cover">
            <span className="size-2 rounded-full bg-primary" />
            قطع غيار السيارات — لكل محافظات مصر
          </span>

          <h1 className="text-[clamp(32px,5vw,58px)] leading-[1.22] font-extrabold text-balance">
            القطعة تيجيلك{' '}
            <span className="bg-[linear-gradient(180deg,transparent_62%,#D6E9F9_62%)]">
              لحد باب بيتك
            </span>
          </h1>

          <p className="max-w-[48ch] text-[clamp(17px,1.5vw,20px)] text-text-2 text-pretty">
            من نفس التاجر اللي بتشتري منه وواثق فيه — من غير ما تنزل المشوار.
            أو مش لاقيها عنده؟ ابعت طلبك ويجيلك عروض من تجار كتير، واختار بأقل
            سعر أو أعلى تقييم.
          </p>

          <StoreBadges />
        </div>

        <div className="flex min-w-[280px] flex-1 basis-[380px] justify-center">
          <PhoneMockup />
        </div>
      </div>

      {/* The reassurance row: four things we can actually stand behind. */}
      <div className="relative mx-auto mt-12 max-w-[1216px]">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-hairline bg-white/70 px-5 py-4 sm:justify-between">
          {trustStrip.map((t) => (
            <li key={t.label} className="flex items-center gap-2.5">
              <IconHalo
                name={t.icon}
                size={34}
                halo="var(--color-success-bg)"
                stroke="var(--color-success)"
              />
              <span className="text-[15px] font-bold text-text-1">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
