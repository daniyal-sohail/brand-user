"use client";
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../service/api";

const UserTemplateContext = createContext();

export const UserTemplateProvider = ({ children }) => {
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templateError, setTemplateError] = useState("");

  const templateFetchData = useCallback(async (url) => {
    setTemplateLoading(true);
    setTemplateError("");
    try {
    
      const res = await axiosInstance.get(url);
    
      return res.data;
    } catch (err) {
      console.error("Template API error:", err);
      
      // Provide more specific error messages based on status code
      if (err?.response?.status === 400) {
        setTemplateError("Invalid template ID or request format.");
      } else if (err?.response?.status === 404) {
        setTemplateError("Template not found.");
      } else if (err?.response?.status === 401) {
        setTemplateError("Authentication required.");
      } else if (err?.response?.status === 403) {
        setTemplateError("Access denied.");
      } else {
        setTemplateError(err?.response?.data?.message || "Failed to fetch template data.");
      }
      
      return null;
    } finally {
      setTemplateLoading(false);
    }
  }, []);

  const templatePostData = useCallback(async (url, data) => {
    setTemplateLoading(true);
    setTemplateError("");
    try {
      const res = await axiosInstance.post(url, data);
      return res.data;
    } catch (err) {
      setTemplateError(err?.response?.data?.message || "Failed to create template.");
      return null;
    } finally {
      setTemplateLoading(false);
    }
  }, []);

  const templatePutData = useCallback(async (url, data) => {
    setTemplateLoading(true);
    setTemplateError("");
    try {
      const res = await axiosInstance.put(url, data);
      return res.data;
    } catch (err) {
      setTemplateError(err?.response?.data?.message || "Failed to update template.");
      return null;
    } finally {
      setTemplateLoading(false);
    }
  }, []);

  const templateDeleteData = useCallback(async (url) => {
    setTemplateLoading(true);
    setTemplateError("");
    try {
      const res = await axiosInstance.delete(url);
      return res.data;
    } catch (err) {
      setTemplateError(err?.response?.data?.message || "Failed to delete template.");
      return null;
    } finally {
      setTemplateLoading(false);
    }
  }, []);

  return (
    <UserTemplateContext.Provider
      value={{
        templateLoading,
        templateError,
        templateFetchData,
        templatePostData,
        templatePutData,
        templateDeleteData,
      }}
    >
      {children}
    </UserTemplateContext.Provider>
  );
};

export const useUserTemplate = () => useContext(UserTemplateContext); 