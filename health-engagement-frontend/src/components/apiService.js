import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // Define the base URL

//  API call function
export const apiCall = async (endpoint, options) => {
  const url = `${BASE_URL}${endpoint}`; // Construct the full URL
  console.log('Making API call to:', url); // Log the full URL for debugging

  try {
    const response = await axios(url, options);
    console.log('API call successful:', response.data); // Log successful response
    return response.data;
  } catch (error) {
    console.error('API call error:', error); // Log the full error for debugging
    if (error.response) {
      console.error('Response data:', error.response.data); // Log response data
      console.error('Response status:', error.response.status); // Log response status
    }

    // Handle token expiration
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResponse = await axios.post(`${BASE_URL}/api/refresh-token`, { token: refreshToken });
        const newToken = refreshResponse.data.token;
        localStorage.setItem('authToken', newToken);
        
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Retry the request
      } catch (err) {
        console.error('Re-authentication failed:', err);
        window.location.href = '/login'; // Redirect to login on failure
      }
    }

    throw error; // Re-throw the error if it's not handled
  }
};

// Fetch user profile
export const fetchProfile = async () => {
  const token = localStorage.getItem('authToken');
  const response = await apiCall('/profile', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

// Update user profile
export const updateProfile = async (data) => {
  const token = localStorage.getItem('authToken');
  const response = await apiCall('/profile', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    data,
  });
  return response;
};

// Register user
export const registerUser = async (userData) => {
  const response = await apiCall('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: userData,
  });
  return response;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await apiCall('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: credentials,
  });
  return response;
};
