require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db.config");

const { errorHandler, logHandler } = require("./middleware/logHandler");

const apiRoute = require("./intra/router/cluster.route");
const authRoute = require("./intra/router/auth.router");
const studentRoute = require("./intra/router/student.router");
const campusRoute = require("./v3/router/campus.route");
const freezeRoute = require("./v3/router/freeze.router");

const {
  validateUser: validadeUserMiddleWare,
} = require("./intra/middleware/user.authentication");
const {
  validateKeyCloakUser: keyCloakValidationMiddleware,
} = require("./v3/middleware/user.authentication");

const PORT = process.env.PORT || 3000;

//Create handlers for logs
if (process.env.NODE_ENV === "development") {
  app.use(logHandler);
}

//Connect Database
connectDB();

app.use("/authenticate", authRoute);
app.use("/api", apiRoute);
app.use("/students", validadeUserMiddleWare, studentRoute);
app.use("/campus", validadeUserMiddleWare, campusRoute);
app.use("/freeze", keyCloakValidationMiddleware, freezeRoute);

// Create Error Handling MiddleWare here
app.use(errorHandler);

// Connect to Server
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
