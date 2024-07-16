import { motion, MotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export const CustomScrollbar = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue;
}) => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [yPos] = useState(
    useTransform(
      scrollYProgress,
      [0, 1],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [0, scrollbarRef.current?.offsetHeight - handleRef.current?.offsetHeight]
    )
  );

  return (
    <motion.div
      className={"border-left-accent w-4 rounded-[5px] border"}
      ref={scrollbarRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <motion.div
        ref={handleRef}
        className={"bg-left-accent h-[20%] w-4 rounded-[5px]"}
        // drag={'y'}
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={scrollbarRef}
        // whileDrag={{ cursor: 'grabbing' }}
        // whileHover={{ opacity: 0.8 }}
        style={{
          y: yPos,
        }}
      />
    </motion.div>
  );
};
