require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');
const apiRoute = require('./intra/router/cluster.route');
const authRoute = require('./intra/router/auth.router');
const studentRoute = require('./intra/router/student.router');
const campusRoute = require('./v3/router/campus.route');
const freezeRoute = require('./v3/router/freeze.router');

const {
  validateUser: validadeUserMiddleWare
} = require('./intra/middleware/user.authentication');

const {
  validateKeyCloakUser: keyCloakValidationMiddleware
} = require('./v3/middleware/user.authentication');

app.use(validadeUserMiddleWare);
app.use(keyCloakValidationMiddleware);

const PORT = process.env.PORT || 3000;

//Connect Database
connectDB();

app.use(express.json());
app.use('/authenticate', authRoute);
app.use('/api', apiRoute);
app.use('/students', studentRoute);
app.use('/campus', campusRoute);
app.use('/freeze', freezeRoute);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
