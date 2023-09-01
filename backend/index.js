const express = require('express');
var cors = require('cors')
const scrapeMultiplePages = require('./getData');
const { connection } = require('./connect');
const apartments = require('./routes/apartments')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// db connection
connection();

// routes
app.use("/api/apartments", apartments);

// main
app.get('/getData', async (req, res) => {
    var data = await scrapeMultiplePages()
    console.log(data.length)
    res.status(200).json(data);
});

app.get('/', async (req, res) => {
    res.status(200).send("Hello, backend is working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});