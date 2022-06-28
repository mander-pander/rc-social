/* eslint-disable no-console */
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies["x-access-token"];

    console.log(req.cookies, token);

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.user_id = decoded.user_id;
        next();
    });
};

module.exports = {
    verifyToken
};
