import { FEEDBACK_FORM_URL } from "@/constants";

export const Footer = () => {
  return (
    <footer className="fixed bottom-2 right-2">
      <a href={FEEDBACK_FORM_URL} target="_blank" className="underline text-xs">
        Share Feedback
      </a>
    </footer>
  );
};
