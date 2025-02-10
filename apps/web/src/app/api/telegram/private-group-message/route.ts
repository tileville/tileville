import { ADMIN_API_URL } from "@/constants";
import { NextRequest } from "next/server";

const postHandler = async (request: NextRequest) => {
  try {
    const { message } = await request.json();

    const response = await fetch(
      `${ADMIN_API_URL}/api/telegram/private-group-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || "",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message to admin API");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error: any) {
    console.error("Error in private group message:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to send message",
      },
      { status: 500 }
    );
  }
};

export const POST = postHandler;
