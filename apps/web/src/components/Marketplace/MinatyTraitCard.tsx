// src/components/Marketplace/MinatyTraitCard.tsx

import { IconProps } from "@radix-ui/react-icons/dist/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

type MinatyTraitCardProps = {
  traitKey: string;
  traitValue: string | number;
  description: string;
  value: string;
  traitIcon: React.ComponentType<IconProps>;
};

export const MinatyTraitCard = ({
  traitKey,
  traitValue,
  description,
  value,
  traitIcon: Icon,
}: MinatyTraitCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative flex flex-col rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 backdrop-blur-sm"
    >
      {/* Icon and Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-primary/20 p-2 transition-colors group-hover:bg-primary/30">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-sm font-medium text-[#445137]">{traitKey}</h3>
      </div>

      {/* Trait Value */}
      <div className="mb-4">
        <div className="text-xl font-bold text-primary">{traitValue}</div>
      </div>

      {/* Tooltip */}
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="mt-auto flex items-center gap-2 text-xs text-primary/60 transition-colors hover:text-primary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
              View Details
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="max-w-[350px] rounded-xl border border-primary/20 bg-white p-4 shadow-lg"
              sideOffset={5}
            >
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#445137]">
                  {description}
                </p>
                <div className="h-px w-full bg-primary/10"></div>
                <p className="text-sm text-black/80">{value}</p>
              </div>
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </motion.div>
  );
};