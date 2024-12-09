import instance from "./index";
import { setToken, removeToken, checkToken } from "./storage";

const defaultProfileImage = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

async function login(username, password) {
  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const response = await instance.post("/auth/login", {
      username,
      password,
    });
    
    // Check if we got a successful response with a token
    if (!response.data || !response.data.token) {
      throw new Error('Invalid credentials');
    }

    // Store the token
    await setToken(response.data.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      
      if (error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else if (error.response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error(error.response.data.message || 'Login failed');
      }
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw error;
    }
  }
}

async function register(username, password, image = defaultProfileImage) {
  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // Basic validation
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const response = await instance.post("/auth/register", {
      username,
      password,
      image,
    });
    
    // Check if we got a successful response with a token
    if (!response.data || !response.data.token) {
      throw new Error('Registration failed');
    }

    // Store the token
    await setToken(response.data.token);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 409) {
        throw new Error('Username already exists');
      } else {
        throw new Error(error.response.data.message || 'Registration failed');
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
}

async function getProfile() {
  try {
    // Check if token is valid before making the request
    const isValid = await checkToken();
    if (!isValid) {
      throw new Error('Token expired or invalid');
    }
    
    const response = await instance.get("/auth/profile");
    if (!response.data) {
      throw new Error('Failed to fetch profile data');
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await removeToken(); // Clear invalid token
      throw new Error('Please login again');
    }
    throw error;
  }
}

async function logout() {
  try {
    await removeToken();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export { login, register, getProfile, logout };