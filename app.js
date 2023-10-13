const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;

// Set up paths for your views and partials
const viewsPath = path.join(__dirname, 'views');
const partialsPath = path.join(__dirname, 'views/partials');

// Configure Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve static files like CSS, JS, and images
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define your routes
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/contact', async (req, res) => {
    // Handle the contact form submission
    // ...

    res.render('home'); // Render a view after processing the form
});

app.post('/useraccount', async (req, res) => {
    // Handle user registration or account creation
    // ...

    res.render('home', { username, isLogged: true }); // Render a view based on the result
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
