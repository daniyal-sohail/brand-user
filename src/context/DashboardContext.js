"use client";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "../service/api";
const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [FAQ, setFAQ] = useState([]);
  const getFAQ = useCallback(async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response; 
    } catch (error) {
      console.error("Failed to fetch FAQ:", error);
      return null;
    }
  }, []);
  return (
    <DashboardContext.Provider value={{ FAQ, getFAQ }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
