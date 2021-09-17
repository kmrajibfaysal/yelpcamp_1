const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

// connection to database and error handler
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database Connected');
}
main().catch((err) => console.log(err));

const app = express();
// render parameter
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse parameter

app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    // eslint-disable-next-line no-underscore-dangle
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

// open port
app.listen(3000, () => {
    console.log('Serving on port 3000!');
});
