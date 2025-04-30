// Import express using ESM syntax
import express from 'express'

// Add these imports to your existing imports
import { fileURLToPath } from 'url';
import path from 'path';

/**
* Declare important (semi-global) variables
*/
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';


// Create an instance of an Express application
const app = express();

// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configures the Express Server
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
// Example of the refactored home route
// Home page
app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome to the Home Page</h1>';
    res.render('index', { title, content, NODE_ENV, PORT });
});

app.get('/about', (req, res) => {
    const title = 'About Us Page';
    const content = '<h1>Welcome to the About Us Page</h1>';
    res.render('about', { title, content, NODE_ENV, PORT });
});

app.get('/contact', (req, res) => {
    const title = 'Contact Us Page';
    const content = '<h1>Welcome to the Contact Us Page</h1>';
    res.render('contact', { title, content, NODE_ENV, PORT });
});

// Set the views directory (where your templates are located)
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where your templates are located)
app.set('views', path.join(__dirname, 'src/views'));

// When in development mode, start a WebSocket server for live reloading
const mode = process.env.MODE;

if (mode.includes('dev')) {
    const ws = await import('ws');

    try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });

        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });

        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});