import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Compat } from './components/Compat'
import {
  Categories,
  Faq,
  HowCustomer,
  HowMerchant,
  Problem,
  Trust,
} from './components/Sections'
import { Contact, Footer, Notify } from './components/Closing'
import { useReveal } from './hooks/useMotion'

/**
 * The order is the argument: pain → the fix → how it works for each side →
 * what makes it safe → the questions → the ask.
 */
export default function App() {
  useReveal()

  return (
    <>
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:m-3 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        تخطّى للمحتوى
      </a>
      <Header />
      <main>
        <Hero />
        <Compat />
        <Problem />
        <HowCustomer />
        <HowMerchant />
        <Categories />
        <Trust />
        <Faq />
        <Notify />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
