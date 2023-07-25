import { getClient } from "./supabaseClient"

export async function getProfileInfo(id: string) {
  return getClient().from("user").select("username, created_at").eq("id", id)
}

export async function isUsernameTaken(username: string) {
  const response = await getClient().rpc("is_username_taken", {
    username_input: username,
  }).returns<boolean>()
  return !response.error && response.data
}