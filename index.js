const express = require("express");
require("dotenv").config();
const router = require("./routers/router");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("assets"));
app.use(express.static("plugins"));

let fileStoreOptions = {};

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: new FileStore(fileStoreOptions),
}));

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.URL}${process.env.PORT}`);
});
