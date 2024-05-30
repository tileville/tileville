declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NODE_ENV: "development" | "production";
      SUPABASE_PROJECT_REF: string;
    }
  }
}

export {};
