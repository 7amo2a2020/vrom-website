# صورة المشاركة (og-image)

الكارت مكتوب HTML في `og-card.html` وبيتصوّر بمتصفح حقيقي — عشان تشكيل العربي
(وصل الحروف) محتاج HarfBuzz، وأي رسم يدوي بمكتبة صور بيكسّر حروف زي «ج» و«ي».

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu \
  --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
  --screenshot="public/og-image.png" \
  "file:///D:/Hamza/vrom-website/scripts/og-card.html"
```

الكارت بيستخدم نفس خطوط الموقع وتوكناته ولوجوه وصورة شاشته — فأي تغيير في
الرسالة بيتعدّل في `og-card.html` ويتصوّر تاني.

⚠️ مفيش أي رقم أو تقييم أو سعر على الكارت — بس الوعد والمسارين وحالة «قريبًا».
