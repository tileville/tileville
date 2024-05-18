import { ReactNode } from "react";
import { ToasterStore, useToasterStore } from "@/lib/stores/toasterStore";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

enum ToastTypes {
  Success,
  Error,
  Warning,
  Info,
}

export interface IToast {
  id: number;
  type: ToastTypes;
  content: ReactNode;
}

export const ToastContainer = () => {
  const toasterStore = useToasterStore();
  return (
    <div
      className={
        "fixed bottom-5 right-10 z-40 flex h-full flex-col-reverse gap-4"
      }
    >
      <AnimatePresence initial={true} mode={"popLayout"}>
        {toasterStore.toasts.map((item) => item.content)}
      </AnimatePresence>
    </div>
  );
};

const ToastWrap = ({
  key,
  children,
  isClearable,
}: {
  key: number;
  children: ReactNode;
  isClearable?: boolean;
}) => {
  return (
    <motion.div
      key={key}
      className={clsx(
        "flex flex-row items-center justify-center gap-4 rounded-[5px] border border-foreground bg-[#464646] py-4",
        {
          "px-6": !isClearable,
          "px-2": isClearable,
        }
      )}
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export const toast = (
  toasterStore: ToasterStore,
  content: ReactNode,
  isClearable?: boolean
) => {
  const toastId = toasterStore.toasts.length + 1;
  toasterStore.addToast({
    id: toastId,
    type: ToastTypes.Info,
    content: (
      <ToastWrap key={toastId} isClearable={isClearable}>
        {content}
        {isClearable && (
          <div
            className={
              "flex cursor-pointer items-center justify-center opacity-60 transition-opacity ease-in-out hover:opacity-100"
            }
            onClick={() => toasterStore.removeToast(toastId)}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
        )}
      </ToastWrap>
    ),
  });
  setTimeout(() => toasterStore.removeToast(toastId), 12000);
};

toast.success = (
  toasterStore: ToasterStore,
  text: string,
  isClearable?: boolean
) => {
  const toastId = toasterStore.toasts.length + 1;
  toasterStore.addToast({
    id: toastId,
    type: ToastTypes.Success,
    content: (
      <ToastWrap key={toastId} isClearable={isClearable}>
        <AnimatePresence initial={true}>
          <motion.svg
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 17 18"
            className={"h-[24px] w-[24px]"}
          >
            <motion.polyline
              fill="none"
              points="1 9 7 14 15 4"
              stroke="#D2FF00"
              strokeDasharray="22"
              strokeDashoffset="44"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ delay: 0.3 }}
            />
          </motion.svg>
        </AnimatePresence>
        <div className={"w-full pt-1 text-[14px]/[14px]"}>{text}</div>
        {isClearable && (
          <div
            className={
              "flex cursor-pointer items-center justify-center opacity-60 transition-opacity ease-in-out hover:opacity-100"
            }
            onClick={() => toasterStore.removeToast(toastId)}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
        )}
      </ToastWrap>
    ),
  });
  setTimeout(() => toasterStore.removeToast(toastId), 12000);
};

toast.error = (
  toasterStore: ToasterStore,
  text: string,
  isClearable?: boolean
) => {
  const toastId = toasterStore.toasts.length + 1;
  toasterStore.addToast({
    id: toastId,
    type: ToastTypes.Error,
    content: (
      <ToastWrap key={toastId} isClearable={isClearable}>
        <AnimatePresence initial={true}>
          <motion.svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"h-[24px] w-[24px]"}
          >
            <motion.path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.096 8.55999L16.9999 1.656L15.4665 0.122559L8.56251 7.02655L1.65869 0.122722L0.125244 1.65616L7.02907 8.55999L0.132077 15.457L1.66552 16.9904L8.56251 10.0934L15.4597 16.9906L16.9931 15.4571L10.096 8.55999Z"
              fill="#FF0000"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ delay: 0.3 }}
            />
          </motion.svg>
        </AnimatePresence>
        <div className={"w-full pt-1 text-[14px]/[14px]"}>{text}</div>
        {isClearable && (
          <div
            className={
              "flex cursor-pointer items-center justify-center opacity-60 transition-opacity ease-in-out hover:opacity-100"
            }
            onClick={() => toasterStore.removeToast(toastId)}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
        )}
      </ToastWrap>
    ),
  });
  setTimeout(() => toasterStore.removeToast(toastId), 12000);
};
