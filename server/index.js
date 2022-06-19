const express = require('express');
const cors = require('cors');

require('dotenv').config();
const {SERVER_PORT} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

const {createTables, deleteAllTables, seedData} = require('./controller.js');

//Don't expose this in production
// app.post('/db', (req, res) => {
//     createTables(req, res);
// });

// app.post('/deleteDB', (req, res) => {
//     deleteAllTables(req, res);
// });

// app.post('/seedDB', (req, res) => {
//     seedData(req, res);
// });

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
