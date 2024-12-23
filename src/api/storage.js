import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const setToken = async (token) => {
  return await setItemAsync("token", token);
};

const getToken = async () => {
  return await getItemAsync("token");
};

const removeToken = async () => {
  return await deleteItemAsync("token");
};

const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        await removeToken();
        return false;
      }
      return true;
    }
    return false;
  };


export { setToken, getToken, removeToken, checkToken };

