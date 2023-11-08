// src/modules/e-sign/zoho-sign-auth.ts

import axios from 'axios';

const getAccessToken = async () => {
  const requestBody = {
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    redirect_uri: 'https%3A%2F%2Fsign.zoho.com',
    grant_type: 'refresh_token',
  };

  try {
    const response = await axios.post(
      'https://accounts.zoho.in/oauth/v2/token',
      requestBody,
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error obtaining access token:', error.message);
    throw error;
  }
};

export { getAccessToken };
