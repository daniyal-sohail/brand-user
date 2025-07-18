"use client";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "../service/api";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [apiAuthLoading, setApiAuthLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [FAQ, setFAQ] = useState([]);
  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole("");
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        setIsLoggedIn(false);
        setUser(null);
        setRole("");
        setAuthChecked(true);
        return;
      }
      setApiAuthLoading(true);
      try {
        const response = await axiosInstance.get("/auth/me");
        if (response?.data?.status === 200 && response?.data?.data) {
          setUser(response.data.data);
          setRole(response.data.data.role);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setRole("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        setRole("");
      } finally {
        setApiAuthLoading(false);
        setAuthChecked(true);
      }
    };
    fetchProfile();
  }, []);

  const postAuthData = useCallback(async (endpoint, payload) => {
    setApiAuthLoading(true);
    try {
      const response = await axiosInstance.post(endpoint, payload);
      return response?.data;
    } catch (error) {
      if (error) {
        return error?.response?.data || error?.message;
      }
      return "An unknown error occurred";
    } finally {
      setApiAuthLoading(false);
    }
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        apiAuthLoading,
        user,
        isLoggedIn,
        setIsLoggedIn,
        setRole,
        setUser,
        logOut,
        role,
        postAuthData,
        authChecked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
