import { NextRequest } from "next/server";
import { isSignatureValid } from "./utils";
import { ACCOUNT_AUTH_MESSAGE } from "@/constants";
import { NextApiResponse } from "next";

type NextApiHandler = (
  req: NextRequest,
  res: NextApiResponse
) => void | Promise<void> | Promise<Response>;

export function withAuth(handler: NextApiHandler) {
  return async (req: NextRequest, res: NextApiResponse) => {
    try {
      const { searchParams } = new URL(req.url);
      const wallet_address = searchParams.get("wallet_address") || "";
      const authSignature = req.headers.get("Auth-Signature");

      console.log("===18", { wallet_address, authSignature });
      if (!authSignature) {
        return res.status(401).json({
          success: false,
          message: "Signature Verification failed. Missing Auth signature.",
        });
      }
      if (!wallet_address) {
        return res.status(401).json({
          success: false,
          message: "Signature Verification failed. Missing Wallet Address.",
        });
      }

      const [publicKey, scalar, field] = authSignature.split(" ");

      if (!publicKey || !scalar || !field) {
        return res.status(401).json({
          success: false,
          message:
            "Signature Verification failed. Missing public key, scalar, or field",
        });
      }

      const verificationResult = await isSignatureValid(
        wallet_address,
        { scalar, field },
        ACCOUNT_AUTH_MESSAGE
      );
      if (!verificationResult) {
        return res.status(401).json({
          success: false,
          message: "Signature Verification failed",
        });
      }
      return handler(req, res);
    } catch (error: any) {
      console.error("Authentication error:", error);
      return res.status(401).json({
        success: false,
        message: "Signature Authenication failed",
      });
    }
  };
}
