import React from 'react';
import { Calendar } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Canadian Car Events Tracker</h1>
            <p className="text-xl mb-6">
              Discover and keep track of exciting car meets, shows, and races across Canada. Never miss a thrilling automotive event again!
            </p>
            <a
              href="#events"
              className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
            >
              <Calendar className="mr-2" size={20} />
              Explore Events
            </a>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000"
              alt="Car event"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;