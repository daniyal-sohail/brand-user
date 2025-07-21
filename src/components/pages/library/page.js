"use client";
import React, { useState, useEffect } from "react";
import LibraryPagination from "./pagination/page";
import LibraryTable from "./table/page";
import { useLibrary } from "@/context/LibraryContext";
import { BookOpen, Sparkles, RefreshCcw, PlusCircle, Filter } from "lucide-react";

const LibraryPage = () => {
  const { libraryFetchData, libraryLoading, libraryError } = useLibrary();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await libraryFetchData("/content");
      if (result && result.data) {
        setData(result.data || []);
        setTotal(result.total || 0);
        setPages(result.pages || 1);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container-width fade-in">
      {/* Header Section */}
      <div className="flex items-center align-middle mb-4">
        <div className="bg-brand-beige p-3 rounded-xl">
          <BookOpen />
        </div>
        <h1 className="text-3xl font-semibold ml-3 heading-primary">Library</h1>
      </div>

      {/* Welcome/Intro Card */}
      <div className="bg-brand-beige p-6 rounded-xl flex items-center gap-4 mb-6">
        <div className="bg-white p-3 rounded-xl">
          <Sparkles className="text-brand-warm-brown" />
        </div>
        <div>
          <h2 className="text-2xl font-bold heading-primary mb-1">Welcome to Your Content Library</h2>
          <p className="body-text text-brand-warm-brown">Browse, manage, and discover your saved templates and creative assets.</p>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Library Items Card */}
        <div className="w-full bg-brand-beige p-4 rounded-xl shadow-sm">
          {libraryLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-brand-warm-brown"></div>
            </div>
          ) : libraryError ? (
            <div className="text-center py-12 font-poppins text-red-600">{libraryError}</div>
          ) : (
            <>
              <LibraryTable data={data} />
              <LibraryPagination page={page} pages={pages} onPageChange={handlePageChange} />
            </>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="min-w-[280px] max-w-xs bg-brand-beige p-4 rounded-xl shadow-sm flex flex-col gap-4 h-fit">
          <div className="flex items-center mb-2">
            <div className="bg-white p-2 rounded-xl">
              <RefreshCcw className="text-brand-warm-brown" />
            </div>
            <h2 className="text-lg font-semibold ml-3 heading-secondary">Quick Actions</h2>
          </div>
          <button className="w-full flex items-center gap-3 bg-brand-warm-brown text-brand-cream px-4 py-3 rounded-xl hover:opacity-90 transition">
            <PlusCircle />
            <span className="font-semibold">Add New Content</span>
          </button>
          <button className="w-full flex items-center gap-3 bg-brand-soft-beige text-brand-charcoal px-4 py-3 rounded-xl hover:bg-brand-light-beige transition">
            <Filter />
            <span className="font-semibold">Filter Library</span>
          </button>
          <div className="mt-4 text-xs text-brand-warm-brown text-center font-poppins">
            Total Items: <span className="font-bold text-brand-charcoal">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage; 