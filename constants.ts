import { EventData } from './types';

// Helper to create dates for 2025 to ensure they are in the future for demonstration.
// Note: Jalali to Gregorian conversion is approximate for this demo.
const year = 2025;
const nextYear = 2026;

export const ALL_EVENTS: EventData[] = [
  // Farvardin (فروردین) - Starts ~Mar 21
  { id: 47, name: 'نوروز', day: 1, jalaliMonth: 'فروردین', icon: '🌱', gregorianDate: new Date(year, 2, 21), category: 'National' },
  { id: 48, name: 'سیزده بدر', day: 13, jalaliMonth: 'فروردین', icon: '🌿', gregorianDate: new Date(year, 3, 2), category: 'National' },
  { id: 49, name: 'روز جهانی بهداشت', day: 18, jalaliMonth: 'فروردین', icon: '⚕️', gregorianDate: new Date(year, 3, 7), category: 'International' },
  { id: 50, name: 'روز بزرگداشت عطار نیشابوری', day: 25, jalaliMonth: 'فروردین', icon: '📚', gregorianDate: new Date(year, 3, 14), category: 'Cultural' },

  // Ordibehesht (اردیبهشت) - Starts ~Apr 21
  { id: 51, name: 'روز جهانی زمین', day: 2, jalaliMonth: 'اردیبهشت', icon: '🌍', gregorianDate: new Date(year, 3, 22), category: 'International' },
  { id: 52, name: 'روز معمار', day: 3, jalaliMonth: 'اردیبهشت', icon: '🏛️', gregorianDate: new Date(year, 3, 23), category: 'National' },
  { id: 53, name: 'روز معلم', day: 12, jalaliMonth: 'اردیبهشت', icon: '🧑‍🏫', gregorianDate: new Date(year, 4, 2), category: 'National' },
  { id: 54, name: 'روز بزرگداشت فردوسی', day: 25, jalaliMonth: 'اردیبهشت', icon: '👑', gregorianDate: new Date(year, 4, 15), category: 'Cultural' },

  // Khordad (خرداد) - Starts ~May 22
  { id: 55, name: 'روز جهانی بدون دخانیات', day: 10, jalaliMonth: 'خرداد', icon: '🚭', gregorianDate: new Date(year, 4, 31), category: 'International' },
  { id: 56, name: 'روز جهانی محیط زیست', day: 15, jalaliMonth: 'خرداد', icon: '🏞️', gregorianDate: new Date(year, 5, 5), category: 'International' },

  // Tir (تیر) - Starts ~Jun 22
  { id: 57, name: 'روز جهانی موسیقی', day: 1, jalaliMonth: 'تیر', icon: '🎵', gregorianDate: new Date(year, 5, 21), category: 'International' },
  { id: 67, name: 'جشن تیرگان', day: 13, jalaliMonth: 'تیر', icon: '💧', gregorianDate: new Date(year, 6, 4), category: 'Ancient', description: 'جشنواره آب و بزرگداشت تیشتر، ایزد باران.' },
  { id: 58, name: 'روز جهانی شبکه های اجتماعی', day: 9, jalaliMonth: 'تیر', icon: '📱', gregorianDate: new Date(year, 5, 30), category: 'Business' },
  { id: 59, name: 'روز جهانی شکلات', day: 16, jalaliMonth: 'تیر', icon: '🍫', gregorianDate: new Date(year, 6, 7), category: 'Fun' },

  // Mordad (مرداد) - Starts ~Jul 23
  { id: 60, name: 'روز جهانی دوستی', day: 8, jalaliMonth: 'مرداد', icon: '🧑‍🤝‍🧑', gregorianDate: new Date(year, 6, 30), category: 'International' },
  { id: 61, name: 'روز خبرنگار', day: 17, jalaliMonth: 'مرداد', icon: '📰', gregorianDate: new Date(year, 7, 8), category: 'National' },
  { id: 62, name: 'روز جهانی عکاسی', day: 28, jalaliMonth: 'مرداد', icon: '📷', gregorianDate: new Date(year, 7, 19), category: 'International' },

  // Shahrivar (شهریور) - Starts ~Aug 23
  { id: 63, name: 'روز پزشک', day: 1, jalaliMonth: 'شهریور', icon: '🩺', gregorianDate: new Date(year, 7, 23), category: 'National' },
  { id: 64, name: 'روز برنامه نویس', day: 22, jalaliMonth: 'شهریور', icon: '👨‍💻', gregorianDate: new Date(year, 8, 13), category: 'Business', description: 'روز ۲۵۶م سال میلادی، به افتخار تعداد مقادیر قابل نمایش با یک بایت.' },
  { id: 65, name: 'روز جهانی صلح', day: 30, jalaliMonth: 'شهریور', icon: '🕊️', gregorianDate: new Date(year, 8, 21), category: 'International' },

  // Mehr (مهر) - Starts ~Sep 22
  { id: 1, name: 'روز جهانی پادکست', day: 8, jalaliMonth: 'مهر', icon: '🎙️', gregorianDate: new Date(year, 8, 30), category: 'Business' },
  { id: 2, name: 'روز جهانی قهوه', day: 9, jalaliMonth: 'مهر', icon: '☕', gregorianDate: new Date(year, 9, 1), category: 'Fun' },
  { id: 3, name: 'روز رول دارچینی', day: 13, jalaliMonth: 'مهر', icon: '🥐', gregorianDate: new Date(year, 9, 4), category: 'Fun' },
  { id: 4, name: 'روز تهران', day: 14, jalaliMonth: 'مهر', icon: '🗼', gregorianDate: new Date(year, 9, 6), category: 'National' },
  { id: 5, name: 'روز بدون شکر', day: 12, jalaliMonth: 'مهر', icon: '🚫', gregorianDate: new Date(year, 9, 4), category: 'Fun' },
  { id: 66, name: 'جشن مهرگان', day: 16, jalaliMonth: 'مهر', icon: '☀️', gregorianDate: new Date(year, 9, 8), category: 'Ancient', description: 'جشنواره‌ای برای بزرگداشت میترا، ایزد پیمان و دوستی.' },
  { id: 6, name: 'روز جهانی ساعت', day: 18, jalaliMonth: 'مهر', icon: '⌚', gregorianDate: new Date(year, 9, 10), category: 'Fun' },
  { id: 7, name: 'روز بزرگداشت حافظ', day: 20, jalaliMonth: 'مهر', icon: '📜', gregorianDate: new Date(year, 9, 12), category: 'Cultural' },
  { id: 8, name: 'روز دسر', day: 23, jalaliMonth: 'مهر', icon: '🍰', gregorianDate: new Date(year, 9, 14), category: 'Fun' },
  { id: 9, name: 'روز استیو جابز', day: 25, jalaliMonth: 'مهر', icon: '🍏', gregorianDate: new Date(year, 9, 17), category: 'Business' },
  { id: 10, name: 'روز جهانی آشپز', day: 28, jalaliMonth: 'مهر', icon: '👩‍🍳', gregorianDate: new Date(year, 9, 20), category: 'International' },

  // Aban (آبان) - Starts ~Oct 23
  { id: 11, name: 'روز پاستا', day: 3, jalaliMonth: 'آبان', icon: '🍝', gregorianDate: new Date(year, 9, 25), category: 'Fun' },
  { id: 12, name: 'روز جهانی انیمیشن', day: 6, jalaliMonth: 'آبان', icon: '🎬', gregorianDate: new Date(year, 9, 28), category: 'International' },
  { id: 13, name: 'روز نوجوان', day: 8, jalaliMonth: 'آبان', icon: '🧑', gregorianDate: new Date(year, 9, 30), category: 'National' },
  { id: 14, name: 'روز دانش‌آموز', day: 13, jalaliMonth: 'آبان', icon: '🎒', gregorianDate: new Date(year, 10, 4), category: 'National' },
  { id: 15, name: 'روز پرستار', day: 5, jalaliMonth: 'آبان', icon: '❤️', gregorianDate: new Date(year, 9, 27), category: 'National' },
  { id: 16, name: 'روز سالم خواری', day: 15, jalaliMonth: 'آبان', icon: '🥗', gregorianDate: new Date(year, 10, 6), category: 'Fun' },
  { id: 17, name: 'روز کاپوچینو', day: 17, jalaliMonth: 'آبان', icon: '☕', gregorianDate: new Date(year, 10, 8), category: 'Fun' },
  { id: 18, name: 'روز فست فود', day: 25, jalaliMonth: 'آبان', icon: '🍕', gregorianDate: new Date(year, 10, 16), category: 'Fun' },
  { id: 19, name: 'روز جهانی مرد', day: 28, jalaliMonth: 'آبان', icon: '👨', gregorianDate: new Date(year, 10, 19), category: 'International' },
  
  // Azar (آذر) - Starts ~Nov 22
  { id: 20, name: 'روز اسپرسو', day: 2, jalaliMonth: 'آذر', icon: '☕', gregorianDate: new Date(year, 10, 23), category: 'Fun' },
  { id: 21, name: 'شهادت حضرت زهرا', day: 3, jalaliMonth: 'آذر', icon: '🕯️', gregorianDate: new Date(year, 10, 24), category: 'Religious' },
  { id: 22, name: 'روز کیک', day: 5, jalaliMonth: 'آذر', icon: '🎂', gregorianDate: new Date(year, 10, 26), category: 'Fun' },
  { id: 23, name: 'بلک فرایدی', day: 7, jalaliMonth: 'آذر', icon: '🛍️', gregorianDate: new Date(year, 10, 28), specialStyle: 'black', category: 'Business', description: 'بزرگترین حراج سال در سراسر جهان.' },
  { id: 24, name: 'روز بسکتبال', day: 11, jalaliMonth: 'آذر', icon: '🏀', gregorianDate: new Date(year, 11, 2), category: 'Fun' },
  { id: 25, name: 'روز بیمه', day: 13, jalaliMonth: 'آذر', icon: '🛡️', gregorianDate: new Date(year, 11, 4), category: 'National' },
  { id: 26, name: 'روز دانشجو', day: 16, jalaliMonth: 'آذر', icon: '🎓', gregorianDate: new Date(year, 11, 7), category: 'National' },
  { id: 27, name: 'روز ویالون', day: 22, jalaliMonth: 'آذر', icon: '🎻', gregorianDate: new Date(year, 11, 13), category: 'Fun' },
  { id: 28, name: 'روز مادر', day: 20, jalaliMonth: 'آذر', icon: '💖', gregorianDate: new Date(year, 11, 11), specialStyle: 'pink', category: 'National' },
  { id: 29, name: 'شب یلدا', day: 30, jalaliMonth: 'آذر', icon: '🍉', gregorianDate: new Date(year, 11, 21), specialStyle: 'watermelon', category: 'National', description: 'طولانی‌ترین شب سال و جشن باستانی ایرانیان.' },
  { id: 31, name: 'روز بازی', day: 29, jalaliMonth: 'آذر', icon: '🎮', gregorianDate: new Date(year, 11, 20), category: 'Fun' },

  // Dey (دی) - Starts ~Dec 22
  { id: 32, name: 'کریسمس', day: 4, jalaliMonth: 'دی', icon: '🎄', gregorianDate: new Date(year, 11, 25), category: 'International' },
  { id: 33, name: 'روز ملی ایمنی', day: 7, jalaliMonth: 'دی', icon: '👷', gregorianDate: new Date(year, 11, 28), category: 'National' },
  { id: 34, name: 'آغاز سال نو میلادی', day: 11, jalaliMonth: 'دی', icon: '🎉', gregorianDate: new Date(nextYear, 0, 1), category: 'International' },
  { id: 35, name: 'روز جهانی هیپنوتیزم', day: 14, jalaliMonth: 'دی', icon: '🌀', gregorianDate: new Date(nextYear, 0, 4), category: 'International' },
  { id: 36, name: 'روز جهانی تکنولوژی', day: 16, jalaliMonth: 'دی', icon: '💻', gregorianDate: new Date(nextYear, 0, 6), category: 'Business' },
  { id: 37, name: 'روز جهانی پیتزا', day: 20, jalaliMonth: 'بهمن', icon: '🍕', gregorianDate: new Date(nextYear, 1, 9), category: 'Fun' },

  // Bahman (بهمن) - Starts ~Jan 21
  { id: 68, name: 'جشن سده', day: 10, jalaliMonth: 'بهمن', icon: '🔥', gregorianDate: new Date(nextYear, 0, 30), category: 'Ancient', description: 'جشن آتش و نور، صد روز پیش از نوروز.' },
  { id: 38, name: 'روز جهانی گربه', day: 19, jalaliMonth: 'بهمن', icon: '🐈', gregorianDate: new Date(nextYear, 1, 8), category: 'Fun' },
  { id: 39, name: 'روز ولنتاین', day: 25, jalaliMonth: 'بهمن', icon: '❤️', gregorianDate: new Date(nextYear, 1, 14), specialStyle: 'pink', category: 'International' },
  { id: 40, name: 'روز جهانی باتری', day: 29, jalaliMonth: 'بهمن', icon: '🔋', gregorianDate: new Date(nextYear, 1, 18), category: 'International' },
  { id: 41, name: 'روز مهندس', day: 5, jalaliMonth: 'اسفند', icon: '📐', gregorianDate: new Date(nextYear, 1, 24), category: 'National' },

  // Esfand (اسفند) - Starts ~Feb 20
  { id: 42, name: 'سپندارمذگان', day: 5, jalaliMonth: 'اسفند', icon: '💕', gregorianDate: new Date(nextYear, 1, 24), category: 'Ancient' },
  { id: 43, name: 'روز جهانی زن', day: 18, jalaliMonth: 'اسفند', icon: '👩', gregorianDate: new Date(nextYear, 2, 8), category: 'International' },
  { id: 44, name: 'روز درختکاری', day: 15, jalaliMonth: 'اسفند', icon: '🌳', gregorianDate: new Date(nextYear, 2, 5), category: 'National' },
  { id: 45, name: 'چهارشنبه سوری', day: 28, jalaliMonth: 'اسفند', icon: '🔥', gregorianDate: new Date(nextYear, 2, 18), category: 'National' },
  { id: 46, name: 'تحویل سال نو', day: 29, jalaliMonth: 'اسفند', icon: '🌱', gregorianDate: new Date(nextYear, 2, 20), category: 'National' },

  // --- Events for 2026 ---
  // To ensure the calendar has future events to display
  
  // Ordibehesht (اردیبهشت)
  { id: 101, name: 'روز جهانی زمین', day: 2, jalaliMonth: 'اردیبهشت', icon: '🌍', gregorianDate: new Date(nextYear, 3, 22), category: 'International' },
  { id: 102, name: 'روز معلم', day: 12, jalaliMonth: 'اردیبهشت', icon: '🧑‍🏫', gregorianDate: new Date(nextYear, 4, 2), category: 'National' },

  // Khordad (خرداد)
  { id: 103, name: 'روز جهانی محیط زیست', day: 15, jalaliMonth: 'خرداد', icon: '🏞️', gregorianDate: new Date(nextYear, 5, 5), category: 'International' },
  
  // Tir (تیر)
  { id: 104, name: 'روز جهانی شبکه های اجتماعی', day: 9, jalaliMonth: 'تیر', icon: '📱', gregorianDate: new Date(nextYear, 5, 30), category: 'Business' },
  
  // Azar (آذر)
  { id: 105, name: 'بلک فرایدی', day: 6, jalaliMonth: 'آذر', icon: '🛍️', gregorianDate: new Date(nextYear, 10, 27), specialStyle: 'black', category: 'Business', description: 'بزرگترین حراج سال در سراسر جهان.' },
  { id: 106, name: 'شب یلدا', day: 30, jalaliMonth: 'آذر', icon: '🍉', gregorianDate: new Date(nextYear, 11, 21), specialStyle: 'watermelon', category: 'National', description: 'طولانی‌ترین شب سال و جشن باستانی ایرانیان.' },

  // Dey (دی)
  { id: 107, name: 'کریسمس', day: 4, jalaliMonth: 'دی', icon: '🎄', gregorianDate: new Date(nextYear, 11, 25), category: 'International' },
];