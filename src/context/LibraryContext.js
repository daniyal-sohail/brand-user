"use client";
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../service/api";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");

  const libraryFetchData = useCallback(async (url) => {
    setLibraryLoading(true);
    setLibraryError("");
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      setLibraryError(err?.response?.data?.message || "Failed to fetch data.");
      return null;
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  const libraryPostData = useCallback(async (url, data) => {
    setLibraryLoading(true);
    setLibraryError("");
    try {
      const res = await axiosInstance.post(url, data);
      return res.data;
    } catch (err) {
      setLibraryError(err?.response?.data?.message || "Failed to post data.");
      return null;
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  const libraryPutData = useCallback(async (url, data) => {
    setLibraryLoading(true);
    setLibraryError("");
    try {
      const res = await axiosInstance.put(url, data);
      return res.data;
    } catch (err) {
      setLibraryError(err?.response?.data?.message || "Failed to update data.");
      return null;
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  const libraryDeleteData = useCallback(async (url) => {
    setLibraryLoading(true);
    setLibraryError("");
    try {
      const res = await axiosInstance.delete(url);
      return res.data;
    } catch (err) {
      setLibraryError(err?.response?.data?.message || "Failed to delete data.");
      return null;
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        libraryLoading,
        libraryError,
        libraryFetchData,
        libraryPostData,
        libraryPutData,
        libraryDeleteData,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
