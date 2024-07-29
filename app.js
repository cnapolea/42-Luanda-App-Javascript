require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = require("./config/db.config");

const { errorHandler, logHandler } = require("./middleware/logHandler");

const apiRoute = require("./intra/router/cluster.route");
const authRoute = require("./intra/router/auth.router");
const studentRoute = require("./intra/router/student.router");
const campusRoute = require("./v3/router/campus.route");
// const freezeRoute = require("./v3/router/freeze.router");

const {
  validateKeyCloakUser: keyCloakValidationMiddleware,
} = require("./v3/middleware/user.authentication");
const { authenticateUserController } = require("./intra/controllers/auth.controller");
const { validateUser } = require("./intra/controllers/auth.controller");

const PORT = process.env.PORT || 3000;

//Create handlers for logs
if (process.env.NODE_ENV === "development") {
  app.use(logHandler);
}

// Setup cookie parser
app.use(cookieParser());

//Connect Database
connectDB();

// Create authentication for PowerBI

app.use("/authenticate", authRoute);
app.use(validateUser);
app.use("/students", studentRoute);

// app.use("/api", apiRoute);
// app.use("/campus", campusRoute);
// app.use("/freeze", keyCloakValidationMiddleware, freezeRoute);

// Create Error Handling MiddleWare here
app.use(errorHandler);

// Connect to Server
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
