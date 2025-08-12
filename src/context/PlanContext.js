"use client";
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../service/api";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState("");

  const planFetchData = useCallback(async (url) => {
    setPlanLoading(true);
    setPlanError("");
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      console.error("Plan API error:", err);
      
      // Provide more specific error messages based on status code
      if (err?.response?.status === 400) {
        setPlanError("Invalid plan ID or request format.");
      } else if (err?.response?.status === 404) {
        setPlanError("Plan not found.");
      } else if (err?.response?.status === 401) {
        setPlanError("Authentication required.");
      } else if (err?.response?.status === 403) {
        setPlanError("Access denied.");
      } else {
        setPlanError(err?.response?.data?.message || "Failed to fetch plan data.");
      }
      
      return null;
    } finally {
      setPlanLoading(false);
    }
  }, []);

  const planPostData = useCallback(async (url, data) => {
    setPlanLoading(true);
    setPlanError("");
    try {
     
      const res = await axiosInstance.post(url, data);
     
      return res.data;
    } catch (err) {
      console.error("Plan creation API error:", err);
      setPlanError(err?.response?.data?.message || "Failed to create plan.");
      return null;
    } finally {
      setPlanLoading(false);
    }
  }, []);

  const planPutData = useCallback(async (url, data) => {
    setPlanLoading(true);
    setPlanError("");
    try {
     
      const res = await axiosInstance.put(url, data);
     
      return res.data;
    } catch (err) {
      console.error("Plan update API error:", err);
      setPlanError(err?.response?.data?.message || "Failed to update plan.");
      return null;
    } finally {
      setPlanLoading(false);
    }
  }, []);

  const planDeleteData = useCallback(async (url) => {
    setPlanLoading(true);
    setPlanError("");
    try {
     
      const res = await axiosInstance.delete(url);
     
      return res.data;
    } catch (err) {
      console.error("Plan deletion API error:", err);
      setPlanError(err?.response?.data?.message || "Failed to delete plan.");
      return null;
    } finally {
      setPlanLoading(false);
    }
  }, []);

  return (
    <PlanContext.Provider
      value={{
        planLoading,
        planError,
        planFetchData,
        planPostData,
        planPutData,
        planDeleteData,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
