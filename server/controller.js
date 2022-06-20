const { faker } = require('@faker-js/faker');

require('dotenv').config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    displayFeed: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM posts;
        `)
        .then((dbRes) => {
            res.send(dbRes)
        });
    },

    displayAP: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM airplane;
        `)
        .then((dbRes) => {
            res.send(dbRes)
        });
    }

}
