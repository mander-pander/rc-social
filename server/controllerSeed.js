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
const SEEDED_AP_AMOUNT = 50;
const SEEDED_POST_AMOUNT = 25;
const SEEDED_COMMENT_AMOUNT = 25;
const SEEDED_AF_AMOUNT = 50;
const SEEDED_ITEM_AMOUNT = 75;

module.exports = {
    displayFeed: (req, res) => {
        sequelize.query(`
        SELECT post_id, content
        FROM posts;
        `)
    }
}

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

    seedAirplanes: async (req, res) => {
        for(let n = 0; n < SEEDED_AP_AMOUNT; n++) {
            let model = faker.vehicle.vehicle();
            await sequelize.query(`
                INSERT INTO airplane(model)
                VALUES ('${model}');
            `)
        }
        console.log('models entered')
        res.sendStatus(200);
    },

    seedPosts: async (req, res) => {
        for(let n = 0; n < SEEDED_POST_AMOUNT; n++) {
            console.log(`seeding post # ${n} out of ${SEEDED_POST_AMOUNT}`);
            let user_id = Math.floor(Math.random() * 50 + 1);
            let post = faker.lorem.paragraph();
            await sequelize.query(`
                INSERT INTO posts(content, user_id)
                VALUES ('${post}', '${user_id}');
            `)
            console.log(`finished post # ${n} out of ${SEEDED_POST_AMOUNT}`);

        }
        res.sendStatus(200);
    },

    seedComments: async (req, res) => {
        for(let n = 0; n < SEEDED_COMMENT_AMOUNT; n++) {
            let user_id = Math.floor(Math.random() * 50 + 1);
            let post_id = Math.floor(Math.random() * 25 + 1);
            let content = faker.lorem.sentence();
            await sequelize.query(`
                INSERT INTO comments(content, user_id, post_id)
                VALUES ('${content}', '${user_id}', '${post_id}');
            `)

        }
        res.sendStatus(200);
    },

    seedAirfields: async (req, res) => {
        for(let n = 0; n < SEEDED_AF_AMOUNT; n++) {
            let name = faker.company.companyName().replace("'", "");
            let street = faker.address.streetAddress().replace("'", "");
            let city = faker.address.cityName();
            let state = faker.address.stateAbbr();
            let zip = faker.address.zipCode();
            await sequelize.query(`
                INSERT INTO airfield (name, address)
                VALUES ('${name}', '${street}');
            `)
        }
        res.sendStatus(200);
    },

    seedWishlists: async(req, res) => {
        for(let n = 0; n <= SEEDED_USER_AMOUNT; n++) {
            await sequelize.query(`
                INSERT INTO wishlist(user_id)
                VALUES('${n}');
            `)
        }
        res.sendStatus(200);
    },

    seedWishlistItems: async(req, res) => {
        for(let n = 0; n <= SEEDED_ITEM_AMOUNT; n++) {
            let list_id = Math.floor(Math.random() * 50 + 1);
            let airplane_id = Math.floor(Math.random() * 50 + 1);
            await sequelize.query(`
                INSERT INTO wishlistItem(list_id, airplane_id)
                VALUES ('${list_id}', '${airplane_id}');
            `)
        }
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
            content varchar(750),
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
            model varchar(100)
        );

        CREATE TABLE IF NOT EXISTS wishlistItem (
            list_id INT NOT NULL REFERENCES wishlist(list_id),
            airplane_id INT NOT NULL REFERENCES airplane(airplane_id)
        );

        CREATE TABLE IF NOT EXISTS airfield (
            airfield_id SERIAL PRIMARY KEY,
            name varchar(100),
            address varchar(100)
        );

        `).then(() => {
            console.log('DB Seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error seeding DB', err));
    }
}
