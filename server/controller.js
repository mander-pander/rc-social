/* eslint-disable camelcase */

require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    displayFeed: (req, res) => {
        console.log(req.user_id);
        sequelize.query(`
            SELECT posts.content AS pc, comments.content AS cc, posts.id AS pi, comments.id AS ci
            FROM posts
            LEFT JOIN comments
            ON posts.id = comments.post_id
            ORDER BY posts.id;
        `)
            .then((dbRes) => {
                const newdbRes = {};
                for (const dbResObj of dbRes[0]) {
                    if (!newdbRes[dbResObj.pi]) {
                        newdbRes[dbResObj.pi] = dbResObj;
                        newdbRes[dbResObj.pi].cc = [newdbRes[dbResObj.pi].cc];
                    }
                    else {
                        (newdbRes[dbResObj.pi].cc).push(dbResObj.cc);
                    }
                }
                res.send(Object.values(newdbRes));
            })
            .catch((err) => console.log("Error", err));
    },

    displayAP: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM airplane;
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    createPost: (req, res) => {
        const { content, user_id } = req.body;
        sequelize.query(`
            INSERT INTO posts
            (content, user_id)
            VALUES ('${content}', '${user_id}');
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    createComment: (req, res) => {
        const { content, user_id, post_id } = req.body;
        sequelize.query(`
            INSERT INTO comments
            (content, user_id, post_id)
            VALUES ('${content}', '${user_id}', '${post_id}');
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    deletePost: (req, res) => {
        console.log("req.query", req.query);
        const { post_id } = JSON.parse(req.query.data);
        sequelize.query(`
            DELETE
            FROM posts
            WHERE id = "${post_id}";
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    deleteComments: (req, res) => {
        const { comment_id } = JSON.parse(req.query.data);
        sequelize.query(`
            DELETE
            FROM comments
            WHERE id = '${comment_id}';
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    displayAirfields: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM airfield
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    },

    displayWishlist: (req, res) => {
        sequelize.query(`
            SELECT airplane.model
            FROM wishlist
            INNER JOIN wishlistitem ON wishlist.id=wishlistitem.wishlist_id
            INNER JOIN airplane ON wishlistitem.airplane_id=airplane.id
            WHERE wishlist.user_id='${req.user_id}'
        `)
            .then((dbRes) => {
                res.send(dbRes);
            })
            .catch((err) => console.log(err));
    }
};
