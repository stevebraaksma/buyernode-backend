

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
    status: String,
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// ROUTES
// test route
app.get('/', (req, res) => {
    res.send('hello');
});

// index route
app.get('/tasks', async (req, res) => {
    try {
        res.json(await Task.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// create route
app.post('/tasks', async (req, res) => {
    try {
        res.json(await Task.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// delete route
app.delete('/tasks/:id', async (req, res) => {
    try {
        res.json(await Task.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// update route
app.put('/tasks/:id', async (req, res) => {
    try {
        res.json(
            await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
})







app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));