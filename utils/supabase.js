import { createClient } from "@supabase/supabase-js";
import { Constants } from "./constants";

/**
 * Supabase client to access auth
 */
export const supabase = createClient(
  Constants.SUPABASE.URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

// Sign in with GitHub
export async function signIn() {
  await supabase.auth.signIn({ provider: "github" }, { scopes: "repo:status" });
  supabase.auth.onAuthStateChange((event, session) => {
    // TODO: use this event to refresh the provider_token
    console.log(event, session);
  });
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut();
}

/**
 * Get the signed-in user
 */
export async function getUser() {
  return await supabase.auth.user();
}
