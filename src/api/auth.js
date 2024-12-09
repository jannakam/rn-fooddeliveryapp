import axios from "axios";

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const response = await axios.post("/auth/register", formData);
  setToken(response.data.token);
  return response.data;
};

const login = async (userInfo) => {
  const response = await axios.post("/auth/login", userInfo);
  setToken(response.data.token);
  return response.data;
};


export { login, register };