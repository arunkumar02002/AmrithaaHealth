// src/APICall/UserProfileApi.jsraja
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api';  // Define it here

export const UserProfileAPI = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/profile`,  // Direct use of BASE_URL
      {
        headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',  
        },
      }
    );
     
    return response.data;
  } catch (error) {
    console.log('User Profile API ERROR:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
