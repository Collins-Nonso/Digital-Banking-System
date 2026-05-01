// services/nibssServices.js
const axios = require("axios");

const BASE_URL = "https://nibssbyphoenix.onrender.com/api";

// ✅ EXPORT IT
exports.BASE_URL = BASE_URL;

// Get Token
exports.loginToNibss = async (apiKey, apiSecret) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, {
    apiKey,
    apiSecret
  });

  return res.data.token;
};

// Generate BVN
exports.generateBVN = () => {
  return Math.floor(10000000000 + Math.random() * 90000000000).toString();
};

// Create BVN
exports.createBVN = async (data) => {
  try {
    const bvn = exports.generateBVN();

    await axios.post(`${BASE_URL}/insertBvn`, {
      bvn,
      ...data
    });

    return bvn;
  } catch (err) {
    throw new Error("BVN creation failed");
  }
};

// Create Account
exports.createNibssAccount = async ({ bvn, dob }) => {
  try {
    const token = await exports.loginToNibss(process.env.NIBSS_API_KEY, process.env.NIBSS_API_SECRET);

    const res = await axios.post(
      `${BASE_URL}/account/create`,
      {
        kycType: "BVN",
        kycID: bvn,
        dob
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Account creation failed");
  }
};

exports.nameEnquiry = async (accountNumber) => {
  const token = await exports.loginToNibss(process.env.NIBSS_API_KEY, process.env.NIBSS_API_SECRET);

  const res = await axios.get(
    `${BASE_URL}/account/name-enquiry/${accountNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

// Transfer
exports.transferFunds = async (payload) => {
  const token = await exports.loginToNibss(process.env.NIBSS_API_KEY, process.env.NIBSS_API_SECRET);

  const res = await axios.post(
    `${BASE_URL}/transfer`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};