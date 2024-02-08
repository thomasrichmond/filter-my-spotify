"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RequestLogin() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectURI = "http://localhost:3000/api/callback";
  const url = "https://accounts.spotify.com/authorize";
  const scope =
    "ugc-image-upload user-modify-playback-state user-read-playback-state user-read-recently-played user-top-read app-remote-control playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private";
  const params = `response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`;

  // TODO troubleshoot redirect function issues and get perma fix
  redirect(`${url}?${params}`);
}

export async function deleteCookies() {
  cookies().delete("t");
  cookies().delete("r");
}
