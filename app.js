"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");


const Sequelize = require("sequelize"); // Import sequelize class
var sequelize = require("./models").sequelize; // import all models

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";
const bodyParser = require("body-parser");
// Import routes

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));
// Set to use json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO setup your api routes here
// Import API routes
app.use("/", indexRouter);
app.use("/api", apiRouter);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// Send 404 if no other route matched.
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// global other error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = "Page Not Found!";
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Sync models and test connection
sequelize.sync()
                            .then((res) => {
    sequelize.authenticate().then ( res => {console.log("Connection has been established successfully!")})
                            .catch( res=>  {console.error("Unable to connect to the database:", error)});
});

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
