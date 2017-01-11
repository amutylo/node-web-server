const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000

let app = express();
let currentYear = new Date().getFullYear();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.use((req, res, next) => {
    let now = new Date().toString();
    let logString = `${now}, ${req.method} ${req.url}` + '\n';

    fs.appendFile('server.log', logString, (err) => {
        if (err) {
            console.log('Can not write log string to a file.');
        }
    })
    next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
       res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: "Welcome to the home page",
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
})
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});