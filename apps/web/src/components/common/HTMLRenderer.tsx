import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";

export const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
