import React from 'react';
import { EventData } from '../types';

interface UpcomingEventProps {
  event: EventData;
  today: Date;
}

const calculateDaysRemaining = (eventDate: Date, today: Date): number => {
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const diffTime = eventDay.getTime() - startOfToday.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const UpcomingEvent: React.FC<UpcomingEventProps> = ({ event, today }) => {
    const daysRemaining = calculateDaysRemaining(event.gregorianDate, today);

    const getRemainingText = () => {
        if (daysRemaining === 0) {
            return 'امروز';
        }
        if (daysRemaining === 1) {
            return 'فردا';
        }
        return `${new Intl.NumberFormat('fa-IR').format(daysRemaining)} روز دیگر`;
    };

    return (
        <div className="flex-shrink-0 z-10 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rounded-2xl mx-4 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-sm font-bold opacity-80">فرصت بعدی شما</span>
                    <span className="text-lg font-black">{event.name} {event.icon}</span>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                    <span className="text-sm font-bold block">مانده</span>
                    <span className="text-xl font-black block">{getRemainingText()}</span>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvent;