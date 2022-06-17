const express = require('express');
const cors = require('cors');

require('dotenv').config();
const {SERVER_PORT} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
