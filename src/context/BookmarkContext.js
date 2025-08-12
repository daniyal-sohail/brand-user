"use client";
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../service/api";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarkError, setBookmarkError] = useState("");

  const bookmarkFetchData = useCallback(async (url) => {
    setBookmarkLoading(true);
    setBookmarkError("");
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      console.error("Bookmark API error:", err); // Added for debugging
      setBookmarkError(err?.response?.data?.message || "Failed to fetch bookmark data.");
      return null;
    } finally {
      setBookmarkLoading(false);
    }
  }, []);

  const bookmarkPostData = useCallback(async (url, data) => {
    setBookmarkLoading(true);
    setBookmarkError("");
    try {
      const res = await axiosInstance.post(url, data);
      return res.data;
    } catch (err) {
      setBookmarkError(err?.response?.data?.message || "Failed to bookmark template.");
      return null;
    } finally {
      setBookmarkLoading(false);
    }
  }, []);

  const bookmarkDeleteData = useCallback(async (url) => {
    setBookmarkLoading(true);
    setBookmarkError("");
    try {
      const res = await axiosInstance.delete(url);
      return res.data;
    } catch (err) {
      setBookmarkError(err?.response?.data?.message || "Failed to unbookmark template.");
      return null;
    } finally {
      setBookmarkLoading(false);
    }
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkLoading,
        bookmarkError,
        bookmarkFetchData,
        bookmarkPostData,
        bookmarkDeleteData,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext); 