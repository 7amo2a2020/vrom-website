import { useRef } from 'react'
import { Icon } from './Icons'
import { Eyebrow, Ltr } from './ui'
import { sampleOffers } from '../data/content'
import {
  NARROW,
  ramp,
  useFitScale,
  useMediaQuery,
  useReducedMotion,
  useScrollProgress,
} from '../hooks/useMotion'

/** Merchant nodes the request fans out to. Only the matching ones answer. */
const NODES = 7

/**
 * "You didn't find it — so the offers come to you."
 *
 * The scene the site rests on: one request leaves the phone, reaches the
 * merchants who deal in that brand, and the offers come back so the choice is
 * made sitting down — on price or on rating — instead of walking the market
 * asking shop after shop.
 *
 * Scroll-scrubbed, so the story advances at the reader's pace rather than
 * playing at them. RTL throughout: the request travels right → left.
 */
export function Offers() {
  const track = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const progress = useScrollProgress(track)
  const narrow = useMediaQuery(NARROW)

  const scale = useFitScale(scene, () =>
    typeof window === 'undefined' ? 0 : window.innerHeight - 72,
  )

  const send = reduced ? 1 : ramp(progress, 0.06, 0.26) // the request leaves
  const reach = reduced ? 1 : ramp(progress, 0.24, 0.5) // merchants light up
  const back = reduced ? 1 : ramp(progress, 0.48, 0.82) // offers return
  const pick = reduced ? 1 : ramp(progress, 0.8, 0.94) // the choice

  const offers = narrow ? sampleOffers.slice(0, 2) : sampleOffers
  // Cheapest is not automatically best — the payoff is that you decide.
  const cheapest = 1

  return (
    <section
      id="offers"
      ref={track}
      className="blueprint relative"
      style={{
        height: reduced ? 'auto' : narrow ? '210vh' : '320vh',
        backgroundColor: 'var(--color-bg-alt)',
      }}
    >
      <div className="sticky top-0 flex min-h-screen items-center px-5 py-10 sm:px-6">
        <div
          ref={scene}
          className="mx-auto flex w-full max-w-[1216px] flex-col gap-6"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          <div className="flex flex-col items-center gap-2.5 text-center">
            <Eyebrow tone="plain">مش لاقي القطعة؟</Eyebrow>
            <h2 className="max-w-[26ch] text-[clamp(26px,3.6vw,44px)] leading-[1.25] font-extrabold text-balance">
              بدل ما تلف إنت… العروض تيجيلك
            </h2>
            <p className="hidden max-w-[58ch] text-[clamp(16px,1.4vw,19px)] text-text-2 text-pretty md:block">
              ابعت طلبك مرة واحدة لكل التجار المتخصصين في ماركة عربيتك، واقعد
              استنى العروض — واختار بأقل سعر أو أعلى تقييم، على مزاجك إنت.
            </p>
          </div>

          <div className="flex flex-wrap items-stretch gap-6">
            {/* ------------------------------------------- request → merchants */}
            <div className="flex min-w-[280px] flex-1 basis-[320px] flex-col gap-5 rounded-3xl border border-[#D3E5F6] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(31,94,163,.35)]">
              <span className="text-[15px] font-bold">طلبك راح لمين</span>

              <div
                className="flex items-center gap-3 rounded-2xl border px-4 py-3 transition-[border-color,background-color] duration-300"
                style={{
                  borderColor: send > 0.5 ? 'var(--color-primary)' : 'var(--color-border-soft)',
                  background: send > 0.5 ? '#F7FBFF' : '#fff',
                }}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <Icon name="list" size={18} stroke="var(--color-primary)" strokeWidth={1.8} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-bold">طرمبة بنزين</span>
                  <span className="text-[13px] text-text-2">
                    <Ltr>Nissan Sunny 2021</Ltr>
                  </span>
                </span>
              </div>

              {/* The request travelling right → left, the RTL direction. */}
              <div className="relative h-1.5 overflow-hidden rounded-full bg-primary-light">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-cover))] transition-transform duration-300 ease-linear"
                  style={{ transform: `scaleX(${send})`, transformOrigin: 'right center' }}
                />
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(52px,1fr))] gap-2.5">
                {Array.from({ length: NODES }, (_, i) => {
                  // Only merchants who deal in this brand light up.
                  const matched = i < 4
                  const lit = reduced || (matched && reach > (i / 4) * 0.9)
                  return (
                    <span
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-2xl border transition-[opacity,transform,background-color,border-color] duration-[400ms] [transition-timing-function:var(--ease-out-quint)]"
                      style={
                        lit
                          ? {
                              background: 'var(--color-primary-light)',
                              borderColor: 'var(--color-primary)',
                              opacity: 1,
                              transform: 'translateY(-3px)',
                            }
                          : {
                              background: '#FBFDFF',
                              borderColor: 'var(--color-hairline)',
                              opacity: matched ? 0.5 : 0.3,
                              transform: 'none',
                            }
                      }
                    >
                      <Icon
                        name="verified"
                        size={20}
                        stroke={lit ? 'var(--color-primary)' : 'var(--color-text-3)'}
                        strokeWidth={1.5}
                      />
                    </span>
                  )
                })}
              </div>
              <p className="text-sm text-text-2">
                بيروح للتجار المتخصصين في ماركتك بس — مش لأي حد.
              </p>
            </div>

            {/* ----------------------------------------------- offers coming back */}
            <div className="flex min-w-[300px] flex-[2] basis-[520px] flex-col gap-4 rounded-3xl border border-[#D3E5F6] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(31,94,163,.35)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[15px] font-bold">
                  العروض اللي وصلتك
                  <span className="rounded-full bg-[#EEF4FA] px-2.5 py-1 text-xs font-bold text-text-2">
                    عيّنة
                  </span>
                </span>
                <span className="flex items-center gap-2 rounded-full bg-primary-light px-3.5 py-1.5 text-sm font-bold text-cover">
                  إنت اللي تختار
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {offers.map((o, i) => {
                  const shown = reduced || back > (i / offers.length) * 0.92
                  const chosen = pick > 0.5 && i === cheapest
                  return (
                    <div
                      key={o.shop}
                      className="flex flex-wrap items-center gap-4 rounded-2xl border p-4 transition-[opacity,transform,border-color,box-shadow] duration-[450ms] [transition-timing-function:var(--ease-out-quint)] will-change-[transform,opacity]"
                      style={{
                        opacity: shown ? 1 : 0,
                        // Offers arrive from the right, like the request left.
                        transform: shown ? 'none' : 'translateX(24px)',
                        borderColor: chosen
                          ? 'var(--color-success)'
                          : 'var(--color-hairline)',
                        boxShadow: chosen
                          ? '0 12px 28px -14px rgba(34,145,58,.45)'
                          : 'none',
                      }}
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="flex items-center gap-2 text-[16px] font-bold">
                          {o.shop}
                          {chosen && (
                            <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-xs font-bold text-success">
                              اخترته
                            </span>
                          )}
                        </span>
                        <span className="flex flex-wrap items-center gap-2 text-[13px] text-text-2">
                          <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-semibold text-cover">
                            {o.condition}
                          </span>
                          <span>{o.warranty}</span>
                        </span>
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Icon name="rating" size={16} stroke="var(--color-warn)" strokeWidth={1.6} />
                        <Ltr className="text-[15px] font-bold text-text-1">{o.rating}</Ltr>
                      </span>

                      <span className="flex items-baseline gap-1.5">
                        <Ltr className="text-[24px] font-extrabold text-cover">{o.price}</Ltr>
                        <span className="text-sm font-semibold text-text-2">جنيه</span>
                      </span>
                    </div>
                  )
                })}
              </div>

              <div
                className="flex flex-wrap items-center gap-3 border-t border-[#F1F6FC] pt-4 transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-out-quint)]"
                style={{ opacity: pick, transform: `translateY(${16 - 16 * pick}px)` }}
              >
                <span className="flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-cover))] px-5 py-3 text-[clamp(15px,1.6vw,20px)] font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(31,94,163,.7)]">
                  <Icon name="check" size={20} stroke="#fff" strokeWidth={2.4} />
                  واللي تختاره يوصلك البيت
                </span>
                <span className="hidden max-w-[38ch] text-sm text-text-2 lg:block">
                  أقل سعر ولا أعلى تقييم؟ إنت اللي تقرّر — وإحنا نشحنها لحد باب بيتك.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
