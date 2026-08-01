import { Icon } from './Icons'
import { VromLogo } from './VromLogo'
import { Ltr } from './ui'
import { contact } from '../data/content'
import { BASE } from '../base'
import { privacy, terms, type PolicySection } from '../data/policies'

/**
 * The privacy and terms pages.
 *
 * Both are a reviewed skeleton, not final legal text, and the page says so at
 * the top rather than reading like a finished policy — someone would otherwise
 * rely on wording nobody has signed off. Each outstanding decision is shown
 * inline instead of quietly omitted.
 */
export function Policy({ page }: { page: 'privacy' | 'terms' }) {
  const sections: PolicySection[] = page === 'privacy' ? privacy : terms
  const title = page === 'privacy' ? 'سياسة الخصوصية' : 'الشروط والأحكام'
  const lede =
    page === 'privacy'
      ? 'الصفحة دي بتشرح إيه البيانات اللي بناخدها منك، وبنستخدمها في إيه، ومين بيشوفها، وإيه حقوقك.'
      : 'الشروط اللي بتحكم استخدام تطبيق وموقع VROM لكل من العميل والتاجر.'

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 border-b border-hairline bg-[rgba(244,248,253,.9)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[880px] items-center gap-4 px-5 py-3.5 sm:px-6">
          <a href={BASE} aria-label="VROM — الرئيسية">
            <VromLogo size={36} />
          </a>
          <nav className="ms-auto flex gap-1.5" aria-label="الصفحات القانونية">
            {(
              [
                [`${BASE}privacy.html`, 'privacy', 'سياسة الخصوصية'],
                [`${BASE}terms.html`, 'terms', 'الشروط والأحكام'],
              ] as const
            ).map(([href, key, label]) => {
              const on = page === key
              return (
                <a
                  key={key}
                  href={href}
                  aria-current={on ? 'page' : undefined}
                  className="flex min-h-11 items-center rounded-xl border px-4 text-[15px] font-bold transition-colors duration-200"
                  style={{
                    borderColor: on ? 'var(--color-primary)' : 'var(--color-border-soft)',
                    background: on ? 'var(--color-primary-light)' : '#fff',
                    color: on ? 'var(--color-cover)' : 'var(--color-text-2)',
                  }}
                >
                  {label}
                </a>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-[880px] flex-col gap-8 px-5 pt-12 pb-20 sm:px-6">
        <div className="flex flex-col gap-3">
          <span className="self-start rounded-full border border-[#F0D8AE] bg-warn-bg px-4 py-1.5 text-[13px] font-bold text-[#8A5410]">
            هيكل للمراجعة — النص القانوني النهائي لسه بيتكتب
          </span>
          <h1 className="text-[clamp(26px,4vw,42px)] leading-[1.25] font-extrabold">{title}</h1>
          <p className="max-w-[60ch] text-[17px] text-text-2">{lede}</p>
          <span className="text-sm text-text-2">
            آخر تحديث: <Ltr>—</Ltr> · بيتحدّد يوم النشر
          </span>
        </div>

        <nav
          aria-label="محتويات الصفحة"
          className="flex flex-col gap-2.5 rounded-3xl border border-hairline bg-white px-6 py-5"
        >
          <span className="text-[15px] font-bold">المحتويات</span>
          <ol className="flex list-none flex-col gap-2">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#sec-${i + 1}`} className="text-base">
                  <Ltr>{i + 1}</Ltr>. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((s, i) => (
          <section
            key={s.title}
            id={`sec-${i + 1}`}
            className="flex scroll-mt-24 flex-col gap-3 rounded-3xl border border-hairline bg-white p-7"
          >
            <h2 className="text-[22px] font-extrabold">
              <Ltr>{i + 1}</Ltr>. {s.title}
            </h2>
            <p className="text-base text-text-2">{s.body}</p>
            {s.points && (
              <ul className="flex list-none flex-col gap-2 pt-1">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-[15px] text-text-2">{p}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.pending && (
              <span className="self-start rounded-[10px] border border-dashed border-border-soft bg-bg px-3.5 py-2 text-[13px] text-text-2">
                محتاج قرار: {s.pending}
              </span>
            )}
          </section>
        ))}

        <section className="flex flex-col gap-2.5 rounded-3xl border border-[#D3E5F6] bg-primary-light p-6">
          <h2 className="text-xl font-extrabold">أسئلة عن الصفحة دي</h2>
          <p className="text-base text-text-2">
            ابعتلنا على{' '}
            <a href={`mailto:${contact.email}`}>
              <Ltr>{contact.email}</Ltr>
            </a>{' '}
            أو واتساب{' '}
            <a href={contact.whatsappHref}>
              <Ltr>{contact.whatsappDisplay}</Ltr>
            </a>
            .
          </p>
        </section>

        <a
          href={BASE}
          className="flex min-h-12 items-center gap-2.5 self-start rounded-xl border border-border-soft bg-white px-5 text-base font-bold text-cover"
        >
          <Icon name="prev" size={18} stroke="var(--color-primary)" strokeWidth={1.8} />
          رجوع للموقع
        </a>
      </main>
    </div>
  )
}
