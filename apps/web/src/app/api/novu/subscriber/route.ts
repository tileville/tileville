import { NOVU_API_KEY } from "@/constants";
import { Novu } from "@novu/node";
import { NextRequest } from "next/server";

const novu = new Novu(NOVU_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, username, email, fullname } = await request.json();

    if (!walletAddress) {
      return Response.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Split fullname into firstName and lastName if provided
    let firstName, lastName;
    if (fullname) {
      const nameParts = fullname.split(" ");
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ") || undefined;
    }

    // Call Novu API
    await novu.subscribers.identify(walletAddress, {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email: email || undefined,
      data: {
        username: username || undefined,
        walletAddress,
      },
    });

    // If we get here, the operation was successful
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Error adding Novu subscriber:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to add subscriber",
      },
      { status: 500 }
    );
  }
}
