import type { IconName } from '../components/Icons'
import { BASE } from '../base'

/**
 * Every word and fact the site shows, in one place.
 *
 * Kept out of the components so copy can be corrected without touching layout —
 * and so the rules in `.claude/skills/vrom-website/SKILL.md` are checkable
 * against a single file. Nothing here may be invented: no counts, no
 * testimonials, and nothing that implies held funds or a money-back guarantee.
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
  { href: '#compat', label: 'التوافق' },
  { href: '#how-customer', label: 'للعميل' },
  { href: '#how-merchant', label: 'للتاجر' },
  { href: '#cats', label: 'الأقسام' },
  { href: '#faq', label: 'الأسئلة' },
] as const

/** The four screens that cycle inside the hero's phone frame. */
export const screens = [
  {
    src: `${BASE}screens/home.png`,
    alt: 'شاشة الرئيسية في تطبيق VROM: عرباتي وطلباتي النشطة',
    caption: 'عرباتك محفوظة — والطلب بيتربط بالموديل',
  },
  {
    src: `${BASE}screens/new-request.png`,
    alt: 'شاشة طلب جديد: اختيار العربية والقطع المطلوبة',
    caption: 'اختار العربية والقطعة وابعت الطلب',
  },
  {
    src: `${BASE}screens/brands.png`,
    alt: 'شاشة اختيار الماركة في تطبيق VROM',
    caption: 'اختار الماركة والموديل — التوافق يتحدّد من هنا',
  },
  {
    src: `${BASE}screens/categories.png`,
    alt: 'شاشة اختيار الفئة في تطبيق VROM',
    caption: 'الأقسام مرتّبة — توصل للقطعة بسرعة',
  },
] as const

/** The slim reassurance row under the hero. Each one is provable. */
export const trustStrip: { icon: IconName; label: string }[] = [
  { icon: 'verified', label: 'تجار موثّقين' },
  { icon: 'shipping', label: 'الشحن علينا' },
  { icon: 'brandNew', label: 'الدفع عند الاستلام' },
  { icon: 'next', label: 'بنشحن لكل مصر' },
]

export const problems: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'searching',
    title: 'تلف على عشر محلات',
    body: 'وكل واحد بيقولك حاجة، ومحدش متأكد إن القطعة هتركب على موديلك.',
  },
  {
    icon: 'priceTag',
    title: 'السعر مالوش أساس',
    body: 'نفس القطعة بسعرين مختلفين في شارعين متجاورين، وإنت مش عارف مين الصح.',
  },
  {
    icon: 'returns',
    title: 'وترجّعها تاني',
    body: 'أكبر مشكلة في السوق: القطعة متركبش على الموديل، فترجع تلف من الأول.',
  },
]

export const customerSteps = [
  {
    title: 'ضيف عربيتك',
    body: 'ماركة وموديل وسنة — أو رقم الشاسيه والتطبيق يقراه لوحده.',
  },
  {
    title: 'ارفع طلبك',
    body: 'اكتب القطعة اللي محتاجها، صوّر القديمة، وابعت. تقدر تطلب أكتر من قطعة مرة واحدة.',
  },
  {
    title: 'استنى العروض',
    body: 'الطلب بيروح للتجار المتخصصين في ماركتك، وكل واحد يبعت سعره وحالة القطعة والضمان.',
  },
  {
    title: 'قارن واختار',
    body: 'اتكلّم مع التاجر، أكّد الطلب، وتابع الشحن لحد باب البيت.',
  },
] as const

export const merchantSteps = [
  {
    title: 'سجّل محلك',
    body: 'حدّد الماركات اللي بتتعامل فيها، وفريق VROM بيراجع المحل ويفعّله.',
  },
  {
    title: 'الطلبات بتيجيلك',
    body: 'طلبات تسعير حقيقية من ناس عايزة تشتري دلوقتي — في تخصصك إنت بس.',
  },
  {
    title: 'ابعت عرضك',
    body: 'السعر وحالة القطعة والضمان. العميل يقارن ويختار.',
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
    icon: 'verified',
    label: 'تجار موثّقين',
    body: 'كل تاجر بيتراجع من إدارة VROM قبل ما يستقبل أي طلب.',
  },
  {
    icon: 'shipping',
    label: 'الشحن علينا',
    body: 'VROM بتدير الشحن وبتتابعه معاك خطوة بخطوة لحد باب البيت.',
  },
  {
    icon: 'rating',
    label: 'تقييم وبلاغ',
    body: 'تقيّم كل صفقة، ولو حصلت مشكلة فيه نظام نزاعات بيتدخّل.',
  },
  {
    icon: 'phoneAuth',
    label: 'دخول بالموبايل',
    body: 'كود تحقق على موبايلك — من غير باسورد تنساه.',
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
    q: 'التطبيق ببلاش؟',
    a: 'أيوة للعميل. التاجر بيدفع عمولة ٥٪ على الصفقة المكتملة بس — مفيش رسوم اشتراك.',
  },
  {
    q: 'إزاي أضمن إن القطعة هتركب؟',
    a: 'محرّك التوافق بيربط كل قطعة بالموديلات والسنين المتوافقة، فاللي بيظهرلك متوافق مع عربيتك إنت.',
  },
  {
    q: 'أنا تاجر — إزاي أسجّل؟',
    a: 'سجّل من التطبيق واختار ماركاتك، وفريق VROM بيراجع المحل ويفعّله قبل ما تستقبل طلبات.',
  },
  { q: 'بتشحنوا لكل مصر؟', a: 'أيوة، بنشحن لكل محافظات مصر.' },
  { q: 'الدفع إزاي؟', a: 'كاش عند الاستلام، محفظة إلكترونية، InstaPay، وفيزا.' },
  {
    q: 'إمتى الإطلاق؟',
    a: 'قريب — سيب إيميلك في خانة التبليغ ونبلّغك أول ما ينزل.',
  },
] as const

/**
 * The compatibility demo.
 *
 * `matched` marks which chips light up. The counter reads 47 and is labelled
 * «عيّنة» / «مثال توضيحي» right beside it — it illustrates the mechanic, it does
 * not report a real catalogue size.
 */
export const compatParts = [
  { name: 'طرمبة بنزين', matched: true },
  { name: 'فلتر زيت', matched: true },
  { name: 'مساعد أمامي', matched: true },
  { name: 'تيل فرامل', matched: true },
  { name: 'دينامو', matched: true },
  { name: 'كابوت', matched: false },
  { name: 'ردياتير', matched: true },
  { name: 'بطارية', matched: true },
  { name: 'مارش', matched: false },
  { name: 'رفرف أمامي', matched: false },
  { name: 'مقص', matched: false },
  { name: 'جلبة كاوتش', matched: false },
  { name: 'فلتر هوا', matched: true },
  { name: 'بوجيهات', matched: true },
  { name: 'سير كاتينة', matched: false },
  { name: 'طرمبة مياه', matched: true },
] as const

export const compatCar = [
  { label: 'الماركة', value: 'Nissan', at: 0.08 },
  { label: 'الموديل', value: 'Sunny', at: 0.2 },
  { label: 'السنة', value: '2021', at: 0.32 },
] as const

export const COMPAT_COUNT = 47
