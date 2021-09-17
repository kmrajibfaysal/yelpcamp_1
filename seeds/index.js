/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

// connection to database and error handler
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('Database Connected');
}
main().catch((err) => console.log(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
