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
        // console.log(res)
        sequelize.query(`
            SELECT posts.content AS pc, comments.content AS cc, posts.post_id AS pi
            FROM posts
            LEFT JOIN comments
            ON posts.post_id = comments.post_id;
        `)
            .then((dbRes) => {
                console.log('dbRes', dbRes)
                res.send(dbRes)
            })
            .catch(err => console.log('Error', err))
    },

    displayAP: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM airplane;
        `)
            .then((dbRes) => {
                res.send(dbRes)
            });
    },

    createPost: (req, res) => {
        let { content, user_id } = req.body;
        sequelize.query(`
            INSERT INTO posts
            (content, user_id)
            VALUES ('${content}', '${user_id}');
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch(err => console.log(err));
    },

    deletePost: (req, res) => {
        console.log('req.query', req.query);
        const { post_id } = JSON.parse(req.query.data);
        sequelize.query(`
            DELETE
            FROM posts
            WHERE post_id = '${post_id}';
        `)
        .then((dbRes) => {
            res.send(dbRes)
        })
        .catch(err => console.log(err));
    }



}
