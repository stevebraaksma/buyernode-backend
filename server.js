

require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(DATABASE_URL);
mongoose.connection
    .on('open', () => console.log("connected to MongoDB"))
    .on('close', () => console.log('disconnected from MongoDB'))
    .on('error', (error) => console.log(error));




// ROUTES
// test route
app.get('/', (req, res) => {
    res.send('hello');
})







app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));