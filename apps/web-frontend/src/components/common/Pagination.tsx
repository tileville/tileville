export const Pagination = ({
  pagesAmount,
  currentPage,
  setCurrentPage,
}: {
  pagesAmount: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}) => {
  return (
    <div className={"flex flex-row items-center justify-center gap-2"}>
      <span
        className={"cursor-pointer"}
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.51116 15L1 8L8.51116 1"
            stroke="#D2FF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        className={"flex flex-row items-center justify-center gap-2 pt-0.5"}
      >
        {[...Array(pagesAmount).keys()].map((value) => (
          <span
            key={value + 1}
            className={`text-left-accent cursor-pointer hover:underline ${
              value + 1 === currentPage ? "opacity-100" : "opacity-40"
            }`}
            onClick={() => setCurrentPage(value + 1)}
          >
            {value + 1}
          </span>
        ))}
      </span>

      <span
        className={"cursor-pointer"}
        onClick={() =>
          setCurrentPage(
            currentPage < pagesAmount ? currentPage + 1 : currentPage
          )
        }
      >
        <svg
          width="11"
          height="16"
          viewBox="0 0 11 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5113 15L9.02246 8L1.5113 1"
            stroke="#D2FF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};
