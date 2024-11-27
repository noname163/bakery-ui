// src/api/loginApi.js
import { postData } from './api' // Import the postApi method from api.js
import { useRouter } from 'vue-router' // To redirect using Vue Router

// Function to call the login API and handle the response
export const loginUser = async (username, password) => {
  try {
    const payload = {
      email: username,
      password: password,
    }
    const response = await postData('/api/authentication/login', payload, false)

    if (response.accessToken && response.refreshToken) {
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)

      // const router = useRouter()
      // router.push('/home')

      return response
    } else {
      throw new Error('Invalid response: no tokens')
    }
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
