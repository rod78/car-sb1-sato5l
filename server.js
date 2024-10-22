import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Generate a random API token
const API_TOKEN = crypto.randomBytes(32).toString('hex');
console.log('API Token:', API_TOKEN);

// Middleware to check API token
const checkApiToken = (req, res, next) => {
  const token = req.headers['x-api-token'];
  if (token !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Open SQLite database
let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Create events table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      date TEXT,
      type TEXT,
      location TEXT,
      description TEXT,
      facebookUrl TEXT
    )
  `);
})();

// API routes
app.get('/api/events', checkApiToken, async (req, res) => {
  try {
    const events = await db.all('SELECT * FROM events');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/events', checkApiToken, async (req, res) => {
  const { title, date, type, location, description, facebookUrl } = req.body;
  try {
    const result = await db.run(
      'INSERT INTO events (title, date, type, location, description, facebookUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [title, date, type, location, description, facebookUrl]
    );
    res.json({ id: result.lastID, ...req.body });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/events/:id', checkApiToken, async (req, res) => {
  const { id } = req.params;
  const { title, date, type, location, description, facebookUrl } = req.body;
  try {
    await db.run(
      'UPDATE events SET title = ?, date = ?, type = ?, location = ?, description = ?, facebookUrl = ? WHERE id = ?',
      [title, date, type, location, description, facebookUrl, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/events/:id', checkApiToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM events WHERE id = ?', id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export API_TOKEN for the client to use
app.get('/api/token', (req, res) => {
  if (req.headers['x-is-admin'] === 'true') {
    res.json({ token: API_TOKEN });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});