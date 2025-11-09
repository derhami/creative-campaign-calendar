import React, { useState, useEffect, useRef } from 'react';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: { start: string; end: string }) => void;
  onClear: () => void;
  initialRange: { start: Date | null; end: Date | null };
}

// Helper to format Date object to 'yyyy-mm-dd' for input[type=date]
const toInputDateString = (date: Date | null): string => {
  if (!date) return '';
  // Adjust for timezone offset before converting to ISO string
  const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = new Date(date.getTime() - tzoffset).toISOString().split('T')[0];
  return localISOTime;
};

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialRange,
}) => {
  const [start, setStart] = useState(toInputDateString(initialRange.start));
  const [end, setEnd] = useState(toInputDateString(initialRange.end));
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStart(toInputDateString(initialRange.start));
      setEnd(toInputDateString(initialRange.end));
    }
  }, [isOpen, initialRange]);

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
  
  const handleApply = () => {
    if (start && end) {
      onApply({ start, end });
    }
  };
  
  const handleClear = () => {
    setStart('');
    setEnd('');
    onClear();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] flex flex-col animate-scale-in">
        <header className="p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">انتخاب بازه زمانی</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="بستن">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <main className="p-6 space-y-4">
            <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">از تاریخ</label>
                <input
                    id="start-date"
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>
             <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تا تاریخ</label>
                <input
                    id="end-date"
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    min={start} // Prevent end date from being before start date
                    className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>
        </main>
        
        <footer className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 flex items-center justify-between gap-3">
            <button
                onClick={handleClear}
                className="px-4 py-2 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
                حذف فیلتر
            </button>
            <button
                onClick={handleApply}
                disabled={!start || !end}
                className="flex-grow px-6 py-2 rounded-full text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                اعمال فیلتر
            </button>
        </footer>
      </div>
    </div>
  );
};

export default DateRangeModal;