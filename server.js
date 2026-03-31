import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Resolve __dirname since we are using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// API Routes Example
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// -- For Deployment (Serve React App) --
// Uncomment the following lines if you want this server to serve your built React app
/*
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
*/

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
