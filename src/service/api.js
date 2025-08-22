import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Change as needed
  withCredentials: false, // Send cookies with requests if needed
});

// Request interceptor: Attach token if present
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Use console.log for expected errors (400, 404, 500) and console.error for unexpected errors
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 404 || error.response.status === 500)
    ) {
      console.log(
        "API Error (expected):",
        error.config?.url,
        error.response?.status,
        error.response?.data
      );
    } else if (
      error.response &&
      error.response.status === 401 &&
      (error.config?.url?.includes("/canva/") ||
        error.config?.url?.includes("/user/canva/"))
    ) {
      console.log(
        "API Error (expected):",
        error.config?.url,
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error(
        "API Error (unexpected):",
        error.config?.url,
        error.response?.status,
        error.response?.data
      );
    }

    // Only remove token for authentication-related endpoints on 401/403
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      (error.config?.url?.includes("/auth/") ||
        error.config?.url?.includes("/user/me"))
    ) {
      localStorage.removeItem("token");
      // Don't redirect here, let the AuthContext handle it
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
