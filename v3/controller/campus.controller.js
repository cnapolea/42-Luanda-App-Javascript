require('dotenv').config();
const { default: axios } = require('axios');

const getCampusConfigurationList = async (req, res) => {
  const token = req.user.token;

  const response = await axios.get(
    `${process.env.API_FREEZE_BASE_URL}/campus`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  res.json(response.data);
};

module.exports = { getCampusConfigurationList };
