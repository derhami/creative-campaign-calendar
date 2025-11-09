export type EventCategory = 'National' | 'International' | 'Religious' | 'Cultural' | 'Business' | 'Fun' | 'Ancient';

export interface EventData {
  id: number;
  name: string;
  day: number;
  jalaliMonth: string;
  icon: string;
  gregorianDate: Date;
  category: EventCategory;
  description?: string;
  specialStyle?: 'pink' | 'black' | 'watermelon' | 'dark-blue';
}

export type Theme = 'light' | 'dark';

export interface CampaignIdea {
  title: string;
  description: string;
}