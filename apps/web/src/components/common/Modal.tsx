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
              "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md"
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
              className={
                "border-left-accent bg-bg-dark relative flex flex-col rounded-[5px] border p-4 bg-white/40 shadow-md"
              }
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              {isDismissible && (
                <div
                  className={
                    "absolute right-4 top-4 z-50 cursor-pointer hover:opacity-80"
                  }
                  onClick={
                    setIsOpen
                      ? () => {
                          setIsOpen(false);
                          onClose && onClose();
                        }
                      : () => {
                          setIsOpenUncontrolled(false);
                          onClose && onClose();
                        }
                  }
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
