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
    addToWL
} = require("./controller");

const {
    verifyToken
} = require("./auth");

app.get("/posts", [verifyToken], displayFeed);
app.get("/planes", displayAP);
app.get("/fields", displayAirfields);
app.get("/wishlist", [verifyToken], displayWishlist);
app.post("/createPost", createPost);
app.post("/createComment", createComment);
app.post("/addItem", addToWL);
app.delete("/posts", deletePost);
app.delete("/comments", deleteComments);

const {
    createUser,
    loginUser
    // logoutUser
} = require("./controllerAuth");

app.post("/signup", createUser);
app.post("/login", loginUser);
// app.post("/logout", logoutUser);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
