import React, { useState, useEffect, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { EventData, Theme, EventCategory } from './types';
import { ALL_EVENTS } from './constants';
import EventCard from './components/EventCard';
import MonthHeader from './components/MonthHeader';
import UpcomingEvent from './components/UpcomingEvent';
import EventDetailModal from './components/EventDetailModal';
import CategoryFilterModal from './components/CategoryFilterModal';
import DateRangeModal from './components/DateRangeModal';
import ExportModal from './components/ExportModal';
import AboutModal from './components/AboutModal';

const ThemeSwitcher: React.FC<{ theme: Theme; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ring-offset-gray-100 dark:ring-offset-slate-900"
    aria-label="Toggle theme"
  >
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
);

const App: React.FC = () => {
  const [today, setToday] = useState(new Date());
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) return storedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const exportableRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      if (listRef.current) {
        listRef.current.scrollTop = 0; // Reset scroll on month change
      }
      return newDate;
    });
  };
  
  const startOfToday = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()), [today]);

  const allCategories = useMemo(() => {
    const categories = new Set(ALL_EVENTS.map(event => event.category));
    return Array.from(categories).sort() as EventCategory[];
  }, []);
  
  const displayedEvents = useMemo(() => {
    let events = ALL_EVENTS;
    
    const isDateRangeActive = dateRange.start && dateRange.end;
    const isSearchActive = searchQuery.trim() !== '';

    if (isSearchActive) {
        events = events.filter(event => 
            event.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
    } else if (isDateRangeActive) {
        const rangeStart = new Date(dateRange.start!);
        rangeStart.setHours(0, 0, 0, 0);
        
        const rangeEnd = new Date(dateRange.end!);
        rangeEnd.setHours(23, 59, 59, 999);

        events = events.filter(event => {
            const eventDate = event.gregorianDate;
            return eventDate >= rangeStart && eventDate <= rangeEnd;
        });
    } else {
        // Default to month view
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        events = events.filter(event => {
            const eventDate = event.gregorianDate;
            return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        });
    }
    
    if (selectedCategories.length > 0) {
        events = events.filter(event => selectedCategories.includes(event.category));
    }
    
    return events.sort((a,b) => a.gregorianDate.getTime() - b.gregorianDate.getTime());
}, [currentMonth, selectedCategories, searchQuery, dateRange]);


  const upcomingEvent = useMemo(() => {
      return ALL_EVENTS
          .filter(event => event.gregorianDate >= startOfToday)
          .sort((a, b) => a.gregorianDate.getTime() - b.gregorianDate.getTime())[0];
  }, [startOfToday]);

  const handleEventClick = (event: EventData) => {
    if (event.gregorianDate >= startOfToday) {
      setSelectedEvent(event);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  const handleApplyCategories = (categories: EventCategory[]) => {
    setSelectedCategories(categories);
    setIsCategoryModalOpen(false);
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
    setIsCategoryModalOpen(false);
  };

  const handleApplyDateRange = ({ start, end }: { start: string; end: string }) => {
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);

    if (startDate > endDate) {
        setDateRange({ start: endDate, end: startDate });
    } else {
        setDateRange({ start: startDate, end: endDate });
    }
    setSearchQuery('');
    setIsDateRangeModalOpen(false);
  };

  const handleClearDateRange = () => {
      setDateRange({ start: null, end: null });
      setIsDateRangeModalOpen(false);
  };


  const handleExportPNG = () => {
    setIsExportModalOpen(false);
    setTimeout(() => { // Delay to allow modal to close and ensure rendering is complete
      if (exportableRef.current) {
          const monthName = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long' }).format(currentMonth);
          const year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(currentMonth);

          html2canvas(exportableRef.current, {
              useCORS: true,
              backgroundColor: theme === 'dark' ? '#0f172a' : '#f1f5f9', // slate-900 or gray-100
              scale: 2, // Increase resolution for better quality
              windowWidth: exportableRef.current.scrollWidth,
              windowHeight: exportableRef.current.scrollHeight,
          }).then(canvas => {
              const link = document.createElement('a');
              link.download = `derhami-calendar-${searchQuery ? 'search-results' : monthName + '-' + year}.png`;
              link.href = canvas.toDataURL('image/png');
              link.click();
          });
      }
    }, 200);
  };

  const handleExportPDF = () => {
    setIsExportModalOpen(false);
    setTimeout(() => {
      const wasDark = theme === 'dark';
      
      // 1. Temporarily switch to light theme for better print output
      if (wasDark) {
        document.documentElement.classList.remove('dark');
      }

      // 2. Add print-specific styles to hide UI elements
      const printStyleSheet = document.createElement('style');
      printStyleSheet.id = 'print-styles';
      printStyleSheet.innerHTML = `
        @media print {
          /* Hide non-essential UI elements */
          header, .fixed.bottom-4, #upcoming-event-wrapper {
            display: none !important;
          }
          /* Adjust main content for printing */
          main {
            padding-top: 1rem !important;
            height: auto !important;
          }
          /* Allow scrollable content to expand */
          .overflow-y-auto {
            overflow: visible !important;
            height: auto !important;
          }
          #event-list {
            padding-bottom: 1rem !important; /* Remove extra space for floating nav */
          }
          /* Prevent page breaks inside event cards */
          .event-card {
            page-break-inside: avoid;
          }
        }
      `;
      document.head.appendChild(printStyleSheet);

      // 3. Define the cleanup function
      const cleanupAfterPrint = () => {
        printStyleSheet.remove();
        // Restore dark theme if it was active
        if (wasDark) {
          document.documentElement.classList.add('dark');
        }
        window.removeEventListener('afterprint', cleanupAfterPrint);
      };
      window.addEventListener('afterprint', cleanupAfterPrint);

      // 4. Trigger print dialog
      window.print();

    }, 200);
  };

  const goToToday = () => {
    setSearchQuery(''); // Clear any active search
    setSelectedCategories([]); // Also clear category filters
    setDateRange({ start: null, end: null }); // Clear date range filter
    const now = new Date();
    const isCurrentMonth = now.getFullYear() === currentMonth.getFullYear() && now.getMonth() === currentMonth.getMonth();

    if (!isCurrentMonth) {
        setCurrentMonth(now);
    }

    setTimeout(() => {
      const upcomingEventOnPage = ALL_EVENTS
          .filter(event => event.gregorianDate >= startOfToday)
          .sort((a, b) => a.gregorianDate.getTime() - b.gregorianDate.getTime())
          .find(event => event.gregorianDate.getFullYear() === now.getFullYear() && event.gregorianDate.getMonth() === now.getMonth());

      const targetId = upcomingEventOnPage?.id;

      if (targetId) {
          const element = document.getElementById(`event-card-${targetId}`);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }
    }, 100); // Timeout to allow state to update and component to re-render
  };

  const isSearching = searchQuery.trim() !== '';
  const isDateRangeActive = !!(dateRange.start && dateRange.end && !isSearching);
  const isCustomFilterActive = isSearching || isDateRangeActive;

  const formatDateForHeader = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
  };

  return (
    <div className="text-slate-800 dark:text-white h-screen flex flex-col overflow-hidden bg-gray-100 dark:bg-slate-900">
      <header className="fixed top-0 left-0 right-0 z-20 bg-gray-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-3 flex-shrink-0">
                      <button onClick={() => setIsAboutModalOpen(true)} className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ring-offset-gray-100 dark:ring-offset-slate-900">
                          درهمی
                      </button>
                      <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 hidden sm:block">
                          تقویم رویداد
                      </h1>
                  </div>
                  
                  <div className="flex-1 px-4 sm:px-8">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="جستجوی رویداد..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full py-2 pl-10 pr-4 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            aria-label="جستجوی رویداد"
                        />
                    </div>
                  </div>

                  <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
              </div>
          </div>
      </header>
      
      <main className="pt-16 max-w-4xl mx-auto w-full flex-grow flex flex-col min-h-0">
        {!isCustomFilterActive && upcomingEvent && (
          <div id="upcoming-event-wrapper">
            <UpcomingEvent event={upcomingEvent} today={today} />
          </div>
        )}
        
        {/* Scrollable Area */}
        <div ref={listRef} className="flex-grow overflow-y-auto">
            <div ref={exportableRef}>
                {isSearching ? (
                   <div className="text-center pt-4 pb-2">
                        <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">
                            نتایج جستجو برای: <span className="text-orange-500">"{searchQuery}"</span>
                        </h2>
                    </div>
                ) : isDateRangeActive ? (
                    <div className="text-center pt-4 pb-2">
                      <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">
                          رویدادها از <span className="text-orange-500">{formatDateForHeader(dateRange.start)}</span> تا <span className="text-orange-500">{formatDateForHeader(dateRange.end)}</span>
                      </h2>
                    </div>
                ) : (
                  <MonthHeader date={currentMonth} />
                )}

                <div className="p-4 space-y-4 pb-24" id="event-list">
                  {displayedEvents.length > 0 ? (
                    displayedEvents.map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        isPast={event.gregorianDate < startOfToday}
                        onClick={handleEventClick}
                        highlight={searchQuery}
                      />
                    ))
                  ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                      <p className="text-2xl">🗓️</p>
                      <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">هیچ رویدادی مطابق با فیلتر شما یافت نشد.</p>
                    </div>
                  )}
                </div>
            </div>
        </div>
      </main>

      {/* Floating Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4">
        <div className="flex items-center justify-between gap-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-2xl shadow-slate-400/20 dark:shadow-black/50 rounded-full p-2 border border-slate-200 dark:border-slate-700">
            <button onClick={() => changeMonth(-1)} disabled={isCustomFilterActive} className="px-4 py-2 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">‹ ماه قبل</button>
            
            <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ${selectedCategories.length > 0 ? 'bg-orange-500 text-white focus:ring-orange-500' : 'bg-slate-200 dark:bg-slate-700 focus:ring-slate-500'}`}
                  aria-label="فیلتر بر اساس دسته بندی"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </button>
                <button
                  onClick={() => setIsDateRangeModalOpen(true)}
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ${isDateRangeActive ? 'bg-orange-500 text-white focus:ring-orange-500' : 'bg-slate-200 dark:bg-slate-700 focus:ring-slate-500'}`}
                  aria-label="فیلتر بر اساس بازه زمانی"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                </button>
                <button
                  onClick={goToToday}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white shadow-md flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ring-offset-white dark:ring-offset-slate-800"
                  aria-label="برو به امروز"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="w-10 h-10 rounded-full bg-slate-600 text-white shadow-md flex items-center justify-center hover:bg-slate-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ring-offset-white dark:ring-offset-slate-800"
                  aria-label="خروجی گرفتن"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </button>
            </div>

            <button onClick={() => changeMonth(1)} disabled={isCustomFilterActive} className="px-4 py-2 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">ماه بعد ›</button>
        </div>
      </div>
      
      <EventDetailModal event={selectedEvent} onClose={handleCloseModal} />
      <CategoryFilterModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onApply={handleApplyCategories}
        onClear={handleClearCategories}
        allCategories={allCategories}
        initialSelectedCategories={selectedCategories}
      />
      <DateRangeModal
        isOpen={isDateRangeModalOpen}
        onClose={() => setIsDateRangeModalOpen(false)}
        onApply={handleApplyDateRange}
        onClear={handleClearDateRange}
        initialRange={dateRange}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};

export default App;