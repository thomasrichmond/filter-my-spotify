// "use client";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAccessToken } from "../api/_auth";

const cookie = cookies();
const authToken = cookie.get("t")?.value;
const refreshToken = cookie.get("r")?.value;

export default function RequestLogin() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectURI = "http://localhost:3000/api/callback";
  const url = "https://accounts.spotify.com/authorize";
  const scope =
    "ugc-image-upload user-modify-playback-state user-read-playback-state user-read-recently-played user-top-read app-remote-control playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private";
  const params = `response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`;

  redirect(`${url}?${params}`);
}

export async function getRefreshToken() {
  const url = "https://accounts.spotify.com/api/token";
  let refreshSuccess = false;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const credentialsBase64 = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const body = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  };

  await axios
    .post(url, body, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentialsBase64}`,
      },
    })
    .then((res: any) => {
      refreshSuccess = true;
      cookies().set("t", res.data.access_token, { httpOnly: true });
      cookies().set("r", res.data.refresh_token, { httpOnly: true });
    })
    .catch((err) => {
      console.log(err?.response?.data);
    });

  return refreshSuccess;
}
