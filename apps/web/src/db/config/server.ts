import { supabaseServiceRoleKey, supabaseUrl } from "@/constants";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";
// console.log({ supabaseUrl, supabaseServiceRoleKey });

export const supabaseServiceClient = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {}
);
