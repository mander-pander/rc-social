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

const SEEDED_USER_AMOUNT = 50;

module.exports = {
    seedData: async (req, res) => {
        for(let n = 0; n < SEEDED_USER_AMOUNT; n++) {
            let username = faker.internet.userName();
            let password = faker.internet.password(30);
            await sequelize.query(`
                INSERT INTO users(username, password)
                VALUES ('${username}', '${password}');
            `)
        }
        console.log('users seeded.')
        res.sendStatus(200);
    },

    deleteAllTables: (req, res) => {
        sequelize.query(`
        DROP TABLE users, posts, comments, wishlist, wishlistItem, airfield, airplane;
        `).then(() => {
            console.log('DB deleted! Ope!')
            res.sendStatus(200)
        }).catch(err => console.log('Error deleting DB, eesh', err));
    },

    createTables: (req, res) => {
        sequelize.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username varchar(50) NOT NULL,
            password varchar(100) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS posts (
            post_id SERIAL PRIMARY KEY,
            content varchar(250),
            user_id INT NOT NULL REFERENCES users(user_id)
        );

        CREATE TABLE IF NOT EXISTS comments (
            comment_id SERIAL PRIMARY KEY,
            content varchar(250),
            user_id INT NOT NULL REFERENCES users(user_id),
            post_id INT NOT NULL REFERENCES posts(post_id)
        );

        CREATE TABLE IF NOT EXISTS wishlist (
            list_id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(user_id)
        );

        CREATE TABLE IF NOT EXISTS airplane (
            airplane_id SERIAL PRIMARY KEY,
            model varchar(100),
            address varchar(100)
        );

        CREATE TABLE IF NOT EXISTS wishlistItem (
            list_id INT NOT NULL REFERENCES wishlist(list_id),
            airplane_id INT NOT NULL REFERENCES airplane(airplane_id)
        );

        CREATE TABLE IF NOT EXISTS airfield (
            airfield_id SERIAL PRIMARY KEY,
            name varchar(100)
        );

        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB', err));
    }
}
