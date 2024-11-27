// src/api.js
import axios from 'axios'

// Create an Axios instance with common configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to set the Bearer token globally
export const setAuthToken = (token) => {
  apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
}

// Function to remove the Bearer token globally (for unauthenticated requests)
export const removeAuthToken = () => {
  delete apiClient.defaults.headers['Authorization']
}

// GET request
export const getData = async (endpoint, params = {}, useAuth = true) => {
  // Conditionally add the token if useAuth is true
  if (useAuth) {
    const token = localStorage.getItem('accessToken')
    console.log('Token ', token)
    if (token) {
      setAuthToken(token) // Add Bearer token if available
    }
  } else {
    removeAuthToken() // Remove token if no authentication required
  }

  // Prepare the config object for axios
  const config = {
    params, // axios will automatically format the query params if provided
  }

  try {
    console.log(`Making GET request to: ${endpoint} with params:`, params)

    const response = await apiClient.get(endpoint, config)
    return response.data // Return the response data directly
  } catch (error) {
    // Handle errors gracefully
    if (error.response) {
      // The server responded with a status other than 2xx
      console.error(
        `Error response from server (Status: ${error.response.status}):`,
        error.response.data,
      )
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request)
    } else {
      // Something else triggered the error
      console.error('Error in setting up the request:', error.message)
    }

    // Rethrow error to be handled by the calling code
    throw error
  }
}

// POST request
export const postData = async (endpoint, data, useAuth = true) => {
  if (useAuth) {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token) // Add Bearer token if available
    }
  } else {
    removeAuthToken() // Remove token if no authentication required
  }

  try {
    const response = await apiClient.post(endpoint, data)
    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

// PUT (or PATCH) request
export const putData = async (endpoint, data, useAuth = true) => {
  if (useAuth) {
    const token = localStorage.getItem('authToken')
    if (token) {
      setAuthToken(token) // Add Bearer token if available
    }
  } else {
    removeAuthToken() // Remove token if no authentication required
  }

  try {
    const response = await apiClient.put(endpoint, data)
    return response.data
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}
