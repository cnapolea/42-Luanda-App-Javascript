require("dotenv").config();
const axios = require("axios");
const clientOAuth2 = require("client-oauth2");

const User = require("../model/User");
const { createUser, userAndTokenCheck } = require("../../helper/user.helper");

let intraAuth = new clientOAuth2({
  clientId: process.env.CLIENT_UID_42,
  clientSecret: process.env.CLIENT_SECRET_KEY_42,
  authorizationUri: process.env.API_AUTH_URL,
  accessTokenUri: process.env.API_AUTH_URL_TOKEN,
  redirectUri: process.env.REDIRECT_URI_42,
});

const validateUser = async (req, res, next) => {
  const user = await userAndTokenCheck("cnapolea");
  let uri = await intraAuth.code.getUri();
  if (!user) {
    let options = {
      maxAge: 1000 * 60 * 3,
      httpOnly: true,
    };
    res.cookie("originalUrl", req.originalUrl, options);
    res.redirect(uri);
  } else {
    req.user = user;
    next();
  }
};

const authenticateUserController = async (req, res, next) => {
  try {
    let user = await User.findOne({ userName: "cnapolea" });

    const token = await intraAuth.code.getToken(req.originalUrl);

    if (!user) {
      let userPropertiesObj = {
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
        token_expiration_date: token.expires,
      };

      createUser({
        userName: "cnapolea", // PLACEHOLDER TO BE CHANGE
        ...userPropertiesObj,
      });

      req.user = user;
      res.redirect(req.cookies.originalUrl);
    }

    let currentDate = new Date();
    let accessTokenExpirationDate = user.token_expiration_date;

    if (currentDate >= accessTokenExpirationDate) {
      let refreshedToken = await token.refresh();
      let userPropertiesObj = {
        access_token: refreshedToken.accessToken,
        refresh_token: refreshedToken.refreshToken,
        token_expiration_date: refreshedToken.expires,
      };
      Object.assign(user, userPropertiesObj);
      user.save();
      req.user = user;
      res.redirect(req.cookies.originalUrl);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUser,
  authenticateUserController,
};
