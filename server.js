

require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');



mongoose.connect(DATABASE_URL);
mongoose.connection
    .on('open', () => console.log("connected to MongoDB"))
    .on('close', () => console.log('disconnected from MongoDB'))
    .on('error', (error) => console.log(error));



//////////////  MODELS
const TaskSchema = new mongoose.Schema({
    salesOrder: String,
    customer: String,
    assemblyNumber: String,
    assemblyQty: String,
    userWorking: String,
    notes: String,
    completedDate: Date,
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

// ROUTES
// test route
app.get('/', (req, res) => {
    res.send('hello');
})







app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));