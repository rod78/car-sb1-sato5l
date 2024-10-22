import React, { useState, useEffect } from 'react';
import AdminEventList from '../components/AdminEventList';
import AdminEventForm from '../components/AdminEventForm';
import { Event } from '../types';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api';

const AdminPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleCreateEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const event = await updateEvent(updatedEvent);
      setEvents(events.map(e => e.id === event.id ? event : e));
      setSelectedEvent(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsFormVisible(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {isFormVisible ? (
        <AdminEventForm
          event={selectedEvent || undefined}
          onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={() => {
            setIsFormVisible(false);
            setSelectedEvent(null);
          }}
        />
      ) : (
        <>
          <button
            onClick={() => setIsFormVisible(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Event
          </button>
          <AdminEventList
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </>
      )}
    </div>
  );
};

export default AdminPage;