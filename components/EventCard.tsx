import React from 'react';
import { EventData } from '../types';

interface EventCardProps {
  event: EventData;
  isPast: boolean;
  onClick: (event: EventData) => void;
  highlight?: string;
}

const categoryColors: { [key: string]: string } = {
  National: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  International: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Religious: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  Business: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
  Fun: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
  Ancient: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
};

const EventCard: React.FC<EventCardProps> = ({ event, isPast, onClick, highlight }) => {
  const styleClasses = {
      pink: 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white',
      black: 'bg-gradient-to-br from-gray-800 to-black text-white',
      watermelon: 'bg-gradient-to-br from-green-600 to-green-800 text-white special-watermelon',
      'dark-blue': 'bg-gradient-to-br from-slate-700 to-slate-900 text-white',
      default: 'bg-white dark:bg-slate-800/70 backdrop-blur-sm ring-1 ring-inset ring-black/5 dark:ring-white/10'
  };

  const cardClass = event.specialStyle ? styleClasses[event.specialStyle] : styleClasses.default;
  const interactiveClass = !isPast ? 'cursor-pointer hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] active:shadow-md' : 'opacity-60';
  
  const formattedDay = new Intl.NumberFormat('fa-IR').format(event.day);
  const categoryClass = categoryColors[event.category] || 'bg-gray-100 text-gray-800';

  const renderHighlightedName = () => {
    const query = highlight?.trim();
    if (!query) {
      return event.name;
    }
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = event.name.split(regex);
    return (
      <>
        {parts.filter(Boolean).map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-orange-200 dark:bg-orange-500/40 text-inherit rounded-sm p-0.5 m-[-0.5px]">
              {part}
            </mark>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <div 
      id={`event-card-${event.id}`}
      onClick={() => !isPast && onClick(event)}
      className={`p-4 rounded-3xl flex flex-col transition-all duration-200 relative event-card ${cardClass} ${interactiveClass}`}>
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="text-xl">{event.icon}</span>
            <h3 className="text-lg font-bold">{renderHighlightedName()}</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mr-8">{`${formattedDay} ${event.jalaliMonth}`}</p>
        </div>
        <div className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300 rounded-xl px-2 py-1 flex flex-col items-center flex-shrink-0">
          <span className="text-xs font-bold">{event.jalaliMonth}</span>
          <span className="text-xl font-black">{formattedDay}</span>
        </div>
      </div>

      {event.description && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pr-8">
          {event.description}
        </p>
      )}
      
      <div className="mt-2">
         <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryClass}`}>{event.category}</span>
      </div>


       {event.specialStyle === 'watermelon' && (
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wavecut.png')] opacity-10 rounded-3xl pointer-events-none"></div>
       )}
    </div>
  );
};

export default EventCard;