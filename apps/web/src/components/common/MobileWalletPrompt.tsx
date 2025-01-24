"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

type MobileWalletPromptProps = {
  onOpenAuro: () => void;
  onClose: () => void;
};

export const MobileWalletPrompt = ({
  onOpenAuro,
  onClose,
}: MobileWalletPromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md"
    >
      <div className="p-1 bg-primary/20">
        <div className="flex gap-2 max-w-[300px] mx-auto">
          <button
            onClick={onOpenAuro}
            className="flex-1 rounded-lg bg-primary px-4 text-[10px] font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Open in Auro Browser
          </button>
          <button
            onClick={handleClose}
            className="rounded-lg border border-primary/30 bg-transparent px-4 text-[10px] font-semibold text-primary hover:bg-primary/10"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </motion.div>
  );
};
