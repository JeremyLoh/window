import { getClient } from "./supabaseClient"

export async function getProfileInfo(id: string) {
  return getClient().from("user").select("username, created_at").eq("id", id)
}