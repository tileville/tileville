import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";

type HtmlRendererProps = {
  htmlContent?: string;
  className?: string;
  allowedTags?: string[];
};

export const HtmlRenderer = ({
  htmlContent = "",
  className = "",
  allowedTags,
}: HtmlRendererProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !htmlContent) {
    return null;
  }

  // Configure DOMPurify options
  const purifyOptions = allowedTags ? { ALLOWED_TAGS: allowedTags } : {};

  // Sanitize HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, purifyOptions);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
