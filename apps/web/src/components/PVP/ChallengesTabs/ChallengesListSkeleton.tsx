import { Skeleton } from "@radix-ui/themes";

interface SkeletonColumnConfig {
  span: number;
  text: string;
  align?: "left" | "center";
}

const SKELETON_ITEMS_COUNT = 10;

// Configuration for skeleton columns
const SKELETON_COLUMNS: SkeletonColumnConfig[] = [
  { span: 1, text: "Hello" },
  { span: 3, text: "HelloHelloHello" },
  { span: 3, text: "Hello", align: "center" },
  { span: 2, text: "Hello", align: "center" },
  { span: 3, text: "HelloHello", align: "center" },
];

const SkeletonColumn = ({
  span,
  text,
  align = "left",
}: SkeletonColumnConfig) => (
  <div
    className={`col-span-${span} ${align === "center" ? "text-center" : ""}`}
  >
    <Skeleton>{text}</Skeleton>
  </div>
);

const SkeletonRow = ({ columns }: { columns: SkeletonColumnConfig[] }) => (
  <div className="grid w-full cursor-pointer grid-cols-12 gap-4 rounded-[10px] border border-[#76993E] p-4">
    {columns.map((column, index) => (
      <SkeletonColumn key={`column-${index}`} {...column} />
    ))}
  </div>
);

export const ChallengesListSkeleton = () => {
  return (
    <>
      {Array(SKELETON_ITEMS_COUNT)
        .fill(null)
        .map((_, index) => (
          <SkeletonRow
            key={`skeleton-row-${index}`}
            columns={SKELETON_COLUMNS}
          />
        ))}
    </>
  );
};
