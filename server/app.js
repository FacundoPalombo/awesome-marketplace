const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const timeout = require("connect-timeout");
const cors = require("cors");

const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

const routes = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(timeout("5s"));
app.use(express.static(path.join(__dirname, "public")));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.use(routes);

const swaggerSpecs = swaggerJsdoc(swaggerDocument);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
  })
);

// Generic error handling .
app.use(function (req, res, next) {
  const error = createError(501);
  res.status(error.statusCode).json({
    message: error.message,
    status: error.statusCode,
  });
  next();
});

module.exports = app;
