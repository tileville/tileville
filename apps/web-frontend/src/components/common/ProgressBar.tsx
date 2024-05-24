import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { animate, useMotionTemplate, useTransform } from "framer-motion";

const clamp = (number: number, min: number, max: number) => {
  return Math.max(min, Math.min(number, max));
};

export const ProgressBar = ({
  title,
  min,
  max,
  handleSize = 30,
  minValue,
  maxValue,
  setMaxValue,
  setMinValue,
}: {
  title: string;
  min: number;
  max: number;
  handleSize?: number;
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
}) => {
  const [dragging, setDragging] = useState<boolean>(false);
  // let percent = value / (max - min);

  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const background = useMotionTemplate`linear-gradient(90deg, #F9F8F4 5%, #D2FF00 ${progress}px)`;

  const handleDrag = () => {
    // @ts-ignore
    const handleBounds = handleRef.current.getBoundingClientRect();
    const middleOfHandle = handleBounds.x + handleBounds.width / 2;
    const progressBarBounds = progressBarRef.current?.getBoundingClientRect();
    // @ts-ignore
    const newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

    setMaxValue(newProgress * (max - min));
  };

  useEffect(() => {
    const newProgress = maxValue / (max - min);
    // @ts-ignore
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();

    handleX.set(newProgress * progressBarBounds.width);
  }, [handleX, max, min, maxValue]);

  return (
    <div className="w-full pb-2">
      <div className={"text-filter py-2"}>{title}</div>

      <div className="relative flex flex-col justify-center">
        <motion.div
          className="absolute h-3 w-full rounded-full"
          style={{ background }}
        />

        <div
          ref={progressBarRef}
          className="absolute h-2"
          style={{
            left: handleSize / 2,
            right: handleSize / 2,
          }}
        />

        <div ref={constraintsRef}>
          <motion.div
            ref={handleRef}
            className="border-bg-dark bg-left-accent relative z-10 rounded-full border shadow"
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            animate={{
              scale: dragging ? 1.3 : 1,
            }}
            style={{
              width: handleSize,
              height: handleSize,
              x: handleX,
            }}
          />
        </div>

        <div
          className="absolute h-4 w-full"
          onPointerDown={(event) => {
            // @ts-ignore
            const { left, width } =
              progressBarRef.current.getBoundingClientRect();
            const position = event.pageX - left;
            const newProgress = clamp(position / width, 0, 1);
            const newValue = newProgress * (max - min);
            setMaxValue(newValue);
            animate(handleX, newProgress * width);
          }}
        />
      </div>

      <div className={"mt-4 flex flex-row justify-between"}>
        <motion.input
          type="text"
          placeholder={"from"}
          className={
            "bg-bg-dark placeholder:font-plexsans placeholder:text-main hover:placeholder:text-left-accent/80 max-w-[100px] rounded-[5px] border p-1 focus:outline-none"
          }
          value={minValue}
          // animate={{ y: dragging && percent < 0.4 ? 20 : 0 }}
          onChange={(event) => {
            if (
              Number(event.target.value) <= max &&
              Number(event.target.value) >= min &&
              Number(event.target.value) <= maxValue
            )
              setMinValue(Number(event.target.value));
          }}
        />
        <motion.input
          type="text"
          placeholder={"to"}
          value={Math.round(Math.floor(maxValue * 100) / 100)}
          max={max}
          min={min}
          className={
            "bg-bg-dark placeholder:font-plexsans placeholder:text-main hover:placeholder:text-left-accent/80 max-w-[100px] rounded-[5px] border p-1 focus:outline-none"
          }
          // animate={{ y: dragging && percent > 0.6 ? 20 : 0 }}
          onChange={(event) => {
            if (
              Number(event.target.value) <= max &&
              Number(event.target.value) >= min &&
              Number(event.target.value) >= minValue
            )
              setMaxValue(Number(event.target.value));
          }}
        />
      </div>
    </div>
  );
};
