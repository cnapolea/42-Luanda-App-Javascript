require('dotenv').config();

const User = require('../model/User');

const validateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ userId: 1 });

    if (!user) {
      user = new User();
      await user.save();
    }

    if (!user.token) {
      const authorizationUrl = process.env.API_AUTH_URL;
      const clientId = process.env.CLIENT_UID_42;
      const redirectUrl = 'http://localhost:3000/authenticate';
      const responseType = 'code';
      const originalUrl = encodeURIComponent(req.originalUrl);
      const auth42Url = `${authorizationUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}&original_url=${originalUrl}`;

      res.redirect(auth42Url);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { validateUser };
