import React, { useState, useEffect, useRef } from 'react';
import { EventCategory } from '../types';

interface CategoryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (categories: EventCategory[]) => void;
  onClear: () => void;
  allCategories: EventCategory[];
  initialSelectedCategories: EventCategory[];
}

const categoryTranslations: Record<EventCategory, string> = {
  National: 'ملی',
  International: 'بین‌المللی',
  Religious: 'مذهبی',
  Cultural: 'فرهنگی',
  Business: 'کسب‌وکار',
  Fun: 'سرگرمی',
  Ancient: 'ایران باستان',
};

const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  allCategories,
  initialSelectedCategories,
}) => {
  const [selected, setSelected] = useState<EventCategory[]>(initialSelectedCategories);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelected(initialSelectedCategories);
    }
  }, [isOpen, initialSelectedCategories]);

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

  const handleToggleCategory = (category: EventCategory) => {
    setSelected(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleClear = () => {
      setSelected([]);
      onClear();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] flex flex-col animate-scale-in">
        <header className="p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">فیلتر دسته‌بندی</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="بستن">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-2 gap-3">
            {allCategories.map(category => (
              <label key={category} className="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={selected.includes(category)}
                  onChange={() => handleToggleCategory(category)}
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500/50 focus:ring-offset-0 bg-slate-200 dark:bg-slate-600 border-slate-300 dark:border-slate-500"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{categoryTranslations[category] || category}</span>
              </label>
            ))}
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
                onClick={() => onApply(selected)}
                className="flex-grow px-6 py-2 rounded-full text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-md"
            >
                اعمال فیلتر
            </button>
        </footer>
      </div>
    </div>
  );
};

export default CategoryFilterModal;