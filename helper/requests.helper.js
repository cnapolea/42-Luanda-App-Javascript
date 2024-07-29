const axios = require("axios");

const axiosGetRequest = async (uri, user) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  };
  const response = await axios.get(uri, headers);
  return response;
};

const MultiPageRequest = async (endPoint, user, hasPage) => {
  try {
    if (hasPage) {
      let totalPages = 1;
      let responseData = [];
      let page = 1;
      let perPage = 100;

      while (page <= totalPages) {
        let uri = `${endPoint}&page[number]=${page}&page[size]=${perPage}`;
        const response = await axiosGetRequest(uri, user);

        if (response.data.length <= 0) {
          break;
        }

        responseData = [...responseData, ...response.data];

        totalPages = parseInt(response.headers["x-total"], 10) || 1;

        page++;
      }

      return responseData;
    } else {
      let uri = endPoint;
      const response = await axiosGetRequest(uri, user);
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { axiosGetRequest, MultiPageRequest };
