// src/APICall/UserProfileApi.js raja
import axios from 'axios';

const BASE_URL = 'https://www.myhealth.amrithaa.net/backend/api'; 

export const EmergencyAPI = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/get_emergency_contact`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,  
          'Content-Type': 'application/json',  
        },
       
      }
    );
    return response.data;
  } catch (error) {
    console.log('Get Emergency Contact API ERROR:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;  
  }
};
