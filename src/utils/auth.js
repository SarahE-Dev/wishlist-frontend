import { jwtDecode } from "jwt-decode";

export const isValidToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getUserFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
  
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        username: decoded.username,
      };
    } catch {
      return null;
    }
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  