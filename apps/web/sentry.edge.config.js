import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://dfddeabb57674af7e8b0094f3d8295ee@o104833.ingest.us.sentry.io/4507492578033664",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 0,
});
