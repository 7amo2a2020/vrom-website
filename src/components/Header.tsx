import { useEffect, useState } from 'react'
import { VromLogo } from './VromLogo'
import { buttonStyles } from './ui'
import { nav } from '../data/content'

/**
 * Sticky header. Above 900px the links sit inline; below that they collapse
 * into a drawer, because five links plus a CTA wrap and crush the button on a
 * 390px screen.
 */
export function Header() {
  const [open, setOpen] = useState(false)

  // A drawer that survives the jump to its own target is a drawer in the way.
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-[rgba(244,248,253,.88)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1216px] items-center gap-4 px-5 py-3 sm:px-6">
        <a href="#top" aria-label="VROM — أول الصفحة">
          <VromLogo />
        </a>

        <nav className="me-auto hidden flex-1 gap-1 lg:flex" aria-label="أقسام الموقع">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-[10px] px-3.5 py-2.5 text-[15px] font-semibold text-text-2 transition-colors hover:bg-primary-light hover:text-cover"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#notify"
          className={`${buttonStyles.primary} ms-auto h-11 px-5 text-[15px] lg:ms-0`}
        >
          بلّغني بالإطلاق
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'اقفل القايمة' : 'افتح القايمة'}
          className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-soft bg-white lg:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute inset-x-0 h-0.5 rounded-full bg-cover transition-[transform,opacity] duration-[250ms] [transition-timing-function:var(--ease-out-quint)]"
                style={{
                  top: i === 0 ? 0 : i === 1 ? 7 : 14,
                  transform: open
                    ? i === 0
                      ? 'translateY(7px) rotate(45deg)'
                      : i === 2
                        ? 'translateY(-7px) rotate(-45deg)'
                        : undefined
                    : undefined,
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="أقسام الموقع"
          className="border-t border-hairline bg-bg px-5 pb-5 lg:hidden"
        >
          <ul className="mx-auto flex max-w-[1216px] flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-hairline text-[17px] font-semibold text-text-1"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
