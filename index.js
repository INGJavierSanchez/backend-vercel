const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for the root URL
app.get('/', (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en Vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

// Export the app as a handler function
module.exports = (req, res) => {
  // Pass the request and response objects to the Express app
  app(req, res);
};