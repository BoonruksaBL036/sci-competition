import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (data) => {
  const response = api.post(API_URL + "/register", data);
  return response;
};

const login = async (data) => {
  const response = await api.post(API_URL + "/signin", data);
  //saving user data to local storage
  if (!response.data.token) {
    return response;
  }
  TokenService.setUser(response.data);
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
