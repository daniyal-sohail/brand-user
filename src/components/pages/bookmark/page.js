"use client";
import React, { useState, useEffect } from "react";
import { useBookmark } from "@/context/BookmarkContext";
import { Bookmark, Sparkles } from "lucide-react";
import BookmarkTable from "./table/page";
import BookmarkPagination from "./pagination/page";

const BookmarkPage = () => {
  const { bookmarkFetchData, bookmarkLoading, bookmarkError } = useBookmark();
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10); // Fixed limit

  useEffect(() => {
    const fetchBookmarks = async () => {
      const result = await bookmarkFetchData(`/templates/bookmarks/my?page=${page}&limit=${limit}`);
      
      if (result && result.status === 200 && result.data) {
        setBookmarks(result.data.bookmarks || []);
        setTotal(result.data.pagination?.totalItems || 0);
        setPages(result.data.pagination?.totalPages || 1);
      }
    };
    fetchBookmarks();
  }, [page, limit, bookmarkFetchData]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container-width fade-in px-2 sm:px-4 lg:px-0">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="bg-brand-beige p-2 sm:p-3 rounded-xl">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold ml-2 sm:ml-3 heading-primary">My Bookmarks</h1>
      </div>

      {/* Welcome/Intro Card */}
      <div className="bg-brand-beige p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-2 sm:p-3 rounded-xl flex-shrink-0">
          <Sparkles className="text-brand-warm-brown w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold heading-primary mb-1">Your Saved Templates</h2>
          <p className="body-text text-brand-warm-brown text-sm sm:text-base">Access and manage your bookmarked templates for quick reference.</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-brand-soft-beige p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div>
            <h3 className="heading-secondary text-brand-charcoal text-base sm:text-lg">Total Bookmarks: {total}</h3>
            <p className="body-text text-brand-warm-brown text-sm sm:text-base">
              {bookmarks.length > 0 
                ? `Showing ${bookmarks.length} of ${total} bookmarks`
                : "No bookmarks yet"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-brand-beige p-3 sm:p-4 rounded-xl shadow-sm">
        {bookmarkLoading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-4 border-b-4 border-brand-warm-brown"></div>
          </div>
        ) : bookmarkError ? (
          <div className="text-center py-8 sm:py-12 font-poppins text-red-600 text-sm sm:text-base">{bookmarkError}</div>
        ) : (
          <BookmarkTable bookmarks={bookmarks} />
        )}
      </div>

      {/* Pagination - Outside main content container */}
      {!bookmarkLoading && !bookmarkError && pages > 1 && (
        <div className="mt-4 sm:mt-6">
          <BookmarkPagination page={page} pages={pages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default BookmarkPage; 