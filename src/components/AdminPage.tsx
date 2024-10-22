import React, { useState } from 'react';
import { Event } from '../types';
import EventForm from './EventForm';

interface AdminPageProps {
  events: Event[];
  onEventUpdate: (event: Event) => void;
  onEventCreate: (event: Event) => void;
  onEventDelete: (eventId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ events, onEventUpdate, onEventCreate, onEventDelete }) => {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleSubmit = (event: Event) => {
    if (editingEvent) {
      onEventUpdate(event);
    } else {
      onEventCreate(event);
    }
    setEditingEvent(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
        <EventForm
          event={editingEvent || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{event.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onEventDelete(event.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;