import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return;

  try {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decode.exp < currentTime;
  } catch (error) {
    console.log(error);
    return true;
  }
};
