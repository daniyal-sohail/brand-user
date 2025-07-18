"use client";
import React, { useState, useEffect } from "react";
import LibraryPagination from "./pagination/page";
import LibraryTable from "./table/page";
import { useLibrary } from "@/context/LibraryContext";

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
    <div className="container-width section-padding">
      <h1 className="heading-primary mb-8">Library</h1>
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
          {/* ContentById removed: detail view now handled by dynamic route */}
        </>
      )}
    </div>
  );
};

export default LibraryPage; 