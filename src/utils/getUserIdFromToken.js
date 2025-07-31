import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded._id?.toString?.() || decoded.id?.toString?.() || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export default getUserIdFromToken;
