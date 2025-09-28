import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_BASE_URL+"/auth";

const register = async (data) => {
  const response = api.post(API_URL + "/signup", data);
  return response;
};

const login = async (email, password) => {
  const response = await api.post(API_URL + "/signin", { email, password });
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
