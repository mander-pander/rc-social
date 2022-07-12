/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 4040;

const app = express();

const corsConfig = {
    credentials: true,
    origin: ["https://jolly-froyo-d03e7d.netlify.app"]
};
app.use(cors(corsConfig));

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "./build//static")));

app.get("*", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "./build/") });
});
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

app.get("/api/loginstatus", [verifyToken], (req, res) => res.sendStatus(200));
app.get("/api/posts", [verifyToken], displayFeed);
app.get("/api/planes", displayAP);
app.get("/api/fields", displayAirfields);
app.get("/api/wishlist", [verifyToken], displayWishlist);
app.post("/api/createPost", [verifyToken], createPost);
app.post("/api/createComment", [verifyToken], createComment);
app.post("/api/addItem", [verifyToken], addToWL);
app.delete("/api/posts", deletePost);
app.delete("/api/comments", deleteComments);
app.delete("/api/wishlist", deleteItem);

const {
    createUser,
    loginUser
} = require("./controllerAuth");

app.post("/api/signup", createUser);
app.post("/api/login", loginUser);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
