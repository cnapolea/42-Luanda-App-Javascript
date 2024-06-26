require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const base64 = require('base-64');

const User = require('../model/User');

const { OIDC_RP_CLIENT_ID, OIDC_RP_CLIENT_SECRET, USER, USER_PASSWORD } =
  process.env;

function base64Encode(text) {
  const encodedText = Buffer.from(text).toString('base64');

  return encodedText;
}

const authHeader = `Basic ${base64Encode(
  `${OIDC_RP_CLIENT_ID}:${OIDC_RP_CLIENT_SECRET}`
)}`;

const config = {
  url: 'https://auth.42.fr/auth/realms/staff-42/protocol/openid-connect/token',

  method: 'POST',

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: authHeader
  },

  data: qs.stringify({
    grant_type: 'password',
    username: USER,
    password: USER_PASSWORD
  })
};

const validateKeyCloakUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ userId: 1 });

    if (!user) {
      user = new User();
      await user.save();
    }

    if (!user.token) {
      const response = await axios(config);
      const { access_token: token, refresh_token } = response.data;
      user.token = token;
      user.refreshToken = refresh_token; //implement refreshToken
      user.save();
      req.user = user;
      next();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { validateKeyCloakUser };
