import {teams} from "@/lib/appwrite.ts";

export async function getTeams() {
  const data = await teams.list()

  return {
    teams: data.teams
  }
}
