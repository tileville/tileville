export const Spinner = ({ className }: { className?: string }) => {
  return <span className={`${className} loader`}></span>;
};

type Spinner2Type = {
  size?: number;
};

export const Spinner2 = ({ size = 24 }: Spinner2Type) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full border-2 border-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
    </div>
  );
};

export const SpinnerWhite = ({ size = 24 }: Spinner2Type) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute bottom-0 left-0 right-0 top-0 rounded-full border-2 border-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
    </div>
  );
};
