import { redis } from "../redis";

const NONCE_TTL = 60 * 60; // 1 hour in seconds
const NONCE_KEY_PREFIX = "nonce:";

export class NonceService {
  /**
   * Get the current nonce for a wallet address
   */
  static async getNonce(walletAddress: string): Promise<number | null> {
    try {
      console.log("GETTING NONCE FROM REDIS");
      const key = `${NONCE_KEY_PREFIX}${walletAddress}`;
      const nonceStr = await redis.get(key);

      if (nonceStr) {
        console.log(
          "GETTED NONCE FROM REDDIS",
          nonceStr,
          parseInt(nonceStr as string, 10)
        );
        return parseInt(nonceStr as string, 10);
      }
      return null;
    } catch (error) {
      console.error("Error getting nonce from Redis:", error);
      return null;
    }
  }

  /**
   * Save a nonce for a wallet address
   */
  static async saveNonce(walletAddress: string, nonce: number): Promise<void> {
    try {
      const key = `${NONCE_KEY_PREFIX}${walletAddress}`;
      await redis.set(key, nonce, { ex: NONCE_TTL });
    } catch (error) {
      console.error("Error saving nonce to Redis:", error);
    }
  }

  /**
   * Increment the nonce for a wallet address
   */
  static async incrementNonce(walletAddress: string): Promise<number | null> {
    try {
      const key = `${NONCE_KEY_PREFIX}${walletAddress}`;
      const result = await redis.incr(key);

      // Reset TTL after incrementing
      await redis.expire(key, NONCE_TTL);

      return result;
    } catch (error) {
      console.error("Error incrementing nonce in Redis:", error);
      return null;
    }
  }

  /**
   * Get and increment nonce in one operation (useful for transactions)
   */
  static async getAndIncrementNonce(
    walletAddress: string
  ): Promise<number | null> {
    try {
      const nonce = await this.getNonce(walletAddress);

      if (nonce === null) {
        return null;
      }

      await this.incrementNonce(walletAddress);
      return nonce;
    } catch (error) {
      console.error("Error in getAndIncrementNonce:", error);
      return null;
    }
  }

  /**
   * Initialize nonce for a wallet address
   * Only sets if nonce doesn't already exist
   */
  static async initializeNonce(
    walletAddress: string,
    initialNonce: number
  ): Promise<boolean> {
    try {
      const key = `${NONCE_KEY_PREFIX}${walletAddress}`;
      // Only set if key doesn't exist
      const result = await redis.setnx(key, initialNonce);

      if (result === 1) {
        // Key was set, so set expiry
        await redis.expire(key, NONCE_TTL);
        return true;
      }

      return false; // Key already existed
    } catch (error) {
      console.error("Error initializing nonce in Redis:", error);
      return false;
    }
  }
}
