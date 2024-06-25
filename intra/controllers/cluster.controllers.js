require('dotenv').config();

const axios = require('axios');

const getClusterController = async (req, res) => {
  try {
    let token = req.user.token;

    const response = await axios.get(`${process.env.API_BASE_URL}/clusters`, {
      headers: {
        Authorization: `Bearer ${
          typeof token === 'object' ? token.token : token
        }`
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getClusterController
};
