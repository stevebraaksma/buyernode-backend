

require('dotenv').config();
const { PORT = 3001 } = process.env;
const express = require('express');
const app = express();

// test route
app.get('/', (req, res) => {
    res.send('hello');
})







app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));