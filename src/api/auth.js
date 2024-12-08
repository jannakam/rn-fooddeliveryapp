import instance from "./index";

async function login(username, password) {
    const response = await instance.post("/auth/login", { username, password });
    return response.data;
  }

async function register(username, password, image) {
    const response = await instance.post("/auth/register", { username, password, image });
    return response.data;
  }

async function logout() {
    const response = await instance.post("/auth/logout");
    return response.data;
  }

async function getProfile() {
    const response = await instance.get("/auth/profile");
    return response.data;
  }

export { login, register, logout, getProfile };