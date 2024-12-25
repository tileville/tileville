export const SnowFlakes = () => {
  return (
    <div className="snowflakes" aria-hidden="true">
      {new Array(12).fill(0).map((item, key) => {
        return (
          <div className="snowflake" key={`snowFlake ${key}`}>
            <div className="inner">❅</div>
          </div>
        );
      })}
    </div>
  );
};
