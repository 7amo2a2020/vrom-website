# VROM — الموقع التعريفي

موقع ثابت عربي RTL. الستاك نفس لوحة الأدمن: React + Vite + TypeScript + Tailwind v4.

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
```

- **التصميم:** `design.md` (البريف) · مشروع Claude Design فيه الملفات النهائية
- **القواعد الملزمة:** `.claude/skills/vrom-website/SKILL.md` — التوكنز، قواعد RTL،
  مواصفة الحركة، والحقائق اللي ممنوع تتخترع

## لسه ناقص
- [ ] **صور شاشات التطبيق الحقيقية** — `public/screens/*.png` دلوقتي بدائل مؤقتة
- [ ] **`public/og-image.png`** — اتصمّمت في Claude Design، محتاجة تتصدَّر وتتحط هنا
- [ ] **لينكات السوشيال** — `src/data/content.ts` فيها `#` مؤقت
- [ ] **شعار InstaPay** — بيتعرض نص دلوقتي
- [ ] **صفحتَي `/privacy` و`/terms`** — الفوتر بيوصّلهم والهيكل في التصميم
- [ ] **نقطة استقبال للفورمين** — بيعرضوا حالة نجاح بس، من غير إرسال فعلي
