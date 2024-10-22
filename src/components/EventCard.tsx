import React from 'react';
import { Calendar, MapPin, Tag, Facebook } from 'lucide-react';
import { Event } from '../types';
import { eventImages } from '../utils/eventImages';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={eventImages[event.type]} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Tag size={16} className="mr-2" />
          <span className="capitalize">{event.type}</span>
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>
        {event.facebookUrl && (
          <a
            href={event.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <Facebook size={16} className="mr-2" />
            View on Facebook
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;