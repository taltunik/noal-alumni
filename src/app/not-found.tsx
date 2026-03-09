import { getFontClass } from '@/lib/fonts';

export default function GlobalNotFound() {
  const fontClass = getFontClass('he');

  return (
    <html lang="he" dir="rtl">
      <body className={`${fontClass} bg-[#f8f9fa] text-[#1a202c] antialiased`}>
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="relative mb-6">
            <h1 className="text-[120px] sm:text-[160px] font-black text-[#0056b3]/10 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🏕️</span>
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold">הדף לא נמצא</h2>
          <p className="mb-8 max-w-md text-[#6b7280]">
            נראה שהלכת לאיבוד... בדיוק כמו בטיול השנתי
          </p>

          <a
            href="/"
            className="inline-flex items-center rounded-lg bg-[#0056b3] px-7 py-3 text-lg font-semibold text-white hover:bg-[#003d80] transition-colors"
          >
            חזרה לדף הבית
          </a>
        </div>
      </body>
    </html>
  );
}
