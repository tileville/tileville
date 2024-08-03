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

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div
      className={clsx(
        "fixed bottom-[54px] left-0 z-10 mt-4 flex w-full items-center justify-center md:justify-end",
        containerClassName
      )}
    >
      <ul
        className={clsx(
          "text-2xs back mx-auto flex w-full items-center justify-end gap-x-1 px-4 py-2 leading-4",
          className
        )}
      >
        <li
          onClick={onPrevious}
          className={`flex h-7 w-7 items-center justify-center ${
            currentPage === 1 ? "pointer-events-none" : ""
          }`}
        >
          <ChevronLeft
            as={ChevronLeft}
            className={`${
              currentPage !== 1
                ? "cursor-pointer fill-primary"
                : "cursor-not-allowed fill-primary/50"
            }   `}
          />
        </li>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className="flex h-7 w-7 items-end justify-center text-primary"
                key={idx}
              >
                &#8230;
              </li>
            );
          }
          return (
            <li
              key={idx}
              className={`flex h-7 w-7 items-center justify-center text-primary transition-colors ${
                pageNumber === currentPage
                  ? "bg-primary-50 border-primary-200 rounded-[4px] border font-medium text-primary shadow-md"
                  : "cursor-pointer hover:text-primary/60"
              }`}
              onClick={() => {
                onPageChange(pageNumber as number);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          onClick={onNext}
          className={clsx("flex h-7 w-7 items-center justify-center", {
            "pointer-events-none": currentPage === lastPage,
          })}
        >
          <ChevronRight
            className={`${
              currentPage !== lastPage
                ? "cursor-pointer fill-primary"
                : "cursor-not-allowed fill-primary/50"
            }  `}
          />
        </li>
      </ul>
    </div>
  );
};
