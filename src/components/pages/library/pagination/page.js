import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const LibraryPagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pages}
        forcePage={page - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={(selected) => onPageChange(selected.selected + 1)}
        containerClassName={"pagination flex space-x-2"}
        pageClassName={""}
        pageLinkClassName={"px-4 py-2 rounded-md font-poppins border border-brand-beige bg-brand-cream text-brand-charcoal hover:bg-brand-light-beige"}
        previousClassName={""}
        previousLinkClassName={"px-3 py-2 rounded-md font-poppins border border-brand-beige bg-brand-cream text-brand-charcoal hover:bg-brand-light-beige"}
        nextClassName={""}
        nextLinkClassName={"px-3 py-2 rounded-md font-poppins border border-brand-beige bg-brand-cream text-brand-charcoal hover:bg-brand-light-beige"}
        breakClassName={""}
        breakLinkClassName={"px-3 py-2 rounded-md font-poppins border border-brand-beige bg-brand-cream text-brand-charcoal"}
        activeLinkClassName={"bg-brand-warm-brown text-brand-cream"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default LibraryPagination; 