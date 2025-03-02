import { ChevronLeft, ChevronRight } from "@/assets";
import clsx from "clsx";
import { DOTS, usePagination } from "@/hooks/usePagination";
import { NFT_PAGE_SIZE, PAGINATION_SIBLING_COUNT } from "@/constants";

type PaginationProps = {
  totalCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  className?: string;
  containerClassName?: string;
};

export const Pagination = ({
  totalCount,
  onPageChange,
  currentPage,
  className,
  containerClassName,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: PAGINATION_SIBLING_COUNT,
    pageSize: NFT_PAGE_SIZE,
  });

  // Don't render pagination if there's only one page
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 z-10 mt-4 flex w-full items-center justify-center bg-primary-foreground md:bottom-[54px] md:justify-end md:bg-transparent",
        containerClassName
      )}
      aria-label="Pagination"
    >
      <ul
        className={clsx(
          "text-2xs back mx-auto flex w-full items-center justify-end gap-x-1 px-4 py-2 leading-4",
          className
        )}
      >
        {/* Previous Page Button */}
        <li>
          <button
            onClick={handlePrevious}
            className={clsx("flex h-7 w-7 items-center justify-center", {
              "cursor-not-allowed": isFirstPage,
              "cursor-pointer": !isFirstPage,
            })}
            disabled={isFirstPage}
            aria-label="Go to previous page"
          >
            <ChevronLeft
              className={clsx("", {
                "cursor-pointer fill-primary": !isFirstPage,
                "cursor-not-allowed fill-primary/50": isFirstPage,
              })}
            />
          </button>
        </li>

        {/* Page Numbers */}
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className="flex h-7 w-7 items-end justify-center text-primary"
                key={`dots-${idx}`}
                aria-hidden="true"
              >
                &#8230;
              </li>
            );
          }

          const isCurrentPage = pageNumber === currentPage;

          return (
            <li key={`page-${pageNumber}`}>
              <button
                className={clsx(
                  "flex h-7 w-7 items-center justify-center text-primary transition-colors",
                  {
                    "bg-primary-50 border-primary-200 rounded-[4px] border font-medium text-primary shadow-md":
                      isCurrentPage,
                    "cursor-pointer hover:text-primary/60": !isCurrentPage,
                  }
                )}
                onClick={() => onPageChange(pageNumber as number)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next Page Button */}
        <li>
          <button
            onClick={handleNext}
            className={clsx("flex h-7 w-7 items-center justify-center", {
              "pointer-events-none": isLastPage,
              "cursor-pointer": !isLastPage,
            })}
            disabled={isLastPage}
            aria-label="Go to next page"
          >
            <ChevronRight
              className={clsx("", {
                "cursor-pointer fill-primary": !isLastPage,
                "cursor-not-allowed fill-primary/50": isLastPage,
              })}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};
