import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/** Browser client for Day 2 authentication screens. */
export function createBrowserClient() {
  return createClient(env.supabaseUrl(), env.supabaseAnonKey());
}
