import { ADMIN_API_URL } from "@/constants";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, groupTopicId } = await request.json();

    const response = await fetch(
      `${ADMIN_API_URL}/api/telegram/group-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || "",
        },
        body: JSON.stringify({
          message,
          groupTopicId,
        }),
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
