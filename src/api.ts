import { Event } from './types';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';

let API_TOKEN: string | null = null;

const setApiToken = (token: string) => {
  API_TOKEN = token;
};

const getApiToken = async (): Promise<string> => {
  if (!API_TOKEN) {
    const response = await fetch(`${API_URL}/token`, {
      headers: {
        'x-is-admin': localStorage.getItem('isLoggedIn') === 'true' ? 'true' : 'false'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch API token');
    }
    const data = await response.json();
    API_TOKEN = data.token;
  }
  return API_TOKEN;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = await getApiToken();
  const headers = {
    ...options.headers,
    'x-api-token': token,
  };
  return fetch(url, { ...options, headers });
};

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetchWithAuth(`${API_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const response = await fetchWithAuth(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const updateEvent = async (event: Event): Promise<Event> => {
  const response = await fetchWithAuth(`${API_URL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to update event');
  }
  return response.json();
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  const response = await fetchWithAuth(`${API_URL}/events/${eventId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};

export { setApiToken };