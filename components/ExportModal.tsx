import React, { useEffect, useRef } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExportPNG, onExportPDF }) => {
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
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] flex flex-col animate-scale-in">
        <header className="p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">انتخاب فرمت خروجی</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="بستن">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <main className="p-6 space-y-4">
          <button
            onClick={onExportPNG}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <span className="text-4xl bg-white dark:bg-slate-800 p-3 rounded-lg">🖼️</span>
            <div className="text-right">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">خروجی PNG</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">ذخیره تقویم به عنوان یک فایل عکس با کیفیت بالا.</p>
            </div>
          </button>
          <button
            onClick={onExportPDF}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <span className="text-4xl bg-white dark:bg-slate-800 p-3 rounded-lg">📄</span>
            <div className="text-right">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">خروجی PDF</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">آماده‌سازی برای چاپ یا ذخیره به عنوان سند PDF.</p>
            </div>
          </button>
        </main>
      </div>
    </div>
  );
};

export default ExportModal;
