import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import EventList from './components/EventList';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ApiPage from './pages/ApiPage';
import { Event, FilterOptions } from './types';
import { fetchEvents, setApiToken } from './api';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    date: '',
    type: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
        setUsingMockData(fetchedEvents.length === 3); // Assuming mock data has 3 events
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const dateMatch = !filters.date || event.date >= filters.date;
      const typeMatch = filters.type === 'all' || event.type === filters.type;
      return dateMatch && typeMatch;
    });
    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroBanner />
              <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6" id="events">Upcoming Car Events in Canada</h2>
                {usingMockData && (
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Note:</p>
                    <p>The server is currently unavailable. Displaying mock data for demonstration purposes.</p>
                  </div>
                )}
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
                {isLoading ? (
                  <p className="text-center py-8">Loading events...</p>
                ) : error ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                  </div>
                ) : (
                  <EventList events={filteredEvents} />
                )}
              </main>
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/api" element={
            <ProtectedRoute>
              <ApiPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;