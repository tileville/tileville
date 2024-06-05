export default function RightSideBar({
  children,
  handleToggle,
  rightSlider,
}: {
  children: React.ReactNode;
  handleToggle: React.MouseEventHandler<HTMLButtonElement>;
  rightSlider: boolean;
}) {
  return (
    <>
      <div
        className={
          rightSlider ? "sideBarProfile sideBarProfileOpen" : "sideBarProfile"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <>{children} </>
      </div>

      {rightSlider && (
        <div
          className="overlay"
          onClick={(e) => {
            handleToggle(e as any);
          }}
        ></div>
      )}
    </>
  );
}
