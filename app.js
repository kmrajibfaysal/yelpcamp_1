const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

const app = express();

// connection to database and error handler
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database Connected');
}
main().catch((err) => console.log(err));

// render parameter
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My backyard', description: 'Cheap camping!' });
    await camp.save();
    res.send(camp);
});

// open port
app.listen(3000, () => {
    console.log('Serving on port 3000!');
});
