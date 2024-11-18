export const Spinner = ({ className }: { className?: string }) => {
  return <span className={`${className} loader`}></span>;
};

export const Spinner2 = () => {
  return (
    <div className="relative h-8 w-8">
      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full border-4 border-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};
