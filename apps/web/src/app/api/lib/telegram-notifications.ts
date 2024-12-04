import { ADMIN_API_URL } from "@/constants";

export async function sendPersonalNotification({
  message,
  chatIds,
}: {
  message: string;
  chatIds: string[];
}) {
  try {
    const response = await fetch(
      `${ADMIN_API_URL}/api/telegram/personal-messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.ADMIN_API_TOKEN || "",
        },
        body: JSON.stringify({
          message,
          chatIds,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error sending telegram notification:", error);
    return null;
  }
}
