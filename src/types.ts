export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'meet' | 'show' | 'race';
  location: string;
  description: string;
  facebookUrl?: string; // New optional field for Facebook URL
}

export interface FilterOptions {
  date: string;
  type: 'all' | 'meet' | 'show' | 'race';
}