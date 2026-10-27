import apiReq from "./api.js";

export const login = (credentials) =>
  apiReq("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const register = (credentials) =>
  apiReq("/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const logout = () =>
  apiReq("/logout", {
    method: "POST",
  });

export const checkAuth = async () => {
  const data = await apiReq("/profile");
  return data.authenticated;
};