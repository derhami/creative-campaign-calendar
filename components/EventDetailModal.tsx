import React, { useEffect, useState, useRef } from 'react';
import { EventData, CampaignIdea } from '../types';
import { getCampaignIdeas, QUOTA_EXHAUSTED } from '../services/geminiService';

interface EventDetailModalProps {
  event: EventData | null;
  onClose: () => void;
}

const IdeaSkeleton: React.FC = () => (
  <div className="p-4 rounded-xl bg-slate-200 dark:bg-slate-700/50 animate-pulse">
    <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/3 mb-3"></div>
    <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-full mb-1"></div>
    <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
  </div>
);

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const [ideas, setIdeas] = useState<CampaignIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (event) {
      const fetchIdeas = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedIdeas = await getCampaignIdeas(event.name);
          setIdeas(fetchedIdeas);
        } catch (err: any) {
          if (err.name === QUOTA_EXHAUSTED) {
            setError('به دلیل ترافیک بالا، دریافت ایده‌ها موقتا ممکن نیست. لطفا کمی بعد دوباره تلاش کنید.');
          } else {
            setError('متاسفانه مشکلی در دریافت ایده‌ها پیش آمد.');
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchIdeas();
    }
  }, [event]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (event) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [event, onClose]);
  
  if (!event) return null;
  
  const formattedDay = new Intl.NumberFormat('fa-IR').format(event.day);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in" role="dialog" aria-modal="true">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-scale-in">
        <header className="p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                {event.icon} {event.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{`${formattedDay} ${event.jalaliMonth}`}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="بستن مودال"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto flex-grow">
          <h3 className="text-lg font-bold mb-4 text-orange-500 dark:text-orange-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            ایده کمپین‌های خلاقانه
          </h3>
          
          {isLoading && (
            <div className="space-y-3">
              <IdeaSkeleton />
              <IdeaSkeleton />
              <IdeaSkeleton />
            </div>
          )}
          {error && (
            <div className="text-center p-4 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && ideas.length > 0 && (
            <div className="space-y-4">
              {ideas.map((idea, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{idea.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{idea.description}</p>
                </div>
              ))}
            </div>
          )}
           {!isLoading && !error && ideas.length === 0 && (
            <div className="text-center p-4 bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 rounded-lg">
              <p>ایده‌ای برای این رویداد یافت نشد.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventDetailModal;
