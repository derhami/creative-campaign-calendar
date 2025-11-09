import React, { useEffect, useRef } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-scale-in">
        <header className="p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">درباره تقویم رویداد</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="بستن">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <main className="p-6 text-slate-600 dark:text-slate-300 text-base leading-relaxed space-y-4">
          <p>
            این تقویم هوشمند توسط <strong>حمیدرضا درهمی</strong> طراحی و توسعه داده شده است تا به مدیران شبکه‌های اجتماعی، بازاریابان و صاحبان کسب‌وکار کمک کند تا مناسبت‌های مهم ایرانی و جهانی را از دست ندهند و برای کمپین‌های خود ایده‌های خلاقانه دریافت کنند.
          </p>
          <p>
            ایده‌های کمپین در این برنامه با استفاده از جدیدترین تکنولوژی‌های وب و قدرت گرفته از هوش مصنوعی <strong>Gemini گوگل</strong> ساخته شده است.
          </p>
          <div className="text-center pt-4">
             <a 
                href="https://derhami.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-6 py-2 rounded-full text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md"
            >
                وب‌سایت من
            </a>
          </div>
        </main>
        
        <footer className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                © تمامی حقوق برای حمیدرضا درهمی محفوظ است.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutModal;
