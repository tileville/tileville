import { ChevronLeft, ChevronRight } from "@/assets";
import clsx from "clsx";
import { DOTS, usePagination } from "@/hooks/usePagination";
import { PAGINATION_PAGE_SIZE, PAGINATION_SIBLING_COUNT } from "@/constants";

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
    pageSize: PAGINATION_PAGE_SIZE,
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
        "absolute bottom-0 z-20 flex w-full justify-center border-t border-t-neutral-200 bg-neutral-50 p-4 md:justify-end",
        containerClassName
      )}
    >
      <ul
        className={clsx(
          "text-2xs flex items-center gap-x-1 leading-4 text-neutral-400",
          className
        )}
      >
        <li
          onClick={onPrevious}
          className={clsx("flex h-7 w-7 items-center justify-center", {
            "pointer-events-none fill-current": currentPage === 1,
          })}
        >
          <ChevronLeft
            as={ChevronLeft}
            className={clsx(
              "!text-lg text-neutral-400 transition-all  duration-200",
              {
                "cursor-pointer text-neutral-700 hover:text-primary":
                  currentPage !== 1,
              }
            )}
          />
        </li>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className="flex h-7 w-7 items-end justify-center text-neutral-400"
                key={idx}
              >
                &#8230;
              </li>
            );
          }
          return (
            <li
              key={idx}
              className={clsx(
                "flex h-7 w-7 items-center justify-center text-neutral-400",
                {
                  "bg-primary-50 border-primary-200 rounded-[4px] border font-medium text-primary shadow-md":
                    pageNumber === currentPage,
                  "cursor-pointer hover:text-primary":
                    pageNumber !== currentPage,
                }
              )}
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
            className={clsx(
              "!text-lg text-neutral-400 transition-all  duration-200",
              {
                "cursor-pointer text-neutral-700 hover:text-primary":
                  currentPage !== lastPage,
              }
            )}
          />
        </li>
      </ul>
    </div>
  );
};
