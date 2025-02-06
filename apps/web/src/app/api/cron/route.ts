export function GET() {
  try {
    console.log("Starting demo cron job that should run every minute");
  } catch (err) {
    console.error("error running cron job", err);
  }
}
