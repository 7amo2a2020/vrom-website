import { useRef } from 'react'
import { Icon } from './Icons'
import { Eyebrow, Ltr } from './ui'
import { COMPAT_COUNT, compatCar, compatParts } from '../data/content'
import {
  NARROW,
  ramp,
  useFitScale,
  useMediaQuery,
  useReducedMotion,
  useScrollProgress,
} from '../hooks/useMotion'

const MATCHED = compatParts.filter((p) => p.matched).length

/**
 * The compatibility engine, told as a scroll-scrubbed scene — the one idea the
 * whole product rests on: a part is bound to the models it fits *before* anyone
 * sees it, which is what stops the wrong part arriving.
 *
 * The section is deliberately taller than the viewport and its child is sticky,
 * so scrolling scrubs the story rather than merely revealing it: the car fills
 * in, the matching parts light up, and the payoff line lands last.
 */
export function Compat() {
  const track = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const progress = useScrollProgress(track)

  const narrow = useMediaQuery(NARROW)
  const parts = narrow ? compatParts.slice(0, 6) : compatParts

  // The scene's natural height barely changes, so on a short phone trimming
  // content never reached far enough — it scales to fit instead of clipping.
  const scale = useFitScale(scene, () =>
    typeof window === 'undefined' ? 0 : window.innerHeight - 112,
  )

  const reveal = reduced ? 1 : ramp(progress, 0.46, 0.8)
  const payoff = reduced ? 1 : ramp(progress, 0.78, 0.92)
  const carFill = reduced ? 1 : ramp(progress, 0.04, 0.4)

  return (
    <section
      id="compat"
      ref={track}
      className="blueprint relative"
      style={{
        height: reduced ? 'auto' : narrow ? '210vh' : '320vh',
        backgroundColor: 'var(--color-bg-alt)',
      }}
    >
      <div className="sticky top-0 flex min-h-screen items-center px-5 py-14 sm:px-6">
        <div
          ref={scene}
          className="mx-auto flex w-full max-w-[1216px] flex-col gap-8"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
          <div className="flex flex-col items-center gap-3.5 text-center">
            <Eyebrow tone="plain">محرّك التوافق</Eyebrow>
            <h2 className="max-w-[24ch] text-[clamp(26px,3.6vw,44px)] leading-[1.25] font-extrabold text-balance">
              عربيتك بتحدّد اللي يظهرلك
            </h2>
            <p className="hidden max-w-[56ch] text-[clamp(16px,1.4vw,19px)] text-text-2 text-pretty md:block">
              التاجر بيرفع القطعة مرة واحدة ويربطها بالموديلات والسنين المتوافقة. إنت
              تحدّد عربيتك، وتشوف اللي بيركب عليها بس.
            </p>
          </div>

          <div className="flex flex-wrap items-stretch gap-6">
            {/* ---------------------------------------------------------- the car */}
            <div className="flex min-w-[280px] flex-1 basis-[300px] flex-col gap-4 rounded-3xl border border-[#D3E5F6] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(31,94,163,.35)]">
              <span className="text-[15px] font-bold">عربيتك</span>

              <div className="flex flex-row gap-2.5 md:flex-col md:gap-3.5">
                {compatCar.map((f) => {
                  const on = reduced || progress >= f.at
                  return (
                    <div key={f.label} className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className="text-[13px] font-semibold text-text-2">
                        {f.label}
                      </span>
                      <div
                        className="flex h-11 min-w-0 items-center justify-between gap-2 rounded-xl border px-3 transition-[border-color,background-color] duration-300 md:h-13 md:px-4"
                        style={{
                          borderColor: on
                            ? 'var(--color-primary)'
                            : 'var(--color-border-soft)',
                          background: on ? '#F7FBFF' : '#fff',
                        }}
                      >
                        <span
                          className="truncate text-[15px] font-bold transition-[opacity,transform] duration-[350ms] [transition-timing-function:var(--ease-out-quint)] md:text-[17px]"
                          style={{
                            color: on ? 'var(--color-text-1)' : 'var(--color-text-3)',
                            opacity: on ? 1 : 0.32,
                            transform: on ? 'none' : 'translateX(10px)',
                            direction: 'ltr',
                          }}
                        >
                          {on ? f.value : '—'}
                        </span>
                        <span
                          className="hidden size-6 shrink-0 items-center justify-center rounded-full transition-opacity duration-[350ms] md:flex"
                          style={{
                            background: on ? 'var(--color-primary)' : '#D7E5F3',
                            opacity: on ? 1 : 0.32,
                          }}
                        >
                          <Icon name="check" size={14} stroke="#fff" strokeWidth={2.4} />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-primary-light">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-cover))] transition-transform duration-300 ease-linear"
                  // RTL: the bar fills from the right.
                  style={{ transform: `scaleX(${carFill})`, transformOrigin: 'right center' }}
                />
              </div>

              <p className="hidden text-sm text-text-2 md:block">
                أو ادخل <Ltr className="font-bold">VIN</Ltr> (رقم الشاسيه) والتطبيق يقراه
                لوحده.
              </p>
            </div>

            {/* -------------------------------------------------------- the parts */}
            <div className="flex min-w-[300px] flex-[2] basis-[520px] flex-col gap-4 rounded-3xl border border-[#D3E5F6] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(31,94,163,.35)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[15px] font-bold">
                  القطع المعروضة
                  <span className="rounded-full bg-[#EEF4FA] px-2.5 py-1 text-xs font-bold text-text-2">
                    عيّنة
                  </span>
                </span>
                <span className="flex items-center gap-2.5 rounded-full bg-primary-light px-3.5 py-1.5">
                  <Ltr className="text-[19px] font-extrabold text-cover">
                    {Math.round(COMPAT_COUNT * reveal)}
                  </Ltr>
                  <span className="text-sm font-bold text-cover">قطعة متوافقة</span>
                  <span className="hidden text-xs text-text-2 md:inline">
                    — مثال توضيحي
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-2.5">
                {parts.map((p, i) => {
                  // Each matched chip lights in turn as the reveal ramp advances.
                  const order = parts.slice(0, i).filter((x) => x.matched).length
                  const lit =
                    reduced || (p.matched && reveal > (order / MATCHED) * 0.92)
                  const dim = p.matched ? 0 : reveal
                  return (
                    <div
                      key={p.name}
                      className="flex flex-col gap-1.5 rounded-xl border p-2.5 transition-[opacity,transform,background-color,border-color,box-shadow] duration-[400ms] [transition-timing-function:var(--ease-out-quint)] will-change-[transform,opacity]"
                      style={
                        lit
                          ? {
                              opacity: 1,
                              transform: 'translateY(-4px) scale(1.02)',
                              background: 'var(--color-primary-light)',
                              borderColor: 'var(--color-primary)',
                              boxShadow: '0 10px 22px -14px rgba(31,94,163,.55)',
                            }
                          : {
                              opacity: 0.55 - 0.32 * dim,
                              transform: `scale(${1 - 0.05 * dim})`,
                              background: '#FBFDFF',
                              borderColor: 'var(--color-hairline)',
                            }
                      }
                    >
                      <span
                        className="flex size-5.5 items-center justify-center rounded-full transition-colors duration-[400ms]"
                        style={{ background: lit ? 'var(--color-primary)' : '#EEF4FA' }}
                      >
                        <Icon
                          name="check"
                          size={13}
                          stroke={lit ? '#fff' : '#C9DCEE'}
                          strokeWidth={2.6}
                        />
                      </span>
                      <span
                        className="text-sm leading-snug font-semibold transition-colors duration-[400ms]"
                        style={{
                          color: lit ? 'var(--color-text-1)' : 'var(--color-text-3)',
                        }}
                      >
                        {p.name}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div
                className="flex flex-wrap items-center gap-3 border-t border-[#F1F6FC] pt-4 transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-out-quint)]"
                style={{
                  opacity: payoff,
                  transform: `translateY(${16 - 16 * payoff}px)`,
                }}
              >
                <span className="flex items-center gap-2.5 rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-cover))] px-5 py-3 text-[clamp(15px,1.6vw,20px)] font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(31,94,163,.7)]">
                  <Icon name="check" size={20} stroke="#fff" strokeWidth={2.4} />
                  القطعة اللي بتوصلك بتركب
                </span>
                <span className="hidden max-w-[40ch] text-sm text-text-2 lg:block">
                  وده اللي بيقلّل المرتجعات: القطعة مربوطة بالموديل والسنة قبل ما تشوفها
                  أصلًا.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
