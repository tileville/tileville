"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export const supabaseUserClientComponentClient =
  createClientComponentClient<Database>({
    options: {
      global: {
        fetch,
      },
    },
  });
