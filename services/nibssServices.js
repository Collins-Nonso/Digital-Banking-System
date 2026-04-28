const axios = require("axios");

const BASE_URL = "https://nibssbyphoenix.onrender.com/api";

exports.loginToNibss = async (apiKey, apiSecret) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, {
    apiKey,
    apiSecret
  });
  return res.data.token;
};

exports.createAccount = async (token, payload) => {
  return axios.post(`${BASE_URL}/account/create`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
};