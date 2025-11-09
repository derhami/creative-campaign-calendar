import React from 'react';

interface MonthHeaderProps {
  date: Date;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ date }) => {
  const monthName = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long' }).format(date);
  const year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(date).replace(/٬/g, '');

  return (
    <div className="text-center pt-4 pb-2">
      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-200">
        {monthName} <span className="font-bold text-orange-500">{year}</span>
      </h2>
    </div>
  );
};

export default MonthHeader;
