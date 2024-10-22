import { Event } from '../types';

const cities = [
  'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City',
  'Hamilton', 'Halifax', 'Victoria', 'London', 'Saskatoon', 'Regina', 'St. John\'s'
];

const eventTitles = [
  'Annual Auto Show', 'Classic Car Meet', 'Supercar Sunday', 'Vintage Vehicle Rally',
  'Electric Car Expo', 'Off-Road Adventure', 'Muscle Car Mania', 'Import Car Showcase',
  'Truck & SUV Extravaganza', 'Luxury Car Exhibition', 'Racing Day', 'Car Audio Competition',
  'Auto Parts Swap Meet', 'Custom Car Show', 'Green Vehicle Symposium'
];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const generateRandomEvent = (): Event => {
  const type = ['meet', 'show', 'race'][Math.floor(Math.random() * 3)] as 'meet' | 'show' | 'race';
  const city = cities[Math.floor(Math.random() * cities.length)];
  const title = eventTitles[Math.floor(Math.random() * eventTitles.length)];
  const date = generateRandomDate(new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

  return {
    id: Date.now().toString(),
    title: `${city} ${title}`,
    date,
    type,
    location: `${city}, Canada`,
    description: `Join us for the exciting ${title} in ${city}. This ${type} promises to be an unforgettable experience for all car enthusiasts.`
  };
};

export const generateEvents = (count: number): Event[] => {
  return Array.from({ length: count }, generateRandomEvent);
};