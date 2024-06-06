import React from "react";
// import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalResults <= resultsPerPage) return null; // Do not show pagination if there are 20 or fewer results

  const createPageItem = (
    page: number | string,
    text: string | number = page
  ) => {
    const isActive = page === currentPage;
    const isEllipsis = page === "...";
    const isDisabled = typeof page === "string" || page === "...";

    return (
      <span
        key={text}
        className={`page-item${isActive ? " active" : ""}${
          isDisabled ? " disabled" : ""
        }`}
        onClick={() =>
          !isDisabled && typeof page === "number" && onPageChange(page)
        }
      >
        {text}
      </span>
    );
  };

  return (
    <div id="pagination" className="flex items-center gap-4">
      <button className="border">
        {createPageItem(currentPage > 1 ? currentPage - 1 : "...", "⟨")}
      </button>
      <button className="border">{createPageItem(1)}</button>

      {currentPage > 3 && createPageItem("...")}
      {currentPage > 2 && createPageItem(currentPage - 1)}
      {createPageItem(currentPage)}
      {currentPage < totalPages - 1 && createPageItem(currentPage + 1)}
      {currentPage < totalPages - 2 && createPageItem("...")}
      {createPageItem(totalPages)}
      {createPageItem(currentPage < totalPages ? currentPage + 1 : "...", "⟩")}
    </div>
  );
};

export default Pagination;
