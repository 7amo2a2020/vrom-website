import { useState } from 'react'
import { Icon } from './Icons'
import { StoreBadges } from './Hero'
import { VromLogo } from './VromLogo'
import { Card, Ltr, Section, SectionHeading, buttonStyles } from './ui'
import { contact, nav, social } from '../data/content'
import { BASE } from '../base'

/**
 * The forms have no backend yet — the site is static until a form endpoint is
 * wired. They validate and show their success state so the flow is real; the
 * submit handler is the single place that will POST once there is somewhere to
 * POST to.
 */

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="flex flex-col items-start gap-3">
      <span className="flex size-12 items-center justify-center rounded-full bg-success-bg">
        <Icon name="check" size={24} stroke="var(--color-success)" strokeWidth={2.2} />
      </span>
      <span className="text-xl font-extrabold">{title}</span>
      <span className="text-[15px] text-text-2">{body}</span>
    </div>
  )
}

export function Notify() {
  const [sent, setSent] = useState(false)

  return (
    <Section id="notify">
      <div className="flex flex-wrap items-center justify-between gap-10 rounded-[28px] bg-[linear-gradient(135deg,var(--color-primary),var(--color-cover))] p-[clamp(24px,4vw,56px)]">
        <div data-reveal="0" className="flex flex-1 basis-[420px] flex-col gap-4">
          <h2 className="text-[clamp(24px,3.2vw,38px)] leading-[1.3] font-extrabold text-white">
            التطبيق قرّب ينزل
          </h2>
          <p className="max-w-[44ch] text-[clamp(16px,1.4vw,18px)] text-[#DDEBF8]">
            سيب إيميلك ونبلّغك أول ما ينزل على <Ltr>Google Play</Ltr> و
            <Ltr>App Store</Ltr>.
          </p>
          <StoreBadges tone="onBlue" />
        </div>

        <div
          data-reveal="1"
          className="flex min-w-[280px] flex-1 basis-[380px] flex-col gap-3.5 rounded-3xl bg-white p-6 shadow-[0_24px_50px_-24px_rgba(13,27,46,.4)]"
        >
          {sent ? (
            <Success
              title="تم — إيميلك عندنا"
              body="هنبعتلك رسالة واحدة بس أول ما التطبيق ينزل. مفيش سبام."
            />
          ) : (
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <label htmlFor="notify-email" className="text-[15px] font-bold">
                اكتب إيميلك ونبلّغك أول ما التطبيق ينزل
              </label>
              <input
                id="notify-email"
                name="email"
                type="email"
                required
                dir="ltr"
                placeholder="you@example.com"
                className="h-13 rounded-xl border border-border-soft px-4 text-start text-base transition-[border-color,box-shadow] duration-[180ms] focus:border-primary focus:shadow-[0_0_0_4px_var(--color-primary-light)] focus:outline-none"
              />
              <button type="submit" className={`${buttonStyles.primary} h-13 text-[17px]`}>
                بلّغني
              </button>
              <span className="text-[13px] text-text-2">
                إيميلك بيتستخدم للتبليغ عن الإطلاق بس.
              </span>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const [kind, setKind] = useState<'customer' | 'merchant'>('customer')

  const field =
    'h-12.5 rounded-xl border border-border-soft px-4 text-base transition-[border-color,box-shadow] duration-[180ms] focus:border-primary focus:shadow-[0_0_0_4px_var(--color-primary-light)] focus:outline-none'

  return (
    <Section id="contact">
      <div className="flex flex-wrap items-start gap-10">
        <div data-reveal="0" className="flex min-w-[300px] flex-1 basis-[420px] flex-col gap-5">
          <SectionHeading
            title="تواصل معنا"
            lede="عندك سؤال، أو عندك محل وعايز تسجّل؟ ابعتلنا وهنرد عليك."
          />
          <div className="flex flex-col gap-3">
            <a
              href={contact.whatsappHref}
              className="flex items-center gap-3.5 rounded-2xl border border-hairline bg-white px-5 py-4.5 transition-[transform,border-color] duration-[180ms] [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-border-soft"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-success-bg">
                <Icon name="whatsapp" size={22} stroke="var(--color-success)" strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-bold">واتساب</span>
                <Ltr className="text-[15px] text-text-2">{contact.whatsappDisplay}</Ltr>
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3.5 rounded-2xl border border-hairline bg-white px-5 py-4.5 transition-[transform,border-color] duration-[180ms] [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-border-soft"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <Icon name="mail" size={22} stroke="var(--color-primary)" strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-bold">إيميل</span>
                <Ltr className="text-[15px] text-text-2">{contact.email}</Ltr>
              </span>
            </a>
          </div>
        </div>

        <Card
          data-reveal="1"
          className="min-w-[300px] flex-1 basis-[440px] p-7 shadow-[0_18px_40px_-30px_rgba(31,94,163,.4)]"
        >
          {sent ? (
            <Success
              title="وصلت رسالتك"
              body="هنرد عليك على نفس رقم الموبايل اللي كتبته."
            />
          ) : (
            <form
              className="flex flex-col gap-4.5"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="c-name" className="text-[15px] font-semibold">
                  الاسم
                </label>
                <input id="c-name" name="name" type="text" required placeholder="اكتب اسمك" className={field} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-phone" className="text-[15px] font-semibold">
                  الموبايل
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="01xxxxxxxxx"
                  className={`${field} text-start`}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-[15px] font-semibold">نوع الحساب</span>
                <div role="radiogroup" aria-label="نوع الحساب" className="flex flex-wrap gap-2.5">
                  {(
                    [
                      ['customer', 'عميل'],
                      ['merchant', 'تاجر'],
                    ] as const
                  ).map(([key, label]) => {
                    const on = kind === key
                    return (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setKind(key)}
                        className="min-h-11.5 rounded-xl border px-5 text-base font-bold transition-[border-color,background-color,color] duration-200"
                        style={{
                          borderColor: on ? 'var(--color-primary)' : 'var(--color-border-soft)',
                          background: on ? 'var(--color-primary-light)' : '#fff',
                          color: on ? 'var(--color-cover)' : 'var(--color-text-2)',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-msg" className="text-[15px] font-semibold">
                  الرسالة
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  rows={4}
                  required
                  placeholder="اكتب رسالتك…"
                  className="resize-y rounded-xl border border-border-soft px-4 py-3.5 text-base transition-[border-color,box-shadow] duration-[180ms] focus:border-primary focus:shadow-[0_0_0_4px_var(--color-primary-light)] focus:outline-none"
                />
              </div>
              <button type="submit" className={`${buttonStyles.primary} h-13 text-[17px]`}>
                ابعت
              </button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="bg-text-1 px-5 pt-14 pb-8 text-[#DDEBF8] sm:px-6">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-9">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[34ch] flex-col gap-3.5">
            <VromLogo tone="dark" />
            <p className="text-[15px] leading-loose text-text-3">
              ماركتبليس قطع غيار سيارات للسوق المصري. حدّد عربيتك، والتجار بيبعتولك عروضهم.
            </p>
            <Ltr className="text-sm text-text-3">{contact.domain}</Ltr>
          </div>

          <div className="flex min-w-[150px] flex-col gap-3">
            <span className="text-[15px] font-bold text-white">الموقع</span>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-[15px] text-border-soft hover:text-white">
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex min-w-[150px] flex-col gap-3">
            <span className="text-[15px] font-bold text-white">قانوني</span>
            <a href={`${BASE}privacy.html`} className="text-[15px] text-border-soft hover:text-white">
              سياسة الخصوصية
            </a>
            <a href={`${BASE}terms.html`} className="text-[15px] text-border-soft hover:text-white">
              الشروط والأحكام
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-bold text-white">تواصل</span>
            <a href={contact.whatsappHref} className="text-[15px] text-border-soft hover:text-white">
              واتساب
            </a>
            <a href={`mailto:${contact.email}`} className="text-[15px] text-border-soft hover:text-white">
              إيميل
            </a>
            <div className="mt-1 flex gap-2.5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`${s.label} — اللينك لسه`}
                  title={`${s.label} — محتاج اللينك`}
                  className="flex size-11 items-center justify-center rounded-xl border border-[#24405E] transition-colors hover:border-primary hover:bg-[#16324F]"
                >
                  <Icon name={s.icon} size={20} stroke="var(--color-border-soft)" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-[#1C3550] pt-5">
          <span className="text-sm text-text-3">
            © <Ltr>2026</Ltr> VROM — كل الحقوق محفوظة.
          </span>
          <span className="text-sm text-text-3">بنشحن لكل محافظات مصر.</span>
        </div>
      </div>
    </footer>
  )
}
