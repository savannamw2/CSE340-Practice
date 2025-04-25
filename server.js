// Import express using ESM syntax
import express from 'express';

// Create an instance of an Express application
const app = express();

// Define a route handler for the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello, World! <a href="/about-me">About Me</a>');
});

app.get('/about-me', (req, res) => {
    res.send(
        '<h1>About Me</h1><p>This is a simple Express server.</p> <a href="/">Go back to Home</a>'
    );
});

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});