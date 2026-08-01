import { useRef, useState } from 'react'
import { Icon, IconHalo } from './Icons'
import { Card, Eyebrow, Ltr, Section, SectionHeading, buttonStyles } from './ui'
import {
  categories,
  conditions,
  directSteps,
  faqs,
  merchantSteps,
  payments,
  problems,
  trust,
} from '../data/content'
import { useFrameLoop, useReducedMotion } from '../hooks/useMotion'
import { BASE } from '../base'

/* ------------------------------------------------------------------ problem */

export function Problem() {
  return (
    <Section id="problem">
      <SectionHeading
        eyebrow="الوجع"
        eyebrowTone="danger"
        title="عايز قطعة… يعني هتنزل"
        lede="وإنت أصلًا عارف تاجرك وواثق فيه — المشكلة في المشوار مش في الثقة."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {problems.map((p, i) => (
          <Card key={p.title} hover data-reveal={i + 1} className="flex flex-col gap-3.5 p-7">
            <IconHalo
              name={p.icon}
              size={52}
              halo="var(--color-danger-bg)"
              stroke="var(--color-danger)"
            />
            <h3 className="text-[22px] font-bold">{p.title}</h3>
            <p className="text-base text-text-2">{p.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------- steps */

/**
 * A numbered timeline whose rail fills as you scroll past it.
 *
 * The progress is measured against the steps box itself — starting when its top
 * reaches 85% of the viewport — so a step never lights before the reader has
 * actually arrived at it.
 */
function Steps({
  steps,
  railBorder,
}: {
  steps: readonly { title: string; body: string }[]
  railBorder: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [fill, setFill] = useState(reduced ? 1 : 0)

  useFrameLoop(() => {
    if (reduced) return setFill(1)
    const el = box.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const start = window.innerHeight * 0.85
    const span = rect.height + start - window.innerHeight * 0.25
    setFill(Math.min(1, Math.max(0, (start - rect.top) / span)))
  })

  return (
    <div ref={box} className="relative flex flex-col gap-5.5">
      <div
        aria-hidden="true"
        className="absolute inset-y-5.5 end-auto start-[25px] w-[3px] rounded-full rtl:start-auto rtl:end-[25px]"
        style={{ background: railBorder }}
      >
        <div
          className="size-full rounded-full bg-[linear-gradient(180deg,var(--color-primary),var(--color-cover))] transition-transform duration-[250ms] ease-linear"
          style={{ transform: `scaleY(${fill})`, transformOrigin: 'top center' }}
        />
      </div>

      {steps.map((s, i) => {
        const active = reduced || fill > i / steps.length
        return (
          <div key={s.title} data-reveal={i} className="relative flex items-start gap-4.5">
            <span
              className="flex size-13 shrink-0 items-center justify-center rounded-full border-[3px] text-[19px] font-extrabold transition-[transform,background-color,box-shadow] duration-[350ms] [transition-timing-function:var(--ease-out-quint)]"
              style={{
                background: active
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-cover))'
                  : '#E3EDF8',
                color: active ? '#fff' : 'var(--color-text-2)',
                borderColor: railBorder === '#DCE9F7' ? 'var(--color-bg-alt)' : 'var(--color-bg)',
                transform: `scale(${active ? 1 : 0.92})`,
                boxShadow: active ? '0 10px 22px -12px rgba(31,94,163,.7)' : 'none',
              }}
            >
              {['١', '٢', '٣', '٤'][i]}
            </span>
            <div className="flex flex-col gap-1.5 pt-1">
              <h3
                className="text-[21px] font-bold transition-colors duration-[350ms]"
                style={{ color: active ? 'var(--color-text-1)' : 'var(--color-text-2)' }}
              >
                {s.title}
              </h3>
              <p className="max-w-[44ch] text-base text-text-2">{s.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PhoneShot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div
      data-reveal="2"
      className="flex min-w-[260px] flex-1 basis-[320px] flex-col items-center gap-3.5"
    >
      <div className="w-[260px] max-w-full rounded-[40px] bg-[linear-gradient(160deg,#16324F,#0D1B2E)] p-2.5 shadow-[0_30px_60px_-34px_rgba(13,27,46,.6)] sm:w-[300px]">
        <div className="aspect-[640/1386] overflow-hidden rounded-[32px] bg-[#0D1B2E]">
          <img src={src} alt={alt} loading="lazy" className="block size-full object-contain" />
        </div>
      </div>
      <span className="text-sm text-text-2">{caption}</span>
    </div>
  )
}

export function DirectMerchant() {
  return (
    <Section id="direct" alt>
      <div className="flex flex-wrap items-start gap-14">
        <div className="flex min-w-[300px] flex-1 basis-[480px] flex-col gap-8">
          <SectionHeading
            eyebrow="تاجرك معاك"
            eyebrowTone="plain"
            title="اطلب من نفس التاجر — من غير ما تنزل"
            lede="إنت عارفه وواثق فيه وبتتعامل معاه في العادي. كل اللي اتغيّر إنك مش محتاج تنزل."
          />
          <Steps steps={directSteps} railBorder="#DCE9F7" />
        </div>
        <PhoneShot
          src={`${BASE}screens/new-request.png`}
          alt="شاشة طلب جديد في تطبيق VROM: اختيار العربية والقطع المطلوبة وإرسال الطلب للتجار"
          caption="ابعت لتاجرك أو لكل التجار — إنت تختار"
        />
      </div>
    </Section>
  )
}

export function HowMerchant() {
  return (
    <Section id="how-merchant">
      <div className="flex flex-wrap-reverse items-start gap-14">
        <PhoneShot
          src={`${BASE}screens/offers.png`}
          alt="شاشة التاجر في تطبيق VROM: عروضي وحالة كل عرض والتواصل مع العميل"
          caption="شاشة التاجر — عروضي"
        />
        <div className="flex min-w-[300px] flex-1 basis-[480px] flex-col gap-8">
          <SectionHeading
            eyebrow="للتاجر"
            title="زباينك يفضلوا معاك"
            lede="اللي بيشتري منك بيفضل يشتري منك — بس من التطبيق. وفوقيهم طلبات جديدة في تخصصك."
          />

          {/* The money model up front: it is the merchant's first question. */}
          <div
            data-reveal="1"
            className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 rounded-2xl border border-[#D3E5F6] bg-primary-light p-4"
          >
            {[
              ['سجّل ببلاش', 'مفيش رسوم تسجيل'],
              ['مفيش اشتراك', 'مش شهري ولا سنوي'],
              ['٥٪ بس', 'على الصفقة المكتملة عند التسليم'],
            ].map(([head, sub]) => (
              <div key={head} className="flex flex-col gap-1">
                <span className="text-[17px] font-extrabold text-cover">{head}</span>
                <span className="text-sm text-text-2">{sub}</span>
              </div>
            ))}
          </div>

          <Steps steps={merchantSteps} railBorder="var(--color-hairline)" />
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- categories */

export function Categories() {
  return (
    <Section id="cats" alt>
      <SectionHeading
        eyebrow="الأقسام"
        eyebrowTone="plain"
        title="خمس أقسام تغطّي عربيتك"
        lede="من الموتور للصاج — وكل قطعة ليها حالتها ووصفها بوضوح."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(196px,1fr))] gap-4">
        {categories.map((c, i) => (
          <Card key={c.label} hover data-reveal={i} className="flex flex-col gap-3 p-6">
            <IconHalo name={c.icon} size={60} />
            <h3 className="text-[19px] font-bold">{c.label}</h3>
            <p className="text-[15px] text-text-2">{c.sub}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-stretch gap-6">
        <Card data-reveal="1" className="flex min-w-[300px] flex-[2] basis-[520px] flex-col gap-4.5 p-7">
          <span className="text-[17px] font-bold">وحالة القطعة — إنت اللي تختار</span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5">
            {conditions.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3.5 rounded-2xl border border-[#F1F6FC] bg-[#FCFDFF] px-4.5 py-4"
              >
                <IconHalo name={c.icon} size={48} />
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-bold">{c.label}</span>
                  <span className="text-sm text-text-2">{c.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
        <PhoneShot
          src={`${BASE}screens/categories.png`}
          alt="شاشة اختيار الفئة في تطبيق VROM"
          caption="الأقسام جوه التطبيق"
        />
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------- trust */

export function Trust() {
  return (
    <Section id="trust">
      <SectionHeading
        eyebrow="الأمان"
        eyebrowTone="success"
        title="مش أي حد بيبيع، ومش أي شحنة سايبة"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {trust.map((t, i) => (
          <Card key={t.label} data-reveal={i} className="flex flex-col gap-3 p-6">
            <IconHalo
              name={t.icon}
              size={52}
              halo="var(--color-success-bg)"
              stroke="var(--color-success)"
            />
            <h3 className="text-[19px] font-bold">{t.label}</h3>
            <p className="text-[15px] text-text-2">{t.body}</p>
          </Card>
        ))}
      </div>
      <Card data-reveal="1" className="flex flex-wrap items-center gap-4.5 px-6 py-5">
        <span className="text-base font-bold">الدفع مرن:</span>
        <div className="flex flex-wrap gap-2.5">
          {payments.map((p) => (
            <span
              key={p}
              className="rounded-[10px] border border-[#D3E5F6] bg-[#F7FBFF] px-4 py-2.5 text-[15px] font-semibold text-cover"
            >
              {p === 'InstaPay' ? <Ltr>{p}</Ltr> : p}
            </span>
          ))}
        </div>
      </Card>
    </Section>
  )
}

/* ---------------------------------------------------------------------- FAQ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section id="faq" alt>
      <div className="mx-auto flex w-full max-w-[880px] flex-col gap-8">
        <SectionHeading
          eyebrow="أسئلة شائعة"
          eyebrowTone="plain"
          title="أسرع إجابات على أكتر أسئلة"
        />
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                data-reveal={i}
                className="overflow-hidden rounded-2xl border bg-white transition-colors duration-[250ms]"
                style={{
                  borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-hairline)',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-start text-[17px] font-bold hover:bg-[#F7FBFF]"
                >
                  {f.q}
                  <Icon
                    name="chevronDown"
                    size={20}
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    className="shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)]"
                    {...(isOpen ? { style: { transform: 'rotate(180deg)' } } : {})}
                  />
                </button>
                {/* Shown, not animated: animating height is the one thing that
                    would break the transform/opacity-only rule. */}
                {isOpen && <p className="px-5 pb-5 text-base text-text-2">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export { buttonStyles, Card, Eyebrow, Section, SectionHeading }
