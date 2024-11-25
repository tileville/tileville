import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

export const Modal = ({
  children,
  trigger,
  isOpen,
  setIsOpen,
  isDismissible = true,
  defaultOpen = false,
  onClose,
}: {
  children: ReactNode;
  trigger: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  isDismissible?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
}) => {
  const [isOpenUncontrolled, setIsOpenUncontrolled] =
    useState<boolean>(defaultOpen);

  return (
    <div className={"relative flex flex-col items-center justify-center"}>
      <div
        onClick={
          setIsOpen ? () => setIsOpen(true) : () => setIsOpenUncontrolled(true)
        }
      >
        {trigger}
      </div>
      <AnimatePresence>
        {(isOpen ? isOpen : isOpenUncontrolled) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className={
              "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center px-6 backdrop-blur-md"
            }
            onClick={
              isDismissible
                ? setIsOpen
                  ? () => {
                      setIsOpen(false);
                      onClose && onClose();
                    }
                  : () => {
                      setIsOpenUncontrolled(false);
                      onClose && onClose();
                    }
                : undefined
            }
          >
            <div
              className={"bg-bg-dark relative flex w-full flex-col"}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
