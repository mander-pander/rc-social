const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { SERVER_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

// const { createTables,
//         deleteAllTables,
//         seedData,
//         seedAirplanes,
//         seedPosts,
//         seedComments,
//         seedAirfields,
//         seedWishlists,
//         seedWishlistItems
//     } = require('./controllerSeed.js');

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

// app.post('/seedAP', (req, res) => {
//     seedAirplanes(req, res);
// });

// app.post('/seedPosts', (req, res) => {
//     seedPosts(req, res);
// });

// app.post('/seedComments', (req, res) => {
//     seedComments(req, res);
// });

// app.post('/seedAF', (req, res) => {
//     seedAirfields(req, res);
// });

// app.post('/seedList', (req, res) => {
//     seedWishlists(req, res);
// });

// app.post('/seedItems', (req, res) => {
//     seedWishlistItems(req, res);
// });

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
