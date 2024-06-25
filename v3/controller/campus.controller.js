require('dotenv').config();
const { default: axios } = require('axios');

const getCampusConfigurationList = async (req, res) => {
  const response = await axios.get(`${process.env.API_BASE_URL}/campus`);
  res.json(response.data);
};

module.exports = { getCampusConfigurationList };
