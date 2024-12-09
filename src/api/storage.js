import { setItemAsync, getItemAsync } from "expo-secure-store";
import jwt_decode from "jwt-decode";

const setToken = async (token) => {
  return await setItemAsync("token", token);
};

const getToken = async () => {
  return await getItemAsync("token");
};

const removeToken = async () => {
  return await removeItemAsync("token", token);
};

const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        await deleteToken();
        return false;
      }
      return true;
    }
    return false;
  };


export { setToken, getToken, removeToken, checkToken };

