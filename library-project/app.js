require("dotenv").config();
require("./config/mongo");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const flash = require("connect-flash");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(express.static(path.join(__dirname, "views")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60,
      // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use(require("./middlewares/flashMessage"));
app.use(require("./middlewares/loginStatus"));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

//app.use('/api/', indexRouter);

const authentification = require("./routes/authentification");
app.use("/auth", authentification);

// app.use(require("./middlewares/adminRoute"));

// app.use(require("./middlewares/userRoute"));
// app.use(require("./middlewares/loginStatus"));

module.exports = app;
