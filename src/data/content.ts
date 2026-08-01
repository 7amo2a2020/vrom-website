import type { IconName } from '../components/Icons'
import { BASE } from '../base'

/**
 * Every word and fact the site shows, in one place.
 *
 * Kept out of the components so copy can be corrected without touching layout —
 * and so the rules in `.claude/skills/vrom-website/SKILL.md` are checkable
 * against a single file. Nothing here may be invented: no counts, no
 * testimonials, and nothing that implies held funds or a money-back guarantee.
 *
 * THE STORY (decided 1 Aug 2026 — and it is not the compatibility engine):
 * the part comes to your door. First from the merchant you already know and
 * buy from anyway — you simply stop making the trip. And when nobody you know
 * has it, you post the request once and the offers come to you, so you choose
 * on price or on rating instead of walking the market asking.
 */

export const contact = {
  whatsappDisplay: '+20 155 427 9033',
  whatsappHref: 'https://wa.me/201554279033',
  email: 'vrom.app@gmail.com',
  domain: 'vrom-eg.com',
} as const

/** Links are placeholders until the accounts are handed over. */
export const social: { label: string; icon: IconName; href: string }[] = [
  { label: 'فيسبوك', icon: 'facebook', href: '#' },
  { label: 'إنستجرام', icon: 'instagram', href: '#' },
  { label: 'تيك توك', icon: 'tiktok', href: '#' },
]

export const nav = [
  { href: '#direct', label: 'تاجرك' },
  { href: '#offers', label: 'العروض' },
  { href: '#how-merchant', label: 'للتاجر' },
  { href: '#cats', label: 'الأقسام' },
  { href: '#faq', label: 'الأسئلة' },
] as const

/** The four screens that cycle inside the hero's phone frame. */
export const screens = [
  {
    src: `${BASE}screens/home.png`,
    alt: 'شاشة الرئيسية في تطبيق VROM: عرباتي وطلباتي النشطة',
    caption: 'عرباتك وطلباتك في مكان واحد',
  },
  {
    src: `${BASE}screens/new-request.png`,
    alt: 'شاشة طلب جديد: اختيار العربية والقطع، وإرسال الطلب لتاجر معيّن أو لكل التجار',
    caption: 'ابعت لتاجرك… أو لكل التجار',
  },
  {
    src: `${BASE}screens/brands.png`,
    alt: 'شاشة اختيار الماركة في تطبيق VROM',
    caption: 'حدّد عربيتك مرة واحدة وخلاص',
  },
  {
    src: `${BASE}screens/categories.png`,
    alt: 'شاشة اختيار الفئة في تطبيق VROM',
    caption: 'الأقسام مرتّبة — توصل للقطعة بسرعة',
  },
] as const

/** The slim reassurance row under the hero. Each one is provable. */
export const trustStrip: { icon: IconName; label: string }[] = [
  { icon: 'shipping', label: 'لحد باب البيت' },
  { icon: 'brandNew', label: 'الدفع عند الاستلام' },
  { icon: 'verified', label: 'تجار موثّقين' },
  { icon: 'next', label: 'بنشحن لكل مصر' },
]

export const problems: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'searching',
    title: 'المشوار كل مرة',
    body: 'تسيب شغلك وتنزل السوق وتقف في الزحمة — عشان قطعة إنت عارف مين بيبيعها أصلًا.',
  },
  {
    icon: 'priceTag',
    title: 'ومش لاقيها عنده',
    body: 'تلاقي تاجرك مش جايبها، فتبدأ تلف على محلات متعرفهاش ومش عارف تثق في مين.',
  },
  {
    icon: 'returns',
    title: 'والسعر مالوش أساس',
    body: 'كل محل بيقولك رقم مختلف، ومفيش طريقة تقارن غير إنك تنزل تسأل واحد واحد.',
  },
]

/** Path one — the merchant you already deal with. This is the main story. */
export const directSteps = [
  {
    title: 'اختار تاجرك',
    body: 'نفس المحل اللي بتشتري منه وواثق فيه — دوّر عليه في التطبيق واختاره.',
  },
  {
    title: 'ابعتله الطلب',
    body: 'اكتب القطعة وصوّر القديمة لو حابب. الطلب بيروحله هو لوحده.',
  },
  {
    title: 'يرد عليك بسعره',
    body: 'وتتكلّم معاه في التطبيق زي ما بتتكلم معاه في المحل بالظبط.',
  },
  {
    title: 'ويوصلك البيت',
    body: 'إحنا بندير الشحن ونتابعه، وتدفع عند الاستلام لو حابب.',
  },
] as const

/** Path two — nobody you know has it. */
export const offerSteps = [
  {
    title: 'ابعت لكل التجار',
    body: 'بدل ما تلف، ابعت طلبك مرة واحدة لكل التجار المتخصصين في ماركة عربيتك.',
  },
  {
    title: 'العروض تيجيلك',
    body: 'كل تاجر يبعت سعره وحالة القطعة والضمان — وإنت قاعد مكانك.',
  },
  {
    title: 'قارن واختار',
    body: 'أقل سعر؟ أعلى تقييم؟ على مزاجك إنت — كله قدامك في شاشة واحدة.',
  },
] as const

export const merchantSteps = [
  {
    title: 'سجّل محلك',
    body: 'حدّد الماركات اللي بتتعامل فيها، وفريق VROM بيراجع المحل ويفعّله.',
  },
  {
    title: 'زباينك يلاقوك',
    body: 'اللي بيشتري منك في العادي يبعتلك طلبه من التطبيق — من غير ما يسيبك لغيرك.',
  },
  {
    title: 'وطلبات جديدة كمان',
    body: 'طلبات مفتوحة في تخصصك من ناس عايزة تشتري دلوقتي. ابعت عرضك وإنت في محلك.',
  },
  {
    title: 'جهّز واشحن واقبض',
    body: 'VROM بتدير الشحن، والفلوس بتتقيد في محفظتك بعد التسليم.',
  },
] as const

export const categories: { icon: IconName; label: string; sub: string }[] = [
  { icon: 'mechanics', label: 'ميكانيكا', sub: 'موتور · جيربوكس · تبريد' },
  { icon: 'electrics', label: 'كهرباء', sub: 'بطارية · دينامو · مارش · إضاءة' },
  { icon: 'suspension', label: 'عفشة', sub: 'مساعدين · مقصات · جلب' },
  { icon: 'body', label: 'صاج', sub: 'كابوت · رفارف · أبواب · شنطة' },
  { icon: 'filters', label: 'فلاتر وزيوت', sub: 'فلاتر · زيوت · سيور' },
]

export const conditions: { icon: IconName; label: string; sub: string }[] = [
  { icon: 'brandNew', label: 'جديد أصلي', sub: 'من الوكيل' },
  { icon: 'aftermarket', label: 'بديل تجاري', sub: 'تايلاندي · صيني' },
  { icon: 'used', label: 'مستعمل / استيراد', sub: 'بحالة موصوفة' },
]

export const trust: { icon: IconName; label: string; body: string }[] = [
  {
    icon: 'shipping',
    label: 'الشحن علينا',
    body: 'من المحل لحد باب بيتك، وإحنا بنتابع الشحنة معاك خطوة بخطوة.',
  },
  {
    icon: 'verified',
    label: 'تجار موثّقين',
    body: 'كل تاجر بيتراجع من إدارة VROM قبل ما يستقبل أي طلب.',
  },
  {
    icon: 'brandNew',
    label: 'القطعة بتركب',
    body: 'القطعة مربوطة بموديل عربيتك وسنتها، فاللي بيوصلك متوافق معاها.',
  },
  {
    icon: 'rating',
    label: 'تقييم وبلاغ',
    body: 'تقيّم كل صفقة، ولو حصلت مشكلة فيه نظام نزاعات بيتدخّل.',
  },
]

export const payments = [
  'كاش عند الاستلام',
  'محفظة إلكترونية',
  'InstaPay',
  'فيزا',
] as const

export const faqs = [
  {
    q: 'أقدر أطلب من تاجر معيّن أنا بتعامل معاه؟',
    a: 'أيوة — ده أساس الفكرة. دوّر على محله في التطبيق وابعتله طلبك هو لوحده، وهو يرد عليك بسعره وتتكلّموا عادي.',
  },
  {
    q: 'ولو تاجري مش جايب القطعة؟',
    a: 'ابعت الطلب لكل التجار المتخصصين في ماركة عربيتك، وهتيجيلك عروض بأسعار وحالات مختلفة وتختار اللي يناسبك.',
  },
  {
    q: 'بتوصّلوا لحد البيت؟',
    a: 'أيوة. VROM بتدير الشحن من المحل لحد باب بيتك وبتتابعه معاك، لكل محافظات مصر.',
  },
  {
    q: 'التطبيق ببلاش؟',
    a: 'أيوة للعميل. التاجر بيدفع عمولة ٥٪ على الصفقة المكتملة بس — مفيش رسوم اشتراك.',
  },
  { q: 'الدفع إزاي؟', a: 'كاش عند الاستلام، محفظة إلكترونية، InstaPay، وفيزا.' },
  {
    q: 'أنا تاجر — إزاي أسجّل؟',
    a: 'سجّل من التطبيق واختار ماركاتك، وفريق VROM بيراجع المحل ويفعّله قبل ما تستقبل طلبات.',
  },
  {
    q: 'إمتى الإطلاق؟',
    a: 'قريب — سيب إيميلك في خانة التبليغ ونبلّغك أول ما ينزل.',
  },
] as const

/**
 * The offers scene.
 *
 * Illustrative shops and prices — generic names, not real businesses — and the
 * block carries a «عيّنة» badge so nobody reads it as a live listing.
 */
export const sampleOffers = [
  { shop: 'محل النور', price: '1,150', rating: '4.9', condition: 'جديد أصلي', warranty: 'ضمان ٦ شهور' },
  { shop: 'قطع غيار الأمانة', price: '980', rating: '4.6', condition: 'بديل تجاري', warranty: 'ضمان ٣ شهور' },
  { shop: 'مركز الحرية', price: '1,320', rating: '5.0', condition: 'جديد أصلي', warranty: 'ضمان سنة' },
] as const
