require('dotenv').config();
const axios = require('axios');

const User = require('../model/User');

const authenticateUserController = async (req, res, next) => {
  let user = await User.findOne({ userId: 1 });
  let code = req.query.code || '';

  if (!code) {
    res.status(401).json({
      message: 'We did not receive a code from 42 Intra Authentication'
    });
  }
  // storing requested code in logged user
  user.code = code;
  await user.save();

  const payload = {
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_UID_42,
    client_secret: process.env.CLIENT_SECRET_KEY_42,
    code,
    redirect_uri: 'http://localhost:3000/authenticate'
  };
  // requesting token
  const response = await axios.post(process.env.API_AUTH_URL_TOKEN, payload);
  const token = response.data.access_token;

  user.token = token;
  await user.save();

  if (token === '') {
    return res.status(401).json({
      message: 'We did not receive a code from 42 Intra Authentication'
    });
  }

  // Saving the changes to the user with id:1

  req.user = user;
  next();
};

module.exports = {
  authenticateUserController
};
