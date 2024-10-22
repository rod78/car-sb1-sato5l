import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ApiPage: React.FC = () => {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const fetchApiToken = async () => {
      try {
        const response = await fetch('/api/token', {
          headers: {
            'x-is-admin': 'true'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setApiToken(data.token);
        }
      } catch (error) {
        console.error('Failed to fetch API token:', error);
      }
    };

    if (isLoggedIn) {
      fetchApiToken();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      {apiToken && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Your API Token:</p>
          <p className="font-mono">{apiToken}</p>
          <p className="mt-2">Include this token in the 'x-api-token' header for all API requests.</p>
        </div>
      )}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p>All API requests require an 'x-api-token' header with your API token.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Get All Events</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            GET /api/events
          </pre>
          <p className="mt-2">Retrieves a list of all events.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Response</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
{`[
  {
    "id": "1",
    "title": "Car Show 2024",
    "date": "2024-07-15",
    "type": "show",
    "location": "Toronto, ON",
    "description": "Annual car show featuring classic and modern vehicles.",
    "facebookUrl": "https://facebook.com/events/carshow2024"
  },
  ...
]`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            POST /api/events
          </pre>
          <p className="mt-2">Creates a new event.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Request Body</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "title": "New Car Meet",
  "date": "2024-08-20",
  "type": "meet",
  "location": "Vancouver, BC",
  "description": "Monthly car enthusiast meetup",
  "facebookUrl": "https://facebook.com/events/newcarmeet"
}`}
          </pre>
          <h3 className="text-xl font-semibold mt-4 mb-2">Response</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "id": "2",
  "title": "New Car Meet",
  "date": "2024-08-20",
  "type": "meet",
  "location": "Vancouver, BC",
  "description": "Monthly car enthusiast meetup",
  "facebookUrl": "https://facebook.com/events/newcarmeet"
}`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            PUT /api/events/:id
          </pre>
          <p className="mt-2">Updates an existing event.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Request Body</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "title": "Updated Car Meet",
  "date": "2024-08-21",
  "type": "meet",
  "location": "Vancouver, BC",
  "description": "Updated monthly car enthusiast meetup",
  "facebookUrl": "https://facebook.com/events/updatedcarmeet"
}`}
          </pre>
          <h3 className="text-xl font-semibold mt-4 mb-2">Response</h3>
          <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "id": "2",
  "title": "Updated Car Meet",
  "date": "2024-08-21",
  "type": "meet",
  "location": "Vancouver, BC",
  "description": "Updated monthly car enthusiast meetup",
  "facebookUrl": "https://facebook.com/events/updatedcarmeet"
}`}
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Delete Event</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            DELETE /api/events/:id
          </pre>
          <p className="mt-2">Deletes an event.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Response</h3>
          <p>204 No Content</p>
        </section>
      </div>
    </div>
  );
};

export default ApiPage;