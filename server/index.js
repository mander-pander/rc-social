/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { SERVER_PORT } = process.env;

const app = express();

const corsConfig = {
    credentials: true,
    origin: true
};
app.use(cors(corsConfig));

app.use(express.json());

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

const {
    displayFeed,
    displayAP,
    displayAirfields,
    createPost,
    createComment,
    deletePost,
    deleteComments,
    displayWishlist,
    addToWL,
    deleteItem
} = require("./controller");

const {
    verifyToken
} = require("./auth");

app.get("/loginstatus", [verifyToken], (req, res) => res.sendStatus(200));
app.get("/posts", [verifyToken], displayFeed);
app.get("/planes", displayAP);
app.get("/fields", displayAirfields);
app.get("/wishlist", [verifyToken], displayWishlist);
app.post("/createPost", [verifyToken], createPost);
app.post("/createComment", [verifyToken], createComment);
app.post("/addItem", [verifyToken], addToWL);
app.delete("/posts", deletePost);
app.delete("/comments", deleteComments);
app.delete("/wishlist", deleteItem);

const {
    createUser,
    loginUser
} = require("./controllerAuth");

app.post("/signup", createUser);
app.post("/login", loginUser);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
