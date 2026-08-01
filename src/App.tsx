import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Offers } from './components/Offers'
import {
  Categories,
  DirectMerchant,
  Faq,
  HowMerchant,
  Problem,
  Trust,
} from './components/Sections'
import { Contact, Footer, Notify } from './components/Closing'
import { useReveal } from './hooks/useMotion'

/**
 * The order is the argument.
 *
 * The pain is the trip, not the trust — people already have a merchant they buy
 * from. So: the trip → order from that same merchant instead → and when he
 * hasn't got it, the offers come to you → what that looks like from the shop's
 * side → what makes it safe → the questions → the ask.
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
        <Problem />
        <DirectMerchant />
        <Offers />
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
