/* eslint-disable no-console */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { DATABASE_URL, JWT_SECRET } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    createUser: (req, res) => {
        const { username, password } = req.body;
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        sequelize.query(`
            INSERT INTO users
            (username, password)
            VALUES ('${username}', '${hash}');
            SELECT id
            FROM users
            WHERE username = '${username}';

        `)
            .then((dbRes) => {
                const token = jwt.sign({ user_id: dbRes[0][0].id }, JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });
                res.cookie("x-access-token", token);
                res.status(200).send({ username, token });
                sequelize.query(`
                    INSERT INTO wishlist (user_id)
                    VALUES('${dbRes[0][0].id}');
            `);
            })
            .catch((err) => console.log(err));
    },

    loginUser: (req, res) => {
        const { username, password } = req.body;
        sequelize.query(`
            SELECT id, password
            FROM users
            WHERE username = '${username}';
        `)
            .then((dbRes) => {
                const hash = dbRes[0][0].password;
                const isValidPW = bcrypt.compareSync(password, hash);
                if (isValidPW) {
                    const token = jwt.sign({ user_id: dbRes[0][0].id }, JWT_SECRET, {
                        expiresIn: 86400 // 24 hours
                    });
                    console.log("successfully logged in");

                    res.cookie("x-access-token", token, { sameSite: "none" });
                    res.status(200).send({ username, token });
                }
            })
            .catch((err) => console.log(err));
    }
};
