import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookmarkPagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-4">
      {/* Page Info */}
      <div className="text-sm text-brand-warm-brown mb-4 font-poppins">
        Page {page} of {pages}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            page <= 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-brand-warm-brown text-brand-cream hover:opacity-90 hover:-translate-y-0.5"
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(5, pages) }, (_, i) => {
            let pageNumber;
            if (pages <= 5) {
              pageNumber = i + 1;
            } else if (page <= 3) {
              pageNumber = i + 1;
            } else if (page >= pages - 2) {
              pageNumber = pages - 4 + i;
            } else {
              pageNumber = page - 2 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  page === pageNumber
                    ? "bg-brand-warm-brown text-brand-cream"
                    : "bg-brand-cream text-brand-charcoal border border-brand-beige hover:bg-brand-light-beige hover:-translate-y-0.5"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={page >= pages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            page >= pages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-brand-warm-brown text-brand-cream hover:opacity-90 hover:-translate-y-0.5"
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookmarkPagination; 